export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;

    const theme = await prisma.pdfTheme.findFirst({
      where: { id: params?.id, companyId },
    });

    if (!theme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }

    return NextResponse.json(theme);
  } catch (error) {
    console.error('Error fetching theme:', error);
    return NextResponse.json({ error: 'Failed to fetch theme' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    const body = await request.json();

    // Verify ownership
    const existingTheme = await prisma.pdfTheme.findFirst({
      where: { id: params?.id, companyId },
    });

    if (!existingTheme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }

    // If setting as default, unset other defaults first
    if (body.isDefault === true) {
      await prisma.pdfTheme.updateMany({
        where: { companyId, isDefault: true, id: { not: params?.id } },
        data: { isDefault: false },
      });
    }

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.configJson !== undefined) updateData.configJson = body.configJson;
    if (body.isDefault !== undefined) updateData.isDefault = body.isDefault;

    const theme = await prisma.pdfTheme.update({
      where: { id: params?.id },
      data: updateData,
    });

    return NextResponse.json(theme);
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;

    // Verify ownership
    const existingTheme = await prisma.pdfTheme.findFirst({
      where: { id: params?.id, companyId },
    });

    if (!existingTheme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }

    // Check if theme is used by any BOQs
    const boqCount = await prisma.boq.count({
      where: { pdfThemeId: params?.id },
    });

    if (boqCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete theme. It is used by ${boqCount} BOQ(s).` },
        { status: 400 }
      );
    }

    await prisma.pdfTheme.delete({
      where: { id: params?.id },
    });

    // If deleted theme was default, set another as default
    if (existingTheme.isDefault) {
      const firstTheme = await prisma.pdfTheme.findFirst({
        where: { companyId },
        orderBy: { createdAt: 'asc' },
      });
      if (firstTheme) {
        await prisma.pdfTheme.update({
          where: { id: firstTheme.id },
          data: { isDefault: true },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting theme:', error);
    return NextResponse.json({ error: 'Failed to delete theme' }, { status: 500 });
  }
}
