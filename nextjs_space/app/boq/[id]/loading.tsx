'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function BoqLoading() {
  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>

        {/* Customer selector skeleton */}
        <div className="flex items-center space-x-3 mb-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-10" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1 space-y-4">
            {/* Totals card skeleton */}
            <Card className="shadow-md border-0">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-16 w-32" />
                  <Skeleton className="h-16 w-32" />
                  <Skeleton className="h-16 w-32" />
                  <Skeleton className="h-16 w-40" />
                </div>
              </CardContent>
            </Card>

            {/* Category skeleton */}
            {[1, 2].map((i) => (
              <Card key={i} className="shadow-md border-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {/* Table header skeleton */}
                    <div className="flex items-center space-x-2 py-2 border-b">
                      <Skeleton className="h-4 w-6" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 flex-1" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    {/* Item rows skeleton */}
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-center space-x-2 py-2">
                        <Skeleton className="h-4 w-6" />
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-8 flex-1" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add category button skeleton */}
            <Skeleton className="h-10 w-36" />

            {/* Profit analysis card skeleton */}
            <Card className="shadow-md border-0">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-16 w-32" />
                  <Skeleton className="h-16 w-32" />
                  <Skeleton className="h-16 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
