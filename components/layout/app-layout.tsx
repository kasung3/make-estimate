'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Sidebar } from './sidebar';
import { MobileBottomNav } from './mobile-bottom-nav';
import { Loader2 } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const pathname = usePathname();
  const [checkedBlocked, setCheckedBlocked] = useState(false);
  const [isPlatformAdmin, setIsPlatformAdmin] = useState<boolean | null>(null);

  // Regular user pages that admins should NOT access
  const regularUserPages = ['/app/dashboard', '/app/customers', '/app/settings', '/app/boq'];
  const isOnRegularPage = regularUserPages.some(page => pathname?.startsWith(page));
  const isOnAdminPage = pathname?.startsWith('/app/glorand');

  // Check if user is platform admin
  const checkAdminStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (res.ok) {
        const data = await res.json();
        setIsPlatformAdmin(data.isAdmin);
        return data.isAdmin;
      }
    } catch (error) {
      console.error('Failed to check admin status:', error);
    }
    setIsPlatformAdmin(false);
    return false;
  }, []);

  // Check blocked status and subscription validity on mount (only for non-admin users)
  const checkBlockedStatus = useCallback(async () => {
    if (!session?.user) return;
    
    try {
      const res = await fetch('/api/billing/status');
      if (res.ok) {
        const data = await res.json();
        
        // Check if user/company is blocked
        if (data.isBlocked) {
          router.replace(`/blocked${data.blockReason ? `?reason=${encodeURIComponent(data.blockReason)}` : ''}`);
          return;
        }

        // Check if trial grant has expired (trialEndsAt in past and was a trial)
        if (data.hasTrialGrant && data.trialEndsAt) {
          const trialEnd = new Date(data.trialEndsAt);
          if (trialEnd < new Date()) {
            router.replace('/pricing?trial=ended');
            return;
          }
        }

        // Check if payment failed (past_due or unpaid) — prompt renewal
        if (data.status === 'past_due' || data.status === 'unpaid') {
          router.replace('/pricing?payment=failed');
          return;
        }

        // Check if user has no active subscription and no active grant
        if (!data.hasActiveSubscription && !data.hasAdminGrant && !data.hasTrialGrant) {
          router.replace('/pricing?subscription=required');
          return;
        }
      }
    } catch (error) {
      console.error('Failed to check blocked status:', error);
    }
    setCheckedBlocked(true);
  }, [session?.user, router]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  // Check admin status first, then blocked status for non-admins
  useEffect(() => {
    if (status === 'authenticated' && session?.user && isPlatformAdmin === null) {
      checkAdminStatus().then((isAdmin) => {
        if (!isAdmin) {
          // Only check blocked status for non-admin users
          checkBlockedStatus();
        } else {
          setCheckedBlocked(true); // Skip blocked check for admins
        }
      });
    }
  }, [status, session?.user, isPlatformAdmin, checkAdminStatus, checkBlockedStatus]);

  // Redirect admins away from regular user pages to admin panel
  useEffect(() => {
    if (isPlatformAdmin === true && isOnRegularPage) {
      router.replace('/app/glorand');
    }
  }, [isPlatformAdmin, isOnRegularPage, router]);

  // Loading state
  if (status === 'loading' || isPlatformAdmin === null || (status === 'authenticated' && !checkedBlocked)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Don't render regular pages for admin users (they'll be redirected)
  if (isPlatformAdmin && isOnRegularPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">{children}</main>
      <MobileBottomNav />
    </div>
  );
}
