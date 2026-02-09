import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// POST - Unblock user
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

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.user.update({
      where: { id },
      data: {
        isBlocked: false,
        blockReason: null,
      },
    });

    return NextResponse.json({ success: true, message: 'User unblocked successfully' });
  } catch (error) {
    console.error('Unblock user error:', error);
    return NextResponse.json({ error: 'Failed to unblock user' }, { status: 500 });
  }
}
