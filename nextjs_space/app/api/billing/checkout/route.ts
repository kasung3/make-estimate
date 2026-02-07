import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { stripe, PLANS, PlanKey } from '@/lib/stripe';
import { getOrCreateBilling } from '@/lib/billing';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId || !session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;
    const userEmail = session.user.email;

    // Check if user is admin of the company
    const membership = await prisma.companyMembership.findFirst({
      where: {
        userId: session.user.id,
        companyId,
        role: 'ADMIN',
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'Only company admins can manage billing' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { planKey, promoCode } = body as { planKey: PlanKey; promoCode?: string };

    // Validate plan
    const plan = PLANS[planKey];
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Get company info
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    if (company.isBlocked) {
      return NextResponse.json(
        { error: 'Your company has been blocked. Please contact support.' },
        { status: 403 }
      );
    }

    // Get or create billing record
    const billing = await getOrCreateBilling(companyId);

    // Get or create Stripe customer
    let stripeCustomerId = billing.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        name: company.name,
        metadata: {
          companyId,
        },
      });
      stripeCustomerId = customer.id;

      await prisma.companyBilling.update({
        where: { id: billing.id },
        data: { stripeCustomerId },
      });
    }

    // Validate promo code if provided
    let trialPeriodDays: number | undefined;
    let discounts: { promotion_code: string }[] = [];

    if (promoCode) {
      // First check our database for the coupon
      const platformCoupon = await prisma.platformCoupon.findFirst({
        where: {
          code: promoCode.toUpperCase(),
          active: true,
          archived: false,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
          ],
        },
      });

      if (!platformCoupon) {
        return NextResponse.json(
          { error: 'Invalid or expired promo code' },
          { status: 400 }
        );
      }

      // Check if allowed for this plan
      if (
        platformCoupon.allowedPlans.length > 0 &&
        !platformCoupon.allowedPlans.includes(planKey)
      ) {
        return NextResponse.json(
          { error: `This promo code is not valid for the ${plan.name} plan` },
          { status: 400 }
        );
      }

      // Check max redemptions
      if (
        platformCoupon.maxRedemptions !== null &&
        platformCoupon.currentRedemptions >= platformCoupon.maxRedemptions
      ) {
        return NextResponse.json(
          { error: 'This promo code has reached its maximum uses' },
          { status: 400 }
        );
      }

      // Apply based on coupon type
      if (platformCoupon.type === 'trial_days' && platformCoupon.trialDays) {
        trialPeriodDays = platformCoupon.trialDays;
      } else if (platformCoupon.type === 'free_forever' && platformCoupon.stripePromoCodeId) {
        discounts = [{ promotion_code: platformCoupon.stripePromoCodeId }];
      }
    }

    // Build checkout session params
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkoutParams: any = {
      customer: stripeCustomerId,
      mode: 'subscription',
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard?billing=success`,
      cancel_url: `${baseUrl}/dashboard?billing=canceled`,
      metadata: {
        companyId,
        planKey,
        promoCode: promoCode || '',
      },
    };

    // Add trial period if applicable
    if (trialPeriodDays) {
      checkoutParams.subscription_data = {
        trial_period_days: trialPeriodDays,
        metadata: {
          companyId,
          planKey,
        },
      };
    } else {
      checkoutParams.subscription_data = {
        metadata: {
          companyId,
          planKey,
        },
      };
    }

    // Add discount if applicable
    if (discounts.length > 0) {
      checkoutParams.discounts = discounts;
    }

    const checkoutSession = await stripe.checkout.sessions.create(checkoutParams);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
