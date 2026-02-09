import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// POST - Block user and cancel their company's Stripe subscription
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
    const body = await request.json();
    const { blockReason, cancelSubscription = true } = body;

    // Get user and their company
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            company: {
              include: { billing: true },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Block the user
    await prisma.user.update({
      where: { id },
      data: {
        isBlocked: true,
        blockReason: blockReason || 'Blocked by platform admin',
      },
    });

    // Cancel Stripe subscription if requested
    const company = user.memberships[0]?.company;
    const billing = company?.billing;

    if (cancelSubscription && billing?.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(billing.stripeSubscriptionId);
        console.log(`Canceled subscription ${billing.stripeSubscriptionId} for blocked user ${id}`);

        // Update billing status in DB
        await prisma.companyBilling.update({
          where: { id: billing.id },
          data: {
            status: 'canceled',
            cancelAtPeriodEnd: false,
          },
        });
      } catch (stripeError) {
        console.error('Failed to cancel Stripe subscription:', stripeError);
        // Continue with block even if Stripe cancellation fails
      }
    }

    return NextResponse.json({ success: true, message: 'User blocked successfully' });
  } catch (error) {
    console.error('Block user error:', error);
    return NextResponse.json({ error: 'Failed to block user' }, { status: 500 });
  }
}
