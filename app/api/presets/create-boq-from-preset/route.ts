import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { getCompanyBillingStatus } from '@/lib/billing';


export const dynamic = 'force-dynamic';

// POST - Create a new BOQ from a preset
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

    // Check BOQ creation limit
    const billing = await getCompanyBillingStatus(companyId);
    if (!billing.canCreateBoq) {
      return NextResponse.json(
        { error: `Monthly BOQ limit reached (${billing.boqLimit}). Upgrade your plan.` },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { presetId, customerId, projectName } = body;

    if (!presetId) {
      return NextResponse.json({ error: 'Preset ID is required' }, { status: 400 });
    }

    // Fetch the preset
    const preset = await prisma.boq.findFirst({
      where: { id: presetId, companyId: companyId, isPreset: true },
      include: {
        categories: {
          include: { items: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!preset) {
      return NextResponse.json({ error: 'Preset not found' }, { status: 404 });
    }

    const name = projectName?.trim() || `BOQ from ${preset.presetName || preset.projectName}`;

    // Create the new BOQ from preset
    const newBoq = await prisma.boq.create({
      data: {
        companyId: companyId,
        customerId: customerId || null,
        projectName: name,
        isPreset: false,
        discountEnabled: preset.discountEnabled,
        discountType: preset.discountType,
        discountValue: preset.discountValue,
        vatEnabled: preset.vatEnabled,
        vatPercent: preset.vatPercent,
        categories: {
          create: preset.categories.map((cat: any) => ({
            name: cat.name,
            sortOrder: cat.sortOrder,
            items: {
              create: cat.items.map((item: any) => ({
                description: item.description,
                unit: item.unit,
                unitCost: item.unitCost,
                markupPct: item.markupPct,
                quantity: item.quantity,
                sortOrder: item.sortOrder,
                isNote: item.isNote,
                noteContent: item.noteContent,
                includeInPdf: item.includeInPdf,
              })),
            },
          })),
        },
      },
    });

    // Record BOQ creation event for quota tracking
    await prisma.boqCreationEvent.create({
      data: {
        companyId,
        boqId: newBoq.id,
      },
    });

    return NextResponse.json(newBoq, { status: 201 });
  } catch (error: any) {
    console.error('Error creating BOQ from preset:', error);
    return NextResponse.json({ error: 'Failed to create BOQ from preset' }, { status: 500 });
  }
}
