import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { getCompanyBillingStatus } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// POST - Create a preset from an existing BOQ
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'No company' }, { status: 400 });
    }

    // Check preset limit
    const billing = await getCompanyBillingStatus(companyId);
    const presetsLimit = billing.boqPresetsLimit;
    if (presetsLimit !== null) {
      const existingCount = await prisma.boq.count({
        where: { companyId: companyId, isPreset: true },
      });
      if (existingCount >= presetsLimit) {
        return NextResponse.json(
          { error: `Preset limit reached (${presetsLimit}). Upgrade your plan.` },
          { status: 403 }
        );
      }
    }

    const body = await request.json();
    const { boqId, presetName, includeQuantities } = body;

    if (!boqId) {
      return NextResponse.json({ error: 'BOQ ID is required' }, { status: 400 });
    }

    // Fetch the source BOQ with categories and items
    const sourceBoq = await prisma.boq.findFirst({
      where: { id: boqId, companyId: companyId, isPreset: false },
      include: {
        categories: {
          include: { items: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!sourceBoq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    const name = presetName?.trim() || `Preset from ${sourceBoq.projectName}`;

    // Create the preset BOQ with cloned categories and items
    const preset = await prisma.boq.create({
      data: {
        companyId: companyId,
        projectName: name,
        presetName: name,
        isPreset: true,
        status: 'preset',
        discountEnabled: sourceBoq.discountEnabled,
        discountType: sourceBoq.discountType,
        discountValue: sourceBoq.discountValue,
        vatEnabled: sourceBoq.vatEnabled,
        vatPercent: sourceBoq.vatPercent,
        categories: {
          create: sourceBoq.categories.map((cat: any) => ({
            name: cat.name,
            sortOrder: cat.sortOrder,
            items: {
              create: cat.items.map((item: any) => ({
                description: item.description,
                unit: item.unit,
                unitCost: item.unitCost,
                markupPct: item.markupPct,
                quantity: includeQuantities ? item.quantity : 0,
                sortOrder: item.sortOrder,
                isNote: item.isNote,
                noteContent: item.noteContent,
                includeInPdf: item.includeInPdf,
              })),
            },
          })),
        },
      },
      include: { categories: { include: { items: true } } },
    });

    return NextResponse.json(preset, { status: 201 });
  } catch (error: any) {
    console.error('Error creating preset from BOQ:', error);
    return NextResponse.json({ error: 'Failed to create preset' }, { status: 500 });
  }
}
