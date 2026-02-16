export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { botProtection, sanitizeText, sanitizeNumber, isValidId } from '@/lib/sanitize';

export async function POST(request: Request) {
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

    const boqId = body.boqId;
    if (!isValidId(boqId)) {
      return NextResponse.json({ error: 'Invalid BOQ ID' }, { status: 400 });
    }

    const name = sanitizeText(body.name, 200) || 'New Category';
    const sortOrder = sanitizeNumber(body.sortOrder, 0, 0, 99999);

    const boq = await prisma.boq.findFirst({
      where: { id: boqId, companyId },
    });

    if (!boq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    const category = await prisma.boqCategory.create({
      data: {
        boqId,
        name,
        sortOrder,
      },
      include: { items: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
