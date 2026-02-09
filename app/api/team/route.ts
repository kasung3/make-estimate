export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { getCompanyBillingStatus } from '@/lib/billing';
import bcrypt from 'bcryptjs';
import { syncStripeQuantity } from '@/lib/stripe';

// GET - List all team members
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;
    
    // Get all memberships with user details
    const memberships = await prisma.companyMembership.findMany({
      where: { companyId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            firstName: true,
            lastName: true,
            isBlocked: true,
            createdAt: true,
            lastLoginAt: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Get billing status to show plan limits
    const billingStatus = await getCompanyBillingStatus(companyId);
    
    // Get plan details for seat model
    const plan = billingStatus.planKey 
      ? await prisma.billingPlan.findUnique({ where: { planKey: billingStatus.planKey } })
      : null;
    
    // Count active members
    const activeCount = memberships.filter(m => m.isActive).length;

    return NextResponse.json({
      members: memberships.map(m => ({
        id: m.id,
        userId: m.userId,
        role: m.role,
        isActive: m.isActive,
        createdAt: m.createdAt,
        user: m.user,
      })),
      stats: {
        total: memberships.length,
        active: activeCount,
        limit: plan?.maxActiveMembers || null,
      },
      planKey: billingStatus.planKey,
      seatModel: plan?.seatModel || 'single',
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

// POST - Invite a new team member
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyId = session.user.companyId;
    const userId = session.user.id;

    // Check if user is admin
    const membership = await prisma.companyMembership.findFirst({
      where: { userId, companyId },
    });

    if (membership?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only admins can invite team members' }, { status: 403 });
    }

    // Check billing status for team features
    const billingStatus = await getCompanyBillingStatus(companyId);
    
    if (!billingStatus.hasActiveSubscription) {
      return NextResponse.json({ 
        error: 'Active subscription required to add team members',
        code: 'SUBSCRIPTION_REQUIRED' 
      }, { status: 403 });
    }

    // Get plan details to check seat model
    const plan = billingStatus.planKey 
      ? await prisma.billingPlan.findUnique({ where: { planKey: billingStatus.planKey } })
      : null;
    
    // Check if plan supports team members (per_seat model)
    const seatModel = plan?.seatModel || 'single';
    if (seatModel === 'single') {
      return NextResponse.json({ 
        error: 'Your plan does not support team members. Upgrade to Business plan.',
        code: 'PLAN_NOT_SUPPORTED' 
      }, { status: 403 });
    }

    const body = await request.json();
    const { email, firstName, lastName, role = 'MEMBER', password } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      // Check if already a member of this company
      const existingMembership = await prisma.companyMembership.findFirst({
        where: { userId: user.id, companyId },
      });

      if (existingMembership) {
        return NextResponse.json({ 
          error: 'User is already a member of this company',
          code: 'ALREADY_MEMBER' 
        }, { status: 400 });
      }
    } else {
      // Create new user with provided or generated password
      const hashedPassword = await bcrypt.hash(password || 'temppass123', 10);
      user = await prisma.user.create({
        data: {
          email,
          name: `${firstName || ''} ${lastName || ''}`.trim() || email.split('@')[0],
          firstName,
          lastName,
          password: hashedPassword,
        },
      });
    }

    // Create membership
    const newMembership = await prisma.companyMembership.create({
      data: {
        userId: user.id,
        companyId,
        role: role as 'ADMIN' | 'MEMBER',
        isActive: true,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            firstName: true,
            lastName: true,
            isBlocked: true,
            createdAt: true,
          },
        },
      },
    });

    // Sync Stripe quantity for per-seat billing
    await syncStripeQuantity(companyId);

    return NextResponse.json({
      id: newMembership.id,
      userId: newMembership.userId,
      role: newMembership.role,
      isActive: newMembership.isActive,
      createdAt: newMembership.createdAt,
      user: newMembership.user,
    });
  } catch (error) {
    console.error('Error inviting team member:', error);
    return NextResponse.json({ error: 'Failed to invite team member' }, { status: 500 });
  }
}
