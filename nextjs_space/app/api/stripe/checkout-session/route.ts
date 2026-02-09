import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * GET /api/stripe/checkout-session?session_id=...
 * 
 * Verifies a Stripe Checkout Session belongs to the logged-in user's company
 * and returns session details for the success page.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'line_items', 'customer'],
    });

    if (!checkoutSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Get the company's billing record to verify ownership
    const billing = await prisma.companyBilling.findUnique({
      where: { companyId },
    });

    // Verify session belongs to this company
    // Check via customer ID or metadata
    const sessionCompanyId = checkoutSession.metadata?.companyId;
    const sessionCustomerId = typeof checkoutSession.customer === 'string' 
      ? checkoutSession.customer 
      : checkoutSession.customer?.id;

    const isOwner = 
      sessionCompanyId === companyId || 
      (billing?.stripeCustomerId && billing.stripeCustomerId === sessionCustomerId);

    if (!isOwner) {
      console.warn('Session ownership mismatch:', {
        sessionCompanyId,
        sessionCustomerId,
        userCompanyId: companyId,
        billingCustomerId: billing?.stripeCustomerId,
      });
      return NextResponse.json(
        { error: 'This checkout does not belong to your account.' },
        { status: 403 }
      );
    }

    // Extract useful information
    const planKey = checkoutSession.metadata?.planKey || null;
    const interval = checkoutSession.metadata?.interval || null;
    const paymentStatus = checkoutSession.payment_status;
    const status = checkoutSession.status;

    // Get amount from line items
    let amount = 0;
    let currency = 'usd';
    if (checkoutSession.line_items?.data?.length) {
      const lineItem = checkoutSession.line_items.data[0];
      amount = lineItem.amount_total || 0;
      currency = checkoutSession.currency || 'usd';
    }

    // Get subscription status if available
    let subscriptionStatus = null;
    if (checkoutSession.subscription) {
      const sub = typeof checkoutSession.subscription === 'string'
        ? await stripe.subscriptions.retrieve(checkoutSession.subscription)
        : checkoutSession.subscription;
      subscriptionStatus = sub.status;
    }

    return NextResponse.json({
      sessionId: checkoutSession.id,
      status,
      paymentStatus,
      subscriptionStatus,
      planKey,
      interval,
      amount,
      currency,
      customerEmail: checkoutSession.customer_details?.email || null,
    });
  } catch (error) {
    console.error('Checkout session verification error:', error);
    
    // Handle specific Stripe errors
    if (error instanceof Error && error.message.includes('No such checkout')) {
      return NextResponse.json(
        { error: 'Invalid or expired checkout session' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to verify checkout session' },
      { status: 500 }
    );
  }
}
