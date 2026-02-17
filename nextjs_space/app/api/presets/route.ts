import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { getBillingStatus } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// GET - List all presets for the company
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user?.companyId) {
      return NextResponse.json({ error: 'No company' }, { status: 400 });
    }
    const presets = await prisma.boq.findMany({
      where: { companyId: user.companyId, isPreset: true },
      include: {
        categories: {
          include: { items: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(presets);
  } catch (error: any) {
    console.error('Error fetching presets:', error);
    return NextResponse.json({ error: 'Failed to fetch presets' }, { status: 500 });
  }
}

// POST - Create a new empty preset
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user?.companyId) {
      return NextResponse.json({ error: 'No company' }, { status: 400 });
    }

    // Check preset limit
    const billing = await getBillingStatus(user.companyId);
    const presetsLimit = billing.boqPresetsLimit;
    if (presetsLimit !== null) {
      const existingCount = await prisma.boq.count({
        where: { companyId: user.companyId, isPreset: true },
      });
      if (existingCount >= presetsLimit) {
        return NextResponse.json(
          { error: `You have reached the maximum of ${presetsLimit} preset(s) for your plan. Upgrade to create more.` },
          { status: 403 }
        );
      }
    }

    const body = await request.json();
    const presetName = body.presetName?.trim() || 'New Preset';

    const preset = await prisma.boq.create({
      data: {
        companyId: user.companyId,
        projectName: presetName,
        presetName: presetName,
        isPreset: true,
        status: 'preset',
        categories: {
          create: [
            {
              name: 'General',
              sortOrder: 0,
              items: {
                create: [
                  { description: 'Sample item', unit: 'nos', unitCost: 0, markupPct: 0, quantity: 0, sortOrder: 0 },
                ],
              },
            },
          ],
        },
      },
      include: { categories: { include: { items: true } } },
    });

    return NextResponse.json(preset, { status: 201 });
  } catch (error: any) {
    console.error('Error creating preset:', error);
    return NextResponse.json({ error: 'Failed to create preset' }, { status: 500 });
  }
}
