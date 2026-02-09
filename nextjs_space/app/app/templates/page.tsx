import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { TemplatesClient } from './_components/templates-client';
import { getCompanyBillingStatus } from '@/lib/billing';

export const dynamic = 'force-dynamic';

export default async function TemplatesPage() {
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

  // Fetch BOQ templates (pdf themes)
  const boqTemplates = await prisma.pdfTheme.findMany({
    where: { companyId },
    orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
  });

  // Fetch cover templates
  const coverTemplates = await prisma.pdfCoverTemplate.findMany({
    where: { companyId },
    orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
  });

  // Fetch company
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: {
      name: true,
    },
  });

  return (
    <TemplatesClient 
      boqTemplates={JSON.parse(JSON.stringify(boqTemplates ?? []))}
      coverTemplates={JSON.parse(JSON.stringify(coverTemplates ?? []))}
      billingStatus={JSON.parse(JSON.stringify(billingStatus))}
      companyName={company?.name ?? 'Company'}
    />
  );
}
