export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { CoverPageConfig } from '@/lib/types';

// Default cover template configuration matching current PDF output
const getDefaultCoverConfig = (): CoverPageConfig => ({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
    defaultFontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  elements: [
    {
      id: 'project_name',
      type: 'project_name',
      enabled: true,
      style: {
        fontSize: 36,
        fontWeight: 'bold',
        italic: false,
        underline: false,
        color: '#0891b2',
        align: 'center',
        marginTop: 0,
        marginBottom: 20,
      },
    },
    {
      id: 'subtitle',
      type: 'subtitle',
      enabled: true,
      text: 'Bill of Quantities',
      style: {
        fontSize: 18,
        fontWeight: 'normal',
        italic: false,
        underline: false,
        color: '#666666',
        align: 'center',
        marginTop: 0,
        marginBottom: 10,
      },
    },
    {
      id: 'prepared_for',
      type: 'prepared_for',
      enabled: true,
      style: {
        fontSize: 18,
        fontWeight: 'normal',
        italic: false,
        underline: false,
        color: '#666666',
        align: 'center',
        marginTop: 0,
        marginBottom: 40,
      },
    },
    {
      id: 'company_name',
      type: 'company_name',
      enabled: true,
      style: {
        fontSize: 16,
        fontWeight: 'normal',
        italic: false,
        underline: false,
        color: '#333333',
        align: 'center',
        marginTop: 0,
        marginBottom: 0,
      },
    },
  ],
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const templates = await prisma.pdfCoverTemplate.findMany({
      where: { companyId },
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching cover templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, configJson, isDefault } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // If this template is set as default, unset any existing default
    if (isDefault) {
      await prisma.pdfCoverTemplate.updateMany({
        where: { companyId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const template = await prisma.pdfCoverTemplate.create({
      data: {
        companyId,
        name,
        configJson: configJson || getDefaultCoverConfig(),
        isDefault: isDefault ?? false,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error creating cover template:', error);
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
  }
}
