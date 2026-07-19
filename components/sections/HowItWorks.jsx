"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useStickySection } from "@/hooks/useStickySection";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { HOW_IT_WORKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Scroll-linked "process" section: pins in view while the large image
// crossfades per numbered step as the user scrolls, mirroring the
// Process section pattern from the design guide (Section 6 / Section 10).
export function HowItWorks() {
  const { ref, activeStep } = useStickySection(HOW_IT_WORKS.length);
  const active = HOW_IT_WORKS[activeStep];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative bg-ink"
      style={{ height: `${HOW_IT_WORKS.length * 100}vh` }}
    >
      <div className="sticky top-20 flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-16">
        <Container className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              kicker="How It Works"
              title="From sign-up to your first qualified lead"
              className="[&_p]:text-on-dark/70 [&_h2]:text-on-dark"
            />

            <div className="mt-10 flex flex-col">
              {HOW_IT_WORKS.map((step, index) => (
                <div
                  key={step.step}
                  className={cn(
                    "flex items-start gap-5 border-b border-on-dark/15 py-5 transition-opacity duration-350 ease-standard",
                    index === activeStep ? "opacity-100" : "opacity-40"
                  )}
                >
                  <span className="font-display text-2xl text-brand-secondary">
                    {step.step}
                  </span>
                  <div>
                    <p className="font-display text-xl text-on-dark">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-on-dark/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.step}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </section>
  );
}
