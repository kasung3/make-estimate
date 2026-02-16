/**
 * API Route Instrumentation
 * Wraps API handlers with timing, logging, error tracking, and rate limiting
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { createTimer, logRequestMetrics, logError } from './performance';
import { checkRateLimit, rateLimitResponse, RATE_LIMITS, rateLimitKey, type RateLimitConfig } from './rate-limiter';
import { botProtection } from './sanitize';

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

interface InstrumentOptions {
  requireAuth?: boolean;
  rateLimit?: {
    type: keyof typeof RATE_LIMITS;
    keyBy: 'company' | 'user';
  };
}

/**
 * Wrap an API route handler with instrumentation
 */
export function instrumentRoute(
  endpoint: string,
  method: string,
  handler: RouteHandler,
  options: InstrumentOptions = { requireAuth: true }
) {
  return async (request: Request, context: { params: any }) => {
    const timer = createTimer();
    let statusCode = 500;
    let companyId: string | undefined;
    let userId: string | undefined;
    let errorMessage: string | undefined;

    try {
      // Bot detection for mutating requests
      if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        const botBlock = botProtection(request);
        if (botBlock) {
          statusCode = 403;
          return botBlock as any;
        }
      }

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

      // Rate limit check if configured
      if (options.rateLimit && (companyId || userId)) {
        const identifier = options.rateLimit.keyBy === 'company' ? companyId! : userId!;
        const rateKey = rateLimitKey(options.rateLimit.type, identifier);
        const rateResult = checkRateLimit(rateKey, RATE_LIMITS[options.rateLimit.type]);
        
        if (!rateResult.allowed) {
          statusCode = 429;
          console.log(`[RATE_LIMITED] ${endpoint} ${options.rateLimit.type}:${identifier}`);
          return rateLimitResponse(rateResult);
        }
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
