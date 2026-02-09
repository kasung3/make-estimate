import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { getOrCreateBilling, getPlanFromDb } from '@/lib/billing';
import { addDays } from 'date-fns';

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
    const { planKey, interval, promoCode } = body as { 
      planKey: string; 
      interval?: 'monthly' | 'annual';
      promoCode?: string 
    };

    // Default to monthly if not specified
    const billingInterval = interval === 'annual' ? 'year' : 'month';

    // Validate plan from DB (dynamic pricing)
    const plan = await getPlanFromDb(planKey);
    if (!plan || !plan.active) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Determine which Stripe price ID to use based on interval
    const stripePriceId = billingInterval === 'year' 
      ? plan.stripePriceIdAnnual 
      : plan.stripePriceIdMonthly;

    // Ensure plan has a Stripe price ID for selected interval
    if (!stripePriceId) {
      return NextResponse.json(
        { error: `Plan not configured for ${billingInterval}ly payment. Please contact support.` },
        { status: 500 }
      );
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

    // Validate promo code if provided
    let trialPeriodDays: number | undefined;
    let discounts: { promotion_code: string }[] = [];
    let skipStripeCheckout = false;
    let grantType: 'trial' | 'free_forever' | null = null;
    let platformCoupon: any = null;

    if (promoCode) {
      // First check our database for the coupon
      platformCoupon = await prisma.platformCoupon.findFirst({
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
        // Trial coupons bypass Stripe - create internal grant
        skipStripeCheckout = true;
        grantType = 'trial';
        trialPeriodDays = platformCoupon.trialDays;
      } else if (platformCoupon.type === 'free_forever') {
        // Free forever coupons bypass Stripe - create internal grant
        skipStripeCheckout = true;
        grantType = 'free_forever';
      }
    }

    // If coupon grants access without payment, skip Stripe checkout
    if (skipStripeCheckout && grantType && platformCoupon) {
      const now = new Date();
      const endsAt = grantType === 'trial' && trialPeriodDays 
        ? addDays(now, trialPeriodDays) 
        : null;

      // Create access grant
      await prisma.companyAccessGrant.create({
        data: {
          companyId,
          grantType,
          planKey,
          couponId: platformCoupon.id,
          startsAt: now,
          endsAt,
        },
      });

      // Record coupon redemption
      await prisma.couponRedemption.create({
        data: {
          companyBillingId: billing.id,
          couponCode: platformCoupon.code,
          couponType: platformCoupon.type,
          source: 'checkout',
        },
      });

      // Increment coupon usage
      await prisma.platformCoupon.update({
        where: { id: platformCoupon.id },
        data: { currentRedemptions: { increment: 1 } },
      });

      // Update billing record with current coupon
      await prisma.companyBilling.update({
        where: { id: billing.id },
        data: { currentCouponCode: platformCoupon.code },
      });

      console.log('Access grant created (no Stripe):', {
        companyId,
        planKey,
        grantType,
        endsAt,
        couponCode: platformCoupon.code,
      });

      // Return success without Stripe URL - redirect to dashboard
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      return NextResponse.json({ 
        url: `${baseUrl}/app/dashboard?billing=success&grant=${grantType}`,
        grantCreated: true,
        grantType,
        endsAt,
      });
    }

    // Continue with Stripe checkout for paid plans
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

    // Build checkout session params
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Determine seat quantity for per-seat plans
    const seatQuantity = plan.seatModel === 'per_seat' 
      ? await prisma.companyMembership.count({
          where: { companyId, isActive: true }
        })
      : 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkoutParams: any = {
      customer: stripeCustomerId,
      mode: 'subscription',
      line_items: [
        {
          price: stripePriceId, // Use correct price ID for selected interval
          quantity: seatQuantity,
        },
      ],
      success_url: `${baseUrl}/app/dashboard?billing=success`,
      cancel_url: `${baseUrl}/pricing?checkout=canceled`,
      metadata: {
        companyId,
        planKey,
        interval: billingInterval,
        promoCode: promoCode || '',
      },
      subscription_data: {
        metadata: {
          companyId,
          planKey,
          interval: billingInterval,
        },
      },
    };

    // Add discount if applicable (paid discount coupons that have Stripe promo code)
    if (platformCoupon?.stripePromoCodeId && !skipStripeCheckout) {
      checkoutParams.discounts = [{ promotion_code: platformCoupon.stripePromoCodeId }];
    }

    const checkoutSession = await stripe.checkout.sessions.create(checkoutParams);

    // Validate that we got a valid checkout URL
    if (!checkoutSession.url) {
      console.error('Stripe returned session without URL:', checkoutSession.id);
      return NextResponse.json(
        { error: 'Failed to get checkout URL from Stripe' },
        { status: 500 }
      );
    }

    console.log('Checkout session created:', {
      sessionId: checkoutSession.id,
      companyId,
      planKey,
      hasUrl: !!checkoutSession.url,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create checkout session';
    if (error instanceof Error) {
      if (error.message.includes('No such price')) {
        errorMessage = 'Invalid price configuration. Please contact support.';
      } else if (error.message.includes('api_key')) {
        errorMessage = 'Payment system configuration error. Please contact support.';
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
