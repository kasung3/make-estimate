export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { uploadFile } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contentType = request.headers.get('content-type') || '';
    
    // Handle multipart form data (direct file upload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: 'Invalid file type. Allowed: png, jpg, jpeg, webp, svg' }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const { publicUrl, cloud_storage_path } = await uploadFile(
        file.name,
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
    // Return a flag indicating the client should use FormData upload instead
    return NextResponse.json({ 
      useFormDataUpload: true,
      message: 'Please use multipart/form-data upload' 
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json({ error: 'Failed to handle upload' }, { status: 500 });
  }
}
