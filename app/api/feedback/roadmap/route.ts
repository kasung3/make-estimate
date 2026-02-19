import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Feedback } from '@prisma/client';

export const dynamic = 'force-dynamic';

// GET - Public roadmap (planned and in_progress items)
export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      where: {
        isPublic: true,
        status: {
          in: ['planned', 'in_progress', 'completed'],
        },
      },
      select: {
        id: true,
        type: true,
        title: true,
        description: true,
        status: true,
        votes: true,
        createdAt: true,
      },
      orderBy: [
        { status: 'asc' },
        { votes: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Group by status
    const roadmap = {
      in_progress: feedback.filter(f => f.status === 'in_progress'),
      planned: feedback.filter(f => f.status === 'planned'),
      completed: feedback.filter(f => f.status === 'completed').slice(0, 10), // Last 10 completed
    };

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return NextResponse.json({ error: 'Failed to fetch roadmap' }, { status: 500 });
  }
}
