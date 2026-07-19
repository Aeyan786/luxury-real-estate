"use client";

import { useEffect, useState } from "react";

// Infinite-scroll marquee helper: pauses on hover/focus and respects
// prefers-reduced-motion, per the accessibility gap called out in the
// design guide (Section 14) for auto-scrolling testimonial rails.
function getInitialReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useMarquee() {
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(getInitialReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event) => setReducedMotion(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return {
    paused: manuallyPaused || reducedMotion,
    reducedMotion,
    handlers: {
      onMouseEnter: () => setManuallyPaused(true),
      onMouseLeave: () => setManuallyPaused(false),
      onFocus: () => setManuallyPaused(true),
      onBlur: () => setManuallyPaused(false),
    },
    togglePaused: () => setManuallyPaused((p) => !p),
  };
}
