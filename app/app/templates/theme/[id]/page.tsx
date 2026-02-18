import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { ThemeEditorClient } from './_components/theme-editor-client';

export default async function ThemeEditorPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }

  const companyId = (session.user as any)?.companyId;
  if (!companyId) {
    redirect('/login');
  }

  const theme = await prisma.pdfTheme.findFirst({
    where: {
      id: params.id,
      companyId,
    },
  });

  if (!theme) {
    redirect('/app/templates?tab=boq');
  }

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { name: true },
  });

  return (
    <ThemeEditorClient
      theme={{
        id: theme.id,
        name: theme.name,
        isDefault: theme.isDefault,
        config: theme.configJson as any,
      }}
      companyName={company?.name || 'Company'}
    />
  );
}
