'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '../../_components/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Plus,
  Loader2,
  Pencil,
  Trash2,
  Rocket,
  Clock,
  CheckCircle2,
  XCircle,
  GripVertical,
  Eye,
  EyeOff,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  sortOrder: number;
  isPublic: boolean;
  createdAt: string;
  createdBy: { name: string | null; email: string };
}

export function RoadmapAdminClient() {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'planned' | 'in_progress' | 'completed' | 'cancelled'>('planned');
  const [isPublic, setIsPublic] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/roadmap');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      toast.error('Failed to load roadmap items');
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setTitle('');
    setDescription('');
    setStatus('planned');
    setIsPublic(true);
    setSortOrder(items.length);
    setShowDialog(true);
  };

  const openEditDialog = (item: RoadmapItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setStatus(item.status);
    setIsPublic(item.isPublic);
    setSortOrder(item.sortOrder);
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!title.trim() || title.length < 3) {
      toast.error('Title must be at least 3 characters');
      return;
    }
    if (!description.trim() || description.length < 10) {
      toast.error('Description must be at least 10 characters');
      return;
    }

    setSaving(true);
    try {
      const payload = { title, description, status, isPublic, sortOrder };
      const url = editingItem
        ? `/api/admin/roadmap/${editingItem.id}`
        : '/api/admin/roadmap';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save');
      }

      toast.success(editingItem ? 'Item updated' : 'Item created');
      setShowDialog(false);
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`/api/admin/roadmap/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Item deleted');
      fetchItems();
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; icon: React.ReactNode }> = {
      planned: { bg: 'bg-purple-100 text-purple-700', icon: <Clock className="h-3 w-3" /> },
      in_progress: { bg: 'bg-amber-100 text-amber-700', icon: <Rocket className="h-3 w-3" /> },
      completed: { bg: 'bg-green-100 text-green-700', icon: <CheckCircle2 className="h-3 w-3" /> },
      cancelled: { bg: 'bg-gray-100 text-gray-700', icon: <XCircle className="h-3 w-3" /> },
    };
    const style = styles[status] || styles.planned;
    return (
      <Badge variant="secondary" className={`gap-1 ${style.bg}`}>
        {style.icon}
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const groupedItems = {
    in_progress: items.filter(i => i.status === 'in_progress'),
    planned: items.filter(i => i.status === 'planned'),
    completed: items.filter(i => i.status === 'completed'),
    cancelled: items.filter(i => i.status === 'cancelled'),
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Roadmap Management</h2>
            <p className="text-sm text-muted-foreground">
              Create and manage upcoming features visible to users
            </p>
          </div>
          <Button onClick={openCreateDialog} className="gap-2">
            <Plus className="h-4 w-4" /> Add Feature
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Rocket className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No roadmap items yet.</p>
              <p className="text-sm">Click "Add Feature" to create your first announcement.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* In Progress */}
            {groupedItems.in_progress.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold">In Progress</h3>
                  <Badge variant="secondary">{groupedItems.in_progress.length}</Badge>
                </div>
                <div className="space-y-3">
                  {groupedItems.in_progress.map(item => (
                    <RoadmapCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditDialog(item)}
                      onDelete={() => handleDelete(item.id)}
                      getStatusBadge={getStatusBadge}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Planned */}
            {groupedItems.planned.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold">Planned</h3>
                  <Badge variant="secondary">{groupedItems.planned.length}</Badge>
                </div>
                <div className="space-y-3">
                  {groupedItems.planned.map(item => (
                    <RoadmapCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditDialog(item)}
                      onDelete={() => handleDelete(item.id)}
                      getStatusBadge={getStatusBadge}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed */}
            {groupedItems.completed.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Completed</h3>
                  <Badge variant="secondary">{groupedItems.completed.length}</Badge>
                </div>
                <div className="space-y-3">
                  {groupedItems.completed.map(item => (
                    <RoadmapCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditDialog(item)}
                      onDelete={() => handleDelete(item.id)}
                      getStatusBadge={getStatusBadge}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cancelled */}
            {groupedItems.cancelled.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold">Cancelled</h3>
                  <Badge variant="secondary">{groupedItems.cancelled.length}</Badge>
                </div>
                <div className="space-y-3">
                  {groupedItems.cancelled.map(item => (
                    <RoadmapCard
                      key={item.id}
                      item={item}
                      onEdit={() => openEditDialog(item)}
                      onDelete={() => handleDelete(item.id)}
                      getStatusBadge={getStatusBadge}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Roadmap Item' : 'New Roadmap Item'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Bulk Item Import"
                  maxLength={200}
                />
              </div>

              <div>
                <Label>Description *</Label>
                <textarea
                  className="w-full min-h-[100px] p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this feature..."
                  maxLength={2000}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Sort Order</Label>
                  <Input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <Label>Public Visibility</Label>
                  <p className="text-xs text-muted-foreground">Show to users in the roadmap</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {editingItem ? 'Save Changes' : 'Create Item'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

function RoadmapCard({
  item,
  onEdit,
  onDelete,
  getStatusBadge,
}: {
  item: RoadmapItem;
  onEdit: () => void;
  onDelete: () => void;
  getStatusBadge: (status: string) => React.ReactNode;
}) {
  return (
    <Card className={`${!item.isPublic ? 'border-dashed opacity-70' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {getStatusBadge(item.status)}
              {!item.isPublic && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <EyeOff className="h-3 w-3" /> Hidden
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">#{item.sortOrder}</span>
            </div>
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Created {format(new Date(item.createdAt), 'MMM d, yyyy')} by {item.createdBy.name || item.createdBy.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
