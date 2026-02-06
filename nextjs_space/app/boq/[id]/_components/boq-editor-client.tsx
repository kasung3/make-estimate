'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
  Loader2,
  FileDown,
  Check,
  GripVertical,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BoqWithRelations, CategoryWithItems, BoqItemType, CustomerType, CompanySettings } from '@/lib/types';

interface BoqEditorClientProps {
  boq: BoqWithRelations;
  customers: CustomerType[];
  company: CompanySettings;
}

export function BoqEditorClient({ boq: initialBoq, customers: initialCustomers, company }: BoqEditorClientProps) {
  const router = useRouter();
  const [boq, setBoq] = useState<BoqWithRelations>(initialBoq);
  const [customers, setCustomers] = useState(initialCustomers ?? []);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set((initialBoq?.categories ?? []).map((c) => c?.id))
  );
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [exportingPdf, setExportingPdf] = useState(false);
  
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currencySymbol = company?.currencySymbol ?? 'Rs.';
  const currencyPosition = company?.currencyPosition ?? 'left';

  const formatCurrency = (amount: number) => {
    const formatted = (amount ?? 0)?.toFixed?.(2) ?? '0.00';
    return currencyPosition === 'left'
      ? `${currencySymbol}${formatted}`
      : `${formatted}${currencySymbol}`;
  };

  const calculateTotals = useCallback(() => {
    let subtotal = 0;
    let totalCost = 0;

    (boq?.categories ?? []).forEach((cat) => {
      (cat?.items ?? []).forEach((item) => {
        const qty = item?.quantity ?? 0;
        if (qty > 0) {
          const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
          subtotal += unitPrice * qty;
          totalCost += (item?.unitCost ?? 0) * qty;
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
    const finalTotal = afterDiscount + vatAmount;
    const profit = subtotal - totalCost;
    const grossProfitPct = subtotal > 0 ? (profit / subtotal) * 100 : 0;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      vatAmount: Math.round(vatAmount * 100) / 100,
      finalTotal: Math.round(finalTotal * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      totalPriceQuoted: Math.round(subtotal * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      grossProfitPct: Math.round(grossProfitPct * 100) / 100,
    };
  }, [boq]);

  const totals = calculateTotals();

  const autosave = useCallback(async () => {
    setSaving(true);
    try {
      await fetch(`/api/boqs/${boq?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: boq?.projectName,
          customerId: boq?.customerId,
          discountType: boq?.discountType,
          discountValue: boq?.discountValue,
          vatEnabled: boq?.vatEnabled,
          vatPercent: boq?.vatPercent,
          status: boq?.status,
        }),
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Autosave failed:', error);
    } finally {
      setSaving(false);
    }
  }, [boq]);

  const triggerAutosave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      autosave();
    }, 1500);
  }, [autosave]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const updateBoq = (updates: Partial<BoqWithRelations>) => {
    setBoq((prev) => ({ ...(prev ?? {}), ...updates } as BoqWithRelations));
    triggerAutosave();
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boqId: boq?.id,
          name: 'New Category',
          sortOrder: (boq?.categories?.length ?? 0),
        }),
      });

      const newCategory = await response.json();
      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: [...(prev?.categories ?? []), { ...newCategory, items: [] }],
      } as BoqWithRelations));
      setExpandedCategories((prev) => new Set([...prev, newCategory?.id]));
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  const handleUpdateCategory = async (categoryId: string, name: string) => {
    try {
      await fetch(`/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: (prev?.categories ?? []).map((cat) =>
          cat?.id === categoryId ? { ...(cat ?? {}), name } : cat
        ),
      } as BoqWithRelations));
    } catch (error) {
      toast.error('Failed to update category');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Delete this category and all its items?')) return;

    try {
      await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      });

      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: (prev?.categories ?? []).filter((cat) => cat?.id !== categoryId),
      } as BoqWithRelations));
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleAddItem = async (categoryId: string) => {
    const category = (boq?.categories ?? []).find((c) => c?.id === categoryId);
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId,
          description: '',
          unit: '',
          unitCost: 0,
          markupPct: 0,
          quantity: 0,
          sortOrder: category?.items?.length ?? 0,
        }),
      });

      const newItem = await response.json();
      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: (prev?.categories ?? []).map((cat) =>
          cat?.id === categoryId
            ? { ...(cat ?? {}), items: [...(cat?.items ?? []), newItem] }
            : cat
        ),
      } as BoqWithRelations));
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const handleUpdateItem = async (itemId: string, updates: Partial<BoqItemType>) => {
    try {
      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: (prev?.categories ?? []).map((cat) => ({
          ...(cat ?? {}),
          items: (cat?.items ?? []).map((item) =>
            item?.id === itemId ? { ...(item ?? {}), ...updates } : item
          ),
        })),
      } as BoqWithRelations));
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });

      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: (prev?.categories ?? []).map((cat) => ({
          ...(cat ?? {}),
          items: (cat?.items ?? []).filter((item) => item?.id !== itemId),
        })),
      } as BoqWithRelations));
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const handleCreateCustomer = async () => {
    if (!newCustomerName?.trim?.()) {
      toast.error('Please enter a customer name');
      return;
    }

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
      updateBoq({ customerId: data?.id });
      setShowNewCustomerDialog(false);
      setNewCustomerName('');
      setNewCustomerEmail('');
      setNewCustomerPhone('');
      toast.success('Customer created');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleExportPdf = async () => {
    setExportingPdf(true);
    try {
      const response = await fetch(`/api/boqs/${boq?.id}/pdf`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${boq?.projectName ?? 'BOQ'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('PDF downloaded');
    } catch (error) {
      toast.error('Failed to export PDF');
    } finally {
      setExportingPdf(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const getCategorySubtotal = (category: CategoryWithItems) => {
    return (category?.items ?? []).reduce((sum, item) => {
      const qty = item?.quantity ?? 0;
      if (qty > 0) {
        const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
        return sum + unitPrice * qty;
      }
      return sum;
    }, 0);
  };

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <Input
                value={boq?.projectName ?? ''}
                onChange={(e) => updateBoq({ projectName: e.target.value })}
                className="text-xl font-semibold border-0 p-0 h-auto focus-visible:ring-0 bg-transparent"
                placeholder="Project Name"
              />
              <div className="flex items-center space-x-2 mt-1">
                <Select
                  value={boq?.customerId ?? 'none'}
                  onValueChange={(value) =>
                    updateBoq({ customerId: value === 'none' ? null : value })
                  }
                >
                  <SelectTrigger className="h-8 text-sm w-[200px]">
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
                  size="sm"
                  onClick={() => setShowNewCustomerDialog(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-sm text-gray-500">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  Saving...
                </>
              ) : lastSaved ? (
                <>
                  <Check className="w-4 h-4 text-green-500 mr-1" />
                  Saved
                </>
              ) : null}
            </div>
            <Button
              variant="outline"
              onClick={handleExportPdf}
              disabled={exportingPdf}
            >
              {exportingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <FileDown className="w-4 h-4 mr-2" />
              )}
              Export PDF
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Categories & Items */}
            <div className="lg:col-span-2 space-y-4">
              {(boq?.categories ?? []).map((category, catIndex) => (
                <Card key={category?.id} className="shadow-md border-0 overflow-hidden">
                  <Collapsible
                    open={expandedCategories.has(category?.id)}
                    onOpenChange={() => toggleCategory(category?.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <GripVertical className="w-5 h-5 text-gray-400" />
                            <Input
                              value={category?.name ?? ''}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleUpdateCategory(category?.id, e.target.value);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="text-lg font-semibold border-0 p-0 h-auto focus-visible:ring-0 bg-transparent w-auto"
                            />
                            <span className="text-sm text-gray-500">
                              ({category?.items?.length ?? 0} items)
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-cyan-600">
                              {formatCurrency(getCategorySubtotal(category))}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCategory(category?.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            {expandedCategories.has(category?.id) ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-2 font-medium text-gray-500 w-8">#</th>
                                <th className="text-left py-2 px-2 font-medium text-gray-500">Description</th>
                                <th className="text-left py-2 px-2 font-medium text-gray-500 w-20">Unit</th>
                                <th className="text-right py-2 px-2 font-medium text-gray-500 w-24">Unit Cost</th>
                                <th className="text-right py-2 px-2 font-medium text-gray-500 w-20">Markup %</th>
                                <th className="text-right py-2 px-2 font-medium text-gray-500 w-24">Unit Price</th>
                                <th className="text-right py-2 px-2 font-medium text-gray-500 w-20">Qty</th>
                                <th className="text-right py-2 px-2 font-medium text-gray-500 w-28">Amount</th>
                                <th className="w-10"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {(category?.items ?? []).map((item, itemIndex) => {
                                const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
                                const amount = unitPrice * (item?.quantity ?? 0);
                                return (
                                  <tr key={item?.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-2 px-2 text-gray-500">
                                      {catIndex + 1}.{itemIndex + 1}
                                    </td>
                                    <td className="py-2 px-2">
                                      <Input
                                        value={item?.description ?? ''}
                                        onChange={(e) =>
                                          handleUpdateItem(item?.id, {
                                            description: e.target.value,
                                          })
                                        }
                                        className="h-8 text-sm"
                                        placeholder="Description"
                                      />
                                    </td>
                                    <td className="py-2 px-2">
                                      <Input
                                        value={item?.unit ?? ''}
                                        onChange={(e) =>
                                          handleUpdateItem(item?.id, {
                                            unit: e.target.value,
                                          })
                                        }
                                        className="h-8 text-sm"
                                        placeholder="Unit"
                                      />
                                    </td>
                                    <td className="py-2 px-2">
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={item?.unitCost ?? 0}
                                        onChange={(e) =>
                                          handleUpdateItem(item?.id, {
                                            unitCost: parseFloat(e.target.value) || 0,
                                          })
                                        }
                                        className="h-8 text-sm text-right"
                                      />
                                    </td>
                                    <td className="py-2 px-2">
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={item?.markupPct ?? 0}
                                        onChange={(e) =>
                                          handleUpdateItem(item?.id, {
                                            markupPct: parseFloat(e.target.value) || 0,
                                          })
                                        }
                                        className="h-8 text-sm text-right"
                                      />
                                    </td>
                                    <td className="py-2 px-2 text-right font-medium text-gray-700">
                                      {unitPrice?.toFixed?.(2) ?? '0.00'}
                                    </td>
                                    <td className="py-2 px-2">
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={item?.quantity ?? 0}
                                        onChange={(e) =>
                                          handleUpdateItem(item?.id, {
                                            quantity: parseFloat(e.target.value) || 0,
                                          })
                                        }
                                        className="h-8 text-sm text-right"
                                      />
                                    </td>
                                    <td className="py-2 px-2 text-right font-semibold text-cyan-600">
                                      {formatCurrency(amount)}
                                    </td>
                                    <td className="py-2 px-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                                        onClick={() => handleDeleteItem(item?.id)}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <Button
                          variant="ghost"
                          className="mt-3 w-full text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                          onClick={() => handleAddItem(category?.id)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
              <Button
                variant="outline"
                className="w-full border-dashed border-2"
                onClick={handleAddCategory}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>

            {/* Totals Panel */}
            <div className="space-y-4">
              <Card className="shadow-md border-0 bg-gradient-to-br from-cyan-50 to-teal-50">
                <CardHeader>
                  <CardTitle className="text-lg">Totals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-600">Discount</Label>
                    <div className="flex space-x-2">
                      <Select
                        value={boq?.discountType ?? 'percent'}
                        onValueChange={(value) =>
                          updateBoq({ discountType: value as 'percent' | 'fixed' })
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percent">%</SelectItem>
                          <SelectItem value="fixed">Fixed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        step="0.01"
                        value={boq?.discountValue ?? 0}
                        onChange={(e) =>
                          updateBoq({ discountValue: parseFloat(e.target.value) || 0 })
                        }
                        className="flex-1"
                      />
                    </div>
                    {totals.discount > 0 && (
                      <p className="text-sm text-gray-500">-{formatCurrency(totals.discount)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-600">VAT</Label>
                      <Switch
                        checked={boq?.vatEnabled ?? false}
                        onCheckedChange={(checked) => updateBoq({ vatEnabled: checked })}
                      />
                    </div>
                    {boq?.vatEnabled && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={boq?.vatPercent ?? 0}
                          onChange={(e) =>
                            updateBoq({ vatPercent: parseFloat(e.target.value) || 0 })
                          }
                          className="w-20"
                        />
                        <span className="text-gray-500">%</span>
                        <span className="flex-1 text-right text-gray-500">
                          +{formatCurrency(totals.vatAmount)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center py-3 border-t-2 border-cyan-200">
                    <span className="text-lg font-semibold text-gray-900">Final Total</span>
                    <span className="text-2xl font-bold text-cyan-600">
                      {formatCurrency(totals.finalTotal)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Profit Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Cost</span>
                    <span className="font-medium">{formatCurrency(totals.totalCost)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price Quoted</span>
                    <span className="font-medium">{formatCurrency(totals.totalPriceQuoted)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Profit</span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(totals.profit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gross Profit %</span>
                    <span className="font-semibold text-emerald-600">
                      {totals.grossProfitPct?.toFixed?.(2) ?? '0.00'}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

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
              <Button variant="outline" onClick={() => setShowNewCustomerDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCustomer}>Add Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
