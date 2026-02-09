export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { syncStripeQuantity } from '@/lib/stripe';

// PUT - Update team member (role, active status)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;
    const userId = session.user.id;
    const membershipId = params.id;

    // Check if user is admin
    const adminMembership = await prisma.companyMembership.findFirst({
      where: { userId, companyId },
    });

    if (adminMembership?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only admins can update team members' }, { status: 403 });
    }

    // Verify membership belongs to this company
    const membership = await prisma.companyMembership.findFirst({
      where: { id: membershipId, companyId },
    });

    if (!membership) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Prevent self-demotion from admin
    if (membership.userId === userId) {
      const body = await request.json();
      if (body.role && body.role !== 'ADMIN') {
        return NextResponse.json({ error: 'You cannot demote yourself' }, { status: 400 });
      }
    }

    const body = await request.json();
    const updateData: any = {};

    if (body.role !== undefined) {
      updateData.role = body.role;
    }
    if (body.isActive !== undefined) {
      updateData.isActive = body.isActive;
    }

    const updatedMembership = await prisma.companyMembership.update({
      where: { id: membershipId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            firstName: true,
            lastName: true,
            isBlocked: true,
            createdAt: true,
            lastLoginAt: true,
          },
        },
      },
    });

    // Sync Stripe quantity if active status changed
    if (body.isActive !== undefined) {
      await syncStripeQuantity(companyId);
    }

    return NextResponse.json({
      id: updatedMembership.id,
      userId: updatedMembership.userId,
      role: updatedMembership.role,
      isActive: updatedMembership.isActive,
      createdAt: updatedMembership.createdAt,
      user: updatedMembership.user,
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

// DELETE - Remove team member
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;
    const userId = session.user.id;
    const membershipId = params.id;

    // Check if user is admin
    const adminMembership = await prisma.companyMembership.findFirst({
      where: { userId, companyId },
    });

    if (adminMembership?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only admins can remove team members' }, { status: 403 });
    }

    // Verify membership belongs to this company
    const membership = await prisma.companyMembership.findFirst({
      where: { id: membershipId, companyId },
    });

    if (!membership) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Prevent self-removal
    if (membership.userId === userId) {
      return NextResponse.json({ error: 'You cannot remove yourself' }, { status: 400 });
    }

    // Count admins to prevent removing last admin
    const adminCount = await prisma.companyMembership.count({
      where: { companyId, role: 'ADMIN' },
    });

    if (membership.role === 'ADMIN' && adminCount <= 1) {
      return NextResponse.json({ error: 'Cannot remove the last admin' }, { status: 400 });
    }

    await prisma.companyMembership.delete({
      where: { id: membershipId },
    });

    // Sync Stripe quantity
    await syncStripeQuantity(companyId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing team member:', error);
    return NextResponse.json({ error: 'Failed to remove team member' }, { status: 500 });
  }
}
