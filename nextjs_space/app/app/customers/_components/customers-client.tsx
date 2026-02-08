'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Search, Users, Mail, Phone, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { CustomerType } from '@/lib/types';

interface CustomersClientProps {
  customers: CustomerType[];
}

export function CustomersClient({ customers: initialCustomers }: CustomersClientProps) {
  const [customers, setCustomers] = useState(initialCustomers ?? []);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredCustomers = (customers ?? []).filter(
    (customer) =>
      customer?.name?.toLowerCase()?.includes?.(searchQuery?.toLowerCase?.() ?? '') ||
      customer?.email?.toLowerCase()?.includes?.(searchQuery?.toLowerCase?.() ?? '')
  );

  const handleCreate = async () => {
    if (!newName?.trim?.()) {
      toast.error('Please enter a customer name');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          email: newEmail || null,
          phone: newPhone || null,
          address: newAddress || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || 'Failed to create customer');
        return;
      }

      setCustomers([...(customers ?? []), data]);
      setShowNewDialog(false);
      setNewName('');
      setNewEmail('');
      setNewPhone('');
      setNewAddress('');
      toast.success('Customer created');
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (customerId: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        toast.error('Failed to delete customer');
        return;
      }

      setCustomers((customers ?? []).filter((c) => c?.id !== customerId));
      toast.success('Customer deleted');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-500 mt-1">Manage your customer database</p>
          </div>
          <Button onClick={() => setShowNewDialog(true)} className="shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-lg">All Customers ({filteredCustomers?.length ?? 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {(filteredCustomers?.length ?? 0) === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No customers found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowNewDialog(true)}
                >
                  Add your first customer
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {(filteredCustomers ?? []).map((customer) => (
                  <div
                    key={customer?.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {customer?.name?.charAt?.(0)?.toUpperCase?.() ?? 'C'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{customer?.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          {customer?.email && (
                            <span className="flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {customer.email}
                            </span>
                          )}
                          {customer?.phone && (
                            <span className="flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {customer.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                      onClick={() => handleDelete(customer?.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Customer name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@email.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={loading}>
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
