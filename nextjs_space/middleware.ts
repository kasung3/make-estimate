import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';

// Security headers applied to all responses
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://connect.facebook.net https://apps.abacus.ai",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*.supabase.co https://*.stripe.com https://www.facebook.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://api.stripe.com https://www.facebook.com https://connect.facebook.net",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.facebook.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self' https://*.abacus.ai https://*.abacusai.com",
  ].join('; '),
};

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  // Remove X-Powered-By
  response.headers.delete('X-Powered-By');
  return response;
}

// Check if email is a platform admin
function isPlatformAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.PLATFORM_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) ?? [];
  return adminEmails.includes(email.toLowerCase());
}

// Auth-protected middleware for /app/* routes
const authMiddleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Platform admin route protection
    if (pathname.startsWith('/app/glorand')) {
      if (!isPlatformAdminEmail(token?.email as string)) {
        const response = NextResponse.redirect(new URL('/app/dashboard', req.url));
        return applySecurityHeaders(response);
      }
    }

    const response = NextResponse.next();
    return applySecurityHeaders(response);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

// Main middleware: applies security headers to ALL routes,
// and auth protection to /app/* routes
export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // For /app/* routes, use auth middleware (which also applies security headers)
  if (pathname.startsWith('/app/')) {
    return (authMiddleware as any)(req);
  }

  // For all other routes, just apply security headers
  const response = NextResponse.next();
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    // Match all routes except static files and _next
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};
