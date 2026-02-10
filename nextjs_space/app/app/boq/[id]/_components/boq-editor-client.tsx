'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
  Loader2,
  FileDown,
  Check,
  GripVertical,
  StickyNote,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Expand,
  X,
  FileText,
  Palette,
  Calendar,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { metaTrackCustom } from '@/lib/meta-pixel';
import { BoqWithRelations, CategoryWithItems, BoqItemType, CustomerType, CompanySettings, PdfCoverTemplateType, PdfThemeType } from '@/lib/types';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
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

interface BoqEditorClientProps {
  boq: BoqWithRelations;
  customers: CustomerType[];
  company: CompanySettings;
  coverTemplates: PdfCoverTemplateType[];
  pdfThemes: PdfThemeType[];
}

interface EditItemDialogData {
  item: BoqItemType;
  categoryId: string;
  categoryName: string;
  itemNumber: string | null;
}

// =============================================================================
// SORTABLE ITEM COMPONENT - Hooks at top level (fixes React rules of hooks)
// =============================================================================
// Helper function to generate the grid template string
function getGridTemplateColumns(columnWidths: Record<string, number>): string {
  return `${columnWidths.grip}px ${columnWidths.number}px minmax(200px, 1fr) ${columnWidths.unit}px ${columnWidths.unitCost}px ${columnWidths.markup}px ${columnWidths.unitPrice}px ${columnWidths.qty}px ${columnWidths.amount}px ${columnWidths.actions}px`;
}

interface SortableItemRowProps {
  item: BoqItemType;
  itemNumber: string | null;
  categoryId: string;
  categoryName: string;
  columnWidths: Record<string, number>;
  getItemValue: (itemId: string, field: keyof BoqItemType, originalValue: any) => any;
  handleUpdateItem: (itemId: string, updates: Partial<BoqItemType>, immediate?: boolean) => void;
  handleDeleteItem: (itemId: string) => void;
  openEditItemDialog: (item: BoqItemType, categoryId: string, categoryName: string, itemNumber: string | null) => void;
  handleNoteClick: (item: BoqItemType, categoryId: string, categoryName: string, currentHtml: string) => void;
  inlineEditingNoteId: string | null;
  inlineEditText: string;
  setInlineEditText: (text: string) => void;
  inlineTextareaRef: React.RefObject<HTMLTextAreaElement>;
  handleInlineNoteKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, itemId: string) => void;
  saveInlineEdit: (itemId: string) => void;
  cancelInlineEdit: () => void;
  sanitizeHtml: (html: string) => string;
  formatNumber: (num: number, decimals?: number) => string;
  formatCurrency: (amount: number) => string;
}

function SortableItemRow({
  item,
  itemNumber,
  categoryId,
  categoryName,
  columnWidths,
  getItemValue,
  handleUpdateItem,
  handleDeleteItem,
  openEditItemDialog,
  handleNoteClick,
  inlineEditingNoteId,
  inlineEditText,
  setInlineEditText,
  inlineTextareaRef,
  handleInlineNoteKeyDown,
  saveInlineEdit,
  cancelInlineEdit,
  sanitizeHtml,
  formatNumber,
  formatCurrency,
}: SortableItemRowProps) {
  // useSortable MUST be at the top level of a component (not in a loop/callback)
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Use div-based layout instead of tr for proper CSS transform support
  const gridStyle = {
    ...style,
    display: 'grid',
    gridTemplateColumns: getGridTemplateColumns(columnWidths),
  } as React.CSSProperties;

  if (item?.isNote) {
    // Render note row - note content spans columns 3-9 (description through amount)
    return (
      <div
        ref={setNodeRef}
        style={gridStyle}
        {...attributes}
        className={`items-center border-b border-gray-100 bg-amber-50 ${isDragging ? 'opacity-50 bg-amber-100 shadow-lg z-50' : ''}`}
        role="row"
      >
        {/* Drag handle */}
        <div className="py-2 px-1 flex items-center justify-center" role="cell">
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded select-none"
            style={{ touchAction: 'none', userSelect: 'none' }}
          >
            <GripVertical className="w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        {/* Note icon instead of item number */}
        <div className="py-2 px-2 flex items-center justify-center" role="cell">
          <StickyNote className="w-4 h-4 text-amber-500" />
        </div>
        {/* Note content - spans description through amount columns (7 columns) */}
        <div className="py-2 px-2" role="cell" style={{ gridColumn: '3 / 10' }}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {inlineEditingNoteId === item.id ? (
                <div className="flex-1 space-y-1">
                  <Textarea
                    ref={inlineTextareaRef}
                    value={inlineEditText}
                    onChange={(e) => setInlineEditText(e.target.value)}
                    onBlur={() => saveInlineEdit(item.id)}
                    onKeyDown={(e) => handleInlineNoteKeyDown(e, item.id)}
                    className="min-h-[60px] text-sm resize-none"
                    placeholder="Enter note text..."
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Basic edit (Ctrl+Enter to save, Esc to cancel). Use expand for formatting.
                    </span>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          cancelInlineEdit();
                        }}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-purple-600 hover:text-purple-700"
                        onClick={(e) => {
                          e.preventDefault();
                          saveInlineEdit(item.id);
                        }}
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="flex-1 min-h-[32px] px-3 py-1.5 bg-white border rounded-lg text-sm cursor-text hover:border-purple-400 transition-colors"
                  onClick={() =>
                    handleNoteClick(
                      item,
                      categoryId,
                      categoryName,
                      getItemValue(item.id, 'noteContent', item?.noteContent) ?? ''
                    )
                  }
                  title="Click to edit"
                >
                  {(getItemValue(item.id, 'noteContent', item?.noteContent) ?? '') ? (
                    <div
                      className="prose prose-sm max-w-none [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(getItemValue(item.id, 'noteContent', item?.noteContent) ?? ''),
                      }}
                    />
                  ) : (
                    <span className="text-gray-400">Click to add note...</span>
                  )}
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-purple-600 flex-shrink-0"
                onClick={() => openEditItemDialog(item, categoryId, categoryName, null)}
                title="Edit note with formatting (B/I/U)"
              >
                <Expand className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`pdf-${item.id}`}
                  checked={getItemValue(item.id, 'includeInPdf', item?.includeInPdf) ?? true}
                  onCheckedChange={(checked) =>
                    handleUpdateItem(item?.id, { includeInPdf: checked as boolean }, true)
                  }
                />
                <label htmlFor={`pdf-${item.id}`} className="text-xs text-gray-500">
                  Include in PDF
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Delete button */}
        <div className="py-2 px-2 flex items-center justify-center" role="cell">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={() => handleDeleteItem(item?.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Regular item row - using div grid instead of tr for CSS transform support
  const unitCost = getItemValue(item.id, 'unitCost', item?.unitCost) ?? 0;
  const markupPct = getItemValue(item.id, 'markupPct', item?.markupPct) ?? 0;
  const quantity = getItemValue(item.id, 'quantity', item?.quantity) ?? 0;
  const unitPrice = unitCost * (1 + markupPct / 100);
  const amount = unitPrice * quantity;

  return (
    <div
      ref={setNodeRef}
      style={gridStyle}
      {...attributes}
      className={`items-center border-b border-gray-100 hover:bg-gray-50 ${isDragging ? 'opacity-50 bg-gray-100 shadow-lg z-50' : ''}`}
      role="row"
    >
      {/* Drag handle */}
      <div className="py-2 px-1 flex items-center justify-center" role="cell">
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded select-none"
          style={{ touchAction: 'none', userSelect: 'none' }}
        >
          <GripVertical className="w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
      {/* Item number */}
      <div className="py-2 px-2 text-gray-500 text-sm" role="cell">{itemNumber}</div>
      {/* Description */}
      <div className="py-2 px-2 min-w-0" role="cell">
        <div className="flex items-center space-x-1">
          <Input
            value={getItemValue(item.id, 'description', item?.description) ?? ''}
            onChange={(e) => handleUpdateItem(item?.id, { description: e.target.value })}
            className="h-8 text-sm w-full"
            placeholder="Description"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-purple-600 flex-shrink-0"
            onClick={() => openEditItemDialog(item, categoryId, categoryName, itemNumber)}
            title="Expand to edit"
          >
            <Expand className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* Unit */}
      <div className="py-2 px-2" role="cell">
        <Input
          value={getItemValue(item.id, 'unit', item?.unit) ?? ''}
          onChange={(e) => handleUpdateItem(item?.id, { unit: e.target.value })}
          className="h-8 text-sm w-full"
          placeholder="Unit"
        />
      </div>
      {/* Unit Cost */}
      <div className="py-2 px-2" role="cell">
        <Input
          type="number"
          step="0.01"
          value={unitCost}
          onChange={(e) =>
            handleUpdateItem(item?.id, {
              unitCost: parseFloat(e.target.value) || 0,
            })
          }
          className="h-8 text-sm text-right w-full"
        />
      </div>
      {/* Markup % */}
      <div className="py-2 px-2" role="cell">
        <Input
          type="number"
          step="0.01"
          value={markupPct}
          onChange={(e) =>
            handleUpdateItem(item?.id, {
              markupPct: parseFloat(e.target.value) || 0,
            })
          }
          className="h-8 text-sm text-right w-full"
        />
      </div>
      {/* Unit Price (readonly) */}
      <div className="py-2 px-2 text-right font-medium text-gray-700 text-sm whitespace-nowrap" role="cell">{formatNumber(unitPrice)}</div>
      {/* Qty */}
      <div className="py-2 px-2" role="cell">
        <Input
          type="number"
          step="0.01"
          value={quantity}
          onChange={(e) =>
            handleUpdateItem(item?.id, {
              quantity: parseFloat(e.target.value) || 0,
            })
          }
          className="h-8 text-sm text-right w-full"
        />
      </div>
      {/* Amount */}
      <div className="py-2 px-2 text-right font-semibold text-purple-600 text-sm whitespace-nowrap" role="cell">{formatCurrency(amount)}</div>
      {/* Delete button */}
      <div className="py-2 px-2 flex items-center justify-center" role="cell">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-500"
          onClick={() => handleDeleteItem(item?.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// =============================================================================
// SORTABLE CATEGORY COMPONENT - Hooks at top level (fixes React rules of hooks)
// =============================================================================
interface SortableCategoryProps {
  category: CategoryWithItems;
  categoryIndex: number;
  isExpanded: boolean;
  toggleCategory: (id: string) => void;
  getCategoryName: (cat: CategoryWithItems) => string;
  handleUpdateCategory: (id: string, name: string) => void;
  handleDeleteCategory: (id: string) => void;
  handleAddItem: (categoryId: string, isNote: boolean) => void;
  formatCurrency: (amount: number) => string;
  getCategorySubtotal: (cat: CategoryWithItems) => number;
  columnWidths: Record<string, number>;
  handleResizeStart: (e: React.MouseEvent, columnKey: string) => void;
  sensors: ReturnType<typeof useSensors>;
  getItemNumber: (catIndex: number, items: BoqItemType[], itemIndex: number) => string | null;
  handleItemDragStart: (event: DragStartEvent) => void;
  handleItemDragEnd: (event: DragEndEvent, categoryId: string) => void;
  // Props passed down to SortableItemRow
  getItemValue: (itemId: string, field: keyof BoqItemType, originalValue: any) => any;
  handleUpdateItem: (itemId: string, updates: Partial<BoqItemType>, immediate?: boolean) => void;
  handleDeleteItem: (itemId: string) => void;
  openEditItemDialog: (item: BoqItemType, categoryId: string, categoryName: string, itemNumber: string | null) => void;
  handleNoteClick: (item: BoqItemType, categoryId: string, categoryName: string, currentHtml: string) => void;
  inlineEditingNoteId: string | null;
  inlineEditText: string;
  setInlineEditText: (text: string) => void;
  inlineTextareaRef: React.RefObject<HTMLTextAreaElement>;
  handleInlineNoteKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, itemId: string) => void;
  saveInlineEdit: (itemId: string) => void;
  cancelInlineEdit: () => void;
  sanitizeHtml: (html: string) => string;
  formatNumber: (num: number, decimals?: number) => string;
  // Item limit props
  itemLimit: number | null;
  currentItemCount: number;
  isAtItemLimit: boolean;
  planKey: string | null;
}

function SortableCategory({
  category,
  categoryIndex,
  isExpanded,
  toggleCategory,
  getCategoryName,
  handleUpdateCategory,
  handleDeleteCategory,
  handleAddItem,
  formatCurrency,
  getCategorySubtotal,
  columnWidths,
  handleResizeStart,
  sensors,
  getItemNumber,
  handleItemDragStart,
  handleItemDragEnd,
  getItemValue,
  handleUpdateItem,
  handleDeleteItem,
  openEditItemDialog,
  handleNoteClick,
  inlineEditingNoteId,
  inlineEditText,
  setInlineEditText,
  inlineTextareaRef,
  handleInlineNoteKeyDown,
  saveInlineEdit,
  cancelInlineEdit,
  sanitizeHtml,
  formatNumber,
  itemLimit,
  currentItemCount,
  isAtItemLimit,
  planKey,
}: SortableCategoryProps) {
  // useSortable MUST be at the top level of a component (not in a loop/callback)
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const itemIds = useMemo(
    () => (category?.items ?? []).map((item) => item?.id),
    [category?.items]
  );

  return (
    <div
      ref={setNodeRef}
      style={style as React.CSSProperties}
      {...attributes}
      className={isDragging ? 'opacity-50' : ''}
    >
      <Card
        className={`shadow-md border-0 overflow-hidden transition-shadow ${
          isDragging ? 'shadow-xl ring-2 ring-purple-400' : ''
        }`}
      >
        <Collapsible open={isExpanded} onOpenChange={() => toggleCategory(category?.id)}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div
                    ref={setActivatorNodeRef}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded select-none"
                    style={{ touchAction: 'none', userSelect: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 pointer-events-none" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 flex-shrink-0">
                    {categoryIndex + 1}.
                  </span>
                  <Input
                    value={getCategoryName(category)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleUpdateCategory(category?.id, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="text-lg font-semibold border-0 p-0 h-auto focus-visible:ring-0 bg-transparent flex-1 min-w-0"
                  />
                  <span className="text-sm text-gray-500 flex-shrink-0">
                    ({(category?.items ?? []).filter((i) => !i?.isNote).length} items)
                  </span>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-lg font-semibold text-purple-600">
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
                  {isExpanded ? (
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleItemDragStart}
                onDragEnd={(e) => handleItemDragEnd(e, category.id)}
                modifiers={[restrictToVerticalAxis]}
              >
                <div className="overflow-x-auto">
                  {/* Grid-based table using divs for proper CSS transform support */}
                  <div 
                    className="text-sm flex flex-col" 
                    role="table"
                    style={{ minWidth: '1000px' }}
                  >
                    {/* Header row */}
                    <div 
                      role="row"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: getGridTemplateColumns(columnWidths),
                      }}
                    >
                      <div className="py-2 px-1 font-medium text-gray-500 border-b border-gray-200" role="columnheader"></div>
                      <div className="py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        #
                        <div
                          className="absolute -right-1 top-0 bottom-0 w-3 cursor-col-resize group z-10"
                          onMouseDown={(e) => handleResizeStart(e, 'number')}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-0.5 bg-gray-200 group-hover:bg-purple-400 group-hover:w-1 transition-all rounded-full" />
                        </div>
                      </div>
                      <div className="py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Description
                        <div
                          className="absolute -right-1 top-0 bottom-0 w-3 cursor-col-resize group z-10"
                          onMouseDown={(e) => handleResizeStart(e, 'description')}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-0.5 bg-gray-200 group-hover:bg-purple-400 group-hover:w-1 transition-all rounded-full" />
                        </div>
                      </div>
                      <div className="py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Unit
                        <div
                          className="absolute -right-1 top-0 bottom-0 w-3 cursor-col-resize group z-10"
                          onMouseDown={(e) => handleResizeStart(e, 'unit')}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-0.5 bg-gray-200 group-hover:bg-purple-400 group-hover:w-1 transition-all rounded-full" />
                        </div>
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Unit Cost
                        <div
                          className="absolute -right-1 top-0 bottom-0 w-3 cursor-col-resize group z-10"
                          onMouseDown={(e) => handleResizeStart(e, 'unitCost')}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-0.5 bg-gray-200 group-hover:bg-purple-400 group-hover:w-1 transition-all rounded-full" />
                        </div>
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Markup %
                        <div
                          className="absolute -right-1 top-0 bottom-0 w-3 cursor-col-resize group z-10"
                          onMouseDown={(e) => handleResizeStart(e, 'markup')}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-0.5 bg-gray-200 group-hover:bg-purple-400 group-hover:w-1 transition-all rounded-full" />
                        </div>
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Unit Price
                        <div
                          className="absolute -right-1 top-0 bottom-0 w-3 cursor-col-resize group z-10"
                          onMouseDown={(e) => handleResizeStart(e, 'unitPrice')}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-0.5 bg-gray-200 group-hover:bg-purple-400 group-hover:w-1 transition-all rounded-full" />
                        </div>
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Qty
                        <div
                          className="absolute -right-1 top-0 bottom-0 w-3 cursor-col-resize group z-10"
                          onMouseDown={(e) => handleResizeStart(e, 'qty')}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-0.5 bg-gray-200 group-hover:bg-purple-400 group-hover:w-1 transition-all rounded-full" />
                        </div>
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Amount
                        <div
                          className="absolute -right-1 top-0 bottom-0 w-3 cursor-col-resize group z-10"
                          onMouseDown={(e) => handleResizeStart(e, 'amount')}
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 top-1 bottom-1 w-0.5 bg-gray-200 group-hover:bg-purple-400 group-hover:w-1 transition-all rounded-full" />
                        </div>
                      </div>
                      <div className="border-b border-gray-200" role="columnheader"></div>
                    </div>
                    {/* Sortable items */}
                    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
                      {(category?.items ?? []).map((item, itemIndex) => (
                        <SortableItemRow
                          key={item?.id}
                          item={item}
                          itemNumber={getItemNumber(categoryIndex, category?.items ?? [], itemIndex)}
                          categoryId={category.id}
                          categoryName={category.name ?? ''}
                          columnWidths={columnWidths}
                          getItemValue={getItemValue}
                          handleUpdateItem={handleUpdateItem}
                          handleDeleteItem={handleDeleteItem}
                          openEditItemDialog={openEditItemDialog}
                          handleNoteClick={handleNoteClick}
                          inlineEditingNoteId={inlineEditingNoteId}
                          inlineEditText={inlineEditText}
                          setInlineEditText={setInlineEditText}
                          inlineTextareaRef={inlineTextareaRef}
                          handleInlineNoteKeyDown={handleInlineNoteKeyDown}
                          saveInlineEdit={saveInlineEdit}
                          cancelInlineEdit={cancelInlineEdit}
                          sanitizeHtml={sanitizeHtml}
                          formatNumber={formatNumber}
                          formatCurrency={formatCurrency}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </div>
              </DndContext>
              <div className="flex flex-col space-y-2 mt-3">
                {isAtItemLimit && (
                  <div className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-md border border-amber-200">
                    Item limit reached ({currentItemCount}/{itemLimit}). 
                    <a href="/pricing" className="ml-1 underline hover:text-amber-700">Upgrade</a> to add more items.
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    className={`flex-1 ${isAtItemLimit ? 'text-gray-400 cursor-not-allowed' : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50'}`}
                    onClick={() => handleAddItem(category?.id, false)}
                    disabled={isAtItemLimit}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item {itemLimit !== null && `(${currentItemCount}/${itemLimit})`}
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                    onClick={() => handleAddItem(category?.id, true)}
                  >
                    <StickyNote className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}

// =============================================================================
// MAIN BOQ EDITOR CLIENT COMPONENT
// =============================================================================
export function BoqEditorClient({
  boq: initialBoq,
  customers: initialCustomers,
  company,
  coverTemplates: initialCoverTemplates,
  pdfThemes: initialPdfThemes,
}: BoqEditorClientProps) {
  const router = useRouter();
  const [boq, setBoq] = useState<BoqWithRelations>(initialBoq);
  const [customers, setCustomers] = useState(initialCustomers ?? []);
  const [coverTemplates, setCoverTemplates] = useState<PdfCoverTemplateType[]>(initialCoverTemplates ?? []);
  const [pdfThemes, setPdfThemes] = useState<PdfThemeType[]>(initialPdfThemes ?? []);
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

  // Item limit tracking (for Free plan)
  const [itemLimit, setItemLimit] = useState<number | null>(null);
  const [planKey, setPlanKey] = useState<string | null>(null);

  // Edit item dialog state
  const [editItemDialog, setEditItemDialog] = useState<EditItemDialogData | null>(null);
  const [editItemValues, setEditItemValues] = useState<Partial<BoqItemType>>({});

  // Note editor ref for rich text
  const noteEditorRef = useRef<HTMLDivElement>(null);
  const noteEditorInitializedRef = useRef<string | null>(null);

  // Inline note editing state
  const [inlineEditingNoteId, setInlineEditingNoteId] = useState<string | null>(null);
  const [inlineEditText, setInlineEditText] = useState('');
  const inlineTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Local input states to prevent typing lag
  const [localProjectName, setLocalProjectName] = useState(initialBoq?.projectName ?? '');
  const [localCategoryNames, setLocalCategoryNames] = useState<Record<string, string>>({});
  const [localItemValues, setLocalItemValues] = useState<Record<string, Partial<BoqItemType>>>({});

  // Column resize state - widths match the previous table layout
  const DEFAULT_COLUMN_WIDTHS = {
    grip: 36,
    number: 56,
    description: 320, // wider for description content, also uses minmax in grid
    unit: 90,
    unitCost: 110,
    markup: 90,
    unitPrice: 110,
    qty: 80,
    amount: 140,
    actions: 48,
  };

  // Per-column min/max width constraints for better UX
  const COLUMN_WIDTH_CONSTRAINTS: Record<string, { min: number; max: number }> = {
    number: { min: 40, max: 80 },
    description: { min: 150, max: 600 },
    unit: { min: 60, max: 150 },
    unitCost: { min: 80, max: 180 },
    markup: { min: 60, max: 120 },
    unitPrice: { min: 80, max: 180 },
    qty: { min: 50, max: 120 },
    amount: { min: 100, max: 200 },
  };

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(DEFAULT_COLUMN_WIDTHS);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const resizeStartXRef = useRef<number>(0);
  const resizeStartWidthRef = useRef<number>(0);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputSaveTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  const currencySymbol = company?.currencySymbol ?? 'Rs.';
  const currencyPosition = company?.currencyPosition ?? 'left';

  // Sanitize HTML to prevent XSS
  const sanitizeHtml = useCallback((html: string): string => {
    if (!html) return '';
    if (typeof window === 'undefined') return html;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const allowedTags = ['strong', 'b', 'em', 'i', 'u', 'p', 'br', 'ul', 'ol', 'li', 'span'];

    const removeUnsafe = (element: Element) => {
      element.querySelectorAll('script').forEach((el) => el.remove());
      element.querySelectorAll('*').forEach((el) => {
        const tagName = el.tagName.toLowerCase();
        if (!allowedTags.includes(tagName)) {
          const parent = el.parentNode;
          while (el.firstChild) {
            parent?.insertBefore(el.firstChild, el);
          }
          el.remove();
          return;
        }
        const attrs = Array.from(el.attributes);
        attrs.forEach((attr) => {
          el.removeAttribute(attr.name);
        });
      });
    };

    removeUnsafe(tempDiv);
    return tempDiv.innerHTML;
  }, []);

  // Check if HTML contains formatting tags
  const noteHasFormatting = useCallback((html: string): boolean => {
    if (!html) return false;
    const formattingTags = [
      'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
    ];
    const tagPattern = new RegExp(`<(${formattingTags.join('|')})(\\s[^>]*)?>`, 'i');
    if (tagPattern.test(html)) return true;
    if (/<span\s+[^>]*style\s*=/i.test(html)) return true;
    if (/<[^>]+\s+style\s*=/i.test(html)) return true;
    return false;
  }, []);

  // Convert HTML to plain text
  const htmlToPlainText = useCallback((html: string): string => {
    if (!html) return '';
    if (typeof window === 'undefined') return html;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.innerHTML = tempDiv.innerHTML
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<p>/gi, '');
    return tempDiv.textContent || tempDiv.innerText || '';
  }, []);

  // Convert plain text to safe HTML
  const plainTextToSafeHtml = useCallback((text: string): string => {
    if (!text) return '';
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    return escaped.replace(/\n/g, '<br>');
  }, []);

  // Format number with thousand separators
  const formatNumber = useCallback((num: number, decimals: number = 2): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  const formatCurrency = useCallback(
    (amount: number): string => {
      const formatted = formatNumber(amount ?? 0, 2);
      return currencyPosition === 'left'
        ? `${currencySymbol} ${formatted}`
        : `${formatted} ${currencySymbol}`;
    },
    [currencySymbol, currencyPosition, formatNumber]
  );

  const calculateTotals = useCallback(() => {
    let subtotal = 0;
    let totalCost = 0;

    (boq?.categories ?? []).forEach((cat) => {
      (cat?.items ?? []).forEach((item) => {
        if (item?.isNote) return;
        const qty = item?.quantity ?? 0;
        if (qty > 0) {
          const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
          subtotal += unitPrice * qty;
          totalCost += (item?.unitCost ?? 0) * qty;
        }
      });
    });

    let discount = 0;
    if (boq?.discountEnabled) {
      if (boq?.discountType === 'percent') {
        discount = subtotal * ((boq?.discountValue ?? 0) / 100);
      } else {
        discount = boq?.discountValue ?? 0;
      }
    }

    const afterDiscount = subtotal - discount;
    const vatAmount = boq?.vatEnabled ? afterDiscount * ((boq?.vatPercent ?? 0) / 100) : 0;
    const finalTotal = afterDiscount + vatAmount;

    const priceAfterDiscount = afterDiscount;
    const profit = priceAfterDiscount - totalCost;
    const grossProfitPct = priceAfterDiscount > 0 ? (profit / priceAfterDiscount) * 100 : 0;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      vatAmount: Math.round(vatAmount * 100) / 100,
      finalTotal: Math.round(finalTotal * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      priceAfterDiscount: Math.round(priceAfterDiscount * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      grossProfitPct: Math.round(grossProfitPct * 100) / 100,
    };
  }, [boq]);

  const totals = calculateTotals();

  // Autosave
  const autosavePromiseRef = useRef<Promise<void> | null>(null);

  const autosave = useCallback(async () => {
    setSaving(true);
    try {
      await fetch(`/api/boqs/${boq?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: boq?.projectName,
          customerId: boq?.customerId,
          coverTemplateId: boq?.coverTemplateId,
          pdfThemeId: boq?.pdfThemeId,
          dateMode: boq?.dateMode,
          preparationDate: boq?.preparationDate,
          discountEnabled: boq?.discountEnabled,
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
      autosavePromiseRef.current = autosave();
    }, 1500);
  }, [autosave]);

  const flushPendingAutosave = useCallback(async () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    if (autosavePromiseRef.current) {
      await autosavePromiseRef.current;
    }
    await autosave();
  }, [autosave]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      Object.values(inputSaveTimeoutRef.current).forEach(clearTimeout);
    };
  }, []);

  // Fetch billing status to check item limits
  useEffect(() => {
    const fetchBillingStatus = async () => {
      try {
        const response = await fetch('/api/billing/status');
        if (response.ok) {
          const data = await response.json();
          setItemLimit(data.boqItemsLimit ?? null);
          setPlanKey(data.planKey ?? null);
        }
      } catch (error) {
        console.error('Failed to fetch billing status:', error);
      }
    };
    fetchBillingStatus();
  }, []);

  // Compute current item count (non-note items only)
  const currentItemCount = useMemo(() => {
    if (!boq?.categories) return 0;
    return boq.categories.reduce((total, cat) => {
      if (!cat?.items) return total;
      return total + cat.items.filter(item => !item?.isNote).length;
    }, 0);
  }, [boq?.categories]);

  // Check if at item limit
  const isAtItemLimit = itemLimit !== null && currentItemCount >= itemLimit;

  useEffect(() => {
    setLocalProjectName(boq?.projectName ?? '');
  }, [boq?.projectName]);

  // Load column widths from localStorage with validation
  useEffect(() => {
    try {
      const savedWidths = localStorage.getItem('boq_column_widths');
      if (savedWidths) {
        const parsed = JSON.parse(savedWidths);
        // Validate and constrain each saved width
        const validatedWidths: Record<string, number> = {};
        for (const key of Object.keys(DEFAULT_COLUMN_WIDTHS)) {
          if (typeof parsed[key] === 'number' && !isNaN(parsed[key])) {
            const constraints = COLUMN_WIDTH_CONSTRAINTS[key];
            if (constraints) {
              // Clamp to valid range
              validatedWidths[key] = Math.max(constraints.min, Math.min(constraints.max, parsed[key]));
            } else {
              validatedWidths[key] = parsed[key];
            }
          }
        }
        if (Object.keys(validatedWidths).length > 0) {
          setColumnWidths((prev) => ({ ...prev, ...validatedWidths }));
        }
      }
    } catch (e) {
      // If localStorage is corrupted, clear it and use defaults
      try {
        localStorage.removeItem('boq_column_widths');
      } catch (_) {}
    }
  }, []);

  const saveColumnWidths = useCallback((widths: Record<string, number>) => {
    try {
      localStorage.setItem('boq_column_widths', JSON.stringify(widths));
    } catch (e) {
      // Ignore
    }
  }, []);

  // Column resize handlers
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, columnKey: string) => {
      e.preventDefault();
      e.stopPropagation();
      setResizingColumn(columnKey);
      resizeStartXRef.current = e.clientX;
      resizeStartWidthRef.current = columnWidths[columnKey];
    },
    [columnWidths]
  );

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!resizingColumn) return;
      const diff = e.clientX - resizeStartXRef.current;
      const constraints = COLUMN_WIDTH_CONSTRAINTS[resizingColumn];
      let newWidth = resizeStartWidthRef.current + diff;
      
      // Apply per-column min/max constraints
      if (constraints) {
        newWidth = Math.max(constraints.min, Math.min(constraints.max, newWidth));
      } else {
        newWidth = Math.max(40, newWidth);
      }
      
      setColumnWidths((prev) => ({ ...prev, [resizingColumn]: newWidth }));
    },
    [resizingColumn]
  );

  const handleResizeEnd = useCallback(() => {
    if (resizingColumn) {
      saveColumnWidths(columnWidths);
    }
    setResizingColumn(null);
  }, [resizingColumn, columnWidths, saveColumnWidths]);

  useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      // Add a class to the body to indicate resizing state for CSS targeting
      document.body.classList.add('resizing-column');
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.classList.remove('resizing-column');
    }
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.classList.remove('resizing-column');
    };
  }, [resizingColumn, handleResizeMove, handleResizeEnd]);

  const resetColumnWidths = useCallback(() => {
    setColumnWidths(DEFAULT_COLUMN_WIDTHS);
    try {
      localStorage.removeItem('boq_column_widths');
    } catch (e) {
      // Ignore
    }
    toast.success('Column widths reset to default');
  }, []);

  const updateBoq = (updates: Partial<BoqWithRelations>) => {
    setBoq((prev) => ({ ...(prev ?? {}), ...updates } as BoqWithRelations));
    triggerAutosave();
  };

  const handleProjectNameChange = (value: string) => {
    setLocalProjectName(value);
    if (inputSaveTimeoutRef.current['projectName']) {
      clearTimeout(inputSaveTimeoutRef.current['projectName']);
    }
    inputSaveTimeoutRef.current['projectName'] = setTimeout(() => {
      updateBoq({ projectName: value });
    }, 500);
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boqId: boq?.id,
          name: 'New Category',
          sortOrder: boq?.categories?.length ?? 0,
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
    setLocalCategoryNames((prev) => ({ ...prev, [categoryId]: name }));

    if (inputSaveTimeoutRef.current[`cat_${categoryId}`]) {
      clearTimeout(inputSaveTimeoutRef.current[`cat_${categoryId}`]);
    }
    inputSaveTimeoutRef.current[`cat_${categoryId}`] = setTimeout(async () => {
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
    }, 500);
  };

  const getCategoryName = useCallback(
    (category: CategoryWithItems) => {
      return localCategoryNames[category.id] ?? category.name ?? '';
    },
    [localCategoryNames]
  );

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

  const handleAddItem = async (categoryId: string, isNote: boolean = false) => {
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
          isNote: isNote,
          noteContent: isNote ? '' : null,
          includeInPdf: true,
        }),
      });

      const data = await response.json();
      
      // Handle item limit exceeded error
      if (response.status === 403 && data.error === 'Item limit reached') {
        // Track ReachedLimit event
        metaTrackCustom('ReachedLimit', { 
          limit_type: 'items_per_boq',
          plan_key: data.plan_key || 'unknown',
        });
        toast.error(data.message || `Item limit reached. Upgrade to add more items.`, {
          duration: 5000,
        });
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add item');
      }

      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: (prev?.categories ?? []).map((cat) =>
          cat?.id === categoryId
            ? { ...(cat ?? {}), items: [...(cat?.items ?? []), data] }
            : cat
        ),
      } as BoqWithRelations));
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const getItemValue = useCallback(
    (itemId: string, field: keyof BoqItemType, originalValue: any) => {
      return localItemValues[itemId]?.[field] ?? originalValue;
    },
    [localItemValues]
  );

  const handleUpdateItem = useCallback(
    async (itemId: string, updates: Partial<BoqItemType>, immediate: boolean = false) => {
      setLocalItemValues((prev) => ({
        ...prev,
        [itemId]: { ...(prev[itemId] ?? {}), ...updates },
      }));

      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: (prev?.categories ?? []).map((cat) => ({
          ...(cat ?? {}),
          items: (cat?.items ?? []).map((item) =>
            item?.id === itemId ? { ...(item ?? {}), ...updates } : item
          ),
        })),
      } as BoqWithRelations));

      const timeoutKey = `item_${itemId}`;
      if (inputSaveTimeoutRef.current[timeoutKey]) {
        clearTimeout(inputSaveTimeoutRef.current[timeoutKey]);
      }

      const saveToApi = async () => {
        try {
          await fetch(`/api/items/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
          });
          setLastSaved(new Date());
        } catch (error) {
          console.error('Failed to update item:', error);
        }
      };

      if (immediate) {
        saveToApi();
      } else {
        inputSaveTimeoutRef.current[timeoutKey] = setTimeout(saveToApi, 500);
      }
    },
    []
  );

  const handleDeleteItem = useCallback(async (itemId: string) => {
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
  }, []);

  // Inline note editing
  const cancelInlineEdit = useCallback(() => {
    setInlineEditingNoteId(null);
    setInlineEditText('');
  }, []);

  const saveInlineEdit = useCallback(
    async (itemId: string) => {
      const safeHtml = plainTextToSafeHtml(inlineEditText);
      await handleUpdateItem(itemId, { noteContent: safeHtml }, true);
      setInlineEditingNoteId(null);
      setInlineEditText('');
    },
    [inlineEditText, plainTextToSafeHtml, handleUpdateItem]
  );

  const handleInlineNoteKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>, itemId: string) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        cancelInlineEdit();
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === 'Enter') {
        e.preventDefault();
        saveInlineEdit(itemId);
      }
    },
    [cancelInlineEdit, saveInlineEdit]
  );

  // DnD Kit sensors - smaller distance for easier drag initiation
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px movement required before drag starts (smaller = easier to start drag)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle item drag start (for debugging)
  const handleItemDragStart = useCallback((event: DragStartEvent) => {
    console.log('Item drag started:', event.active.id);
  }, []);

  // Handle item drag end
  const handleItemDragEnd = useCallback(
    async (event: DragEndEvent, categoryId: string) => {
      const { active, over } = event;
      console.log('Item drag ended:', active.id, 'over:', over?.id);

      if (!over || active.id === over.id) return;

      const category = (boq?.categories ?? []).find((c) => c?.id === categoryId);
      if (!category) return;

      const items = [...(category.items ?? [])];
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

      const reorderedItems = arrayMove(items, oldIndex, newIndex);
      const updatedItems = reorderedItems.map((item, index) => ({ ...item, sortOrder: index }));

      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: (prev?.categories ?? []).map((cat) =>
          cat?.id === categoryId ? { ...cat, items: updatedItems } : cat
        ),
      } as BoqWithRelations));

      try {
        await Promise.all(
          updatedItems.map((item) =>
            fetch(`/api/items/${item.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sortOrder: item.sortOrder }),
            })
          )
        );
        setLastSaved(new Date());
      } catch (error) {
        toast.error('Failed to reorder items');
      }
    },
    [boq?.categories]
  );

  // Handle category drag start (for debugging)
  const handleCategoryDragStart = useCallback((event: DragStartEvent) => {
    // console.log('Category drag started:', event.active.id);
  }, []);

  // Handle category drag end
  const handleCategoryDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      // console.log('Category drag ended:', active.id, 'over:', over?.id);

      if (!over || active.id === over.id) return;

      const categories = [...(boq?.categories ?? [])];
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

      const reorderedCategories = arrayMove(categories, oldIndex, newIndex);
      const updatedCategories = reorderedCategories.map((cat, index) => ({ ...cat, sortOrder: index }));

      setBoq((prev) => ({
        ...(prev ?? {}),
        categories: updatedCategories,
      } as BoqWithRelations));

      try {
        await Promise.all(
          updatedCategories.map((cat) =>
            fetch(`/api/categories/${cat.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sortOrder: cat.sortOrder }),
            })
          )
        );
        setLastSaved(new Date());
      } catch (error) {
        toast.error('Failed to reorder categories');
      }
    },
    [boq?.categories]
  );

  // Open edit item dialog
  const openEditItemDialog = useCallback(
    (
      item: BoqItemType,
      categoryId: string,
      categoryName: string,
      itemNumber: string | null
    ) => {
      let latestNoteContent: string | null = item.noteContent;
      const localNote = localItemValues[item.id]?.noteContent;
      if (localNote !== undefined) {
        latestNoteContent = localNote;
      }
      noteEditorInitializedRef.current = null;

      setEditItemDialog({
        item: { ...item, noteContent: latestNoteContent },
        categoryId,
        categoryName,
        itemNumber,
      });
      setEditItemValues({
        description: item.description,
        unit: item.unit,
        unitCost: item.unitCost,
        markupPct: item.markupPct,
        quantity: item.quantity,
        noteContent: latestNoteContent,
        includeInPdf: item.includeInPdf,
      });
    },
    [localItemValues]
  );

  // Handler for clicking on note content
  const handleNoteClick = useCallback(
    (item: BoqItemType, categoryId: string, categoryName: string, currentHtml: string) => {
      if (noteHasFormatting(currentHtml)) {
        openEditItemDialog(item, categoryId, categoryName, null);
        return;
      }

      const plainText = htmlToPlainText(currentHtml);
      setInlineEditText(plainText);
      setInlineEditingNoteId(item.id);

      setTimeout(() => {
        inlineTextareaRef.current?.focus();
      }, 50);
    },
    [noteHasFormatting, openEditItemDialog, htmlToPlainText]
  );

  // Initialize note editor content when dialog opens
  useEffect(() => {
    if (
      editItemDialog?.item.isNote &&
      editItemDialog.item.id !== noteEditorInitializedRef.current
    ) {
      const timeoutId = setTimeout(() => {
        if (noteEditorRef.current) {
          const content = editItemValues.noteContent ?? '';
          noteEditorRef.current.innerHTML = sanitizeHtml(content);
          noteEditorInitializedRef.current = editItemDialog.item.id;
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [editItemDialog?.item.id, editItemDialog?.item.isNote, editItemValues.noteContent, sanitizeHtml]);

  const saveEditItemDialog = async () => {
    if (!editItemDialog) return;
    await handleUpdateItem(editItemDialog.item.id, editItemValues, true);
    setEditItemDialog(null);
    setEditItemValues({});
  };

  // Rich text formatting
  const applyTextFormat = useCallback((format: 'bold' | 'italic' | 'underline') => {
    if (noteEditorRef.current) {
      noteEditorRef.current.focus();
    }
    document.execCommand(format, false);
    if (noteEditorRef.current) {
      const htmlContent = noteEditorRef.current.innerHTML;
      setEditItemValues((prev) => ({ ...prev, noteContent: htmlContent }));
    }
  }, []);

  const handleNoteEditorKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier) {
        if (e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          applyTextFormat('bold');
        } else if (e.key === 'i' || e.key === 'I') {
          e.preventDefault();
          applyTextFormat('italic');
        } else if (e.key === 'u' || e.key === 'U') {
          e.preventDefault();
          applyTextFormat('underline');
        }
      }
    },
    [applyTextFormat]
  );

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
    let toastId: string | undefined;
    
    try {
      await flushPendingAutosave();

      // Start async export job
      toastId = toast.loading('Starting PDF export...');
      
      const initResponse = await fetch(`/api/boqs/${boq?.id}/pdf/async`, {
        method: 'POST',
      });

      if (!initResponse.ok) {
        throw new Error('Failed to start PDF export');
      }

      const { jobId, status: initialStatus, message } = await initResponse.json();
      
      if (!jobId) {
        throw new Error('No job ID returned');
      }

      // Poll for job completion
      toast.loading('Generating PDF...', { id: toastId });
      
      const maxPollAttempts = 300; // 5 minutes max
      let pollAttempts = 0;
      
      while (pollAttempts < maxPollAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const statusResponse = await fetch(`/api/pdf-jobs/${jobId}`);
        if (!statusResponse.ok) {
          throw new Error('Failed to check job status');
        }

        const { status, pdfUrl, errorMessage, elapsedMs } = await statusResponse.json();
        
        // Update toast with elapsed time
        if (status === 'processing' && elapsedMs > 0) {
          toast.loading(`Generating PDF... (${Math.round(elapsedMs / 1000)}s)`, { id: toastId });
        }

        if (status === 'completed' && pdfUrl) {
          // Download the PDF
          toast.loading('Downloading PDF...', { id: toastId });
          
          // Handle base64 data URL
          if (pdfUrl.startsWith('data:')) {
            const base64Data = pdfUrl.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${boq?.projectName ?? 'BOQ'}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          } else {
            // Handle regular URL
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = `${boq?.projectName ?? 'BOQ'}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
          
          // Track ExportPDF event
          metaTrackCustom('ExportPDF', { kind: 'boq' });
          toast.success('PDF downloaded', { id: toastId });
          return;
        }

        if (status === 'failed') {
          throw new Error(errorMessage || 'PDF generation failed');
        }

        pollAttempts++;
      }

      throw new Error('PDF generation timed out');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to export PDF';
      if (toastId) {
        toast.error(message, { id: toastId });
      } else {
        toast.error(message);
      }
    } finally {
      setExportingPdf(false);
    }
  };

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const getCategorySubtotal = useCallback((category: CategoryWithItems) => {
    return (category?.items ?? []).reduce((sum, item) => {
      if (item?.isNote) return sum;
      const qty = item?.quantity ?? 0;
      if (qty > 0) {
        const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
        return sum + unitPrice * qty;
      }
      return sum;
    }, 0);
  }, []);

  // Get item number (excluding notes)
  const getItemNumber = useCallback(
    (categoryIndex: number, items: BoqItemType[], itemIndex: number): string | null => {
      const item = items[itemIndex];
      if (item?.isNote) return null;

      let nonNoteCount = 0;
      for (let i = 0; i <= itemIndex; i++) {
        if (!items[i]?.isNote) {
          nonNoteCount++;
        }
      }
      return `${categoryIndex + 1}.${nonNoteCount}`;
    },
    []
  );

  // Memoized category IDs for SortableContext
  const categoryIds = useMemo(
    () => (boq?.categories ?? []).map((c) => c?.id),
    [boq?.categories]
  );

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1 min-w-0 max-w-2xl">
              <Input
                value={localProjectName}
                onChange={(e) => handleProjectNameChange(e.target.value)}
                className="text-xl font-semibold border-0 p-0 h-auto focus-visible:ring-0 bg-transparent w-full"
                placeholder="Project Name"
              />
              <div className="flex items-center space-x-2 mt-1">
                <Select
                  value={boq?.customerId ?? 'none'}
                  onValueChange={(value) => updateBoq({ customerId: value === 'none' ? null : value })}
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
                <Button variant="outline" size="sm" onClick={() => setShowNewCustomerDialog(true)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
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
            {/* PDF Settings Group */}
            <TooltipProvider>
              <div className="flex items-center gap-2 border-l pl-3">
                {/* Cover Template Selector */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-xs text-gray-500 font-medium">Cover Page</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-48">Controls the cover page elements, layout, and styling</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={boq?.coverTemplateId || 'default'}
                    onValueChange={(value) => {
                      if (value === 'create_new') {
                        router.push('/app/settings?tab=pdf');
                        return;
                      }
                      const newValue = value === 'default' ? null : value;
                      updateBoq({ coverTemplateId: newValue });
                    }}
                  >
                    <SelectTrigger className="w-40 h-8 text-xs">
                      <FileText className="w-3 h-3 mr-1 text-gray-400" />
                      <SelectValue placeholder="Cover Template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Company Default</SelectItem>
                      {coverTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} {template.isDefault && '★'}
                        </SelectItem>
                      ))}
                      <div className="border-t my-1" />
                      <SelectItem value="create_new" className="text-purple-600">
                        <Plus className="w-3 h-3 mr-1 inline" />
                        Create new template...
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* PDF Theme Selector */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-xs text-gray-500 font-medium">PDF Theme</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-48">Controls colors/shading for BOQ pages (layout unchanged)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={boq?.pdfThemeId || 'default'}
                    onValueChange={(value) => {
                      if (value === 'create_new') {
                        router.push('/app/settings?tab=pdf');
                        return;
                      }
                      const newValue = value === 'default' ? null : value;
                      updateBoq({ pdfThemeId: newValue });
                    }}
                  >
                    <SelectTrigger className="w-36 h-8 text-xs">
                      <Palette className="w-3 h-3 mr-1 text-gray-400" />
                      <SelectValue placeholder="Color Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Theme</SelectItem>
                      {pdfThemes.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {theme.name} {theme.isDefault && '★'}
                        </SelectItem>
                      ))}
                      <div className="border-t my-1" />
                      <SelectItem value="create_new" className="text-purple-600">
                        <Plus className="w-3 h-3 mr-1 inline" />
                        Create new theme...
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Mode Selector */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-xs text-gray-500 font-medium">Date</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-48">Date shown on PDF cover page</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-1">
                    <Select
                      value={boq?.dateMode || 'export_date'}
                      onValueChange={(value) => {
                        updateBoq({ dateMode: value as 'export_date' | 'preparation_date' });
                      }}
                    >
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="export_date">Export Date</SelectItem>
                        <SelectItem value="preparation_date">Custom Date</SelectItem>
                      </SelectContent>
                    </Select>
                    {boq?.dateMode === 'preparation_date' && (
                      <input
                        type="date"
                        value={boq?.preparationDate ? new Date(boq.preparationDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => updateBoq({ preparationDate: e.target.value ? new Date(e.target.value).toISOString() : null })}
                        className="h-8 px-2 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            </TooltipProvider>
            <Button variant="outline" onClick={handleExportPdf} disabled={exportingPdf}>
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
        <div className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="space-y-6">
            {/* Totals & Profit Analysis - constrained width for readability */}
            <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-md border-0 bg-gradient-to-br from-purple-50 to-lavender-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Totals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Label className="text-gray-600">Discount</Label>
                      <Switch
                        checked={boq?.discountEnabled ?? false}
                        onCheckedChange={(checked) => updateBoq({ discountEnabled: checked })}
                      />
                    </div>
                    {boq?.discountEnabled && (
                      <div className="flex items-center space-x-2">
                        <Select
                          value={boq?.discountType ?? 'percent'}
                          onValueChange={(value) =>
                            updateBoq({ discountType: value as 'percent' | 'fixed' })
                          }
                        >
                          <SelectTrigger className="w-20 h-8">
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
                          className="w-24 h-8"
                        />
                        {totals.discount > 0 && (
                          <span className="text-sm text-gray-500">-{formatCurrency(totals.discount)}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
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
                          className="w-20 h-8"
                        />
                        <span className="text-gray-500">%</span>
                        <span className="text-gray-500">+{formatCurrency(totals.vatAmount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center py-2 border-t-2 border-purple-200">
                    <span className="text-lg font-semibold text-gray-900">Final Total</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {formatCurrency(totals.finalTotal)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Profit Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Cost</span>
                    <span className="font-medium">{formatCurrency(totals.totalCost)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price (after discount)</span>
                    <span className="font-medium">{formatCurrency(totals.priceAfterDiscount)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Profit</span>
                    <span
                      className={`font-semibold ${
                        totals.profit >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {formatCurrency(totals.profit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gross Profit %</span>
                    <span
                      className={`font-semibold ${
                        totals.grossProfitPct >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {formatNumber(totals.grossProfitPct)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Categories & Items - full width for desktop editing */}
            <div className="space-y-4 w-full">
              {/* Column width reset */}
              <div className="flex justify-end">
                <button
                  onClick={resetColumnWidths}
                  className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
                  title="Reset column widths to default"
                >
                  Reset column widths
                </button>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleCategoryDragStart}
                onDragEnd={handleCategoryDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext items={categoryIds} strategy={verticalListSortingStrategy}>
                  {(boq?.categories ?? []).map((category, catIndex) => (
                    <SortableCategory
                      key={category?.id}
                      category={category}
                      categoryIndex={catIndex}
                      isExpanded={expandedCategories.has(category?.id)}
                      toggleCategory={toggleCategory}
                      getCategoryName={getCategoryName}
                      handleUpdateCategory={handleUpdateCategory}
                      handleDeleteCategory={handleDeleteCategory}
                      handleAddItem={handleAddItem}
                      formatCurrency={formatCurrency}
                      getCategorySubtotal={getCategorySubtotal}
                      columnWidths={columnWidths}
                      handleResizeStart={handleResizeStart}
                      sensors={sensors}
                      getItemNumber={getItemNumber}
                      handleItemDragStart={handleItemDragStart}
                      handleItemDragEnd={handleItemDragEnd}
                      getItemValue={getItemValue}
                      handleUpdateItem={handleUpdateItem}
                      handleDeleteItem={handleDeleteItem}
                      openEditItemDialog={openEditItemDialog}
                      handleNoteClick={handleNoteClick}
                      inlineEditingNoteId={inlineEditingNoteId}
                      inlineEditText={inlineEditText}
                      setInlineEditText={setInlineEditText}
                      inlineTextareaRef={inlineTextareaRef}
                      handleInlineNoteKeyDown={handleInlineNoteKeyDown}
                      saveInlineEdit={saveInlineEdit}
                      cancelInlineEdit={cancelInlineEdit}
                      sanitizeHtml={sanitizeHtml}
                      formatNumber={formatNumber}
                      itemLimit={itemLimit}
                      currentItemCount={currentItemCount}
                      isAtItemLimit={isAtItemLimit}
                      planKey={planKey}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              <Button
                variant="outline"
                className="w-full border-dashed border-2"
                onClick={handleAddCategory}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
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

        {/* Edit Item Dialog */}
        <Dialog open={!!editItemDialog} onOpenChange={(open) => !open && setEditItemDialog(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editItemDialog?.item.isNote
                  ? 'Edit Note'
                  : `Edit Item ${editItemDialog?.itemNumber ?? ''}`}
              </DialogTitle>
              <p className="text-sm text-gray-500">Category: {editItemDialog?.categoryName}</p>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              {editItemDialog?.item.isNote ? (
                // Note editing with rich text
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Note Content</Label>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="flex items-center space-x-1 p-2 border-b bg-gray-50">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 font-bold"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            applyTextFormat('bold');
                          }}
                          title="Bold (Ctrl+B)"
                        >
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            applyTextFormat('italic');
                          }}
                          title="Italic (Ctrl+I)"
                        >
                          <Italic className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            applyTextFormat('underline');
                          }}
                          title="Underline (Ctrl+U)"
                        >
                          <UnderlineIcon className="w-4 h-4" />
                        </Button>
                        <span className="text-xs text-gray-400 ml-2">
                          Select text and click to format (or use Ctrl+B/I/U)
                        </span>
                      </div>
                      <div
                        ref={noteEditorRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="min-h-[150px] p-3 focus:outline-none text-sm prose prose-sm max-w-none [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline"
                        onInput={(e) => {
                          const target = e.currentTarget;
                          setEditItemValues((prev) => ({ ...prev, noteContent: target.innerHTML }));
                        }}
                        onKeyDown={handleNoteEditorKeyDown}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-includeInPdf"
                      checked={editItemValues.includeInPdf ?? true}
                      onCheckedChange={(checked) =>
                        setEditItemValues((prev) => ({ ...prev, includeInPdf: checked as boolean }))
                      }
                    />
                    <label htmlFor="edit-includeInPdf" className="text-sm text-gray-600">
                      Include in PDF
                    </label>
                  </div>
                </div>
              ) : (
                // Regular item editing
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      placeholder="Enter item description..."
                      value={editItemValues.description ?? ''}
                      onChange={(e) =>
                        setEditItemValues((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-unit">Unit</Label>
                      <Input
                        id="edit-unit"
                        placeholder="e.g., Sqm, Cub, Nos"
                        value={editItemValues.unit ?? ''}
                        onChange={(e) =>
                          setEditItemValues((prev) => ({ ...prev, unit: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-unitCost">Unit Cost</Label>
                      <Input
                        id="edit-unitCost"
                        type="number"
                        step="0.01"
                        value={editItemValues.unitCost ?? 0}
                        onChange={(e) =>
                          setEditItemValues((prev) => ({
                            ...prev,
                            unitCost: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-markupPct">Markup %</Label>
                      <Input
                        id="edit-markupPct"
                        type="number"
                        step="0.01"
                        value={editItemValues.markupPct ?? 0}
                        onChange={(e) =>
                          setEditItemValues((prev) => ({
                            ...prev,
                            markupPct: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-quantity">Quantity</Label>
                      <Input
                        id="edit-quantity"
                        type="number"
                        step="0.01"
                        value={editItemValues.quantity ?? 0}
                        onChange={(e) =>
                          setEditItemValues((prev) => ({
                            ...prev,
                            quantity: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                  </div>
                  {/* Calculated values display */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unit Price:</span>
                      <span className="font-medium">
                        {formatCurrency(
                          (editItemValues.unitCost ?? 0) * (1 + (editItemValues.markupPct ?? 0) / 100)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold text-purple-600">
                        {formatCurrency(
                          (editItemValues.unitCost ?? 0) *
                            (1 + (editItemValues.markupPct ?? 0) / 100) *
                            (editItemValues.quantity ?? 0)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditItemDialog(null)}>
                Cancel
              </Button>
              <Button onClick={saveEditItemDialog}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
