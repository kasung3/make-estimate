export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { instrumentRoute, timedOperation } from '@/lib/api-instrumentation';

export const PUT = instrumentRoute(
  '/api/items/[id]',
  'PUT',
  async (request, { params }, { companyId }) => {
    const body = await request.json();

    const existingItem = await prisma.boqItem.findFirst({
      where: {
        id: params?.id,
        category: { boq: { companyId } },
      },
      select: { id: true },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Build update data object only with provided fields
    const updateData: any = {};
    if (body?.description !== undefined) updateData.description = body.description;
    if (body?.unit !== undefined) updateData.unit = body.unit;
    if (body?.unitCost !== undefined) updateData.unitCost = body.unitCost;
    if (body?.markupPct !== undefined) updateData.markupPct = body.markupPct;
    if (body?.quantity !== undefined) updateData.quantity = body.quantity;
    if (body?.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;
    if (body?.isNote !== undefined) updateData.isNote = body.isNote;
    if (body?.noteContent !== undefined) updateData.noteContent = body.noteContent;
    if (body?.includeInPdf !== undefined) updateData.includeInPdf = body.includeInPdf;

    const item = await timedOperation('item.update', () =>
      prisma.boqItem.update({
        where: { id: params?.id },
        data: updateData,
      })
    );

    return NextResponse.json(item);
  }
);

export const DELETE = instrumentRoute(
  '/api/items/[id]',
  'DELETE',
  async (request, { params }, { companyId }) => {
    const existingItem = await prisma.boqItem.findFirst({
      where: {
        id: params?.id,
        category: { boq: { companyId } },
      },
      select: { id: true },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    await timedOperation('item.delete', () =>
      prisma.boqItem.delete({ where: { id: params?.id } })
    );

    return NextResponse.json({ success: true });
  }
);
