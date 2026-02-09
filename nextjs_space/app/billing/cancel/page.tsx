'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { XCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketingNavbar } from '@/components/marketing/navbar';

export default function BillingCancelPage() {
  const { data: session } = useSession() || {};
  const isLoggedIn = !!session?.user;

  return (
    <div className="min-h-screen gradient-hero">
      <MarketingNavbar />
      
      <div className="flex items-center justify-center p-4 pt-24">
        <Card className="w-full max-w-md shadow-xl border border-purple-100/50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Checkout Cancelled</CardTitle>
            <CardDescription>
              Your payment was not completed. No charges have been made.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-800">
                If you experienced any issues during checkout, please try again or contact support.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/pricing" className="w-full">
                <Button className="w-full" size="lg">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              
              {isLoggedIn ? (
                <Link href="/app/dashboard" className="w-full">
                  <Button variant="outline" className="w-full" size="lg">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/" className="w-full">
                  <Button variant="outline" className="w-full" size="lg">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              )}
            </div>

            <p className="text-xs text-center text-muted-foreground pt-4">
              Questions? Email us at{' '}
              <a href="mailto:support@makeestimate.com" className="text-purple-600 hover:underline">
                support@makeestimate.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
