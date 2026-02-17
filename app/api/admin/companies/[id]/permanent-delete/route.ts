import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { isPlatformAdmin } from '@/lib/billing';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const companyId = params.id;

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        memberships: { include: { user: true } },
        _count: { select: { boqs: true, customers: true } },
      },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Hard delete company and all related data in a transaction
    await prisma.$transaction(async (tx: any) => {
      // Delete PDF export jobs for company BOQs
      await tx.pdfExportJob.deleteMany({ where: { companyId } });
      // Delete BOQ items for all BOQs
      const boqIds = (await tx.boq.findMany({ where: { companyId }, select: { id: true } })).map((b: any) => b.id);
      if (boqIds.length > 0) {
        await tx.boqItem.deleteMany({ where: { category: { boqId: { in: boqIds } } } });
        await tx.boqCategory.deleteMany({ where: { boqId: { in: boqIds } } });
      }
      // Delete BOQs
      await tx.boq.deleteMany({ where: { companyId } });
      // Delete BOQ creation events
      await tx.boqCreationEvent.deleteMany({ where: { companyId } });
      // Delete customers
      await tx.customer.deleteMany({ where: { companyId } });
      // Delete PDF templates and themes
      await tx.pdfCoverTemplate.deleteMany({ where: { companyId } });
      await tx.pdfTheme.deleteMany({ where: { companyId } });
      // Delete billing (invoices, coupon redemptions cascade via CompanyBilling onDelete)
      const billing = await tx.companyBilling.findUnique({ where: { companyId } });
      if (billing) {
        await tx.billingInvoice.deleteMany({ where: { companyBillingId: billing.id } });
        await tx.couponRedemption.deleteMany({ where: { companyBillingId: billing.id } });
        await tx.companyBilling.delete({ where: { companyId } });
      }
      // Delete access grants
      await tx.companyAccessGrant.deleteMany({ where: { companyId } });
      // Delete memberships
      await tx.companyMembership.deleteMany({ where: { companyId } });

      // Delete orphaned users (users who were only in this company)
      for (const membership of company.memberships) {
        const otherMemberships = await tx.companyMembership.count({
          where: { userId: membership.userId },
        });
        if (otherMemberships === 0 && !isPlatformAdmin(membership.user.email)) {
          await tx.user.delete({ where: { id: membership.userId } });
        }
      }

      // Finally delete the company
      await tx.company.delete({ where: { id: companyId } });
    });

    return NextResponse.json({
      success: true,
      message: `Company "${company.name}" and all related data permanently deleted`,
    });
  } catch (error) {
    console.error('Permanent company delete error:', error);
    return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 });
  }
}
