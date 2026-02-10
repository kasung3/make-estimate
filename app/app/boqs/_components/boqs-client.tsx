'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
  Loader2,
  Trash2,
  AlertTriangle,
  Calendar,
  User,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BillingStatus, BoqWithRelations, CustomerType } from '@/lib/types';
import Link from 'next/link';

interface BoqsClientProps {
  initialBoqs: BoqWithRelations[];
  billingStatus: BillingStatus;
  company: {
    currencySymbol: string;
    currencyPosition: string;
  };
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

function formatNumber(num: number): string {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculateBoqTotal(boq: BoqWithRelations): number {
  let subtotal = 0;
  (boq.categories || []).forEach((cat) => {
    (cat.items || []).forEach((item) => {
      if (item.isNote) return; // Skip notes
      const markup = item.markupPct ?? 0;
      const qty = item.quantity ?? 1;
      const unitWithMarkup = (item.unitCost ?? 0) * (1 + markup / 100);
      subtotal += unitWithMarkup * qty;
    });
  });
  
  // Apply discount
  if (boq.discountEnabled && boq.discountValue > 0) {
    if (boq.discountType === 'PERCENTAGE' as any) {
      subtotal = subtotal * (1 - boq.discountValue / 100);
    } else {
      subtotal = subtotal - boq.discountValue;
    }
  }
  
  // Apply VAT
  if (boq.vatEnabled && boq.vatPercent > 0) {
    subtotal = subtotal * (1 + boq.vatPercent / 100);
  }
  
  return subtotal;
}

export function BoqsClient({ initialBoqs, billingStatus, company }: BoqsClientProps) {
  const router = useRouter();
  const [boqs, setBoqs] = useState<BoqWithRelations[]>(initialBoqs ?? []);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewBoqDialog, setShowNewBoqDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [boqToDelete, setBoqToDelete] = useState<BoqWithRelations | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const currencySymbol = company?.currencySymbol ?? 'Rs.';
  const currencyPosition = company?.currencyPosition ?? 'left';

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch customers for the new BOQ dialog
  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => setCustomers(data ?? []))
      .catch(() => {});
  }, []);

  // Prefetch BOQ pages on mount
  useEffect(() => {
    boqs.slice(0, 5).forEach(boq => {
      router.prefetch(`/app/boq/${boq.id}`);
    });
  }, [boqs, router]);

  // Filter BOQs based on search query
  const filteredBoqs = useMemo(() => {
    if (!debouncedSearch.trim()) return boqs;
    
    const query = debouncedSearch.toLowerCase();
    return boqs.filter(boq => {
      const projectName = boq.projectName?.toLowerCase() ?? '';
      const customerName = boq.customer?.name?.toLowerCase() ?? '';
      const reference = boq.id?.toLowerCase() ?? '';
      
      return (
        projectName.includes(query) ||
        customerName.includes(query) ||
        reference.includes(query)
      );
    });
  }, [boqs, debouncedSearch]);

  const formatCurrency = (amount: number) => {
    const formatted = formatNumber(amount);
    return currencyPosition === 'left' 
      ? `${currencySymbol} ${formatted}` 
      : `${formatted} ${currencySymbol}`;
  };

  const handleCreateBoq = async () => {
    if (!newProjectName?.trim?.()) {
      toast.error('Please enter a project name');
      return;
    }

    // Check if can create BOQ
    if (!billingStatus.canCreateBoq) {
      toast.error('BOQ limit reached. Please upgrade your plan.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/boqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: newProjectName,
          customerId: selectedCustomerId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.code === 'LIMIT_EXCEEDED') {
          toast.error(
            <div className="flex flex-col gap-1">
              <span className="font-medium">BOQ limit reached</span>
              <span className="text-sm">{data.message}</span>
            </div>
          );
        } else {
          toast.error(data?.error || 'Failed to create BOQ');
        }
        return;
      }

      toast.success('BOQ created!');
      setShowNewBoqDialog(false);
      setNewProjectName('');
      setSelectedCustomerId('');
      router.push(`/app/boq/${data.id}`);
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (boq: BoqWithRelations) => {
    setBoqToDelete(boq);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!boqToDelete) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/boqs/${boqToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        toast.error('Failed to delete BOQ');
        return;
      }

      setBoqs(prev => prev.filter(b => b.id !== boqToDelete.id));
      toast.success('BOQ deleted');
      setShowDeleteDialog(false);
      setBoqToDelete(null);
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setDeleting(false);
    }
  };

  const handleBoqHover = useCallback((boqId: string) => {
    router.prefetch(`/app/boq/${boqId}`);
  }, [router]);

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">BOQs</h1>
            <p className="text-gray-500 mt-1">Manage your Bills of Quantities</p>
          </div>
          <Button 
            onClick={() => setShowNewBoqDialog(true)} 
            className="shadow-md"
            disabled={!billingStatus.canCreateBoq}
          >
            <Plus className="w-4 h-4 mr-2" />
            New BOQ
          </Button>
        </div>

        {/* Quota Warning */}
        {!billingStatus.canCreateBoq && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-amber-800 font-medium">BOQ limit reached</p>
              <p className="text-amber-700 text-sm mt-1">
                You've used {billingStatus.boqsUsedThisPeriod} of {billingStatus.boqLimit} BOQs this period.
              </p>
              <Link href="/pricing">
                <Button variant="outline" size="sm" className="mt-2 border-amber-300 text-amber-700 hover:bg-amber-100">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search BOQs by project, customer, reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* BOQ List */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-lg">All BOQs ({filteredBoqs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBoqs.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchQuery ? 'No BOQs match your search' : 'No BOQs yet'}
                </p>
                {!searchQuery && billingStatus.canCreateBoq && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setShowNewBoqDialog(true)}
                  >
                    Create your first BOQ
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBoqs.map((boq) => (
                  <div
                    key={boq.id}
                    onMouseEnter={() => handleBoqHover(boq.id)}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => router.push(`/app/boq/${boq.id}`)}
                  >
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-lavender-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 truncate" title={boq.projectName}>
                          {boq.projectName}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                          {boq.customer && (
                            <span className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {boq.customer.name}
                            </span>
                          )}
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {format(new Date(boq.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 sm:mt-0">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 tabular-nums">
                          {formatCurrency(calculateBoqTotal(boq))}
                        </p>
                        <Badge variant={boq.status === 'draft' ? 'secondary' : 'default'} className="text-xs">
                          {boq.status}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(boq);
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
              <DialogDescription>
                Start a new Bill of Quantities for your project.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="e.g., Kitchen Renovation"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer">Customer (Optional)</Label>
                <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No customer</SelectItem>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewBoqDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateBoq} disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Create BOQ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Delete BOQ?
              </DialogTitle>
              <DialogDescription>
                This will permanently delete <strong>"{boqToDelete?.projectName}"</strong> and all its items. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={deleting}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleting}>
                {deleting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
