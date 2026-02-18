'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Plus,
  Palette,
  FileText,
  Trash2,
  Pencil,
  Star,
  AlertTriangle,
  Loader2,
  Crown,
  Layers,
  Copy,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BillingStatus } from '@/lib/types';
import Link from 'next/link';

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

interface TemplatesClientProps {
  boqTemplates: BoqTemplate[];
  coverTemplates: CoverTemplate[];
  billingStatus: BillingStatus;
  companyName: string;
}

export function TemplatesClient({ 
  boqTemplates: initialBoqTemplates, 
  coverTemplates: initialCoverTemplates, 
  billingStatus,
  companyName,
}: TemplatesClientProps) {
  const [boqTemplates, setBoqTemplates] = useState(initialBoqTemplates);
  const [coverTemplates, setCoverTemplates] = useState(initialCoverTemplates);
  const [activeTab, setActiveTab] = useState('boq');
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [limitType, setLimitType] = useState<'boq_templates' | 'cover_templates'>('boq_templates');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<{ id: string; type: 'boq' | 'cover'; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);

  // Preset state
  const router = useRouter();
  const [presets, setPresets] = useState<any[]>([]);
  const [presetsLoading, setPresetsLoading] = useState(false);
  const [creatingPreset, setCreatingPreset] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [showCreatePresetDialog, setShowCreatePresetDialog] = useState(false);
  const [presetToDelete, setPresetToDelete] = useState<any>(null);
  const [showDeletePresetDialog, setShowDeletePresetDialog] = useState(false);
  const [deletingPreset, setDeletingPreset] = useState(false);

  const fetchPresets = useCallback(async () => {
    setPresetsLoading(true);
    try {
      const res = await fetch('/api/presets');
      if (res.ok) {
        const data = await res.json();
        setPresets(data);
      }
    } catch (err) {
      console.error('Failed to fetch presets:', err);
    } finally {
      setPresetsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'presets') {
      fetchPresets();
    }
  }, [activeTab, fetchPresets]);

  const handleCreatePreset = async () => {
    const name = newPresetName.trim() || 'New Preset';
    setCreatingPreset(true);
    try {
      const res = await fetch('/api/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetName: name }),
      });
      if (!res.ok) {
        const data = await res.json();
        if (res.status === 403) {
          toast.error(data.error || 'Preset limit reached');
        } else {
          toast.error(data.error || 'Failed to create preset');
        }
        return;
      }
      const preset = await res.json();
      toast.success('Preset created! Redirecting to editor...');
      setShowCreatePresetDialog(false);
      setNewPresetName('');
      router.push(`/app/boq/${preset.id}`);
    } catch (err) {
      toast.error('Failed to create preset');
    } finally {
      setCreatingPreset(false);
    }
  };

  const handleDeletePreset = async () => {
    if (!presetToDelete) return;
    setDeletingPreset(true);
    try {
      const res = await fetch(`/api/presets/${presetToDelete.id}`, { method: 'DELETE' });
      if (res.ok) {
        setPresets((prev) => prev.filter((p) => p.id !== presetToDelete.id));
        toast.success('Preset deleted');
      } else {
        toast.error('Failed to delete preset');
      }
    } catch (err) {
      toast.error('Failed to delete preset');
    } finally {
      setDeletingPreset(false);
      setShowDeletePresetDialog(false);
      setPresetToDelete(null);
    }
  };

  const handleCreateBoqFromPreset = async (presetId: string, presetName: string) => {
    try {
      const res = await fetch('/api/presets/create-boq-from-preset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetId, projectName: `BOQ from ${presetName}` }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Failed to create BOQ');
        return;
      }
      const boq = await res.json();
      toast.success('BOQ created from preset!');
      router.push(`/app/boq/${boq.id}`);
    } catch (err) {
      toast.error('Failed to create BOQ from preset');
    }
  };

  const boqTemplatesLimit = billingStatus.boqTemplatesLimit ?? null;
  const coverTemplatesLimit = billingStatus.coverTemplatesLimit ?? null;
  const canCreateBoqTemplate = boqTemplatesLimit === null || boqTemplates.length < (boqTemplatesLimit ?? Infinity);
  const canCreateCoverTemplate = coverTemplatesLimit === null || coverTemplates.length < (coverTemplatesLimit ?? Infinity);
  const planKey = billingStatus.planKey || 'free';

  const handleCreateBoqTemplate = async () => {
    if (!canCreateBoqTemplate) {
      setLimitType('boq_templates');
      setShowLimitDialog(true);
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/pdf-themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Theme ${boqTemplates.length + 1}` }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.code === 'LIMIT_EXCEEDED') {
          setLimitType('boq_templates');
          setShowLimitDialog(true);
        } else {
          toast.error(data?.error || 'Failed to create theme');
        }
        return;
      }

      setBoqTemplates([...boqTemplates, data]);
      toast.success('BOQ theme created! Redirecting to editor...');
      router.push(`/app/templates/theme/${data.id}`);
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setCreating(false);
    }
  };

  const handleCreateCoverTemplate = async () => {
    if (!canCreateCoverTemplate) {
      setLimitType('cover_templates');
      setShowLimitDialog(true);
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/cover-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Cover ${coverTemplates.length + 1}` }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.code === 'LIMIT_EXCEEDED') {
          setLimitType('cover_templates');
          setShowLimitDialog(true);
        } else {
          toast.error(data?.error || 'Failed to create cover template');
        }
        return;
      }

      setCoverTemplates([...coverTemplates, data]);
      toast.success('Cover template created! Redirecting to editor...');
      router.push(`/app/templates/cover/${data.id}`);
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteClick = (id: string, type: 'boq' | 'cover', name: string) => {
    setTemplateToDelete({ id, type, name });
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!templateToDelete) return;

    setDeleting(true);
    try {
      const endpoint = templateToDelete.type === 'boq' 
        ? `/api/pdf-themes/${templateToDelete.id}` 
        : `/api/cover-templates/${templateToDelete.id}`;

      const response = await fetch(endpoint, { method: 'DELETE' });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data?.error || 'Failed to delete template');
        return;
      }

      if (templateToDelete.type === 'boq') {
        setBoqTemplates(prev => prev.filter(t => t.id !== templateToDelete.id));
      } else {
        setCoverTemplates(prev => prev.filter(t => t.id !== templateToDelete.id));
      }

      toast.success('Template deleted');
      setShowDeleteDialog(false);
      setTemplateToDelete(null);
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setDeleting(false);
    }
  };

  const handleSetDefault = async (id: string, type: 'boq' | 'cover') => {
    try {
      const endpoint = type === 'boq' 
        ? `/api/pdf-themes/${id}` 
        : `/api/cover-templates/${id}`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDefault: true }),
      });

      if (!response.ok) {
        toast.error('Failed to set as default');
        return;
      }

      if (type === 'boq') {
        setBoqTemplates(prev => prev.map(t => ({
          ...t,
          isDefault: t.id === id,
        })));
      } else {
        setCoverTemplates(prev => prev.map(t => ({
          ...t,
          isDefault: t.id === id,
        })));
      }

      toast.success('Default template updated');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const getLimitMessage = () => {
    const limit = limitType === 'boq_templates' ? boqTemplatesLimit : coverTemplatesLimit;
    const current = limitType === 'boq_templates' ? boqTemplates.length : coverTemplates.length;
    const typeName = limitType === 'boq_templates' ? 'BOQ themes' : 'cover templates';
    return {
      limit,
      current,
      typeName,
      planName: planKey.charAt(0).toUpperCase() + planKey.slice(1),
    };
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-500 mt-1">Manage your BOQ themes and cover page templates</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="boq" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">BOQ</span> Themes
            </TabsTrigger>
            <TabsTrigger value="presets" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">BOQ</span> Presets
            </TabsTrigger>
            <TabsTrigger value="cover" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Cover</span> Pages
            </TabsTrigger>
          </TabsList>

          {/* BOQ Themes Tab */}
          <TabsContent value="boq" className="space-y-6">
            <Card className="shadow-md border-0">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">BOQ Themes</CardTitle>
                    <CardDescription>
                      Customize colors and styles for your BOQ PDF exports
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    {boqTemplatesLimit !== null && (
                      <Badge variant="outline" className="text-sm">
                        {boqTemplates.length}/{boqTemplatesLimit} used
                      </Badge>
                    )}
                    <Button 
                      onClick={handleCreateBoqTemplate} 
                      disabled={creating || !canCreateBoqTemplate}
                      size="sm"
                    >
                      {creating ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
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
                      You've used all {boqTemplatesLimit} BOQ themes available on the {planKey} plan.
                      <Link href="/pricing" className="ml-1 underline font-medium">
                        Upgrade for more
                      </Link>
                    </AlertDescription>
                  </Alert>
                )}
                
                {boqTemplates.length === 0 ? (
                  <div className="text-center py-12">
                    <Palette className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No BOQ themes yet</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleCreateBoqTemplate}
                      disabled={creating}
                    >
                      Create your first theme
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {boqTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-lavender-400 rounded-lg flex items-center justify-center">
                            <Palette className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 flex items-center gap-2">
                              {template.name}
                              {template.isDefault && (
                                <Badge variant="secondary" className="text-xs">
                                  <Star className="w-3 h-3 mr-1" />
                                  Default
                                </Badge>
                              )}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!template.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetDefault(template.id, 'boq')}
                              className="text-gray-500 hover:text-purple-600"
                            >
                              Set Default
                            </Button>
                          )}
                          <Link href={`/app/templates/theme/${template.id}`}>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          {!template.isDefault && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => handleDeleteClick(template.id, 'boq', template.name)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
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
                    <CardDescription>
                      Design cover pages for your BOQ PDF exports
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    {coverTemplatesLimit !== null && (
                      <Badge variant="outline" className="text-sm">
                        {coverTemplates.length}/{coverTemplatesLimit} used
                      </Badge>
                    )}
                    <Button 
                      onClick={handleCreateCoverTemplate} 
                      disabled={creating || !canCreateCoverTemplate}
                      size="sm"
                    >
                      {creating ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
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
                      You've used all {coverTemplatesLimit} cover templates available on the {planKey} plan.
                      <Link href="/pricing" className="ml-1 underline font-medium">
                        Upgrade for more
                      </Link>
                    </AlertDescription>
                  </Alert>
                )}
                
                {coverTemplates.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No cover templates yet</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleCreateCoverTemplate}
                      disabled={creating}
                    >
                      Create your first cover
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {coverTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-lavender-400 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 flex items-center gap-2">
                              {template.name}
                              {template.isDefault && (
                                <Badge variant="secondary" className="text-xs">
                                  <Star className="w-3 h-3 mr-1" />
                                  Default
                                </Badge>
                              )}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!template.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetDefault(template.id, 'cover')}
                              className="text-gray-500 hover:text-purple-600"
                            >
                              Set Default
                            </Button>
                          )}
                          <Link href={`/app/templates/cover/${template.id}`}>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          {!template.isDefault && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => handleDeleteClick(template.id, 'cover', template.name)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
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
                    <CardDescription>
                      Save predefined BOQ structures with descriptions, units, costs, and markup. Start new BOQs from presets by just entering quantities.
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowCreatePresetDialog(true)}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Preset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {presetsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                  </div>
                ) : presets.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Layers className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-lg font-medium">No presets yet</p>
                    <p className="text-sm mt-1">Create a preset to speed up your BOQ creation workflow</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {presets.map((preset: any) => {
                      const totalItems = preset.categories?.reduce((sum: number, cat: any) => sum + (cat.items?.filter((i: any) => !i.isNote)?.length || 0), 0) || 0;
                      const totalCategories = preset.categories?.length || 0;
                      return (
                        <div
                          key={preset.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-colors gap-3"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{preset.presetName || preset.projectName}</p>
                            <p className="text-sm text-gray-500">
                              {totalCategories} {totalCategories === 1 ? 'category' : 'categories'} · {totalItems} {totalItems === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-purple-600 border-purple-200 hover:bg-purple-50"
                              onClick={() => handleCreateBoqFromPreset(preset.id, preset.presetName || preset.projectName)}
                            >
                              <Copy className="w-3.5 h-3.5 mr-1.5" />
                              Use Preset
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => router.push(`/app/boq/${preset.id}`)}
                            >
                              <Pencil className="w-3.5 h-3.5 mr-1.5" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500 border-red-200 hover:bg-red-50"
                              onClick={() => {
                                setPresetToDelete(preset);
                                setShowDeletePresetDialog(true);
                              }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Preset Dialog */}
        <Dialog open={showCreatePresetDialog} onOpenChange={setShowCreatePresetDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Preset</DialogTitle>
              <DialogDescription>
                Give your preset a name. You&apos;ll be redirected to the editor to add items.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="e.g., Residential Painting, Office Renovation"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreatePreset()}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreatePresetDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreatePreset}
                disabled={creatingPreset}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white"
              >
                {creatingPreset ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Create Preset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Preset Dialog */}
        <Dialog open={showDeletePresetDialog} onOpenChange={setShowDeletePresetDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Preset</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete &quot;{presetToDelete?.presetName || presetToDelete?.projectName}&quot;? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeletePresetDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeletePreset}
                disabled={deletingPreset}
              >
                {deletingPreset ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Delete
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
                  const { limit, current, typeName, planName } = getLimitMessage();
                  return `You've reached the ${planName} plan limit of ${limit} ${typeName}. Upgrade your plan to create more.`;
                })()}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <h4 className="font-medium text-purple-900 mb-2">Upgrade Benefits:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• More BOQ themes and cover templates</li>
                  <li>• Logo upload for cover pages</li>
                  <li>• Remove watermark from PDFs</li>
                  <li>• Higher BOQ creation limits</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLimitDialog(false)}>
                Cancel
              </Button>
              <Link href="/pricing">
                <Button>
                  <Crown className="w-4 h-4 mr-2" />
                  View Plans
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Delete Template?
              </DialogTitle>
              <DialogDescription>
                This will permanently delete <strong>"{templateToDelete?.name}"</strong>. This action cannot be undone.
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
