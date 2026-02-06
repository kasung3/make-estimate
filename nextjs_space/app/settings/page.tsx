import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { SettingsClient } from './_components/settings-client';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login');
  }

  const companyId = (session.user as any)?.companyId;

  if (!companyId) {
    redirect('/login');
  }

  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  if (!company) {
    redirect('/dashboard');
  }

  return <SettingsClient company={JSON.parse(JSON.stringify(company))} />;
}
