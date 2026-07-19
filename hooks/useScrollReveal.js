"use client";

import { fadeUp, viewportOnce } from "@/lib/animations";

// Wraps whileInView + viewport-once with the token-defined easing/duration
// from lib/animations.js. Spread the return value onto a `motion.*` element.
export function useScrollReveal(variants = fadeUp, viewport = viewportOnce) {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport,
    variants,
  };
}
