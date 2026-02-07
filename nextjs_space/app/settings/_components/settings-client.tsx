'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, DollarSign, Loader2, Save, Percent } from 'lucide-react';
import toast from 'react-hot-toast';
import { CompanySettings } from '@/lib/types';

interface SettingsClientProps {
  company: CompanySettings;
}

export function SettingsClient({ company: initialCompany }: SettingsClientProps) {
  const [company, setCompany] = useState<CompanySettings>(initialCompany);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: company?.name,
          currencySymbol: company?.currencySymbol,
          currencyPosition: company?.currencyPosition,
          defaultVatPercent: company?.defaultVatPercent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your company settings</p>
        </div>

        <div className="space-y-6">
          <Card className="shadow-md border-0">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Company Information</CardTitle>
                  <CardDescription>Update your company details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={company?.name ?? ''}
                  onChange={(e) => setCompany({ ...(company ?? {}), name: e.target.value } as CompanySettings)}
                  placeholder="Enter company name"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-400 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Currency Settings</CardTitle>
                  <CardDescription>Configure how currency is displayed</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currencySymbol">Currency Symbol</Label>
                <Input
                  id="currencySymbol"
                  value={company?.currencySymbol ?? ''}
                  onChange={(e) =>
                    setCompany({ ...(company ?? {}), currencySymbol: e.target.value } as CompanySettings)
                  }
                  placeholder="Rs."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currencyPosition">Symbol Position</Label>
                <Select
                  value={company?.currencyPosition ?? 'left'}
                  onValueChange={(value) =>
                    setCompany({ ...(company ?? {}), currencyPosition: value } as CompanySettings)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left ({company?.currencySymbol || 'Rs.'}1,000)</SelectItem>
                    <SelectItem value="right">Right (1,000{company?.currencySymbol || 'Rs.'})</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Preview</p>
                <p className="text-2xl font-bold text-gray-900">
                  {company?.currencyPosition === 'left'
                    ? `${company?.currencySymbol ?? 'Rs.'}1,234.56`
                    : `1,234.56${company?.currencySymbol ?? 'Rs.'}`}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center">
                  <Percent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Default VAT Settings</CardTitle>
                  <CardDescription>Set the default VAT percentage for new BOQs</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultVatPercent">Default VAT Percentage</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="defaultVatPercent"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={company?.defaultVatPercent ?? 18}
                    onChange={(e) =>
                      setCompany({ ...(company ?? {}), defaultVatPercent: parseFloat(e.target.value) || 0 } as CompanySettings)
                    }
                    className="w-24"
                  />
                  <span className="text-gray-500">%</span>
                </div>
                <p className="text-sm text-gray-500">This percentage will be used as the default VAT for all new BOQs.</p>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
