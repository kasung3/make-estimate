import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

/**
 * POST /api/billing/cancel-at-period-end
 * Sets the Stripe subscription to cancel at the end of the current billing period.
 * User keeps full access until current_period_end.
 */
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;
    const userId = session.user.id;

    // Check if user is admin
    const membership = await prisma.companyMembership.findFirst({
      where: {
        userId,
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

    // Get billing record
    const billing = await prisma.companyBilling.findUnique({
      where: { companyId },
    });

    if (!billing?.stripeSubscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      );
    }

    // Already canceling?
    if (billing.cancelAtPeriodEnd) {
      return NextResponse.json(
        { error: 'Subscription is already scheduled for cancellation' },
        { status: 400 }
      );
    }

    // Update Stripe subscription to cancel at period end
    const subscription = await stripe.subscriptions.update(
      billing.stripeSubscriptionId,
      { cancel_at_period_end: true }
    );

    // Cast to access period dates
    const subData = subscription as any;
    const periodEnd = subData.current_period_end
      ? new Date(subData.current_period_end * 1000)
      : billing.currentPeriodEnd;

    // Update local record
    await prisma.companyBilling.update({
      where: { companyId },
      data: {
        cancelAtPeriodEnd: true,
      },
    });

    console.log(`[Billing] Company ${companyId} scheduled subscription cancellation at period end`);

    return NextResponse.json({
      success: true,
      cancelAtPeriodEnd: true,
      currentPeriodEnd: periodEnd?.toISOString() ?? null,
      message: 'Subscription will cancel at the end of the current billing period',
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
