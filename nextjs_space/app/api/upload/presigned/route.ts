export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { uploadFile } from '@/lib/storage';
import { botProtection } from '@/lib/sanitize';
import { checkRateLimit, rateLimitResponse } from '@/lib/rate-limiter';

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Upload rate limit: 20 per minute per user
const UPLOAD_RATE_LIMIT = {
  windowMs: 60 * 1000,
  maxRequests: 20,
};

// Validate file magic bytes to prevent disguised uploads
function validateMagicBytes(buffer: Buffer, declaredType: string): boolean {
  if (buffer.length < 4) return false;

  const signatures: Record<string, number[][]> = {
    'image/png': [[0x89, 0x50, 0x4E, 0x47]],
    'image/jpeg': [[0xFF, 0xD8, 0xFF]],
    'image/jpg': [[0xFF, 0xD8, 0xFF]],
    'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF
    'image/svg+xml': [], // SVG is text-based, checked differently
  };

  // SVG: check for XML/SVG content
  if (declaredType === 'image/svg+xml') {
    const text = buffer.slice(0, 500).toString('utf8').toLowerCase();
    return text.includes('<svg') || text.includes('<?xml');
  }

  const allowedSigs = signatures[declaredType];
  if (!allowedSigs || allowedSigs.length === 0) return false;

  return allowedSigs.some(sig =>
    sig.every((byte, i) => buffer[i] === byte)
  );
}

// Sanitize SVG content to remove scripts and event handlers
function sanitizeSvg(buffer: Buffer): Buffer {
  let content = buffer.toString('utf8');
  // Remove script tags
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  // Remove event handlers
  content = content.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
  // Remove javascript: URLs
  content = content.replace(/javascript\s*:/gi, '');
  // Remove data: URLs in href/src (potential XSS)
  content = content.replace(/(href|src)\s*=\s*["']\s*data\s*:/gi, '$1="');
  return Buffer.from(content, 'utf8');
}

// Sanitize filename
function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.\./g, '_')
    .slice(0, 200);
}

export async function POST(request: Request) {
  try {
    // Bot protection
    const botBlock = botProtection(request);
    if (botBlock) return botBlock;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting
    const userId = (session.user as any)?.id || 'unknown';
    const rateResult = checkRateLimit(`upload:${userId}`, UPLOAD_RATE_LIMIT);
    if (!rateResult.allowed) {
      return rateLimitResponse(rateResult);
    }

    const contentType = request.headers.get('content-type') || '';
    
    // Handle multipart form data (direct file upload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
          { status: 400 }
        );
      }

      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: 'Invalid file type. Allowed: png, jpg, jpeg, webp, svg' }, { status: 400 });
      }

      let buffer = Buffer.from(await file.arrayBuffer());

      // Validate magic bytes
      if (!validateMagicBytes(buffer, file.type)) {
        console.warn(`[UPLOAD_BLOCKED] Magic byte mismatch for ${file.type}, user: ${userId}`);
        return NextResponse.json(
          { error: 'File content does not match its declared type' },
          { status: 400 }
        );
      }

      // Sanitize SVG
      if (file.type === 'image/svg+xml') {
        buffer = sanitizeSvg(buffer);
      }

      const safeFilename = sanitizeFilename(file.name);

      const { publicUrl, cloud_storage_path } = await uploadFile(
        safeFilename,
        buffer,
        file.type,
        true
      );

      return NextResponse.json({ publicUrl, cloud_storage_path });
    }

    // Handle JSON request (get upload info - backwards compatible)
    const body = await request.json();
    const { fileName, contentType: fileContentType, isPublic = true } = body;

    if (!fileName || !fileContentType) {
      return NextResponse.json({ error: 'fileName and contentType are required' }, { status: 400 });
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(fileContentType)) {
      return NextResponse.json({ error: 'Invalid file type. Allowed: png, jpg, jpeg, webp, svg' }, { status: 400 });
    }

    // For JSON requests, we now use server-side upload approach
    return NextResponse.json({ 
      useFormDataUpload: true,
      message: 'Please use multipart/form-data upload' 
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json({ error: 'Failed to handle upload' }, { status: 500 });
  }
}
