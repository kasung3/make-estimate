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

    const companies = await prisma.company.findMany({
      where: { deletedAt: null },
      include: {
        billing: {
          include: {
            invoices: {
              where: { status: 'paid' },
              select: { amountPaid: true },
            },
          },
        },
        memberships: {
          where: { isActive: true },
          include: {
            user: {
              select: { email: true, firstName: true, lastName: true, name: true, phone: true, country: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: { select: { boqs: true, customers: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const csvRows: string[] = [];
    csvRows.push('Company Name,Admin Email,Admin Name,Admin Phone,Country,Plan,Status,Members,BOQs,Customers,Total Paid (USD),Created Date');

    for (const company of companies) {
      const admin = company.memberships[0]?.user;
      const billing = company.billing;
      const totalPaid = billing?.invoices?.reduce((sum: number, inv: any) => sum + inv.amountPaid, 0) || 0;
      const effectivePlan = billing?.overridePlan || billing?.planKey || 'Free';
      const status = company.isBlocked ? 'Blocked' : 'Active';
      const adminName = admin ? [admin.firstName, admin.lastName].filter(Boolean).join(' ') || admin.name || '' : '';

      const row = [
        escapeCsv(company.name),
        escapeCsv(admin?.email || ''),
        escapeCsv(adminName),
        escapeCsv(admin?.phone || ''),
        escapeCsv(admin?.country || ''),
        escapeCsv(effectivePlan),
        escapeCsv(status),
        company.memberships.length.toString(),
        company._count.boqs.toString(),
        company._count.customers.toString(),
        (totalPaid / 100).toFixed(2),
        company.createdAt ? format(new Date(company.createdAt), 'yyyy-MM-dd') : '',
      ].join(',');
      csvRows.push(row);
    }

    const csv = csvRows.join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="companies-export-${format(new Date(), 'yyyy-MM-dd')}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting companies:', error);
    return NextResponse.json({ error: 'Failed to export companies' }, { status: 500 });
  }
}

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
