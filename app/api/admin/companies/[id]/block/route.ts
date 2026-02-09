import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// POST - Block company and cancel their Stripe subscription
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

    // Get company and billing info
    const company = await prisma.company.findUnique({
      where: { id },
      include: { billing: true },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Block the company
    await prisma.company.update({
      where: { id },
      data: {
        isBlocked: true,
        blockReason: blockReason || 'Blocked by platform admin',
      },
    });

    // Cancel Stripe subscription if requested
    if (cancelSubscription && company.billing?.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(company.billing.stripeSubscriptionId);
        console.log(`Canceled subscription ${company.billing.stripeSubscriptionId} for blocked company ${id}`);

        // Update billing status in DB
        await prisma.companyBilling.update({
          where: { id: company.billing.id },
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

    return NextResponse.json({ success: true, message: 'Company blocked successfully' });
  } catch (error) {
    console.error('Block company error:', error);
    return NextResponse.json({ error: 'Failed to block company' }, { status: 500 });
  }
}
