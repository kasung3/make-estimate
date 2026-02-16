export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { checkRateLimit, RATE_LIMITS, rateLimitKey, rateLimitResponse } from '@/lib/rate-limiter';
import { getCompanyBillingStatus, getPlanFromDb } from '@/lib/billing';
import { format } from 'date-fns';

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

    // Use centralized billing status function for all entitlement checks
    const billingStatus = await getCompanyBillingStatus(companyId);

    // Check if company is blocked
    if (billingStatus.isBlocked) {
      return NextResponse.json(
        { error: 'Your company has been blocked. Please contact support.' },
        { status: 403 }
      );
    }

    // Check if has active subscription or grant
    if (!billingStatus.hasActiveSubscription) {
      return NextResponse.json(
        { error: 'Active subscription required to create BOQs. Please subscribe to a plan.' },
        { status: 403 }
      );
    }

    // Check quota using the centralized canCreateBoq flag
    if (!billingStatus.canCreateBoq) {
      const resetDate = billingStatus.currentPeriodEnd 
        ? format(new Date(billingStatus.currentPeriodEnd), 'MMM d, yyyy')
        : 'next billing period';
      
      const plan = billingStatus.planKey ? await getPlanFromDb(billingStatus.planKey) : null;
      const planName = plan?.name || 'your plan';
      
      return NextResponse.json(
        { 
          error: `You've reached your BOQ limit (${billingStatus.boqsUsedThisPeriod}/${billingStatus.boqLimit}) for this billing period. Upgrade your plan or wait until ${resetDate}.`,
          code: 'LIMIT_EXCEEDED',
          limit_type: 'boq_creations',
          used: billingStatus.boqsUsedThisPeriod,
          limit: billingStatus.boqLimit,
          plan_key: billingStatus.planKey,
          plan_name: planName,
          reset_date: resetDate,
          upgrade_url: '/pricing',
        },
        { status: 403 }
      );
    }

    // Get company settings for VAT
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { defaultVatPercent: true },
    });

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
