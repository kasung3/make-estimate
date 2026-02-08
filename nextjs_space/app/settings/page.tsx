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
  const userId = (session.user as any)?.id;

  if (!companyId) {
    redirect('/login');
  }

  const [company, membership] = await Promise.all([
    prisma.company.findUnique({
      where: { id: companyId },
    }),
    prisma.companyMembership.findFirst({
      where: { userId, companyId },
    }),
  ]);

  if (!company) {
    redirect('/dashboard');
  }

  const isAdmin = membership?.role === 'ADMIN';

  return (
    <SettingsClient 
      company={JSON.parse(JSON.stringify(company))} 
      isAdmin={isAdmin}
    />
  );
}
