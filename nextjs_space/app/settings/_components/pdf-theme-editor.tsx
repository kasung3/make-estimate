'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Plus,
  Trash2,
  Loader2,
  Check,
  Palette,
  Pencil,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PdfThemeConfig, PdfThemeType } from '@/lib/types';

interface PdfThemeEditorProps {
  companyName: string;
}

const getDefaultThemeConfig = (): PdfThemeConfig => ({
  header: {
    borderColor: '#7c3aed',
    titleColor: '#7c3aed',
    subtitleColor: '#666666',
  },
  categoryHeader: {
    backgroundPrimary: '#7c3aed',
    backgroundSecondary: '#8b5cf6',
    textColor: '#ffffff',
  },
  table: {
    headerBackground: '#f5f3ff',
    headerTextColor: '#6b7280',
    borderColor: '#e5e7eb',
    bodyTextColor: '#333333',
  },
  subtotalRow: {
    background: '#f5f3ff',
    borderColor: '#8b5cf6',
    textColor: '#333333',
  },
  noteRow: {
    background: '#fffbeb',
    textColor: '#92400e',
  },
  totals: {
    finalTotalBackground: '#7c3aed',
    finalTotalTextColor: '#ffffff',
  },
});

// Color picker row component
function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
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

// Preview component for theme
function ThemePreview({ config }: { config: PdfThemeConfig }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Header Preview */}
      <div
        className="p-3"
        style={{
          borderBottom: `2px solid ${config.header.borderColor}`,
        }}
      >
        <div
          className="text-base font-bold"
          style={{ color: config.header.titleColor }}
        >
          Sample Project Name
        </div>
        <div
          className="text-xs"
          style={{ color: config.header.subtitleColor }}
        >
          Customer: John Doe
        </div>
      </div>

      {/* Category Preview */}
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

        {/* Table Preview */}
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                className="px-2 py-1 text-left font-semibold text-[10px] uppercase"
                style={{
                  backgroundColor: config.table.headerBackground,
                  color: config.table.headerTextColor,
                  border: `1px solid ${config.table.borderColor}`,
                }}
              >
                Item
              </th>
              <th
                className="px-2 py-1 text-left font-semibold text-[10px] uppercase"
                style={{
                  backgroundColor: config.table.headerBackground,
                  color: config.table.headerTextColor,
                  border: `1px solid ${config.table.borderColor}`,
                }}
              >
                Description
              </th>
              <th
                className="px-2 py-1 text-right font-semibold text-[10px] uppercase"
                style={{
                  backgroundColor: config.table.headerBackground,
                  color: config.table.headerTextColor,
                  border: `1px solid ${config.table.borderColor}`,
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="px-2 py-1"
                style={{
                  border: `1px solid ${config.table.borderColor}`,
                  color: config.table.bodyTextColor,
                }}
              >
                1.1
              </td>
              <td
                className="px-2 py-1"
                style={{
                  border: `1px solid ${config.table.borderColor}`,
                  color: config.table.bodyTextColor,
                }}
              >
                Sample item description
              </td>
              <td
                className="px-2 py-1 text-right"
                style={{
                  border: `1px solid ${config.table.borderColor}`,
                  color: config.table.bodyTextColor,
                }}
              >
                1,000.00
              </td>
            </tr>
            {/* Note Row */}
            <tr
              style={{
                backgroundColor: config.noteRow.background,
              }}
            >
              <td
                className="px-2 py-1"
                style={{
                  border: `1px solid ${config.table.borderColor}`,
                }}
              ></td>
              <td
                colSpan={2}
                className="px-2 py-1 italic"
                style={{
                  border: `1px solid ${config.table.borderColor}`,
                  color: config.noteRow.textColor,
                }}
              >
                This is a sample note
              </td>
            </tr>
            {/* Subtotal Row */}
            <tr
              style={{
                backgroundColor: config.subtotalRow.background,
                color: config.subtotalRow.textColor,
              }}
            >
              <td
                colSpan={2}
                className="px-2 py-1 text-right font-bold"
                style={{
                  borderTop: `2px solid ${config.subtotalRow.borderColor}`,
                  border: `1px solid ${config.table.borderColor}`,
                }}
              >
                Subtotal
              </td>
              <td
                className="px-2 py-1 text-right font-bold"
                style={{
                  borderTop: `2px solid ${config.subtotalRow.borderColor}`,
                  border: `1px solid ${config.table.borderColor}`,
                }}
              >
                Rs. 1,000.00
              </td>
            </tr>
          </tbody>
        </table>

        {/* Final Total */}
        <div className="mt-3 flex justify-end">
          <div
            className="px-3 py-2 rounded text-sm font-bold"
            style={{
              backgroundColor: config.totals.finalTotalBackground,
              color: config.totals.finalTotalTextColor,
            }}
          >
            Final Total: Rs. 1,180.00
          </div>
        </div>
      </div>
    </div>
  );
}

export function PdfThemeEditor({ companyName }: PdfThemeEditorProps) {
  const [themes, setThemes] = useState<PdfThemeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingTheme, setEditingTheme] = useState<PdfThemeType | null>(null);
  const [editingConfig, setEditingConfig] = useState<PdfThemeConfig | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const fetchThemes = useCallback(async () => {
    try {
      const response = await fetch('/api/pdf-themes');
      if (response.ok) {
        const data = await response.json();
        setThemes(data);
      }
    } catch (error) {
      console.error('Error fetching themes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  const handleCreateTheme = () => {
    setEditingTheme(null);
    setEditingName('New Theme');
    setEditingConfig(getDefaultThemeConfig());
    setShowEditor(true);
  };

  const handleEditTheme = (theme: PdfThemeType) => {
    setEditingTheme(theme);
    setEditingName(theme.name);
    setEditingConfig(theme.configJson as PdfThemeConfig);
    setShowEditor(true);
  };

  const handleSaveTheme = async () => {
    if (!editingConfig || !editingName.trim()) {
      toast.error('Please enter a theme name');
      return;
    }

    setSaving(true);
    try {
      const url = editingTheme ? `/api/pdf-themes/${editingTheme.id}` : '/api/pdf-themes';
      const method = editingTheme ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingName,
          configJson: editingConfig,
          isDefault: themes.length === 0,
        }),
      });

      if (!response.ok) throw new Error('Failed to save theme');

      toast.success(editingTheme ? 'Theme updated' : 'Theme created');
      setShowEditor(false);
      fetchThemes();
    } catch (error) {
      toast.error('Failed to save theme');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTheme = async (id: string) => {
    if (!confirm('Are you sure you want to delete this theme?')) return;

    try {
      const response = await fetch(`/api/pdf-themes/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete');
      }
      toast.success('Theme deleted');
      fetchThemes();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete theme');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const response = await fetch(`/api/pdf-themes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDefault: true }),
      });
      if (!response.ok) throw new Error('Failed to set default');
      toast.success('Default theme updated');
      fetchThemes();
    } catch (error) {
      toast.error('Failed to set default theme');
    }
  };

  const updateConfig = (path: string[], value: string) => {
    if (!editingConfig) return;
    const newConfig = JSON.parse(JSON.stringify(editingConfig));
    let current: any = newConfig;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setEditingConfig(newConfig);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">PDF Color Themes</h3>
          <p className="text-sm text-gray-500">Customize colors and shading for BOQ pages</p>
        </div>
        <Button onClick={handleCreateTheme}>
          <Plus className="w-4 h-4 mr-2" />
          New Theme
        </Button>
      </div>

      {themes.length === 0 ? (
        <Card className="p-8 text-center">
          <Palette className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No themes yet</h3>
          <p className="text-gray-500 mb-4">Create your first color theme to customize your PDF exports</p>
          <Button onClick={handleCreateTheme}>
            <Plus className="w-4 h-4 mr-2" />
            Create Theme
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {themes.map((theme) => (
            <Card key={theme.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-cyan-600" />
                  <div>
                    <h4 className="font-medium">{theme.name}</h4>
                    <p className="text-sm text-gray-500">
                      {theme.isDefault && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-100 text-cyan-800 mr-2">
                          <Check className="w-3 h-3 mr-1" />
                          Default
                        </span>
                      )}
                      Updated {new Date(theme.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!theme.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => handleSetDefault(theme.id)}>
                      Set Default
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleEditTheme(theme)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTheme(theme.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Theme Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
            <DialogTitle>{editingTheme ? 'Edit Theme' : 'New Theme'}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 min-h-0 flex">
            {/* Editor Panel */}
            <div className="w-1/2 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <div className="space-y-2">
                  <Label>Theme Name</Label>
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    placeholder="Enter theme name"
                  />
                </div>

                {editingConfig && (
                  <>
                    {/* Header Colors */}
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">Page Header</Label>
                      <div className="pl-2 border-l-2 border-gray-200">
                        <ColorRow
                          label="Border Color"
                          value={editingConfig.header.borderColor}
                          onChange={(v) => updateConfig(['header', 'borderColor'], v)}
                        />
                        <ColorRow
                          label="Title Color"
                          value={editingConfig.header.titleColor}
                          onChange={(v) => updateConfig(['header', 'titleColor'], v)}
                        />
                        <ColorRow
                          label="Subtitle Color"
                          value={editingConfig.header.subtitleColor}
                          onChange={(v) => updateConfig(['header', 'subtitleColor'], v)}
                        />
                      </div>
                    </div>

                    {/* Category Header Colors */}
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">Category Header</Label>
                      <div className="pl-2 border-l-2 border-gray-200">
                        <ColorRow
                          label="Background Primary"
                          value={editingConfig.categoryHeader.backgroundPrimary}
                          onChange={(v) => updateConfig(['categoryHeader', 'backgroundPrimary'], v)}
                        />
                        <ColorRow
                          label="Background Secondary"
                          value={editingConfig.categoryHeader.backgroundSecondary}
                          onChange={(v) => updateConfig(['categoryHeader', 'backgroundSecondary'], v)}
                        />
                        <ColorRow
                          label="Text Color"
                          value={editingConfig.categoryHeader.textColor}
                          onChange={(v) => updateConfig(['categoryHeader', 'textColor'], v)}
                        />
                      </div>
                    </div>

                    {/* Table Colors */}
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">Table</Label>
                      <div className="pl-2 border-l-2 border-gray-200">
                        <ColorRow
                          label="Header Background"
                          value={editingConfig.table.headerBackground}
                          onChange={(v) => updateConfig(['table', 'headerBackground'], v)}
                        />
                        <ColorRow
                          label="Header Text Color"
                          value={editingConfig.table.headerTextColor}
                          onChange={(v) => updateConfig(['table', 'headerTextColor'], v)}
                        />
                        <ColorRow
                          label="Border Color"
                          value={editingConfig.table.borderColor}
                          onChange={(v) => updateConfig(['table', 'borderColor'], v)}
                        />
                        <ColorRow
                          label="Body Text Color"
                          value={editingConfig.table.bodyTextColor}
                          onChange={(v) => updateConfig(['table', 'bodyTextColor'], v)}
                        />
                      </div>
                    </div>

                    {/* Subtotal Row Colors */}
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">Subtotal Row</Label>
                      <div className="pl-2 border-l-2 border-gray-200">
                        <ColorRow
                          label="Background"
                          value={editingConfig.subtotalRow.background}
                          onChange={(v) => updateConfig(['subtotalRow', 'background'], v)}
                        />
                        <ColorRow
                          label="Border Color"
                          value={editingConfig.subtotalRow.borderColor}
                          onChange={(v) => updateConfig(['subtotalRow', 'borderColor'], v)}
                        />
                        <ColorRow
                          label="Text Color"
                          value={editingConfig.subtotalRow.textColor}
                          onChange={(v) => updateConfig(['subtotalRow', 'textColor'], v)}
                        />
                      </div>
                    </div>

                    {/* Note Row Colors */}
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">Note Row</Label>
                      <div className="pl-2 border-l-2 border-gray-200">
                        <ColorRow
                          label="Background"
                          value={editingConfig.noteRow.background}
                          onChange={(v) => updateConfig(['noteRow', 'background'], v)}
                        />
                        <ColorRow
                          label="Text Color"
                          value={editingConfig.noteRow.textColor}
                          onChange={(v) => updateConfig(['noteRow', 'textColor'], v)}
                        />
                      </div>
                    </div>

                    {/* Final Total Colors */}
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">Final Total</Label>
                      <div className="pl-2 border-l-2 border-gray-200">
                        <ColorRow
                          label="Background"
                          value={editingConfig.totals.finalTotalBackground}
                          onChange={(v) => updateConfig(['totals', 'finalTotalBackground'], v)}
                        />
                        <ColorRow
                          label="Text Color"
                          value={editingConfig.totals.finalTotalTextColor}
                          onChange={(v) => updateConfig(['totals', 'finalTotalTextColor'], v)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Preview Panel */}
            <div className="w-1/2 border-l flex flex-col min-h-0">
              <div className="px-6 py-3 border-b flex-shrink-0">
                <Label>Preview</Label>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {editingConfig && <ThemePreview config={editingConfig} />}
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t flex-shrink-0">
            <Button variant="outline" onClick={() => setShowEditor(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTheme} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Theme'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
