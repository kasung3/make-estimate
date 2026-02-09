export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

/**
 * PDF Job Status API
 * 
 * GET /api/pdf-jobs/[id] - Get status of a PDF export job
 * 
 * Returns:
 * - status: 'pending' | 'processing' | 'completed' | 'failed'
 * - pdfUrl: URL to download the PDF (only when status='completed')
 * - errorMessage: Error details (only when status='failed')
 */

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
    const jobId = params?.id;

    if (!companyId || !jobId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Fetch job with company validation
    const job = await prisma.pdfExportJob.findFirst({
      where: {
        id: jobId,
        companyId, // Ensure user can only access their company's jobs
      },
      select: {
        id: true,
        boqId: true,
        status: true,
        pdfUrl: true,
        errorMessage: true,
        startedAt: true,
        completedAt: true,
        createdAt: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Calculate elapsed time
    let elapsedMs = 0;
    if (job.startedAt) {
      const endTime = job.completedAt || new Date();
      elapsedMs = endTime.getTime() - job.startedAt.getTime();
    }

    return NextResponse.json({
      id: job.id,
      boqId: job.boqId,
      status: job.status,
      pdfUrl: job.status === 'completed' ? job.pdfUrl : null,
      errorMessage: job.status === 'failed' ? job.errorMessage : null,
      elapsedMs,
      createdAt: job.createdAt,
    });
  } catch (error) {
    console.error('[PDF_JOB_STATUS_ERROR]', error);
    return NextResponse.json({ error: 'Failed to get job status' }, { status: 500 });
  }
}
