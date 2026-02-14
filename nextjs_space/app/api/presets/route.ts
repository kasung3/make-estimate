import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { getCompanyBillingStatus } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// GET - List all presets for the company
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'No company found' }, { status: 400 });
    }

    const presets = await prisma.boq.findMany({
      where: { companyId, isPreset: true },
      include: {
        categories: {
          include: { items: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(presets ?? []);
  } catch (error) {
    console.error('Error fetching presets:', error);
    return NextResponse.json({ error: 'Failed to fetch presets' }, { status: 500 });
  }
}

// POST - Create a new empty preset
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'No company found' }, { status: 400 });
    }

    // Check preset limit
    const billingStatus = await getCompanyBillingStatus(companyId);
    const limit = billingStatus.boqPresetsLimit;
    if (limit !== null) {
      const currentCount = await prisma.boq.count({
        where: { companyId, isPreset: true },
      });
      if (currentCount >= limit) {
        return NextResponse.json(
          { error: `Preset limit reached (${limit}). Upgrade for more.`, code: 'LIMIT_EXCEEDED' },
          { status: 403 }
        );
      }
    }

    const { presetName } = await request.json();

    const preset = await prisma.boq.create({
      data: {
        companyId,
        projectName: presetName || 'Untitled Preset',
        isPreset: true,
        presetName: presetName || 'Untitled Preset',
        status: 'preset',
      },
    });

    // Create a default category
    await prisma.boqCategory.create({
      data: {
        boqId: preset.id,
        name: 'General Works',
        sortOrder: 0,
      },
    });

    // Re-fetch with relations
    const fullPreset = await prisma.boq.findUnique({
      where: { id: preset.id },
      include: {
        categories: {
          include: { items: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return NextResponse.json(fullPreset);
  } catch (error) {
    console.error('Error creating preset:', error);
    return NextResponse.json({ error: 'Failed to create preset' }, { status: 500 });
  }
}
