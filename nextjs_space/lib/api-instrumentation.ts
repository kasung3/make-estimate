/**
 * API Route Instrumentation
 * Wraps API handlers with timing, logging, and error tracking
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { createTimer, logRequestMetrics, logError } from './performance';

export interface InstrumentedContext {
  session: any;
  companyId: string;
  userId: string;
  timer: ReturnType<typeof createTimer>;
}

type RouteHandler = (
  request: Request,
  context: { params: any },
  instrumented: InstrumentedContext
) => Promise<NextResponse>;

/**
 * Wrap an API route handler with instrumentation
 */
export function instrumentRoute(
  endpoint: string,
  method: string,
  handler: RouteHandler,
  options: { requireAuth?: boolean } = { requireAuth: true }
) {
  return async (request: Request, context: { params: any }) => {
    const timer = createTimer();
    let statusCode = 500;
    let companyId: string | undefined;
    let userId: string | undefined;
    let errorMessage: string | undefined;

    try {
      // Auth check if required
      let session = null;
      if (options.requireAuth) {
        session = await getServerSession(authOptions);
        if (!session?.user) {
          statusCode = 401;
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        companyId = (session.user as any)?.companyId;
        userId = (session.user as any)?.id;
      }

      // Execute handler
      const response = await handler(request, context, {
        session,
        companyId: companyId || '',
        userId: userId || '',
        timer,
      });

      statusCode = response.status;
      return response;
    } catch (error) {
      errorMessage = (error as Error).message;
      logError(error as Error, {
        endpoint,
        method,
        companyId,
        userId,
      });
      statusCode = 500;
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    } finally {
      // Log request metrics
      logRequestMetrics({
        endpoint: `${endpoint}${context.params?.id ? `/${context.params.id}` : ''}`,
        method,
        companyId,
        userId,
        durationMs: timer.elapsed(),
        statusCode,
        timestamp: new Date(),
        error: errorMessage,
      });
    }
  };
}

/**
 * Simple timing wrapper for specific operations within a handler
 */
export async function timedOperation<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  const timer = createTimer();
  try {
    const result = await operation();
    const elapsed = timer.elapsed();
    if (elapsed > 500) {
      console.warn(`[SLOW_OP] ${name} took ${elapsed}ms`);
    }
    return result;
  } catch (error) {
    console.error(`[OP_ERROR] ${name} failed after ${timer.elapsed()}ms`);
    throw error;
  }
}
