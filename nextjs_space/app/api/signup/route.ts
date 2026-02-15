export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

// Extract digits only from phone number for search
function normalizePhoneDigits(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  return digits.length > 0 ? digits : null;
}

export async function POST(request: Request) {
  try {
    const { email, password, companyName, firstName, lastName, phone, country } = await request.json();

    if (!email || !password || !companyName || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required: first name, last name, email, password, and company name' },
        { status: 400 }
      );
    }

    if (!country) {
      return NextResponse.json(
        { error: 'Country is required' },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 6) {
      return NextResponse.json(
        { error: 'A valid phone number is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
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

    // Normalize phone to digits-only for search
    const phoneDigits = normalizePhoneDigits(phone);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        phoneDigits,
        country: country || null,
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
