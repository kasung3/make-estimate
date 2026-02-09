import { PrismaClient } from '@prisma/client';
import { logSlowQuery } from './performance';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Connection Pool Configuration for Scale (10k-50k companies)
 * 
 * Recommended DATABASE_URL parameters:
 *   ?connection_limit=20&pool_timeout=30&connect_timeout=10
 * 
 * - connection_limit: Max connections per Prisma instance (default: num_cpus * 2 + 1)
 *   For serverless/edge: use 1-5
 *   For standard servers: use 10-20
 * 
 * - pool_timeout: Seconds to wait for a connection from pool (default: 10)
 * - connect_timeout: Seconds to wait for new connection (default: 5)
 * 
 * For high-scale production:
 * - Consider PgBouncer or Supabase connection pooler
 * - Use transaction pooling mode for short queries
 * - Monitor with: SELECT * FROM pg_stat_activity;
 */

// Create Prisma client with query logging enabled
function createPrismaClient(): PrismaClient {
  const isProduction = process.env.NODE_ENV === 'production';
  
  const client = new PrismaClient({
    log: isProduction 
      ? [
          { level: 'error', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
        ]
      : [
          { level: 'query', emit: 'event' },
          { level: 'error', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
        ],
  });

  // Add query event listener for slow query detection (dev + prod with ENABLE_QUERY_LOGGING)
  if (!isProduction || process.env.ENABLE_QUERY_LOGGING === 'true') {
    (client as any).$on('query', (e: any) => {
      const durationMs = e.duration;
      
      logSlowQuery({
        query: e.query,
        params: e.params,
        durationMs,
        timestamp: new Date(),
        model: extractModelFromQuery(e.query),
        action: extractActionFromQuery(e.query),
      });
    });
  }

  return client;
}

// Extract model name from SQL query for logging
function extractModelFromQuery(query: string): string {
  const fromMatch = query.match(/FROM\s+["']?public["']?\.?["']?(\w+)["']?/i);
  const insertMatch = query.match(/INSERT\s+INTO\s+["']?public["']?\.?["']?(\w+)["']?/i);
  const updateMatch = query.match(/UPDATE\s+["']?public["']?\.?["']?(\w+)["']?/i);
  const deleteMatch = query.match(/DELETE\s+FROM\s+["']?public["']?\.?["']?(\w+)["']?/i);
  
  return (fromMatch?.[1] || insertMatch?.[1] || updateMatch?.[1] || deleteMatch?.[1] || 'unknown').toLowerCase();
}

// Extract action type from SQL query
function extractActionFromQuery(query: string): string {
  const trimmed = query.trim().toUpperCase();
  if (trimmed.startsWith('SELECT')) return 'select';
  if (trimmed.startsWith('INSERT')) return 'insert';
  if (trimmed.startsWith('UPDATE')) return 'update';
  if (trimmed.startsWith('DELETE')) return 'delete';
  if (trimmed.startsWith('BEGIN')) return 'transaction';
  if (trimmed.startsWith('COMMIT')) return 'commit';
  return 'other';
}

// Use singleton pattern to prevent connection storms
// In production, each server instance maintains its own pool
// In development, we reuse across hot reloads
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
