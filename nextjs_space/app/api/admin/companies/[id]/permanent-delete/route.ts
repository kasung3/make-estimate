import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// DELETE - Permanently delete company and all related data
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        billing: true,
        memberships: { include: { user: { select: { id: true, email: true } } } },
      },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Cancel Stripe subscription if active
    if (company.billing?.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(company.billing.stripeSubscriptionId);
      } catch (stripeError) {
        console.error('Failed to cancel Stripe subscription:', stripeError);
      }
    }

    // Check if admin user is a member of this company
    const adminIsMember = company.memberships.some(m => m.user.email === session.user?.email);
    if (adminIsMember) {
      return NextResponse.json({ error: 'Cannot delete a company you belong to' }, { status: 400 });
    }

    // Delete everything in transaction
    await prisma.$transaction(async (tx) => {
      // Get all BOQ IDs for this company
      const boqs = await tx.boq.findMany({ where: { companyId: id }, select: { id: true } });
      const boqIds = boqs.map(b => b.id);

      // Get all category IDs
      const categories = await tx.boqCategory.findMany({ where: { boqId: { in: boqIds } }, select: { id: true } });
      const categoryIds = categories.map(c => c.id);

      // Delete BOQ items
      await tx.boqItem.deleteMany({ where: { categoryId: { in: categoryIds } } });
      // Delete BOQ categories
      await tx.boqCategory.deleteMany({ where: { boqId: { in: boqIds } } });
      // Delete PDF export jobs
      await tx.pdfExportJob.deleteMany({ where: { boqId: { in: boqIds } } });
      // Delete BOQs
      await tx.boq.deleteMany({ where: { companyId: id } });
      // Delete BOQ creation events
      await tx.boqCreationEvent.deleteMany({ where: { companyId: id } });
      // Delete customers
      await tx.customer.deleteMany({ where: { companyId: id } });
      // Delete PDF themes
      await tx.pdfTheme.deleteMany({ where: { companyId: id } });
      // Delete cover templates
      await tx.pdfCoverTemplate.deleteMany({ where: { companyId: id } });
      // Delete access grants
      await tx.companyAccessGrant.deleteMany({ where: { companyId: id } });

      // Delete billing data
      if (company.billing) {
        await tx.billingInvoice.deleteMany({ where: { billingId: company.billing.id } });
        await tx.couponRedemption.deleteMany({ where: { billingId: company.billing.id } });
        await tx.companyBilling.delete({ where: { companyId: id } });
      }

      // Delete memberships and users who only belong to this company
      const memberUserIds = company.memberships.map(m => m.user.id);
      await tx.companyMembership.deleteMany({ where: { companyId: id } });

      // Delete users who have no other memberships
      for (const userId of memberUserIds) {
        const otherMemberships = await tx.companyMembership.count({ where: { userId } });
        if (otherMemberships === 0) {
          await tx.account.deleteMany({ where: { userId } });
          await tx.session.deleteMany({ where: { userId } });
          await tx.user.delete({ where: { id: userId } });
        }
      }

      // Delete the company
      await tx.company.delete({ where: { id } });
    });

    return NextResponse.json({
      success: true,
      message: 'Company and all related data permanently deleted from the database.',
    });
  } catch (error) {
    console.error('Permanent delete company error:', error);
    return NextResponse.json({ error: 'Failed to permanently delete company' }, { status: 500 });
  }
}
