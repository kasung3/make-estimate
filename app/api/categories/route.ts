export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    const { boqId, name, sortOrder } = await request.json();

    const boq = await prisma.boq.findFirst({
      where: { id: boqId, companyId },
    });

    if (!boq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    const category = await prisma.boqCategory.create({
      data: {
        boqId,
        name: name || 'New Category',
        sortOrder: sortOrder ?? 0,
      },
      include: { items: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
