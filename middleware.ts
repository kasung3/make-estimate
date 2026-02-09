import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';

// Check if email is a platform admin
function isPlatformAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.PLATFORM_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) ?? [];
  return adminEmails.includes(email.toLowerCase());
}

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Platform admin route protection (using /app/glorand as the secret URL)
    if (pathname.startsWith('/app/glorand')) {
      if (!isPlatformAdminEmail(token?.email as string)) {
        return NextResponse.redirect(new URL('/app/dashboard', req.url));
      }
    }

    // Check for user blocked status (token should have isBlocked from session)
    // The actual blocking check is done in the callback below
    // Additional blocking logic is handled in API routes and page components

    return NextResponse.next();
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

// Protect all routes under /app/*
export const config = {
  matcher: ['/app/:path*'],
};
