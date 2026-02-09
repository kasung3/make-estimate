export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { isPlatformAdmin } from '@/lib/billing';
import { getRecentMetrics } from '@/lib/performance';
import { getRateLimitStats } from '@/lib/rate-limiter';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !isPlatformAdmin(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const metrics = getRecentMetrics();
    const rateLimitStats = getRateLimitStats();

    // Group by endpoint for summary
    const endpointStats = new Map<string, { count: number; totalMs: number; maxMs: number; errors: number; rateLimited: number }>();
    
    for (const req of metrics.requests) {
      const key = `${req.method} ${req.endpoint.replace(/\/[a-f0-9-]{36}/g, '/:id')}`;
      const existing = endpointStats.get(key) || { count: 0, totalMs: 0, maxMs: 0, errors: 0, rateLimited: 0 };
      existing.count++;
      existing.totalMs += req.durationMs;
      existing.maxMs = Math.max(existing.maxMs, req.durationMs);
      if (req.error || req.statusCode >= 400) existing.errors++;
      if (req.statusCode === 429) existing.rateLimited++;
      endpointStats.set(key, existing);
    }

    const endpointSummary = Array.from(endpointStats.entries()).map(([endpoint, stats]) => ({
      endpoint,
      count: stats.count,
      avgMs: Math.round(stats.totalMs / stats.count),
      maxMs: stats.maxMs,
      errors: stats.errors,
      rateLimited: stats.rateLimited,
      errorRate: stats.count > 0 ? Math.round((stats.errors / stats.count) * 100) : 0,
    })).sort((a, b) => b.avgMs - a.avgMs);

    return NextResponse.json({
      summary: metrics.summary,
      endpointStats: endpointSummary,
      rateLimitStats,
      recentSlowQueries: metrics.slowQueries.slice(-20),
      recentRequests: metrics.requests.slice(-50),
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
