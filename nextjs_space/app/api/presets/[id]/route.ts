import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// DELETE a preset
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user?.companyId) {
      return NextResponse.json({ error: 'No company' }, { status: 400 });
    }
    const preset = await prisma.boq.findFirst({
      where: { id: params.id, companyId: user.companyId, isPreset: true },
    });
    if (!preset) {
      return NextResponse.json({ error: 'Preset not found' }, { status: 404 });
    }
    await prisma.boq.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting preset:', error);
    return NextResponse.json({ error: 'Failed to delete preset' }, { status: 500 });
  }
}

// PUT - rename a preset
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user?.companyId) {
      return NextResponse.json({ error: 'No company' }, { status: 400 });
    }
    const body = await request.json();
    const preset = await prisma.boq.findFirst({
      where: { id: params.id, companyId: user.companyId, isPreset: true },
    });
    if (!preset) {
      return NextResponse.json({ error: 'Preset not found' }, { status: 404 });
    }
    const updated = await prisma.boq.update({
      where: { id: params.id },
      data: {
        presetName: body.presetName?.trim() || preset.presetName,
        projectName: body.presetName?.trim() || preset.projectName,
      },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating preset:', error);
    return NextResponse.json({ error: 'Failed to update preset' }, { status: 500 });
  }
}
