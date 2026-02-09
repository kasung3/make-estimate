import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

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

// PUT update plan (including price change which creates new Stripe price)
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
      boqLimitPerPeriod,
      features,
      badgeText,
      sortOrder,
      active,
    } = body;

    // Build update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (boqLimitPerPeriod !== undefined) updateData.boqLimitPerPeriod = boqLimitPerPeriod;
    if (features !== undefined) updateData.features = features;
    if (badgeText !== undefined) updateData.badgeText = badgeText;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (active !== undefined) updateData.active = active;

    // Handle price change - create new Stripe price
    if (priceMonthlyUsdCents !== undefined && priceMonthlyUsdCents !== plan.priceMonthlyUsdCents) {
      // Create new Stripe price
      let stripeProductId = plan.stripeProductId;
      
      // If no Stripe product exists, create one
      if (!stripeProductId) {
        const stripeProduct = await stripe.products.create({
          name: `MakeEstimate ${name || plan.name}`,
          metadata: { planKey: plan.planKey },
        });
        stripeProductId = stripeProduct.id;
        updateData.stripeProductId = stripeProductId;
      }

      const newStripePrice = await stripe.prices.create({
        product: stripeProductId,
        unit_amount: priceMonthlyUsdCents,
        currency: 'usd',
        recurring: { interval: 'month' },
        metadata: { planKey: plan.planKey },
      });

      // Archive old price if it exists
      if (plan.stripePriceIdCurrent) {
        try {
          await stripe.prices.update(plan.stripePriceIdCurrent, {
            active: false,
          });
        } catch (e) {
          console.warn('Could not archive old Stripe price:', e);
        }

        // Mark old price as not current in history
        await prisma.billingPlanPriceHistory.updateMany({
          where: {
            billingPlanId: plan.id,
            isCurrent: true,
          },
          data: { isCurrent: false },
        });
      }

      // Record new price in history
      await prisma.billingPlanPriceHistory.create({
        data: {
          billingPlanId: plan.id,
          stripePriceId: newStripePrice.id,
          amountCents: priceMonthlyUsdCents,
          isCurrent: true,
        },
      });

      updateData.priceMonthlyUsdCents = priceMonthlyUsdCents;
      updateData.stripePriceIdCurrent = newStripePrice.id;

      console.log('Created new Stripe price:', {
        planKey: plan.planKey,
        oldPrice: plan.priceMonthlyUsdCents,
        newPrice: priceMonthlyUsdCents,
        stripePriceId: newStripePrice.id,
      });
    }

    // Update plan in database
    const updatedPlan = await prisma.billingPlan.update({
      where: { id: params.id },
      data: updateData,
      include: {
        priceHistory: {
          orderBy: { createdAt: 'desc' },
          take: 5,
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
