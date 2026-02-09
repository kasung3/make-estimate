/**
 * Meta (Facebook) Pixel tracking utilities
 * 
 * Environment Variables:
 * - NEXT_PUBLIC_META_PIXEL_ID: Your Meta Pixel ID
 * - NEXT_PUBLIC_ENABLE_META_PIXEL: 'true' to enable, anything else to disable
 * 
 * Usage:
 * - metaTrack('EventName', { param: 'value' }) for standard events
 * - metaTrackCustom('CustomEventName', { param: 'value' }) for custom events
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// Check if pixel is enabled (safe for both server and client)
export function isPixelEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_META_PIXEL === 'true';
}

// Get pixel ID
export function getPixelId(): string | null {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID || null;
}

// Check if fbq is ready (client-only check)
function isFbqReady(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

// Safe wrapper for fbq calls - silent no-op if not ready
function safeFbq(...args: unknown[]): void {
  if (!isPixelEnabled()) return;
  if (!isFbqReady()) return; // Silent no-op, script may still be loading
  try {
    window.fbq!(...args);
  } catch (err) {
    console.error('[Meta Pixel] Error calling fbq:', err);
  }
}

/**
 * Track a standard Meta Pixel event
 * @see https://developers.facebook.com/docs/meta-pixel/reference#standard-events
 * 
 * Standard events:
 * - PageView, ViewContent, Search, AddToCart, AddToWishlist
 * - InitiateCheckout, AddPaymentInfo, Purchase, Lead
 * - CompleteRegistration, Contact, CustomizeProduct, Donate
 * - FindLocation, Schedule, StartTrial, SubmitApplication, Subscribe
 */
export function metaTrack(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (params) {
    safeFbq('track', eventName, params);
  } else {
    safeFbq('track', eventName);
  }
}

/**
 * Track a custom Meta Pixel event
 * Use for app-specific events not covered by standard events
 */
export function metaTrackCustom(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (params) {
    safeFbq('trackCustom', eventName, params);
  } else {
    safeFbq('trackCustom', eventName);
  }
}

/**
 * Track PageView - typically called on route changes
 */
export function metaTrackPageView(): void {
  safeFbq('track', 'PageView');
}
