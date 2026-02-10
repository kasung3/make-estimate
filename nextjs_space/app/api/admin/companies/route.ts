import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const PLATFORM_ADMIN_EMAILS = (process.env.PLATFORM_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());

// GET /api/admin/companies - List companies with search and pagination
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !PLATFORM_ADMIN_EMAILS.includes(session.user.email.toLowerCase())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.toLowerCase() || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const showDeleted = searchParams.get('showDeleted') === 'true';
    const blockedFilter = searchParams.get('blocked'); // 'true' | 'false' | null (all)
    const planFilter = searchParams.get('plan'); // 'free' | 'starter' | 'advance' | 'business' | null (all)

    // Build where clause
    const whereConditions: any[] = [];
    
    // By default, exclude soft-deleted companies
    if (!showDeleted) {
      whereConditions.push({ deletedAt: null });
    }

    // Blocked filter
    if (blockedFilter === 'true') {
      whereConditions.push({ isBlocked: true });
    } else if (blockedFilter === 'false') {
      whereConditions.push({ isBlocked: false });
    }

    // Plan filter
    if (planFilter) {
      whereConditions.push({
        billing: {
          planKey: planFilter,
        },
      });
    }

    // Search query - search by company name or admin email
    if (query) {
      whereConditions.push({
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          {
            memberships: {
              some: {
                role: 'ADMIN',
                user: {
                  email: { contains: query, mode: 'insensitive' },
                },
              },
            },
          },
        ],
      });
    }

    const where = whereConditions.length > 0 ? { AND: whereConditions } : {};

    const [companies, totalCount] = await Promise.all([
      prisma.company.findMany({
        where,
        include: {
          billing: {
            select: {
              planKey: true,
              status: true,
              billingInterval: true,
              seatQuantity: true,
              accessOverride: true,
              overridePlan: true,
              stripeCustomerId: true,
              stripeSubscriptionId: true,
              currentPeriodEnd: true,
            },
          },
          memberships: {
            where: { role: 'ADMIN' },
            include: {
              user: {
                select: { email: true, name: true },
              },
            },
            take: 1,
          },
          _count: {
            select: {
              memberships: { where: { isActive: true } },
              boqs: true,
              pdfThemes: true,
              pdfCoverTemplates: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.company.count({ where }),
    ]);

    // Transform to include admin email
    const companiesWithAdmin = companies.map((company: any) => ({
      id: company.id,
      name: company.name,
      isBlocked: company.isBlocked,
      blockReason: company.blockReason,
      deletedAt: company.deletedAt,
      createdAt: company.createdAt,
      adminEmail: company.memberships[0]?.user.email || null,
      adminName: company.memberships[0]?.user.name || null,
      billing: company.billing,
      _count: company._count,
    }));

    return NextResponse.json({
      companies: companiesWithAdmin,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }
}
