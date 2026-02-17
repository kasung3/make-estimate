/**
 * Input Sanitization & Bot Detection Utilities
 * 
 * Provides server-side sanitization for all user inputs
 * and bot detection heuristics for API routes.
 */

// Strip HTML tags, script content, and dangerous patterns
export function stripHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    // Remove script/style blocks entirely
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Remove all HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode common HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#039;/g, "'")
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove control characters (except newlines and tabs for notes)
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

// Sanitize a general text field (single line, no HTML)
export function sanitizeText(input: unknown, maxLength: number = 500): string {
  if (input === null || input === undefined) return '';
  if (typeof input !== 'string') return String(input).slice(0, maxLength);
  return stripHtml(input).trim().slice(0, maxLength);
}

// Sanitize a multi-line text field (for notes, descriptions)
export function sanitizeMultilineText(input: unknown, maxLength: number = 5000): string {
  if (input === null || input === undefined) return '';
  if (typeof input !== 'string') return String(input).slice(0, maxLength);
  return input
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\0/g, '')
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

// Sanitize numeric inputs - ensures it's a valid finite number
export function sanitizeNumber(input: unknown, defaultVal: number = 0, min?: number, max?: number): number {
  if (input === null || input === undefined) return defaultVal;
  const num = Number(input);
  if (!Number.isFinite(num)) return defaultVal;
  let result = num;
  if (min !== undefined && result < min) result = min;
  if (max !== undefined && result > max) result = max;
  return result;
}

// Validate UUID format (Prisma default cuid/uuid)
export function isValidId(id: unknown): boolean {
  if (!id || typeof id !== 'string') return false;
  // Allow cuid (25 chars, alphanumeric starting with 'c') and uuid formats
  return /^[a-zA-Z0-9_-]{10,50}$/.test(id);
}

// Detect common bot patterns from request headers
export function detectBot(request: Request): { isBot: boolean; reason: string } {
  const userAgent = request.headers.get('user-agent') || '';
  const contentType = request.headers.get('content-type') || '';
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';

  // No user agent at all - highly suspicious for browser-based app
  if (!userAgent || userAgent.length < 5) {
    return { isBot: true, reason: 'missing_ua' };
  }

  // Known bot user agents
  const botPatterns = [
    /bot\b/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /httpie/i, /postman/i,
    /python-requests/i, /python-urllib/i, /java\//i,
    /go-http-client/i, /node-fetch/i, /axios/i,
    /libwww/i, /mechanize/i, /scrapy/i, /phantomjs/i,
    /headlesschrome/i, /puppeteer/i,
  ];

  for (const pattern of botPatterns) {
    if (pattern.test(userAgent)) {
      return { isBot: true, reason: `bot_ua:${userAgent.slice(0, 50)}` };
    }
  }

  // POST requests to our API should have proper content-type
  if (request.method === 'POST' || request.method === 'PUT') {
    if (!contentType.includes('application/json')) {
      return { isBot: true, reason: 'wrong_content_type' };
    }
  }

  return { isBot: false, reason: '' };
}

// Validate that the request comes from our own application
export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  
  // In development, allow localhost
  const allowedOrigins = [
    'https://makeestimate.com',
    'https://www.makeestimate.com',
    'http://localhost:3000',
    'http://localhost',
  ];

  // Check origin header first
  if (origin) {
    return allowedOrigins.some(allowed => origin.startsWith(allowed));
  }

  // Fall back to referer
  if (referer) {
    return allowedOrigins.some(allowed => referer.startsWith(allowed));
  }

  // Same-origin requests (no origin/referer) from server components are OK
  // But API calls from external sources should have origin
  return true; // Allow server-side calls without origin
}

/**
 * Combined bot protection check for API routes.
 * Returns null if OK, or a Response object if blocked.
 */
export function botProtection(request: Request): Response | null {
  // Skip bot protection in test mode
  if (process.env.__NEXT_TEST_MODE === '1') {
    return null;
  }

  // Check bot patterns
  const botCheck = detectBot(request);
  if (botCheck.isBot) {
    console.warn(`[BOT_BLOCKED] Reason: ${botCheck.reason}, IP: ${request.headers.get('x-forwarded-for') || 'unknown'}`);
    return new Response(
      JSON.stringify({ error: 'Request blocked' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Check origin
  if (!validateOrigin(request)) {
    console.warn(`[ORIGIN_BLOCKED] Origin: ${request.headers.get('origin')}, Referer: ${request.headers.get('referer')}`);
    return new Response(
      JSON.stringify({ error: 'Invalid origin' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return null;
}
