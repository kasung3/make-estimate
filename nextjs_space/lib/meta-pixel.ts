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
 * - trackPageView() for deduplicated PageView tracking
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    __me_meta_last_pv?: { href: string; ts: number };
    __me_meta_event_locks?: Record<string, number>;
  }
}

// ── Environment helpers (safe for server + client) ──────────────────────────

export function isPixelEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_META_PIXEL === 'true';
}

export function getPixelId(): string | null {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID || null;
}

// ── Internal helpers ────────────────────────────────────────────────────────

function isFbqReady(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

function safeFbq(...args: unknown[]): void {
  if (!isPixelEnabled()) return;
  if (!isFbqReady()) return;
  try {
    window.fbq!(...args);
  } catch (err) {
    console.error('[Meta Pixel] Error calling fbq:', err);
  }
}

// ── PageView with hard dedupe ───────────────────────────────────────────────

const PV_DEDUPE_WINDOW_MS = 2000;

/**
 * Track PageView with deduplication.
 * Skips if the same href was tracked within the last 2 seconds.
 * Stores last-tracked info on `window` so it survives component re-renders.
 */
export function trackPageView(): void {
  if (!isPixelEnabled()) return;
  if (typeof window === 'undefined') return;
  if (!isFbqReady()) return;

  const href = window.location.pathname + window.location.search;
  const now = Date.now();
  const last = window.__me_meta_last_pv;

  if (last && last.href === href && now - last.ts < PV_DEDUPE_WINDOW_MS) {
    return; // duplicate within window – skip
  }

  window.__me_meta_last_pv = { href, ts: now };
  safeFbq('track', 'PageView');
}

// ── Generic event dedupe (session-level, per event+key) ─────────────────────

/**
 * Returns true if this event+key combo has NOT been fired yet this session.
 * Marks it as fired. Useful for one-per-visit events like ViewContent.
 */
export function acquireEventLock(eventKey: string): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.__me_meta_event_locks) {
    window.__me_meta_event_locks = {};
  }
  if (window.__me_meta_event_locks[eventKey]) return false;
  window.__me_meta_event_locks[eventKey] = Date.now();
  return true;
}

// ── Standard + custom event tracking ────────────────────────────────────────

/**
 * Track a standard Meta Pixel event
 * @see https://developers.facebook.com/docs/meta-pixel/reference#standard-events
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

// ── Convenience helpers for common marketing events ─────────────────────────

/**
 * Track a CTA button click. Replaces Meta's noisy automatic SubscribedButtonClick.
 * @param buttonName  Human-readable label, e.g. 'StartFree_Hero'
 * @param page        Page where the click happened, e.g. 'home', 'pricing'
 * @param extra       Optional additional params
 */
export function trackButtonClick(
  buttonName: string,
  page: string,
  extra?: Record<string, unknown>
): void {
  metaTrackCustom('ButtonClick', { button_name: buttonName, page, ...extra });
}

/**
 * Track when a user registers and activates the Free plan.
 * Separate from CompleteRegistration so you can build a free-vs-paid funnel.
 */
export function trackFreePlanRegister(source: string): void {
  metaTrackCustom('FreePlanRegister', { plan_key: 'free', source });
}

/**
 * @deprecated Use trackPageView() instead – it includes deduplication.
 */
export function metaTrackPageView(): void {
  trackPageView();
}
