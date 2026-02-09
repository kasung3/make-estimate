export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { PdfThemeConfig } from '@/lib/types';
import { getCompanyBillingStatus } from '@/lib/billing';

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
    if (!companyId) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Check billing status and template limits
    const billingStatus = await getCompanyBillingStatus(companyId);
    
    if (!billingStatus.hasActiveSubscription) {
      return NextResponse.json({ 
        error: 'Active subscription required to create BOQ templates',
        code: 'SUBSCRIPTION_REQUIRED' 
      }, { status: 403 });
    }

    // Count existing themes
    const existingThemes = await prisma.pdfTheme.count({ where: { companyId } });
    
    // Check template limit (null = unlimited)
    if (billingStatus.boqTemplatesLimit !== null && existingThemes >= billingStatus.boqTemplatesLimit) {
      const planName = billingStatus.planKey ? billingStatus.planKey.charAt(0).toUpperCase() + billingStatus.planKey.slice(1) : 'your plan';
      return NextResponse.json({ 
        error: `You've reached the ${planName} limit: ${billingStatus.boqTemplatesLimit} BOQ theme${billingStatus.boqTemplatesLimit === 1 ? '' : 's'}.`,
        code: 'LIMIT_EXCEEDED',
        limit_type: 'boq_templates',
        used: existingThemes,
        limit: billingStatus.boqTemplatesLimit,
        plan_key: billingStatus.planKey,
        plan_name: planName,
        upgrade_url: '/pricing',
      }, { status: 403 });
    }

    const body = await request.json();
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
