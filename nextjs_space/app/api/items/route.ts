export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { getCompanyBillingStatus } from '@/lib/billing';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    const { categoryId, description, unit, unitCost, markupPct, quantity, sortOrder, isNote, noteContent, includeInPdf } = await request.json();

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
          return NextResponse.json(
            { 
              error: 'Item limit reached',
              message: `Your ${billingStatus.planKey === 'free' ? 'Free Forever' : 'current'} plan allows up to ${itemLimit} items per BOQ. Upgrade to add more items.`,
              itemLimit,
              currentCount: currentItemCount,
              upgradeUrl: '/pricing',
            }, 
            { status: 403 }
          );
        }
      }
    }

    const item = await prisma.boqItem.create({
      data: {
        categoryId,
        description: description || '',
        unit: unit || '',
        unitCost: unitCost ?? 0,
        markupPct: markupPct ?? 0,
        quantity: quantity ?? 0,
        sortOrder: sortOrder ?? 0,
        isNote: isNote ?? false,
        noteContent: noteContent || null,
        includeInPdf: includeInPdf ?? true,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
