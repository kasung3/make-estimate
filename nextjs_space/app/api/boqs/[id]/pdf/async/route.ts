export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { processPdfExport } from '@/lib/pdf-processor';
import { checkRateLimit, RATE_LIMITS, rateLimitKey, rateLimitResponse } from '@/lib/rate-limiter';
import { getCompanyBillingStatus } from '@/lib/billing';

/**
 * Async PDF Export API
 * 
 * This endpoint initiates a PDF export job and returns immediately.
 * The PDF generation happens in the background.
 * 
 * Rate Limit: 10 exports per minute per company
 * 
 * Flow:
 * 1. POST /api/boqs/[id]/pdf/async -> Returns { jobId }
 * 2. Client polls GET /api/pdf-jobs/[jobId] -> Returns { status, pdfUrl }
 * 3. When status='completed', client downloads from pdfUrl
 */

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    const userId = (session.user as any)?.id;
    const boqId = params?.id;

    // Rate limit check (10 PDF exports per minute per company)
    const rateKey = rateLimitKey('PDF_EXPORT', companyId);
    const rateResult = checkRateLimit(rateKey, RATE_LIMITS.PDF_EXPORT);
    
    if (!rateResult.allowed) {
      console.log(`[PDF_EXPORT_RATE_LIMITED] Company: ${companyId}, Retry after: ${rateResult.retryAfter}s`);
      return rateLimitResponse(rateResult);
    }

    if (!companyId || !userId || !boqId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Verify BOQ exists and belongs to company
    const boq = await prisma.boq.findFirst({
      where: { id: boqId, companyId },
      select: { id: true, projectName: true },
    });

    if (!boq) {
      return NextResponse.json({ error: 'BOQ not found' }, { status: 404 });
    }

    // Check for existing pending/processing job for this BOQ (prevent duplicates)
    const existingJob = await prisma.pdfExportJob.findFirst({
      where: {
        boqId,
        companyId,
        status: { in: ['pending', 'processing'] },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (existingJob) {
      // Return existing job instead of creating a new one
      return NextResponse.json({
        jobId: existingJob.id,
        status: existingJob.status,
        message: 'Export already in progress',
      });
    }

    // Fetch billing status to check watermark settings
    const billingStatus = await getCompanyBillingStatus(companyId);
    const watermarkOptions = {
      enabled: billingStatus.watermarkEnabled ?? false,
      text: billingStatus.watermarkText ?? null,
    };

    // Create a new PDF export job
    const job = await prisma.pdfExportJob.create({
      data: {
        boqId,
        companyId,
        userId,
        status: 'pending',
      },
    });

    console.log(`[PDF_ASYNC_JOB_CREATED] Job: ${job.id}, BOQ: ${boqId}, Company: ${companyId}, Watermark: ${watermarkOptions.enabled}`);

    // Fire and forget - process in background
    // We don't await this, so the response returns immediately
    processPdfExport(job.id, boqId, companyId, watermarkOptions).catch((error) => {
      console.error(`[PDF_ASYNC_JOB_ERROR] Job: ${job.id}, Error:`, error);
    });

    return NextResponse.json({
      jobId: job.id,
      status: 'pending',
      message: 'PDF export started',
    });
  } catch (error) {
    console.error('[PDF_ASYNC_ERROR]', error);
    return NextResponse.json({ error: 'Failed to start PDF export' }, { status: 500 });
  }
}
