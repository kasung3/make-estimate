import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'No promo code provided' }, { status: 400 });
    }

    // Look up the coupon in our database
    const coupon = await prisma.platformCoupon.findFirst({
      where: {
        code: code.toUpperCase(),
        active: true,
        archived: false,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
    });

    if (!coupon) {
      return NextResponse.json(
        { valid: false, message: 'Invalid or expired promo code' },
        { status: 400 }
      );
    }

    // Check max redemptions
    if (
      coupon.maxRedemptions !== null &&
      coupon.currentRedemptions >= coupon.maxRedemptions
    ) {
      return NextResponse.json(
        { valid: false, message: 'This promo code has reached its maximum uses' },
        { status: 400 }
      );
    }

    // Build response message based on coupon type
    let message = 'Valid promo code!';
    if (coupon.type === 'trial_days' && coupon.trialDays) {
      message = `${coupon.trialDays}-day free trial`;
    } else if (coupon.type === 'free_forever') {
      message = 'Free forever!';
    }

    // Include allowed plans info
    if (coupon.allowedPlans.length > 0) {
      const planNames = coupon.allowedPlans.map(p => 
        p === 'starter' ? 'Starter' : 'Business'
      ).join(' or ');
      message += ` (Valid for ${planNames} plan)`;
    }

    return NextResponse.json({
      valid: true,
      message,
      type: coupon.type,
      trialDays: coupon.trialDays,
      allowedPlans: coupon.allowedPlans,
    });
  } catch (error) {
    console.error('Promo validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    );
  }
}
