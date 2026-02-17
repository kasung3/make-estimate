'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Palette, Users, MoreHorizontal, X, Settings, HelpCircle, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const primaryTabs = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/app/dashboard' },
  { label: 'BOQs', icon: FileText, href: '/app/dashboard', match: ['/app/dashboard', '/app/boq'] },
  { label: 'Templates', icon: Palette, href: '/app/templates' },
  { label: 'Customers', icon: Users, href: '/app/customers' },
];

const moreItems = [
  { label: 'Settings', icon: Settings, href: '/app/settings' },
  { label: 'Billing', icon: CreditCard, href: '/app/settings?tab=billing' },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const isActive = (tab: typeof primaryTabs[0]) => {
    if (tab.match) {
      return tab.match.some(m => pathname.startsWith(m));
    }
    return pathname.startsWith(tab.href);
  };

  return (
    <>
      {/* More drawer overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setShowMore(false)}>
          <div
            className="absolute bottom-[calc(env(safe-area-inset-bottom,0px)+64px)] left-0 right-0 bg-white rounded-t-2xl shadow-xl border-t border-purple-100 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">More</span>
              <button onClick={() => setShowMore(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-1">
              {moreItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setShowMore(false);
                  }}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-purple-100 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="flex items-center justify-around h-16">
          {primaryTabs.map((tab) => {
            const active = isActive(tab);
            return (
              <button
                key={tab.label}
                onClick={() => router.push(tab.href)}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors',
                  active ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <tab.icon className={cn('h-5 w-5', active && 'text-purple-600')} />
                <span className={cn('text-[10px] font-medium', active && 'font-semibold')}>{tab.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowMore(!showMore)}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors',
              showMore ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'
            )}
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
