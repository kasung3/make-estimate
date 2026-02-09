export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { checkRateLimit, RATE_LIMITS, rateLimitKey, rateLimitResponse } from '@/lib/rate-limiter';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'No company found' }, { status: 400 });
    }

    const boqs = await prisma.boq.findMany({
      where: { companyId },
      include: {
        customer: true,
        categories: {
          include: { items: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(boqs ?? []);
  } catch (error) {
    console.error('Error fetching BOQs:', error);
    return NextResponse.json({ error: 'Failed to fetch BOQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'No company found' }, { status: 400 });
    }

    // Rate limit check (20 BOQ creations per minute per company)
    const rateKey = rateLimitKey('BOQ_CREATE', companyId);
    const rateResult = checkRateLimit(rateKey, RATE_LIMITS.BOQ_CREATE);
    
    if (!rateResult.allowed) {
      console.log(`[BOQ_CREATE_RATE_LIMITED] Company: ${companyId}`);
      return rateLimitResponse(rateResult);
    }

    const { projectName, customerId } = await request.json();

    if (!projectName) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    // Check company billing status and quota
    const [company, billing] = await Promise.all([
      prisma.company.findUnique({
        where: { id: companyId },
        select: { defaultVatPercent: true, isBlocked: true },
      }),
      prisma.companyBilling.findUnique({
        where: { companyId },
      }),
    ]);

    // Check if company is blocked
    if (company?.isBlocked) {
      return NextResponse.json(
        { error: 'Your company has been blocked. Please contact support.' },
        { status: 403 }
      );
    }

    // Check subscription status
    if (!billing || !['active', 'trialing'].includes(billing.status || '')) {
      return NextResponse.json(
        { error: 'Active subscription required to create BOQs' },
        { status: 403 }
      );
    }

    // Check quota for Starter plan
    if (billing.planKey === 'starter' && billing.currentPeriodStart && billing.currentPeriodEnd) {
      const boqsThisPeriod = await prisma.boqCreationEvent.count({
        where: {
          companyId,
          createdAt: {
            gte: billing.currentPeriodStart,
            lte: billing.currentPeriodEnd,
          },
        },
      });

      if (boqsThisPeriod >= 10) {
        return NextResponse.json(
          { error: 'You have reached your BOQ limit for this billing period. Please upgrade to Business plan.' },
          { status: 403 }
        );
      }
    }

    // Create the BOQ
    const boq = await prisma.boq.create({
      data: {
        companyId,
        projectName,
        customerId: customerId || null,
        vatPercent: company?.defaultVatPercent ?? 18,
        categories: {
          create: [
            {
              name: 'General Works',
              sortOrder: 0,
            },
          ],
        },
      },
      include: {
        customer: true,
        categories: {
          include: { items: true },
        },
      },
    });

    // Record BOQ creation event for quota tracking
    await prisma.boqCreationEvent.create({
      data: {
        companyId,
        boqId: boq.id,
      },
    });

    return NextResponse.json(boq);
  } catch (error) {
    console.error('Error creating BOQ:', error);
    return NextResponse.json({ error: 'Failed to create BOQ' }, { status: 500 });
  }
}
