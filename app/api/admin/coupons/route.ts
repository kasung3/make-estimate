import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';
import { CouponType, PlanKey } from '@prisma/client';

export const dynamic = 'force-dynamic';

// GET - List all coupons
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const coupons = await prisma.platformCoupon.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ coupons });
  } catch (error) {
    console.error('Get coupons error:', error);
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

// POST - Create a new coupon
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const {
      code,
      type,
      trialDays,
      allowedPlans,
      maxRedemptions,
      expiresAt,
    } = body as {
      code: string;
      type: CouponType;
      trialDays?: number;
      allowedPlans?: PlanKey[];
      maxRedemptions?: number;
      expiresAt?: string;
    };

    if (!code || !type) {
      return NextResponse.json({ error: 'Code and type are required' }, { status: 400 });
    }

    const normalizedCode = code.toUpperCase().trim();

    // Check if code already exists
    const existing = await prisma.platformCoupon.findUnique({
      where: { code: normalizedCode },
    });
    if (existing) {
      return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
    }

    let stripePromoCodeId: string | undefined;
    let stripeCouponId: string | undefined;

    // For free_forever coupons, create a 100% off coupon in Stripe
    if (type === 'free_forever') {
      // Create a forever 100% off coupon
      const stripeCoupon = await stripe.coupons.create({
        percent_off: 100,
        duration: 'forever',
        name: `Free Forever - ${normalizedCode}`,
      });
      stripeCouponId = stripeCoupon.id;

      // Create a promo code for this coupon
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const promoCodeParams: any = {
        coupon: stripeCoupon.id,
        code: normalizedCode,
      };
      if (maxRedemptions) promoCodeParams.max_redemptions = maxRedemptions;
      if (expiresAt) promoCodeParams.expires_at = Math.floor(new Date(expiresAt).getTime() / 1000);
      
      const promoCode = await stripe.promotionCodes.create(promoCodeParams);
      stripePromoCodeId = promoCode.id;
    }

    const coupon = await prisma.platformCoupon.create({
      data: {
        code: normalizedCode,
        type,
        trialDays: type === 'trial_days' ? trialDays : null,
        allowedPlans: allowedPlans || [],
        maxRedemptions: maxRedemptions || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        stripePromoCodeId,
        stripeCouponId,
      },
    });

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error('Create coupon error:', error);
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
  }
}
