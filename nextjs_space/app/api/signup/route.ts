export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { checkRateLimit, rateLimitResponse } from '@/lib/rate-limiter';
import { botProtection, sanitizeText } from '@/lib/sanitize';

// Rate limit config: 5 signups per minute per IP, 60s block
const SIGNUP_RATE_LIMIT = {
  windowMs: 60 * 1000,
  maxRequests: 5,
  blockDurationMs: 60 * 1000,
};

// Email validation
function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Password strength validation
function validatePassword(password: string): { valid: boolean; message: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (password.length > 128) {
    return { valid: false, message: 'Password must be at most 128 characters' };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true, message: '' };
}

// Strip control characters
function sanitizeInput(input: string | null | undefined): string {
  if (!input || typeof input !== 'string') return '';
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim();
}

// Extract digits only from phone number for search
function normalizePhoneDigits(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  return digits.length > 0 ? digits : null;
}

export async function POST(request: Request) {
  try {
    // Bot protection
    const botBlock = botProtection(request);
    if (botBlock) return botBlock;

    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rateResult = checkRateLimit(`signup:${ip}`, SIGNUP_RATE_LIMIT);
    if (!rateResult.allowed) {
      console.log(`[SIGNUP_RATE_LIMITED] IP: ${ip}`);
      return rateLimitResponse(rateResult);
    }

    const body = await request.json();

    // Sanitize all inputs
    const email = sanitizeInput(body.email)?.toLowerCase();
    const password = body.password; // Don't sanitize password (may contain special chars)
    const companyName = sanitizeText(body.companyName, 200);
    const firstName = sanitizeText(body.firstName, 100);
    const lastName = sanitizeText(body.lastName, 100);
    const phone = sanitizeText(body.phone, 30);
    const country = sanitizeText(body.country, 100);

    if (!email || !password || !companyName) {
      return NextResponse.json(
        { error: 'Email, password, and company name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        { error: passwordCheck.message },
        { status: 400 }
      );
    }

    // Validate company name length
    if (companyName.length < 2) {
      return NextResponse.json(
        { error: 'Company name must be at least 2 characters' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Generic message to prevent user enumeration
      return NextResponse.json(
        { error: 'Unable to create account. Please try a different email.' },
        { status: 400 }
      );
    }

    // Stronger bcrypt cost factor
    const hashedPassword = await bcrypt.hash(password, 12);

    // Build full name from firstName and lastName, fallback to email prefix
    let name = email.split('@')[0];
    if (firstName || lastName) {
      name = [firstName, lastName].filter(Boolean).join(' ');
    }

    // Normalize phone to digits-only for search
    const phoneDigits = normalizePhoneDigits(phone);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        phoneDigits,
        country: country || null,
      },
    });

    const company = await prisma.company.create({
      data: {
        name: companyName,
      },
    });

    await prisma.companyMembership.create({
      data: {
        userId: user.id,
        companyId: company.id,
        role: 'ADMIN',
      },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
