import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { isPlatformAdmin } from '@/lib/billing';
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
                    invoices: {
                      where: { status: 'paid' },
                      select: { amountPaid: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const csvRows: string[] = [];
    csvRows.push('Name,Email,Phone,Country,Company,Plan,Status,Total Paid (USD),Joined Date,Last Login');

    for (const user of users) {
      const company = user.memberships[0]?.company;
      const billing = company?.billing;
      const totalPaid = billing?.invoices?.reduce((sum: number, inv: any) => sum + inv.amountPaid, 0) || 0;
      const effectivePlan = billing?.overridePlan || billing?.planKey || 'Free';
      const status = user.isBlocked ? 'Blocked' : 'Active';
      const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || '';

      const row = [
        escapeCsv(name),
        escapeCsv(user.email || ''),
        escapeCsv(user.phone || ''),
        escapeCsv(user.country || ''),
        escapeCsv(company?.name || ''),
        escapeCsv(effectivePlan),
        escapeCsv(status),
        (totalPaid / 100).toFixed(2),
        user.createdAt ? format(new Date(user.createdAt), 'yyyy-MM-dd') : '',
        user.lastLoginAt ? format(new Date(user.lastLoginAt), 'yyyy-MM-dd HH:mm') : 'Never',
      ].join(',');
      csvRows.push(row);
    }

    const csv = csvRows.join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="users-export-${format(new Date(), 'yyyy-MM-dd')}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting users:', error);
    return NextResponse.json({ error: 'Failed to export users' }, { status: 500 });
  }
}

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
