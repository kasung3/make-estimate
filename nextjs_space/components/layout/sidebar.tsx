'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Customers', href: '/app/customers', icon: Users },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
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

  return (
    <div
      className={cn(
        'h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link href="/app/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                MakeEstimate
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
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

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith?.(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all',
                isActive
                  ? 'bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive ? 'text-cyan-600' : '')} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
        {isPlatformAdmin && (
          <Link
            href="/app/glorand"
            className={cn(
              'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all',
              pathname === '/app/glorand'
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 font-medium'
                : 'text-amber-600 hover:bg-amber-50'
            )}
          >
            <Shield className={cn('h-5 w-5', pathname === '/app/glorand' ? 'text-amber-600' : '')} />
            {!collapsed && <span>Admin</span>}
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-gray-200">
        {!collapsed && session?.user && (
          <div className="mb-3 px-3">
            <p className="text-sm font-medium text-gray-900 truncate">
              {(session.user as any)?.companyName || 'Company'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {session.user?.email}
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          className={cn(
            'w-full text-gray-600 hover:text-red-600 hover:bg-red-50',
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
