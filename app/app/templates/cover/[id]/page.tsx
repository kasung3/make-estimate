import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { CoverEditorClient } from './_components/cover-editor-client';

export default async function CoverEditorPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }

  const companyId = (session.user as any)?.companyId;
  if (!companyId) {
    redirect('/login');
  }

  const template = await prisma.pdfCoverTemplate.findFirst({
    where: {
      id: params.id,
      companyId,
    },
  });

  if (!template) {
    redirect('/app/templates?tab=cover');
  }

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { name: true },
  });

  return (
    <CoverEditorClient
      template={{
        id: template.id,
        name: template.name,
        isDefault: template.isDefault,
        config: template.configJson as any,
      }}
      companyName={company?.name || 'Company'}
    />
  );
}
