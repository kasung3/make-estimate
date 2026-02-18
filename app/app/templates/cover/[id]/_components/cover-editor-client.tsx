'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, Save, Check, GripVertical, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface CoverElement {
  id: string;
  type: 'project_name' | 'subtitle' | 'prepared_for' | 'company_name' | 'logo' | 'date' | 'prepared_by' | 'custom_text';
  content?: string;
  visible: boolean;
  style: {
    fontSize: number;
    fontWeight: 'normal' | 'bold';
    italic: boolean;
    underline: boolean;
    align: 'left' | 'center' | 'right';
    color: string;
  };
}

interface CoverPageConfig {
  elements: CoverElement[];
  backgroundColor: string;
  padding: number;
}

interface CoverEditorClientProps {
  template: {
    id: string;
    name: string;
    isDefault: boolean;
    config: CoverPageConfig | null;
  };
  companyName: string;
}

const ELEMENT_TYPES = {
  project_name: 'Project Name',
  subtitle: 'Subtitle',
  prepared_for: 'Prepared For',
  company_name: 'Company Name',
  logo: 'Logo',
  date: 'Date',
  prepared_by: 'Prepared By',
  custom_text: 'Custom Text',
};

const DEFAULT_STYLE = {
  fontSize: 16,
  fontWeight: 'normal' as const,
  italic: false,
  underline: false,
  align: 'center' as const,
  color: '#000000',
};

const getDefaultConfig = (): CoverPageConfig => ({
  elements: [
    { id: '1', type: 'company_name', visible: true, style: { ...DEFAULT_STYLE, fontSize: 28, fontWeight: 'bold', color: '#0891b2' } },
    { id: '2', type: 'project_name', visible: true, style: { ...DEFAULT_STYLE, fontSize: 32, fontWeight: 'bold' } },
    { id: '3', type: 'prepared_for', visible: true, style: { ...DEFAULT_STYLE, fontSize: 18 } },
    { id: '4', type: 'date', visible: true, style: { ...DEFAULT_STYLE, fontSize: 14 } },
  ],
  backgroundColor: '#ffffff',
  padding: 40,
});

function SortableElement({ element, onUpdate, onDelete }: { element: CoverElement; onUpdate: (e: CoverElement) => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: element.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border mb-2">
      <div {...attributes} {...listeners} className="cursor-grab"><GripVertical className="w-4 h-4 text-gray-400" /></div>
      <div className="flex-1 grid grid-cols-4 gap-3 items-center">
        <span className="font-medium text-sm">{ELEMENT_TYPES[element.type]}</span>
        <Input
          type="number"
          value={element.style.fontSize}
          onChange={(e) => onUpdate({ ...element, style: { ...element.style, fontSize: parseInt(e.target.value) || 16 } })}
          className="h-8 w-20"
          min={8}
          max={72}
        />
        <input
          type="color"
          value={element.style.color}
          onChange={(e) => onUpdate({ ...element, style: { ...element.style, color: e.target.value } })}
          className="w-8 h-8 rounded border cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <Switch checked={element.visible} onCheckedChange={(v) => onUpdate({ ...element, visible: v })} />
          <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
}

export function CoverEditorClient({ template, companyName }: CoverEditorClientProps) {
  const router = useRouter();
  const [name, setName] = useState(template.name);
  const [config, setConfig] = useState<CoverPageConfig>(template.config || getDefaultConfig());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = config.elements.findIndex((e) => e.id === active.id);
      const newIndex = config.elements.findIndex((e) => e.id === over.id);
      setConfig({ ...config, elements: arrayMove(config.elements, oldIndex, newIndex) });
      setSaved(false);
    }
  };

  const updateElement = (updated: CoverElement) => {
    setConfig({ ...config, elements: config.elements.map((e) => (e.id === updated.id ? updated : e)) });
    setSaved(false);
  };

  const deleteElement = (id: string) => {
    setConfig({ ...config, elements: config.elements.filter((e) => e.id !== id) });
    setSaved(false);
  };

  const addElement = (type: CoverElement['type']) => {
    const newElement: CoverElement = {
      id: `${Date.now()}`,
      type,
      visible: true,
      style: { ...DEFAULT_STYLE },
      content: type === 'custom_text' ? 'Custom text here' : undefined,
    };
    setConfig({ ...config, elements: [...config.elements, newElement] });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/cover-templates/${template.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, configJson: config }),
      });
      if (!response.ok) throw new Error('Failed to save');
      toast.success('Template saved!');
      setSaved(true);
    } catch (error) {
      toast.error('Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const renderPreviewElement = (element: CoverElement) => {
    if (!element.visible) return null;
    const style: React.CSSProperties = {
      fontSize: element.style.fontSize,
      fontWeight: element.style.fontWeight,
      fontStyle: element.style.italic ? 'italic' : 'normal',
      textDecoration: element.style.underline ? 'underline' : 'none',
      textAlign: element.style.align,
      color: element.style.color,
      marginBottom: '12px',
    };
    let content = '';
    switch (element.type) {
      case 'project_name': content = 'Sample Project Name'; break;
      case 'company_name': content = companyName; break;
      case 'prepared_for': content = 'Prepared for: Client Name'; break;
      case 'date': content = new Date().toLocaleDateString(); break;
      case 'prepared_by': content = `Prepared by: ${companyName}`; break;
      case 'subtitle': content = 'Bill of Quantities'; break;
      case 'custom_text': content = element.content || 'Custom text'; break;
      case 'logo': return <div key={element.id} style={{ ...style, width: 80, height: 80, backgroundColor: '#e5e7eb', margin: '0 auto 12px' }} className="rounded flex items-center justify-center text-xs text-gray-500">Logo</div>;
    }
    return <div key={element.id} style={style}>{content}</div>;
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/app/templates?tab=cover">
              <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Cover Template</h1>
              <p className="text-gray-500">Design your cover page layout</p>
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
              <CardHeader><CardTitle className="text-lg">Template Name</CardTitle></CardHeader>
              <CardContent>
                <Input value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} placeholder="Template name" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Elements</CardTitle>
                  <Select onValueChange={(v) => addElement(v as CoverElement['type'])}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Add element" /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(ELEMENT_TYPES).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-500 mb-3 grid grid-cols-4 gap-3 px-3">
                  <span>Element</span><span>Size</span><span>Color</span><span>Visible</span>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
                  <SortableContext items={config.elements.map((e) => e.id)} strategy={verticalListSortingStrategy}>
                    {config.elements.map((element) => (
                      <SortableElement key={element.id} element={element} onUpdate={updateElement} onDelete={() => deleteElement(element.id)} />
                    ))}
                  </SortableContext>
                </DndContext>
                {config.elements.length === 0 && <p className="text-center text-gray-400 py-4">No elements. Add one above.</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Background</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Label>Color</Label>
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => { setConfig({ ...config, backgroundColor: e.target.value }); setSaved(false); }}
                    className="w-10 h-10 rounded border cursor-pointer"
                  />
                  <Input value={config.backgroundColor} onChange={(e) => { setConfig({ ...config, backgroundColor: e.target.value }); setSaved(false); }} className="w-28 font-mono text-sm" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-6 space-y-4">
            <h3 className="font-semibold text-gray-700">Live Preview</h3>
            <div
              className="border rounded-lg shadow-sm p-8 min-h-[500px]"
              style={{ backgroundColor: config.backgroundColor }}
            >
              {config.elements.map(renderPreviewElement)}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
