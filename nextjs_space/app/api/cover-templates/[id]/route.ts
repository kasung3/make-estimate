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

    const template = await prisma.pdfCoverTemplate.findFirst({
      where: {
        id: params.id,
        companyId,
      },
    });

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error fetching cover template:', error);
    return NextResponse.json({ error: 'Failed to fetch template' }, { status: 500 });
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

    // Verify the template belongs to the company
    const existing = await prisma.pdfCoverTemplate.findFirst({
      where: {
        id: params.id,
        companyId,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, configJson, isDefault } = body;

    // If this template is set as default, unset any existing default
    if (isDefault && !existing.isDefault) {
      await prisma.pdfCoverTemplate.updateMany({
        where: { companyId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (configJson !== undefined) updateData.configJson = configJson;
    if (isDefault !== undefined) updateData.isDefault = isDefault;

    const template = await prisma.pdfCoverTemplate.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error updating cover template:', error);
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
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

    // Verify the template belongs to the company
    const existing = await prisma.pdfCoverTemplate.findFirst({
      where: {
        id: params.id,
        companyId,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    // Don't allow deleting the default template if it's the only one
    if (existing.isDefault) {
      const count = await prisma.pdfCoverTemplate.count({
        where: { companyId },
      });
      if (count === 1) {
        return NextResponse.json(
          { error: 'Cannot delete the only template. Create another one first.' },
          { status: 400 }
        );
      }
    }

    await prisma.pdfCoverTemplate.delete({
      where: { id: params.id },
    });

    // If we deleted the default, make another one default
    if (existing.isDefault) {
      const another = await prisma.pdfCoverTemplate.findFirst({
        where: { companyId },
      });
      if (another) {
        await prisma.pdfCoverTemplate.update({
          where: { id: another.id },
          data: { isDefault: true },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting cover template:', error);
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 });
  }
}
