'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Palette,
  FileText,
  Trash2,
  Pencil,
  Star,
  AlertTriangle,
  Loader2,
  Crown,
  ChevronUp,
  X,
  Copy,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BillingStatus } from '@/lib/types';
import Link from 'next/link';
import { CoverTemplateEditor } from '../../settings/_components/cover-template-editor';
import { PdfThemeEditor } from '../../settings/_components/pdf-theme-editor';

interface BoqTemplate {
  id: string;
  name: string;
  isDefault: boolean;
  config: any;
  createdAt: string;
}

interface CoverTemplate {
  id: string;
  name: string;
  isDefault: boolean;
  config: any;
  createdAt: string;
}

interface PresetItem {
  id: string;
  description: string;
  unit: string;
  unitCost: number;
  markupPct: number;
  quantity: number;
  isNote: boolean;
}

interface PresetCategory {
  id: string;
  name: string;
  items: PresetItem[];
}

interface BoqPreset {
  id: string;
  projectName: string;
  presetName: string | null;
  categories: PresetCategory[];
  createdAt: string;
  updatedAt: string;
}

interface CustomerOption {
  id: string;
  name: string;
}

interface TemplatesClientProps {
  boqTemplates: BoqTemplate[];
  coverTemplates: CoverTemplate[];
  boqPresets: BoqPreset[];
  customers: CustomerOption[];
  billingStatus: BillingStatus;
  companyName: string;
}

export function TemplatesClient({
  boqTemplates: initialBoqTemplates,
  coverTemplates: initialCoverTemplates,
  boqPresets: initialPresets,
  customers: initialCustomers,
  billingStatus,
  companyName,
}: TemplatesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [boqTemplates, setBoqTemplates] = useState(initialBoqTemplates);
  const [coverTemplates, setCoverTemplates] = useState(initialCoverTemplates);
  const [presets, setPresets] = useState<BoqPreset[]>(initialPresets);
  const [customers] = useState<CustomerOption[]>(initialCustomers);
  const [activeTab, setActiveTab] = useState('boq');

  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab && ['boq', 'cover', 'presets'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [limitType, setLimitType] = useState<'boq_templates' | 'cover_templates' | 'presets'>('boq_templates');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<{ id: string; type: 'boq' | 'cover' | 'preset'; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [editingTemplateType, setEditingTemplateType] = useState<'boq' | 'cover' | null>(null);

  // Preset dialogs
  const [showCreatePresetDialog, setShowCreatePresetDialog] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [showCreateBoqFromPreset, setShowCreateBoqFromPreset] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [newBoqProjectName, setNewBoqProjectName] = useState('');
  const [newBoqCustomerId, setNewBoqCustomerId] = useState<string>('');
  const [creatingBoq, setCreatingBoq] = useState(false);

  const boqTemplatesLimit = billingStatus.boqTemplatesLimit ?? null;
  const coverTemplatesLimit = billingStatus.coverTemplatesLimit ?? null;
  const presetsLimit = billingStatus.boqPresetsLimit ?? null;
  const canCreateBoqTemplate = boqTemplatesLimit === null || boqTemplates.length < (boqTemplatesLimit ?? Infinity);
  const canCreateCoverTemplate = coverTemplatesLimit === null || coverTemplates.length < (coverTemplatesLimit ?? Infinity);
  const canCreatePreset = presetsLimit === null || presets.length < (presetsLimit ?? Infinity);
  const planKey = billingStatus.planKey || 'free';

  const handleCreateBoqTemplate = async () => {
    if (!canCreateBoqTemplate) { setLimitType('boq_templates'); setShowLimitDialog(true); return; }
    setCreating(true);
    try {
      const response = await fetch('/api/pdf-themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Theme ${boqTemplates.length + 1}` }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 403 && data.code === 'LIMIT_EXCEEDED') { setLimitType('boq_templates'); setShowLimitDialog(true); }
        else toast.error(data?.error || 'Failed to create theme');
        return;
      }
      setBoqTemplates([...boqTemplates, data]);
      toast.success('BOQ theme created');
    } catch { toast.error('An error occurred'); } finally { setCreating(false); }
  };

  const handleCreateCoverTemplate = async () => {
    if (!canCreateCoverTemplate) { setLimitType('cover_templates'); setShowLimitDialog(true); return; }
    setCreating(true);
    try {
      const response = await fetch('/api/cover-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Cover ${coverTemplates.length + 1}` }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 403 && data.code === 'LIMIT_EXCEEDED') { setLimitType('cover_templates'); setShowLimitDialog(true); }
        else toast.error(data?.error || 'Failed to create cover template');
        return;
      }
      setCoverTemplates([...coverTemplates, data]);
      toast.success('Cover template created');
    } catch { toast.error('An error occurred'); } finally { setCreating(false); }
  };

  const handleCreatePreset = async () => {
    if (!canCreatePreset) { setLimitType('presets'); setShowLimitDialog(true); return; }
    if (!newPresetName.trim()) { toast.error('Please enter a preset name'); return; }
    setCreating(true);
    try {
      const response = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetName: newPresetName.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 403 && data.code === 'LIMIT_EXCEEDED') { setLimitType('presets'); setShowLimitDialog(true); }
        else toast.error(data?.error || 'Failed to create preset');
        return;
      }
      setPresets([data, ...presets]);
      setShowCreatePresetDialog(false);
      setNewPresetName('');
      toast.success('BOQ preset created');
      // Navigate to edit the preset in the BOQ editor
      router.push(`/app/boq/${data.id}`);
    } catch { toast.error('An error occurred'); } finally { setCreating(false); }
  };

  const handleCreateBoqFromPreset = async () => {
    if (!selectedPresetId) return;
    setCreatingBoq(true);
    try {
      const response = await fetch(`/api/presets/${selectedPresetId}/create-boq`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: newBoqCustomerId || null,
          projectName: newBoqProjectName.trim() || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.error || 'Failed to create BOQ');
        return;
      }
      toast.success('BOQ created from preset!');
      setShowCreateBoqFromPreset(false);
      setNewBoqProjectName('');
      setNewBoqCustomerId('');
      router.push(`/app/boq/${data.id}`);
    } catch { toast.error('An error occurred'); } finally { setCreatingBoq(false); }
  };

  const handleDeleteClick = (id: string, type: 'boq' | 'cover' | 'preset', name: string) => {
    setTemplateToDelete({ id, type, name });
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!templateToDelete) return;
    setDeleting(true);
    try {
      const endpoint = templateToDelete.type === 'boq'
        ? `/api/pdf-themes/${templateToDelete.id}`
        : templateToDelete.type === 'cover'
          ? `/api/cover-templates/${templateToDelete.id}`
          : `/api/presets/${templateToDelete.id}`;
      const response = await fetch(endpoint, { method: 'DELETE' });
      if (!response.ok) { const data = await response.json(); toast.error(data?.error || 'Failed to delete'); return; }
      if (templateToDelete.type === 'boq') setBoqTemplates(prev => prev.filter(t => t.id !== templateToDelete.id));
      else if (templateToDelete.type === 'cover') setCoverTemplates(prev => prev.filter(t => t.id !== templateToDelete.id));
      else setPresets(prev => prev.filter(t => t.id !== templateToDelete.id));
      toast.success('Deleted successfully');
      setShowDeleteDialog(false);
      setTemplateToDelete(null);
    } catch { toast.error('An error occurred'); } finally { setDeleting(false); }
  };

  const handleSetDefault = async (id: string, type: 'boq' | 'cover') => {
    try {
      const endpoint = type === 'boq' ? `/api/pdf-themes/${id}` : `/api/cover-templates/${id}`;
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDefault: true }),
      });
      if (!response.ok) { toast.error('Failed to set as default'); return; }
      if (type === 'boq') setBoqTemplates(prev => prev.map(t => ({ ...t, isDefault: t.id === id })));
      else setCoverTemplates(prev => prev.map(t => ({ ...t, isDefault: t.id === id })));
      toast.success('Default updated');
    } catch { toast.error('An error occurred'); }
  };

  const getLimitMessage = () => {
    const limit = limitType === 'boq_templates' ? boqTemplatesLimit : limitType === 'cover_templates' ? coverTemplatesLimit : presetsLimit;
    const current = limitType === 'boq_templates' ? boqTemplates.length : limitType === 'cover_templates' ? coverTemplates.length : presets.length;
    const typeName = limitType === 'boq_templates' ? 'BOQ themes' : limitType === 'cover_templates' ? 'cover templates' : 'BOQ presets';
    return { limit, current, typeName, planName: planKey.charAt(0).toUpperCase() + planKey.slice(1) };
  };

  const handleEditClick = (id: string, type: 'boq' | 'cover') => {
    if (editingTemplateId === id && editingTemplateType === type) { setEditingTemplateId(null); setEditingTemplateType(null); }
    else { setEditingTemplateId(id); setEditingTemplateType(type); }
  };

  const closeEditor = () => { setEditingTemplateId(null); setEditingTemplateType(null); };

  // Count items in a preset
  const getPresetItemCount = (preset: BoqPreset) => {
    return preset.categories.reduce((sum, cat) => sum + cat.items.filter(i => !i.isNote).length, 0);
  };

  const getPresetCategoryCount = (preset: BoqPreset) => preset.categories.length;

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Manage your BOQ themes, cover pages, and BOQ presets</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="boq" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Palette className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">BOQ</span> Themes
            </TabsTrigger>
            <TabsTrigger value="cover" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Cover Pages
            </TabsTrigger>
            <TabsTrigger value="presets" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <ClipboardList className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">BOQ</span> Presets
            </TabsTrigger>
          </TabsList>

          {/* BOQ Themes Tab */}
          <TabsContent value="boq" className="space-y-6">
            <Card className="shadow-md border-0">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">BOQ Themes</CardTitle>
                    <CardDescription>Customize colors and styles for your BOQ PDF exports</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    {boqTemplatesLimit !== null && (
                      <Badge variant="outline" className="text-sm">{boqTemplates.length}/{boqTemplatesLimit} used</Badge>
                    )}
                    <Button onClick={handleCreateBoqTemplate} disabled={creating || !canCreateBoqTemplate} size="sm">
                      {creating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                      Create Theme
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!canCreateBoqTemplate && (
                  <Alert className="mb-4 border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">Theme limit reached</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      You've used all {boqTemplatesLimit} BOQ themes on the {planKey} plan.
                      <Link href="/pricing" className="ml-1 underline font-medium">Upgrade for more</Link>
                    </AlertDescription>
                  </Alert>
                )}
                {boqTemplates.length === 0 ? (
                  <div className="text-center py-12">
                    <Palette className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No BOQ themes yet</p>
                    <Button variant="outline" className="mt-4" onClick={handleCreateBoqTemplate} disabled={creating}>Create your first theme</Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {boqTemplates.map((template) => (
                      <div key={template.id} className="space-y-0">
                        <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                          editingTemplateId === template.id && editingTemplateType === 'boq' ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50 hover:bg-gray-100'
                        }`}>
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-lavender-400 rounded-lg flex items-center justify-center">
                              <Palette className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                {template.name}
                                {template.isDefault && <Badge variant="secondary" className="text-xs"><Star className="w-3 h-3 mr-1" />Default</Badge>}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 md:gap-2">
                            {!template.isDefault && <Button variant="ghost" size="sm" onClick={() => handleSetDefault(template.id, 'boq')} className="text-gray-500 hover:text-purple-600 hidden sm:inline-flex">Set Default</Button>}
                            <Button variant="ghost" size="icon" className={editingTemplateId === template.id && editingTemplateType === 'boq' ? 'text-purple-600 bg-purple-100' : 'text-gray-400 hover:text-gray-600'} onClick={() => handleEditClick(template.id, 'boq')}>
                              {editingTemplateId === template.id && editingTemplateType === 'boq' ? <ChevronUp className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                            </Button>
                            {!template.isDefault && <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => handleDeleteClick(template.id, 'boq', template.name)}><Trash2 className="w-4 h-4" /></Button>}
                          </div>
                        </div>
                        {editingTemplateId === template.id && editingTemplateType === 'boq' && (
                          <div className="border border-t-0 border-purple-200 rounded-b-xl p-4 bg-white animate-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-gray-700">Editing: {template.name}</h4>
                              <Button variant="ghost" size="sm" onClick={closeEditor}><X className="w-4 h-4 mr-1" />Close</Button>
                            </div>
                            <PdfThemeEditor companyName={companyName} selectedThemeId={template.id} themeLimit={boqTemplatesLimit} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cover Templates Tab */}
          <TabsContent value="cover" className="space-y-6">
            <Card className="shadow-md border-0">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">Cover Page Templates</CardTitle>
                    <CardDescription>Design cover pages for your BOQ PDF exports</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    {coverTemplatesLimit !== null && <Badge variant="outline" className="text-sm">{coverTemplates.length}/{coverTemplatesLimit} used</Badge>}
                    <Button onClick={handleCreateCoverTemplate} disabled={creating || !canCreateCoverTemplate} size="sm">
                      {creating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                      Create Cover
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!canCreateCoverTemplate && (
                  <Alert className="mb-4 border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">Cover template limit reached</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      You've used all {coverTemplatesLimit} cover templates on the {planKey} plan.
                      <Link href="/pricing" className="ml-1 underline font-medium">Upgrade for more</Link>
                    </AlertDescription>
                  </Alert>
                )}
                {coverTemplates.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No cover templates yet</p>
                    <Button variant="outline" className="mt-4" onClick={handleCreateCoverTemplate} disabled={creating}>Create your first cover</Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {coverTemplates.map((template) => (
                      <div key={template.id} className="space-y-0">
                        <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                          editingTemplateId === template.id && editingTemplateType === 'cover' ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50 hover:bg-gray-100'
                        }`}>
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-lavender-400 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                {template.name}
                                {template.isDefault && <Badge variant="secondary" className="text-xs"><Star className="w-3 h-3 mr-1" />Default</Badge>}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 md:gap-2">
                            {!template.isDefault && <Button variant="ghost" size="sm" onClick={() => handleSetDefault(template.id, 'cover')} className="text-gray-500 hover:text-purple-600 hidden sm:inline-flex">Set Default</Button>}
                            <Button variant="ghost" size="icon" className={editingTemplateId === template.id && editingTemplateType === 'cover' ? 'text-purple-600 bg-purple-100' : 'text-gray-400 hover:text-gray-600'} onClick={() => handleEditClick(template.id, 'cover')}>
                              {editingTemplateId === template.id && editingTemplateType === 'cover' ? <ChevronUp className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                            </Button>
                            {!template.isDefault && <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => handleDeleteClick(template.id, 'cover', template.name)}><Trash2 className="w-4 h-4" /></Button>}
                          </div>
                        </div>
                        {editingTemplateId === template.id && editingTemplateType === 'cover' && (
                          <div className="border border-t-0 border-purple-200 rounded-b-xl p-4 bg-white animate-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-gray-700">Editing: {template.name}</h4>
                              <Button variant="ghost" size="sm" onClick={closeEditor}><X className="w-4 h-4 mr-1" />Close</Button>
                            </div>
                            <CoverTemplateEditor companyName={companyName} selectedTemplateId={template.id} templateLimit={coverTemplatesLimit} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* BOQ Presets Tab */}
          <TabsContent value="presets" className="space-y-6">
            <Card className="shadow-md border-0">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">BOQ Presets</CardTitle>
                    <CardDescription>Save predefined BOQ structures with items, units, costs, and markups. Start new BOQs from presets to save time.</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    {presetsLimit !== null && <Badge variant="outline" className="text-sm">{presets.length}/{presetsLimit} used</Badge>}
                    <Button onClick={() => { if (!canCreatePreset) { setLimitType('presets'); setShowLimitDialog(true); } else { setShowCreatePresetDialog(true); } }} disabled={creating} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      New Preset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!canCreatePreset && (
                  <Alert className="mb-4 border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">Preset limit reached</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      You've used all {presetsLimit} BOQ preset{(presetsLimit ?? 0) > 1 ? 's' : ''} on the {planKey} plan.
                      <Link href="/pricing" className="ml-1 underline font-medium">Upgrade for unlimited presets</Link>
                    </AlertDescription>
                  </Alert>
                )}
                {presets.length === 0 ? (
                  <div className="text-center py-12">
                    <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-1">No BOQ presets yet</p>
                    <p className="text-xs text-gray-400 mb-4">Create a preset with predefined items, or save an existing BOQ as a preset</p>
                    <Button variant="outline" onClick={() => setShowCreatePresetDialog(true)} disabled={creating || !canCreatePreset}>
                      Create your first preset
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {presets.map((preset) => (
                      <div key={preset.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors gap-3">
                        <div className="flex items-center space-x-4 min-w-0 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ClipboardList className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{preset.presetName || preset.projectName}</h3>
                            <p className="text-xs text-gray-500">
                              {getPresetCategoryCount(preset)} categories · {getPresetItemCount(preset)} items
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-purple-600 border-purple-200 hover:bg-purple-50"
                            onClick={() => {
                              setSelectedPresetId(preset.id);
                              setNewBoqProjectName(preset.presetName || preset.projectName);
                              setShowCreateBoqFromPreset(true);
                            }}
                          >
                            <ArrowRight className="w-4 h-4 mr-1" />
                            Use Preset
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600" onClick={() => router.push(`/app/boq/${preset.id}`)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => handleDeleteClick(preset.id, 'preset', preset.presetName || preset.projectName)}>
                            <Trash2 className="w-4 h-4" />
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

        {/* Create Preset Dialog */}
        <Dialog open={showCreatePresetDialog} onOpenChange={setShowCreatePresetDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create BOQ Preset</DialogTitle>
              <DialogDescription>
                Create a new preset with predefined categories and items. You'll be taken to the BOQ editor to add items.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="presetName">Preset Name</Label>
                <Input
                  id="presetName"
                  placeholder="e.g., Residential House, Commercial Building"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreatePreset()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowCreatePresetDialog(false); setNewPresetName(''); }}>Cancel</Button>
              <Button onClick={handleCreatePreset} disabled={creating || !newPresetName.trim()}>
                {creating && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Create & Edit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create BOQ from Preset Dialog */}
        <Dialog open={showCreateBoqFromPreset} onOpenChange={setShowCreateBoqFromPreset}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create BOQ from Preset</DialogTitle>
              <DialogDescription>
                Start a new BOQ using this preset. All items, units, costs, and markups will be copied. You can then enter quantities and make changes.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="boqProjectName">Project Name</Label>
                <Input
                  id="boqProjectName"
                  placeholder="Enter project name"
                  value={newBoqProjectName}
                  onChange={(e) => setNewBoqProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Customer (optional)</Label>
                <Select value={newBoqCustomerId} onValueChange={setNewBoqCustomerId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No customer</SelectItem>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowCreateBoqFromPreset(false); setNewBoqProjectName(''); setNewBoqCustomerId(''); }}>Cancel</Button>
              <Button onClick={handleCreateBoqFromPreset} disabled={creatingBoq}>
                {creatingBoq && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Create BOQ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Limit Exceeded Dialog */}
        <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" />
                Upgrade to Create More
              </DialogTitle>
              <DialogDescription>
                {(() => {
                  const { limit, typeName, planName } = getLimitMessage();
                  return `You've reached the ${planName} plan limit of ${limit} ${typeName}. Upgrade your plan to create more.`;
                })()}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <h4 className="font-medium text-purple-900 mb-2">Upgrade Benefits:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• More BOQ themes and cover templates</li>
                  <li>• Unlimited BOQ presets</li>
                  <li>• Logo upload for cover pages</li>
                  <li>• Remove watermark from PDFs</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLimitDialog(false)}>Cancel</Button>
              <Link href="/pricing"><Button><Crown className="w-4 h-4 mr-2" />View Plans</Button></Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Delete {templateToDelete?.type === 'preset' ? 'Preset' : 'Template'}?
              </DialogTitle>
              <DialogDescription>
                This will permanently delete <strong>"{templateToDelete?.name}"</strong>. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={deleting}>Cancel</Button>
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
