'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MarketingNavbar } from '@/components/marketing/navbar';
import { MarketingFooter } from '@/components/marketing/footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, Sparkles, Loader2, Tag, AlertTriangle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { BillingPlanInfo } from '@/lib/types';

interface PlanDisplay {
  key: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  boqLimit: number | null;
}

// Helper to get default features for a plan
const getDefaultFeatures = (plan: BillingPlanInfo): string[] => {
  const baseFeatures = [
    'Unlimited editing & viewing',
    'PDF export with cover page',
    'Customer management',
    'Custom themes & templates',
    'Notes & specifications',
  ];
  
  if (plan.boqLimitPerPeriod) {
    return [`${plan.boqLimitPerPeriod} BOQ creations per month`, ...baseFeatures];
  }
  return ['Unlimited BOQ creations', ...baseFeatures, 'Priority support'];
};

// Fallback plans if API fails
const getFallbackPlans = (): PlanDisplay[] => [
  {
    key: 'starter',
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'Up to 10 BOQ creations per month',
    features: [
      '10 BOQ creations per month',
      'Unlimited editing & viewing',
      'PDF export with cover page',
      'Customer management',
      'Custom themes & templates',
    ],
    popular: false,
    boqLimit: 10,
  },
  {
    key: 'business',
    name: 'Business',
    price: '$39',
    period: '/month',
    description: 'Unlimited BOQ creations',
    features: [
      'Unlimited BOQ creations',
      'Unlimited editing & viewing',
      'PDF export with cover page',
      'Customer management',
      'Custom themes & templates',
      'Priority support',
    ],
    popular: true,
    boqLimit: null,
  },
];

// Fallback comparison features (dynamically built from plans if available)
const getComparisonFeatures = (plans: PlanDisplay[]) => {
  const starter = plans.find(p => p.key === 'starter');
  const business = plans.find(p => p.key === 'business');
  
  return [
    { 
      name: 'BOQ Creations', 
      starter: starter?.boqLimit ? `${starter.boqLimit} / month` : 'Limited',
      business: business?.boqLimit ? `${business.boqLimit} / month` : 'Unlimited'
    },
    { name: 'Editing & Viewing', starter: 'Unlimited', business: 'Unlimited' },
    { name: 'PDF Export', starter: '✓', business: '✓' },
    { name: 'Custom Cover Page', starter: '✓', business: '✓' },
    { name: 'Color Themes', starter: '✓', business: '✓' },
    { name: 'Customer Management', starter: '✓', business: '✓' },
    { name: 'Notes & Specifications', starter: '✓', business: '✓' },
    { name: 'Team Members', starter: 'Unlimited', business: 'Unlimited' },
    { name: 'Priority Support', starter: '—', business: '✓' },
  ];
};

function PricingContent() {
  const { data: session, status } = useSession() || {};
  const searchParams = useSearchParams();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoValidating, setPromoValidating] = useState(false);
  const [promoResult, setPromoResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [plans, setPlans] = useState<PlanDisplay[]>([]);
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
          
          // Convert to display format
          const displayPlans: PlanDisplay[] = data.map((plan) => ({
            key: plan.planKey,
            name: plan.name,
            price: `$${(plan.priceMonthlyUsdCents / 100).toFixed(0)}`,
            period: `/${plan.interval}`,
            description: plan.boqLimitPerPeriod 
              ? `Up to ${plan.boqLimitPerPeriod} BOQ creations per month`
              : 'Unlimited BOQ creations',
            features: plan.features.length > 0 ? plan.features : getDefaultFeatures(plan),
            popular: plan.badgeText !== null || plan.planKey === 'business',
            boqLimit: plan.boqLimitPerPeriod,
          }));
          
          setPlans(displayPlans);
        }
      } catch (error) {
        console.error('Failed to fetch plans:', error);
        // Set fallback plans
        setPlans(getFallbackPlans());
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
    // If not logged in, go to register with plan
    if (status !== 'authenticated') {
      router.push(`/register?plan=${planKey}`);
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
          promoCode: promoCode || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
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

  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoResult(null);
      return;
    }

    setPromoValidating(true);
    try {
      const response = await fetch('/api/billing/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode }),
      });

      const data = await response.json();
      setPromoResult({
        valid: response.ok,
        message: data.message || (response.ok ? 'Valid promo code!' : 'Invalid promo code'),
      });
    } catch (error) {
      setPromoResult({ valid: false, message: 'Failed to validate promo code' });
    } finally {
      setPromoValidating(false);
    }
  };

  const isLoggedIn = status === 'authenticated';

  return (
    <div className="min-h-screen bg-white">
      <MarketingNavbar />

      {/* Header */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
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
        </div>
      </section>

      {/* Alert for subscription required / trial ended */}
      {(subscriptionRequired || trialEnded || (isLoggedIn && checkoutCanceled)) && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-4">
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

      {/* Promo Code Section (only for logged in users) */}
      {isLoggedIn && (
        <section className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="promoCode" className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Have a promo code?
              </Label>
              <div className="flex gap-2">
                <Input
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase());
                    setPromoResult(null);
                  }}
                  placeholder="Enter promo code"
                  className="uppercase"
                />
                <Button
                  variant="outline"
                  onClick={validatePromoCode}
                  disabled={promoValidating || !promoCode.trim()}
                >
                  {promoValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                </Button>
              </div>
              {promoResult && (
                <p className={`text-sm ${promoResult.valid ? 'text-emerald-600' : 'text-red-600'}`}>
                  {promoResult.message}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-5xl mx-auto">
          {plansLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.key}
                className={cn(
                  'relative p-8 rounded-2xl border-2 transition-shadow',
                  plan.popular
                    ? 'border-cyan-500 shadow-xl bg-white'
                    : 'border-gray-200 shadow-sm bg-white hover:shadow-md'
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.popular && (
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
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <p className="mt-4 text-gray-600">{plan.description}</p>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    className={cn(
                      'w-full py-6',
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600'
                        : ''
                    )}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handlePlanSelect(plan.key)}
                    disabled={checkoutLoading === plan.key}
                  >
                    {checkoutLoading === plan.key ? (
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
            ))}
          </div>

          {/* Coupon Note for logged out users */}
          {!isLoggedIn && (
            <motion.p
              className="mt-8 text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Have a coupon? You can apply it at checkout.
            </motion.p>
          )}
          </>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Compare Plans</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Starter
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-cyan-600">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getComparisonFeatures(plans).map((feature) => (
                  <tr key={feature.name}>
                    <td className="px-6 py-4 text-sm text-gray-700">{feature.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                      {feature.starter}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center font-medium">
                      {feature.business}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
