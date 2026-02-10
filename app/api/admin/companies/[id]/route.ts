import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

// GET /api/admin/companies/[id] - Get company detail
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

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        billing: {
          include: {
            invoices: {
              orderBy: { createdAt: 'desc' },
              take: 10,
            },
            couponRedemptions: {
              orderBy: { redeemedAt: 'desc' },
            },
          },
        },
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                firstName: true,
                lastName: true,
                phone: true,
                country: true,
                isBlocked: true,
                lastLoginAt: true,
                createdAt: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: {
            boqs: true,
            customers: true,
            pdfThemes: true,
            pdfCoverTemplates: true,
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Get BOQ creation count for current billing period
    const now = new Date();
    const periodStart = company.billing?.currentPeriodStart || new Date(now.getFullYear(), now.getMonth(), 1);
    const boqsThisPeriod = await prisma.boqCreationEvent.count({
      where: {
        companyId: id,
        createdAt: { gte: periodStart },
      },
    });

    // Get grants
    const grants = await prisma.companyAccessGrant.findMany({
      where: { companyId: id },
      orderBy: { createdAt: 'desc' },
    });

    // Transform members with role info
    const members = company.memberships.map((m: any) => ({
      id: m.user.id,
      email: m.user.email,
      name: m.user.name,
      firstName: m.user.firstName,
      lastName: m.user.lastName,
      fullName: [m.user.firstName, m.user.lastName].filter(Boolean).join(' ') || m.user.name || null,
      phone: m.user.phone,
      country: m.user.country,
      role: m.role,
      isActive: m.isActive,
      isBlocked: m.user.isBlocked,
      lastLoginAt: m.user.lastLoginAt,
      memberSince: m.createdAt,
    }));

    return NextResponse.json({
      company: {
        id: company.id,
        name: company.name,
        currencySymbol: company.currencySymbol,
        currencyPosition: company.currencyPosition,
        defaultVatPercent: company.defaultVatPercent,
        isBlocked: company.isBlocked,
        blockReason: company.blockReason,
        deletedAt: company.deletedAt,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      },
      billing: company.billing,
      members,
      grants,
      usage: {
        boqsThisPeriod,
        totalBoqs: company._count.boqs,
        totalCustomers: company._count.customers,
        boqTemplates: company._count.pdfThemes,
        coverTemplates: company._count.pdfCoverTemplates,
        activeMembersCount: company.memberships.filter((m: any) => m.isActive).length,
      },
    });
  } catch (error) {
    console.error('Error fetching company detail:', error);
    return NextResponse.json({ error: 'Failed to fetch company detail' }, { status: 500 });
  }
}

// PUT /api/admin/companies/[id] - Update company (name, etc.)
export async function PUT(
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
    const { name } = body;

    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const updateData: any = {};
    if (name !== undefined && name.trim()) {
      updateData.name = name.trim();
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const updated = await prisma.company.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, company: updated });
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json({ error: 'Failed to update company' }, { status: 500 });
  }
}

// DELETE /api/admin/companies/[id] - Soft delete company
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
      include: { billing: true },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    if (company.deletedAt) {
      return NextResponse.json({ error: 'Company already deleted' }, { status: 400 });
    }

    // Cancel Stripe subscription if active
    if (company.billing?.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(company.billing.stripeSubscriptionId);
        console.log(`Canceled subscription ${company.billing.stripeSubscriptionId} for deleted company ${id}`);
      } catch (stripeError) {
        console.error('Failed to cancel Stripe subscription:', stripeError);
        // Continue with delete even if Stripe cancellation fails
      }
    }

    // Soft delete: set deletedAt and block access
    await prisma.company.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isBlocked: true,
        blockReason: 'Company deleted by platform admin',
      },
    });

    // Also deactivate all memberships
    await prisma.companyMembership.updateMany({
      where: { companyId: id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true, message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 });
  }
}
