import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { BoqsClient } from './_components/boqs-client';
import { getCompanyBillingStatus } from '@/lib/billing';

export const dynamic = 'force-dynamic';

export default async function BoqsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login');
  }

  const companyId = (session.user as any)?.companyId;

  if (!companyId) {
    redirect('/login');
  }

  // Check subscription status
  const billingStatus = await getCompanyBillingStatus(companyId);
  if (!billingStatus.hasActiveSubscription) {
    redirect('/pricing?subscription=required');
  }

  // Fetch BOQs with customer info (exclude presets)
  const boqs = await prisma.boq.findMany({
    where: { companyId, isPreset: false },
    include: {
      customer: true,
      categories: {
        include: {
          items: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch company settings
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: {
      currencySymbol: true,
      currencyPosition: true,
    },
  });

  return (
    <BoqsClient 
      initialBoqs={JSON.parse(JSON.stringify(boqs ?? []))} 
      billingStatus={JSON.parse(JSON.stringify(billingStatus))}
      company={company ?? { currencySymbol: 'Rs.', currencyPosition: 'left' }}
    />
  );
}
