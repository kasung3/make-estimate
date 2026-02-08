'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { MarketingNavbar } from '@/components/marketing/navbar';
import { MarketingFooter } from '@/components/marketing/footer';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const plans = [
  {
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
    cta: 'Get Started',
    popular: false,
  },
  {
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
    cta: 'Get Started',
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

export default function PricingPage() {
  const { data: session } = useSession() || {};

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

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
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
                  {session ? (
                    <Link href="/app/settings?tab=billing">
                      <Button
                        className={cn(
                          'w-full py-6',
                          plan.popular
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600'
                            : ''
                        )}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        Choose Plan
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/register">
                      <Button
                        className={cn(
                          'w-full py-6',
                          plan.popular
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600'
                            : ''
                        )}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coupon Note */}
          <motion.p
            className="mt-8 text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Have a coupon? You can apply it at checkout.
          </motion.p>
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
