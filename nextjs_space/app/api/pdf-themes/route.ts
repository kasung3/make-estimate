export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { PdfThemeConfig } from '@/lib/types';

// Default theme configuration (matches current hardcoded colors)
const getDefaultThemeConfig = (): PdfThemeConfig => ({
  header: {
    borderColor: '#0891b2',
    titleColor: '#0891b2',
    subtitleColor: '#666666',
  },
  categoryHeader: {
    backgroundPrimary: '#0891b2',
    backgroundSecondary: '#14b8a6',
    textColor: '#ffffff',
  },
  table: {
    headerBackground: '#f9fafb',
    headerTextColor: '#6b7280',
    borderColor: '#e5e7eb',
    bodyTextColor: '#333333',
  },
  subtotalRow: {
    background: '#f0fdfa',
    borderColor: '#14b8a6',
    textColor: '#333333',
  },
  noteRow: {
    background: '#fffbeb',
    textColor: '#92400e',
  },
  totals: {
    finalTotalBackground: '#0891b2',
    finalTotalTextColor: '#ffffff',
  },
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;

    const themes = await prisma.pdfTheme.findMany({
      where: { companyId },
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    });

    return NextResponse.json(themes);
  } catch (error) {
    console.error('Error fetching themes:', error);
    return NextResponse.json({ error: 'Failed to fetch themes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    const body = await request.json();

    // Check if this is the first theme (make it default)
    const existingThemes = await prisma.pdfTheme.count({ where: { companyId } });
    const isDefault = existingThemes === 0 ? true : body.isDefault ?? false;

    // If setting as default, unset other defaults first
    if (isDefault) {
      await prisma.pdfTheme.updateMany({
        where: { companyId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const theme = await prisma.pdfTheme.create({
      data: {
        companyId,
        name: body.name || 'New Theme',
        configJson: body.configJson || getDefaultThemeConfig(),
        isDefault,
      },
    });

    return NextResponse.json(theme);
  } catch (error) {
    console.error('Error creating theme:', error);
    return NextResponse.json({ error: 'Failed to create theme' }, { status: 500 });
  }
}
