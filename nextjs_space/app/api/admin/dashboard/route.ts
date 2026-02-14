import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { startOfMonth, subMonths, format } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const now = new Date();

    // Total users
    const totalUsers = await prisma.user.count({ where: { deletedAt: null } });
    const totalCompanies = await prisma.company.count({ where: { deletedAt: null } });
    const totalBoqs = await prisma.boq.count({ where: { isPreset: false } });
    const totalCustomers = await prisma.customer.count();

    // Users by plan
    const allBillings = await prisma.companyBilling.findMany({
      where: { company: { deletedAt: null } },
      select: {
        planKey: true,
        status: true,
        accessOverride: true,
        overridePlan: true,
      },
    });

    let freeAccounts = 0;
    let starterAccounts = 0;
    let advanceAccounts = 0;
    let businessAccounts = 0;
    let noPlanAccounts = 0;

    for (const b of allBillings) {
      const effectivePlan = b.overridePlan || b.planKey;
      if (!effectivePlan || effectivePlan === 'free') {
        freeAccounts++;
      } else if (effectivePlan === 'starter') {
        starterAccounts++;
      } else if (effectivePlan === 'advance') {
        advanceAccounts++;
      } else if (effectivePlan === 'business') {
        businessAccounts++;
      } else {
        noPlanAccounts++;
      }
    }

    // Companies without billing records
    const companiesWithoutBilling = totalCompanies - allBillings.length;
    freeAccounts += companiesWithoutBilling;

    // Monthly revenue from invoices
    const invoices = await prisma.billingInvoice.findMany({
      where: { status: 'paid' },
      select: { amountPaid: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    // Total revenue
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amountPaid, 0);

    // Monthly revenue breakdown (last 12 months)
    const monthlyRevenue: { month: string; revenue: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = startOfMonth(subMonths(now, i - 1));
      const monthInvoices = invoices.filter(
        (inv) => inv.createdAt >= monthStart && inv.createdAt < monthEnd
      );
      const revenue = monthInvoices.reduce((sum, inv) => sum + inv.amountPaid, 0);
      monthlyRevenue.push({
        month: format(monthStart, 'MMM yyyy'),
        revenue: revenue / 100,
      });
    }

    // User growth (last 12 months)
    const userGrowth: { month: string; newUsers: number; cumulativeUsers: number }[] = [];
    const allUsers = await prisma.user.findMany({
      where: { deletedAt: null },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    for (let i = 11; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = startOfMonth(subMonths(now, i - 1));
      const newUsers = allUsers.filter(
        (u) => u.createdAt >= monthStart && u.createdAt < monthEnd
      ).length;
      const cumulativeUsers = allUsers.filter(
        (u) => u.createdAt < monthEnd
      ).length;
      userGrowth.push({
        month: format(monthStart, 'MMM yyyy'),
        newUsers,
        cumulativeUsers,
      });
    }

    // BOQ creation trend (last 12 months)
    const allBoqEvents = await prisma.boqCreationEvent.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const boqTrend: { month: string; boqs: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = startOfMonth(subMonths(now, i - 1));
      const count = allBoqEvents.filter(
        (e) => e.createdAt >= monthStart && e.createdAt < monthEnd
      ).length;
      boqTrend.push({
        month: format(monthStart, 'MMM yyyy'),
        boqs: count,
      });
    }

    // Recent signups (last 7 days)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentSignups = await prisma.user.count({
      where: { createdAt: { gte: sevenDaysAgo }, deletedAt: null },
    });

    // Active users (logged in last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const activeUsers = await prisma.user.count({
      where: { lastLoginAt: { gte: thirtyDaysAgo }, deletedAt: null },
    });

    // This month's revenue
    const thisMonthStart = startOfMonth(now);
    const thisMonthRevenue = invoices
      .filter((inv) => inv.createdAt >= thisMonthStart)
      .reduce((sum, inv) => sum + inv.amountPaid, 0) / 100;

    // Last month's revenue
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthRevenue = invoices
      .filter((inv) => inv.createdAt >= lastMonthStart && inv.createdAt < thisMonthStart)
      .reduce((sum, inv) => sum + inv.amountPaid, 0) / 100;

    return NextResponse.json({
      overview: {
        totalUsers,
        totalCompanies,
        totalBoqs,
        totalCustomers,
        totalRevenue: totalRevenue / 100,
        thisMonthRevenue,
        lastMonthRevenue,
        recentSignups,
        activeUsers,
      },
      planDistribution: {
        free: freeAccounts,
        starter: starterAccounts,
        advance: advanceAccounts,
        business: businessAccounts,
        noPlan: noPlanAccounts,
      },
      monthlyRevenue,
      userGrowth,
      boqTrend,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
