import { NextResponse } from 'next/server';
import { getActivePlans } from '@/lib/billing';
import { BillingPlanInfo } from '@/lib/types';

export const dynamic = 'force-dynamic';

// GET all active billing plans (public endpoint)
export async function GET() {
  try {
    const plans = await getActivePlans();

    // Convert to BillingPlanInfo format
    const planInfos: BillingPlanInfo[] = plans.map((plan) => ({
      id: plan.id,
      planKey: plan.planKey,
      name: plan.name,
      priceMonthlyUsdCents: plan.priceMonthlyUsdCents,
      interval: plan.interval,
      boqLimitPerPeriod: plan.boqLimitPerPeriod,
      features: (plan.features as string[]) || [],
      badgeText: plan.badgeText,
      sortOrder: plan.sortOrder,
      active: plan.active,
      stripePriceIdCurrent: plan.stripePriceIdCurrent,
    }));

    return NextResponse.json(planInfos);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}
