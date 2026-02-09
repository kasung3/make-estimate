import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// GET - Get billing history for a company (invoices and coupon redemptions)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;

    // Get company billing record
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        billing: {
          include: {
            invoices: {
              orderBy: { createdAt: 'desc' },
            },
            couponRedemptions: {
              orderBy: { redeemedAt: 'desc' },
            },
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json({
      invoices: company.billing?.invoices || [],
      couponRedemptions: company.billing?.couponRedemptions || [],
      billing: company.billing ? {
        stripeCustomerId: company.billing.stripeCustomerId,
        stripeSubscriptionId: company.billing.stripeSubscriptionId,
        planKey: company.billing.planKey,
        status: company.billing.status,
        accessOverride: company.billing.accessOverride,
        currentCouponCode: company.billing.currentCouponCode,
      } : null,
    });
  } catch (error) {
    console.error('Get billing history error:', error);
    return NextResponse.json({ error: 'Failed to fetch billing history' }, { status: 500 });
  }
}
