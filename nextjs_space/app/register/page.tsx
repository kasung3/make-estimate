'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MarketingNavbar } from '@/components/marketing/navbar';
import { FileText, Loader2, Check, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { metaTrack, metaTrackCustom } from '@/lib/meta-pixel';

const PLANS: Record<string, { name: string; price: string; features: string[]; isFree?: boolean }> = {
  free: {
    name: 'Free Forever',
    price: '$0',
    features: ['Unlimited BOQ creations', '15 items per BOQ', 'PDF exports with watermark'],
    isFree: true,
  },
  starter: {
    name: 'Starter',
    price: '$19/month',
    features: ['5 BOQ creations per month', 'PDF export with themes', 'Custom cover pages'],
  },
  advance: {
    name: 'Advance',
    price: '$39/month',
    features: ['Unlimited BOQ creations', 'PDF export with themes', '10 BOQ templates'],
  },
  business: {
    name: 'Business',
    price: '$49/user/month',
    features: ['Unlimited everything', 'Team collaboration', 'Priority support'],
  },
};

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession() || {};

  const selectedPlan = searchParams?.get('plan') || null;
  const planInfo = selectedPlan ? PLANS[selectedPlan] : null;

  useEffect(() => {
    if (status === 'authenticated') {
      // If authenticated and has a plan selected, go to checkout
      if (selectedPlan) {
        handleCheckout(selectedPlan);
      } else {
        router.replace('/app/dashboard');
      }
    }
  }, [status, selectedPlan]);

  const handleCheckout = async (planKey: string) => {
    setCheckoutLoading(true);
    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Handle Free plan activation (no Stripe redirect needed)
      if (data.freePlanActivated) {
        // Track FreePlanActivated custom event
        metaTrackCustom('FreePlanActivated', { plan_key: 'free' });
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

      // Track InitiateCheckout event
      metaTrack('InitiateCheckout', {
        content_name: planKey,
        currency: 'USD',
        content_category: 'subscription',
      });

      // Open Stripe checkout in new window (required for sandboxed iframes)
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to start checkout. Please try again.');
      setCheckoutLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create account
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          companyName,
          firstName,
          lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Sign in
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Account created but failed to sign in');
        router.replace('/login');
        return;
      }

      // Track successful registration (no PII)
      metaTrack('CompleteRegistration', { method: 'email' });

      toast.success('Account created successfully!');

      // If plan was selected, redirect to checkout
      if (selectedPlan) {
        // Small delay to ensure session is fully established
        setTimeout(() => {
          handleCheckout(selectedPlan);
        }, 500);
      } else {
        router.replace('/pricing?subscription=required');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (status === 'loading' || checkoutLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gradient-hero">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-4" />
        <p className="text-muted-foreground">
          {checkoutLoading ? 'Redirecting to checkout...' : 'Loading...'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <MarketingNavbar />
      
      <div className="pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="w-full max-w-lg space-y-6">
          {/* Selected Plan Summary */}
          {planInfo && (
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-lavender-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Selected Plan: {planInfo.name}</p>
                    <p className="text-sm text-muted-foreground">{planInfo.price}</p>
                  </div>
                </div>
                <div className="mt-3 pl-13">
                  <ul className="space-y-1">
                    {planInfo.features.slice(0, 2).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-purple-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3 pt-3 border-t border-purple-200">
                  <p className="text-xs text-muted-foreground">
                    {planInfo.isFree 
                      ? 'No payment required. Start using MakeEstimate immediately after signup.'
                      : "You'll be taken to secure payment after creating your account."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Registration Form */}
          <Card className="shadow-xl border border-purple-100/50">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold gradient-text">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {selectedPlan
                  ? 'Complete registration to continue to payment'
                  : 'Start creating professional BOQs in minutes'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : selectedPlan ? (
                    'Create Account & Continue to Payment'
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </div>
              {!selectedPlan && (
                <div className="mt-4 text-center">
                  <Link href="/pricing" className="text-sm text-cyan-600 hover:underline">
                    View pricing plans
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-teal-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
