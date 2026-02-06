'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BoqWithRelations, CustomerType, CompanySettings } from '@/lib/types';

interface DashboardClientProps {
  boqs: BoqWithRelations[];
  customers: CustomerType[];
  company: CompanySettings;
}

export function DashboardClient({ boqs: initialBoqs, customers: initialCustomers, company }: DashboardClientProps) {
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);

  const currencySymbol = company?.currencySymbol ?? 'Rs.';
  const currencyPosition = company?.currencyPosition ?? 'left';

  const formatCurrency = (amount: number) => {
    const formatted = amount?.toFixed?.(2) ?? '0.00';
    return currencyPosition === 'left'
      ? `${currencySymbol}${formatted}`
      : `${formatted}${currencySymbol}`;
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
    if (!newProjectName?.trim?.()) {
      toast.error('Please enter a project name');
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
        toast.error(data?.error || 'Failed to create BOQ');
        return;
      }

      setShowNewBoqDialog(false);
      setNewProjectName('');
      setSelectedCustomerId('');
      router.push(`/boq/${data?.id}`);
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

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your BOQs and estimates</p>
          </div>
          <Button onClick={() => setShowNewBoqDialog(true)} className="shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            New BOQ
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-700">Total BOQs</p>
                  <p className="text-3xl font-bold text-cyan-900">{boqs?.length ?? 0}</p>
                </div>
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal-700">Total Value</p>
                  <p className="text-2xl font-bold text-teal-900">
                    {formatCurrency(totalValue)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">Customers</p>
                  <p className="text-3xl font-bold text-emerald-900">{customers?.length ?? 0}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">This Month</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {(boqs ?? []).filter(
                      (b) =>
                        new Date(b?.createdAt ?? 0).getMonth() === new Date().getMonth()
                    )?.length ?? 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
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
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => router.push(`/boq/${boq?.id}`)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {boq?.projectName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {boq?.customer?.name || 'No customer'} •{' '}
                          {format(new Date(boq?.updatedAt ?? Date.now()), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatCurrency(calculateBoqTotal(boq))}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
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
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="Enter project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Customer (Optional)</Label>
                <div className="flex space-x-2">
                  <Select
                    value={selectedCustomerId}
                    onValueChange={setSelectedCustomerId}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
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
