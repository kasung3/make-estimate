import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// POST - Revoke free forever access and any active grants from a company
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

    const now = new Date();

    // Revoke any active access grants (trials or free_forever from coupons)
    const revokedGrants = await prisma.companyAccessGrant.updateMany({
      where: {
        companyId: id,
        revokedAt: null,
        OR: [
          { endsAt: null }, // free_forever grants
          { endsAt: { gt: now } }, // trials not yet expired
        ],
      },
      data: {
        revokedAt: now,
      },
    });

    // Remove admin grant from billing record if present
    if (company.billing) {
      await prisma.companyBilling.update({
        where: { id: company.billing.id },
        data: {
          accessOverride: null,
          overridePlan: null,
          currentCouponCode: null,
          // Set status to canceled if they don't have a stripe subscription
          status: company.billing.stripeSubscriptionId ? company.billing.status : 'canceled',
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Access revoked. ${revokedGrants.count} grant(s) revoked. Company must subscribe to continue.`,
      revokedGrantsCount: revokedGrants.count,
    });
  } catch (error) {
    console.error('Revoke access error:', error);
    return NextResponse.json({ error: 'Failed to revoke access' }, { status: 500 });
  }
}
