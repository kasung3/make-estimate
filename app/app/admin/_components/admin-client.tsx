'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
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
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

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
  billing: { planKey: string | null; status: string | null } | null;
}

interface UserAccount {
  id: string;
  email: string;
  name: string | null;
  isBlocked: boolean;
  blockReason: string | null;
  createdAt: string;
  memberships: { company: { id: string; name: string } }[];
}

export function AdminClient() {
  const [activeTab, setActiveTab] = useState('coupons');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [blockTarget, setBlockTarget] = useState<{ type: 'company' | 'user'; id: string; name: string; isBlocked: boolean } | null>(null);
  const [blockReason, setBlockReason] = useState('');

  // New coupon form
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'trial_days' as CouponType,
    trialDays: 14,
    allowedPlans: [] as PlanKey[],
    maxRedemptions: '',
    expiresAt: '',
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (activeTab === 'coupons') {
      fetchCoupons();
    } else if (activeTab === 'companies') {
      fetchCompanies();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/accounts?type=users');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

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
      setShowCreateDialog(false);
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

  const openBlockDialog = (type: 'company' | 'user', id: string, name: string, isBlocked: boolean) => {
    setBlockTarget({ type, id, name, isBlocked });
    setBlockReason('');
    setShowBlockDialog(true);
  };

  const handleBlockToggle = async () => {
    if (!blockTarget) return;
    try {
      const res = await fetch('/api/admin/accounts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: blockTarget.type,
          id: blockTarget.id,
          isBlocked: !blockTarget.isBlocked,
          blockReason: !blockTarget.isBlocked ? blockReason : undefined,
        }),
      });
      if (!res.ok) throw new Error('Failed to update');
      toast.success(blockTarget.isBlocked ? 'Unblocked successfully' : 'Blocked successfully');
      setShowBlockDialog(false);
      if (blockTarget.type === 'company') fetchCompanies();
      else fetchUsers();
    } catch (err) {
      toast.error('Failed to update block status');
    }
  };

  const activeCoupons = coupons.filter(c => !c.archived);
  const archivedCoupons = coupons.filter(c => c.archived);

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Platform Admin</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="coupons" className="gap-2">
              <Ticket className="h-4 w-4" />
              Coupons
            </TabsTrigger>
            <TabsTrigger value="companies" className="gap-2">
              <Building2 className="h-4 w-4" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Coupons Tab */}
          <TabsContent value="coupons">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Promo Codes / Coupons</CardTitle>
                <Button onClick={() => setShowCreateDialog(true)} size="sm">
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
                              {company.isBlocked && (
                                <Badge variant="destructive" className="text-xs">
                                  Blocked
                                </Badge>
                              )}
                              {company.billing?.planKey && (
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {company.billing.planKey}
                                </Badge>
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
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No users found</p>
                ) : (
                  <div className="space-y-3">
                    {users.map(user => (
                      <div
                        key={user.id}
                        className={`p-4 rounded-lg border ${user.isBlocked ? 'bg-red-50 border-red-200' : 'bg-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{user.email}</span>
                              {user.isBlocked && (
                                <Badge variant="destructive" className="text-xs">
                                  Blocked
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {user.name || 'No name'} •{' '}
                              {user.memberships.length > 0
                                ? user.memberships.map(m => m.company.name).join(', ')
                                : 'No company'} •{' '}
                              Joined {format(new Date(user.createdAt), 'MMM d, yyyy')}
                            </div>
                            {user.isBlocked && user.blockReason && (
                              <div className="text-sm text-red-600 mt-1">Reason: {user.blockReason}</div>
                            )}
                          </div>
                          <Button
                            variant={user.isBlocked ? 'outline' : 'destructive'}
                            size="sm"
                            onClick={() => openBlockDialog('user', user.id, user.email, user.isBlocked)}
                          >
                            {user.isBlocked ? (
                              <><ShieldOff className="h-4 w-4 mr-2" /> Unblock</>
                            ) : (
                              <><Shield className="h-4 w-4 mr-2" /> Block</>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Coupon Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
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
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={createCoupon} disabled={creating}>
                {creating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create Coupon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Block/Unblock Dialog */}
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
                  : `Are you sure you want to block "${blockTarget?.name}"? They will not be able to create new BOQs.`}
              </p>
              {!blockTarget?.isBlocked && (
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
