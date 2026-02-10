'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  CreditCard,
  Loader2,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Calendar,
  Users,
  Receipt,
  Download,
  RefreshCw,
  XCircle,
  CheckCircle2,
  Shield,
  Clock,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import Link from 'next/link';

interface BillingSectionProps {
  isAdmin: boolean;
}

interface InvoiceInfo {
  id: string;
  stripeInvoiceId: string;
  number: string | null;
  amountPaid: number;
  currency: string;
  status: string;
  paidAt: string | null;
  hostedInvoiceUrl: string | null;
  pdfUrl: string | null;
  periodStart: string | null;
  periodEnd: string | null;
}

interface BillingSummary {
  isAdmin: boolean;
  planKey: string | null;
  planName: string;
  planInfo: {
    planKey: string;
    name: string;
    priceMonthlyUsdCents: number;
    priceAnnualUsdCents: number | null;
    seatModel: string;
    boqLimitPerPeriod: number | null;
    maxActiveMembers: number | null;
    features: string[];
  } | null;
  status: string | null;
  billingInterval: string;
  hasActiveSubscription: boolean;
  hasAdminGrant: boolean;
  hasTrialGrant: boolean;
  accessSource: string | null;
  activeGrant: {
    id: string;
    grantType: string;
    planKey: string | null;
    startsAt: string;
    endsAt: string | null;
    notes: string | null;
  } | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  boqsUsedThisPeriod: number;
  boqLimit: number | null;
  canCreateBoq: boolean;
  seatModel: string;
  seatQuantity: number;
  activeMemberCount: number;
  maxActiveMembers: number | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  invoices: InvoiceInfo[];
}

export function BillingSection({ isAdmin }: BillingSectionProps) {
  const [summary, setSummary] = useState<BillingSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    fetchBillingSummary();
  }, []);

  const fetchBillingSummary = async () => {
    try {
      const response = await fetch('/api/billing/summary');
      if (response.ok) {
        const data = await response.json();
        setSummary(data);
      }
    } catch (error) {
      console.error('Failed to fetch billing summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    if (!isAdmin) {
      toast.error('Only company admins can manage billing');
      return;
    }

    setPortalLoading(true);
    try {
      const response = await fetch('/api/billing/portal', { method: 'POST' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open billing portal');
      }

      window.open(data.url, '_blank');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to open billing portal');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelLoading(true);
    try {
      const response = await fetch('/api/billing/cancel-at-period-end', { method: 'POST' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      toast.success('Subscription will cancel at the end of the billing period');
      setShowCancelDialog(false);
      fetchBillingSummary();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to cancel subscription');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleResumeSubscription = async () => {
    setResumeLoading(true);
    try {
      const response = await fetch('/api/billing/resume', { method: 'POST' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resume subscription');
      }

      toast.success('Subscription auto-renew has been resumed');
      fetchBillingSummary();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to resume subscription');
    } finally {
      setResumeLoading(false);
    }
  };

  const formatCurrency = (cents: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>;
      case 'trialing':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Trial</Badge>;
      case 'past_due':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Past Due</Badge>;
      case 'canceled':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Canceled</Badge>;
      default:
        return <Badge variant="secondary">{status || 'Unknown'}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!summary) {
    return (
      <Card className="shadow-md border-0">
        <CardContent className="py-12 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Unable to load billing information</p>
          <Button onClick={fetchBillingSummary} variant="outline" className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Non-admin view
  if (!isAdmin) {
    return (
      <Card className="shadow-md border-0">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-lavender-400 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Billing</CardTitle>
              <CardDescription>Your company subscription</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
            <Shield className="w-8 h-8 text-purple-500" />
            <div>
              <p className="font-medium text-purple-900">Current Plan: {summary.planName}</p>
              <p className="text-sm text-purple-600">
                {summary.boqLimit
                  ? `${summary.boqsUsedThisPeriod} of ${summary.boqLimit} BOQs used this period`
                  : 'Unlimited BOQs'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-600">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">Contact your company admin to manage billing settings.</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Admin view
  const hasStripeSubscription = !!summary.stripeSubscriptionId;
  const isOnFreePlan = summary.planKey === 'free' || !summary.planKey;
  const hasGrant = summary.hasAdminGrant || summary.hasTrialGrant;

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <Card className="shadow-md border-0 bg-gradient-to-br from-purple-50 to-lavender-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Current Plan</CardTitle>
                <CardDescription>Your subscription details</CardDescription>
              </div>
            </div>
            {getStatusBadge(summary.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-white/70 rounded-xl">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Plan</p>
              <p className="text-lg font-semibold text-gray-900">{summary.planName}</p>
              {summary.billingInterval && summary.planInfo && summary.planInfo.priceMonthlyUsdCents > 0 && (
                <p className="text-sm text-gray-500 capitalize">{summary.billingInterval}ly</p>
              )}
            </div>

            <div className="p-3 bg-white/70 rounded-xl">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
              {summary.planInfo && summary.planInfo.priceMonthlyUsdCents > 0 ? (
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(
                    summary.billingInterval === 'year' && summary.planInfo.priceAnnualUsdCents
                      ? summary.planInfo.priceAnnualUsdCents
                      : summary.planInfo.priceMonthlyUsdCents
                  )}
                  <span className="text-sm font-normal text-gray-500">/{summary.billingInterval === 'year' ? 'yr' : 'mo'}</span>
                </p>
              ) : (
                <p className="text-lg font-semibold text-emerald-600">Free</p>
              )}
            </div>

            <div className="p-3 bg-white/70 rounded-xl">
              <p className="text-xs text-gray-500 uppercase tracking-wide">BOQs This Period</p>
              <p className="text-lg font-semibold text-gray-900">
                {summary.boqsUsedThisPeriod}
                {summary.boqLimit ? (
                  <span className="text-sm font-normal text-gray-500"> / {summary.boqLimit}</span>
                ) : (
                  <span className="text-sm font-normal text-gray-500"> (unlimited)</span>
                )}
              </p>
            </div>

            {summary.seatModel === 'per_seat' && (
              <div className="p-3 bg-white/70 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Seats</p>
                <p className="text-lg font-semibold text-gray-900">
                  {summary.activeMemberCount}
                  {summary.maxActiveMembers && (
                    <span className="text-sm font-normal text-gray-500"> / {summary.maxActiveMembers}</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">Active members</p>
              </div>
            )}

            {summary.currentPeriodEnd && (
              <div className="p-3 bg-white/70 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {summary.cancelAtPeriodEnd ? 'Cancels On' : 'Renews On'}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {format(new Date(summary.currentPeriodEnd), 'MMM d, yyyy')}
                </p>
              </div>
            )}
          </div>

          {/* Access Source Info */}
          {hasGrant && summary.activeGrant && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-xl border border-blue-200">
              <Sparkles className="w-5 h-5" />
              <span>
                Access via {summary.activeGrant.grantType === 'admin_grant' ? 'Admin Grant' : 'Trial'}
                {summary.activeGrant.endsAt && (
                  <> (expires {format(new Date(summary.activeGrant.endsAt), 'MMM d, yyyy')})</>                )}
                {summary.activeGrant.notes && <span className="text-blue-600"> — {summary.activeGrant.notes}</span>}
              </span>
            </div>
          )}

          {/* Cancel Warning */}
          {summary.cancelAtPeriodEnd && (
            <div className="flex items-center justify-between p-4 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>
                  Subscription cancels on {format(new Date(summary.currentPeriodEnd!), 'MMMM d, yyyy')}.
                  You\'ll retain access until then.
                </span>
              </div>
              <Button
                onClick={handleResumeSubscription}
                disabled={resumeLoading}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700"
              >
                {resumeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
                Resume Auto-Renew
              </Button>
            </div>
          )}

          {/* Auto-renew ON indicator (only show when not canceling and has Stripe subscription) */}
          {hasStripeSubscription && !summary.cancelAtPeriodEnd && summary.status === 'active' && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-5 h-5" />
              <span>Auto-renew is <strong>ON</strong></span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {hasStripeSubscription && (
              <Button
                onClick={handleManageBilling}
                disabled={portalLoading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                Manage Payment Methods
              </Button>
            )}

            {hasStripeSubscription && !summary.cancelAtPeriodEnd && (
              <Button
                onClick={() => setShowCancelDialog(true)}
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Subscription
              </Button>
            )}

            <Link href="/pricing">
              <Button variant="outline" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {isOnFreePlan ? 'Upgrade Plan' : 'Change Plan'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Card */}
      {summary.invoices.length > 0 && (
        <Card className="shadow-md border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Payment History</CardTitle>
                <CardDescription>Your past invoices and payments</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-100">
              {summary.invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {invoice.number || invoice.stripeInvoiceId.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {invoice.paidAt
                          ? format(new Date(invoice.paidAt), 'MMM d, yyyy')
                          : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(invoice.amountPaid, invoice.currency)}
                      </p>
                      <Badge
                        variant={invoice.status === 'paid' ? 'default' : 'secondary'}
                        className={invoice.status === 'paid' ? 'bg-emerald-500' : ''}
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    {invoice.pdfUrl && (
                      <a
                        href={invoice.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Download Invoice PDF"
                      >
                        <Download className="w-5 h-5 text-gray-500" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No subscription - prompt to upgrade */}
      {!hasStripeSubscription && !hasGrant && (
        <Card className="shadow-md border-0 bg-gradient-to-br from-purple-50 to-lavender-50">
          <CardContent className="py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock More Features</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Upgrade your plan to create more BOQs, add custom branding, and access premium features.
            </p>
            <Link href="/pricing">
              <Button className="bg-gradient-to-r from-purple-500 to-lavender-500 hover:from-purple-600 hover:to-lavender-600">
                View Plans
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Cancel Subscription Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Your subscription will be canceled at the end of your current billing period
                {summary.currentPeriodEnd && (
                  <> on <strong>{format(new Date(summary.currentPeriodEnd), 'MMMM d, yyyy')}</strong></>                )}.
              </p>
              <p>
                You\'ll retain full access to all features until then. After that, your account will be
                downgraded to the Free plan.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelLoading}>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              disabled={cancelLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {cancelLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Cancel at Period End
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
