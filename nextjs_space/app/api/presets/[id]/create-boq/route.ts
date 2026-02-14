import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { getCompanyBillingStatus, getPlanFromDb } from '@/lib/billing';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

// POST - Create a new BOQ from a preset
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'No company found' }, { status: 400 });
    }

    // Check BOQ creation quota (same as regular BOQ creation)
    const billingStatus = await getCompanyBillingStatus(companyId);
    if (billingStatus.isBlocked) {
      return NextResponse.json({ error: 'Account is blocked' }, { status: 403 });
    }
    if (!billingStatus.canCreateBoq) {
      return NextResponse.json(
        { error: 'BOQ creation limit reached for this period. Upgrade your plan.' },
        { status: 403 }
      );
    }

    const { customerId, projectName } = await request.json();

    // Fetch preset
    const preset = await prisma.boq.findFirst({
      where: { id: params.id, companyId, isPreset: true },
      include: {
        categories: {
          include: { items: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!preset) {
      return NextResponse.json({ error: 'Preset not found' }, { status: 404 });
    }

    // Fetch company defaults
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { defaultVatPercent: true },
    });

    // Create new BOQ from preset
    const newBOQ = await prisma.boq.create({
      data: {
        companyId,
        customerId: customerId || null,
        projectName: projectName || preset.presetName || 'Untitled BOQ',
        isPreset: false,
        status: 'draft',
        discountEnabled: preset.discountEnabled,
        discountType: preset.discountType,
        discountValue: preset.discountValue,
        vatEnabled: preset.vatEnabled,
        vatPercent: preset.vatPercent,
      },
    });

    // Clone categories and items from preset
    for (const category of preset.categories) {
      const newCategory = await prisma.boqCategory.create({
        data: {
          boqId: newBOQ.id,
          name: category.name,
          sortOrder: category.sortOrder,
        },
      });

      for (const item of category.items) {
        await prisma.boqItem.create({
          data: {
            categoryId: newCategory.id,
            description: item.description,
            unit: item.unit,
            unitCost: item.unitCost,
            markupPct: item.markupPct,
            quantity: item.quantity,
            sortOrder: item.sortOrder,
            isNote: item.isNote,
            noteContent: item.noteContent,
            includeInPdf: item.includeInPdf,
          },
        });
      }
    }

    // Record BOQ creation event for quota tracking
    await prisma.boqCreationEvent.create({
      data: {
        companyId,
        boqId: newBOQ.id,
      },
    });

    return NextResponse.json({ id: newBOQ.id });
  } catch (error) {
    console.error('Error creating BOQ from preset:', error);
    return NextResponse.json({ error: 'Failed to create BOQ' }, { status: 500 });
  }
}
