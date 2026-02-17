import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { isPlatformAdmin } from '@/lib/billing';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const userId = params.id;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { memberships: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent deleting platform admins
    if (isPlatformAdmin(user.email)) {
      return NextResponse.json({ error: 'Cannot delete platform admin accounts' }, { status: 400 });
    }

    // Delete memberships first, then the user
    await prisma.$transaction(async (tx: any) => {
      // Delete all memberships
      await tx.companyMembership.deleteMany({ where: { userId } });
      // Delete admin grants
      await tx.companyAccessGrant.deleteMany({ where: { grantedById: userId } });
      // Delete the user
      await tx.user.delete({ where: { id: userId } });
    });

    return NextResponse.json({ success: true, message: `User ${user.email} permanently deleted` });
  } catch (error) {
    console.error('Permanent user delete error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
