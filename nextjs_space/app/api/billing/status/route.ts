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

    // Check if user is admin (for showing billing management options)
    const membership = await prisma.companyMembership.findFirst({
      where: {
        userId: session.user.id,
        companyId,
      },
    });

    const isAdmin = membership?.role === 'ADMIN';

    const billingStatus = await getCompanyBillingStatus(companyId);
    const planInfo = billingStatus.planKey ? PLANS[billingStatus.planKey] : null;

    return NextResponse.json({
      ...billingStatus,
      isAdmin,
      planInfo,
      plans: PLANS,
    });
  } catch (error) {
    console.error('Billing status error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch billing status' },
      { status: 500 }
    );
  }
}
