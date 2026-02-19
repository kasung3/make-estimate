import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { sanitizeText } from '@/lib/sanitize';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

// GET - Get single feedback
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const feedback = await prisma.feedback.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
        company: {
          select: { id: true, name: true },
        },
      },
    });

    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

// PUT - Update feedback (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { status, priority, adminNotes, isPublic } = body;

    const updateData: Record<string, unknown> = {};

    // Validate and set status
    if (status) {
      const validStatuses = ['new', 'under_review', 'planned', 'in_progress', 'completed', 'wont_do'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }
      updateData.status = status;
    }

    // Validate and set priority
    if (priority) {
      const validPriorities = ['low', 'medium', 'high', 'critical'];
      if (!validPriorities.includes(priority)) {
        return NextResponse.json({ error: 'Invalid priority' }, { status: 400 });
      }
      updateData.priority = priority;
    }

    // Sanitize admin notes
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes ? sanitizeText(adminNotes, 5000) : null;
    }

    // Set public visibility
    if (typeof isPublic === 'boolean') {
      updateData.isPublic = isPublic;
    }

    const feedback = await prisma.feedback.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
        company: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}

// DELETE - Delete feedback (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.feedback.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
}
