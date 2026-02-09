import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// POST - Remove coupon/discount from a company's subscription
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;

    // Get company
    const company = await prisma.company.findUnique({
      where: { id },
      include: { billing: true },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    if (!company.billing) {
      return NextResponse.json({ error: 'Company has no billing record' }, { status: 400 });
    }

    // If the company has a free_forever coupon override, remove it
    if (company.billing.accessOverride === 'free_forever') {
      await prisma.companyBilling.update({
        where: { id: company.billing.id },
        data: {
          accessOverride: null,
          overridePlan: null,
          currentCouponCode: null,
          status: 'canceled', // They need to re-subscribe
        },
      });

      // Record the revocation
      const activeRedemptions = await prisma.couponRedemption.findMany({
        where: {
          companyBillingId: company.billing.id,
          revokedAt: null,
        },
      });

      for (const redemption of activeRedemptions) {
        await prisma.couponRedemption.update({
          where: { id: redemption.id },
          data: {
            revokedAt: new Date(),
            revokedByAdminId: session.user.email,
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Coupon removed. Company must subscribe to continue.',
      });
    }

    // If there's a Stripe subscription with a discount, remove it
    if (company.billing.stripeSubscriptionId) {
      try {
        // Delete all discounts from the subscription
        await stripe.subscriptions.deleteDiscount(
          company.billing.stripeSubscriptionId
        );
        console.log(`Removed discount from subscription ${company.billing.stripeSubscriptionId}`);

        // Update local record
        await prisma.companyBilling.update({
          where: { id: company.billing.id },
          data: {
            currentCouponCode: null,
          },
        });

        return NextResponse.json({
          success: true,
          message: 'Discount removed from Stripe subscription.',
        });
      } catch (stripeError: any) {
        // If no discount exists, that's fine
        if (stripeError.code === 'resource_missing') {
          return NextResponse.json({
            success: true,
            message: 'No active discount to remove.',
          });
        }
        throw stripeError;
      }
    }

    // Just clear local coupon code
    await prisma.companyBilling.update({
      where: { id: company.billing.id },
      data: {
        currentCouponCode: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Coupon record cleared.',
    });
  } catch (error) {
    console.error('Remove coupon error:', error);
    return NextResponse.json({ error: 'Failed to remove coupon' }, { status: 500 });
  }
}
