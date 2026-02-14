'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MarketingNavbar } from '@/components/marketing/navbar';
import { MarketingFooter } from '@/components/marketing/footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Check, Sparkles, Loader2, AlertTriangle, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { BillingPlanInfo } from '@/lib/types';
import { metaTrack, metaTrackCustom, acquireEventLock, trackButtonClick, trackFreePlanRegister } from '@/lib/meta-pixel';

type BillingCycle = 'monthly' | 'annual';

// Calculate annual savings
const calculateSavings = (monthlyPrice: number, annualPrice: number): { amount: number; percent: number } => {
  const yearlyIfMonthly = monthlyPrice * 12;
  const amount = yearlyIfMonthly - annualPrice;
  const percent = Math.round((amount / yearlyIfMonthly) * 100);
  return { amount, percent };
};

// Format price from cents to display string
const formatPrice = (cents: number): string => {
  return `$${(cents / 100).toFixed(0)}`;
};

function PricingContent() {
  const { data: session, status } = useSession() || {};
  const searchParams = useSearchParams();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [plans, setPlans] = useState<BillingPlanInfo[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);

  const subscriptionRequired = searchParams?.get('subscription') === 'required';
  const checkoutCanceled = searchParams?.get('checkout') === 'canceled';
  const trialEnded = searchParams?.get('trial') === 'ended';



  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/billing/plans');
        if (response.ok) {
          const data: BillingPlanInfo[] = await response.json();
          setPlans(data);
        }
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Track ViewContent on pricing page (session-level dedupe)
  useEffect(() => {
    if (acquireEventLock('ViewContent:pricing')) {
      metaTrack('ViewContent', { content_name: 'Pricing', content_category: 'pricing' });
    }
  }, []);

  // Show toasts for URL params
  useEffect(() => {
    if (checkoutCanceled) {
      toast.error('Checkout was canceled. Select a plan to continue.');
      window.history.replaceState({}, '', '/pricing');
    }
    if (trialEnded) {
      toast.error('Your trial period has ended. Please select a plan to continue.');
    }
  }, [checkoutCanceled, trialEnded]);

  const handlePlanSelect = async (planKey: string) => {
    // Track which plan button was clicked
    trackButtonClick(`SelectPlan_${planKey}`, 'pricing', { billing_cycle: billingCycle });
    metaTrackCustom('PricingPlanClick', { plan_key: planKey, billing_cycle: billingCycle });

    // If not logged in, go to register with plan and billing cycle
    if (status !== 'authenticated') {
      // Track Lead event for pricing page CTA
      metaTrack('Lead', { content_name: planKey, source: 'pricing' });
      router.push(`/register?plan=${planKey}&interval=${billingCycle}`);
      return;
    }

    // If logged in, start checkout directly
    setCheckoutLoading(planKey);
    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planKey,
          interval: billingCycle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Handle Free plan activation (no Stripe redirect)
      if (data.freePlanActivated) {
        metaTrackCustom('FreePlanActivated', { plan_key: 'free' });
        trackFreePlanRegister('pricing');
        toast.success('Free plan activated! Redirecting...');
        router.push(data.url);
        return;
      }

      // Handle grant-based access (no Stripe redirect)
      if (data.grantCreated) {
        // Track trial activation
        if (data.grantType === 'trial') {
          metaTrack('StartTrial', { 
            content_name: planKey,
            trial_days: data.endsAt ? Math.ceil((new Date(data.endsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0,
          });
        }
        toast.success(data.grantType === 'trial' 
          ? 'Trial activated! Redirecting...'
          : 'Access granted! Redirecting...');
        router.push(data.url);
        return;
      }

      // Validate that we got a valid Stripe URL
      if (!data.url || typeof data.url !== 'string' || !data.url.startsWith('https://')) {
        console.error('Invalid checkout URL received:', data.url);
        throw new Error('Invalid checkout URL received from server');
      }

      // Track InitiateCheckout event with plan details
      const selectedPlanData = plans.find(p => p.planKey === planKey);
      const priceInCents = billingCycle === 'annual' && selectedPlanData?.priceAnnualUsdCents
        ? selectedPlanData.priceAnnualUsdCents
        : selectedPlanData?.priceMonthlyUsdCents || 0;
      metaTrack('InitiateCheckout', {
        content_name: planKey,
        value: priceInCents / 100,
        currency: 'USD',
        content_category: billingCycle,
      });

      // Open Stripe checkout in new window (required for sandboxed iframes)
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to start checkout. Please try again.');
      setCheckoutLoading(null);
    }
  };

  const isLoggedIn = status === 'authenticated';

  // Get current price based on billing cycle
  const getDisplayPrice = (plan: BillingPlanInfo): { price: string; period: string; perUser: boolean; isFree: boolean } => {
    // Free plan special handling
    if (plan.planKey === 'free' || plan.priceMonthlyUsdCents === 0) {
      return {
        price: 'Free',
        period: '',
        perUser: false,
        isFree: true,
      };
    }
    
    const isAnnual = billingCycle === 'annual';
    const priceInCents = isAnnual && plan.priceAnnualUsdCents 
      ? plan.priceAnnualUsdCents 
      : plan.priceMonthlyUsdCents;
    
    const perUser = plan.seatModel === 'per_seat';
    
    return {
      price: formatPrice(priceInCents),
      period: isAnnual ? '/year' : '/month',
      perUser,
      isFree: false,
    };
  };

  // Get savings info for annual billing
  const getSavingsInfo = (plan: BillingPlanInfo): { amount: string; percent: number } | null => {
    // No savings for free plan
    if (plan.planKey === 'free' || plan.priceMonthlyUsdCents === 0) return null;
    if (billingCycle !== 'annual' || !plan.priceAnnualUsdCents) return null;
    const savings = calculateSavings(plan.priceMonthlyUsdCents, plan.priceAnnualUsdCents);
    return {
      amount: formatPrice(savings.amount * 100), // Convert back to cents for formatPrice
      percent: savings.percent,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />

      {/* Header */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan that fits your needs. No hidden fees.
          </motion.p>

          {/* Billing Cycle Toggle */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={cn(
              "text-sm font-medium transition-colors",
              billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'
            )}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === 'annual'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')}
            />
            <span className={cn(
              "text-sm font-medium transition-colors",
              billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'
            )}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <span className="ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                Save up to 15%
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Alert for subscription required / trial ended */}
      {(subscriptionRequired || trialEnded || (isLoggedIn && checkoutCanceled)) && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-4">
          <Alert variant="default" className={cn(
            "border rounded-xl",
            trialEnded ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
          )}>
            {trialEnded ? (
              <Clock className="h-4 w-4 text-red-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            )}
            <AlertDescription className={trialEnded ? "text-red-800" : "text-amber-800"}>
              {trialEnded
                ? 'Your trial period has ended. Please select a plan to continue using MakeEstimate.'
                : subscriptionRequired
                  ? 'Please select a plan to access your dashboard and start creating BOQs.'
                  : 'Your checkout was canceled. Select a plan to continue.'}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {plansLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {plans.map((plan, index) => {
              const displayPrice = getDisplayPrice(plan);
              const savings = getSavingsInfo(plan);
              
              return (
                <motion.div
                  key={plan.planKey}
                  className={cn(
                    'relative p-6 lg:p-8 rounded-2xl border-2 transition-all duration-200 flex flex-col',
                    plan.isMostPopular
                      ? 'border-purple-400 shadow-xl shadow-purple-100 bg-white scale-[1.02]'
                      : 'border-purple-100 shadow-card hover:shadow-card-hover bg-white'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {plan.isMostPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-purple-500 to-lavender-500 text-white text-sm font-medium rounded-full shadow-md">
                        <Sparkles className="w-4 h-4 mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                    
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-4xl lg:text-5xl font-bold text-foreground">
                        {displayPrice.price}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {displayPrice.period}
                        {displayPrice.perUser && (
                          <span className="text-xs block text-purple-600 font-medium">per user</span>
                        )}
                      </span>
                    </div>

                    {/* Savings Badge */}
                    {savings && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                          Save {savings.amount} ({savings.percent}% off)
                        </span>
                      </div>
                    )}

                    {/* Plan Description */}
                    <p className="mt-4 text-sm text-muted-foreground">
                      {plan.boqLimitPerPeriod 
                        ? `Up to ${plan.boqLimitPerPeriod} BOQ creations per period`
                        : 'Unlimited BOQ creations'}
                      {plan.seatModel === 'per_seat' && (
                        <span className="block mt-1 text-purple-600 font-medium">
                          <Users className="w-3 h-3 inline mr-1" />
                          Team billing: per active member
                        </span>
                      )}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Button
                      className={cn(
                        'w-full py-5',
                        plan.isMostPopular
                          ? ''
                          : ''
                      )}
                      variant={plan.isMostPopular ? 'default' : 'outline'}
                      onClick={() => handlePlanSelect(plan.planKey)}
                      disabled={checkoutLoading === plan.planKey}
                    >
                      {checkoutLoading === plan.planKey ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : displayPrice.isFree ? (
                        isLoggedIn ? 'Start Free' : 'Get Started Free'
                      ) : isLoggedIn ? (
                        'Continue to Checkout'
                      ) : (
                        'Get Started'
                      )}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          </>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Compare Plans</h2>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-card">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="px-3 lg:px-4 py-4 text-left text-sm font-semibold text-foreground">
                        Feature
                      </th>
                      <th className="px-3 lg:px-4 py-4 text-center text-sm font-semibold text-emerald-600">
                        Free
                      </th>
                      <th className="px-3 lg:px-4 py-4 text-center text-sm font-semibold text-foreground">
                        Starter
                      </th>
                      <th className="px-3 lg:px-4 py-4 text-center text-sm font-semibold text-purple-600">
                        Advance
                      </th>
                      <th className="px-3 lg:px-4 py-4 text-center text-sm font-semibold text-foreground">
                        Business
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    <tr>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground">BOQ Creations</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">Unlimited</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">5 / period</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-foreground text-center font-medium">Unlimited</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground">Items per BOQ</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">15</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">Unlimited</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-foreground text-center font-medium">Unlimited</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground">Team Members</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">1</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">1</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-foreground text-center font-medium">1</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground">BOQ Templates</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">1</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">2</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-foreground text-center font-medium">10</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground">Cover Templates</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">1</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">2</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-foreground text-center font-medium">10</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground">Upload Own Logo</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">—</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-purple-500 text-center">✓</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-purple-500 text-center font-medium">✓</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-purple-500 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground">Team Collaboration</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">—</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">—</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center font-medium">—</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-purple-500 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground">PDF Export</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-amber-600 text-center">With watermark</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-purple-500 text-center">✓</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-purple-500 text-center font-medium">✓</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-purple-500 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground">Priority Support</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">—</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-muted-foreground text-center">—</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-purple-500 text-center font-medium">✓</td>
                      <td className="px-3 lg:px-4 py-4 text-sm text-purple-500 text-center">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            Start with a plan and upgrade anytime. Your BOQs are always accessible.
          </p>
          <div className="mt-6">
            <Link href="/register">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}
