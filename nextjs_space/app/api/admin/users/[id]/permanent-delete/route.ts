import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// DELETE - Permanently delete user and all their data
export async function DELETE(
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
      include: {
        memberships: {
          select: { id: true, companyId: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent deleting the admin themselves
    if (user.email === session.user.email) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    // Delete in correct order to respect foreign key constraints
    await prisma.$transaction(async (tx) => {
      // Delete all memberships
      await tx.companyMembership.deleteMany({ where: { userId: id } });
      // Delete the user
      await tx.user.delete({ where: { id } });
    });

    return NextResponse.json({
      success: true,
      message: 'User permanently deleted from the database.',
    });
  } catch (error) {
    console.error('Permanent delete user error:', error);
    return NextResponse.json({ error: 'Failed to permanently delete user' }, { status: 500 });
  }
}
