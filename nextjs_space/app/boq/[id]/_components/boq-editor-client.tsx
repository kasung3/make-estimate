'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BoqWithRelations, CategoryWithItems, BoqItemType, CustomerType, CompanySettings } from '@/lib/types';

interface BoqEditorClientProps {
  boq: BoqWithRelations;
  customers: CustomerType[];
  company: CompanySettings;
}

interface EditItemDialogData {
  item: BoqItemType;
  categoryId: string;
  categoryName: string;
  itemNumber: string | null;
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
  const [draggedItem, setDraggedItem] = useState<{ categoryId: string; itemId: string } | null>(null);
  
  // Edit item dialog state
  const [editItemDialog, setEditItemDialog] = useState<EditItemDialogData | null>(null);
  const [editItemValues, setEditItemValues] = useState<Partial<BoqItemType>>({});
  
  // Note editor ref for rich text
  const noteEditorRef = useRef<HTMLDivElement>(null);
  // Track if the editor has been initialized for this dialog session
  const noteEditorInitializedRef = useRef<string | null>(null);
  
  // Inline note editing state
  const [inlineEditingNoteId, setInlineEditingNoteId] = useState<string | null>(null);
  const [inlineEditText, setInlineEditText] = useState('');
  const [showFormattingWarning, setShowFormattingWarning] = useState<{ noteId: string; itemId: string } | null>(null);
  const inlineTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Local input states to prevent typing lag
  const [localProjectName, setLocalProjectName] = useState(initialBoq?.projectName ?? '');
  const [localCategoryNames, setLocalCategoryNames] = useState<Record<string, string>>({});
  const [localItemValues, setLocalItemValues] = useState<Record<string, Partial<BoqItemType>>>({});
  
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputSaveTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  const currencySymbol = company?.currencySymbol ?? 'Rs.';
  const currencyPosition = company?.currencyPosition ?? 'left';

  // Sanitize HTML to prevent XSS - only allow safe formatting tags
  // Safe to use in both SSR and client (returns empty during SSR)
  const sanitizeHtml = useCallback((html: string): string => {
    if (!html) return '';
    if (typeof window === 'undefined') return html; // SSR fallback
    
    // Create a temporary element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Allowed tags whitelist
    const allowedTags = ['strong', 'b', 'em', 'i', 'u', 'p', 'br', 'ul', 'ol', 'li', 'span'];
    
    // Remove any script tags and event handlers
    const removeUnsafe = (element: Element) => {
      // Remove script tags
      element.querySelectorAll('script').forEach(el => el.remove());
      
      // Process all elements
      element.querySelectorAll('*').forEach(el => {
        const tagName = el.tagName.toLowerCase();
        
        // Remove disallowed tags but keep their content
        if (!allowedTags.includes(tagName)) {
          const parent = el.parentNode;
          while (el.firstChild) {
            parent?.insertBefore(el.firstChild, el);
          }
          el.remove();
          return;
        }
        
        // Remove all attributes (especially event handlers like onclick, onerror)
        const attrs = Array.from(el.attributes);
        attrs.forEach(attr => {
          el.removeAttribute(attr.name);
        });
      });
    };
    
    removeUnsafe(tempDiv);
    return tempDiv.innerHTML;
  }, []);

  // Check if HTML contains formatting tags (beyond basic structure)
  const hasFormattingTags = useCallback((html: string): boolean => {
    if (!html) return false;
    // Check for formatting tags: strong, b, em, i, u
    const formattingPattern = /<(strong|b|em|i|u)(\s[^>]*)?>.*?<\/\1>/i;
    return formattingPattern.test(html);
  }, []);

  // Convert HTML to plain text (strip tags, convert breaks to newlines)
  const htmlToPlainText = useCallback((html: string): string => {
    if (!html) return '';
    if (typeof window === 'undefined') return html;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Replace <br> and </p> with newlines
    tempDiv.innerHTML = tempDiv.innerHTML
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<p>/gi, '');
    
    // Get text content (strips all remaining tags)
    return tempDiv.textContent || tempDiv.innerText || '';
  }, []);

  // Convert plain text to safe HTML (escape entities, convert newlines to <br>)
  const plainTextToSafeHtml = useCallback((text: string): string => {
    if (!text) return '';
    
    // Escape HTML entities
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    
    // Convert newlines to <br>
    return escaped.replace(/\n/g, '<br>');
  }, []);

  // Format number with thousand separators
  const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatCurrency = (amount: number): string => {
    const formatted = formatNumber(amount ?? 0, 2);
    return currencyPosition === 'left'
      ? `${currencySymbol} ${formatted}`
      : `${formatted} ${currencySymbol}`;
  };

  const calculateTotals = useCallback(() => {
    let subtotal = 0;
    let totalCost = 0;

    (boq?.categories ?? []).forEach((cat) => {
      (cat?.items ?? []).forEach((item) => {
        if (item?.isNote) return; // Skip notes
        const qty = item?.quantity ?? 0;
        if (qty > 0) {
          const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
          subtotal += unitPrice * qty;
          totalCost += (item?.unitCost ?? 0) * qty;
        }
      });
    });

    // Apply discount only if enabled
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
    
    // Profit calculations based on price AFTER discount
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

  // Promise-based autosave for flush capability
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

  // Flush any pending autosave immediately - used before PDF export
  const flushPendingAutosave = useCallback(async () => {
    // Cancel any pending debounced save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    // Wait for any in-progress save to complete
    if (autosavePromiseRef.current) {
      await autosavePromiseRef.current;
    }
    // Force save current state
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

  // Sync local project name when boq changes externally
  useEffect(() => {
    setLocalProjectName(boq?.projectName ?? '');
  }, [boq?.projectName]);

  const updateBoq = (updates: Partial<BoqWithRelations>) => {
    setBoq((prev) => ({ ...(prev ?? {}), ...updates } as BoqWithRelations));
    triggerAutosave();
  };

  const handleProjectNameChange = (value: string) => {
    setLocalProjectName(value);
    // Debounce the actual update
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
    // Update local state immediately
    setLocalCategoryNames(prev => ({ ...prev, [categoryId]: name }));
    
    // Debounce API call
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

  const getCategoryName = (category: CategoryWithItems) => {
    return localCategoryNames[category.id] ?? category.name ?? '';
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

  const handleAddItem = async (categoryId: string, isNote: boolean = false) => {
    const category = (boq?.categories ?? []).find((c) => c?.id === categoryId);
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId,
          description: isNote ? '' : '',
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

  const getItemValue = (itemId: string, field: keyof BoqItemType, originalValue: any) => {
    return localItemValues[itemId]?.[field] ?? originalValue;
  };

  const handleUpdateItem = async (itemId: string, updates: Partial<BoqItemType>, immediate: boolean = false) => {
    // Update local state immediately for responsive UI
    setLocalItemValues(prev => ({
      ...prev,
      [itemId]: { ...(prev[itemId] ?? {}), ...updates }
    }));

    // Also update the main boq state for calculations
    setBoq((prev) => ({
      ...(prev ?? {}),
      categories: (prev?.categories ?? []).map((cat) => ({
        ...(cat ?? {}),
        items: (cat?.items ?? []).map((item) =>
          item?.id === itemId ? { ...(item ?? {}), ...updates } : item
        ),
      })),
    } as BoqWithRelations));

    // Debounce API call
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

  // Inline note editing functions
  const startInlineNoteEdit = useCallback((itemId: string, currentHtml: string) => {
    // Check if note has formatting
    if (hasFormattingTags(currentHtml)) {
      // Show warning dialog
      setShowFormattingWarning({ noteId: itemId, itemId });
      return;
    }
    
    // No formatting, start editing directly
    const plainText = htmlToPlainText(currentHtml);
    setInlineEditText(plainText);
    setInlineEditingNoteId(itemId);
    
    // Focus textarea after render
    setTimeout(() => {
      inlineTextareaRef.current?.focus();
    }, 50);
  }, [hasFormattingTags, htmlToPlainText]);

  const confirmInlineEditWithFormatting = useCallback(() => {
    if (!showFormattingWarning) return;
    
    // Get the current note content
    const itemId = showFormattingWarning.itemId;
    let currentHtml = '';
    
    // Find the note content from localItemValues or boq state
    const localNote = localItemValues[itemId]?.noteContent;
    if (localNote !== undefined) {
      currentHtml = localNote ?? '';
    } else {
      // Find from boq state
      for (const cat of boq?.categories ?? []) {
        const item = cat?.items?.find(i => i.id === itemId);
        if (item) {
          currentHtml = item.noteContent ?? '';
          break;
        }
      }
    }
    
    const plainText = htmlToPlainText(currentHtml);
    setInlineEditText(plainText);
    setInlineEditingNoteId(itemId);
    setShowFormattingWarning(null);
    
    // Focus textarea after render
    setTimeout(() => {
      inlineTextareaRef.current?.focus();
    }, 50);
  }, [showFormattingWarning, localItemValues, boq?.categories, htmlToPlainText]);

  const cancelInlineEdit = useCallback(() => {
    setInlineEditingNoteId(null);
    setInlineEditText('');
  }, []);

  const saveInlineEdit = useCallback(async (itemId: string) => {
    // Convert plain text to safe HTML
    const safeHtml = plainTextToSafeHtml(inlineEditText);
    
    // Save using existing update function
    await handleUpdateItem(itemId, { noteContent: safeHtml }, true);
    
    // Exit inline edit mode
    setInlineEditingNoteId(null);
    setInlineEditText('');
  }, [inlineEditText, plainTextToSafeHtml, handleUpdateItem]);

  const handleInlineNoteKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>, itemId: string) => {
    // Escape to cancel
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelInlineEdit();
      return;
    }
    
    // Ctrl/Cmd + Enter to save
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifier = isMac ? e.metaKey : e.ctrlKey;
    
    if (modifier && e.key === 'Enter') {
      e.preventDefault();
      saveInlineEdit(itemId);
    }
  }, [cancelInlineEdit, saveInlineEdit]);

  // Track if drag was initiated from grip handle
  const [canDrag, setCanDrag] = useState(false);

  // Mouse down on grip handle - enable dragging
  const handleGripMouseDown = (categoryId: string, itemId: string) => {
    setCanDrag(true);
    setDraggedItem({ categoryId, itemId });
  };

  // Mouse up - disable dragging if not actually dragging
  const handleGripMouseUp = () => {
    if (!draggedItem) {
      setCanDrag(false);
    }
  };

  // Drag start - only proceed if initiated from grip
  const handleDragStart = (e: React.DragEvent, categoryId: string, itemId: string) => {
    if (!canDrag || !draggedItem || draggedItem.itemId !== itemId) {
      e.preventDefault();
      setCanDrag(false);
      return;
    }
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (draggedItem) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDragEnd = () => {
    setCanDrag(false);
    setDraggedItem(null);
  };

  const handleDrop = async (categoryId: string, targetIndex: number) => {
    if (!draggedItem || draggedItem.categoryId !== categoryId) {
      setDraggedItem(null);
      setCanDrag(false);
      return;
    }

    const category = (boq?.categories ?? []).find((c) => c?.id === categoryId);
    if (!category) return;

    const items = [...(category.items ?? [])];
    const draggedIndex = items.findIndex(item => item.id === draggedItem.itemId);
    
    if (draggedIndex === -1 || draggedIndex === targetIndex) {
      setDraggedItem(null);
      setCanDrag(false);
      return;
    }

    // Reorder items
    const [removed] = items.splice(draggedIndex, 1);
    items.splice(targetIndex, 0, removed);

    // Update sort orders
    const updatedItems = items.map((item, index) => ({ ...item, sortOrder: index }));

    // Update local state
    setBoq((prev) => ({
      ...(prev ?? {}),
      categories: (prev?.categories ?? []).map((cat) =>
        cat?.id === categoryId ? { ...cat, items: updatedItems } : cat
      ),
    } as BoqWithRelations));

    // Update sort orders in database
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

    setDraggedItem(null);
    setCanDrag(false);
  };

  // Open edit item dialog
  const openEditItemDialog = (item: BoqItemType, categoryId: string, categoryName: string, itemNumber: string | null) => {
    // Get the latest note content from the boq state (source of truth)
    // This ensures we have the most up-to-date content after saves
    let latestNoteContent: string | null = item.noteContent;
    
    // Check localItemValues for any pending updates
    const localNote = localItemValues[item.id]?.noteContent;
    if (localNote !== undefined) {
      latestNoteContent = localNote;
    }
    
    // Reset the editor initialization tracker to force re-initialization
    noteEditorInitializedRef.current = null;
    
    setEditItemDialog({
      item: { ...item, noteContent: latestNoteContent }, // Use latest content
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
  };

  // Initialize note editor content when dialog opens
  useEffect(() => {
    if (editItemDialog?.item.isNote && editItemDialog.item.id !== noteEditorInitializedRef.current) {
      // Small delay to ensure the contentEditable div is mounted
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

  // Save edit item dialog
  const saveEditItemDialog = async () => {
    if (!editItemDialog) return;
    await handleUpdateItem(editItemDialog.item.id, editItemValues, true);
    setEditItemDialog(null);
    setEditItemValues({});
  };

  // Rich text formatting for notes using execCommand (more reliable)
  const applyTextFormat = useCallback((format: 'bold' | 'italic' | 'underline') => {
    // Focus the editor if not already focused
    if (noteEditorRef.current) {
      noteEditorRef.current.focus();
    }
    
    // Use execCommand for reliable formatting
    document.execCommand(format, false);
    
    // Update the state with new HTML content
    if (noteEditorRef.current) {
      const htmlContent = noteEditorRef.current.innerHTML;
      setEditItemValues(prev => ({ ...prev, noteContent: htmlContent }));
    }
  }, []);

  // Handle keyboard shortcuts in the note editor
  const handleNoteEditorKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
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
  }, [applyTextFormat]);

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
      // Flush any pending autosave to ensure database has latest state
      await flushPendingAutosave();
      
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
      if (item?.isNote) return sum; // Skip notes
      const qty = item?.quantity ?? 0;
      if (qty > 0) {
        const unitPrice = (item?.unitCost ?? 0) * (1 + (item?.markupPct ?? 0) / 100);
        return sum + unitPrice * qty;
      }
      return sum;
    }, 0);
  };

  // Get item number (excluding notes)
  const getItemNumber = (category: CategoryWithItems, catIndex: number, itemIndex: number): string | null => {
    const item = category.items[itemIndex];
    if (item?.isNote) return null;
    
    // Count non-note items before this one
    let nonNoteCount = 0;
    for (let i = 0; i <= itemIndex; i++) {
      if (!category.items[i]?.isNote) {
        nonNoteCount++;
      }
    }
    return `${catIndex + 1}.${nonNoteCount}`;
  };

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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Totals & Profit Analysis - Top Section */}
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
                    <span className={`font-semibold ${totals.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatCurrency(totals.profit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gross Profit %</span>
                    <span className={`font-semibold ${totals.grossProfitPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatNumber(totals.grossProfitPct)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Categories & Items - Full Width */}
            <div className="space-y-4">
              {(boq?.categories ?? []).map((category, catIndex) => (
                <Card key={category?.id} className="shadow-md border-0 overflow-hidden">
                  <Collapsible
                    open={expandedCategories.has(category?.id)}
                    onOpenChange={() => toggleCategory(category?.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0" />
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
                              ({(category?.items ?? []).filter(i => !i?.isNote).length} items)
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
                                <th className="text-left py-2 px-1 font-medium text-gray-500 w-6"></th>
                                <th className="text-left py-2 px-2 font-medium text-gray-500 w-12">#</th>
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
                                const itemNumber = getItemNumber(category, catIndex, itemIndex);
                                
                                if (item?.isNote) {
                                  // Render note row
                                  return (
                                    <tr 
                                      key={item?.id} 
                                      className={`border-b border-gray-100 bg-amber-50 ${draggedItem?.itemId === item.id ? 'opacity-50' : ''}`}
                                      draggable={canDrag && draggedItem?.itemId === item.id}
                                      onDragStart={(e) => handleDragStart(e, category.id, item.id)}
                                      onDragOver={handleDragOver}
                                      onDragEnd={handleDragEnd}
                                      onDrop={() => handleDrop(category.id, itemIndex)}
                                    >
                                      <td className="py-2 px-1">
                                        <div 
                                          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded"
                                          onMouseDown={() => handleGripMouseDown(category.id, item.id)}
                                          onMouseUp={handleGripMouseUp}
                                        >
                                          <GripVertical className="w-4 h-4 text-gray-400" />
                                        </div>
                                      </td>
                                      <td className="py-2 px-2">
                                        <StickyNote className="w-4 h-4 text-amber-500" />
                                      </td>
                                      <td colSpan={6} className="py-2 px-2">
                                        <div className="space-y-2">
                                          <div className="flex items-center space-x-2">
                                            {/* Inline edit mode or formatted preview */}
                                            {inlineEditingNoteId === item.id ? (
                                              // Inline edit mode - textarea
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
                                                      className="h-6 px-2 text-xs text-cyan-600 hover:text-cyan-700"
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
                                              // Preview mode - clickable to edit
                                              <div 
                                                className="flex-1 min-h-[32px] px-3 py-1.5 bg-white border rounded-lg text-sm cursor-text hover:border-cyan-400 transition-colors"
                                                onClick={() => startInlineNoteEdit(item.id, getItemValue(item.id, 'noteContent', item?.noteContent) ?? '')}
                                                title="Click to edit (basic text). Use expand for formatting."
                                              >
                                                {(getItemValue(item.id, 'noteContent', item?.noteContent) ?? '') ? (
                                                  <div 
                                                    className="prose prose-sm max-w-none [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline"
                                                    dangerouslySetInnerHTML={{ 
                                                      __html: sanitizeHtml(getItemValue(item.id, 'noteContent', item?.noteContent) ?? '') 
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
                                              onClick={() => openEditItemDialog(item, category.id, category.name ?? '', null)}
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
                                }

                                const unitCost = getItemValue(item.id, 'unitCost', item?.unitCost) ?? 0;
                                const markupPct = getItemValue(item.id, 'markupPct', item?.markupPct) ?? 0;
                                const quantity = getItemValue(item.id, 'quantity', item?.quantity) ?? 0;
                                const unitPrice = unitCost * (1 + markupPct / 100);
                                const amount = unitPrice * quantity;
                                
                                return (
                                  <tr 
                                    key={item?.id} 
                                    className={`border-b border-gray-100 hover:bg-gray-50 ${draggedItem?.itemId === item.id ? 'opacity-50' : ''}`}
                                    draggable={canDrag && draggedItem?.itemId === item.id}
                                    onDragStart={(e) => handleDragStart(e, category.id, item.id)}
                                    onDragOver={handleDragOver}
                                    onDragEnd={handleDragEnd}
                                    onDrop={() => handleDrop(category.id, itemIndex)}
                                  >
                                    <td className="py-2 px-1">
                                      <div 
                                        className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded"
                                        onMouseDown={() => handleGripMouseDown(category.id, item.id)}
                                        onMouseUp={handleGripMouseUp}
                                      >
                                        <GripVertical className="w-4 h-4 text-gray-400" />
                                      </div>
                                    </td>
                                    <td className="py-2 px-2 text-gray-500">
                                      {itemNumber}
                                    </td>
                                    <td className="py-2 px-2">
                                      <div className="flex items-center space-x-1">
                                        <Input
                                          value={getItemValue(item.id, 'description', item?.description) ?? ''}
                                          onChange={(e) =>
                                            handleUpdateItem(item?.id, { description: e.target.value })
                                          }
                                          className="h-8 text-sm flex-1"
                                          placeholder="Description"
                                        />
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 text-gray-400 hover:text-cyan-600 flex-shrink-0"
                                          onClick={() => openEditItemDialog(item, category.id, category.name ?? '', itemNumber)}
                                          title="Expand to edit"
                                        >
                                          <Expand className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </td>
                                    <td className="py-2 px-2">
                                      <Input
                                        value={getItemValue(item.id, 'unit', item?.unit) ?? ''}
                                        onChange={(e) =>
                                          handleUpdateItem(item?.id, { unit: e.target.value })
                                        }
                                        className="h-8 text-sm"
                                        placeholder="Unit"
                                      />
                                    </td>
                                    <td className="py-2 px-2">
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={unitCost}
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
                                        value={markupPct}
                                        onChange={(e) =>
                                          handleUpdateItem(item?.id, {
                                            markupPct: parseFloat(e.target.value) || 0,
                                          })
                                        }
                                        className="h-8 text-sm text-right"
                                      />
                                    </td>
                                    <td className="py-2 px-2 text-right font-medium text-gray-700">
                                      {formatNumber(unitPrice)}
                                    </td>
                                    <td className="py-2 px-2">
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={quantity}
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
                        <div className="flex space-x-2 mt-3">
                          <Button
                            variant="ghost"
                            className="flex-1 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                            onClick={() => handleAddItem(category?.id, false)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Item
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
          </div>
        </div>

        {/* Formatting Warning Dialog */}
        <Dialog open={!!showFormattingWarning} onOpenChange={(open) => !open && setShowFormattingWarning(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Note Has Formatting</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600 mb-4">
                This note contains formatting (bold, italic, underline). Inline editing will convert it to plain text and <strong>remove all formatting</strong>.
              </p>
              <p className="text-sm text-gray-600">
                To edit while keeping formatting, click <strong>Cancel</strong> and use the expand button (⤢) instead.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFormattingWarning(null)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={confirmInlineEditWithFormatting}
              >
                Edit Anyway (Remove Formatting)
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
                {editItemDialog?.item.isNote ? 'Edit Note' : `Edit Item ${editItemDialog?.itemNumber ?? ''}`}
              </DialogTitle>
              <p className="text-sm text-gray-500">
                Category: {editItemDialog?.categoryName}
              </p>
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
                            e.preventDefault(); // Prevent losing selection
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
                            e.preventDefault(); // Prevent losing selection
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
                            e.preventDefault(); // Prevent losing selection
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
                          setEditItemValues(prev => ({ ...prev, noteContent: target.innerHTML }));
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
                        setEditItemValues(prev => ({ ...prev, includeInPdf: checked as boolean }))
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
                      onChange={(e) => setEditItemValues(prev => ({ ...prev, description: e.target.value }))}
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
                        onChange={(e) => setEditItemValues(prev => ({ ...prev, unit: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-unitCost">Unit Cost</Label>
                      <Input
                        id="edit-unitCost"
                        type="number"
                        step="0.01"
                        value={editItemValues.unitCost ?? 0}
                        onChange={(e) => setEditItemValues(prev => ({ ...prev, unitCost: parseFloat(e.target.value) || 0 }))}
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
                        onChange={(e) => setEditItemValues(prev => ({ ...prev, markupPct: parseFloat(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-quantity">Quantity</Label>
                      <Input
                        id="edit-quantity"
                        type="number"
                        step="0.01"
                        value={editItemValues.quantity ?? 0}
                        onChange={(e) => setEditItemValues(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                      />
                    </div>
                  </div>
                  {/* Calculated values display */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unit Price:</span>
                      <span className="font-medium">
                        {formatCurrency((editItemValues.unitCost ?? 0) * (1 + (editItemValues.markupPct ?? 0) / 100))}
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
