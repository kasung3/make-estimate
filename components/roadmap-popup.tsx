'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Rocket,
  Clock,
  Sparkles,
  Loader2,
  ExternalLink,
  Lightbulb,
  Bug,
} from 'lucide-react';
import Link from 'next/link';

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

interface RoadmapPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoadmapPopup({ open, onOpenChange }: RoadmapPopupProps) {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && !roadmap) {
      fetchRoadmap();
    }
  }, [open]);

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/feedback/roadmap');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRoadmap(data);
    } catch (err) {
      console.error('Failed to load roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const hasItems = roadmap && (roadmap.in_progress.length > 0 || roadmap.planned.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            What&apos;s Coming Next
          </DialogTitle>
          <DialogDescription>
            See what features we&apos;re working on and what&apos;s planned for MakeEstimate.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !hasItems ? (
          <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No announced features yet.</p>
            <p className="text-sm mt-2">Check back soon or submit your own ideas!</p>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* In Progress */}
            {roadmap && roadmap.in_progress.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold">Currently Building</h3>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                    {roadmap.in_progress.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {roadmap.in_progress.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-amber-500">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          {item.type === 'bug_report' ? (
                            <Bug className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Lightbulb className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Planned */}
            {roadmap && roadmap.planned.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold">Up Next</h3>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {roadmap.planned.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {roadmap.planned.slice(0, 5).map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2">
                          {item.type === 'bug_report' ? (
                            <Bug className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Lightbulb className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {roadmap.planned.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{roadmap.planned.length - 5} more planned features
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Have an idea? We&apos;d love to hear from you!
          </p>
          <Link href="/app/feedback" onClick={() => onOpenChange(false)}>
            <Button size="sm" variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" /> Submit Feedback
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
