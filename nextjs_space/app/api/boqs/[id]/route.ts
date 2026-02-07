export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    const boq = await prisma.boq.findFirst({
      where: {
        id: params?.id,
        companyId,
      },
      include: {
        customer: true,
        categories: {
          include: { items: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!boq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    return NextResponse.json(boq);
  } catch (error) {
    console.error('Error fetching BOQ:', error);
    return NextResponse.json({ error: 'Failed to fetch BOQ' }, { status: 500 });
  }
}

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

    const existingBoq = await prisma.boq.findFirst({
      where: {
        id: params?.id,
        companyId,
      },
    });

    if (!existingBoq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    // Build update data - only include fields that are explicitly provided
    const updateData: Record<string, any> = {};
    
    if (body?.projectName !== undefined) updateData.projectName = body.projectName;
    if (body?.customerId !== undefined) updateData.customerId = body.customerId || null;
    if (body?.coverTemplateId !== undefined) updateData.coverTemplateId = body.coverTemplateId || null;
    if (body?.discountEnabled !== undefined) updateData.discountEnabled = body.discountEnabled;
    if (body?.discountType !== undefined) updateData.discountType = body.discountType;
    if (body?.discountValue !== undefined) updateData.discountValue = body.discountValue;
    if (body?.vatEnabled !== undefined) updateData.vatEnabled = body.vatEnabled;
    if (body?.vatPercent !== undefined) updateData.vatPercent = body.vatPercent;
    if (body?.status !== undefined) updateData.status = body.status;

    const boq = await prisma.boq.update({
      where: { id: params?.id },
      data: updateData,
      include: {
        customer: true,
        categories: {
          include: { items: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return NextResponse.json(boq);
  } catch (error) {
    console.error('Error updating BOQ:', error);
    return NextResponse.json({ error: 'Failed to update BOQ' }, { status: 500 });
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

    const existingBoq = await prisma.boq.findFirst({
      where: {
        id: params?.id,
        companyId,
      },
    });

    if (!existingBoq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    await prisma.boq.delete({
      where: { id: params?.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting BOQ:', error);
    return NextResponse.json({ error: 'Failed to delete BOQ' }, { status: 500 });
  }
}
