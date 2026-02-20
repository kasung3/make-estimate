export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { instrumentRoute, timedOperation } from '@/lib/api-instrumentation';
import { sanitizeText, sanitizeMultilineText, sanitizeRichText, sanitizeNumber } from '@/lib/sanitize';

// Rate limited: 120 item updates per minute per user (autosave)
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

    // Build update data object only with provided fields, sanitized
    const updateData: any = {};
    if (body?.description !== undefined) updateData.description = sanitizeRichText(body.description, 5000);
    if (body?.unit !== undefined) updateData.unit = sanitizeText(body.unit, 50);
    if (body?.unitCost !== undefined) updateData.unitCost = sanitizeNumber(body.unitCost, 0, 0, 999999999);
    if (body?.markupPct !== undefined) updateData.markupPct = sanitizeNumber(body.markupPct, 0, -100, 10000);
    if (body?.quantity !== undefined) updateData.quantity = sanitizeNumber(body.quantity, 0, 0, 999999999);
    if (body?.sortOrder !== undefined) updateData.sortOrder = sanitizeNumber(body.sortOrder, 0, 0, 99999);
    if (body?.isNote !== undefined) updateData.isNote = body.isNote === true;
    if (body?.noteContent !== undefined) updateData.noteContent = sanitizeRichText(body.noteContent, 5000);
    if (body?.includeInPdf !== undefined) updateData.includeInPdf = body.includeInPdf === true;

    const item = await timedOperation('item.update', () =>
      prisma.boqItem.update({
        where: { id: params?.id },
        data: updateData,
      })
    );

    return NextResponse.json(item);
  },
  { requireAuth: true, rateLimit: { type: 'ITEM_UPDATE', keyBy: 'user' } }
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
