import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';
import { SeatModel } from '@prisma/client';

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
          take: 10,
        },
      },
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}

// Helper: Create or reuse Stripe price for a given amount/interval/product
async function ensureStripePrice(
  productId: string,
  amountCents: number,
  interval: 'month' | 'year',
  planKey: string,
  seatModel: SeatModel
): Promise<string> {
  // Search for existing price with same amount and interval
  const existingPrices = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 100,
  });

  const matchingPrice = existingPrices.data.find(
    (p) => 
      p.unit_amount === amountCents && 
      p.recurring?.interval === interval &&
      p.currency === 'usd'
  );

  if (matchingPrice) {
    console.log(`Reusing existing Stripe price: ${matchingPrice.id} for ${planKey} ${interval}`);
    return matchingPrice.id;
  }

  // Create new price
  const priceData: any = {
    product: productId,
    unit_amount: amountCents,
    currency: 'usd',
    recurring: { interval },
    metadata: { planKey, interval },
  };

  // For per-seat plans, we need to use the metered/licensed approach
  // But Stripe handles quantity at subscription level, so unit_amount stays the same
  
  const newPrice = await stripe.prices.create(priceData);
  console.log(`Created new Stripe price: ${newPrice.id} for ${planKey} ${interval} at $${amountCents / 100}`);
  return newPrice.id;
}

// POST create new plan with auto-create Stripe prices
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
      priceAnnualUsdCents,
      seatModel,
      boqLimitPerPeriod,
      boqTemplatesLimit,
      coverTemplatesLimit,
      logoUploadAllowed,
      sharingAllowed,
      maxActiveMembers,
      features,
      isMostPopular,
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

    const resolvedSeatModel: SeatModel = seatModel || 'single';

    // Create Stripe product
    const stripeProduct = await stripe.products.create({
      name: `MakeEstimate ${name}`,
      metadata: { planKey, seatModel: resolvedSeatModel },
    });

    // Create monthly Stripe price
    const monthlyPriceId = await ensureStripePrice(
      stripeProduct.id,
      priceMonthlyUsdCents,
      'month',
      planKey,
      resolvedSeatModel
    );

    // Create annual Stripe price if provided
    let annualPriceId: string | null = null;
    if (priceAnnualUsdCents) {
      annualPriceId = await ensureStripePrice(
        stripeProduct.id,
        priceAnnualUsdCents,
        'year',
        planKey,
        resolvedSeatModel
      );
    }

    // Create plan in database
    const plan = await prisma.billingPlan.create({
      data: {
        planKey,
        name,
        priceMonthlyUsdCents,
        priceAnnualUsdCents: priceAnnualUsdCents ?? null,
        seatModel: resolvedSeatModel,
        boqLimitPerPeriod: boqLimitPerPeriod ?? null,
        boqTemplatesLimit: boqTemplatesLimit ?? null,
        coverTemplatesLimit: coverTemplatesLimit ?? null,
        logoUploadAllowed: logoUploadAllowed ?? false,
        sharingAllowed: sharingAllowed ?? false,
        maxActiveMembers: maxActiveMembers ?? 1,
        features: features || [],
        isMostPopular: isMostPopular ?? false,
        sortOrder: sortOrder ?? 0,
        active: active ?? true,
        stripeProductId: stripeProduct.id,
        stripePriceIdMonthly: monthlyPriceId,
        stripePriceIdAnnual: annualPriceId,
      },
    });

    // Record monthly price in history
    await prisma.billingPlanPriceHistory.create({
      data: {
        billingPlanId: plan.id,
        stripePriceId: monthlyPriceId,
        amountCents: priceMonthlyUsdCents,
        interval: 'month',
        isCurrent: true,
      },
    });

    // Record annual price in history if exists
    if (annualPriceId && priceAnnualUsdCents) {
      await prisma.billingPlanPriceHistory.create({
        data: {
          billingPlanId: plan.id,
          stripePriceId: annualPriceId,
          amountCents: priceAnnualUsdCents,
          interval: 'year',
          isCurrent: true,
        },
      });
    }

    console.log('Created billing plan:', {
      planKey,
      stripeProductId: stripeProduct.id,
      monthlyPriceId,
      annualPriceId,
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
  }
}
