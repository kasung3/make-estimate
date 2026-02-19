'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Lightbulb,
  Bug,
  Plus,
  Loader2,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  Rocket,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface FeedbackItem {
  id: string;
  type: 'feature_request' | 'bug_report';
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

interface RoadmapItem {
  id: string;
  type: string;
  title: string;
  description: string;
  status: string;
  votes: number;
  createdAt: string;
}

interface Roadmap {
  in_progress: RoadmapItem[];
  planned: RoadmapItem[];
  completed: RoadmapItem[];
}

export function FeedbackClient() {
  const [activeTab, setActiveTab] = useState('submit');
  const [myFeedback, setMyFeedback] = useState<FeedbackItem[]>([]);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  
  // New feedback form
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'feature_request' | 'bug_report'>('feature_request');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (activeTab === 'my-feedback') {
      fetchMyFeedback();
    } else if (activeTab === 'roadmap') {
      fetchRoadmap();
    }
  }, [activeTab]);

  const fetchMyFeedback = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/feedback');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setMyFeedback(data);
    } catch (err) {
      toast.error('Failed to load your feedback');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoadmap = async () => {
    setRoadmapLoading(true);
    try {
      const res = await fetch('/api/feedback/roadmap');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRoadmap(data);
    } catch (err) {
      toast.error('Failed to load roadmap');
    } finally {
      setRoadmapLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || title.length < 5) {
      toast.error('Please enter a title (at least 5 characters)');
      return;
    }
    if (!description.trim() || description.length < 10) {
      toast.error('Please enter a description (at least 10 characters)');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: feedbackType, title, description }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit');
      }
      toast.success('Thank you for your feedback!');
      setShowNewDialog(false);
      setTitle('');
      setDescription('');
      setFeedbackType('feature_request');
      // Refresh list if on that tab
      if (activeTab === 'my-feedback') {
        fetchMyFeedback();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-gray-100 text-gray-700',
      under_review: 'bg-blue-100 text-blue-700',
      planned: 'bg-purple-100 text-purple-700',
      in_progress: 'bg-amber-100 text-amber-700',
      completed: 'bg-green-100 text-green-700',
      wont_do: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress': return <Rocket className="h-4 w-4" />;
      case 'planned': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Feedback & Roadmap</h1>
            <p className="text-muted-foreground">Help us improve MakeEstimate</p>
          </div>
          <Button onClick={() => setShowNewDialog(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Submit Feedback
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="submit" className="gap-2">
              <Sparkles className="h-4 w-4" /> Submit
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="gap-2">
              <Rocket className="h-4 w-4" /> Roadmap
            </TabsTrigger>
            <TabsTrigger value="my-feedback" className="gap-2">
              <MessageSquare className="h-4 w-4" /> My Submissions
            </TabsTrigger>
          </TabsList>

          {/* Submit Tab */}
          <TabsContent value="submit">
            <div className="grid md:grid-cols-2 gap-6">
              <Card 
                className="cursor-pointer hover:border-purple-300 transition-colors group"
                onClick={() => { setFeedbackType('feature_request'); setShowNewDialog(true); }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Lightbulb className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Feature Request</h3>
                  <p className="text-sm text-muted-foreground">
                    Have an idea to make MakeEstimate better? We&apos;d love to hear it!
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-red-300 transition-colors group"
                onClick={() => { setFeedbackType('bug_report'); setShowNewDialog(true); }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <Bug className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Bug Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Found something that isn&apos;t working right? Let us know so we can fix it.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap">
            {roadmapLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : !roadmap ? (
              <div className="text-center py-12 text-muted-foreground">
                Unable to load roadmap
              </div>
            ) : (
              <div className="space-y-8">
                {/* In Progress */}
                {roadmap.in_progress.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Rocket className="h-5 w-5 text-amber-600" />
                      <h3 className="text-lg font-semibold">In Progress</h3>
                      <Badge variant="secondary">{roadmap.in_progress.length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {roadmap.in_progress.map((item) => (
                        <Card key={item.id} className="border-l-4 border-l-amber-500">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-2">
                              <Badge variant={item.type === 'bug_report' ? 'destructive' : 'default'} className="text-xs">
                                {item.type === 'bug_report' ? 'Bug' : 'Feature'}
                              </Badge>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Planned */}
                {roadmap.planned.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <h3 className="text-lg font-semibold">Planned</h3>
                      <Badge variant="secondary">{roadmap.planned.length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {roadmap.planned.map((item) => (
                        <Card key={item.id} className="border-l-4 border-l-purple-500">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-2">
                              <Badge variant={item.type === 'bug_report' ? 'destructive' : 'default'} className="text-xs">
                                {item.type === 'bug_report' ? 'Bug' : 'Feature'}
                              </Badge>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recently Completed */}
                {roadmap.completed.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold">Recently Completed</h3>
                      <Badge variant="secondary">{roadmap.completed.length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {roadmap.completed.map((item) => (
                        <Card key={item.id} className="border-l-4 border-l-green-500 opacity-75">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-2">
                              <Badge variant={item.type === 'bug_report' ? 'destructive' : 'default'} className="text-xs">
                                {item.type === 'bug_report' ? 'Bug' : 'Feature'}
                              </Badge>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {roadmap.in_progress.length === 0 && roadmap.planned.length === 0 && roadmap.completed.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No public roadmap items yet.</p>
                    <p className="text-sm">Submit feedback to help shape our roadmap!</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* My Submissions Tab */}
          <TabsContent value="my-feedback">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : myFeedback.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>You haven&apos;t submitted any feedback yet.</p>
                <Button className="mt-4" onClick={() => setShowNewDialog(true)}>
                  Submit Your First Feedback
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {myFeedback.map((fb) => (
                  <Card key={fb.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={fb.type === 'bug_report' ? 'destructive' : 'default'} className="text-xs">
                              {fb.type === 'bug_report' ? 'Bug' : 'Feature'}
                            </Badge>
                            <Badge variant="outline" className={getStatusBadge(fb.status)}>
                              {fb.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <h4 className="font-medium truncate">{fb.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{fb.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Submitted {format(new Date(fb.createdAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* New Feedback Dialog */}
        <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {feedbackType === 'feature_request' ? (
                  <><Lightbulb className="h-5 w-5 text-purple-600" /> Feature Request</>
                ) : (
                  <><Bug className="h-5 w-5 text-red-600" /> Bug Report</>
                )}
              </DialogTitle>
              <DialogDescription>
                {feedbackType === 'feature_request'
                  ? 'Describe the feature you\'d like to see in MakeEstimate.'
                  : 'Tell us about the issue you encountered so we can fix it.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>Type</Label>
                <Select value={feedbackType} onValueChange={(v: 'feature_request' | 'bug_report') => setFeedbackType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature_request">Feature Request</SelectItem>
                    <SelectItem value="bug_report">Bug Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Title *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={feedbackType === 'feature_request' ? 'e.g., Add bulk item import' : 'e.g., PDF export fails on large BOQs'}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-1">{title.length}/200</p>
              </div>

              <div>
                <Label>Description *</Label>
                <textarea
                  className="w-full min-h-[120px] p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={feedbackType === 'feature_request'
                    ? 'Describe the feature, how it would work, and why it would be useful...'
                    : 'Describe what happened, what you expected, and steps to reproduce the issue...'}
                  maxLength={5000}
                />
                <p className="text-xs text-muted-foreground mt-1">{description.length}/5000</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewDialog(false)}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={submitting} className="gap-2">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
