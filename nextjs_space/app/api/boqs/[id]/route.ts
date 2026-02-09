export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { instrumentRoute, timedOperation } from '@/lib/api-instrumentation';

export const GET = instrumentRoute(
  '/api/boqs/[id]',
  'GET',
  async (request, { params }, { companyId }) => {
    const boq = await timedOperation('boq.findFirst', () =>
      prisma.boq.findFirst({
        where: {
          id: params?.id,
          companyId,
        },
        include: {
          customer: true,
          pdfTheme: true,
          coverTemplate: true,
          categories: {
            include: { items: { orderBy: { sortOrder: 'asc' } } },
            orderBy: { sortOrder: 'asc' },
          },
        },
      })
    );

    if (!boq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    return NextResponse.json(boq);
  }
);

export const PUT = instrumentRoute(
  '/api/boqs/[id]',
  'PUT',
  async (request, { params }, { companyId }) => {
    const body = await request.json();

    const existingBoq = await prisma.boq.findFirst({
      where: { id: params?.id, companyId },
      select: { id: true },
    });

    if (!existingBoq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    // Build update data - only include fields that are explicitly provided
    const updateData: Record<string, any> = {};
    
    if (body?.projectName !== undefined) updateData.projectName = body.projectName;
    if (body?.customerId !== undefined) updateData.customerId = body.customerId || null;
    if (body?.coverTemplateId !== undefined) updateData.coverTemplateId = body.coverTemplateId || null;
    if (body?.pdfThemeId !== undefined) updateData.pdfThemeId = body.pdfThemeId || null;
    if (body?.dateMode !== undefined) updateData.dateMode = body.dateMode;
    if (body?.preparationDate !== undefined) updateData.preparationDate = body.preparationDate ? new Date(body.preparationDate) : null;
    if (body?.discountEnabled !== undefined) updateData.discountEnabled = body.discountEnabled;
    if (body?.discountType !== undefined) updateData.discountType = body.discountType;
    if (body?.discountValue !== undefined) updateData.discountValue = body.discountValue;
    if (body?.vatEnabled !== undefined) updateData.vatEnabled = body.vatEnabled;
    if (body?.vatPercent !== undefined) updateData.vatPercent = body.vatPercent;
    if (body?.status !== undefined) updateData.status = body.status;

    const boq = await timedOperation('boq.update', () =>
      prisma.boq.update({
        where: { id: params?.id },
        data: updateData,
        include: {
          customer: true,
          categories: {
            include: { items: { orderBy: { sortOrder: 'asc' } } },
            orderBy: { sortOrder: 'asc' },
          },
        },
      })
    );

    return NextResponse.json(boq);
  }
);

export const DELETE = instrumentRoute(
  '/api/boqs/[id]',
  'DELETE',
  async (request, { params }, { companyId }) => {
    const existingBoq = await prisma.boq.findFirst({
      where: { id: params?.id, companyId },
      select: { id: true },
    });

    if (!existingBoq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    await timedOperation('boq.delete', () =>
      prisma.boq.delete({ where: { id: params?.id } })
    );

    return NextResponse.json({ success: true });
  }
);
