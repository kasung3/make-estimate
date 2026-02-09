import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';
import { PlanKey } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// POST - Grant free forever access to a company
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
    const { plan = 'business', cancelStripeSubscription = true } = body;

    // Get company
    const company = await prisma.company.findUnique({
      where: { id },
      include: { billing: true },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Cancel existing Stripe subscription if requested
    if (cancelStripeSubscription && company.billing?.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(company.billing.stripeSubscriptionId);
        console.log(`Canceled subscription ${company.billing.stripeSubscriptionId} for admin grant`);
      } catch (stripeError) {
        console.error('Failed to cancel Stripe subscription:', stripeError);
        // Continue even if cancellation fails
      }
    }

    // Update or create billing record with admin grant
    if (company.billing) {
      await prisma.companyBilling.update({
        where: { id: company.billing.id },
        data: {
          accessOverride: 'admin_grant',
          overridePlan: plan as PlanKey,
          status: 'active', // Mark as active
        },
      });
    } else {
      await prisma.companyBilling.create({
        data: {
          companyId: id,
          accessOverride: 'admin_grant',
          overridePlan: plan as PlanKey,
          status: 'active',
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Company granted free ${plan} access`,
    });
  } catch (error) {
    console.error('Grant free forever error:', error);
    return NextResponse.json({ error: 'Failed to grant free access' }, { status: 500 });
  }
}
