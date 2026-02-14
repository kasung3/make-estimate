import { NextResponse } from 'next/server';
import { getActivePlans } from '@/lib/billing';
import { BillingPlanInfo } from '@/lib/types';

export const dynamic = 'force-dynamic';

// GET all active billing plans (public endpoint)
export async function GET() {
  try {
    const plans = await getActivePlans();

    // Convert to BillingPlanInfo format with all plan fields
    const planInfos: BillingPlanInfo[] = plans.map((plan) => ({
      id: plan.id,
      planKey: plan.planKey,
      name: plan.name,
      priceMonthlyUsdCents: plan.priceMonthlyUsdCents,
      priceAnnualUsdCents: plan.priceAnnualUsdCents,
      seatModel: plan.seatModel,
      boqLimitPerPeriod: plan.boqLimitPerPeriod,
      boqItemsLimit: plan.boqItemsLimit,
      boqTemplatesLimit: plan.boqTemplatesLimit,
      coverTemplatesLimit: plan.coverTemplatesLimit,
      boqPresetsLimit: plan.boqPresetsLimit,
      logoUploadAllowed: plan.logoUploadAllowed,
      sharingAllowed: plan.sharingAllowed,
      watermarkEnabled: plan.watermarkEnabled,
      watermarkText: plan.watermarkText,
      maxActiveMembers: plan.maxActiveMembers,
      features: (plan.features as string[]) || [],
      isMostPopular: plan.isMostPopular,
      sortOrder: plan.sortOrder,
      active: plan.active,
      stripeProductId: plan.stripeProductId,
      stripePriceIdMonthly: plan.stripePriceIdMonthly,
      stripePriceIdAnnual: plan.stripePriceIdAnnual,
    }));

    return NextResponse.json(planInfos);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}
