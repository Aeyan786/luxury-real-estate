"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

// Drives a scroll-linked, pinned "process" section (e.g. How It Works):
// tracks scroll progress through the target section and exposes the
// currently active step index, 0..stepCount-1.
export function useStickySection(stepCount) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(stepCount - 1, Math.max(0, Math.floor(latest * stepCount)));
    setActiveStep(index);
  });

  return { ref, activeStep, scrollYProgress };
}
