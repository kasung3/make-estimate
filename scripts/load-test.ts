/**
 * Load Test Harness for MakeEstimate
 * 
 * Tests system performance under concurrent load.
 * 
 * Usage:
 *   npx tsx scripts/load-test.ts [scenario] [options]
 * 
 * Scenarios:
 *   dashboard    - Simulate users viewing dashboard
 *   autosave     - Simulate rapid item updates (autosave)
 *   pdf-export   - Simulate PDF export requests
 *   mixed        - Combination of all scenarios
 * 
 * Options:
 *   --users=N         Number of concurrent users (default: 10)
 *   --duration=N      Test duration in seconds (default: 60)
 *   --ramp-up=N       Time to ramp up to full users (default: 10)
 *   --base-url=URL    Base URL (default: http://localhost:3000)
 * 
 * Example:
 *   npx tsx scripts/load-test.ts mixed --users=50 --duration=120
 */

import { prisma } from '../lib/db';

interface TestResult {
  scenario: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  avgResponseTime: number;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  maxResponseTime: number;
  requestsPerSecond: number;
  errorRate: number;
  rateLimitedRequests: number;
}

interface RequestLog {
  endpoint: string;
  method: string;
  statusCode: number;
  durationMs: number;
  timestamp: Date;
  error?: string;
}

const requestLogs: RequestLog[] = [];

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const scenario = args.find(a => !a.startsWith('--')) || 'mixed';
  
  const getArg = (name: string, defaultVal: number) => {
    const arg = args.find(a => a.startsWith(`--${name}=`));
    return arg ? parseInt(arg.split('=')[1]) : defaultVal;
  };
  
  const getStringArg = (name: string, defaultVal: string) => {
    const arg = args.find(a => a.startsWith(`--${name}=`));
    return arg ? arg.split('=')[1] : defaultVal;
  };
  
  return {
    scenario,
    users: getArg('users', 10),
    duration: getArg('duration', 60),
    rampUp: getArg('ramp-up', 10),
    baseUrl: getStringArg('base-url', 'http://localhost:3000'),
  };
}

// Get test credentials from database
async function getTestCredentials() {
  // Get a few test users with their companies
  const users = await prisma.user.findMany({
    take: 20,
    include: {
      memberships: {
        include: {
          company: true,
        },
      },
    },
  });
  
  if (users.length === 0) {
    throw new Error('No test users found. Run seed script first.');
  }
  
  return users.map(u => ({
    userId: u.id,
    email: u.email,
    companyId: u.memberships[0]?.companyId,
    companyName: u.memberships[0]?.company?.name,
  }));
}

// Get test BOQs for a company
async function getTestBoqs(companyId: string) {
  return prisma.boq.findMany({
    where: { companyId },
    take: 10,
    include: {
      categories: {
        include: { items: true },
      },
    },
  });
}

// Simulate authenticated request
async function makeRequest(
  baseUrl: string,
  endpoint: string,
  method: string,
  body?: any,
  cookies?: string
): Promise<RequestLog> {
  const start = Date.now();
  let statusCode = 0;
  let error: string | undefined;
  
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(cookies ? { Cookie: cookies } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    statusCode = response.status;
    
    if (!response.ok && response.status !== 429) {
      const text = await response.text();
      error = text.substring(0, 200);
    }
  } catch (e) {
    statusCode = 0;
    error = (e as Error).message;
  }
  
  const log: RequestLog = {
    endpoint,
    method,
    statusCode,
    durationMs: Date.now() - start,
    timestamp: new Date(),
    error,
  };
  
  requestLogs.push(log);
  return log;
}

// Dashboard scenario - fetch BOQs list
async function dashboardScenario(baseUrl: string, companyId: string, cookies: string) {
  await makeRequest(baseUrl, '/api/boqs', 'GET', undefined, cookies);
  await makeRequest(baseUrl, '/api/customers', 'GET', undefined, cookies);
  await makeRequest(baseUrl, '/api/billing/status', 'GET', undefined, cookies);
}

// Autosave scenario - rapid item updates
async function autosaveScenario(
  baseUrl: string,
  itemIds: string[],
  cookies: string
) {
  if (itemIds.length === 0) return;
  
  const itemId = itemIds[Math.floor(Math.random() * itemIds.length)];
  const updates = [
    { quantity: Math.floor(Math.random() * 100) + 1 },
    { unitCost: Math.floor(Math.random() * 10000) + 100 },
    { description: `Updated at ${Date.now()}` },
  ];
  
  const update = updates[Math.floor(Math.random() * updates.length)];
  await makeRequest(baseUrl, `/api/items/${itemId}`, 'PUT', update, cookies);
}

// PDF export scenario
async function pdfExportScenario(
  baseUrl: string,
  boqIds: string[],
  cookies: string
) {
  if (boqIds.length === 0) return;
  
  const boqId = boqIds[Math.floor(Math.random() * boqIds.length)];
  await makeRequest(baseUrl, `/api/boqs/${boqId}/pdf/async`, 'POST', {}, cookies);
}

// Calculate percentile
function percentile(arr: number[], p: number): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)] || 0;
}

// Generate report
function generateReport(scenario: string, durationSecs: number): TestResult {
  const responseTimes = requestLogs.map(r => r.durationMs);
  const successful = requestLogs.filter(r => r.statusCode >= 200 && r.statusCode < 400);
  const failed = requestLogs.filter(r => r.statusCode >= 400 || r.statusCode === 0);
  const rateLimited = requestLogs.filter(r => r.statusCode === 429);
  
  return {
    scenario,
    totalRequests: requestLogs.length,
    successfulRequests: successful.length,
    failedRequests: failed.length,
    avgResponseTime: Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length || 0),
    p50ResponseTime: percentile(responseTimes, 50),
    p95ResponseTime: percentile(responseTimes, 95),
    p99ResponseTime: percentile(responseTimes, 99),
    maxResponseTime: Math.max(...responseTimes, 0),
    requestsPerSecond: Math.round((requestLogs.length / durationSecs) * 100) / 100,
    errorRate: Math.round((failed.length / requestLogs.length) * 10000) / 100,
    rateLimitedRequests: rateLimited.length,
  };
}

// Print results
function printResults(result: TestResult) {
  console.log('\n' + '='.repeat(60));
  console.log('LOAD TEST RESULTS');
  console.log('='.repeat(60));
  console.log(`Scenario:              ${result.scenario}`);
  console.log(`Total Requests:        ${result.totalRequests}`);
  console.log(`Successful:            ${result.successfulRequests}`);
  console.log(`Failed:                ${result.failedRequests}`);
  console.log(`Rate Limited (429):    ${result.rateLimitedRequests}`);
  console.log('-'.repeat(60));
  console.log(`Avg Response Time:     ${result.avgResponseTime}ms`);
  console.log(`P50 Response Time:     ${result.p50ResponseTime}ms`);
  console.log(`P95 Response Time:     ${result.p95ResponseTime}ms`);
  console.log(`P99 Response Time:     ${result.p99ResponseTime}ms`);
  console.log(`Max Response Time:     ${result.maxResponseTime}ms`);
  console.log('-'.repeat(60));
  console.log(`Requests/Second:       ${result.requestsPerSecond}`);
  console.log(`Error Rate:            ${result.errorRate}%`);
  console.log('='.repeat(60));
  
  // Endpoint breakdown
  const byEndpoint = new Map<string, RequestLog[]>();
  for (const log of requestLogs) {
    const key = `${log.method} ${log.endpoint.replace(/\/[a-f0-9-]{36}/g, '/:id')}`;
    if (!byEndpoint.has(key)) byEndpoint.set(key, []);
    byEndpoint.get(key)!.push(log);
  }
  
  console.log('\nEndpoint Breakdown:');
  console.log('-'.repeat(60));
  
  for (const [endpoint, logs] of byEndpoint.entries()) {
    const times = logs.map(l => l.durationMs);
    const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    const errors = logs.filter(l => l.statusCode >= 400 || l.statusCode === 0).length;
    console.log(`${endpoint}`);
    console.log(`  Count: ${logs.length}, Avg: ${avg}ms, Errors: ${errors}`);
  }
}

// Main load test runner
async function runLoadTest() {
  const config = parseArgs();
  
  console.log('\n🚀 MakeEstimate Load Test');
  console.log('='.repeat(60));
  console.log(`Scenario:     ${config.scenario}`);
  console.log(`Users:        ${config.users}`);
  console.log(`Duration:     ${config.duration}s`);
  console.log(`Ramp-up:      ${config.rampUp}s`);
  console.log(`Base URL:     ${config.baseUrl}`);
  console.log('='.repeat(60));
  
  // Get test data
  console.log('\n📊 Loading test data...');
  const credentials = await getTestCredentials();
  console.log(`  Found ${credentials.length} test users`);
  
  // Get BOQs and items for testing
  const testData: Array<{
    credential: typeof credentials[0];
    boqIds: string[];
    itemIds: string[];
  }> = [];
  
  for (const cred of credentials) {
    if (!cred.companyId) continue;
    const boqs = await getTestBoqs(cred.companyId);
    const boqIds = boqs.map(b => b.id);
    const itemIds = boqs.flatMap(b => b.categories.flatMap(c => c.items.map(i => i.id)));
    testData.push({ credential: cred, boqIds, itemIds });
  }
  
  console.log(`  Loaded ${testData.length} companies with test data`);
  
  if (testData.length === 0) {
    console.error('❌ No test data available. Create some BOQs first.');
    process.exit(1);
  }
  
  // Note: This is a simplified test that doesn't use real auth sessions
  // In production testing, you'd need to obtain real session cookies
  console.log('\n⚠️  Note: Running without real auth (API will return 401 for protected routes)');
  console.log('   For full testing, implement session cookie acquisition.\n');
  
  // Start load test
  console.log('🔄 Starting load test...');
  const startTime = Date.now();
  const endTime = startTime + (config.duration * 1000);
  
  let activeUsers = 0;
  const userInterval = config.rampUp > 0 ? (config.rampUp * 1000) / config.users : 0;
  
  // Spawn virtual users
  const userPromises: Promise<void>[] = [];
  
  for (let i = 0; i < config.users; i++) {
    const delay = i * userInterval;
    const testDataEntry = testData[i % testData.length];
    
    const userTask = new Promise<void>((resolve) => {
      setTimeout(async () => {
        activeUsers++;
        process.stdout.write(`\r  Active users: ${activeUsers}/${config.users}`);
        
        while (Date.now() < endTime) {
          try {
            switch (config.scenario) {
              case 'dashboard':
                await dashboardScenario(config.baseUrl, testDataEntry.credential.companyId!, '');
                break;
              case 'autosave':
                await autosaveScenario(config.baseUrl, testDataEntry.itemIds, '');
                break;
              case 'pdf-export':
                await pdfExportScenario(config.baseUrl, testDataEntry.boqIds, '');
                break;
              case 'mixed':
              default:
                const rand = Math.random();
                if (rand < 0.5) {
                  await autosaveScenario(config.baseUrl, testDataEntry.itemIds, '');
                } else if (rand < 0.8) {
                  await dashboardScenario(config.baseUrl, testDataEntry.credential.companyId!, '');
                } else {
                  await pdfExportScenario(config.baseUrl, testDataEntry.boqIds, '');
                }
                break;
            }
          } catch (e) {
            // Continue on error
          }
          
          // Small delay between requests
          await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
        }
        
        activeUsers--;
        resolve();
      }, delay);
    });
    
    userPromises.push(userTask);
  }
  
  await Promise.all(userPromises);
  
  const actualDuration = (Date.now() - startTime) / 1000;
  console.log('\n\n✅ Load test complete!');
  
  // Generate and print report
  const result = generateReport(config.scenario, actualDuration);
  printResults(result);
  
  // Cleanup
  await prisma.$disconnect();
}

// Run
runLoadTest().catch(console.error);
