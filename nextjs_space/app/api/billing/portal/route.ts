import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;

    // Check if user is admin
    const membership = await prisma.companyMembership.findFirst({
      where: {
        userId: session.user.id,
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

    if (!billing?.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No billing account found. Please subscribe to a plan first.' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: billing.stripeCustomerId,
      return_url: `${baseUrl}/app/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Portal error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
