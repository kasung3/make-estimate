import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET - Public roadmap (from admin-created roadmap items)
export async function GET() {
  try {
    const roadmapItems = await prisma.roadmapItem.findMany({
      where: {
        isPublic: true,
        status: {
          in: ['planned', 'in_progress', 'completed'],
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        sortOrder: true,
        createdAt: true,
      },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    // Group by status
    const roadmap = {
      in_progress: roadmapItems.filter(item => item.status === 'in_progress'),
      planned: roadmapItems.filter(item => item.status === 'planned'),
      completed: roadmapItems.filter(item => item.status === 'completed').slice(0, 10), // Last 10 completed
    };

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return NextResponse.json({ error: 'Failed to fetch roadmap' }, { status: 500 });
  }
}
