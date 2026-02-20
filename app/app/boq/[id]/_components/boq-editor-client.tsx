'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Layers,
  Settings,
  WrapText,
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

// =============================================================================
// AUTO-RESIZE TEXTAREA COMPONENT
// =============================================================================
interface AutoResizeTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  columnWidth: number;
  placeholder?: string;
}

function AutoResizeTextarea({ value, onChange, columnWidth, placeholder }: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize height based on content
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(32, textarea.scrollHeight)}px`;
    }
  }, []);

  // Adjust on value change
  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  // Adjust when column width changes
  useEffect(() => {
    adjustHeight();
  }, [columnWidth, adjustHeight]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e);
        adjustHeight();
      }}
      className="text-sm w-full resize-none border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
      placeholder={placeholder}
      rows={1}
      style={{ minHeight: '32px', overflow: 'hidden' }}
    />
  );
}

// =============================================================================
// FORMATTED NUMBER INPUT COMPONENT (with thousand separators)
// =============================================================================
interface FormattedNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  step?: string;
  'data-cell'?: boolean;
  'data-row'?: string;
  'data-col'?: string;
}

function FormattedNumberInput({
  value,
  onChange,
  onKeyDown,
  className,
  step = "0.01",
  ...props
}: FormattedNumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState(formatNumberWithCommas(value));
  const [isFocused, setIsFocused] = useState(false);

  // Format number with thousand separators
  function formatNumberWithCommas(num: number): string {
    if (num === 0) return '0';
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  // Parse formatted string to number
  function parseFormattedNumber(str: string): number {
    const cleaned = str.replace(/,/g, '');
    return parseFloat(cleaned) || 0;
  }

  // Update display when value changes externally
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatNumberWithCommas(value));
    }
  }, [value, isFocused]);

  return (
    <Input
      ref={inputRef}
      type="text"
      inputMode="decimal"
      value={isFocused ? displayValue.replace(/,/g, '') : displayValue}
      onChange={(e) => {
        const rawValue = e.target.value;
        setDisplayValue(rawValue);
        onChange(parseFormattedNumber(rawValue));
      }}
      onFocus={(e) => {
        setIsFocused(true);
        setDisplayValue(value.toString());
        // Select all text when focused (for arrow key navigation)
        setTimeout(() => e.target.select(), 0);
      }}
      onBlur={() => {
        setIsFocused(false);
        setDisplayValue(formatNumberWithCommas(value));
      }}
      onKeyDown={onKeyDown}
      className={className}
      {...props}
    />
  );
}

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
// ARROW KEY NAVIGATION HELPER
// =============================================================================
function handleCellKeyDown(e: React.KeyboardEvent<HTMLInputElement>, itemId: string, colIndex: number) {
  if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  
  // Only navigate on arrow keys when cursor is at start/end of input
  const input = e.currentTarget;
  const cursorAtStart = input.selectionStart === 0;
  const cursorAtEnd = input.selectionStart === input.value.length;
  
  // For left/right arrows, only navigate if at boundary
  if (e.key === 'ArrowLeft' && !cursorAtStart) return;
  if (e.key === 'ArrowRight' && !cursorAtEnd) return;
  
  e.preventDefault();
  
  // Find all navigable inputs in the BOQ grid
  const gridContainer = input.closest('[data-boq-grid]');
  if (!gridContainer) return;
  
  const allInputs = Array.from(gridContainer.querySelectorAll<HTMLInputElement>('[data-cell]'));
  if (allInputs.length === 0) return;
  
  // Get current position
  const currentIdx = allInputs.findIndex(el => el === input);
  if (currentIdx === -1) return;
  
  // Parse positions to build a map
  const positions = allInputs.map((el, idx) => ({
    idx,
    row: el.dataset.row || '',
    col: parseInt(el.dataset.col || '0', 10),
  }));
  
  const currentPos = positions[currentIdx];
  let targetInput: HTMLInputElement | null = null;
  
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    // Find all inputs in the same column, sorted by row
    const sameColInputs = positions.filter(p => p.col === currentPos.col);
    const currentRowIdx = sameColInputs.findIndex(p => p.row === currentPos.row);
    
    if (e.key === 'ArrowUp' && currentRowIdx > 0) {
      targetInput = allInputs[sameColInputs[currentRowIdx - 1].idx];
    } else if (e.key === 'ArrowDown' && currentRowIdx < sameColInputs.length - 1) {
      targetInput = allInputs[sameColInputs[currentRowIdx + 1].idx];
    }
  } else {
    // ArrowLeft / ArrowRight - find adjacent column in same row
    const sameRowInputs = positions.filter(p => p.row === currentPos.row).sort((a, b) => a.col - b.col);
    const currentColIdx = sameRowInputs.findIndex(p => p.col === currentPos.col);
    
    if (e.key === 'ArrowLeft' && currentColIdx > 0) {
      targetInput = allInputs[sameRowInputs[currentColIdx - 1].idx];
    } else if (e.key === 'ArrowRight' && currentColIdx < sameRowInputs.length - 1) {
      targetInput = allInputs[sameRowInputs[currentColIdx + 1].idx];
    }
  }
  
  if (targetInput) {
    targetInput.focus();
    targetInput.select();
  }
}

// =============================================================================
// SORTABLE ITEM COMPONENT - Hooks at top level (fixes React rules of hooks)
// =============================================================================
// Helper function to generate the grid template string
function getGridTemplateColumns(columnWidths: Record<string, number>): string {
  return `${columnWidths.grip}px ${columnWidths.number}px ${columnWidths.description}px ${columnWidths.unit}px ${columnWidths.unitCost}px ${columnWidths.markup}px ${columnWidths.unitPrice}px ${columnWidths.qty}px ${columnWidths.amount}px ${columnWidths.actions}px`;
}

function getTotalColumnsWidth(columnWidths: Record<string, number>): number {
  return Object.values(columnWidths).reduce((sum, w) => sum + w, 0);
}

interface SortableItemRowProps {
  item: BoqItemType;
  itemNumber: string | null;
  categoryId: string;
  categoryName: string;
  columnWidths: Record<string, number>;
  wrapText: boolean;
  getItemValue: (itemId: string, field: keyof BoqItemType, originalValue: any) => any;
  handleUpdateItem: (itemId: string, updates: Partial<BoqItemType>, immediate?: boolean) => void;
  handleDeleteItem: (itemId: string) => void;
  openEditItemDialog: (item: BoqItemType, categoryId: string, categoryName: string, itemNumber: string | null) => void;
  handleNoteClick: (item: BoqItemType, categoryId: string, categoryName: string, currentHtml: string) => void;
  handleDescriptionClick: (item: BoqItemType, categoryId: string, categoryName: string, itemNumber: string | null, currentHtml: string, clickedElement: HTMLElement) => void;
  inlineEditingNoteId: string | null;
  inlineEditText: string;
  setInlineEditText: (text: string) => void;
  inlineTextareaRef: React.RefObject<HTMLTextAreaElement>;
  handleInlineNoteKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, itemId: string) => void;
  saveInlineEdit: (itemId: string) => void;
  cancelInlineEdit: () => void;
  inlineEditingDescId: string | null;
  inlineDescText: string;
  setInlineDescText: (text: string) => void;
  inlineDescTextareaRef: React.RefObject<HTMLTextAreaElement>;
  inlineDescHeightRef: React.MutableRefObject<number>;
  handleInlineDescKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, itemId: string) => void;
  saveInlineDescEdit: (itemId: string) => void;
  cancelInlineDescEdit: () => void;
  sanitizeHtml: (html: string) => string;
  htmlToPlainText: (html: string) => string;
  formatNumber: (num: number, decimals?: number) => string;
  formatCurrency: (amount: number) => string;
}

function SortableItemRow({
  item,
  itemNumber,
  categoryId,
  categoryName,
  columnWidths,
  wrapText,
  getItemValue,
  handleUpdateItem,
  handleDeleteItem,
  openEditItemDialog,
  handleNoteClick,
  handleDescriptionClick,
  inlineEditingNoteId,
  inlineEditText,
  setInlineEditText,
  inlineTextareaRef,
  handleInlineNoteKeyDown,
  saveInlineEdit,
  cancelInlineEdit,
  inlineEditingDescId,
  inlineDescText,
  setInlineDescText,
  inlineDescTextareaRef,
  inlineDescHeightRef,
  handleInlineDescKeyDown,
  saveInlineDescEdit,
  cancelInlineDescEdit,
  sanitizeHtml,
  htmlToPlainText,
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
                <Textarea
                  ref={inlineTextareaRef}
                  value={inlineEditText}
                  onChange={(e) => {
                    setInlineEditText(e.target.value);
                    // Auto-resize on content change
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onBlur={() => saveInlineEdit(item.id)}
                  onKeyDown={(e) => handleInlineNoteKeyDown(e, item.id)}
                  className="flex-1 text-sm resize-none px-3 py-1.5 border rounded-lg overflow-hidden"
                  placeholder="Enter note text..."
                />
              ) : (
                <div
                  className="flex-1 min-h-[32px] px-3 py-1.5 bg-white border rounded-lg text-sm cursor-text hover:border-cyan-400 transition-colors"
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
                className="h-8 w-8 text-gray-400 hover:text-cyan-600 flex-shrink-0"
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
        <div className={`flex ${wrapText ? 'items-start' : 'items-center'} space-x-1`}>
          {wrapText ? (
            inlineEditingDescId === item.id ? (
              <Textarea
                ref={inlineDescTextareaRef}
                value={inlineDescText}
                onChange={(e) => {
                  setInlineDescText(e.target.value);
                  // Auto-resize on content change, but never shrink below original height
                  e.target.style.height = 'auto';
                  const newHeight = Math.max(e.target.scrollHeight, inlineDescHeightRef.current);
                  e.target.style.height = `${newHeight}px`;
                }}
                onBlur={() => saveInlineDescEdit(item.id)}
                onKeyDown={(e) => handleInlineDescKeyDown(e, item.id)}
                className="flex-1 text-sm resize-none p-1.5 border rounded-md overflow-hidden"
                placeholder="Enter description..."
                style={{ height: `${inlineDescHeightRef.current}px` }}
              />
            ) : (
              <div 
                className="text-sm w-full min-h-[32px] p-1.5 border rounded-md bg-white prose prose-sm max-w-none [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline cursor-text hover:border-cyan-400 transition-colors"
                onClick={(e) => handleDescriptionClick(item, categoryId, categoryName, itemNumber, getItemValue(item.id, 'description', item?.description) ?? '', e.currentTarget)}
                title="Click to edit"
              >
                {(getItemValue(item.id, 'description', item?.description) ?? '') ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(getItemValue(item.id, 'description', item?.description) ?? ''),
                    }}
                  />
                ) : (
                  <span className="text-gray-400">Click to add description...</span>
                )}
              </div>
            )
          ) : (
            <Input
              value={htmlToPlainText(getItemValue(item.id, 'description', item?.description) ?? '')}
              onChange={(e) => handleUpdateItem(item?.id, { description: e.target.value })}
              onKeyDown={(e) => handleCellKeyDown(e, item.id, 0)}
              data-cell
              data-row={item.id}
              data-col="0"
              className="h-8 text-sm w-full"
              placeholder="Description"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`${wrapText ? 'h-8 w-8 mt-1' : 'h-8 w-8'} text-gray-400 hover:text-cyan-600 flex-shrink-0`}
            onClick={() => openEditItemDialog(item, categoryId, categoryName, itemNumber)}
            title="Expand to edit with formatting"
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
          onKeyDown={(e) => handleCellKeyDown(e, item.id, 1)}
          data-cell
          data-row={item.id}
          data-col="1"
          className="h-8 text-sm w-full"
          placeholder="Unit"
        />
      </div>
      {/* Unit Cost */}
      <div className="py-2 px-2" role="cell">
        <FormattedNumberInput
          value={unitCost}
          onChange={(val) =>
            handleUpdateItem(item?.id, { unitCost: val })
          }
          onKeyDown={(e) => handleCellKeyDown(e, item.id, 2)}
          data-cell
          data-row={item.id}
          data-col="2"
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
          onKeyDown={(e) => handleCellKeyDown(e, item.id, 3)}
          data-cell
          data-row={item.id}
          data-col="3"
          className="h-8 text-sm text-right w-full"
        />
      </div>
      {/* Unit Price (readonly) */}
      <div className="py-2 px-2 text-right font-medium text-gray-700 text-sm whitespace-nowrap" role="cell">{formatNumber(unitPrice)}</div>
      {/* Qty */}
      <div className="py-2 px-2" role="cell">
        <FormattedNumberInput
          value={quantity}
          onChange={(val) =>
            handleUpdateItem(item?.id, { quantity: val })
          }
          onKeyDown={(e) => handleCellKeyDown(e, item.id, 4)}
          data-cell
          data-row={item.id}
          data-col="4"
          className="h-8 text-sm text-right w-full"
        />
      </div>
      {/* Amount */}
      <div className="py-2 px-2 text-right font-semibold text-cyan-600 text-sm whitespace-nowrap" role="cell">{formatCurrency(amount)}</div>
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
  wrapText: boolean;
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
  handleDescriptionClick: (item: BoqItemType, categoryId: string, categoryName: string, itemNumber: string | null, currentHtml: string, clickedElement: HTMLElement) => void;
  inlineEditingNoteId: string | null;
  inlineEditText: string;
  setInlineEditText: (text: string) => void;
  inlineTextareaRef: React.RefObject<HTMLTextAreaElement>;
  handleInlineNoteKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, itemId: string) => void;
  saveInlineEdit: (itemId: string) => void;
  cancelInlineEdit: () => void;
  inlineEditingDescId: string | null;
  inlineDescText: string;
  setInlineDescText: (text: string) => void;
  inlineDescTextareaRef: React.RefObject<HTMLTextAreaElement>;
  inlineDescHeightRef: React.MutableRefObject<number>;
  handleInlineDescKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, itemId: string) => void;
  saveInlineDescEdit: (itemId: string) => void;
  cancelInlineDescEdit: () => void;
  sanitizeHtml: (html: string) => string;
  htmlToPlainText: (html: string) => string;
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
  wrapText,
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
  handleDescriptionClick,
  inlineEditingNoteId,
  inlineEditText,
  setInlineEditText,
  inlineTextareaRef,
  handleInlineNoteKeyDown,
  saveInlineEdit,
  cancelInlineEdit,
  inlineEditingDescId,
  inlineDescText,
  setInlineDescText,
  inlineDescTextareaRef,
  inlineDescHeightRef,
  handleInlineDescKeyDown,
  saveInlineDescEdit,
  cancelInlineDescEdit,
  sanitizeHtml,
  htmlToPlainText,
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
          isDragging ? 'shadow-xl ring-2 ring-cyan-400' : ''
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
                  <span className="text-sm text-gray-500 flex-shrink-0 hidden sm:inline">
                    ({(category?.items ?? []).filter((i) => !i?.isNote).length} items)
                  </span>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
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
                    data-boq-grid
                    style={{ minWidth: `${getTotalColumnsWidth(columnWidths)}px` }}
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
                          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-gray-200 hover:bg-cyan-400 transition-colors"
                          onMouseDown={(e) => handleResizeStart(e, 'number')}
                        />
                      </div>
                      <div className="py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Description
                        <div
                          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-gray-200 hover:bg-cyan-400 transition-colors"
                          onMouseDown={(e) => handleResizeStart(e, 'description')}
                        />
                      </div>
                      <div className="py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Unit
                        <div
                          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-gray-200 hover:bg-cyan-400 transition-colors"
                          onMouseDown={(e) => handleResizeStart(e, 'unit')}
                        />
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Unit Cost
                        <div
                          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-gray-200 hover:bg-cyan-400 transition-colors"
                          onMouseDown={(e) => handleResizeStart(e, 'unitCost')}
                        />
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Markup %
                        <div
                          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-gray-200 hover:bg-cyan-400 transition-colors"
                          onMouseDown={(e) => handleResizeStart(e, 'markup')}
                        />
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Unit Price
                        <div
                          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-gray-200 hover:bg-cyan-400 transition-colors"
                          onMouseDown={(e) => handleResizeStart(e, 'unitPrice')}
                        />
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Qty
                        <div
                          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-gray-200 hover:bg-cyan-400 transition-colors"
                          onMouseDown={(e) => handleResizeStart(e, 'qty')}
                        />
                      </div>
                      <div className="text-right py-2 px-2 font-medium text-gray-500 relative border-b border-gray-200" role="columnheader">
                        Amount
                        <div
                          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-gray-200 hover:bg-cyan-400 transition-colors"
                          onMouseDown={(e) => handleResizeStart(e, 'amount')}
                        />
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
                          wrapText={wrapText}
                          getItemValue={getItemValue}
                          handleUpdateItem={handleUpdateItem}
                          handleDeleteItem={handleDeleteItem}
                          openEditItemDialog={openEditItemDialog}
                          handleNoteClick={handleNoteClick}
                          handleDescriptionClick={handleDescriptionClick}
                          inlineEditingNoteId={inlineEditingNoteId}
                          inlineEditText={inlineEditText}
                          setInlineEditText={setInlineEditText}
                          inlineTextareaRef={inlineTextareaRef}
                          handleInlineNoteKeyDown={handleInlineNoteKeyDown}
                          saveInlineEdit={saveInlineEdit}
                          cancelInlineEdit={cancelInlineEdit}
                          inlineEditingDescId={inlineEditingDescId}
                          inlineDescText={inlineDescText}
                          setInlineDescText={setInlineDescText}
                          inlineDescTextareaRef={inlineDescTextareaRef}
                          inlineDescHeightRef={inlineDescHeightRef}
                          handleInlineDescKeyDown={handleInlineDescKeyDown}
                          saveInlineDescEdit={saveInlineDescEdit}
                          cancelInlineDescEdit={cancelInlineDescEdit}
                          sanitizeHtml={sanitizeHtml}
                          htmlToPlainText={htmlToPlainText}
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
                    className={`flex-1 ${isAtItemLimit ? 'text-gray-400 cursor-not-allowed' : 'text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50'}`}
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
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get('from');
  const [boq, setBoq] = useState<BoqWithRelations>(initialBoq);
  const [customers, setCustomers] = useState(initialCustomers ?? []);
  const [coverTemplates, setCoverTemplates] = useState<PdfCoverTemplateType[]>(initialCoverTemplates ?? []);
  const [pdfThemes, setPdfThemes] = useState<PdfThemeType[]>(initialPdfThemes ?? []);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set((initialBoq?.categories ?? []).map((c) => c?.id))
  );
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [pendingSavesCount, setPendingSavesCount] = useState(0);
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
  const descriptionEditorRef = useRef<HTMLDivElement>(null);
  const noteEditorInitializedRef = useRef<string | null>(null);
  const descriptionEditorInitializedRef = useRef<string | null>(null);

  // Inline note editing state
  const [inlineEditingNoteId, setInlineEditingNoteId] = useState<string | null>(null);
  const [inlineEditText, setInlineEditText] = useState('');
  const inlineTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Inline description editing state
  const [inlineEditingDescId, setInlineEditingDescId] = useState<string | null>(null);
  const [inlineDescText, setInlineDescText] = useState('');
  const inlineDescHeightRef = useRef<number>(32);
  const inlineDescTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Local input states to prevent typing lag
  const [localProjectName, setLocalProjectName] = useState(initialBoq?.projectName ?? '');
  const [localCategoryNames, setLocalCategoryNames] = useState<Record<string, string>>({});
  const [localItemValues, setLocalItemValues] = useState<Record<string, Partial<BoqItemType>>>({});

  // Column resize state - widths match the previous table layout
  const DEFAULT_COLUMN_WIDTHS = {
    grip: 32,
    number: 52,
    description: 280, // wider for description content, uses fixed px width
    unit: 80,
    unitCost: 100,
    markup: 80,
    unitPrice: 100,
    qty: 70,
    amount: 130,
    actions: 44,
  };
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(DEFAULT_COLUMN_WIDTHS);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [wrapText, setWrapText] = useState(true);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showPresetDialog, setShowPresetDialog] = useState(false);
  const [presetNameInput, setPresetNameInput] = useState('');
  const resizeStartXRef = useRef<number>(0);
  const resizeStartWidthRef = useRef<number>(0);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputSaveTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});
  // Store pending save callbacks so they can be flushed on navigation
  const pendingSaveCallbacksRef = useRef<Record<string, () => Promise<void>>>({});

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

  // Autosave - use ref to always get latest boq state
  const autosavePromiseRef = useRef<Promise<void> | null>(null);
  const boqRef = useRef(boq);
  
  // Keep ref in sync with state
  useEffect(() => {
    boqRef.current = boq;
  }, [boq]);

  const autosave = useCallback(async () => {
    const currentBoq = boqRef.current; // Always use latest value
    if (!currentBoq?.id) return;
    
    setSaving(true);
    try {
      await fetch(`/api/boqs/${currentBoq.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: currentBoq.projectName,
          customerId: currentBoq.customerId,
          coverTemplateId: currentBoq.coverTemplateId,
          pdfThemeId: currentBoq.pdfThemeId,
          dateMode: currentBoq.dateMode,
          preparationDate: currentBoq.preparationDate,
          discountEnabled: currentBoq.discountEnabled,
          discountType: currentBoq.discountType,
          discountValue: currentBoq.discountValue,
          vatEnabled: currentBoq.vatEnabled,
          vatPercent: currentBoq.vatPercent,
          status: currentBoq.status,
          isPreset: currentBoq.isPreset, // Include isPreset so API can sync presetName
        }),
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Autosave failed:', error);
    } finally {
      setSaving(false);
    }
  }, []);

  const triggerAutosave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      autosavePromiseRef.current = autosave();
    }, 1500);
  }, [autosave]);

  const flushPendingAutosave = useCallback(async () => {
    // Clear and flush BOQ metadata autosave
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    if (autosavePromiseRef.current) {
      await autosavePromiseRef.current;
    }
    
    // Flush all pending item/category/projectName saves
    const pendingCallbacks = Object.entries(pendingSaveCallbacksRef.current);
    if (pendingCallbacks.length > 0) {
      // Clear all timeouts first
      Object.keys(inputSaveTimeoutRef.current).forEach(key => {
        clearTimeout(inputSaveTimeoutRef.current[key]);
        delete inputSaveTimeoutRef.current[key];
      });
      
      // Execute all pending save callbacks
      await Promise.all(pendingCallbacks.map(async ([key, callback]) => {
        try {
          await callback();
        } catch (error) {
          console.error(`Failed to flush save for ${key}:`, error);
        }
      }));
      
      // Clear the callbacks ref
      pendingSaveCallbacksRef.current = {};
      setPendingSavesCount(0);
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

  // Warn user about unsaved changes when closing tab
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (pendingSavesCount > 0) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pendingSavesCount]);

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

  // Check for company settings changes (currency, etc.)
  useEffect(() => {
    // Check if company settings were updated since last visit
    const lastSettingsUpdate = localStorage.getItem('companySettingsUpdated');
    const lastSeenUpdate = sessionStorage.getItem('boq_editor_lastSeenSettingsUpdate');
    if (lastSettingsUpdate && lastSettingsUpdate !== lastSeenUpdate) {
      sessionStorage.setItem('boq_editor_lastSeenSettingsUpdate', lastSettingsUpdate);
      router.refresh();
    }
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'companySettingsUpdated') {
        sessionStorage.setItem('boq_editor_lastSeenSettingsUpdate', e.newValue || '');
        router.refresh();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router]);

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

  // Refetch BOQ data on mount to ensure fresh data
  useEffect(() => {
    const refetchBoq = async () => {
      if (!initialBoq?.id) return;
      try {
        const response = await fetch(`/api/boqs/${initialBoq.id}`, { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setBoq(data);
            boqRef.current = data;
            setLocalProjectName(data.projectName ?? '');
            // Reset local category names
            const catNames: Record<string, string> = {};
            (data.categories ?? []).forEach((cat: any) => {
              if (cat?.id && cat?.name) catNames[cat.id] = cat.name;
            });
            setLocalCategoryNames(catNames);
            // Reset local item values
            const itemVals: Record<string, Partial<BoqItemType>> = {};
            (data.categories ?? []).forEach((cat: any) => {
              (cat?.items ?? []).forEach((item: any) => {
                if (item?.id) {
                  itemVals[item.id] = {
                    description: item.description,
                    unit: item.unit,
                    unitCost: item.unitCost,
                    markupPct: item.markupPct,
                    quantity: item.quantity,
                  };
                }
              });
            });
            setLocalItemValues(itemVals);
          }
        }
      } catch (error) {
        console.error('Failed to refetch BOQ:', error);
      }
    };
    refetchBoq();
  }, [initialBoq?.id]);

  useEffect(() => {
    setLocalProjectName(boq?.projectName ?? '');
  }, [boq?.projectName]);

  // Load column widths from database (BOQ.columnWidths) or fallback to localStorage
  useEffect(() => {
    try {
      // Priority: database > localStorage > defaults
      if (boq?.columnWidths && typeof boq.columnWidths === 'object') {
        setColumnWidths((prev) => ({ ...prev, ...(boq.columnWidths as Record<string, number>) }));
      } else {
        const savedWidths = localStorage.getItem('boq_column_widths');
        if (savedWidths) {
          const parsed = JSON.parse(savedWidths);
          setColumnWidths((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      // Ignore
    }
  }, [boq?.id]); // Only run once when boq loads, not on every columnWidths change

  // Ref for column width save timeout
  const columnWidthSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveColumnWidths = useCallback((widths: Record<string, number>) => {
    // Save to localStorage as backup
    try {
      localStorage.setItem('boq_column_widths', JSON.stringify(widths));
    } catch (e) {
      // Ignore
    }
    
    // Debounce save to database
    if (columnWidthSaveTimeoutRef.current) {
      clearTimeout(columnWidthSaveTimeoutRef.current);
    }
    columnWidthSaveTimeoutRef.current = setTimeout(async () => {
      if (!boq?.id) return;
      try {
        await fetch(`/api/boqs/${boq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ columnWidths: widths }),
        });
      } catch (error) {
        console.error('Failed to save column widths:', error);
      }
    }, 1000);
  }, [boq?.id]);

  // Column resize handlers
    const resizingColumnRef = useRef<string | null>(null);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, columnKey: string) => {
      e.preventDefault();
      e.stopPropagation();
      resizingColumnRef.current = columnKey;
      setResizingColumn(columnKey);
      resizeStartXRef.current = e.clientX;
      resizeStartWidthRef.current = columnWidths[columnKey];
    },
    [columnWidths]
  );

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      const col = resizingColumnRef.current;
      if (!col) return;
      const diff = e.clientX - resizeStartXRef.current;
      const newWidth = Math.max(40, resizeStartWidthRef.current + diff);
      setColumnWidths((prev) => ({ ...prev, [col]: newWidth }));
    },
    []
  );

  const handleResizeEnd = useCallback(() => {
    resizingColumnRef.current = null;
    setResizingColumn(null);
    // Save column widths after resize ends
    setColumnWidths((currentWidths) => {
      saveColumnWidths(currentWidths);
      return currentWidths;
    });
  }, [saveColumnWidths]);

  useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [resizingColumn, handleResizeMove, handleResizeEnd]);

  const resetColumnWidths = useCallback(async () => {
    setColumnWidths(DEFAULT_COLUMN_WIDTHS);
    try {
      localStorage.removeItem('boq_column_widths');
    } catch (e) {
      // Ignore
    }
    // Clear column widths in database
    if (boq?.id) {
      try {
        await fetch(`/api/boqs/${boq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ columnWidths: null }),
        });
      } catch (error) {
        console.error('Failed to clear column widths:', error);
      }
    }
    toast.success('Column widths reset to default');
  }, [boq?.id]);

  const updateBoq = (updates: Partial<BoqWithRelations>) => {
    setBoq((prev) => {
      const newBoq = { ...(prev ?? {}), ...updates } as BoqWithRelations;
      // Update ref synchronously so autosave gets the latest value
      boqRef.current = newBoq;
      return newBoq;
    });
    triggerAutosave();
  };

  const handleProjectNameChange = (value: string) => {
    setLocalProjectName(value);
    if (inputSaveTimeoutRef.current['projectName']) {
      clearTimeout(inputSaveTimeoutRef.current['projectName']);
    }
    const saveCallback = async () => {
      // Include isPreset flag so the API can sync presetName for presets
      updateBoq({ projectName: value, isPreset: boq?.isPreset });
      delete pendingSaveCallbacksRef.current['projectName'];
      setPendingSavesCount(Object.keys(pendingSaveCallbacksRef.current).length);
    };
    if (!pendingSaveCallbacksRef.current['projectName']) {
      setPendingSavesCount(prev => prev + 1);
    }
    pendingSaveCallbacksRef.current['projectName'] = saveCallback;
    inputSaveTimeoutRef.current['projectName'] = setTimeout(saveCallback, 500);
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
    const timeoutKey = `cat_${categoryId}`;

    if (inputSaveTimeoutRef.current[timeoutKey]) {
      clearTimeout(inputSaveTimeoutRef.current[timeoutKey]);
    }
    const saveCallback = async () => {
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
      delete pendingSaveCallbacksRef.current[timeoutKey];
      setPendingSavesCount(Object.keys(pendingSaveCallbacksRef.current).length);
    };
    if (!pendingSaveCallbacksRef.current[timeoutKey]) {
      setPendingSavesCount(prev => prev + 1);
    }
    pendingSaveCallbacksRef.current[timeoutKey] = saveCallback;
    inputSaveTimeoutRef.current[timeoutKey] = setTimeout(saveCallback, 500);
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
        delete pendingSaveCallbacksRef.current[timeoutKey];
        setPendingSavesCount(Object.keys(pendingSaveCallbacksRef.current).length);
      };

      if (immediate) {
        saveToApi();
      } else {
        if (!pendingSaveCallbacksRef.current[timeoutKey]) {
          setPendingSavesCount(prev => prev + 1);
        }
        pendingSaveCallbacksRef.current[timeoutKey] = saveToApi;
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

  // Inline description editing
  const cancelInlineDescEdit = useCallback(() => {
    setInlineEditingDescId(null);
    setInlineDescText('');
  }, []);

  const saveInlineDescEdit = useCallback(
    async (itemId: string) => {
      const safeHtml = plainTextToSafeHtml(inlineDescText);
      await handleUpdateItem(itemId, { description: safeHtml }, true);
      setInlineEditingDescId(null);
      setInlineDescText('');
    },
    [inlineDescText, plainTextToSafeHtml, handleUpdateItem]
  );

  const handleInlineDescKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>, itemId: string) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        cancelInlineDescEdit();
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === 'Enter') {
        e.preventDefault();
        saveInlineDescEdit(itemId);
      }
    },
    [cancelInlineDescEdit, saveInlineDescEdit]
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
      descriptionEditorInitializedRef.current = null;

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
        if (inlineTextareaRef.current) {
          inlineTextareaRef.current.focus();
          // Auto-resize to match content
          inlineTextareaRef.current.style.height = 'auto';
          inlineTextareaRef.current.style.height = `${inlineTextareaRef.current.scrollHeight}px`;
        }
      }, 50);
    },
    [noteHasFormatting, openEditItemDialog, htmlToPlainText]
  );

  // Handler for clicking on description content (with wrap text enabled)
  const handleDescriptionClick = useCallback(
    (item: BoqItemType, categoryId: string, categoryName: string, itemNumber: string | null, currentHtml: string, clickedElement: HTMLElement) => {
      if (noteHasFormatting(currentHtml)) {
        openEditItemDialog(item, categoryId, categoryName, itemNumber);
        return;
      }

      // Capture the height of the clicked div SYNCHRONOUSLY before switching to textarea
      inlineDescHeightRef.current = clickedElement.offsetHeight;

      const plainText = htmlToPlainText(currentHtml);
      setInlineDescText(plainText);
      setInlineEditingDescId(item.id);

      setTimeout(() => {
        if (inlineDescTextareaRef.current) {
          inlineDescTextareaRef.current.focus();
        }
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

  // Initialize description editor content when dialog opens (for non-note items)
  useEffect(() => {
    if (
      editItemDialog &&
      !editItemDialog.item.isNote &&
      editItemDialog.item.id !== descriptionEditorInitializedRef.current
    ) {
      const timeoutId = setTimeout(() => {
        if (descriptionEditorRef.current) {
          const content = editItemValues.description ?? '';
          descriptionEditorRef.current.innerHTML = sanitizeHtml(content);
          descriptionEditorInitializedRef.current = editItemDialog.item.id;
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [editItemDialog?.item.id, editItemDialog?.item.isNote, editItemValues.description, sanitizeHtml]);

  const saveEditItemDialog = async () => {
    if (!editItemDialog) return;
    await handleUpdateItem(editItemDialog.item.id, editItemValues, true);
    setEditItemDialog(null);
    setEditItemValues({});
  };

  // Rich text formatting for notes
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

  // Rich text formatting for description
  const applyDescriptionFormat = useCallback((format: 'bold' | 'italic' | 'underline') => {
    if (descriptionEditorRef.current) {
      descriptionEditorRef.current.focus();
    }
    document.execCommand(format, false);
    if (descriptionEditorRef.current) {
      const htmlContent = descriptionEditorRef.current.innerHTML;
      setEditItemValues((prev) => ({ ...prev, description: htmlContent }));
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

  const handleDescriptionEditorKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier) {
        if (e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          applyDescriptionFormat('bold');
        } else if (e.key === 'i' || e.key === 'I') {
          e.preventDefault();
          applyDescriptionFormat('italic');
        } else if (e.key === 'u' || e.key === 'U') {
          e.preventDefault();
          applyDescriptionFormat('underline');
        }
      }
    },
    [applyDescriptionFormat]
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="flex-shrink-0"
              onClick={async () => {
                await flushPendingAutosave();
                // Navigate based on where user came from
                if (fromParam === 'presets') {
                  router.push('/app/templates?tab=presets');
                } else if (fromParam === 'themes') {
                  router.push('/app/templates?tab=boq');
                } else {
                  router.back(); // Default: go back to previous page
                }
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0 max-w-2xl">
              <Input
                value={localProjectName}
                onChange={(e) => handleProjectNameChange(e.target.value)}
                className="text-xl font-semibold border-0 p-0 h-auto focus-visible:ring-0 bg-transparent w-full"
                placeholder="Project Name"
              />
              {!boq?.isPreset && (
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
              )}
              {boq?.isPreset && (
                <div className="text-sm text-muted-foreground mt-1">
                  Preset Template
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center text-sm text-gray-500">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  Saving...
                </>
              ) : pendingSavesCount > 0 ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1 text-amber-500" />
                  <span className="text-amber-600">Saving...</span>
                </>
              ) : lastSaved ? (
                <>
                  <Check className="w-4 h-4 text-green-500 mr-1" />
                  Saved
                </>
              ) : null}
            </div>
            {/* Wrap Text Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={wrapText ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWrapText(!wrapText)}
                    className={wrapText ? 'bg-cyan-600 hover:bg-cyan-700' : ''}
                  >
                    <WrapText className="w-4 h-4 mr-2" />
                    Wrap Text
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Toggle text wrapping in description fields</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* BOQ Settings Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettingsDialog(true)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">BOQ Settings</p>
                </TooltipContent>
              </Tooltip>
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
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Totals & Profit Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-md border-0 bg-gradient-to-br from-cyan-50 to-teal-50">
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

                  <div className="flex justify-between items-center py-2 border-t-2 border-cyan-200">
                    <span className="text-lg font-semibold text-gray-900">Final Total</span>
                    <span className="text-2xl font-bold text-cyan-600">
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

            {/* Categories & Items */}
            <div className="space-y-4">
              {/* Column width reset */}
              <div className="flex justify-end">
                <button
                  onClick={resetColumnWidths}
                  className="text-xs text-gray-500 hover:text-cyan-600 transition-colors"
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
                      wrapText={wrapText}
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
                      handleDescriptionClick={handleDescriptionClick}
                      inlineEditingNoteId={inlineEditingNoteId}
                      inlineEditText={inlineEditText}
                      setInlineEditText={setInlineEditText}
                      inlineTextareaRef={inlineTextareaRef}
                      handleInlineNoteKeyDown={handleInlineNoteKeyDown}
                      saveInlineEdit={saveInlineEdit}
                      cancelInlineEdit={cancelInlineEdit}
                      inlineEditingDescId={inlineEditingDescId}
                      inlineDescText={inlineDescText}
                      setInlineDescText={setInlineDescText}
                      inlineDescTextareaRef={inlineDescTextareaRef}
                      inlineDescHeightRef={inlineDescHeightRef}
                      handleInlineDescKeyDown={handleInlineDescKeyDown}
                      saveInlineDescEdit={saveInlineDescEdit}
                      cancelInlineDescEdit={cancelInlineDescEdit}
                      sanitizeHtml={sanitizeHtml}
                      htmlToPlainText={htmlToPlainText}
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

        {/* BOQ Settings Dialog */}
        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>BOQ Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Cover Page Template */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <Label className="font-medium">Cover Page Template</Label>
                </div>
                <p className="text-xs text-gray-500">Controls the cover page elements, layout, and styling</p>
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
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select cover template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Cover Page</SelectItem>
                    {coverTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} {template.isDefault && '★'}
                      </SelectItem>
                    ))}
                    <div className="border-t my-1" />
                    <SelectItem value="create_new" className="text-cyan-600">
                      <Plus className="w-3 h-3 mr-1 inline" />
                      Create new template...
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PDF Theme */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-500" />
                  <Label className="font-medium">PDF Theme</Label>
                </div>
                <p className="text-xs text-gray-500">Controls colors/shading for BOQ pages (layout unchanged)</p>
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
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Theme</SelectItem>
                    {pdfThemes.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        {theme.name} {theme.isDefault && '★'}
                      </SelectItem>
                    ))}
                    <div className="border-t my-1" />
                    <SelectItem value="create_new" className="text-cyan-600">
                      <Plus className="w-3 h-3 mr-1 inline" />
                      Create new theme...
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Mode */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <Label className="font-medium">Date on Cover Page</Label>
                </div>
                <p className="text-xs text-gray-500">Choose which date to display on the PDF cover page</p>
                <div className="flex items-center gap-2">
                  <Select
                    value={boq?.dateMode || 'export_date'}
                    onValueChange={(value) => {
                      updateBoq({ dateMode: value as 'export_date' | 'preparation_date' });
                    }}
                  >
                    <SelectTrigger className="w-48">
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
                      className="h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  )}
                </div>
              </div>

              {/* Save as Preset */}
              {!boq?.isPreset && (
                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPresetNameInput(boq?.projectName || '');
                      setShowPresetDialog(true);
                    }}
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Create a preset from this BOQ
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Preset Dialog */}
        <Dialog open={showPresetDialog} onOpenChange={setShowPresetDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Preset</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="presetName">Preset Name</Label>
                <Input
                  id="presetName"
                  value={presetNameInput}
                  onChange={(e) => setPresetNameInput(e.target.value)}
                  placeholder="Enter preset name"
                  autoFocus
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowPresetDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  if (!presetNameInput.trim()) {
                    toast.error('Please enter a preset name');
                    return;
                  }
                  try {
                    const res = await fetch('/api/presets/create-from-boq', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ boqId: boq?.id, presetName: presetNameInput.trim(), includeQuantities: false }),
                    });
                    if (!res.ok) {
                      const data = await res.json();
                      toast.error(data.error || 'Failed to create preset');
                      return;
                    }
                    toast.success('Preset created! Find it in Templates → BOQ Presets');
                    setShowPresetDialog(false);
                    setShowSettingsDialog(false);
                  } catch { toast.error('Failed to create preset'); }
                }}
              >
                Create Preset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                    <Label>Description</Label>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="flex items-center space-x-1 p-2 border-b bg-gray-50">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 font-bold"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            applyDescriptionFormat('bold');
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
                            applyDescriptionFormat('italic');
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
                            applyDescriptionFormat('underline');
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
                        ref={descriptionEditorRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="min-h-[100px] p-3 focus:outline-none text-sm prose prose-sm max-w-none [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline"
                        onInput={(e) => {
                          const target = e.currentTarget;
                          setEditItemValues((prev) => ({ ...prev, description: target.innerHTML }));
                        }}
                        onKeyDown={handleDescriptionEditorKeyDown}
                      />
                    </div>
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
                      <span className="font-semibold text-cyan-600">
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
