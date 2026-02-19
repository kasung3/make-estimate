import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// GET - List all feedback for admin
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = {};
    
    if (type && type !== 'all') {
      where.type = type;
    }
    if (status && status !== 'all') {
      where.status = status;
    }
    if (priority && priority !== 'all') {
      where.priority = priority;
    }

    const [feedback, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        include: {
          user: {
            select: { id: true, email: true, name: true },
          },
          company: {
            select: { id: true, name: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.feedback.count({ where }),
    ]);

    // Get stats
    const stats = await prisma.feedback.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    const typeStats = await prisma.feedback.groupBy({
      by: ['type'],
      _count: { type: true },
    });

    return NextResponse.json({
      feedback,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        byStatus: stats.reduce((acc: Record<string, number>, s) => ({ ...acc, [s.status]: s._count.status }), {}),
        byType: typeStats.reduce((acc: Record<string, number>, t) => ({ ...acc, [t.type]: t._count.type }), {}),
      },
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}
