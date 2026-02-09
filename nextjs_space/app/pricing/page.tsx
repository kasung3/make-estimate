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
    // If not logged in, go to register with plan and billing cycle
    if (status !== 'authenticated') {
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

      // Handle grant-based access (no Stripe redirect)
      if (data.grantCreated) {
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
  const getDisplayPrice = (plan: BillingPlanInfo): { price: string; period: string; perUser: boolean } => {
    const isAnnual = billingCycle === 'annual';
    const priceInCents = isAnnual && plan.priceAnnualUsdCents 
      ? plan.priceAnnualUsdCents 
      : plan.priceMonthlyUsdCents;
    
    const perUser = plan.seatModel === 'per_seat';
    
    return {
      price: formatPrice(priceInCents),
      period: isAnnual ? '/year' : '/month',
      perUser,
    };
  };

  // Get savings info for annual billing
  const getSavingsInfo = (plan: BillingPlanInfo): { amount: string; percent: number } | null => {
    if (billingCycle !== 'annual' || !plan.priceAnnualUsdCents) return null;
    const savings = calculateSavings(plan.priceMonthlyUsdCents, plan.priceAnnualUsdCents);
    return {
      amount: formatPrice(savings.amount * 100), // Convert back to cents for formatPrice
      percent: savings.percent,
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <MarketingNavbar />

      {/* Header */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-gray-600"
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
              billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'
            )}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === 'annual'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')}
            />
            <span className={cn(
              "text-sm font-medium transition-colors",
              billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'
            )}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
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
            "border",
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
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => {
              const displayPrice = getDisplayPrice(plan);
              const savings = getSavingsInfo(plan);
              
              return (
                <motion.div
                  key={plan.planKey}
                  className={cn(
                    'relative p-6 lg:p-8 rounded-2xl border-2 transition-shadow flex flex-col',
                    plan.isMostPopular
                      ? 'border-cyan-500 shadow-xl bg-white scale-[1.02]'
                      : 'border-gray-200 shadow-sm bg-white hover:shadow-md'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {plan.isMostPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-medium rounded-full shadow-md">
                        <Sparkles className="w-4 h-4 mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                    
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                        {displayPrice.price}
                      </span>
                      <span className="text-gray-500 ml-1">
                        {displayPrice.period}
                        {displayPrice.perUser && (
                          <span className="text-xs block text-cyan-600 font-medium">per user</span>
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
                    <p className="mt-4 text-sm text-gray-600">
                      {plan.boqLimitPerPeriod 
                        ? `Up to ${plan.boqLimitPerPeriod} BOQ creations per period`
                        : 'Unlimited BOQ creations'}
                      {plan.seatModel === 'per_seat' && (
                        <span className="block mt-1 text-cyan-600 font-medium">
                          <Users className="w-3 h-3 inline mr-1" />
                          Team billing: per active member
                        </span>
                      )}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Button
                      className={cn(
                        'w-full py-5',
                        plan.isMostPopular
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600'
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Compare Plans</h2>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Feature
                      </th>
                      <th className="px-4 lg:px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        Starter
                      </th>
                      <th className="px-4 lg:px-6 py-4 text-center text-sm font-semibold text-cyan-600">
                        Advance
                      </th>
                      <th className="px-4 lg:px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        Business
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">BOQ Creations</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">5 / period</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 text-center font-medium">Unlimited</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">Team Members</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">1</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 text-center font-medium">1</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">BOQ Templates</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">2</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 text-center font-medium">10</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">Cover Templates</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">2</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 text-center font-medium">10</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">Upload Own Logo</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">✓</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 text-center font-medium">✓</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">Team Collaboration</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">—</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 text-center font-medium">—</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">PDF Export</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">✓</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 text-center font-medium">✓</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">Priority Support</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">—</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 text-center font-medium">✓</td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-gray-600 text-center">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">Still have questions?</h2>
          <p className="mt-2 text-gray-600">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-teal-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}
