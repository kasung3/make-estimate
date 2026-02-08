import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// GET - List all companies and users with block status
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'companies';

    if (type === 'companies') {
      const companies = await prisma.company.findMany({
        include: {
          _count: {
            select: { memberships: true, boqs: true },
          },
          billing: {
            select: { planKey: true, status: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ companies });
    } else {
      const users = await prisma.user.findMany({
        include: {
          memberships: {
            include: { company: { select: { id: true, name: true } } },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ users });
    }
  } catch (error) {
    console.error('Get accounts error:', error);
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}

// PUT - Block or unblock a company or user
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { type, id, isBlocked, blockReason } = body as {
      type: 'company' | 'user';
      id: string;
      isBlocked: boolean;
      blockReason?: string;
    };

    if (!type || !id) {
      return NextResponse.json({ error: 'Type and ID are required' }, { status: 400 });
    }

    if (type === 'company') {
      const updated = await prisma.company.update({
        where: { id },
        data: {
          isBlocked,
          blockReason: isBlocked ? (blockReason || null) : null,
        },
      });
      return NextResponse.json({ company: updated });
    } else {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          isBlocked,
          blockReason: isBlocked ? (blockReason || null) : null,
        },
      });
      return NextResponse.json({ user: updated });
    }
  } catch (error) {
    console.error('Update account error:', error);
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}
