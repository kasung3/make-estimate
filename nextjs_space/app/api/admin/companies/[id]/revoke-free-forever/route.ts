import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// POST - Revoke free forever access from a company
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

    if (!company.billing) {
      return NextResponse.json({ error: 'Company has no billing record' }, { status: 400 });
    }

    // Remove admin grant
    await prisma.companyBilling.update({
      where: { id: company.billing.id },
      data: {
        accessOverride: null,
        overridePlan: null,
        // Set status to canceled if they don't have a stripe subscription
        status: company.billing.stripeSubscriptionId ? company.billing.status : 'canceled',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Free access revoked. Company must subscribe to continue.',
    });
  } catch (error) {
    console.error('Revoke free forever error:', error);
    return NextResponse.json({ error: 'Failed to revoke free access' }, { status: 500 });
  }
}
