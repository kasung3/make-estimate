import { PrismaClient } from '@prisma/client';
import { logSlowQuery } from './performance';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Prisma client with query logging enabled
function createPrismaClient(): PrismaClient {
  const client = new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'stdout' },
      { level: 'warn', emit: 'stdout' },
    ],
  });

  // Add query event listener for slow query detection
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

  return client;
}

// Extract model name from SQL query for logging
function extractModelFromQuery(query: string): string {
  // Match table name from common patterns
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

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Connection pool configuration is handled via DATABASE_URL params
// Example: ?connection_limit=10&pool_timeout=30
// See: https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-pool
