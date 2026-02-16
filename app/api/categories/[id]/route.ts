export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { botProtection, sanitizeText, sanitizeNumber } from '@/lib/sanitize';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Bot protection
    const botBlock = botProtection(request);
    if (botBlock) return botBlock;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    const body = await request.json();

    const existingCategory = await prisma.boqCategory.findFirst({
      where: {
        id: params?.id,
        boq: { companyId },
      },
    });

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Sanitize inputs
    const updateData: any = {};
    if (body?.name !== undefined) updateData.name = sanitizeText(body.name, 200);
    if (body?.sortOrder !== undefined) updateData.sortOrder = sanitizeNumber(body.sortOrder, 0, 0, 99999);

    const category = await prisma.boqCategory.update({
      where: { id: params?.id },
      data: updateData,
      include: { items: { orderBy: { sortOrder: 'asc' } } },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Bot protection
    const botBlock = botProtection(request);
    if (botBlock) return botBlock;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;

    const existingCategory = await prisma.boqCategory.findFirst({
      where: {
        id: params?.id,
        boq: { companyId },
      },
    });

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    await prisma.boqCategory.delete({
      where: { id: params?.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
