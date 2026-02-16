/**
 * Supabase Storage - Replacement for AWS S3
 * 
 * Uses Supabase Storage for file uploads/downloads.
 * The 'uploads' bucket should be created as PUBLIC in Supabase dashboard.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function getSupabaseAdmin() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

const BUCKET = 'uploads';

/**
 * Upload a file to Supabase Storage
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
  fileName: string,
  fileBuffer: Buffer,
  contentType: string,
  isPublic: boolean = true
): Promise<{ publicUrl: string; cloud_storage_path: string }> {
  const supabase = getSupabaseAdmin();
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const prefix = isPublic ? 'public' : 'private';
  const cloud_storage_path = `${prefix}/${timestamp}-${sanitizedFileName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(cloud_storage_path, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    console.error('[STORAGE_UPLOAD_ERROR]', error);
    throw new Error(`Upload failed: ${error.message}`);
  }

  const publicUrl = getPublicUrl(cloud_storage_path);
  return { publicUrl, cloud_storage_path };
}

/**
 * Generate a presigned upload URL (client uploads directly to Supabase)
 * Returns the upload URL and the storage path.
 */
export async function generatePresignedUploadUrl(
  fileName: string,
  contentType: string,
  isPublic: boolean = true
): Promise<{ uploadUrl: string; cloud_storage_path: string }> {
  const supabase = getSupabaseAdmin();
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const prefix = isPublic ? 'public' : 'private';
  const cloud_storage_path = `${prefix}/${timestamp}-${sanitizedFileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(cloud_storage_path);

  if (error || !data) {
    console.error('[STORAGE_PRESIGN_ERROR]', error);
    throw new Error(`Failed to create upload URL: ${error?.message}`);
  }

  return {
    uploadUrl: data.signedUrl,
    cloud_storage_path,
  };
}

/**
 * Get the public URL for a file
 */
export function getPublicUrl(cloud_storage_path: string): string {
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${cloud_storage_path}`;
}

/**
 * Get a signed URL for private file access
 */
export async function getSignedUrl(
  cloud_storage_path: string,
  expiresIn: number = 3600
): Promise<string> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(cloud_storage_path, expiresIn, {
      download: true,
    });

  if (error || !data) {
    throw new Error(`Failed to create signed URL: ${error?.message}`);
  }

  return data.signedUrl;
}

/**
 * Get file URL (public or signed based on isPublic flag)
 */
export async function getFileUrl(
  cloud_storage_path: string,
  isPublic: boolean = true
): Promise<string> {
  if (isPublic) {
    return getPublicUrl(cloud_storage_path);
  }
  return getSignedUrl(cloud_storage_path);
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(cloud_storage_path: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([cloud_storage_path]);

  if (error) {
    console.error('[STORAGE_DELETE_ERROR]', error);
    throw new Error(`Delete failed: ${error.message}`);
  }
}
