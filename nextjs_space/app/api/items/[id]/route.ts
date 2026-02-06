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

    const item = await prisma.boqItem.update({
      where: { id: params?.id },
      data: {
        description: body?.description,
        unit: body?.unit,
        unitCost: body?.unitCost,
        markupPct: body?.markupPct,
        quantity: body?.quantity,
        sortOrder: body?.sortOrder,
      },
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
