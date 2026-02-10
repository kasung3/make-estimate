import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

/**
 * POST /api/billing/resume
 * Resumes a subscription that was scheduled to cancel at period end.
 * Sets cancel_at_period_end back to false.
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

    // Not canceling?
    if (!billing.cancelAtPeriodEnd) {
      return NextResponse.json(
        { error: 'Subscription is not scheduled for cancellation' },
        { status: 400 }
      );
    }

    // Check if subscription is still active in Stripe
    const subscription = await stripe.subscriptions.retrieve(billing.stripeSubscriptionId);
    
    if (subscription.status === 'canceled') {
      return NextResponse.json(
        { error: 'Subscription has already been canceled. Please subscribe again.' },
        { status: 400 }
      );
    }

    // Update Stripe subscription to resume (cancel_at_period_end = false)
    const updatedSubscription = await stripe.subscriptions.update(
      billing.stripeSubscriptionId,
      { cancel_at_period_end: false }
    );

    // Update local record
    await prisma.companyBilling.update({
      where: { companyId },
      data: {
        cancelAtPeriodEnd: false,
      },
    });

    console.log(`[Billing] Company ${companyId} resumed subscription`);

    return NextResponse.json({
      success: true,
      cancelAtPeriodEnd: false,
      message: 'Subscription auto-renew has been resumed',
    });
  } catch (error) {
    console.error('Resume subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to resume subscription' },
      { status: 500 }
    );
  }
}
