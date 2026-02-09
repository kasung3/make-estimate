import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// GET - List users with search, filters, and pagination
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.trim() || '';
    const planFilter = searchParams.get('plan') || '';
    const statusFilter = searchParams.get('status') || '';
    const blockedFilter = searchParams.get('blocked') || '';
    const hasCouponFilter = searchParams.get('hasCoupon') || '';
    const sortBy = searchParams.get('sortBy') || 'newest';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    // Build WHERE clause
    const where: any = {};
    const OR: any[] = [];

    // Search across multiple fields including company name
    if (query) {
      const searchLower = query.toLowerCase();
      OR.push(
        { email: { contains: searchLower, mode: 'insensitive' } },
        { name: { contains: searchLower, mode: 'insensitive' } },
        { firstName: { contains: searchLower, mode: 'insensitive' } },
        { lastName: { contains: searchLower, mode: 'insensitive' } },
        { phone: { contains: query } },
        // Search by company name through memberships relation
        {
          memberships: {
            some: {
              company: {
                name: { contains: searchLower, mode: 'insensitive' }
              }
            }
          }
        }
      );
    }

    if (OR.length > 0) {
      where.OR = OR;
    }

    // Blocked filter
    if (blockedFilter === 'blocked') {
      where.isBlocked = true;
    } else if (blockedFilter === 'unblocked') {
      where.isBlocked = false;
    }

    // Build orderBy
    let orderBy: any = { createdAt: 'desc' };
    switch (sortBy) {
      case 'name':
        orderBy = { name: 'asc' };
        break;
      case 'email':
        orderBy = { email: 'asc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Fetch users
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          memberships: {
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  isBlocked: true,
                  billing: {
                    select: {
                      planKey: true,
                      status: true,
                      accessOverride: true,
                      overridePlan: true,
                      currentCouponCode: true,
                      stripeCustomerId: true,
                      stripeSubscriptionId: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    // Post-process for plan/status/coupon filters (need to filter after include)
    let filteredUsers = users;

    if (planFilter || statusFilter || hasCouponFilter) {
      filteredUsers = users.filter(user => {
        const company = user.memberships[0]?.company;
        const billing = company?.billing;

        if (planFilter) {
          if (planFilter === 'none' && billing?.planKey) return false;
          if (planFilter === 'free_forever' && billing?.accessOverride !== 'free_forever' && billing?.accessOverride !== 'admin_grant') return false;
          if (planFilter === 'starter' && billing?.planKey !== 'starter') return false;
          if (planFilter === 'business' && billing?.planKey !== 'business') return false;
        }

        if (statusFilter) {
          if (statusFilter === 'none' && billing?.status) return false;
          if (statusFilter !== 'none' && billing?.status !== statusFilter) return false;
        }

        if (hasCouponFilter === 'yes' && !billing?.currentCouponCode) return false;
        if (hasCouponFilter === 'no' && billing?.currentCouponCode) return false;

        return true;
      });
    }

    // Format response
    const formattedUsers = filteredUsers.map(user => {
      const company = user.memberships[0]?.company;
      const billing = company?.billing;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || null,
        phone: user.phone,
        isBlocked: user.isBlocked,
        blockReason: user.blockReason,
        forcePasswordReset: user.forcePasswordReset,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        company: company ? {
          id: company.id,
          name: company.name,
          isBlocked: company.isBlocked,
        } : null,
        billing: billing ? {
          planKey: billing.accessOverride ? (billing.overridePlan || 'business') : billing.planKey,
          status: billing.accessOverride ? 'active' : billing.status,
          accessOverride: billing.accessOverride,
          overridePlan: billing.overridePlan,
          currentCouponCode: billing.currentCouponCode,
          stripeCustomerId: billing.stripeCustomerId,
          stripeSubscriptionId: billing.stripeSubscriptionId,
        } : null,
      };
    });

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
