import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { BoqEditorClient } from './_components/boq-editor-client';
import { getCompanyBillingStatus } from '@/lib/billing';

export const dynamic = 'force-dynamic';

export default async function BoqEditorPage({
  params,
}: {
  params: { id: string };
}) {
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

  const [boq, customers, company, coverTemplates, pdfThemes] = await Promise.all([
    prisma.boq.findFirst({
      where: {
        id: params?.id,
        companyId,
      },
      include: {
        customer: true,
        coverTemplate: true,
        pdfTheme: true,
        categories: {
          include: { items: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    }),
    prisma.customer.findMany({
      where: { companyId },
      orderBy: { name: 'asc' },
    }),
    prisma.company.findUnique({
      where: { id: companyId },
    }),
    prisma.pdfCoverTemplate.findMany({
      where: { companyId },
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    }),
    prisma.pdfTheme.findMany({
      where: { companyId },
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    }),
  ]);

  if (!boq) {
    redirect('/app/dashboard');
  }

  return (
    <BoqEditorClient
      boq={JSON.parse(JSON.stringify(boq))}
      customers={JSON.parse(JSON.stringify(customers ?? []))}
      company={JSON.parse(JSON.stringify(company ?? {}))}
      coverTemplates={JSON.parse(JSON.stringify(coverTemplates ?? []))}
      pdfThemes={JSON.parse(JSON.stringify(pdfThemes ?? []))}
    />
  );
}
