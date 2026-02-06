export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

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

    const { projectName, customerId } = await request.json();

    if (!projectName) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    const boq = await prisma.boq.create({
      data: {
        companyId,
        projectName,
        customerId: customerId || null,
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

    return NextResponse.json(boq);
  } catch (error) {
    console.error('Error creating BOQ:', error);
    return NextResponse.json({ error: 'Failed to create BOQ' }, { status: 500 });
  }
}
