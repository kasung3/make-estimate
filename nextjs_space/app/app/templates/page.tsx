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

  // Fetch BOQ themes (pdf themes)
  const boqTemplates = await prisma.pdfTheme.findMany({
    where: { companyId },
    orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
  });

  // Fetch cover templates
  const coverTemplates = await prisma.pdfCoverTemplate.findMany({
    where: { companyId },
    orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
  });

  // Fetch BOQ presets
  const boqPresets = await prisma.boq.findMany({
    where: { companyId, isPreset: true },
    include: {
      categories: {
        include: { items: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  // Fetch company
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { name: true },
  });

  // Fetch customers for preset->BOQ flow
  const customers = await prisma.customer.findMany({
    where: { companyId },
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <TemplatesClient 
      boqTemplates={JSON.parse(JSON.stringify(boqTemplates ?? []))}
      coverTemplates={JSON.parse(JSON.stringify(coverTemplates ?? []))}
      boqPresets={JSON.parse(JSON.stringify(boqPresets ?? []))}
      customers={JSON.parse(JSON.stringify(customers ?? []))}
      billingStatus={JSON.parse(JSON.stringify(billingStatus))}
      companyName={company?.name ?? 'Company'}
    />
  );
}
