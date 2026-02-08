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
import { Check, Sparkles, Loader2, Tag, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const plans = [
  {
    key: 'starter',
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'Perfect for freelancers and small teams getting started.',
    features: [
      '10 BOQ creations per month',
      'Unlimited editing & viewing',
      'PDF export with cover page',
      'Customer management',
      'Custom themes & templates',
      'Notes & specifications',
    ],
    popular: false,
  },
  {
    key: 'business',
    name: 'Business',
    price: '$39',
    period: '/month',
    description: 'For growing teams that need unlimited capacity.',
    features: [
      'Unlimited BOQ creations',
      'Unlimited editing & viewing',
      'PDF export with cover page',
      'Customer management',
      'Custom themes & templates',
      'Notes & specifications',
      'Priority support',
    ],
    popular: true,
  },
];

const comparisonFeatures = [
  { name: 'BOQ Creations', starter: '10 / month', business: 'Unlimited' },
  { name: 'Editing & Viewing', starter: 'Unlimited', business: 'Unlimited' },
  { name: 'PDF Export', starter: '✓', business: '✓' },
  { name: 'Custom Cover Page', starter: '✓', business: '✓' },
  { name: 'Color Themes', starter: '✓', business: '✓' },
  { name: 'Customer Management', starter: '✓', business: '✓' },
  { name: 'Notes & Specifications', starter: '✓', business: '✓' },
  { name: 'Team Members', starter: 'Unlimited', business: 'Unlimited' },
  { name: 'Priority Support', starter: '—', business: '✓' },
];

function PricingContent() {
  const { data: session, status } = useSession() || {};
  const searchParams = useSearchParams();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoValidating, setPromoValidating] = useState(false);
  const [promoResult, setPromoResult] = useState<{ valid: boolean; message: string } | null>(null);

  const subscriptionRequired = searchParams?.get('subscription') === 'required';
  const checkoutCanceled = searchParams?.get('checkout') === 'canceled';

  // Show toasts for URL params
  useEffect(() => {
    if (checkoutCanceled) {
      toast.error('Checkout was canceled. Select a plan to continue.');
      // Clear the URL parameter
      window.history.replaceState({}, '', '/pricing');
    }
  }, [checkoutCanceled]);

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

      // Redirect to Stripe checkout
      window.location.href = data.url;
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

      {/* Alert for subscription required */}
      {(subscriptionRequired || (isLoggedIn && checkoutCanceled)) && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-4">
          <Alert variant="default" className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              {subscriptionRequired
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
                {comparisonFeatures.map((feature) => (
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
