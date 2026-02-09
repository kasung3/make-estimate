import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getCompanyBillingStatus } from '@/lib/billing';
import { prisma } from '@/lib/db';
import { PLANS } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;
    const userId = session.user.id;

    // Check user and company blocked status
    const [user, company, membership] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { isBlocked: true, blockReason: true },
      }),
      prisma.company.findUnique({
        where: { id: companyId },
        select: { isBlocked: true, blockReason: true },
      }),
      prisma.companyMembership.findFirst({
        where: { userId, companyId },
      }),
    ]);

    // Check if user or company is blocked
    const userBlocked = user?.isBlocked ?? false;
    const companyBlocked = company?.isBlocked ?? false;
    const isBlocked = userBlocked || companyBlocked;
    const blockReason = userBlocked ? user?.blockReason : company?.blockReason;

    const isAdmin = membership?.role === 'ADMIN';

    const billingStatus = await getCompanyBillingStatus(companyId);
    const planInfo = billingStatus.planKey ? PLANS[billingStatus.planKey] : null;

    return NextResponse.json({
      ...billingStatus,
      isAdmin,
      planInfo,
      plans: PLANS,
      isBlocked,
      blockReason,
      userBlocked,
      companyBlocked,
    });
  } catch (error) {
    console.error('Billing status error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch billing status' },
      { status: 500 }
    );
  }
}
