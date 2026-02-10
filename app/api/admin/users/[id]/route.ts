import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// DELETE - Soft delete user (set deletedAt, block access, deactivate memberships)
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

    // Check if user exists
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

    // Soft delete: set deletedAt, block user, deactivate all memberships
    await prisma.$transaction([
      // Update user: set deletedAt, block access
      prisma.user.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          isBlocked: true,
          blockReason: 'Account deleted by platform admin',
        },
      }),
      // Deactivate all company memberships
      prisma.companyMembership.updateMany({
        where: { userId: id },
        data: { isActive: false },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully. The user can no longer access the platform.',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

// GET - Get user details including billing history
export async function GET(
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
          include: {
            company: {
              include: {
                billing: {
                  include: {
                    invoices: {
                      orderBy: { createdAt: 'desc' },
                      take: 20,
                    },
                    couponRedemptions: {
                      orderBy: { redeemedAt: 'desc' },
                    },
                  },
                },
                _count: {
                  select: { memberships: true, boqs: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const company = user.memberships[0]?.company;
    const billing = company?.billing;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || null,
        phone: user.phone,
        country: user.country,
        isBlocked: user.isBlocked,
        blockReason: user.blockReason,
        deletedAt: user.deletedAt,
        forcePasswordReset: user.forcePasswordReset,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      company: company ? {
        id: company.id,
        name: company.name,
        isBlocked: company.isBlocked,
        blockReason: company.blockReason,
        memberCount: company._count.memberships,
        boqCount: company._count.boqs,
        createdAt: company.createdAt,
      } : null,
      billing: billing ? {
        planKey: billing.planKey,
        status: billing.status,
        accessOverride: billing.accessOverride,
        overridePlan: billing.overridePlan,
        currentCouponCode: billing.currentCouponCode,
        stripeCustomerId: billing.stripeCustomerId,
        stripeSubscriptionId: billing.stripeSubscriptionId,
        currentPeriodStart: billing.currentPeriodStart,
        currentPeriodEnd: billing.currentPeriodEnd,
        cancelAtPeriodEnd: billing.cancelAtPeriodEnd,
      } : null,
      invoices: billing?.invoices || [],
      couponRedemptions: billing?.couponRedemptions || [],
    });
  } catch (error) {
    console.error('Get user details error:', error);
    return NextResponse.json({ error: 'Failed to fetch user details' }, { status: 500 });
  }
}
