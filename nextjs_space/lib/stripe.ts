import Stripe from 'stripe';

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
  return Object.values(PLANS).find(plan => plan.priceId === priceId);
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
