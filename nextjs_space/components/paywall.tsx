'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  Check,
  Loader2,
  Sparkles,
  Lock,
  Tag,
  AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface PaywallProps {
  title?: string;
  description?: string;
  showLimitReached?: boolean;
  boqsUsed?: number;
  boqLimit?: number;
}

export function Paywall({
  title = 'Subscription Required',
  description = 'Subscribe to a plan to access this feature',
  showLimitReached = false,
  boqsUsed = 0,
  boqLimit = 10,
}: PaywallProps) {
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoValidating, setPromoValidating] = useState(false);
  const [promoResult, setPromoResult] = useState<{ valid: boolean; message: string } | null>(null);

  const handleCheckout = async (planKey: string) => {
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

      // Use top window for redirect (required for Stripe in iframes)
      (window.top || window).location.href = data.url;
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

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <Card className="max-w-3xl w-full shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mb-4">
            {showLimitReached ? (
              <AlertTriangle className="w-8 h-8 text-white" />
            ) : (
              <Lock className="w-8 h-8 text-white" />
            )}
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">
            {showLimitReached
              ? `You've used ${boqsUsed} of ${boqLimit} BOQs this month. Upgrade to continue creating BOQs.`
              : description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {/* Promo Code */}
          <div className="space-y-2 max-w-md mx-auto">
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
              <p
                className={`text-sm ${promoResult.valid ? 'text-emerald-600' : 'text-red-600'}`}
              >
                {promoResult.message}
              </p>
            )}
          </div>

          {/* Plan Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Starter Plan */}
            <div className="relative rounded-xl border-2 border-gray-200 p-6 hover:border-primary/50 transition-all">
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
              </ul>
              <Button
                className="w-full mt-6"
                variant="outline"
                onClick={() => handleCheckout('starter')}
                disabled={checkoutLoading === 'starter'}
              >
                {checkoutLoading === 'starter' && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                Get Started
              </Button>
            </div>

            {/* Business Plan */}
            <div className="relative rounded-xl border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 p-6">
              <Badge className="absolute -top-3 left-4 bg-primary">Recommended</Badge>
              <h3 className="text-xl font-bold">Business</h3>
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
                  PDF export with themes
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Custom cover pages
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Priority support
                </li>
              </ul>
              <Button
                className="w-full mt-6"
                onClick={() => handleCheckout('business')}
                disabled={checkoutLoading === 'business'}
              >
                {checkoutLoading === 'business' && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                Get Business
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
