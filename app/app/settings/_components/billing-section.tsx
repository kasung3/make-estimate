'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  Check,
  Loader2,
  Sparkles,
  Building2,
  AlertCircle,
  ExternalLink,
  Tag,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BillingStatus, PlanInfo } from '@/lib/types';
import { format } from 'date-fns';

interface BillingSectionProps {
  isAdmin: boolean;
}

const PLANS: Record<string, PlanInfo> = {
  starter: {
    key: 'starter',
    name: 'Starter',
    priceId: '',
    price: 19,
    boqLimit: 10,
    description: '10 BOQ creations per month',
  },
  advance: {
    key: 'advance',
    name: 'Advance',
    priceId: '',
    price: 39,
    boqLimit: null,
    description: 'Unlimited BOQ creations',
  },
  business: {
    key: 'business',
    name: 'Business',
    priceId: '',
    price: 49,
    boqLimit: null,
    description: 'Unlimited BOQ creations, team features',
  },
};

export function BillingSection({ isAdmin }: BillingSectionProps) {
  const [billingStatus, setBillingStatus] = useState<BillingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoValidating, setPromoValidating] = useState(false);
  const [promoResult, setPromoResult] = useState<{ valid: boolean; message: string } | null>(null);

  useEffect(() => {
    fetchBillingStatus();
  }, []);

  const fetchBillingStatus = async () => {
    try {
      const response = await fetch('/api/billing/status');
      if (response.ok) {
        const data = await response.json();
        setBillingStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch billing status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (planKey: string) => {
    if (!isAdmin) {
      toast.error('Only company admins can manage billing');
      return;
    }

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

      // Open Stripe checkout in new window (required for sandboxed iframes)
      window.open(data.url, '_blank');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to start checkout');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageBilling = async () => {
    if (!isAdmin) {
      toast.error('Only company admins can manage billing');
      return;
    }

    setPortalLoading(true);
    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open billing portal');
      }

      // Open Stripe portal in new window (required for sandboxed iframes)
      window.open(data.url, '_blank');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to open billing portal');
    } finally {
      setPortalLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const hasActiveSubscription = billingStatus?.hasActiveSubscription;
  const currentPlan = billingStatus?.planKey ? PLANS[billingStatus.planKey] : null;

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      {hasActiveSubscription && currentPlan && (
        <Card className="shadow-md border-0 bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Current Subscription</CardTitle>
                  <CardDescription>Your active plan details</CardDescription>
                </div>
              </div>
              <Badge
                variant={billingStatus?.status === 'active' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {billingStatus?.status === 'trialing' ? 'Trial' : billingStatus?.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Plan</p>
                <p className="text-lg font-semibold">{currentPlan.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg font-semibold">${currentPlan.price}/month</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">BOQs This Period</p>
                <p className="text-lg font-semibold">
                  {billingStatus?.boqsUsedThisPeriod ?? 0}
                  {billingStatus?.boqLimit ? ` / ${billingStatus.boqLimit}` : ' (unlimited)'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Renews On</p>
                <p className="text-lg font-semibold">
                  {billingStatus?.currentPeriodEnd
                    ? format(new Date(billingStatus.currentPeriodEnd), 'MMM d, yyyy')
                    : '-'}
                </p>
              </div>
            </div>

            {billingStatus?.cancelAtPeriodEnd && (
              <div className="flex items-center gap-2 p-3 bg-amber-100 text-amber-800 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>Your subscription will cancel at the end of this billing period</span>
              </div>
            )}

            {isAdmin && (
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleManageBilling}
                  disabled={portalLoading}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {portalLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                  Manage Billing
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Plan Selection - Show if no active subscription OR for upgrades */}
      {(!hasActiveSubscription || (currentPlan?.key === 'starter') || (currentPlan?.key === 'advance')) && (
        <Card className="shadow-md border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">
                  {hasActiveSubscription ? 'Upgrade Your Plan' : 'Choose a Plan'}
                </CardTitle>
                <CardDescription>
                  {hasActiveSubscription
                    ? 'Get unlimited BOQ creations'
                    : 'Subscribe to start creating BOQs'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Promo Code Input */}
            <div className="space-y-2">
              <Label htmlFor="promoCode" className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Promo Code (Optional)
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
                <p
                  className={`text-sm ${promoResult.valid ? 'text-emerald-600' : 'text-red-600'}`}
                >
                  {promoResult.message}
                </p>
              )}
            </div>

            {/* Plan Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Starter Plan */}
              <div
                className={`relative rounded-xl border-2 p-6 transition-all ${
                  currentPlan?.key === 'starter'
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                {currentPlan?.key === 'starter' && (
                  <Badge className="absolute -top-3 left-4 bg-emerald-500">Current Plan</Badge>
                )}
                <h3 className="text-xl font-bold">Starter</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$19</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    10 BOQ creations per month
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    PDF export with themes
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Custom cover pages
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Customer management
                  </li>
                </ul>
                {currentPlan?.key !== 'starter' && isAdmin && (
                  <Button
                    className="w-full mt-6"
                    variant="outline"
                    onClick={() => handleCheckout('starter')}
                    disabled={checkoutLoading === 'starter'}
                  >
                    {checkoutLoading === 'starter' ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {hasActiveSubscription ? 'Switch to Starter' : 'Get Started'}
                  </Button>
                )}
              </div>

              {/* Advance Plan */}
              <div
                className={`relative rounded-xl border-2 p-6 transition-all ${
                  currentPlan?.key === 'advance'
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-primary bg-gradient-to-br from-primary/5 to-primary/10'
                }`}
              >
                {currentPlan?.key === 'advance' && (
                  <Badge className="absolute -top-3 left-4 bg-emerald-500">Current Plan</Badge>
                )}
                {currentPlan?.key !== 'advance' && currentPlan?.key !== 'business' && (
                  <Badge className="absolute -top-3 left-4 bg-primary">Recommended</Badge>
                )}
                <h3 className="text-xl font-bold">Advance</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$39</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <strong>Unlimited</strong> BOQ creations
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    10 BOQ themes
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Unlimited BOQ presets
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    10 cover page templates
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Priority support
                  </li>
                </ul>
                {currentPlan?.key !== 'advance' && isAdmin && (
                  <Button
                    className="w-full mt-6"
                    onClick={() => handleCheckout('advance')}
                    disabled={checkoutLoading === 'advance'}
                  >
                    {checkoutLoading === 'advance' ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Upgrade to Advance
                  </Button>
                )}
              </div>

              {/* Business Plan */}
              <div
                className={`relative rounded-xl border-2 p-6 transition-all ${
                  currentPlan?.key === 'business'
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                {currentPlan?.key === 'business' && (
                  <Badge className="absolute -top-3 left-4 bg-emerald-500">Current Plan</Badge>
                )}
                <h3 className="text-xl font-bold">Business</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <strong>Unlimited</strong> BOQ creations
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Unlimited BOQ themes
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Unlimited BOQ presets
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Unlimited cover templates
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Team collaboration
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Priority support
                  </li>
                </ul>
                {currentPlan?.key !== 'business' && isAdmin && (
                  <Button
                    className="w-full mt-6"
                    onClick={() => handleCheckout('business')}
                    disabled={checkoutLoading === 'business'}
                  >
                    {checkoutLoading === 'business' ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Upgrade to Business
                  </Button>
                )}
              </div>
            </div>

            {!isAdmin && (
              <p className="text-sm text-gray-500 text-center">
                Contact your company admin to manage billing.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
