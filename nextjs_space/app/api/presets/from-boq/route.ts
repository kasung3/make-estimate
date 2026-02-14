import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { getCompanyBillingStatus } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// POST - Create a preset from an existing BOQ
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'No company found' }, { status: 400 });
    }

    // Check preset limit
    const billingStatus = await getCompanyBillingStatus(companyId);
    const limit = billingStatus.boqPresetsLimit;
    if (limit !== null) {
      const currentCount = await prisma.boq.count({
        where: { companyId, isPreset: true },
      });
      if (currentCount >= limit) {
        return NextResponse.json(
          { error: `Preset limit reached (${limit}). Upgrade for more.`, code: 'LIMIT_EXCEEDED' },
          { status: 403 }
        );
      }
    }

    const { boqId, presetName, saveQuantities } = await request.json();

    if (!boqId || !presetName) {
      return NextResponse.json({ error: 'boqId and presetName are required' }, { status: 400 });
    }

    // Fetch source BOQ
    const sourceBOQ = await prisma.boq.findFirst({
      where: { id: boqId, companyId, isPreset: false },
      include: {
        categories: {
          include: { items: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!sourceBOQ) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    // Create preset BOQ
    const preset = await prisma.boq.create({
      data: {
        companyId,
        projectName: presetName,
        isPreset: true,
        presetName,
        status: 'preset',
        discountEnabled: sourceBOQ.discountEnabled,
        discountType: sourceBOQ.discountType,
        discountValue: sourceBOQ.discountValue,
        vatEnabled: sourceBOQ.vatEnabled,
        vatPercent: sourceBOQ.vatPercent,
      },
    });

    // Clone categories and items
    for (const category of sourceBOQ.categories) {
      const newCategory = await prisma.boqCategory.create({
        data: {
          boqId: preset.id,
          name: category.name,
          sortOrder: category.sortOrder,
        },
      });

      // Clone items
      for (const item of category.items) {
        await prisma.boqItem.create({
          data: {
            categoryId: newCategory.id,
            description: item.description,
            unit: item.unit,
            unitCost: item.unitCost,
            markupPct: item.markupPct,
            quantity: saveQuantities ? item.quantity : 0,
            sortOrder: item.sortOrder,
            isNote: item.isNote,
            noteContent: item.noteContent,
            includeInPdf: item.includeInPdf,
          },
        });
      }
    }

    // Re-fetch with relations
    const fullPreset = await prisma.boq.findUnique({
      where: { id: preset.id },
      include: {
        categories: {
          include: { items: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return NextResponse.json(fullPreset);
  } catch (error) {
    console.error('Error creating preset from BOQ:', error);
    return NextResponse.json({ error: 'Failed to create preset' }, { status: 500 });
  }
}
