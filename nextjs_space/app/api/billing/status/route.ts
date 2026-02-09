import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getCompanyBillingStatus, getActivePlans, getPlanFromDb } from '@/lib/billing';
import { prisma } from '@/lib/db';
import { BillingPlanInfo } from '@/lib/types';

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
    const [user, company, membership, activePlans] = await Promise.all([
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
      getActivePlans(),
    ]);

    // Check if user or company is blocked
    const userBlocked = user?.isBlocked ?? false;
    const companyBlocked = company?.isBlocked ?? false;
    const isBlocked = userBlocked || companyBlocked;
    const blockReason = userBlocked ? user?.blockReason : company?.blockReason;

    const isAdmin = membership?.role === 'ADMIN';

    const billingStatus = await getCompanyBillingStatus(companyId);
    
    // Get current plan info from DB
    let planInfo: BillingPlanInfo | null = null;
    if (billingStatus.planKey) {
      const plan = await getPlanFromDb(billingStatus.planKey);
      if (plan) {
        planInfo = {
          id: plan.id,
          planKey: plan.planKey,
          name: plan.name,
          priceMonthlyUsdCents: plan.priceMonthlyUsdCents,
          priceAnnualUsdCents: plan.priceAnnualUsdCents,
          seatModel: plan.seatModel,
          boqLimitPerPeriod: plan.boqLimitPerPeriod,
          boqTemplatesLimit: plan.boqTemplatesLimit,
          coverTemplatesLimit: plan.coverTemplatesLimit,
          logoUploadAllowed: plan.logoUploadAllowed,
          sharingAllowed: plan.sharingAllowed,
          maxActiveMembers: plan.maxActiveMembers,
          features: (plan.features as string[]) || [],
          isMostPopular: plan.isMostPopular,
          sortOrder: plan.sortOrder,
          active: plan.active,
          stripeProductId: plan.stripeProductId,
          stripePriceIdMonthly: plan.stripePriceIdMonthly,
          stripePriceIdAnnual: plan.stripePriceIdAnnual,
        };
      }
    }

    // Convert active plans to record for easy lookup
    const plans: Record<string, BillingPlanInfo> = {};
    for (const plan of activePlans) {
      plans[plan.planKey] = {
        id: plan.id,
        planKey: plan.planKey,
        name: plan.name,
        priceMonthlyUsdCents: plan.priceMonthlyUsdCents,
        priceAnnualUsdCents: plan.priceAnnualUsdCents,
        seatModel: plan.seatModel,
        boqLimitPerPeriod: plan.boqLimitPerPeriod,
        boqTemplatesLimit: plan.boqTemplatesLimit,
        coverTemplatesLimit: plan.coverTemplatesLimit,
        logoUploadAllowed: plan.logoUploadAllowed,
        sharingAllowed: plan.sharingAllowed,
        maxActiveMembers: plan.maxActiveMembers,
        features: (plan.features as string[]) || [],
        isMostPopular: plan.isMostPopular,
        sortOrder: plan.sortOrder,
        active: plan.active,
        stripeProductId: plan.stripeProductId,
        stripePriceIdMonthly: plan.stripePriceIdMonthly,
        stripePriceIdAnnual: plan.stripePriceIdAnnual,
      };
    }

    return NextResponse.json({
      ...billingStatus,
      isAdmin,
      planInfo,
      plans,
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
