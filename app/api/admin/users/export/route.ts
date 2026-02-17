import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { isPlatformAdmin } from '@/lib/billing';
import { prisma } from '@/lib/db';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      where: { deletedAt: null },
      include: {
        memberships: {
          include: {
            company: {
              include: {
                billing: {
                  include: {
                    invoices: { where: { status: 'paid' }, select: { amountPaid: true } },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'Name',
      'Email',
      'Phone',
      'Country',
      'Company',
      'Plan',
      'Subscription Status',
      'Account Status',
      'Total Paid (USD)',
      'Joined Date',
      'Last Login',
    ];

    const rows = users.map((user: any) => {
      const company = user.memberships[0]?.company;
      const billing = company?.billing;
      const totalPaid = billing?.invoices?.reduce((sum: number, inv: any) => sum + inv.amountPaid, 0) || 0;
      const fullName = user.name || [user.firstName, user.lastName].filter(Boolean).join(' ') || '';

      return [
        escapeCsv(fullName),
        escapeCsv(user.email),
        escapeCsv(user.phone || ''),
        escapeCsv(user.country || ''),
        escapeCsv(company?.name || ''),
        escapeCsv(billing?.planKey || 'free'),
        escapeCsv(billing?.status || 'none'),
        escapeCsv(user.isBlocked ? 'blocked' : 'active'),
        (totalPaid / 100).toFixed(2),
        format(new Date(user.createdAt), 'yyyy-MM-dd'),
        user.lastLoginAt ? format(new Date(user.lastLoginAt), 'yyyy-MM-dd HH:mm') : 'Never',
      ];
    });

    const csv = [headers.join(','), ...rows.map((r: string[]) => r.join(','))].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="users-export-${format(new Date(), 'yyyy-MM-dd')}.csv"`,
      },
    });
  } catch (error) {
    console.error('Users CSV export error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
