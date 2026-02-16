import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, getPlanByPriceId, getPlanByPriceIdFromDb, mapStripeStatus, PlanKey } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

// Disable body parsing - we need raw body for signature verification
export const runtime = 'nodejs';

async function getRawBody(request: Request): Promise<Buffer> {
  const arrayBuffer = await request.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(request: Request) {
  try {
    const body = await getRawBody(request);
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('No stripe-signature header');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('Webhook signature verification failed:', message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Check for idempotency - have we already processed this event?
    const existingEvent = await prisma.stripeWebhookEvent.findUnique({
      where: { id: event.id },
    });

    if (existingEvent) {
      console.log(`Event ${event.id} already processed, skipping`);
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Store event ID for idempotency before processing
    await prisma.stripeWebhookEvent.create({
      data: {
        id: event.id,
        type: event.type,
      },
    });

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.created':
      case 'invoice.updated':
        await handleInvoiceUpdate(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id);

  const companyId = session.metadata?.companyId;
  const promoCode = session.metadata?.promoCode;

  if (!companyId) {
    console.error('No companyId in checkout session metadata');
    return;
  }

  // If there was a promo code used, increment redemption count and record redemption
  if (promoCode) {
    const coupon = await prisma.platformCoupon.findFirst({
      where: { code: promoCode.toUpperCase() },
    });

    if (coupon) {
      // Increment redemption count
      await prisma.platformCoupon.update({
        where: { id: coupon.id },
        data: { currentRedemptions: { increment: 1 } },
      });

      // Record the redemption
      const billing = await prisma.companyBilling.findUnique({
        where: { companyId },
      });

      if (billing) {
        await prisma.couponRedemption.create({
          data: {
            companyBillingId: billing.id,
            couponCode: coupon.code,
            couponType: coupon.type,
            stripePromotionCodeId: coupon.stripePromoCodeId,
            source: 'checkout',
          },
        });

        // Update current coupon code on billing record
        await prisma.companyBilling.update({
          where: { id: billing.id },
          data: { currentCouponCode: coupon.code },
        });

        // If it's a free_forever coupon, set the access override
        if (coupon.type === 'free_forever') {
          await prisma.companyBilling.update({
            where: { id: billing.id },
            data: {
              accessOverride: 'free_forever',
              overridePlan: coupon.allowedPlans.length > 0 ? coupon.allowedPlans[0] : 'business',
            },
          });
        }
      }
    }
  }

  // Subscription update will be handled by subscription.created/updated event
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  console.log('Subscription update:', subscription.id, subscription.status);

  const companyId = subscription.metadata?.companyId;
  if (!companyId) {
    // Try to find by customer ID
    const billing = await prisma.companyBilling.findFirst({
      where: { stripeCustomerId: subscription.customer as string },
    });
    if (!billing) {
      console.error('Could not find company for subscription:', subscription.id);
      return;
    }
    await updateBillingFromSubscription(billing.companyId, subscription);
    return;
  }

  await updateBillingFromSubscription(companyId, subscription);
}

async function updateBillingFromSubscription(
  companyId: string,
  subscription: Stripe.Subscription
) {
  // Get plan from first line item - check DB for dynamic pricing
  const priceId = subscription.items.data[0]?.price?.id;
  let plan = priceId ? getPlanByPriceId(priceId) : null;
  
  // If not found in hardcoded PLANS, look up in database (handles monthly/annual/dynamic prices)
  if (!plan && priceId) {
    const dbPlan = await getPlanByPriceIdFromDb(priceId);
    if (dbPlan) {
      plan = { key: dbPlan.planKey, name: dbPlan.name, priceId, price: 0, boqLimit: dbPlan.boqLimitPerPeriod, description: dbPlan.name } as any;
    }
  }

  // Access period dates from subscription (cast to any for compatibility with different API versions)
  const subAny = subscription as any;
  const periodStart = subAny.current_period_start 
    ? new Date(subAny.current_period_start * 1000) 
    : new Date();
  const periodEnd = subAny.current_period_end 
    ? new Date(subAny.current_period_end * 1000) 
    : new Date();

  await prisma.companyBilling.upsert({
    where: { companyId },
    create: {
      companyId,
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      planKey: plan?.key as PlanKey | undefined,
      status: mapStripeStatus(subscription.status) as 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'unpaid',
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    update: {
      stripeSubscriptionId: subscription.id,
      planKey: plan?.key as PlanKey | undefined,
      status: mapStripeStatus(subscription.status) as 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'unpaid',
      currentPeriodStart: periodStart,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });

  console.log(`Updated billing for company ${companyId}:`, {
    plan: plan?.key,
    status: subscription.status,
    periodEnd,
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id);

  // Find billing record by subscription ID
  const billing = await prisma.companyBilling.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (billing) {
    await prisma.companyBilling.update({
      where: { id: billing.id },
      data: {
        status: 'canceled',
        cancelAtPeriodEnd: false,
      },
    });
    console.log(`Marked subscription as canceled for company ${billing.companyId}`);
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log('Invoice paid:', invoice.id);
  
  // Store invoice in our database
  const customerId = invoice.customer as string;
  const billing = await prisma.companyBilling.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (billing) {
    // Access period data safely
    const invoiceAny = invoice as any;
    const periodStart = invoiceAny.period_start 
      ? new Date(invoiceAny.period_start * 1000) 
      : null;
    const periodEnd = invoiceAny.period_end 
      ? new Date(invoiceAny.period_end * 1000) 
      : null;

    try {
      await prisma.billingInvoice.upsert({
        where: { stripeInvoiceId: invoice.id },
        create: {
          companyBillingId: billing.id,
          stripeInvoiceId: invoice.id,
          amountPaid: invoice.amount_paid,
          amountDue: invoice.amount_due,
          currency: invoice.currency,
          status: invoice.status || 'unknown',
          hostedInvoiceUrl: invoice.hosted_invoice_url || null,
          pdfUrl: invoice.invoice_pdf || null,
          periodStart,
          periodEnd,
        },
        update: {
          amountPaid: invoice.amount_paid,
          status: invoice.status || 'unknown',
          hostedInvoiceUrl: invoice.hosted_invoice_url || null,
          pdfUrl: invoice.invoice_pdf || null,
        },
      });
      console.log(`Stored invoice ${invoice.id} for company ${billing.companyId}`);
    } catch (err) {
      console.error('Failed to store invoice:', err);
    }
  }
}

async function handleInvoiceUpdate(invoice: Stripe.Invoice) {
  console.log('Invoice updated:', invoice.id, invoice.status);
  
  // Store/update invoice in our database for any status change
  const customerId = invoice.customer as string;
  const billing = await prisma.companyBilling.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (billing) {
    const invoiceAny = invoice as any;
    const periodStart = invoiceAny.period_start 
      ? new Date(invoiceAny.period_start * 1000) 
      : null;
    const periodEnd = invoiceAny.period_end 
      ? new Date(invoiceAny.period_end * 1000) 
      : null;

    try {
      await prisma.billingInvoice.upsert({
        where: { stripeInvoiceId: invoice.id },
        create: {
          companyBillingId: billing.id,
          stripeInvoiceId: invoice.id,
          amountPaid: invoice.amount_paid,
          amountDue: invoice.amount_due,
          currency: invoice.currency,
          status: invoice.status || 'unknown',
          hostedInvoiceUrl: invoice.hosted_invoice_url || null,
          pdfUrl: invoice.invoice_pdf || null,
          periodStart,
          periodEnd,
        },
        update: {
          amountPaid: invoice.amount_paid,
          amountDue: invoice.amount_due,
          status: invoice.status || 'unknown',
          hostedInvoiceUrl: invoice.hosted_invoice_url || null,
          pdfUrl: invoice.invoice_pdf || null,
        },
      });
    } catch (err) {
      console.error('Failed to store/update invoice:', err);
    }
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Invoice payment failed:', invoice.id);

  // Find company by customer
  const billing = await prisma.companyBilling.findFirst({
    where: { stripeCustomerId: invoice.customer as string },
  });

  if (billing) {
    await prisma.companyBilling.update({
      where: { id: billing.id },
      data: { status: 'past_due' },
    });
    console.log(`Marked company ${billing.companyId} as past_due due to failed payment`);
  }
}
