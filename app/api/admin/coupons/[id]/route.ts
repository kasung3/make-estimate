import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// PUT - Update coupon (toggle active, archive)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();
    const { active, archived } = body as { active?: boolean; archived?: boolean };

    const coupon = await prisma.platformCoupon.findUnique({
      where: { id },
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    // If deactivating a Stripe promo code, deactivate it in Stripe too
    if (coupon.stripePromoCodeId && (active === false || archived === true)) {
      try {
        await stripe.promotionCodes.update(coupon.stripePromoCodeId, {
          active: false,
        });
      } catch (stripeErr) {
        console.error('Stripe promo deactivation error:', stripeErr);
        // Continue anyway - local state is source of truth
      }
    }

    const updated = await prisma.platformCoupon.update({
      where: { id },
      data: {
        ...(active !== undefined && { active }),
        ...(archived !== undefined && { archived }),
      },
    });

    return NextResponse.json({ coupon: updated });
  } catch (error) {
    console.error('Update coupon error:', error);
    return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
  }
}

// DELETE - Hard delete a coupon (only if never used)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;

    const coupon = await prisma.platformCoupon.findUnique({
      where: { id },
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    // Only allow deletion if never used
    if (coupon.currentRedemptions > 0) {
      return NextResponse.json(
        { error: 'Cannot delete a coupon that has been used. Archive it instead.' },
        { status: 400 }
      );
    }

    // Delete from Stripe if applicable
    if (coupon.stripePromoCodeId) {
      try {
        await stripe.promotionCodes.update(coupon.stripePromoCodeId, {
          active: false,
        });
      } catch (stripeErr) {
        console.error('Stripe cleanup error:', stripeErr);
      }
    }

    if (coupon.stripeCouponId) {
      try {
        await stripe.coupons.del(coupon.stripeCouponId);
      } catch (stripeErr) {
        console.error('Stripe coupon delete error:', stripeErr);
      }
    }

    await prisma.platformCoupon.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete coupon error:', error);
    return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
  }
}
