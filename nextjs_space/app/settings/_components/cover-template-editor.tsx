'use client';

import { useState, useEffect, useCallback } from 'react';
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
  Plus,
  Trash2,
  GripVertical,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Loader2,
  Check,
  FileText,
  Pencil,
  Eye,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { CoverElement, CoverPageConfig, PdfCoverTemplateType } from '@/lib/types';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface CoverTemplateEditorProps {
  companyName: string;
}

const ELEMENT_TYPE_LABELS: Record<CoverElement['type'], string> = {
  project_name: 'Project Name',
  subtitle: 'Subtitle',
  prepared_for: 'Prepared For',
  company_name: 'Company Name',
  logo: 'Logo',
  date: 'Date',
  prepared_by: 'Prepared By',
  custom_text: 'Custom Text',
};

const DEFAULT_ELEMENT_STYLE = {
  fontSize: 16,
  fontWeight: 'normal' as const,
  italic: false,
  underline: false,
  color: '#333333',
  align: 'center' as const,
  marginTop: 10,
  marginBottom: 10,
};

const getDefaultCoverConfig = (): CoverPageConfig => ({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
    defaultFontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  elements: [
    {
      id: 'project_name',
      type: 'project_name',
      enabled: true,
      style: { ...DEFAULT_ELEMENT_STYLE, fontSize: 36, fontWeight: 'bold', color: '#0891b2', marginBottom: 20 },
    },
    {
      id: 'subtitle',
      type: 'subtitle',
      enabled: true,
      text: 'Bill of Quantities',
      style: { ...DEFAULT_ELEMENT_STYLE, fontSize: 18, color: '#666666', marginBottom: 10 },
    },
    {
      id: 'prepared_for',
      type: 'prepared_for',
      enabled: true,
      style: { ...DEFAULT_ELEMENT_STYLE, fontSize: 18, color: '#666666', marginBottom: 40 },
    },
    {
      id: 'company_name',
      type: 'company_name',
      enabled: true,
      style: { ...DEFAULT_ELEMENT_STYLE, fontSize: 16, color: '#333333' },
    },
  ],
});

// Sortable Element Row Component
function SortableElementRow({
  element,
  onUpdate,
  onDelete,
}: {
  element: CoverElement;
  onUpdate: (id: string, updates: Partial<CoverElement>) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const updateStyle = (updates: Partial<CoverElement['style']>) => {
    onUpdate(element.id, { style: { ...element.style, ...updates } });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`border rounded-lg p-4 bg-white ${isDragging ? 'opacity-50 shadow-lg z-50' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Drag handle */}
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded mt-1"
          style={{ touchAction: 'none' }}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>

        {/* Element content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium text-sm">{ELEMENT_TYPE_LABELS[element.type]}</span>
              <Switch
                checked={element.enabled}
                onCheckedChange={(checked) => onUpdate(element.id, { enabled: checked })}
              />
            </div>
            {element.type === 'custom_text' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-red-500"
                onClick={() => onDelete(element.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {element.enabled && (
            <>
              {/* Custom text input for custom_text, subtitle, prepared_by */}
              {(element.type === 'custom_text' || element.type === 'subtitle' || element.type === 'prepared_by') && (
                <Input
                  value={element.text || ''}
                  onChange={(e) => onUpdate(element.id, { text: e.target.value })}
                  placeholder={element.type === 'prepared_by' ? 'Prepared by: [Name]' : 'Enter text...'}
                  className="h-8 text-sm"
                />
              )}

              {/* Date mode for date type */}
              {element.type === 'date' && (
                <div className="flex items-center gap-2">
                  <Select
                    value={element.dateMode || 'today'}
                    onValueChange={(value) => onUpdate(element.id, { dateMode: value as 'today' | 'custom' })}
                  >
                    <SelectTrigger className="w-32 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Current Date</SelectItem>
                      <SelectItem value="custom">Custom Date</SelectItem>
                    </SelectContent>
                  </Select>
                  {element.dateMode === 'custom' && (
                    <Input
                      type="date"
                      value={element.customDate || ''}
                      onChange={(e) => onUpdate(element.id, { customDate: e.target.value })}
                      className="h-8 text-sm w-40"
                    />
                  )}
                </div>
              )}

              {/* Logo URL for logo type */}
              {element.type === 'logo' && (
                <Input
                  value={element.logoUrl || ''}
                  onChange={(e) => onUpdate(element.id, { logoUrl: e.target.value })}
                  placeholder="Logo URL (https://i.pinimg.com/736x/19/63/c8/1963c80b8983da5f3be640ca7473b098.jpg)"
                  className="h-8 text-sm"
                />
              )}

              {/* Style controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Font size */}
                <div className="flex items-center gap-1">
                  <Label className="text-xs text-gray-500">Size:</Label>
                  <Input
                    type="number"
                    min="8"
                    max="72"
                    value={element.style.fontSize}
                    onChange={(e) => updateStyle({ fontSize: parseInt(e.target.value) || 16 })}
                    className="h-7 w-16 text-xs"
                  />
                </div>

                {/* Color */}
                <div className="flex items-center gap-1">
                  <Label className="text-xs text-gray-500">Color:</Label>
                  <input
                    type="color"
                    value={element.style.color}
                    onChange={(e) => updateStyle({ color: e.target.value })}
                    className="w-7 h-7 rounded border cursor-pointer"
                  />
                </div>

                {/* Bold/Italic/Underline */}
                <div className="flex items-center border rounded">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 rounded-none ${element.style.fontWeight === 'bold' ? 'bg-gray-200' : ''}`}
                    onClick={() => updateStyle({ fontWeight: element.style.fontWeight === 'bold' ? 'normal' : 'bold' })}
                  >
                    <Bold className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 rounded-none border-l ${element.style.italic ? 'bg-gray-200' : ''}`}
                    onClick={() => updateStyle({ italic: !element.style.italic })}
                  >
                    <Italic className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 rounded-none border-l ${element.style.underline ? 'bg-gray-200' : ''}`}
                    onClick={() => updateStyle({ underline: !element.style.underline })}
                  >
                    <Underline className="w-3 h-3" />
                  </Button>
                </div>

                {/* Alignment */}
                <div className="flex items-center border rounded">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 rounded-none ${element.style.align === 'left' ? 'bg-gray-200' : ''}`}
                    onClick={() => updateStyle({ align: 'left' })}
                  >
                    <AlignLeft className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 rounded-none border-l ${element.style.align === 'center' ? 'bg-gray-200' : ''}`}
                    onClick={() => updateStyle({ align: 'center' })}
                  >
                    <AlignCenter className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 rounded-none border-l ${element.style.align === 'right' ? 'bg-gray-200' : ''}`}
                    onClick={() => updateStyle({ align: 'right' })}
                  >
                    <AlignRight className="w-3 h-3" />
                  </Button>
                </div>

                {/* Margins */}
                <div className="flex items-center gap-1">
                  <Label className="text-xs text-gray-500">Top:</Label>
                  <Input
                    type="number"
                    min="0"
                    max="200"
                    value={element.style.marginTop}
                    onChange={(e) => updateStyle({ marginTop: parseInt(e.target.value) || 0 })}
                    className="h-7 w-14 text-xs"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Label className="text-xs text-gray-500">Bottom:</Label>
                  <Input
                    type="number"
                    min="0"
                    max="200"
                    value={element.style.marginBottom}
                    onChange={(e) => updateStyle({ marginBottom: parseInt(e.target.value) || 0 })}
                    className="h-7 w-14 text-xs"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Cover Page Preview Component
function CoverPreview({
  config,
  projectName,
  customerName,
  companyName,
}: {
  config: CoverPageConfig;
  projectName: string;
  customerName: string;
  companyName: string;
}) {
  const renderElement = (element: CoverElement) => {
    if (!element.enabled) return null;

    const style: React.CSSProperties = {
      fontSize: `${element.style.fontSize}px`,
      fontWeight: element.style.fontWeight,
      fontStyle: element.style.italic ? 'italic' : 'normal',
      textDecoration: element.style.underline ? 'underline' : 'none',
      color: element.style.color,
      textAlign: element.style.align,
      marginTop: `${element.style.marginTop}px`,
      marginBottom: `${element.style.marginBottom}px`,
    };

    let content: React.ReactNode = '';

    switch (element.type) {
      case 'project_name':
        content = projectName || 'Project Name';
        break;
      case 'subtitle':
        content = element.text || 'Bill of Quantities';
        break;
      case 'prepared_for':
        content = customerName ? `Prepared for: ${customerName}` : 'Prepared for: [Customer Name]';
        break;
      case 'company_name':
        content = companyName || 'Company Name';
        break;
      case 'logo':
        if (element.logoUrl) {
          return (
            <div key={element.id} style={{ ...style, display: 'flex', justifyContent: element.style.align }}>
              <img src={element.logoUrl} alt="Logo" style={{ maxHeight: element.style.fontSize * 3, maxWidth: '200px' }} />
            </div>
          );
        }
        return (
          <div key={element.id} style={style} className="text-gray-400">
            [Logo]
          </div>
        );
      case 'date':
        content = element.dateMode === 'custom' && element.customDate
          ? new Date(element.customDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
          : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        break;
      case 'prepared_by':
        content = element.text || 'Prepared by: [Name]';
        break;
      case 'custom_text':
        content = element.text || '[Custom Text]';
        break;
    }

    return (
      <div key={element.id} style={style}>
        {content}
      </div>
    );
  };

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-sm"
      style={{
        backgroundColor: config.page.backgroundColor || '#ffffff',
        fontFamily: config.page.defaultFontFamily || "'Segoe UI', sans-serif",
        aspectRatio: '210 / 297', // A4 ratio
        maxHeight: '500px',
      }}
    >
      <div
        style={{
          padding: `${config.page.padding || 40}px`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {config.elements.map(renderElement)}
      </div>
    </div>
  );
}

export function CoverTemplateEditor({ companyName }: CoverTemplateEditorProps) {
  const [templates, setTemplates] = useState<PdfCoverTemplateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PdfCoverTemplateType | null>(null);
  const [editingConfig, setEditingConfig] = useState<CoverPageConfig | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchTemplates = useCallback(async () => {
    try {
      const response = await fetch('/api/cover-templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setEditingName('New Cover Template');
    setEditingConfig(getDefaultCoverConfig());
    setShowEditor(true);
  };

  const handleEditTemplate = (template: PdfCoverTemplateType) => {
    setEditingTemplate(template);
    setEditingName(template.name);
    setEditingConfig(template.configJson as CoverPageConfig);
    setShowEditor(true);
  };

  const handleSaveTemplate = async () => {
    if (!editingConfig || !editingName.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    setSaving(true);
    try {
      const url = editingTemplate ? `/api/cover-templates/${editingTemplate.id}` : '/api/cover-templates';
      const method = editingTemplate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingName,
          configJson: editingConfig,
          isDefault: templates.length === 0, // First template is default
        }),
      });

      if (!response.ok) throw new Error('Failed to save template');

      toast.success(editingTemplate ? 'Template updated' : 'Template created');
      setShowEditor(false);
      fetchTemplates();
    } catch (error) {
      toast.error('Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const response = await fetch(`/api/cover-templates/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete');
      }
      toast.success('Template deleted');
      fetchTemplates();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete template');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const response = await fetch(`/api/cover-templates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDefault: true }),
      });
      if (!response.ok) throw new Error('Failed to set default');
      toast.success('Default template updated');
      fetchTemplates();
    } catch (error) {
      toast.error('Failed to set default template');
    }
  };

  const handleUpdateElement = (id: string, updates: Partial<CoverElement>) => {
    if (!editingConfig) return;
    setEditingConfig({
      ...editingConfig,
      elements: editingConfig.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    });
  };

  const handleDeleteElement = (id: string) => {
    if (!editingConfig) return;
    setEditingConfig({
      ...editingConfig,
      elements: editingConfig.elements.filter((el) => el.id !== id),
    });
  };

  const handleAddElement = (type: CoverElement['type']) => {
    if (!editingConfig) return;
    const newElement: CoverElement = {
      id: `${type}_${Date.now()}`,
      type,
      enabled: true,
      text: type === 'custom_text' ? 'Custom text here' : type === 'prepared_by' ? 'Prepared by: [Name]' : undefined,
      dateMode: type === 'date' ? 'today' : undefined,
      style: { ...DEFAULT_ELEMENT_STYLE },
    };
    setEditingConfig({
      ...editingConfig,
      elements: [...editingConfig.elements, newElement],
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !editingConfig) return;

    const oldIndex = editingConfig.elements.findIndex((el) => el.id === active.id);
    const newIndex = editingConfig.elements.findIndex((el) => el.id === over.id);

    setEditingConfig({
      ...editingConfig,
      elements: arrayMove(editingConfig.elements, oldIndex, newIndex),
    });
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
          <h3 className="text-lg font-medium">PDF Cover Templates</h3>
          <p className="text-sm text-gray-500">Customize the cover page for your BOQ PDFs</p>
        </div>
        <Button onClick={handleCreateTemplate}>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      {templates.length === 0 ? (
        <Card className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No templates yet</h3>
          <p className="text-gray-500 mb-4">Create your first cover template to customize your PDF exports</p>
          <Button onClick={handleCreateTemplate}>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-cyan-600" />
                  <div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-gray-500">
                      {template.isDefault && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-100 text-cyan-800 mr-2">
                          <Check className="w-3 h-3 mr-1" />
                          Default
                        </span>
                      )}
                      Updated {new Date(template.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!template.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => handleSetDefault(template.id)}>
                      Set Default
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleEditTemplate(template)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Template Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? 'Edit Template' : 'New Template'}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Editor Panel */}
              <div className="overflow-y-auto pr-4 space-y-4">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    placeholder="Enter template name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Page Background Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingConfig?.page.backgroundColor || '#ffffff'}
                      onChange={(e) =>
                        editingConfig &&
                        setEditingConfig({
                          ...editingConfig,
                          page: { ...editingConfig.page, backgroundColor: e.target.value },
                        })
                      }
                      className="w-10 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={editingConfig?.page.backgroundColor || '#ffffff'}
                      onChange={(e) =>
                        editingConfig &&
                        setEditingConfig({
                          ...editingConfig,
                          page: { ...editingConfig.page, backgroundColor: e.target.value },
                        })
                      }
                      className="w-28"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Elements</Label>
                    <Select onValueChange={(value) => handleAddElement(value as CoverElement['type'])}>
                      <SelectTrigger className="w-40 h-8">
                        <Plus className="w-3 h-3 mr-1" />
                        <span className="text-sm">Add Element</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="logo">Logo</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="prepared_by">Prepared By</SelectItem>
                        <SelectItem value="custom_text">Custom Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {editingConfig && (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      modifiers={[restrictToVerticalAxis]}
                    >
                      <SortableContext
                        items={editingConfig.elements.map((el) => el.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {editingConfig.elements.map((element) => (
                            <SortableElementRow
                              key={element.id}
                              element={element}
                              onUpdate={handleUpdateElement}
                              onDelete={handleDeleteElement}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
              </div>

              {/* Preview Panel */}
              <div className="overflow-y-auto pl-4 border-l">
                <div className="flex items-center justify-between mb-4">
                  <Label>Preview</Label>
                  <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
                    <Eye className="w-4 h-4 mr-1" />
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </Button>
                </div>
                {showPreview !== false && editingConfig && (
                  <CoverPreview
                    config={editingConfig}
                    projectName="Sample Project Name"
                    customerName="Mr. John Doe"
                    companyName={companyName}
                  />
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowEditor(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Template'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
