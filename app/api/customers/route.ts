export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { botProtection, sanitizeText } from '@/lib/sanitize';

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

    const customers = await prisma.customer.findMany({
      where: { companyId },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(customers ?? []);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Bot protection
    const botBlock = botProtection(request);
    if (botBlock) return botBlock;

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = (session.user as any)?.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'No company found' }, { status: 400 });
    }

    const body = await request.json();

    // Sanitize all inputs
    const name = sanitizeText(body.name, 200);
    const email = sanitizeText(body.email, 254);
    const phone = sanitizeText(body.phone, 30);
    const address = sanitizeText(body.address, 500);

    if (!name || name.length < 1) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Basic email format validation if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const customer = await prisma.customer.create({
      data: {
        companyId,
        name,
        email: email || null,
        phone: phone || null,
        address: address || null,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
