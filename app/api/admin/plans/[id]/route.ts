import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';
import { SeatModel } from '@prisma/client';

export const dynamic = 'force-dynamic';

// Helper: Create or reuse Stripe price for a given amount/interval/product
async function ensureStripePrice(
  productId: string,
  amountCents: number,
  interval: 'month' | 'year',
  planKey: string
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
  const newPrice = await stripe.prices.create({
    product: productId,
    unit_amount: amountCents,
    currency: 'usd',
    recurring: { interval },
    metadata: { planKey, interval },
  });

  console.log(`Created new Stripe price: ${newPrice.id} for ${planKey} ${interval} at $${amountCents / 100}`);
  return newPrice.id;
}

// GET single plan
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const plan = await prisma.billingPlan.findUnique({
      where: { id: params.id },
      include: {
        priceHistory: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json({ error: 'Failed to fetch plan' }, { status: 500 });
  }
}

// PUT update plan (including price change which auto-creates Stripe prices)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const plan = await prisma.billingPlan.findUnique({
      where: { id: params.id },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
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

    // Build update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (seatModel !== undefined) updateData.seatModel = seatModel as SeatModel;
    if (boqLimitPerPeriod !== undefined) updateData.boqLimitPerPeriod = boqLimitPerPeriod;
    if (boqTemplatesLimit !== undefined) updateData.boqTemplatesLimit = boqTemplatesLimit;
    if (coverTemplatesLimit !== undefined) updateData.coverTemplatesLimit = coverTemplatesLimit;
    if (logoUploadAllowed !== undefined) updateData.logoUploadAllowed = logoUploadAllowed;
    if (sharingAllowed !== undefined) updateData.sharingAllowed = sharingAllowed;
    if (maxActiveMembers !== undefined) updateData.maxActiveMembers = maxActiveMembers;
    if (features !== undefined) updateData.features = features;
    if (isMostPopular !== undefined) updateData.isMostPopular = isMostPopular;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (active !== undefined) updateData.active = active;

    // Ensure Stripe product exists
    let stripeProductId = plan.stripeProductId;
    if (!stripeProductId) {
      const stripeProduct = await stripe.products.create({
        name: `MakeEstimate ${name || plan.name}`,
        metadata: { planKey: plan.planKey, seatModel: seatModel || plan.seatModel },
      });
      stripeProductId = stripeProduct.id;
      updateData.stripeProductId = stripeProductId;
    }

    // Handle monthly price change - auto-create new Stripe price
    const monthlyPriceChanged = priceMonthlyUsdCents !== undefined && priceMonthlyUsdCents !== plan.priceMonthlyUsdCents;
    if (monthlyPriceChanged) {
      const newMonthlyPriceId = await ensureStripePrice(
        stripeProductId,
        priceMonthlyUsdCents,
        'month',
        plan.planKey
      );

      // Mark old monthly prices as not current
      await prisma.billingPlanPriceHistory.updateMany({
        where: {
          billingPlanId: plan.id,
          interval: 'month',
          isCurrent: true,
        },
        data: { isCurrent: false },
      });

      // Record new price in history
      await prisma.billingPlanPriceHistory.create({
        data: {
          billingPlanId: plan.id,
          stripePriceId: newMonthlyPriceId,
          amountCents: priceMonthlyUsdCents,
          interval: 'month',
          isCurrent: true,
        },
      });

      updateData.priceMonthlyUsdCents = priceMonthlyUsdCents;
      updateData.stripePriceIdMonthly = newMonthlyPriceId;

      console.log('Updated monthly Stripe price:', {
        planKey: plan.planKey,
        oldPrice: plan.priceMonthlyUsdCents,
        newPrice: priceMonthlyUsdCents,
        stripePriceId: newMonthlyPriceId,
      });
    }

    // Handle annual price change - auto-create new Stripe price
    const annualPriceChanged = priceAnnualUsdCents !== undefined && priceAnnualUsdCents !== plan.priceAnnualUsdCents;
    if (annualPriceChanged) {
      if (priceAnnualUsdCents === null || priceAnnualUsdCents === 0) {
        // Remove annual pricing
        updateData.priceAnnualUsdCents = null;
        updateData.stripePriceIdAnnual = null;
        
        // Mark old annual prices as not current
        await prisma.billingPlanPriceHistory.updateMany({
          where: {
            billingPlanId: plan.id,
            interval: 'year',
            isCurrent: true,
          },
          data: { isCurrent: false },
        });
      } else {
        const newAnnualPriceId = await ensureStripePrice(
          stripeProductId,
          priceAnnualUsdCents,
          'year',
          plan.planKey
        );

        // Mark old annual prices as not current
        await prisma.billingPlanPriceHistory.updateMany({
          where: {
            billingPlanId: plan.id,
            interval: 'year',
            isCurrent: true,
          },
          data: { isCurrent: false },
        });

        // Record new price in history
        await prisma.billingPlanPriceHistory.create({
          data: {
            billingPlanId: plan.id,
            stripePriceId: newAnnualPriceId,
            amountCents: priceAnnualUsdCents,
            interval: 'year',
            isCurrent: true,
          },
        });

        updateData.priceAnnualUsdCents = priceAnnualUsdCents;
        updateData.stripePriceIdAnnual = newAnnualPriceId;

        console.log('Updated annual Stripe price:', {
          planKey: plan.planKey,
          oldPrice: plan.priceAnnualUsdCents,
          newPrice: priceAnnualUsdCents,
          stripePriceId: newAnnualPriceId,
        });
      }
    }

    // Update plan in database
    const updatedPlan = await prisma.billingPlan.update({
      where: { id: params.id },
      data: updateData,
      include: {
        priceHistory: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    return NextResponse.json(updatedPlan);
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
  }
}

// DELETE plan (soft delete - just mark inactive)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Soft delete - mark as inactive
    await prisma.billingPlan.update({
      where: { id: params.id },
      data: { active: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
  }
}
