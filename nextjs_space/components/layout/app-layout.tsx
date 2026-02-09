'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Sidebar } from './sidebar';
import { Loader2 } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const pathname = usePathname();
  const [checkedBlocked, setCheckedBlocked] = useState(false);

  // Check blocked status on mount
  const checkBlockedStatus = useCallback(async () => {
    if (!session?.user) return;
    
    try {
      const res = await fetch('/api/billing/status');
      if (res.ok) {
        const data = await res.json();
        if (data.isBlocked) {
          router.replace(`/blocked${data.blockReason ? `?reason=${encodeURIComponent(data.blockReason)}` : ''}`);
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

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      checkBlockedStatus();
    }
  }, [status, session?.user, checkBlockedStatus]);

  if (status === 'loading' || (status === 'authenticated' && !checkedBlocked)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
