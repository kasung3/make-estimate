export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    const body = await request.json();

    const existingItem = await prisma.boqItem.findFirst({
      where: {
        id: params?.id,
        category: { boq: { companyId } },
      },
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

    const item = await prisma.boqItem.update({
      where: { id: params?.id },
      data: updateData,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;

    const existingItem = await prisma.boqItem.findFirst({
      where: {
        id: params?.id,
        category: { boq: { companyId } },
      },
    });

    if (!existingItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    await prisma.boqItem.delete({
      where: { id: params?.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
