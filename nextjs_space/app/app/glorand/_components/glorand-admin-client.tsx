'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Ticket,
  Building2,
  Users,
  Plus,
  Loader2,
  Trash2,
  Archive,
  ToggleLeft,
  ToggleRight,
  Shield,
  ShieldOff,
  AlertTriangle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Key,
  Gift,
  CreditCard,
  Receipt,
  X,
  Copy,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  Crown,
  DollarSign,
  Settings2,
  Check,
  Pencil,
  GripVertical,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';

interface UserData {
  id: string;
  email: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phone: string | null;
  isBlocked: boolean;
  blockReason: string | null;
  forcePasswordReset: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  company: {
    id: string;
    name: string;
    isBlocked: boolean;
  } | null;
  billing: {
    planKey: string | null;
    status: string | null;
    accessOverride: string | null;
    overridePlan: string | null;
    currentCouponCode: string | null;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
  } | null;
}

interface UserDetailData {
  user: any;
  company: any;
  billing: any;
  invoices: any[];
  couponRedemptions: any[];
}

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

type CouponType = 'trial_days' | 'free_forever';
type PlanKey = 'starter' | 'business';

interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  trialDays: number | null;
  allowedPlans: PlanKey[];
  maxRedemptions: number | null;
  currentRedemptions: number;
  expiresAt: string | null;
  active: boolean;
  archived: boolean;
  createdAt: string;
}

interface Company {
  id: string;
  name: string;
  isBlocked: boolean;
  blockReason: string | null;
  createdAt: string;
  _count: { memberships: number; boqs: number };
  billing: { planKey: string | null; status: string | null; accessOverride: string | null } | null;
}

interface BillingPlan {
  id: string;
  planKey: string;
  name: string;
  priceMonthlyUsdCents: number;
  priceAnnualUsdCents: number | null;
  seatModel: 'single' | 'per_seat';
  boqLimitPerPeriod: number | null;
  boqTemplatesLimit: number | null;
  coverTemplatesLimit: number | null;
  features: string[];
  isMostPopular: boolean;
  sortOrder: number;
  active: boolean;
  stripeProductId: string | null;
  stripePriceIdMonthly: string | null;
  stripePriceIdAnnual: string | null;
  createdAt: string;
  updatedAt: string;
  priceHistory?: { id: string; stripePriceId: string; amountCents: number; interval: string; isCurrent: boolean; createdAt: string }[];
}

export function GlorandAdminClient({ adminEmail }: { adminEmail: string }) {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<UserData[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [billingPlans, setBillingPlans] = useState<BillingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [plansLoading, setPlansLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, totalCount: 0, totalPages: 0 });
  
  // Plan editing state
  const [editingPlan, setEditingPlan] = useState<BillingPlan | null>(null);
  const [showEditPlanDialog, setShowEditPlanDialog] = useState(false);
  const [planForm, setPlanForm] = useState({
    name: '',
    priceMonthlyUsdCents: 0,
    priceAnnualUsdCents: '' as string | number,
    boqLimitPerPeriod: '' as string | number,
    boqTemplatesLimit: '' as string | number,
    coverTemplatesLimit: '' as string | number,
    features: [] as string[],
    isMostPopular: false,
    sortOrder: 0,
    active: true,
  });
  const [newFeature, setNewFeature] = useState('');
  const [savingPlan, setSavingPlan] = useState(false);
  const [draggedFeatureIdx, setDraggedFeatureIdx] = useState<number | null>(null);
  const [editingFeatureIdx, setEditingFeatureIdx] = useState<number | null>(null);
  const [editingFeatureText, setEditingFeatureText] = useState('');

  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [blockedFilter, setBlockedFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // User detail drawer
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetailData | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showUserDrawer, setShowUserDrawer] = useState(false);

  // Dialogs
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [blockTarget, setBlockTarget] = useState<{ type: 'user' | 'company'; id: string; name: string; isBlocked: boolean } | null>(null);
  const [blockReason, setBlockReason] = useState('');
  const [cancelSubscription, setCancelSubscription] = useState(true);

  const [showPasswordResetDialog, setShowPasswordResetDialog] = useState(false);
  const [passwordResetUser, setPasswordResetUser] = useState<UserData | null>(null);
  const [resetLink, setResetLink] = useState('');

  const [showFreeForeverDialog, setShowFreeForeverDialog] = useState(false);
  const [freeForeverTarget, setFreeForeverTarget] = useState<{ companyId: string; companyName: string; hasGrant: boolean } | null>(null);
  const [freeForeverPlan, setFreeForeverPlan] = useState<'starter' | 'business'>('business');

  const [showCreateCouponDialog, setShowCreateCouponDialog] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'trial_days' as CouponType,
    trialDays: 14,
    allowedPlans: [] as PlanKey[],
    maxRedemptions: '',
    expiresAt: '',
  });
  const [creating, setCreating] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch users when filters change
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab, debouncedQuery, planFilter, statusFilter, blockedFilter, sortBy, pagination.page]);

  // Fetch other tabs
  useEffect(() => {
    if (activeTab === 'coupons') {
      fetchCoupons();
    } else if (activeTab === 'companies') {
      fetchCompanies();
    } else if (activeTab === 'plans') {
      fetchPlans();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
      });
      if (debouncedQuery) params.set('query', debouncedQuery);
      if (planFilter) params.set('plan', planFilter);
      if (statusFilter) params.set('status', statusFilter);
      if (blockedFilter) params.set('blocked', blockedFilter);

      const res = await fetch(`/api/admin/users?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setUsers(data.users || []);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/coupons');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCoupons(data.coupons || []);
    } catch (err) {
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/accounts?type=companies');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCompanies(data.companies || []);
    } catch (err) {
      toast.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    setPlansLoading(true);
    try {
      const res = await fetch('/api/admin/plans');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBillingPlans(data || []);
    } catch (err) {
      toast.error('Failed to load billing plans');
    } finally {
      setPlansLoading(false);
    }
  };

  const openEditPlanDialog = (plan: BillingPlan) => {
    setEditingPlan(plan);
    setPlanForm({
      name: plan.name,
      priceMonthlyUsdCents: plan.priceMonthlyUsdCents,
      priceAnnualUsdCents: plan.priceAnnualUsdCents ?? '',
      boqLimitPerPeriod: plan.boqLimitPerPeriod ?? '',
      boqTemplatesLimit: plan.boqTemplatesLimit ?? '',
      coverTemplatesLimit: plan.coverTemplatesLimit ?? '',
      features: plan.features || [],
      isMostPopular: plan.isMostPopular || false,
      sortOrder: plan.sortOrder,
      active: plan.active,
    });
    setNewFeature('');
    setShowEditPlanDialog(true);
  };

  const handleSavePlan = async () => {
    if (!editingPlan) return;
    setSavingPlan(true);
    try {
      const res = await fetch(`/api/admin/plans/${editingPlan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: planForm.name,
          priceMonthlyUsdCents: planForm.priceMonthlyUsdCents,
          priceAnnualUsdCents: planForm.priceAnnualUsdCents === '' ? null : Number(planForm.priceAnnualUsdCents),
          boqLimitPerPeriod: planForm.boqLimitPerPeriod === '' ? null : Number(planForm.boqLimitPerPeriod),
          boqTemplatesLimit: planForm.boqTemplatesLimit === '' ? null : Number(planForm.boqTemplatesLimit),
          coverTemplatesLimit: planForm.coverTemplatesLimit === '' ? null : Number(planForm.coverTemplatesLimit),
          features: planForm.features,
          isMostPopular: planForm.isMostPopular,
          sortOrder: planForm.sortOrder,
          active: planForm.active,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update plan');
      }
      toast.success('Plan updated successfully');
      
      // Check if price changed - warn about new Stripe price
      const monthlyChanged = editingPlan.priceMonthlyUsdCents !== planForm.priceMonthlyUsdCents;
      const annualChanged = (editingPlan.priceAnnualUsdCents ?? '') !== planForm.priceAnnualUsdCents;
      if (monthlyChanged || annualChanged) {
        toast.success('New Stripe price(s) created for updated amounts', { duration: 5000 });
      }
      
      setShowEditPlanDialog(false);
      fetchPlans();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update plan');
    } finally {
      setSavingPlan(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setPlanForm(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setPlanForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Feature drag-and-drop handlers
  const handleFeatureDragStart = (index: number) => {
    setDraggedFeatureIdx(index);
  };

  const handleFeatureDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedFeatureIdx === null || draggedFeatureIdx === index) return;
    
    const newFeatures = [...planForm.features];
    const draggedItem = newFeatures[draggedFeatureIdx];
    newFeatures.splice(draggedFeatureIdx, 1);
    newFeatures.splice(index, 0, draggedItem);
    
    setPlanForm(prev => ({ ...prev, features: newFeatures }));
    setDraggedFeatureIdx(index);
  };

  const handleFeatureDragEnd = () => {
    setDraggedFeatureIdx(null);
  };

  // Feature editing handlers
  const startEditingFeature = (index: number) => {
    setEditingFeatureIdx(index);
    setEditingFeatureText(planForm.features[index]);
  };

  const saveEditingFeature = () => {
    if (editingFeatureIdx === null) return;
    const trimmed = editingFeatureText.trim();
    if (trimmed) {
      setPlanForm(prev => ({
        ...prev,
        features: prev.features.map((f, i) => i === editingFeatureIdx ? trimmed : f),
      }));
    }
    setEditingFeatureIdx(null);
    setEditingFeatureText('');
  };

  const cancelEditingFeature = () => {
    setEditingFeatureIdx(null);
    setEditingFeatureText('');
  };

  const fetchUserDetail = async (userId: string) => {
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setUserDetail(data);
    } catch (err) {
      toast.error('Failed to load user details');
    } finally {
      setLoadingDetail(false);
    }
  };

  const openUserDrawer = (user: UserData) => {
    setSelectedUser(user);
    setShowUserDrawer(true);
    fetchUserDetail(user.id);
  };

  const closeUserDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setUserDetail(null);
  };

  // Block/Unblock handlers
  const openBlockDialog = (type: 'user' | 'company', id: string, name: string, isBlocked: boolean) => {
    setBlockTarget({ type, id, name, isBlocked });
    setBlockReason('');
    setCancelSubscription(true);
    setShowBlockDialog(true);
  };

  const handleBlockToggle = async () => {
    if (!blockTarget) return;
    try {
      const endpoint = blockTarget.type === 'user'
        ? `/api/admin/users/${blockTarget.id}/${blockTarget.isBlocked ? 'unblock' : 'block'}`
        : `/api/admin/companies/${blockTarget.id}/${blockTarget.isBlocked ? 'unblock' : 'block'}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blockReason: !blockTarget.isBlocked ? blockReason : undefined,
          cancelSubscription: !blockTarget.isBlocked ? cancelSubscription : undefined,
        }),
      });

      if (!res.ok) throw new Error('Failed to update');
      toast.success(blockTarget.isBlocked ? 'Unblocked successfully' : 'Blocked successfully');
      setShowBlockDialog(false);
      if (blockTarget.type === 'user') fetchUsers();
      else fetchCompanies();
      if (selectedUser) fetchUserDetail(selectedUser.id);
    } catch (err) {
      toast.error('Failed to update block status');
    }
  };

  // Password reset handlers
  const openPasswordResetDialog = (user: UserData) => {
    setPasswordResetUser(user);
    setResetLink('');
    setShowPasswordResetDialog(true);
  };

  const handlePasswordReset = async (action: 'generate_link' | 'force_reset' | 'clear_force_reset') => {
    if (!passwordResetUser) return;
    try {
      const res = await fetch(`/api/admin/users/${passwordResetUser.id}/password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      if (action === 'generate_link' && data.resetLink) {
        setResetLink(data.resetLink);
      }

      toast.success(data.message);
      fetchUsers();
      if (selectedUser) fetchUserDetail(selectedUser.id);
    } catch (err: any) {
      toast.error(err.message || 'Failed to process password reset');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  // Free Forever handlers
  const openFreeForeverDialog = (companyId: string, companyName: string, hasGrant: boolean) => {
    setFreeForeverTarget({ companyId, companyName, hasGrant });
    setFreeForeverPlan('business');
    setShowFreeForeverDialog(true);
  };

  const handleFreeForeverToggle = async () => {
    if (!freeForeverTarget) return;
    try {
      const endpoint = freeForeverTarget.hasGrant
        ? `/api/admin/companies/${freeForeverTarget.companyId}/revoke-free-forever`
        : `/api/admin/companies/${freeForeverTarget.companyId}/grant-free-forever`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: freeForeverPlan }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      toast.success(data.message);
      setShowFreeForeverDialog(false);
      fetchUsers();
      fetchCompanies();
      if (selectedUser) fetchUserDetail(selectedUser.id);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update free access');
    }
  };

  // Remove Coupon
  const handleRemoveCoupon = async (companyId: string) => {
    if (!confirm('Are you sure you want to remove the coupon/discount from this company?')) return;
    try {
      const res = await fetch(`/api/admin/companies/${companyId}/remove-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      toast.success(data.message);
      fetchUsers();
      if (selectedUser) fetchUserDetail(selectedUser.id);
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove coupon');
    }
  };

  // Coupon CRUD
  const createCoupon = async () => {
    if (!newCoupon.code.trim()) {
      toast.error('Coupon code is required');
      return;
    }
    setCreating(true);
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: newCoupon.code,
          type: newCoupon.type,
          trialDays: newCoupon.type === 'trial_days' ? newCoupon.trialDays : undefined,
          allowedPlans: newCoupon.allowedPlans.length > 0 ? newCoupon.allowedPlans : undefined,
          maxRedemptions: newCoupon.maxRedemptions ? parseInt(newCoupon.maxRedemptions) : undefined,
          expiresAt: newCoupon.expiresAt || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create');
      toast.success('Coupon created!');
      setShowCreateCouponDialog(false);
      setNewCoupon({ code: '', type: 'trial_days', trialDays: 14, allowedPlans: [], maxRedemptions: '', expiresAt: '' });
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create coupon');
    } finally {
      setCreating(false);
    }
  };

  const toggleCouponActive = async (coupon: Coupon) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !coupon.active }),
      });
      if (!res.ok) throw new Error('Failed to update');
      toast.success(coupon.active ? 'Coupon disabled' : 'Coupon enabled');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to update coupon');
    }
  };

  const archiveCoupon = async (coupon: Coupon) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived: true, active: false }),
      });
      if (!res.ok) throw new Error('Failed to archive');
      toast.success('Coupon archived');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to archive coupon');
    }
  };

  const deleteCoupon = async (coupon: Coupon) => {
    if (coupon.currentRedemptions > 0) {
      toast.error('Cannot delete used coupons. Archive instead.');
      return;
    }
    if (!confirm(`Delete coupon "${coupon.code}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      toast.success('Coupon deleted');
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete coupon');
    }
  };

  const activeCoupons = coupons.filter(c => !c.archived);
  const archivedCoupons = coupons.filter(c => c.archived);

  // Helper functions
  const getPlanBadge = (user: UserData) => {
    const billing = user.billing;
    if (!billing) return <Badge variant="outline" className="text-xs">No Plan</Badge>;
    if (billing.accessOverride === 'admin_grant' || billing.accessOverride === 'free_forever') {
      return <Badge className="text-xs bg-purple-100 text-purple-800"><Crown className="w-3 h-3 mr-1" />Admin Grant</Badge>;
    }
    if (billing.planKey === 'business') {
      return <Badge className="text-xs bg-blue-100 text-blue-800">Business</Badge>;
    }
    if (billing.planKey === 'starter') {
      return <Badge className="text-xs bg-green-100 text-green-800">Starter</Badge>;
    }
    return <Badge variant="outline" className="text-xs">No Plan</Badge>;
  };

  const getStatusBadge = (status: string | null) => {
    if (!status) return <Badge variant="outline" className="text-xs">None</Badge>;
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      trialing: 'bg-yellow-100 text-yellow-800',
      past_due: 'bg-red-100 text-red-800',
      canceled: 'bg-gray-100 text-gray-800',
      incomplete: 'bg-orange-100 text-orange-800',
    };
    return <Badge className={`text-xs ${colors[status] || 'bg-gray-100 text-gray-800'}`}>{status}</Badge>;
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Platform Admin</h1>
            <p className="text-sm text-muted-foreground">Logged in as {adminEmail}</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger value="companies" className="gap-2">
              <Building2 className="h-4 w-4" /> Companies
            </TabsTrigger>
            <TabsTrigger value="coupons" className="gap-2">
              <Ticket className="h-4 w-4" /> Coupons
            </TabsTrigger>
            <TabsTrigger value="plans" className="gap-2">
              <DollarSign className="h-4 w-4" /> Plans
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Search and manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, company name, or phone..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setPagination(p => ({ ...p, page: 1 }));
                      }}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={planFilter} onValueChange={(v) => { setPlanFilter(v); setPagination(p => ({ ...p, page: 1 })); }}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Plans</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="free_forever">Admin Grant</SelectItem>
                        <SelectItem value="none">No Plan</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPagination(p => ({ ...p, page: 1 })); }}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="trialing">Trialing</SelectItem>
                        <SelectItem value="past_due">Past Due</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={blockedFilter} onValueChange={(v) => { setBlockedFilter(v); setPagination(p => ({ ...p, page: 1 })); }}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Blocked" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                        <SelectItem value="unblocked">Unblocked</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Users List */}
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No users found</p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {users.map(user => (
                        <div
                          key={user.id}
                          className={`p-4 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                            user.isBlocked || user.company?.isBlocked ? 'bg-red-50 border-red-200' : 'bg-white'
                          }`}
                          onClick={() => openUserDrawer(user)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium truncate">{user.email}</span>
                                {user.isBlocked && (
                                  <Badge variant="destructive" className="text-xs">Blocked</Badge>
                                )}
                                {user.company?.isBlocked && (
                                  <Badge variant="destructive" className="text-xs">Company Blocked</Badge>
                                )}
                                {getPlanBadge(user)}
                                {getStatusBadge(user.billing?.status || null)}
                                {user.billing?.currentCouponCode && (
                                  <Badge variant="outline" className="text-xs bg-yellow-50">
                                    <Gift className="w-3 h-3 mr-1" />{user.billing.currentCouponCode}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                <span>{user.fullName || user.name || 'No name'}</span>
                                <span>{user.company?.name || 'No company'}</span>
                                {user.phone && <span><Phone className="inline h-3 w-3 mr-1" />{user.phone}</span>}
                                <span><Calendar className="inline h-3 w-3 mr-1" />Joined {format(new Date(user.createdAt), 'MMM d, yyyy')}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openUserDrawer(user); }}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-muted-foreground">
                        Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                        {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of{' '}
                        {pagination.totalCount} users
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                          disabled={pagination.page <= 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">Page {pagination.page} of {pagination.totalPages}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                          disabled={pagination.page >= pagination.totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle>Companies</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : companies.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No companies found</p>
                ) : (
                  <div className="space-y-3">
                    {companies.map(company => (
                      <div
                        key={company.id}
                        className={`p-4 rounded-lg border ${company.isBlocked ? 'bg-red-50 border-red-200' : 'bg-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{company.name}</span>
                              {company.isBlocked && <Badge variant="destructive" className="text-xs">Blocked</Badge>}
                              {company.billing?.accessOverride && (
                                <Badge className="text-xs bg-purple-100 text-purple-800">
                                  <Crown className="w-3 h-3 mr-1" />Admin Grant
                                </Badge>
                              )}
                              {company.billing?.planKey && (
                                <Badge variant="secondary" className="text-xs capitalize">{company.billing.planKey}</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {company._count.memberships} member{company._count.memberships !== 1 ? 's' : ''} •{' '}
                              {company._count.boqs} BOQ{company._count.boqs !== 1 ? 's' : ''} •{' '}
                              Created {format(new Date(company.createdAt), 'MMM d, yyyy')}
                            </div>
                            {company.isBlocked && company.blockReason && (
                              <div className="text-sm text-red-600 mt-1">Reason: {company.blockReason}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openFreeForeverDialog(company.id, company.name, !!company.billing?.accessOverride)}
                            >
                              <Crown className="h-4 w-4 mr-2" />
                              {company.billing?.accessOverride ? 'Revoke' : 'Grant Free'}
                            </Button>
                            <Button
                              variant={company.isBlocked ? 'outline' : 'destructive'}
                              size="sm"
                              onClick={() => openBlockDialog('company', company.id, company.name, company.isBlocked)}
                            >
                              {company.isBlocked ? (
                                <><ShieldOff className="h-4 w-4 mr-2" /> Unblock</>
                              ) : (
                                <><Shield className="h-4 w-4 mr-2" /> Block</>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="coupons">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Promo Codes / Coupons</CardTitle>
                <Button onClick={() => setShowCreateCouponDialog(true)} size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Create Coupon
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeCoupons.length === 0 && archivedCoupons.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No coupons created yet</p>
                    ) : (
                      <>
                        {activeCoupons.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">Active Coupons</h3>
                            <div className="space-y-3">
                              {activeCoupons.map(coupon => (
                                <CouponRow
                                  key={coupon.id}
                                  coupon={coupon}
                                  onToggle={() => toggleCouponActive(coupon)}
                                  onArchive={() => archiveCoupon(coupon)}
                                  onDelete={() => deleteCoupon(coupon)}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {archivedCoupons.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">Archived Coupons</h3>
                            <div className="space-y-3 opacity-60">
                              {archivedCoupons.map(coupon => (
                                <CouponRow
                                  key={coupon.id}
                                  coupon={coupon}
                                  onToggle={() => {}}
                                  onArchive={() => {}}
                                  onDelete={() => deleteCoupon(coupon)}
                                  isArchived
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5" /> Billing Plans
                </CardTitle>
                <CardDescription>
                  Manage pricing, quotas, and features. Price changes auto-create new Stripe prices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {plansLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : billingPlans.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No billing plans found. Run the seed script to create plans.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {billingPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`p-6 rounded-xl border-2 ${plan.active ? 'bg-white' : 'bg-gray-50 opacity-75'} ${plan.isMostPopular ? 'border-primary' : 'border-gray-200'}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold">{plan.name}</h3>
                              {plan.isMostPopular && (
                                <Badge className="bg-primary text-white">Most Popular</Badge>
                              )}
                              {!plan.active && (
                                <Badge variant="secondary">Inactive</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Key: <code className="bg-gray-100 px-1 rounded">{plan.planKey}</code>
                              {plan.seatModel === 'per_seat' && (
                                <Badge variant="outline" className="ml-2 text-xs">Per Seat</Badge>
                              )}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditPlanDialog(plan)}
                            className="gap-1"
                          >
                            <Pencil className="h-3 w-3" /> Edit
                          </Button>
                        </div>

                        <div className="mb-4">
                          <div className="text-3xl font-bold">
                            ${(plan.priceMonthlyUsdCents / 100).toFixed(0)}
                            <span className="text-lg font-normal text-muted-foreground">/mo</span>
                            {plan.seatModel === 'per_seat' && (
                              <span className="text-sm font-normal text-muted-foreground">/user</span>
                            )}
                          </div>
                          {plan.priceAnnualUsdCents && (
                            <div className="text-sm text-muted-foreground">
                              ${(plan.priceAnnualUsdCents / 100).toFixed(0)}/year
                              {plan.seatModel === 'per_seat' && '/user'}
                            </div>
                          )}
                        </div>

                        <div className="mb-4 text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">BOQ Limit:</span>
                            <span className={plan.boqLimitPerPeriod === null ? 'text-green-600 font-medium' : ''}>
                              {plan.boqLimitPerPeriod === null ? 'Unlimited' : `${plan.boqLimitPerPeriod}/period`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">BOQ Templates:</span>
                            <span className={plan.boqTemplatesLimit === null ? 'text-green-600 font-medium' : ''}>
                              {plan.boqTemplatesLimit === null ? 'Unlimited' : plan.boqTemplatesLimit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cover Templates:</span>
                            <span className={plan.coverTemplatesLimit === null ? 'text-green-600 font-medium' : ''}>
                              {plan.coverTemplatesLimit === null ? 'Unlimited' : plan.coverTemplatesLimit}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-2">Features:</h4>
                          <ul className="space-y-1">
                            {(plan.features || []).slice(0, 5).map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                            {(plan.features || []).length > 5 && (
                              <li className="text-xs text-muted-foreground">
                                +{(plan.features || []).length - 5} more...
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
                          <div>Stripe Product: {plan.stripeProductId || 'Not configured'}</div>
                          <div>Monthly Price ID: {plan.stripePriceIdMonthly || 'Not configured'}</div>
                          <div>Annual Price ID: {plan.stripePriceIdAnnual || 'Not configured'}</div>
                          <div>Sort Order: {plan.sortOrder}</div>
                          {plan.priceHistory && plan.priceHistory.length > 0 && (
                            <div className="mt-2">
                              <span className="font-medium">Price History:</span>
                              <ul className="ml-2">
                                {plan.priceHistory.slice(0, 3).map((h) => (
                                  <li key={h.id}>
                                    ${(h.amountCents / 100).toFixed(0)} ({h.interval}) - {format(new Date(h.createdAt), 'MMM d, yyyy')}
                                    {h.isCurrent && <Badge className="ml-1 text-xs" variant="outline">Current</Badge>}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Plan Dialog */}
        <Dialog open={showEditPlanDialog} onOpenChange={setShowEditPlanDialog}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Plan: {editingPlan?.name}</DialogTitle>
              <DialogDescription>
                Update pricing, quotas, and features. Price changes will create a new Stripe price.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={planForm.name}
                  onChange={(e) => setPlanForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Plan name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Monthly Price (USD cents)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={planForm.priceMonthlyUsdCents}
                      onChange={(e) => setPlanForm((p) => ({ ...p, priceMonthlyUsdCents: parseInt(e.target.value) || 0 }))}
                      placeholder="1900"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    = ${(planForm.priceMonthlyUsdCents / 100).toFixed(2)}/mo
                  </p>
                </div>
                <div>
                  <Label>Annual Price (USD cents)</Label>
                  <Input
                    type="number"
                    value={planForm.priceAnnualUsdCents}
                    onChange={(e) => setPlanForm((p) => ({ ...p, priceAnnualUsdCents: e.target.value === '' ? '' : parseInt(e.target.value) }))}
                    placeholder="Leave empty if no annual"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    = ${planForm.priceAnnualUsdCents ? ((Number(planForm.priceAnnualUsdCents)) / 100).toFixed(2) : '0.00'}/yr
                  </p>
                </div>
              </div>
              {editingPlan && (editingPlan.priceMonthlyUsdCents !== planForm.priceMonthlyUsdCents || 
                (editingPlan.priceAnnualUsdCents ?? '') !== planForm.priceAnnualUsdCents) && (
                <p className="text-xs text-amber-600">
                  ⚠️ Changing price will create new Stripe price(s). Existing subscribers keep their current price.
                </p>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>BOQ Limit/Period</Label>
                  <Input
                    type="number"
                    value={planForm.boqLimitPerPeriod}
                    onChange={(e) => setPlanForm((p) => ({ ...p, boqLimitPerPeriod: e.target.value === '' ? '' : parseInt(e.target.value) }))}
                    placeholder="∞"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Empty = unlimited</p>
                </div>
                <div>
                  <Label>BOQ Templates</Label>
                  <Input
                    type="number"
                    value={planForm.boqTemplatesLimit}
                    onChange={(e) => setPlanForm((p) => ({ ...p, boqTemplatesLimit: e.target.value === '' ? '' : parseInt(e.target.value) }))}
                    placeholder="∞"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Empty = unlimited</p>
                </div>
                <div>
                  <Label>Cover Templates</Label>
                  <Input
                    type="number"
                    value={planForm.coverTemplatesLimit}
                    onChange={(e) => setPlanForm((p) => ({ ...p, coverTemplatesLimit: e.target.value === '' ? '' : parseInt(e.target.value) }))}
                    placeholder="∞"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Empty = unlimited</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Sort Order</Label>
                  <Input
                    type="number"
                    value={planForm.sortOrder}
                    onChange={(e) => setPlanForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="plan-active"
                      checked={planForm.active}
                      onCheckedChange={(checked) => setPlanForm((p) => ({ ...p, active: checked === true }))}
                    />
                    <Label htmlFor="plan-active">Active (visible on pricing)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="plan-popular"
                      checked={planForm.isMostPopular}
                      onCheckedChange={(checked) => setPlanForm((p) => ({ ...p, isMostPopular: checked === true }))}
                    />
                    <Label htmlFor="plan-popular">Most Popular badge</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label>Features <span className="text-xs text-muted-foreground ml-2">(drag to reorder, click to edit)</span></Label>
                <div className="space-y-1 mt-2">
                  {planForm.features.map((feature, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => handleFeatureDragStart(i)}
                      onDragOver={(e) => handleFeatureDragOver(e, i)}
                      onDragEnd={handleFeatureDragEnd}
                      className={`flex items-center gap-2 group ${
                        draggedFeatureIdx === i ? 'opacity-50 bg-primary/10' : ''
                      }`}
                    >
                      <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      {editingFeatureIdx === i ? (
                        <div className="flex-1 flex items-center gap-2">
                          <Input
                            value={editingFeatureText}
                            onChange={(e) => setEditingFeatureText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') { e.preventDefault(); saveEditingFeature(); }
                              if (e.key === 'Escape') { cancelEditingFeature(); }
                            }}
                            autoFocus
                            className="h-8 text-sm"
                          />
                          <Button type="button" variant="ghost" size="sm" onClick={saveEditingFeature}>
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button type="button" variant="ghost" size="sm" onClick={cancelEditingFeature}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span 
                            className="flex-1 text-sm bg-gray-50 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                            onClick={() => startEditingFeature(i)}
                          >
                            {feature}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeFeature(i)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-4" /> {/* Spacer for alignment with grip icon */}
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature..."
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditPlanDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePlan} disabled={savingPlan}>
                {savingPlan ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* User Detail Drawer */}
        <Sheet open={showUserDrawer} onOpenChange={setShowUserDrawer}>
          <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>User Details</SheetTitle>
              <SheetDescription>{selectedUser?.email}</SheetDescription>
            </SheetHeader>

            {loadingDetail ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : userDetail ? (
              <div className="mt-6 space-y-6">
                {/* Profile Section */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2"><Users className="h-4 w-4" /> Profile</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Name:</span> {userDetail.user.fullName || userDetail.user.name || '-'}</div>
                    <div><span className="text-muted-foreground">Email:</span> {userDetail.user.email}</div>
                    <div><span className="text-muted-foreground">Phone:</span> {userDetail.user.phone || '-'}</div>
                    <div><span className="text-muted-foreground">Joined:</span> {format(new Date(userDetail.user.createdAt), 'MMM d, yyyy')}</div>
                    <div><span className="text-muted-foreground">Last Login:</span> {userDetail.user.lastLoginAt ? format(new Date(userDetail.user.lastLoginAt), 'MMM d, yyyy HH:mm') : 'Never'}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Status:</span>
                      {userDetail.user.isBlocked ? (
                        <Badge variant="destructive">Blocked</Badge>
                      ) : (
                        <Badge variant="outline">Active</Badge>
                      )}
                    </div>
                  </div>
                  {userDetail.user.blockReason && (
                    <p className="text-sm text-red-600">Block Reason: {userDetail.user.blockReason}</p>
                  )}
                </div>

                {/* Company Section */}
                {userDetail.company && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2"><Building2 className="h-4 w-4" /> Company</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-muted-foreground">Name:</span> {userDetail.company.name}</div>
                      <div><span className="text-muted-foreground">Members:</span> {userDetail.company.memberCount}</div>
                      <div><span className="text-muted-foreground">BOQs:</span> {userDetail.company.boqCount}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Status:</span>
                        {userDetail.company.isBlocked ? (
                          <Badge variant="destructive">Blocked</Badge>
                        ) : (
                          <Badge variant="outline">Active</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Section */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2"><CreditCard className="h-4 w-4" /> Billing</h3>
                  {userDetail.billing ? (
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Plan:</span>
                        {userDetail.billing.accessOverride ? (
                          <Badge className="bg-purple-100 text-purple-800"><Crown className="w-3 h-3 mr-1" />Admin Grant ({userDetail.billing.overridePlan || 'business'})</Badge>
                        ) : (
                          <Badge variant="secondary" className="capitalize">{userDetail.billing.planKey || 'None'}</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Status:</span>
                        {getStatusBadge(userDetail.billing.status)}
                      </div>
                      {userDetail.billing.stripeCustomerId && (
                        <div className="col-span-2"><span className="text-muted-foreground">Stripe Customer:</span> <code className="text-xs bg-muted px-1 rounded">{userDetail.billing.stripeCustomerId}</code></div>
                      )}
                      {userDetail.billing.stripeSubscriptionId && (
                        <div className="col-span-2"><span className="text-muted-foreground">Stripe Subscription:</span> <code className="text-xs bg-muted px-1 rounded">{userDetail.billing.stripeSubscriptionId}</code></div>
                      )}
                      {userDetail.billing.currentCouponCode && (
                        <div className="col-span-2 flex items-center gap-2">
                          <span className="text-muted-foreground">Active Coupon:</span>
                          <Badge variant="outline" className="bg-yellow-50"><Gift className="w-3 h-3 mr-1" />{userDetail.billing.currentCouponCode}</Badge>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveCoupon(userDetail.company.id)}>
                            <X className="h-3 w-3" /> Remove
                          </Button>
                        </div>
                      )}
                      {userDetail.billing.currentPeriodEnd && (
                        <div><span className="text-muted-foreground">Period Ends:</span> {format(new Date(userDetail.billing.currentPeriodEnd), 'MMM d, yyyy')}</div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No billing information</p>
                  )}
                </div>

                {/* Invoices Section */}
                {userDetail.invoices.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2"><Receipt className="h-4 w-4" /> Payment History</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {userDetail.invoices.map((invoice: any) => (
                        <div key={invoice.id} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                          <div>
                            <span className="font-medium">${(invoice.amountPaid / 100).toFixed(2)} {invoice.currency.toUpperCase()}</span>
                            <span className="mx-2">•</span>
                            <span className="text-muted-foreground">{format(new Date(invoice.createdAt), 'MMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs capitalize">{invoice.status}</Badge>
                            {invoice.hostedInvoiceUrl && (
                              <a href={invoice.hostedInvoiceUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coupon History Section */}
                {userDetail.couponRedemptions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2"><Gift className="h-4 w-4" /> Coupon History</h3>
                    <div className="space-y-2">
                      {userDetail.couponRedemptions.map((redemption: any) => (
                        <div key={redemption.id} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                          <div>
                            <code className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{redemption.couponCode}</code>
                            <span className="ml-2 text-muted-foreground">{redemption.couponType === 'free_forever' ? 'Free Forever' : 'Trial'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{format(new Date(redemption.redeemedAt), 'MMM d, yyyy')}</span>
                            {redemption.revokedAt && <Badge variant="destructive" className="text-xs">Revoked</Badge>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="border-t pt-4 space-y-3">
                  <h3 className="font-semibold">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={userDetail.user.isBlocked ? 'outline' : 'destructive'}
                      size="sm"
                      onClick={() => openBlockDialog('user', userDetail.user.id, userDetail.user.email, userDetail.user.isBlocked)}
                    >
                      {userDetail.user.isBlocked ? (
                        <><ShieldOff className="h-4 w-4 mr-2" /> Unblock User</>
                      ) : (
                        <><Shield className="h-4 w-4 mr-2" /> Block User</>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openPasswordResetDialog(selectedUser!)}>
                      <Key className="h-4 w-4 mr-2" /> Password Reset
                    </Button>
                    {userDetail.company && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openFreeForeverDialog(
                            userDetail.company.id,
                            userDetail.company.name,
                            !!userDetail.billing?.accessOverride
                          )}
                        >
                          <Crown className="h-4 w-4 mr-2" />
                          {userDetail.billing?.accessOverride ? 'Revoke Free Access' : 'Grant Free Access'}
                        </Button>
                        <Button
                          variant={userDetail.company.isBlocked ? 'outline' : 'destructive'}
                          size="sm"
                          onClick={() => openBlockDialog('company', userDetail.company.id, userDetail.company.name, userDetail.company.isBlocked)}
                        >
                          {userDetail.company.isBlocked ? (
                            <><ShieldOff className="h-4 w-4 mr-2" /> Unblock Company</>
                          ) : (
                            <><Shield className="h-4 w-4 mr-2" /> Block Company</>
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </SheetContent>
        </Sheet>

        {/* Block Dialog */}
        <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                {blockTarget?.isBlocked ? 'Unblock' : 'Block'} {blockTarget?.type === 'company' ? 'Company' : 'User'}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-muted-foreground mb-4">
                {blockTarget?.isBlocked
                  ? `Are you sure you want to unblock "${blockTarget?.name}"?`
                  : `Are you sure you want to block "${blockTarget?.name}"? They will lose access to all /app/* pages.`}
              </p>
              {!blockTarget?.isBlocked && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="blockReason">Block Reason (optional)</Label>
                    <Input
                      id="blockReason"
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                      placeholder="e.g., Abuse, Non-payment"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="cancelSub"
                      checked={cancelSubscription}
                      onCheckedChange={(checked) => setCancelSubscription(checked as boolean)}
                    />
                    <Label htmlFor="cancelSub" className="font-normal cursor-pointer">
                      Cancel Stripe subscription immediately
                    </Label>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBlockDialog(false)}>Cancel</Button>
              <Button
                variant={blockTarget?.isBlocked ? 'default' : 'destructive'}
                onClick={handleBlockToggle}
              >
                {blockTarget?.isBlocked ? 'Unblock' : 'Block'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Password Reset Dialog */}
        <Dialog open={showPasswordResetDialog} onOpenChange={setShowPasswordResetDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" /> Password Reset Options
              </DialogTitle>
              <DialogDescription>
                For security, passwords cannot be viewed. Use these options to help the user reset their password.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">User: {passwordResetUser?.email}</p>
                {passwordResetUser?.forcePasswordReset && (
                  <Badge variant="outline" className="text-yellow-700 bg-yellow-50">Force Reset Enabled</Badge>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePasswordReset('generate_link')}
                >
                  <Copy className="h-4 w-4 mr-2" /> Generate Reset Link
                </Button>
                
                {resetLink && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                    <p className="text-green-800 mb-2">Reset link generated:</p>
                    <code className="block text-xs bg-white p-2 rounded break-all">{resetLink}</code>
                    <Button size="sm" variant="outline" className="mt-2" onClick={() => copyToClipboard(resetLink)}>
                      <Copy className="h-3 w-3 mr-2" /> Copy
                    </Button>
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePasswordReset(passwordResetUser?.forcePasswordReset ? 'clear_force_reset' : 'force_reset')}
                >
                  {passwordResetUser?.forcePasswordReset ? (
                    <><X className="h-4 w-4 mr-2" /> Clear Force Reset Flag</>
                  ) : (
                    <><AlertTriangle className="h-4 w-4 mr-2" /> Force Reset on Next Login</>
                  )}
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPasswordResetDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Free Forever Dialog */}
        <Dialog open={showFreeForeverDialog} onOpenChange={setShowFreeForeverDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-purple-500" />
                {freeForeverTarget?.hasGrant ? 'Revoke' : 'Grant'} Free Access
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {freeForeverTarget?.hasGrant ? (
                <p className="text-muted-foreground">
                  Are you sure you want to revoke free access for <strong>{freeForeverTarget?.companyName}</strong>?
                  They will need to subscribe to regain access.
                </p>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Grant free access to <strong>{freeForeverTarget?.companyName}</strong>.
                    This will override any existing subscription.
                  </p>
                  <div>
                    <Label htmlFor="freeForeverPlan">Access Level</Label>
                    <Select
                      value={freeForeverPlan}
                      onValueChange={(v) => setFreeForeverPlan(v as 'starter' | 'business')}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business (Unlimited BOQs)</SelectItem>
                        <SelectItem value="starter">Starter (10 BOQs/month)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFreeForeverDialog(false)}>Cancel</Button>
              <Button onClick={handleFreeForeverToggle}>
                {freeForeverTarget?.hasGrant ? 'Revoke Access' : 'Grant Free Access'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Coupon Dialog */}
        <Dialog open={showCreateCouponDialog} onOpenChange={setShowCreateCouponDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  placeholder="e.g., TRIAL14, FREEFOREVER"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="type">Coupon Type</Label>
                <Select
                  value={newCoupon.type}
                  onValueChange={(v: CouponType) => setNewCoupon(prev => ({ ...prev, type: v }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trial_days">Trial Days</SelectItem>
                    <SelectItem value="free_forever">Free Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newCoupon.type === 'trial_days' && (
                <div>
                  <Label htmlFor="trialDays">Trial Days</Label>
                  <Input
                    id="trialDays"
                    type="number"
                    min="1"
                    max="365"
                    value={newCoupon.trialDays}
                    onChange={(e) => setNewCoupon(prev => ({ ...prev, trialDays: parseInt(e.target.value) || 14 }))}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label>Allowed Plans (optional)</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={newCoupon.allowedPlans.includes('starter')}
                      onCheckedChange={(checked) => {
                        setNewCoupon(prev => ({
                          ...prev,
                          allowedPlans: checked
                            ? [...prev.allowedPlans, 'starter']
                            : prev.allowedPlans.filter(p => p !== 'starter'),
                        }));
                      }}
                    />
                    <span className="text-sm">Starter</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={newCoupon.allowedPlans.includes('business')}
                      onCheckedChange={(checked) => {
                        setNewCoupon(prev => ({
                          ...prev,
                          allowedPlans: checked
                            ? [...prev.allowedPlans, 'business']
                            : prev.allowedPlans.filter(p => p !== 'business'),
                        }));
                      }}
                    />
                    <span className="text-sm">Business</span>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Leave unchecked for both plans</p>
              </div>

              <div>
                <Label htmlFor="maxRedemptions">Max Redemptions (optional)</Label>
                <Input
                  id="maxRedemptions"
                  type="number"
                  min="1"
                  value={newCoupon.maxRedemptions}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, maxRedemptions: e.target.value }))}
                  placeholder="Leave empty for unlimited"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expiresAt">Expiration Date (optional)</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, expiresAt: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateCouponDialog(false)}>Cancel</Button>
              <Button onClick={createCoupon} disabled={creating}>
                {creating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create Coupon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

// Coupon Row Component
function CouponRow({
  coupon,
  onToggle,
  onArchive,
  onDelete,
  isArchived = false,
}: {
  coupon: Coupon;
  onToggle: () => void;
  onArchive: () => void;
  onDelete: () => void;
  isArchived?: boolean;
}) {
  return (
    <div className="p-4 rounded-lg border bg-white flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <code className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{coupon.code}</code>
          <Badge variant={coupon.type === 'free_forever' ? 'default' : 'secondary'} className="text-xs">
            {coupon.type === 'free_forever' ? 'Free Forever' : `${coupon.trialDays} Day Trial`}
          </Badge>
          {!coupon.active && !isArchived && (
            <Badge variant="outline" className="text-xs">Disabled</Badge>
          )}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {coupon.allowedPlans.length > 0
            ? `For ${coupon.allowedPlans.map(p => p === 'starter' ? 'Starter' : 'Business').join(', ')}`
            : 'All plans'}{' '}
          • Used {coupon.currentRedemptions}
          {coupon.maxRedemptions ? `/${coupon.maxRedemptions}` : ''} times
          {coupon.expiresAt && ` • Expires ${format(new Date(coupon.expiresAt), 'MMM d, yyyy')}`}
        </div>
      </div>
      {!isArchived && (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onToggle} title={coupon.active ? 'Disable' : 'Enable'}>
            {coupon.active ? <ToggleRight className="h-5 w-5 text-green-600" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onArchive} title="Archive">
            <Archive className="h-4 w-4 text-muted-foreground" />
          </Button>
          {coupon.currentRedemptions === 0 && (
            <Button variant="ghost" size="sm" onClick={onDelete} title="Delete">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      )}
      {isArchived && coupon.currentRedemptions === 0 && (
        <Button variant="ghost" size="sm" onClick={onDelete} title="Delete">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      )}
    </div>
  );
}
