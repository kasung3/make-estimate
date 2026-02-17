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

    const companies = await prisma.company.findMany({
      where: { deletedAt: null },
      include: {
        memberships: {
          include: {
            user: { select: { email: true, name: true, firstName: true, lastName: true, phone: true, country: true } },
          },
        },
        billing: {
          include: {
            invoices: { where: { status: 'paid' }, select: { amountPaid: true } },
          },
        },
        _count: { select: { boqs: true, customers: true, memberships: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'Company Name',
      'Admin Name',
      'Admin Email',
      'Admin Phone',
      'Country',
      'Plan',
      'Subscription Status',
      'Account Status',
      'Members',
      'BOQs',
      'Customers',
      'Total Paid (USD)',
      'Created Date',
    ];

    const rows = companies.map((company: any) => {
      const admin = company.memberships.find((m: any) => m.role === 'owner')?.user || company.memberships[0]?.user;
      const totalPaid = company.billing?.invoices?.reduce((sum: number, inv: any) => sum + inv.amountPaid, 0) || 0;
      const adminName = admin ? (admin.name || [admin.firstName, admin.lastName].filter(Boolean).join(' ') || '') : '';

      return [
        escapeCsv(company.name),
        escapeCsv(adminName),
        escapeCsv(admin?.email || ''),
        escapeCsv(admin?.phone || ''),
        escapeCsv(admin?.country || ''),
        escapeCsv(company.billing?.planKey || 'free'),
        escapeCsv(company.billing?.status || 'none'),
        escapeCsv(company.isBlocked ? 'blocked' : 'active'),
        String(company._count.memberships),
        String(company._count.boqs),
        String(company._count.customers),
        (totalPaid / 100).toFixed(2),
        format(new Date(company.createdAt), 'yyyy-MM-dd'),
      ];
    });

    const csv = [headers.join(','), ...rows.map((r: string[]) => r.join(','))].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="companies-export-${format(new Date(), 'yyyy-MM-dd')}.csv"`,
      },
    });
  } catch (error) {
    console.error('Companies CSV export error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
