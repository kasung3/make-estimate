import { prisma } from './db';
import { startOfMonth, endOfMonth, addDays } from 'date-fns';

export interface BillingStatus {
  hasActiveSubscription: boolean;
  isBlocked: boolean;
  planKey: string | null;
  status: string | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  boqsUsedThisPeriod: number;
  boqLimit: number | null;
  canCreateBoq: boolean;
  hasAdminGrant: boolean;
  hasTrialGrant: boolean;
  accessOverride: string | null;
  trialEndsAt: Date | null;
  accessSource: 'subscription' | 'grant' | 'admin_override' | null;
}

/**
 * Get plan from database (dynamic pricing)
 */
export async function getPlanFromDb(planKey: string) {
  return prisma.billingPlan.findUnique({
    where: { planKey },
  });
}

/**
 * Get all active plans from database
 */
export async function getActivePlans() {
  return prisma.billingPlan.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });
}

/**
 * Get billing status for a company
 * Priority: 1) Check blocked, 2) Check active grant, 3) Check Stripe subscription
 */
export async function getCompanyBillingStatus(companyId: string): Promise<BillingStatus> {
  const now = new Date();

  const [company, billing, activeGrant] = await Promise.all([
    prisma.company.findUnique({
      where: { id: companyId },
      select: { isBlocked: true },
    }),
    prisma.companyBilling.findUnique({
      where: { companyId },
    }),
    // Find active grant (not revoked, not expired)
    prisma.companyAccessGrant.findFirst({
      where: {
        companyId,
        revokedAt: null,
        OR: [
          { endsAt: null }, // free_forever
          { endsAt: { gt: now } }, // trial not expired
        ],
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const isBlocked = company?.isBlocked ?? false;

  // Helper to compute usage for a period
  async function computeUsage(periodStart: Date, periodEnd: Date): Promise<number> {
    return prisma.boqCreationEvent.count({
      where: {
        companyId,
        createdAt: {
          gte: periodStart,
          lte: periodEnd,
        },
      },
    });
  }

  // Helper to get plan limit from DB
  async function getPlanLimit(planKey: string | null): Promise<number | null> {
    if (!planKey) return null;
    const plan = await getPlanFromDb(planKey);
    return plan?.boqLimitPerPeriod ?? null;
  }

  // 1) Check for admin override on billing record (free_forever, admin_grant)
  const hasAdminGrant = billing?.accessOverride === 'free_forever' || billing?.accessOverride === 'admin_grant';
  
  if (hasAdminGrant && !isBlocked) {
    const overridePlan = billing?.overridePlan || 'business';
    const boqLimit = await getPlanLimit(overridePlan);
    
    // For admin grants, use calendar month as the period
    const periodStart = startOfMonth(now);
    const periodEnd = endOfMonth(now);
    const boqsUsedThisPeriod = await computeUsage(periodStart, periodEnd);

    const canCreateBoq = boqLimit === null || boqsUsedThisPeriod < boqLimit;

    return {
      hasActiveSubscription: true,
      isBlocked: false,
      planKey: overridePlan,
      status: 'active',
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
      boqsUsedThisPeriod,
      boqLimit,
      canCreateBoq,
      hasAdminGrant: true,
      hasTrialGrant: false,
      accessOverride: billing?.accessOverride ?? null,
      trialEndsAt: null,
      accessSource: 'admin_override',
    };
  }

  // 2) Check for internal access grant (trial/free_forever from coupon)
  if (activeGrant && !isBlocked) {
    const grantPlan = activeGrant.planKey || 'starter';
    const boqLimit = await getPlanLimit(grantPlan);
    
    // For grants, use grant start as period start, end as period end (or calendar month for free_forever)
    const periodStart = activeGrant.startsAt;
    const periodEnd = activeGrant.endsAt || endOfMonth(now);
    const boqsUsedThisPeriod = await computeUsage(periodStart, periodEnd);

    const canCreateBoq = boqLimit === null || boqsUsedThisPeriod < boqLimit;
    const isTrialGrant = activeGrant.grantType === 'trial';

    return {
      hasActiveSubscription: true,
      isBlocked: false,
      planKey: grantPlan,
      status: isTrialGrant ? 'trialing' : 'active',
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
      boqsUsedThisPeriod,
      boqLimit,
      canCreateBoq,
      hasAdminGrant: false,
      hasTrialGrant: isTrialGrant,
      accessOverride: null,
      trialEndsAt: isTrialGrant ? activeGrant.endsAt : null,
      accessSource: 'grant',
    };
  }

  // 3) Check Stripe subscription
  if (!billing || !billing.planKey || !billing.status) {
    return {
      hasActiveSubscription: false,
      isBlocked,
      planKey: null,
      status: null,
      currentPeriodStart: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
      boqsUsedThisPeriod: 0,
      boqLimit: null,
      canCreateBoq: false,
      hasAdminGrant: false,
      hasTrialGrant: false,
      accessOverride: null,
      trialEndsAt: null,
      accessSource: null,
    };
  }

  const hasActiveSubscription = ['active', 'trialing'].includes(billing.status);
  const boqLimit = await getPlanLimit(billing.planKey);

  // Count BOQs created this billing period
  let boqsUsedThisPeriod = 0;
  if (billing.currentPeriodStart && billing.currentPeriodEnd) {
    boqsUsedThisPeriod = await computeUsage(billing.currentPeriodStart, billing.currentPeriodEnd);
  }

  // Determine if company can create BOQ
  let canCreateBoq = false;
  if (isBlocked) {
    canCreateBoq = false;
  } else if (hasActiveSubscription) {
    canCreateBoq = boqLimit === null || boqsUsedThisPeriod < boqLimit;
  }

  return {
    hasActiveSubscription,
    isBlocked,
    planKey: billing.planKey,
    status: billing.status,
    currentPeriodStart: billing.currentPeriodStart,
    currentPeriodEnd: billing.currentPeriodEnd,
    cancelAtPeriodEnd: billing.cancelAtPeriodEnd,
    boqsUsedThisPeriod,
    boqLimit,
    canCreateBoq,
    hasAdminGrant: false,
    hasTrialGrant: billing.status === 'trialing',
    accessOverride: billing?.accessOverride ?? null,
    trialEndsAt: billing.status === 'trialing' ? billing.currentPeriodEnd : null,
    accessSource: 'subscription',
  };
}

/**
 * Record a BOQ creation event for quota tracking
 */
export async function recordBoqCreation(companyId: string, boqId: string) {
  await prisma.boqCreationEvent.create({
    data: {
      companyId,
      boqId,
    },
  });
}

/**
 * Check if user email is a platform admin
 */
export function isPlatformAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.PLATFORM_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) ?? [];
  return adminEmails.includes(email.toLowerCase());
}

/**
 * Get or create CompanyBilling record
 */
export async function getOrCreateBilling(companyId: string) {
  let billing = await prisma.companyBilling.findUnique({
    where: { companyId },
  });

  if (!billing) {
    billing = await prisma.companyBilling.create({
      data: { companyId },
    });
  }

  return billing;
}
