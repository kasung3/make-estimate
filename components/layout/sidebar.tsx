'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  FileText,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Building2,
  Ticket,
  BarChart3,
  UserCog,
  ClipboardList,
  Layers,
  MessageSquarePlus,
  Rocket,
  CreditCard,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Regular user navigation
const userNavigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'BOQs', href: '/app/boqs', icon: ClipboardList },
  { name: 'Templates', href: '/app/templates', icon: Layers },
  { name: 'Customers', href: '/app/customers', icon: Users },
  { name: 'Team', href: '/app/team', icon: UserCog },
  { name: 'Settings', href: '/app/settings', icon: Settings },
  { name: 'Feedback', href: '/app/feedback', icon: MessageSquarePlus },
];

// Admin-only navigation (platform management) - separate pages
const adminNavigation = [
  { name: 'Overview', href: '/app/glorand', icon: BarChart3, tab: null },
  { name: 'Users', href: '/app/glorand?tab=users', icon: Users, tab: 'users' },
  { name: 'Companies', href: '/app/glorand?tab=companies', icon: Building2, tab: 'companies' },
  { name: 'Coupons', href: '/app/glorand?tab=coupons', icon: Ticket, tab: 'coupons' },
  { name: 'Plans', href: '/app/glorand?tab=plans', icon: CreditCard, tab: 'plans' },
  { name: 'Feedback', href: '/app/glorand?tab=feedback', icon: MessageSquarePlus, tab: 'feedback' },
  { name: 'Roadmap', href: '/app/glorand/roadmap', icon: Rocket, tab: null },
];

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession() || {};
  const [collapsed, setCollapsed] = useState(false);
  const [isPlatformAdmin, setIsPlatformAdmin] = useState(false);

  useEffect(() => {
    // Check if user is platform admin
    fetch('/api/admin/check')
      .then(res => res.json())
      .then(data => setIsPlatformAdmin(data.isAdmin))
      .catch(() => setIsPlatformAdmin(false));
  }, [session?.user?.email]);

  // Determine which navigation to show
  const isOnAdminPage = pathname?.startsWith('/app/glorand');
  const navigation = isPlatformAdmin && isOnAdminPage ? adminNavigation : userNavigation;
  
  // Get the current admin tab from query params
  const currentTab = searchParams?.get('tab');

  return (
    <div
      className={cn(
        'h-screen bg-white border-r border-purple-100/50 flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="p-4 border-b border-purple-100/50">
        <div className="flex items-center justify-between">
          <Link href={isPlatformAdmin && isOnAdminPage ? '/app/glorand' : '/app/dashboard'} className="flex items-center space-x-3">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-200',
              isPlatformAdmin && isOnAdminPage 
                ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                : 'bg-gradient-to-br from-purple-500 to-lavender-500'
            )}>
              {isPlatformAdmin && isOnAdminPage ? (
                <Shield className="w-5 h-5 text-white" />
              ) : (
                <FileText className="w-5 h-5 text-white" />
              )}
            </div>
            {!collapsed && (
              <span className={cn(
                'text-lg font-bold bg-clip-text text-transparent',
                isPlatformAdmin && isOnAdminPage
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600'
                  : 'bg-gradient-to-r from-purple-600 to-lavender-600'
              )}>
                {isPlatformAdmin && isOnAdminPage ? 'Admin Panel' : 'MakeEstimate'}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-purple-400 hover:text-purple-600 hover:bg-purple-50"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          // Determine active state based on path and query params
          let isActive = false;
          const itemWithTab = item as typeof item & { tab?: string | null };
          
          if (isOnAdminPage && isPlatformAdmin) {
            // For admin navigation, check both direct paths and tab params
            if (itemWithTab.tab === null && item.href === '/app/glorand') {
              // Overview is active when on /app/glorand with no tab or tab=dashboard
              isActive = pathname === '/app/glorand' && (!currentTab || currentTab === 'dashboard');
            } else if (itemWithTab.tab === null && item.href.includes('/glorand/')) {
              // Check direct subpages (like /glorand/roadmap)
              isActive = pathname?.startsWith(item.href.split('?')[0]) || false;
            } else if (itemWithTab.tab) {
              // For tab-based navigation
              isActive = currentTab === itemWithTab.tab;
            }
          } else {
            // Regular user navigation
            isActive = pathname === item.href || (pathname?.startsWith?.(item.href + '/') ?? false);
          }
          
          const isAdminStyle = isPlatformAdmin && isOnAdminPage;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                isActive
                  ? isAdminStyle
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 font-medium shadow-sm'
                    : 'bg-gradient-to-r from-purple-50 to-lavender-50 text-purple-700 font-medium shadow-sm'
                  : isAdminStyle
                    ? 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              )}
            >
              <item.icon className={cn(
                'h-5 w-5 transition-colors',
                isActive ? (isAdminStyle ? 'text-amber-600' : 'text-purple-500') : ''
              )} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
        
        {/* Show Admin link when non-admin user is on regular pages */}
        {isPlatformAdmin && !isOnAdminPage && (
          <Link
            href="/app/glorand"
            className={cn(
              'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200',
              'text-amber-600 hover:bg-amber-50'
            )}
          >
            <Shield className="h-5 w-5" />
            {!collapsed && <span>Admin Panel</span>}
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-purple-100/50">
        {!collapsed && session?.user && (
          <div className="mb-3 px-3">
            <p className="text-sm font-medium text-foreground truncate">
              {(session.user as any)?.companyName || 'Company'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session.user?.email}
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          className={cn(
            'w-full text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl',
            collapsed ? 'justify-center' : 'justify-start'
          )}
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </div>
  );
}
