export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { getCompanyBillingStatus } from '@/lib/billing';
import { botProtection, sanitizeText, sanitizeMultilineText, sanitizeNumber, isValidId } from '@/lib/sanitize';

export async function POST(request: Request) {
  try {
    // Bot protection - no rate limiting to avoid disrupting users
    const botBlock = botProtection(request);
    if (botBlock) return botBlock;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    const body = await request.json();

    // Validate and sanitize all inputs
    const categoryId = body.categoryId;
    if (!isValidId(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const description = sanitizeText(body.description, 1000);
    const unit = sanitizeText(body.unit, 50);
    const unitCost = sanitizeNumber(body.unitCost, 0, 0, 999999999);
    const markupPct = sanitizeNumber(body.markupPct, 0, -100, 10000);
    const quantity = sanitizeNumber(body.quantity, 0, 0, 999999999);
    const sortOrder = sanitizeNumber(body.sortOrder, 0, 0, 99999);
    const isNote = body.isNote === true;
    const noteContent = sanitizeMultilineText(body.noteContent, 5000);
    const includeInPdf = body.includeInPdf !== false;

    const category = await prisma.boqCategory.findFirst({
      where: {
        id: categoryId,
        boq: { companyId },
      },
      include: {
        boq: true,
      },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Check item limit for non-note items
    if (!isNote) {
      const billingStatus = await getCompanyBillingStatus(companyId);
      const itemLimit = billingStatus.boqItemsLimit;
      
      if (itemLimit !== null && itemLimit !== undefined) {
        // Count current items in this BOQ (only non-note items)
        const currentItemCount = await prisma.boqItem.count({
          where: {
            category: {
              boqId: category.boqId,
            },
            isNote: false,
          },
        });

        if (currentItemCount >= itemLimit) {
          const planName = billingStatus.planKey === 'free' ? 'Free Forever' : (billingStatus.planKey ? billingStatus.planKey.charAt(0).toUpperCase() + billingStatus.planKey.slice(1) : 'current');
          return NextResponse.json(
            { 
              error: `You've reached the ${planName} limit: ${itemLimit} items per BOQ.`,
              code: 'LIMIT_EXCEEDED',
              limit_type: 'boq_items',
              used: currentItemCount,
              limit: itemLimit,
              plan_key: billingStatus.planKey,
              plan_name: planName,
              upgrade_url: '/pricing',
            }, 
            { status: 403 }
          );
        }
      }
    }

    const item = await prisma.boqItem.create({
      data: {
        categoryId,
        description,
        unit,
        unitCost,
        markupPct,
        quantity,
        sortOrder,
        isNote,
        noteContent: noteContent || null,
        includeInPdf,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
