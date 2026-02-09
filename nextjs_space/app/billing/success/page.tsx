'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CheckCircle2, Loader2, AlertCircle, ArrowRight, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

interface CheckoutSessionData {
  sessionId: string;
  status: string;
  paymentStatus: string;
  subscriptionStatus: string | null;
  planKey: string | null;
  interval: string | null;
  amount: number;
  currency: string;
  customerEmail: string | null;
}

interface BillingStatus {
  status: string;
  planKey: string | null;
  hasActiveSubscription: boolean;
  hasTrialGrant: boolean;
  hasAdminGrant: boolean;
}

type PageState = 'verifying' | 'activating' | 'success' | 'error';

export default function BillingSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status: sessionStatus } = useSession() || {};
  const sessionId = searchParams.get('session_id');

  const [pageState, setPageState] = useState<PageState>('verifying');
  const [checkoutData, setCheckoutData] = useState<CheckoutSessionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const maxPolls = 15; // 30 seconds max (2s interval)

  // Verify checkout session
  const verifySession = useCallback(async () => {
    if (!sessionId) {
      setError('No checkout session ID provided. Please return to pricing and try again.');
      setPageState('error');
      return;
    }

    try {
      const res = await fetch(`/api/stripe/checkout-session?session_id=${encodeURIComponent(sessionId)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to verify checkout session');
        setPageState('error');
        return;
      }

      setCheckoutData(data);
      setPageState('activating');
    } catch (err) {
      console.error('Session verification error:', err);
      setError('Failed to verify your payment. Please check your billing status.');
      setPageState('error');
    }
  }, [sessionId]);

  // Poll billing status
  const pollBillingStatus = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/billing/status');
      const data: BillingStatus = await res.json();

      if (!res.ok) {
        return false;
      }

      // Check if subscription is now active
      const isActive = 
        data.status === 'active' || 
        data.status === 'trialing' ||
        data.hasActiveSubscription;

      if (isActive) {
        return true;
      }

      return false;
    } catch (err) {
      console.error('Billing status poll error:', err);
      return false;
    }
  }, []);

  // Start polling when in activating state
  useEffect(() => {
    if (pageState !== 'activating') return;

    const poll = async () => {
      const isActive = await pollBillingStatus();
      
      if (isActive) {
        // Clear interval and redirect
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
        setPageState('success');
        toast.success('Subscription activated successfully!');
        
        // Short delay before redirect for user to see success state
        setTimeout(() => {
          router.push('/app/dashboard');
        }, 1500);
        return;
      }

      setPollCount(prev => {
        const newCount = prev + 1;
        if (newCount >= maxPolls) {
          // Max polls reached, still redirect but with message
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
          }
          setPageState('success');
          toast.success('Payment received! Your subscription will be active shortly.');
          setTimeout(() => {
            router.push('/app/dashboard');
          }, 2000);
        }
        return newCount;
      });
    };

    // Initial poll
    poll();

    // Set up interval
    pollIntervalRef.current = setInterval(poll, 2000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [pageState, pollBillingStatus, router]);

  // Verify session on mount
  useEffect(() => {
    if (sessionStatus === 'loading') return;
    
    if (sessionStatus === 'unauthenticated') {
      router.push('/login?callbackUrl=/billing/success');
      return;
    }

    verifySession();
  }, [sessionStatus, verifySession, router]);

  // Render based on state
  const renderContent = () => {
    if (sessionStatus === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      );
    }

    switch (pageState) {
      case 'verifying':
        return (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
            <p className="text-lg font-medium">Verifying your payment...</p>
            <p className="text-sm text-muted-foreground">Please wait while we confirm your transaction.</p>
          </div>
        );

      case 'activating':
        return (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <div className="relative">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <Loader2 className="w-6 h-6 animate-spin text-purple-500 absolute -bottom-1 -right-1" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-green-600">Payment received!</p>
              <p className="text-muted-foreground mt-1">Activating your subscription...</p>
            </div>
            {checkoutData?.planKey && (
              <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-sm text-purple-700">
                  <span className="font-medium">Plan:</span> {checkoutData.planKey.charAt(0).toUpperCase() + checkoutData.planKey.slice(1)}
                  {checkoutData.interval && ` (${checkoutData.interval === 'year' ? 'Annual' : 'Monthly'})`}
                </p>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <RefreshCcw className="w-3 h-3 animate-spin" />
              <span>Checking status... ({pollCount}/{maxPolls})</span>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-green-600">Subscription Active!</p>
              <p className="text-muted-foreground mt-1">Redirecting to dashboard...</p>
            </div>
            <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
          </div>
        );

      case 'error':
        return (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-red-600">Something went wrong</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">{error}</p>
            </div>
            <div className="flex gap-3 mt-4">
              <Link href="/pricing">
                <Button variant="outline">
                  View Pricing
                </Button>
              </Link>
              <Link href="/app/settings">
                <Button>
                  Check Billing Status
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border border-purple-100/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold gradient-text">Payment Status</CardTitle>
          <CardDescription>
            {pageState === 'error' 
              ? 'There was an issue with your payment'
              : 'Processing your subscription'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}
