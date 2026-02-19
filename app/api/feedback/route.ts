import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { sanitizeText } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

// GET - List user's own feedback submissions
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const feedback = await prisma.feedback.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

// POST - Create new feedback
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, title, description } = body;

    // Validate type
    if (!['feature_request', 'bug_report'].includes(type)) {
      return NextResponse.json({ error: 'Invalid feedback type' }, { status: 400 });
    }

    // Validate and sanitize inputs
    const sanitizedTitle = sanitizeText(title, 200);
    const sanitizedDescription = sanitizeText(description, 5000);

    if (!sanitizedTitle || sanitizedTitle.length < 5) {
      return NextResponse.json({ error: 'Title must be at least 5 characters' }, { status: 400 });
    }

    if (!sanitizedDescription || sanitizedDescription.length < 10) {
      return NextResponse.json({ error: 'Description must be at least 10 characters' }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        type,
        title: sanitizedTitle,
        description: sanitizedDescription,
        userId: session.user.id,
        companyId: session.user.companyId,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
  }
}
