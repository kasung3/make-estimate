'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ClipboardList,
  Layers,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  UserCog,
  Shield,
  BarChart3,
  Building2,
  Ticket,
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Primary nav items (shown in bottom bar)
const primaryNav = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'BOQs', href: '/app/boqs', icon: ClipboardList },
  { name: 'Templates', href: '/app/templates', icon: Layers },
  { name: 'Customers', href: '/app/customers', icon: Users },
];

// Secondary nav items (shown in "More" drawer)
const secondaryNav = [
  { name: 'Team', href: '/app/team', icon: UserCog },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession() || {};
  const [showMore, setShowMore] = useState(false);
  const [isPlatformAdmin, setIsPlatformAdmin] = useState(false);

  useEffect(() => {
    fetch('/api/admin/check')
      .then(res => res.json())
      .then(data => setIsPlatformAdmin(data.isAdmin))
      .catch(() => setIsPlatformAdmin(false));
  }, [session?.user?.email]);

  // Close more menu on route change
  useEffect(() => {
    setShowMore(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');
  const isOnAdminPage = pathname?.startsWith('/app/glorand');

  // Don't show on admin pages
  if (isOnAdminPage) return null;

  return (
    <>
      {/* More drawer overlay */}
      {showMore && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setShowMore(false)}
        />
      )}

      {/* More drawer panel */}
      {showMore && (
        <div className="fixed bottom-[60px] left-0 right-0 bg-white border-t border-purple-100 rounded-t-2xl shadow-xl z-50 md:hidden animate-in slide-in-from-bottom-2 duration-200">
          <div className="p-4 space-y-1">
            {session?.user && (
              <div className="mb-3 px-3 pb-3 border-b border-purple-100/50">
                <p className="text-sm font-medium text-foreground truncate">
                  {(session.user as any)?.companyName || 'Company'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user?.email}
                </p>
              </div>
            )}
            {secondaryNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors',
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-purple-50 to-lavender-50 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            {isPlatformAdmin && (
              <Link
                href="/app/glorand"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-amber-600 hover:bg-amber-50 transition-colors"
              >
                <Shield className="h-5 w-5" />
                <span>Admin Panel</span>
              </Link>
            )}
            <button
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors w-full"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100/50 z-40 md:hidden safe-area-bottom">
        <nav className="flex items-center justify-around h-[60px] px-1">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-lg transition-colors min-w-0',
                  active
                    ? 'text-purple-600'
                    : 'text-gray-400 active:text-purple-500'
                )}
              >
                <item.icon className={cn('h-5 w-5', active && 'text-purple-600')} />
                <span className={cn(
                  'text-[10px] leading-tight truncate max-w-full',
                  active ? 'font-semibold' : 'font-medium'
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
          {/* More button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-lg transition-colors',
              showMore ? 'text-purple-600' : 'text-gray-400 active:text-purple-500'
            )}
          >
            {showMore ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className={cn(
              'text-[10px] leading-tight',
              showMore ? 'font-semibold' : 'font-medium'
            )}>
              More
            </span>
          </button>
        </nav>
      </div>
    </>
  );
}
