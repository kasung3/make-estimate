export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { instrumentRoute, timedOperation } from '@/lib/api-instrumentation';
import { sanitizeText, sanitizeNumber, isValidId } from '@/lib/sanitize';

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

    // Build update data - only include fields that are explicitly provided, sanitized
    const updateData: Record<string, any> = {};
    
    if (body?.projectName !== undefined) updateData.projectName = sanitizeText(body.projectName, 200);
    if (body?.customerId !== undefined) {
      if (body.customerId && !isValidId(body.customerId)) {
        return NextResponse.json({ error: 'Invalid customer ID' }, { status: 400 });
      }
      updateData.customerId = body.customerId || null;
    }
    if (body?.coverTemplateId !== undefined) updateData.coverTemplateId = body.coverTemplateId || null;
    if (body?.pdfThemeId !== undefined) updateData.pdfThemeId = body.pdfThemeId || null;
    if (body?.dateMode !== undefined) {
      const validDateModes = ['export_date', 'preparation_date'];
      updateData.dateMode = validDateModes.includes(body.dateMode) ? body.dateMode : 'export_date';
    }
    if (body?.preparationDate !== undefined) {
      if (body.preparationDate) {
        const d = new Date(body.preparationDate);
        updateData.preparationDate = isNaN(d.getTime()) ? null : d;
      } else {
        updateData.preparationDate = null;
      }
    }
    if (body?.discountEnabled !== undefined) updateData.discountEnabled = body.discountEnabled === true;
    if (body?.discountType !== undefined) {
      const validTypes = ['percent', 'fixed'];
      updateData.discountType = validTypes.includes(body.discountType) ? body.discountType : 'percent';
    }
    if (body?.discountValue !== undefined) updateData.discountValue = sanitizeNumber(body.discountValue, 0, 0, 999999999);
    if (body?.vatEnabled !== undefined) updateData.vatEnabled = body.vatEnabled === true;
    if (body?.vatPercent !== undefined) updateData.vatPercent = sanitizeNumber(body.vatPercent, 0, 0, 100);
    if (body?.status !== undefined) {
      const validStatuses = ['draft', 'sent', 'approved', 'rejected'];
      updateData.status = validStatuses.includes(body.status?.toLowerCase?.()) ? body.status : 'draft';
    }
    // Save column widths if provided
    if (body?.columnWidths !== undefined) {
      updateData.columnWidths = body.columnWidths;
    }

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
