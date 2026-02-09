'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { isPixelEnabled, getPixelId, metaTrackPageView } from '@/lib/meta-pixel';

/**
 * MetaPixelProvider
 * 
 * Loads the Meta (Facebook) Pixel script and handles:
 * - Initial pixel initialization
 * - PageView tracking on initial load
 * - PageView tracking on SPA route changes
 * 
 * Place this component in the root layout.
 * 
 * Environment Variables:
 * - NEXT_PUBLIC_META_PIXEL_ID: Your Meta Pixel ID
 * - NEXT_PUBLIC_ENABLE_META_PIXEL: 'true' to enable
 */
export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);
  const lastTrackedPath = useRef<string | null>(null);

  const pixelId = getPixelId();
  const enabled = isPixelEnabled();

  // Track page views on route changes (SPA navigation)
  useEffect(() => {
    if (!enabled || !pixelId) return;
    if (typeof window === 'undefined') return;
    if (typeof window.fbq !== 'function') return;

    // Build current path including search params
    const currentPath = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // Prevent duplicate tracking on initial render
    // The initial PageView is fired by the script's onLoad
    if (!isInitialized.current) {
      isInitialized.current = true;
      lastTrackedPath.current = currentPath;
      return;
    }

    // Only track if path actually changed
    if (currentPath !== lastTrackedPath.current) {
      lastTrackedPath.current = currentPath;
      metaTrackPageView();
    }
  }, [pathname, searchParams, enabled, pixelId]);

  // Don't render script if disabled
  if (!enabled || !pixelId) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Meta Pixel base code */}
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
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* Meta Pixel noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      {children}
    </>
  );
}

export default MetaPixelProvider;
