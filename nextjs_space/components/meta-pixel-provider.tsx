'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { isPixelEnabled, getPixelId, trackPageView } from '@/lib/meta-pixel';

// Evaluated once at module level (deterministic, safe for SSR)
const PIXEL_ENABLED = isPixelEnabled();
const PIXEL_ID = getPixelId();

/**
 * MetaPixelProvider
 *
 * Loads the Meta (Facebook) Pixel script and handles:
 * - Pixel initialisation via inline script: fbq('init', PIXEL_ID)
 * - PageView tracking from a SINGLE source (useEffect on route changes)
 *
 * The inline fbq snippet creates a stub that queues all calls until
 * fbevents.js finishes loading, so we can safely call fbq('track','PageView')
 * from the useEffect even before the SDK has fully loaded.
 *
 * Place this component once in the root layout.
 */
export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastHref = useRef<string | null>(null);

  // ── SINGLE source of truth for PageView tracking ──────────────────────
  // Fires on:
  //   • initial mount (first PageView)
  //   • every SPA route change
  // The fbq stub queues the call if fbevents.js hasn't loaded yet,
  // so no onLoad / scriptReady tracking is needed.
  useEffect(() => {
    if (!PIXEL_ENABLED || !PIXEL_ID) return;
    if (typeof window === 'undefined') return;
    // fbq stub is created by the inline script; check it exists
    if (typeof window.fbq !== 'function') return;

    const search = searchParams?.toString() || '';
    const currentHref = search ? `${pathname}?${search}` : (pathname || '/');

    // Skip if href hasn't changed (handles Strict Mode double-fire
    // and any re-render that doesn't change the route)
    if (currentHref === lastHref.current) return;

    lastHref.current = currentHref;
    trackPageView(); // has its own 2-second hard dedupe as safety net
  }, [pathname, searchParams]);

  return (
    <>
      {PIXEL_ENABLED && PIXEL_ID && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('set', 'autoConfig', 'false', '${PIXEL_ID}');
                fbq('init', '${PIXEL_ID}');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
      {children}
    </>
  );
}

export default MetaPixelProvider;
