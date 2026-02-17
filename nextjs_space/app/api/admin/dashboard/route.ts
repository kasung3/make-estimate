import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { isPlatformAdmin } from '@/lib/billing';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Overview metrics
    const [totalUsers, totalCompanies, totalBoqs, totalCustomers, recentSignups, activeUsers] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.company.count({ where: { deletedAt: null } }),
      prisma.boq.count({ where: { isPreset: false } }),
      prisma.customer.count(),
      prisma.user.count({ where: { deletedAt: null, createdAt: { gte: sevenDaysAgo } } }),
      prisma.user.count({ where: { deletedAt: null, lastLoginAt: { gte: thirtyDaysAgo } } }),
    ]);

    // Revenue from invoices
    const totalRevenueResult = await prisma.billingInvoice.aggregate({
      _sum: { amountPaid: true },
      where: { status: 'paid' },
    });
    const totalRevenue = (totalRevenueResult._sum.amountPaid || 0) / 100; // cents to dollars

    // Plan distribution
    const planDistribution = await prisma.companyBilling.groupBy({
      by: ['planKey'],
      _count: { planKey: true },
      where: { company: { deletedAt: null } },
    });

    const planCounts: Record<string, number> = { free: 0, starter: 0, advance: 0, business: 0 };
    const companiesWithBilling = await prisma.companyBilling.count({ where: { company: { deletedAt: null } } });
    let paidCount = 0;
    planDistribution.forEach((p: any) => {
      const key = p.planKey || 'free';
      planCounts[key] = p._count.planKey;
      if (key !== 'free') paidCount += p._count.planKey;
    });
    // Companies without billing = free
    planCounts.free = totalCompanies - companiesWithBilling + (planCounts.free || 0);

    // Monthly revenue (last 12 months)
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    const invoices = await prisma.billingInvoice.findMany({
      where: { status: 'paid', createdAt: { gte: twelveMonthsAgo } },
      select: { amountPaid: true, createdAt: true },
    });

    const monthlyRevenue: { month: string; revenue: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = d.toLocaleString('en', { month: 'short', year: '2-digit' });
      const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
      const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
      const revenue = invoices
        .filter((inv: any) => inv.createdAt >= monthStart && inv.createdAt <= monthEnd)
        .reduce((sum: number, inv: any) => sum + inv.amountPaid, 0) / 100;
      monthlyRevenue.push({ month: monthStr, revenue });
    }

    // User growth (last 12 months)
    const allUsers = await prisma.user.findMany({
      where: { deletedAt: null, createdAt: { gte: twelveMonthsAgo } },
      select: { createdAt: true },
    });

    const userGrowth: { month: string; users: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = d.toLocaleString('en', { month: 'short', year: '2-digit' });
      const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
      const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
      const count = allUsers.filter((u: any) => u.createdAt >= monthStart && u.createdAt <= monthEnd).length;
      userGrowth.push({ month: monthStr, users: count });
    }

    // BOQ creation trend (last 12 months)
    const allBoqEvents = await prisma.boqCreationEvent.findMany({
      where: { createdAt: { gte: twelveMonthsAgo } },
      select: { createdAt: true },
    });

    const boqTrend: { month: string; boqs: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = d.toLocaleString('en', { month: 'short', year: '2-digit' });
      const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
      const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
      const count = allBoqEvents.filter((e: any) => e.createdAt >= monthStart && e.createdAt <= monthEnd).length;
      boqTrend.push({ month: monthStr, boqs: count });
    }

    return NextResponse.json({
      overview: {
        totalUsers,
        totalCompanies,
        totalBoqs,
        totalCustomers,
        totalRevenue,
        recentSignups,
        activeUsers,
      },
      planDistribution: planCounts,
      monthlyRevenue,
      userGrowth,
      boqTrend,
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
