import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { DashboardClient } from './_components/dashboard-client';
import { getCompanyBillingStatus } from '@/lib/billing';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login');
  }

  const companyId = (session.user as any)?.companyId;

  if (!companyId) {
    redirect('/login');
  }

  // Check subscription status - redirect to pricing if not subscribed
  const billingStatus = await getCompanyBillingStatus(companyId);
  if (!billingStatus.hasActiveSubscription) {
    redirect('/pricing?subscription=required');
  }

  const [boqs, customers, company] = await Promise.all([
    prisma.boq.findMany({
      where: { companyId, isPreset: false },
      include: {
        customer: true,
        categories: {
          include: { items: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.customer.findMany({
      where: { companyId },
      orderBy: { name: 'asc' },
    }),
    prisma.company.findUnique({
      where: { id: companyId },
    }),
  ]);

  return (
    <DashboardClient
      boqs={JSON.parse(JSON.stringify(boqs ?? []))}
      customers={JSON.parse(JSON.stringify(customers ?? []))}
      company={JSON.parse(JSON.stringify(company ?? {}))}
    />
  );
}
