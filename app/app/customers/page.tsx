import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { CustomersClient } from './_components/customers-client';
import { getCompanyBillingStatus } from '@/lib/billing';

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
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

  const customers = await prisma.customer.findMany({
    where: { companyId },
    orderBy: { name: 'asc' },
  });

  return <CustomersClient customers={JSON.parse(JSON.stringify(customers ?? []))} />;
}
