/**
 * Rate Limiter - In-Memory Sliding Window
 * 
 * Provides rate limiting for API endpoints to prevent abuse.
 * Uses an in-memory sliding window algorithm.
 * 
 * For multi-server deployments, consider using Redis instead.
 */

interface RateLimitEntry {
  timestamps: number[];
  blocked: boolean;
  blockedUntil?: number;
}

export interface RateLimitConfig {
  windowMs: number;      // Time window in milliseconds
  maxRequests: number;   // Max requests per window
  blockDurationMs?: number; // How long to block after exceeding limit (optional)
}

// In-memory store for rate limit data
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries periodically (every 5 minutes)
let cleanupInterval: NodeJS.Timeout | null = null;

function startCleanup() {
  if (cleanupInterval) return;
  
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    const maxAge = 10 * 60 * 1000; // 10 minutes
    
    for (const [key, entry] of rateLimitStore.entries()) {
      // Remove entries that haven't been accessed in 10 minutes
      const latestTimestamp = entry.timestamps[entry.timestamps.length - 1] || 0;
      if (now - latestTimestamp > maxAge) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000); // Every 5 minutes
}

// Start cleanup on module load
if (typeof window === 'undefined') {
  startCleanup();
}

/**
 * Check if a request is rate limited
 * @param key Unique identifier (e.g., `pdf_export:${companyId}` or `autosave:${userId}`)
 * @param config Rate limit configuration
 * @returns { allowed: boolean, remaining: number, resetIn: number }
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetIn: number; retryAfter?: number } {
  const now = Date.now();
  const windowStart = now - config.windowMs;
  
  // Get or create entry
  let entry = rateLimitStore.get(key);
  if (!entry) {
    entry = { timestamps: [], blocked: false };
    rateLimitStore.set(key, entry);
  }
  
  // Check if currently blocked
  if (entry.blocked && entry.blockedUntil) {
    if (now < entry.blockedUntil) {
      const retryAfter = Math.ceil((entry.blockedUntil - now) / 1000);
      return {
        allowed: false,
        remaining: 0,
        resetIn: entry.blockedUntil - now,
        retryAfter,
      };
    } else {
      // Block expired, reset
      entry.blocked = false;
      entry.blockedUntil = undefined;
      entry.timestamps = [];
    }
  }
  
  // Filter out old timestamps (outside the window)
  entry.timestamps = entry.timestamps.filter(ts => ts > windowStart);
  
  // Check if limit exceeded
  if (entry.timestamps.length >= config.maxRequests) {
    // Apply block if configured
    if (config.blockDurationMs) {
      entry.blocked = true;
      entry.blockedUntil = now + config.blockDurationMs;
    }
    
    const oldestInWindow = entry.timestamps[0];
    const resetIn = oldestInWindow + config.windowMs - now;
    
    console.log(`[RATE_LIMIT_EXCEEDED] Key: ${key}, Requests: ${entry.timestamps.length}/${config.maxRequests}`);
    
    return {
      allowed: false,
      remaining: 0,
      resetIn,
      retryAfter: Math.ceil(resetIn / 1000),
    };
  }
  
  // Allow request and record timestamp
  entry.timestamps.push(now);
  
  return {
    allowed: true,
    remaining: config.maxRequests - entry.timestamps.length,
    resetIn: config.windowMs,
  };
}

/**
 * Pre-configured rate limit profiles
 */
export const RATE_LIMITS = {
  // PDF Export: 10 per minute per company
  PDF_EXPORT: {
    windowMs: 60 * 1000,
    maxRequests: 10,
    blockDurationMs: 30 * 1000, // 30 second block after exceeding
  },
  
  // Autosave: 60 per minute per user (1 per second average)
  AUTOSAVE: {
    windowMs: 60 * 1000,
    maxRequests: 60,
  },
  
  // Item updates: 120 per minute per user
  ITEM_UPDATE: {
    windowMs: 60 * 1000,
    maxRequests: 120,
  },
  
  // BOQ creation: 20 per minute per company
  BOQ_CREATE: {
    windowMs: 60 * 1000,
    maxRequests: 20,
  },
  
  // API general: 200 per minute per user
  API_GENERAL: {
    windowMs: 60 * 1000,
    maxRequests: 200,
  },
} as const;

/**
 * Generate a rate limit key
 */
export function rateLimitKey(
  type: keyof typeof RATE_LIMITS,
  identifier: string
): string {
  return `${type}:${identifier}`;
}

/**
 * Rate limit response helper - creates a 429 response
 */
export function rateLimitResponse(result: ReturnType<typeof checkRateLimit>) {
  return new Response(
    JSON.stringify({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: result.retryAfter,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(result.retryAfter || 60),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil(result.resetIn / 1000)),
      },
    }
  );
}

/**
 * Get current rate limit stats for monitoring
 */
export function getRateLimitStats() {
  const stats: Record<string, { count: number; blocked: boolean }> = {};
  
  for (const [key, entry] of rateLimitStore.entries()) {
    stats[key] = {
      count: entry.timestamps.length,
      blocked: entry.blocked,
    };
  }
  
  return stats;
}
