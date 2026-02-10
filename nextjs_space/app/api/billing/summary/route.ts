import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getCompanyBillingStatus, getPlanFromDb, getActivePlans } from '@/lib/billing';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

interface InvoiceInfo {
  id: string;
  stripeInvoiceId: string;
  number: string | null;
  amountPaid: number;
  currency: string;
  status: string;
  paidAt: string | null;
  hostedInvoiceUrl: string | null;
  pdfUrl: string | null;
  periodStart: string | null;
  periodEnd: string | null;
}

/**
 * GET /api/billing/summary
 * Returns comprehensive billing information for the company.
 * Includes: current plan, subscription status, invoices, seat count, etc.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;
    const userId = session.user.id;

    // Check if user is admin for full access
    const membership = await prisma.companyMembership.findFirst({
      where: { userId, companyId },
    });
    const isAdmin = membership?.role === 'ADMIN';

    // Get billing status
    const billingStatus = await getCompanyBillingStatus(companyId);

    // Get billing record with invoices
    const billing = await prisma.companyBilling.findUnique({
      where: { companyId },
      include: {
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 20, // Last 20 invoices
        },
      },
    });

    // Get plan details
    let planInfo = null;
    if (billingStatus.planKey) {
      const plan = await getPlanFromDb(billingStatus.planKey);
      if (plan) {
        planInfo = {
          planKey: plan.planKey,
          name: plan.name,
          priceMonthlyUsdCents: plan.priceMonthlyUsdCents,
          priceAnnualUsdCents: plan.priceAnnualUsdCents,
          seatModel: plan.seatModel,
          boqLimitPerPeriod: plan.boqLimitPerPeriod,
          maxActiveMembers: plan.maxActiveMembers,
          features: plan.features as string[],
        };
      }
    }

    // Get member count for seat-based plans
    const activeMemberCount = await prisma.companyMembership.count({
      where: { companyId, isActive: true },
    });

    // Format invoices
    const invoices: InvoiceInfo[] = (billing?.invoices || []).map((inv) => ({
      id: inv.id,
      stripeInvoiceId: inv.stripeInvoiceId,
      number: inv.stripeInvoiceId, // Use stripeInvoiceId as number if no separate number field
      amountPaid: inv.amountPaid,
      currency: inv.currency,
      status: inv.status,
      paidAt: inv.createdAt?.toISOString() ?? null,
      hostedInvoiceUrl: inv.hostedInvoiceUrl,
      pdfUrl: inv.pdfUrl,
      periodStart: inv.periodStart?.toISOString() ?? null,
      periodEnd: inv.periodEnd?.toISOString() ?? null,
    }));

    // If we don't have local invoices, try fetching from Stripe (if admin and has customer ID)
    if (invoices.length === 0 && isAdmin && billing?.stripeCustomerId) {
      try {
        const stripeInvoices = await stripe.invoices.list({
          customer: billing.stripeCustomerId,
          limit: 20,
        });

        for (const inv of stripeInvoices.data) {
          invoices.push({
            id: inv.id,
            stripeInvoiceId: inv.id,
            number: inv.number,
            amountPaid: inv.amount_paid,
            currency: inv.currency,
            status: inv.status ?? 'unknown',
            paidAt: inv.status_transitions?.paid_at
              ? new Date(inv.status_transitions.paid_at * 1000).toISOString()
              : null,
            hostedInvoiceUrl: inv.hosted_invoice_url ?? null,
            pdfUrl: inv.invoice_pdf ?? null,
            periodStart: inv.period_start
              ? new Date(inv.period_start * 1000).toISOString()
              : null,
            periodEnd: inv.period_end
              ? new Date(inv.period_end * 1000).toISOString()
              : null,
          });
        }
      } catch (stripeError) {
        console.error('Failed to fetch Stripe invoices:', stripeError);
        // Continue without Stripe invoices
      }
    }

    // Build response
    const response = {
      // User context
      isAdmin,

      // Plan & subscription info
      planKey: billingStatus.planKey,
      planName: planInfo?.name ?? billingStatus.planKey ?? 'No Plan',
      planInfo,
      status: billingStatus.status,
      billingInterval: billing?.billingInterval ?? 'month',
      
      // Access info
      hasActiveSubscription: billingStatus.hasActiveSubscription,
      hasAdminGrant: billingStatus.hasAdminGrant,
      hasTrialGrant: billingStatus.hasTrialGrant,
      accessSource: billingStatus.accessSource,
      activeGrant: billingStatus.activeGrant,

      // Period info
      currentPeriodStart: billingStatus.currentPeriodStart?.toISOString() ?? null,
      currentPeriodEnd: billingStatus.currentPeriodEnd?.toISOString() ?? null,
      
      // Cancellation status
      cancelAtPeriodEnd: billingStatus.cancelAtPeriodEnd,
      
      // Usage
      boqsUsedThisPeriod: billingStatus.boqsUsedThisPeriod,
      boqLimit: billingStatus.boqLimit,
      canCreateBoq: billingStatus.canCreateBoq,

      // Seats (for per-seat billing)
      seatModel: planInfo?.seatModel ?? 'flat',
      seatQuantity: billing?.seatQuantity ?? 1,
      activeMemberCount,
      maxActiveMembers: planInfo?.maxActiveMembers ?? null,

      // Stripe IDs (for admin)
      stripeCustomerId: isAdmin ? billing?.stripeCustomerId : null,
      stripeSubscriptionId: isAdmin ? billing?.stripeSubscriptionId : null,

      // Invoices (for admin)
      invoices: isAdmin ? invoices : [],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Billing summary error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch billing summary' },
      { status: 500 }
    );
  }
}
