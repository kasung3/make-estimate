export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password, companyName, firstName, lastName, phone } = await request.json();

    if (!email || !password || !companyName) {
      return NextResponse.json(
        { error: 'Email, password, and company name are required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Build full name from firstName and lastName, fallback to email prefix
    let name = email.split('@')[0];
    if (firstName || lastName) {
      name = [firstName, lastName].filter(Boolean).join(' ');
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
      },
    });

    const company = await prisma.company.create({
      data: {
        name: companyName,
      },
    });

    await prisma.companyMembership.create({
      data: {
        userId: user.id,
        companyId: company.id,
        role: 'ADMIN',
      },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
