import { prisma } from './db';
import { PLANS, PlanKey } from './stripe';
import { startOfMonth, endOfMonth } from 'date-fns';

export interface BillingStatus {
  hasActiveSubscription: boolean;
  isBlocked: boolean;
  planKey: PlanKey | null;
  status: string | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  boqsUsedThisPeriod: number;
  boqLimit: number | null;
  canCreateBoq: boolean;
  hasAdminGrant: boolean;
  accessOverride: string | null;
}

/**
 * Get billing status for a company - includes admin grant checking
 */
export async function getCompanyBillingStatus(companyId: string): Promise<BillingStatus> {
  const [company, billing] = await Promise.all([
    prisma.company.findUnique({
      where: { id: companyId },
      select: { isBlocked: true },
    }),
    prisma.companyBilling.findUnique({
      where: { companyId },
    }),
  ]);

  const isBlocked = company?.isBlocked ?? false;

  // Check for admin grant (free_forever or admin_grant override)
  const hasAdminGrant = billing?.accessOverride === 'free_forever' || billing?.accessOverride === 'admin_grant';
  
  // If admin grant is active, user has access regardless of subscription
  if (hasAdminGrant && !isBlocked) {
    const overridePlan = billing?.overridePlan || 'business';
    const plan = PLANS[overridePlan as PlanKey];
    const boqLimit = plan?.boqLimit ?? null;

    return {
      hasActiveSubscription: true, // Treat as active
      isBlocked: false,
      planKey: overridePlan as PlanKey,
      status: 'active',
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
      boqsUsedThisPeriod: 0,
      boqLimit,
      canCreateBoq: true,
      hasAdminGrant: true,
      accessOverride: billing?.accessOverride ?? null,
    };
  }

  // No subscription = no access (unless we add a free tier later)
  if (!billing || !billing.planKey || !billing.status) {
    return {
      hasActiveSubscription: false,
      isBlocked,
      planKey: null,
      status: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
      boqsUsedThisPeriod: 0,
      boqLimit: null,
      canCreateBoq: false,
      hasAdminGrant: false,
      accessOverride: null,
    };
  }

  const hasActiveSubscription = ['active', 'trialing'].includes(billing.status);
  const plan = PLANS[billing.planKey as PlanKey];
  const boqLimit = plan?.boqLimit ?? null;

  // Count BOQs created this billing period
  let boqsUsedThisPeriod = 0;
  if (billing.currentPeriodStart && billing.currentPeriodEnd) {
    boqsUsedThisPeriod = await prisma.boqCreationEvent.count({
      where: {
        companyId,
        createdAt: {
          gte: billing.currentPeriodStart,
          lte: billing.currentPeriodEnd,
        },
      },
    });
  }

  // Determine if company can create BOQ
  let canCreateBoq = false;
  if (isBlocked) {
    canCreateBoq = false;
  } else if (hasActiveSubscription) {
    if (boqLimit === null) {
      // Unlimited plan
      canCreateBoq = true;
    } else {
      canCreateBoq = boqsUsedThisPeriod < boqLimit;
    }
  }

  return {
    hasActiveSubscription,
    isBlocked,
    planKey: billing.planKey as PlanKey,
    status: billing.status,
    currentPeriodEnd: billing.currentPeriodEnd,
    cancelAtPeriodEnd: billing.cancelAtPeriodEnd,
    boqsUsedThisPeriod,
    boqLimit,
    canCreateBoq,
    hasAdminGrant: false,
    accessOverride: billing?.accessOverride ?? null,
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
