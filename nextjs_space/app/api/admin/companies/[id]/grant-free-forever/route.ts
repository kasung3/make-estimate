import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';
import { PlanKey } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// POST - Grant admin access to a company
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
    const { 
      plan = 'business', 
      cancelStripeSubscription = true,
      expiresAt = null,  // Optional expiry date (ISO string or null)
      notes = null,      // Optional notes
    } = body;

    // Validate plan
    const validPlans = ['starter', 'advance', 'business'];
    if (!validPlans.includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan. Must be starter, advance, or business.' }, { status: 400 });
    }

    // Get company
    const company = await prisma.company.findUnique({
      where: { id },
      include: { billing: true },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Get admin user ID
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    // Revoke any existing active admin grants for this company
    await prisma.companyAccessGrant.updateMany({
      where: {
        companyId: id,
        grantType: 'admin_grant',
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
        revokedById: adminUser?.id,
      },
    });

    // Create new admin grant record
    const grant = await prisma.companyAccessGrant.create({
      data: {
        companyId: id,
        grantType: 'admin_grant',
        planKey: plan,
        startsAt: new Date(),
        endsAt: expiresAt ? new Date(expiresAt) : null,
        notes: notes,
        createdByAdminUserId: adminUser?.id,
      },
    });

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

    const expiryMessage = expiresAt 
      ? ` (expires ${new Date(expiresAt).toLocaleDateString()})` 
      : ' (no expiry)';

    return NextResponse.json({
      success: true,
      message: `Company granted ${plan} access${expiryMessage}`,
      grant: {
        id: grant.id,
        planKey: grant.planKey,
        startsAt: grant.startsAt,
        endsAt: grant.endsAt,
      },
    });
  } catch (error) {
    console.error('Grant access error:', error);
    return NextResponse.json({ error: 'Failed to grant access' }, { status: 500 });
  }
}
