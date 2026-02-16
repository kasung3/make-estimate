import Stripe from 'stripe';
import { prisma } from './db';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLANS = {
  starter: {
    key: 'starter' as const,
    name: 'Starter',
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    price: 19,
    boqLimit: 10,
    description: '10 BOQ creations per month',
  },
  business: {
    key: 'business' as const,
    name: 'Business',
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID!,
    price: 39,
    boqLimit: null, // unlimited
    description: 'Unlimited BOQ creations',
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export function getPlanByPriceId(priceId: string) {
  // First check hardcoded PLANS for backwards compatibility
  const hardcodedPlan = Object.values(PLANS).find(plan => plan.priceId === priceId);
  if (hardcodedPlan) return hardcodedPlan;
  
  // Return null for sync lookup - use async version for DB lookup
  return null;
}

/**
 * Look up plan by Stripe price ID from the database.
 * This handles monthly, annual, and dynamically configured price IDs.
 */
export async function getPlanByPriceIdFromDb(priceId: string) {
  const plan = await prisma.billingPlan.findFirst({
    where: {
      OR: [
        { stripePriceIdMonthly: priceId },
        { stripePriceIdAnnual: priceId },
      ],
    },
  });
  return plan;
}

export function mapStripeStatus(status: Stripe.Subscription.Status) {
  const statusMap: Record<string, string> = {
    active: 'active',
    trialing: 'trialing',
    past_due: 'past_due',
    canceled: 'canceled',
    incomplete: 'incomplete',
    incomplete_expired: 'incomplete_expired',
    unpaid: 'unpaid',
    paused: 'canceled', // Map paused to canceled for simplicity
  };
  return statusMap[status] || 'incomplete';
}

/**
 * Sync Stripe subscription quantity with active member count for per-seat billing.
 * Only updates if the plan has per_seat billing model.
 */
export async function syncStripeQuantity(companyId: string): Promise<void> {
  try {
    // Get company billing info
    const billing = await prisma.companyBilling.findUnique({
      where: { companyId },
    });

    if (!billing?.stripeSubscriptionId || !billing?.planKey) {
      console.log(`[Stripe Sync] No subscription for company ${companyId}`);
      return;
    }

    // Check if plan uses per-seat model
    const plan = await prisma.billingPlan.findUnique({
      where: { planKey: billing.planKey },
    });

    if (!plan || plan.seatModel !== 'per_seat') {
      console.log(`[Stripe Sync] Plan ${billing.planKey} does not use per-seat billing`);
      return;
    }

    // Count active members
    const activeCount = await prisma.companyMembership.count({
      where: { companyId, isActive: true },
    });

    // Ensure at least 1 seat
    const quantity = Math.max(1, activeCount);

    // Get current subscription
    const subscription = await stripe.subscriptions.retrieve(billing.stripeSubscriptionId);
    
    if (subscription.status === 'canceled' || subscription.status === 'incomplete_expired') {
      console.log(`[Stripe Sync] Subscription ${billing.stripeSubscriptionId} is not active`);
      return;
    }

    // Find the subscription item (there should be one)
    const subscriptionItem = subscription.items.data[0];
    if (!subscriptionItem) {
      console.error(`[Stripe Sync] No subscription item found for ${billing.stripeSubscriptionId}`);
      return;
    }

    // Only update if quantity changed
    if (subscriptionItem.quantity !== quantity) {
      await stripe.subscriptionItems.update(subscriptionItem.id, {
        quantity,
        proration_behavior: 'create_prorations',
      });

      // Update local record
      await prisma.companyBilling.update({
        where: { companyId },
        data: { seatQuantity: quantity },
      });

      console.log(`[Stripe Sync] Updated company ${companyId} quantity from ${subscriptionItem.quantity} to ${quantity}`);
    }
  } catch (error) {
    console.error(`[Stripe Sync] Error syncing quantity for company ${companyId}:`, error);
    // Don't throw - this is a background operation
  }
}
