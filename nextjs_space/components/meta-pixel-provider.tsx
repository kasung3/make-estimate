'use client';

import { useEffect, useRef, useCallback } from 'react';
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
 * - Pixel initialisation (fbq('init', ...)) – NO inline PageView
 * - PageView on initial load (once script is ready)
 * - PageView on every SPA route change (deduplicated)
 *
 * Place this component once in the root layout.
 */
export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scriptReady = useRef(false);
  const lastHref = useRef<string | null>(null);

  // Called by next/script when fbevents.js finishes loading
  const handleScriptLoad = useCallback(() => {
    scriptReady.current = true;
    // Fire the very first PageView now that fbq exists
    trackPageView();
    lastHref.current =
      (typeof window !== 'undefined'
        ? window.location.pathname + window.location.search
        : pathname) || pathname;
  }, [pathname]);

  // SPA route-change tracker – fires for every navigation AFTER initial load
  useEffect(() => {
    if (!PIXEL_ENABLED || !PIXEL_ID) return;
    if (!scriptReady.current) return; // script not loaded yet

    const search = searchParams?.toString() || '';
    const currentHref = search ? `${pathname}?${search}` : (pathname || '/');

    // Skip if href hasn't changed (handles Strict Mode double-fire)
    if (currentHref === lastHref.current) return;

    lastHref.current = currentHref;
    trackPageView();
  }, [pathname, searchParams]);

  return (
    <>
      {PIXEL_ENABLED && PIXEL_ID && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
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
