/**
 * Performance monitoring and logging utilities
 * For tracking request timing, slow queries, and error tracking
 */

export interface RequestMetrics {
  endpoint: string;
  method: string;
  companyId?: string;
  userId?: string;
  durationMs: number;
  statusCode: number;
  timestamp: Date;
  queryCount?: number;
  slowQueries?: number;
  error?: string;
}

export interface QueryMetrics {
  query: string;
  params?: string;
  durationMs: number;
  timestamp: Date;
  model?: string;
  action?: string;
}

// Threshold for slow query logging (in ms)
const SLOW_QUERY_THRESHOLD = parseInt(process.env.SLOW_QUERY_THRESHOLD || '500', 10);

// In-memory metrics buffer for recent requests (circular buffer)
const MAX_METRICS_BUFFER = 1000;
const requestMetricsBuffer: RequestMetrics[] = [];
const slowQueryBuffer: QueryMetrics[] = [];

/**
 * Log request metrics
 */
export function logRequestMetrics(metrics: RequestMetrics): void {
  // Console log for observability
  const logLevel = metrics.durationMs > 1000 ? 'warn' : 'info';
  const logData = {
    type: 'REQUEST_METRICS',
    ...metrics,
    timestamp: metrics.timestamp.toISOString(),
  };
  
  if (logLevel === 'warn') {
    console.warn(`[SLOW_REQUEST] ${metrics.method} ${metrics.endpoint} took ${metrics.durationMs}ms`, JSON.stringify(logData));
  } else if (process.env.VERBOSE_LOGGING === 'true') {
    console.log(`[REQUEST] ${metrics.method} ${metrics.endpoint} - ${metrics.durationMs}ms`, JSON.stringify(logData));
  }
  
  // Add to buffer
  requestMetricsBuffer.push(metrics);
  if (requestMetricsBuffer.length > MAX_METRICS_BUFFER) {
    requestMetricsBuffer.shift();
  }
}

/**
 * Log slow query
 */
export function logSlowQuery(metrics: QueryMetrics): void {
  if (metrics.durationMs >= SLOW_QUERY_THRESHOLD) {
    console.warn(`[SLOW_QUERY] ${metrics.model}.${metrics.action} took ${metrics.durationMs}ms`, JSON.stringify({
      type: 'SLOW_QUERY',
      ...metrics,
      timestamp: metrics.timestamp.toISOString(),
    }));
    
    slowQueryBuffer.push(metrics);
    if (slowQueryBuffer.length > MAX_METRICS_BUFFER) {
      slowQueryBuffer.shift();
    }
  }
}

/**
 * Log application error with context
 */
export function logError(error: Error, context: {
  endpoint?: string;
  method?: string;
  companyId?: string;
  userId?: string;
  action?: string;
  additionalInfo?: Record<string, any>;
}): void {
  console.error(`[ERROR] ${context.action || context.endpoint || 'Unknown'}`, JSON.stringify({
    type: 'APP_ERROR',
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...context,
    timestamp: new Date().toISOString(),
  }));
}

/**
 * Timer utility for measuring operation duration
 */
export function createTimer() {
  const start = performance.now();
  return {
    elapsed: () => Math.round(performance.now() - start),
  };
}

/**
 * Wrap an async function with timing and error tracking
 */
export async function withTiming<T>(
  operation: string,
  fn: () => Promise<T>,
  context?: { companyId?: string; userId?: string }
): Promise<{ result: T; durationMs: number }> {
  const timer = createTimer();
  try {
    const result = await fn();
    const durationMs = timer.elapsed();
    
    if (durationMs > 1000) {
      console.warn(`[SLOW_OP] ${operation} took ${durationMs}ms`, context);
    }
    
    return { result, durationMs };
  } catch (error) {
    logError(error as Error, { action: operation, ...context });
    throw error;
  }
}

/**
 * Get recent metrics for debugging/admin
 */
export function getRecentMetrics() {
  return {
    requests: requestMetricsBuffer.slice(-100),
    slowQueries: slowQueryBuffer.slice(-100),
    summary: {
      totalRequests: requestMetricsBuffer.length,
      slowRequests: requestMetricsBuffer.filter(r => r.durationMs > 1000).length,
      slowQueries: slowQueryBuffer.length,
      avgRequestTime: requestMetricsBuffer.length > 0
        ? Math.round(requestMetricsBuffer.reduce((sum, r) => sum + r.durationMs, 0) / requestMetricsBuffer.length)
        : 0,
    },
  };
}
