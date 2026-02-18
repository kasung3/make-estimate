'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Save, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface PdfThemeConfig {
  header: {
    borderColor: string;
    titleColor: string;
    subtitleColor: string;
  };
  categoryHeader: {
    backgroundPrimary: string;
    backgroundSecondary: string;
    textColor: string;
  };
  table: {
    headerBackground: string;
    headerTextColor: string;
    borderColor: string;
    bodyTextColor: string;
  };
  subtotalRow: {
    background: string;
    borderColor: string;
    textColor: string;
  };
  noteRow: {
    background: string;
    textColor: string;
  };
  totals: {
    finalTotalBackground: string;
    finalTotalTextColor: string;
  };
}

interface ThemeEditorClientProps {
  theme: {
    id: string;
    name: string;
    isDefault: boolean;
    config: PdfThemeConfig | null;
  };
  companyName: string;
}

const getDefaultThemeConfig = (): PdfThemeConfig => ({
  header: {
    borderColor: '#0891b2',
    titleColor: '#0891b2',
    subtitleColor: '#666666',
  },
  categoryHeader: {
    backgroundPrimary: '#0891b2',
    backgroundSecondary: '#14b8a6',
    textColor: '#ffffff',
  },
  table: {
    headerBackground: '#f9fafb',
    headerTextColor: '#6b7280',
    borderColor: '#e5e7eb',
    bodyTextColor: '#333333',
  },
  subtotalRow: {
    background: '#f0fdfa',
    borderColor: '#14b8a6',
    textColor: '#333333',
  },
  noteRow: {
    background: '#fffbeb',
    textColor: '#92400e',
  },
  totals: {
    finalTotalBackground: '#0891b2',
    finalTotalTextColor: '#ffffff',
  },
});

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border cursor-pointer"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 h-8 text-xs font-mono"
        />
      </div>
    </div>
  );
}

function ThemePreview({ config }: { config: PdfThemeConfig }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-3" style={{ borderBottom: `2px solid ${config.header.borderColor}` }}>
        <div className="text-base font-bold" style={{ color: config.header.titleColor }}>Sample Project Name</div>
        <div className="text-xs" style={{ color: config.header.subtitleColor }}>Customer: John Doe</div>
      </div>
      <div className="p-3">
        <div
          className="px-2 py-1 rounded-t text-xs font-bold"
          style={{
            background: `linear-gradient(135deg, ${config.categoryHeader.backgroundPrimary}, ${config.categoryHeader.backgroundSecondary})`,
            color: config.categoryHeader.textColor,
          }}
        >
          1. Sample Category
        </div>
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th className="px-2 py-1 text-left font-semibold text-[10px] uppercase" style={{ backgroundColor: config.table.headerBackground, color: config.table.headerTextColor, border: `1px solid ${config.table.borderColor}` }}>Item</th>
              <th className="px-2 py-1 text-left font-semibold text-[10px] uppercase" style={{ backgroundColor: config.table.headerBackground, color: config.table.headerTextColor, border: `1px solid ${config.table.borderColor}` }}>Description</th>
              <th className="px-2 py-1 text-right font-semibold text-[10px] uppercase" style={{ backgroundColor: config.table.headerBackground, color: config.table.headerTextColor, border: `1px solid ${config.table.borderColor}` }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1" style={{ border: `1px solid ${config.table.borderColor}`, color: config.table.bodyTextColor }}>1.1</td>
              <td className="px-2 py-1" style={{ border: `1px solid ${config.table.borderColor}`, color: config.table.bodyTextColor }}>Sample item</td>
              <td className="px-2 py-1 text-right" style={{ border: `1px solid ${config.table.borderColor}`, color: config.table.bodyTextColor }}>1,000.00</td>
            </tr>
            <tr style={{ backgroundColor: config.noteRow.background }}>
              <td colSpan={3} className="px-2 py-1 italic text-[10px]" style={{ color: config.noteRow.textColor, border: `1px solid ${config.table.borderColor}` }}>Note: Sample note text</td>
            </tr>
            <tr style={{ backgroundColor: config.subtotalRow.background }}>
              <td colSpan={2} className="px-2 py-1 font-bold" style={{ color: config.subtotalRow.textColor, borderLeft: `2px solid ${config.subtotalRow.borderColor}` }}>Category Subtotal</td>
              <td className="px-2 py-1 text-right font-bold" style={{ color: config.subtotalRow.textColor }}>1,000.00</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-2 flex justify-end">
          <div className="px-3 py-1 rounded font-bold text-sm" style={{ backgroundColor: config.totals.finalTotalBackground, color: config.totals.finalTotalTextColor }}>Grand Total: $1,000.00</div>
        </div>
      </div>
    </div>
  );
}

export function ThemeEditorClient({ theme, companyName }: ThemeEditorClientProps) {
  const router = useRouter();
  const [name, setName] = useState(theme.name);
  const [config, setConfig] = useState<PdfThemeConfig>(theme.config || getDefaultThemeConfig());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateConfig = useCallback((section: keyof PdfThemeConfig, key: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
    setSaved(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/pdf-themes/${theme.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, configJson: config }),
      });
      if (!response.ok) throw new Error('Failed to save');
      toast.success('Theme saved!');
      setSaved(true);
    } catch (error) {
      toast.error('Failed to save theme');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/app/templates?tab=boq">
              <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit BOQ Theme</h1>
              <p className="text-gray-500">Customize colors for your PDF exports</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">Theme Name</CardTitle></CardHeader>
              <CardContent>
                <Input value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} placeholder="Theme name" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Header Colors</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                <ColorRow label="Border Color" value={config.header.borderColor} onChange={(v) => updateConfig('header', 'borderColor', v)} />
                <ColorRow label="Title Color" value={config.header.titleColor} onChange={(v) => updateConfig('header', 'titleColor', v)} />
                <ColorRow label="Subtitle Color" value={config.header.subtitleColor} onChange={(v) => updateConfig('header', 'subtitleColor', v)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Category Header</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                <ColorRow label="Primary Background" value={config.categoryHeader.backgroundPrimary} onChange={(v) => updateConfig('categoryHeader', 'backgroundPrimary', v)} />
                <ColorRow label="Secondary Background" value={config.categoryHeader.backgroundSecondary} onChange={(v) => updateConfig('categoryHeader', 'backgroundSecondary', v)} />
                <ColorRow label="Text Color" value={config.categoryHeader.textColor} onChange={(v) => updateConfig('categoryHeader', 'textColor', v)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Table Colors</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                <ColorRow label="Header Background" value={config.table.headerBackground} onChange={(v) => updateConfig('table', 'headerBackground', v)} />
                <ColorRow label="Header Text" value={config.table.headerTextColor} onChange={(v) => updateConfig('table', 'headerTextColor', v)} />
                <ColorRow label="Border Color" value={config.table.borderColor} onChange={(v) => updateConfig('table', 'borderColor', v)} />
                <ColorRow label="Body Text" value={config.table.bodyTextColor} onChange={(v) => updateConfig('table', 'bodyTextColor', v)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Special Rows</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                <ColorRow label="Subtotal Background" value={config.subtotalRow.background} onChange={(v) => updateConfig('subtotalRow', 'background', v)} />
                <ColorRow label="Subtotal Border" value={config.subtotalRow.borderColor} onChange={(v) => updateConfig('subtotalRow', 'borderColor', v)} />
                <ColorRow label="Note Background" value={config.noteRow.background} onChange={(v) => updateConfig('noteRow', 'background', v)} />
                <ColorRow label="Note Text" value={config.noteRow.textColor} onChange={(v) => updateConfig('noteRow', 'textColor', v)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Totals</CardTitle></CardHeader>
              <CardContent className="space-y-1">
                <ColorRow label="Total Background" value={config.totals.finalTotalBackground} onChange={(v) => updateConfig('totals', 'finalTotalBackground', v)} />
                <ColorRow label="Total Text" value={config.totals.finalTotalTextColor} onChange={(v) => updateConfig('totals', 'finalTotalTextColor', v)} />
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-6 space-y-4">
            <h3 className="font-semibold text-gray-700">Live Preview</h3>
            <ThemePreview config={config} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
