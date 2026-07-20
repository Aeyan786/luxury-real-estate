import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// TEMP: only the landing page is being showcased right now — every
// internal link/button resolves back to "/" instead of its real
// destination. Real hrefs stay in lib/constants.js and component code
// untouched, so flipping LANDING_ONLY_MODE back to false re-enables full
// site navigation with no further changes needed.
export const LANDING_ONLY_MODE = true;

export function resolveHref(href) {
  if (!href) return href;
  if (!LANDING_ONLY_MODE) return href;
  // Same-page anchors on the homepage, external links, and contact
  // protocols stay live — only cross-page app routes get suppressed.
  if (href === "/" || href.startsWith("/#") || href.startsWith("#")) return href;
  if (/^(https?:|mailto:|tel:)/.test(href)) return href;
  return "/";
}
