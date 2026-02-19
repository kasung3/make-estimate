import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// GET - List all roadmap items (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await isPlatformAdmin(session.user.email);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const items = await prisma.roadmapItem.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching roadmap items:', error);
    return NextResponse.json({ error: 'Failed to fetch roadmap items' }, { status: 500 });
  }
}

// POST - Create a new roadmap item
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await isPlatformAdmin(session.user.email);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!adminUser) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, status, isPublic, sortOrder } = body;

    if (!title || title.length < 3) {
      return NextResponse.json({ error: 'Title must be at least 3 characters' }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: 'Description must be at least 10 characters' }, { status: 400 });
    }

    const item = await prisma.roadmapItem.create({
      data: {
        title,
        description,
        status: status || 'planned',
        isPublic: isPublic !== false,
        sortOrder: sortOrder || 0,
        createdById: adminUser.id,
      },
      include: {
        createdBy: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error creating roadmap item:', error);
    return NextResponse.json({ error: 'Failed to create roadmap item' }, { status: 500 });
  }
}
