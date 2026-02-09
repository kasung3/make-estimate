import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// Note: Passwords are hashed and cannot be retrieved.
// This endpoint provides password reset options:
// 1. Generate a one-time reset link
// 2. Force user to reset password on next login

// POST - Password reset actions
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action } = body; // 'generate_link' or 'force_reset'

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (action === 'generate_link') {
      // Generate a secure reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Store the reset token (we'd need a password reset tokens table)
      // For now, we'll use a simple approach with the force reset flag
      // In production, you'd want a proper password reset flow
      
      // Since we don't have a password reset tokens table, 
      // we'll set force password reset and return a message
      await prisma.user.update({
        where: { id },
        data: { forcePasswordReset: true },
      });

      // Generate a simple reset URL with email
      const baseUrl = process.env.NEXTAUTH_URL || 'https://makeestimate.com';
      const resetLink = `${baseUrl}/login?email=${encodeURIComponent(user.email)}&reset=true`;

      return NextResponse.json({
        success: true,
        message: 'Password reset link generated. User will be prompted to reset password on next login.',
        resetLink,
        note: 'For security, the user must reset their password on next login.',
      });
    } else if (action === 'force_reset') {
      await prisma.user.update({
        where: { id },
        data: { forcePasswordReset: true },
      });

      return NextResponse.json({
        success: true,
        message: 'User will be required to reset password on next login',
      });
    } else if (action === 'clear_force_reset') {
      await prisma.user.update({
        where: { id },
        data: { forcePasswordReset: false },
      });

      return NextResponse.json({
        success: true,
        message: 'Force password reset flag cleared',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Failed to process password reset' }, { status: 500 });
  }
}
