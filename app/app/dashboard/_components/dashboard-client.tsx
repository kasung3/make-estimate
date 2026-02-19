'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Search,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Loader2,
  Trash2,
  CreditCard,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BoqWithRelations, CustomerType, CompanySettings, BillingStatus } from '@/lib/types';
import { metaTrackCustom } from '@/lib/meta-pixel';

interface DashboardClientProps {
  boqs: BoqWithRelations[];
  customers: CustomerType[];
  company: CompanySettings;
}

export function DashboardClient({ boqs: initialBoqs, customers: initialCustomers, company }: DashboardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [boqs, setBoqs] = useState(initialBoqs ?? []);
  const [customers, setCustomers] = useState(initialCustomers ?? []);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewBoqDialog, setShowNewBoqDialog] = useState(false);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerAddress, setNewCustomerAddress] = useState('');
  const [presets, setPresets] = useState<any[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [billingStatus, setBillingStatus] = useState<BillingStatus | null>(null);
  const [billingLoading, setBillingLoading] = useState(true);

  const currencySymbol = company?.currencySymbol ?? 'Rs.';
  const currencyPosition = company?.currencyPosition ?? 'left';

  // Handle billing success/canceled toast
  useEffect(() => {
    const billing = searchParams?.get('billing');
    if (billing === 'success') {
      toast.success('Subscription activated! You can now create BOQs.');
      // Clear the URL parameter
      window.history.replaceState({}, '', '/app/dashboard');
    } else if (billing === 'canceled') {
      toast.error('Checkout was canceled');
      window.history.replaceState({}, '', '/app/dashboard');
    }
  }, [searchParams]);

  // Fetch billing status function - reusable for mount and after actions
  const fetchBillingStatus = useCallback(async () => {
    try {
      setBillingLoading(true);
      const response = await fetch('/api/billing/status', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setBillingStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch billing status:', error);
    } finally {
      setBillingLoading(false);
    }
  }, []);

  // Fetch presets on mount
  useEffect(() => {
    fetch('/api/presets')
      .then(res => res.json())
      .then(data => setPresets(data ?? []))
      .catch(() => {});
  }, []);

  // Refetch BOQs and customers from API
  const refetchBoqs = useCallback(async () => {
    try {
      const response = await fetch('/api/boqs', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setBoqs(data ?? []);
      }
    } catch (error) {
      console.error('Failed to refetch BOQs:', error);
    }
  }, []);

  // Fetch billing status on mount and when page becomes visible (returning from navigation)
  useEffect(() => {
    fetchBillingStatus();
    refetchBoqs(); // Refetch on mount to get latest data
    
    // Check if company settings were updated since last visit
    const lastSettingsUpdate = localStorage.getItem('companySettingsUpdated');
    const lastSeenUpdate = sessionStorage.getItem('dashboard_lastSeenSettingsUpdate');
    if (lastSettingsUpdate && lastSettingsUpdate !== lastSeenUpdate) {
      sessionStorage.setItem('dashboard_lastSeenSettingsUpdate', lastSettingsUpdate);
      router.refresh(); // Refresh to get updated company settings
    }
    
    // Refresh when page becomes visible (user returns to dashboard)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchBillingStatus();
        refetchBoqs();
        // Also check for settings updates
        const settingsUpdate = localStorage.getItem('companySettingsUpdated');
        const seenUpdate = sessionStorage.getItem('dashboard_lastSeenSettingsUpdate');
        if (settingsUpdate && settingsUpdate !== seenUpdate) {
          sessionStorage.setItem('dashboard_lastSeenSettingsUpdate', settingsUpdate);
          router.refresh();
        }
      }
    };
    
    // Also refresh on window focus (catches browser back button)
    const handleFocus = () => {
      fetchBillingStatus();
      refetchBoqs();
    };
    
    // Listen for company settings changes (from Settings page in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'companySettingsUpdated') {
        sessionStorage.setItem('dashboard_lastSeenSettingsUpdate', e.newValue || '');
        router.refresh(); // Refresh to get updated company settings
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchBillingStatus, refetchBoqs, router]);

  // Prefetch top BOQs on mount for faster navigation
  useEffect(() => {
    // Prefetch the first 5 BOQs for faster navigation
    const boqsToPreload = (initialBoqs ?? []).slice(0, 5);
    boqsToPreload.forEach((boq) => {
      if (boq?.id) {
        router.prefetch(`/app/boq/${boq.id}`);
      }
    });
  }, [initialBoqs, router]);

  // Prefetch on hover for BOQs not in the initial prefetch
  const handleBoqHover = useCallback((boqId: string) => {
    router.prefetch(`/app/boq/${boqId}`);
  }, [router]);

  // Format number with thousand separators
  const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatCurrency = (amount: number) => {
    const formatted = formatNumber(amount ?? 0, 2);
    return currencyPosition === 'left'
      ? `${currencySymbol} ${formatted}`
      : `${formatted} ${currencySymbol}`;
  };

  const calculateBoqTotal = (boq: BoqWithRelations) => {
    let subtotal = 0;
    (boq?.categories ?? []).forEach((cat) => {
      (cat?.items ?? []).forEach((item) => {
        const qty = item?.quantity ?? 0;
        if (qty > 0) {
          const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
          subtotal += unitPrice * qty;
        }
      });
    });

    let discount = 0;
    if (boq?.discountType === 'percent') {
      discount = subtotal * ((boq?.discountValue ?? 0) / 100);
    } else {
      discount = boq?.discountValue ?? 0;
    }

    const afterDiscount = subtotal - discount;
    const vatAmount = boq?.vatEnabled ? afterDiscount * ((boq?.vatPercent ?? 0) / 100) : 0;

    return subtotal - discount + vatAmount;
  };

  const filteredBoqs = (boqs ?? []).filter(
    (boq) =>
      boq?.projectName?.toLowerCase()?.includes?.(searchQuery?.toLowerCase?.() ?? '') ||
      boq?.customer?.name?.toLowerCase()?.includes?.(searchQuery?.toLowerCase?.() ?? '')
  );

  const totalValue = (boqs ?? []).reduce((sum, boq) => sum + calculateBoqTotal(boq), 0);

  const handleCreateBoq = async () => {
    // Check billing status first
    if (!billingStatus?.hasActiveSubscription) {
      toast.error('Please subscribe to a plan to create BOQs');
      router.push('/app/settings?tab=billing');
      return;
    }

    if (!billingStatus?.canCreateBoq) {
      toast.error(`You've reached your BOQ limit for this period. Upgrade to continue.`);
      router.push('/app/settings?tab=billing');
      return;
    }

    if (!newProjectName?.trim?.()) {
      toast.error('Please enter a project name');
      return;
    }

    setLoading(true);
    try {
      let response;
      let data;

      // If a preset is selected, use the create-boq-from-preset endpoint
      if (selectedPresetId) {
        response = await fetch('/api/presets/create-boq-from-preset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            presetId: selectedPresetId,
            projectName: newProjectName,
            customerId: selectedCustomerId || null,
          }),
        });
      } else {
        response = await fetch('/api/boqs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectName: newProjectName,
            customerId: selectedCustomerId || null,
          }),
        });
      }

      data = await response.json();

      if (!response.ok) {
        // Handle quota exceeded with detailed error
        if (data?.code === 'QUOTA_EXCEEDED') {
          // Track ReachedLimit event
          metaTrackCustom('ReachedLimit', { 
            limit_type: 'boq_per_period',
            plan_key: billingStatus?.planKey || 'unknown',
          });
          toast.error(`BOQ limit reached (${data.boqsUsed}/${data.boqLimit}). Upgrade or wait until ${data.resetDate}.`, {
            duration: 5000,
          });
          router.push('/app/settings?tab=billing');
          return;
        }
        toast.error(data?.error || 'Failed to create BOQ');
        return;
      }

      // Track CreateBOQ event
      metaTrackCustom('CreateBOQ', { source: 'dashboard', fromPreset: !!selectedPresetId });

      // Refresh billing status from server to get accurate usage count
      await fetchBillingStatus();

      setShowNewBoqDialog(false);
      setNewProjectName('');
      setSelectedCustomerId('');
      setSelectedPresetId('');
      router.push(`/app/boq/${data?.id}`);
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async () => {
    if (!newCustomerName?.trim?.()) {
      toast.error('Please enter a customer name');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCustomerName,
          email: newCustomerEmail || null,
          phone: newCustomerPhone || null,
          address: newCustomerAddress || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || 'Failed to create customer');
        return;
      }

      setCustomers([...(customers ?? []), data]);
      setSelectedCustomerId(data?.id);
      setShowNewCustomerDialog(false);
      setNewCustomerName('');
      setNewCustomerEmail('');
      setNewCustomerPhone('');
      setNewCustomerAddress('');
      toast.success('Customer created');
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBoq = async (boqId: string) => {
    if (!confirm('Are you sure you want to delete this BOQ?')) return;

    try {
      const response = await fetch(`/api/boqs/${boqId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        toast.error('Failed to delete BOQ');
        return;
      }

      setBoqs((boqs ?? []).filter((b) => b?.id !== boqId));
      toast.success('BOQ deleted');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  // Note: Subscription check is done server-side in page.tsx, redirects to /pricing if needed

  const usagePercentage = billingStatus?.boqLimit 
    ? Math.min(100, (billingStatus.boqsUsedThisPeriod / billingStatus.boqLimit) * 100)
    : 0;

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your BOQs and estimates</p>
          </div>
          <Button 
            onClick={() => setShowNewBoqDialog(true)} 
            className="shadow-md"
            disabled={!billingStatus?.canCreateBoq}
          >
            <Plus className="w-4 h-4 mr-2" />
            New BOQ
          </Button>
        </div>

        {/* Billing Status Banner */}
        {billingStatus && billingStatus.hasActiveSubscription && billingStatus.boqLimit !== null && (
          <Card className={`mb-6 border-0 shadow-md ${
            !billingStatus.canCreateBoq 
              ? 'bg-gradient-to-br from-amber-50 to-orange-50' 
              : 'bg-gradient-to-br from-violet-50 to-purple-50'
          }`}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {!billingStatus.canCreateBoq ? (
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {billingStatus.boqsUsedThisPeriod} of {billingStatus.boqLimit} BOQs used
                      </p>
                      <Badge variant={billingStatus.canCreateBoq ? 'secondary' : 'destructive'}>
                        {billingStatus.planInfo?.name || 'Starter'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {!billingStatus.canCreateBoq 
                        ? 'Upgrade to Business for unlimited BOQs'
                        : `${billingStatus.boqLimit - billingStatus.boqsUsedThisPeriod} BOQs remaining this period`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 hidden sm:block">
                    <Progress value={usagePercentage} className="h-2" />
                  </div>
                  {!billingStatus.canCreateBoq && (
                    <Button 
                      size="sm" 
                      onClick={() => router.push('/app/settings?tab=billing')}
                    >
                      Upgrade
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-0 shadow-md overflow-hidden">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-cyan-700 truncate">Total BOQs</p>
                  <p className="text-xl sm:text-3xl font-bold text-cyan-900 tabular-nums">{boqs?.length ?? 0}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-0 shadow-md overflow-hidden">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-teal-700 truncate">Total Value</p>
                  <p className="text-base sm:text-2xl font-bold text-teal-900 tabular-nums truncate" title={formatCurrency(totalValue)}>
                    {formatCurrency(totalValue)}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-md overflow-hidden">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-emerald-700 truncate">Customers</p>
                  <p className="text-xl sm:text-3xl font-bold text-emerald-900 tabular-nums">{customers?.length ?? 0}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md overflow-hidden">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-blue-700 truncate">This Month</p>
                  <p className="text-xl sm:text-3xl font-bold text-blue-900 tabular-nums">
                    {(boqs ?? []).filter(
                      (b) =>
                        new Date(b?.createdAt ?? 0).getMonth() === new Date().getMonth()
                    )?.length ?? 0}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search BOQs by project name or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* BOQ List */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-lg">Recent BOQs</CardTitle>
          </CardHeader>
          <CardContent>
            {(filteredBoqs?.length ?? 0) === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No BOQs found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowNewBoqDialog(true)}
                >
                  Create your first BOQ
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {(filteredBoqs ?? []).map((boq) => (
                  <div
                    key={boq?.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group gap-2 sm:gap-4"
                    onClick={() => router.push(`/app/boq/${boq?.id}`)}
                    onMouseEnter={() => handleBoqHover(boq?.id)}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base">
                          {boq?.projectName}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          {boq?.customer?.name || 'No customer'} •{' '}
                          {format(new Date(boq?.updatedAt ?? Date.now()), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4 pl-12 sm:pl-0">
                      <span className="text-sm sm:text-lg font-semibold text-gray-900 tabular-nums truncate" title={formatCurrency(calculateBoqTotal(boq))}>
                        {formatCurrency(calculateBoqTotal(boq))}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="sm:opacity-0 sm:group-hover:opacity-100 text-gray-400 hover:text-red-500 h-8 w-8 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBoq(boq?.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* New BOQ Dialog */}
        <Dialog open={showNewBoqDialog} onOpenChange={setShowNewBoqDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New BOQ</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="Enter project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              {presets.length > 0 && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-500" />
                    Start from Preset (Optional)
                  </Label>
                  <Select value={selectedPresetId || 'none'} onValueChange={(v) => setSelectedPresetId(v === 'none' ? '' : v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Start from scratch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Start from scratch</SelectItem>
                      {presets.map((preset) => (
                        <SelectItem key={preset.id} value={preset.id}>
                          {preset.presetName || preset.projectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Presets include predefined items, costs, and markup percentages
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <Label>Customer (Optional)</Label>
                <div className="flex space-x-2">
                  <Select
                    value={selectedCustomerId || 'none'}
                    onValueChange={(v) => setSelectedCustomerId(v === 'none' ? '' : v)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No customer</SelectItem>
                      {(customers ?? []).map((customer) => (
                        <SelectItem key={customer?.id} value={customer?.id ?? ''}>
                          {customer?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewCustomerDialog(true)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewBoqDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateBoq} disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Create BOQ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Customer Dialog */}
        <Dialog open={showNewCustomerDialog} onOpenChange={setShowNewCustomerDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Name</Label>
                <Input
                  id="customerName"
                  placeholder="Customer name"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email (Optional)</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="customer@email.com"
                  value={newCustomerEmail}
                  onChange={(e) => setNewCustomerEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone (Optional)</Label>
                <Input
                  id="customerPhone"
                  placeholder="Phone number"
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerAddress">Address (Optional)</Label>
                <Input
                  id="customerAddress"
                  placeholder="Customer address"
                  value={newCustomerAddress}
                  onChange={(e) => setNewCustomerAddress(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowNewCustomerDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateCustomer} disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Add Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
