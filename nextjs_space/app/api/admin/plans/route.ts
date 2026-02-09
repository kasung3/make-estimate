import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// GET all billing plans (admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const plans = await prisma.billingPlan.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        priceHistory: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}

// POST create new plan
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const {
      planKey,
      name,
      priceMonthlyUsdCents,
      boqLimitPerPeriod,
      features,
      badgeText,
      sortOrder,
      active,
    } = body;

    if (!planKey || !name || priceMonthlyUsdCents === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: planKey, name, priceMonthlyUsdCents' },
        { status: 400 }
      );
    }

    // Check if planKey already exists
    const existing = await prisma.billingPlan.findUnique({
      where: { planKey },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A plan with this key already exists' },
        { status: 400 }
      );
    }

    // Create Stripe product and price
    const stripeProduct = await stripe.products.create({
      name: `MakeEstimate ${name}`,
      metadata: { planKey },
    });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: priceMonthlyUsdCents,
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: { planKey },
    });

    // Create plan in database
    const plan = await prisma.billingPlan.create({
      data: {
        planKey,
        name,
        priceMonthlyUsdCents,
        boqLimitPerPeriod: boqLimitPerPeriod ?? null,
        features: features || [],
        badgeText: badgeText || null,
        sortOrder: sortOrder ?? 0,
        active: active ?? true,
        stripeProductId: stripeProduct.id,
        stripePriceIdCurrent: stripePrice.id,
      },
    });

    // Record in price history
    await prisma.billingPlanPriceHistory.create({
      data: {
        billingPlanId: plan.id,
        stripePriceId: stripePrice.id,
        amountCents: priceMonthlyUsdCents,
        isCurrent: true,
      },
    });

    console.log('Created billing plan:', {
      planKey,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
  }
}
