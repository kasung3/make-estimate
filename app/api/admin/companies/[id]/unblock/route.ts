import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// POST - Unblock company
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;

    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    await prisma.company.update({
      where: { id },
      data: {
        isBlocked: false,
        blockReason: null,
      },
    });

    return NextResponse.json({ success: true, message: 'Company unblocked successfully' });
  } catch (error) {
    console.error('Unblock company error:', error);
    return NextResponse.json({ error: 'Failed to unblock company' }, { status: 500 });
  }
}
