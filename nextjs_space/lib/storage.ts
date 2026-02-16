/**
 * Supabase Storage - File Upload/Download
 * Replaces the previous AWS S3 implementation
 */

import { createClient } from '@supabase/supabase-js';

const BUCKET_NAME = 'uploads';

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Supabase credentials not configured (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)');
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

/**
 * Upload a file buffer to Supabase Storage
 * @param fileName - Original file name
 * @param contentType - MIME type
 * @param fileBuffer - File data as Buffer
 * @param isPublic - Whether to store in a public path
 * @returns cloud_storage_path (the storage key)
 */
export async function uploadFile(
  fileName: string,
  contentType: string,
  fileBuffer: Buffer,
  isPublic: boolean = true
): Promise<{ cloud_storage_path: string }> {
  const supabase = getSupabaseClient();
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const cloud_storage_path = isPublic
    ? `public/${timestamp}-${sanitizedFileName}`
    : `private/${timestamp}-${sanitizedFileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(cloud_storage_path, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  return { cloud_storage_path };
}

/**
 * Generate a presigned upload URL for client-side uploads
 * @param fileName - Original file name
 * @param contentType - MIME type
 * @param isPublic - Whether file is publicly accessible
 * @returns Object with uploadUrl and cloud_storage_path
 */
export async function generatePresignedUploadUrl(
  fileName: string,
  contentType: string,
  isPublic: boolean = true
): Promise<{ uploadUrl: string; cloud_storage_path: string }> {
  const supabase = getSupabaseClient();
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const cloud_storage_path = isPublic
    ? `public/${timestamp}-${sanitizedFileName}`
    : `private/${timestamp}-${sanitizedFileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUploadUrl(cloud_storage_path);

  if (error || !data) {
    throw new Error(`Failed to create signed upload URL: ${error?.message}`);
  }

  return {
    uploadUrl: data.signedUrl,
    cloud_storage_path,
  };
}

/**
 * Get a URL to access a file
 * @param cloud_storage_path - The storage key of the file
 * @param isPublic - Whether to return public URL or signed URL
 * @returns URL string
 */
export async function getFileUrl(
  cloud_storage_path: string,
  isPublic: boolean = true
): Promise<string> {
  const supabase = getSupabaseClient();

  if (isPublic) {
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(cloud_storage_path);
    return data.publicUrl;
  }

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(cloud_storage_path, 3600);

  if (error || !data) {
    throw new Error(`Failed to get signed URL: ${error?.message}`);
  }

  return data.signedUrl;
}

/**
 * Delete a file from Supabase Storage
 * @param cloud_storage_path - The storage key of the file to delete
 */
export async function deleteFile(cloud_storage_path: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([cloud_storage_path]);

  if (error) {
    throw new Error(`Supabase delete failed: ${error.message}`);
  }
}
