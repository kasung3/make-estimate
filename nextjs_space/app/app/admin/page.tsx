import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { isPlatformAdmin } from '@/lib/billing';
import { AdminClient } from './_components/admin-client';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login');
  }

  const userEmail = session.user.email as string;
  
  if (!isPlatformAdmin(userEmail)) {
    // Not a platform admin - redirect to dashboard
    redirect('/app/dashboard');
  }

  return <AdminClient />;
}
