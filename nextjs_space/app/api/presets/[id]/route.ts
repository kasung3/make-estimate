import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// PUT - Update preset name
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const companyId = (session.user as any)?.companyId;

    const preset = await prisma.boq.findFirst({
      where: { id: params.id, companyId, isPreset: true },
    });
    if (!preset) {
      return NextResponse.json({ error: 'Preset not found' }, { status: 404 });
    }

    const { presetName } = await request.json();
    const updated = await prisma.boq.update({
      where: { id: params.id },
      data: {
        presetName: presetName || preset.presetName,
        projectName: presetName || preset.projectName,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating preset:', error);
    return NextResponse.json({ error: 'Failed to update preset' }, { status: 500 });
  }
}

// DELETE - Delete a preset
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const companyId = (session.user as any)?.companyId;

    const preset = await prisma.boq.findFirst({
      where: { id: params.id, companyId, isPreset: true },
    });
    if (!preset) {
      return NextResponse.json({ error: 'Preset not found' }, { status: 404 });
    }

    await prisma.boq.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting preset:', error);
    return NextResponse.json({ error: 'Failed to delete preset' }, { status: 500 });
  }
}
