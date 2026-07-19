"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useMarquee } from "@/hooks/useMarquee";
import { TESTIMONIALS } from "@/lib/constants";

const CARD_STEP = 340 + 24; // card width + gap

export function Testimonials() {
  const trackRef = useRef(null);
  const { paused, reducedMotion, handlers, togglePaused } = useMarquee();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: CARD_STEP, behavior: "smooth" });
      }
    }, 3800);
    return () => clearInterval(id);
  }, [paused]);

  function scrollByCard(direction) {
    trackRef.current?.scrollBy({ left: direction * CARD_STEP, behavior: "smooth" });
  }

  return (
    <section className="py-24 md:py-36">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          kicker="Reviews"
          title="Trusted by agents, partners, and investors worldwide"
          description="Real relationships across luxury real estate, aviation, automotive, marine, and horology."
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePaused}
                aria-label={paused ? "Play testimonials" : "Pause testimonials"}
                className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 ease-standard hover:border-brand-primary hover:text-brand-primary"
              >
                {paused ? (
                  <Play className="size-4" strokeWidth={1.75} />
                ) : (
                  <Pause className="size-4" strokeWidth={1.75} />
                )}
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous testimonial"
                className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 ease-standard hover:border-brand-primary hover:text-brand-primary"
              >
                <ArrowLeft className="size-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next testimonial"
                className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 ease-standard hover:border-brand-primary hover:text-brand-primary"
              >
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </button>
            </div>
          }
        />
      </Container>

      <div
        ref={trackRef}
        {...handlers}
        tabIndex={0}
        role="region"
        aria-label="Testimonials, scrollable"
        className="no-scrollbar mt-4 flex gap-6 overflow-x-auto scroll-smooth px-6 pb-2 md:px-10"
        style={{ scrollSnapType: reducedMotion ? "none" : "x proximity" }}
      >
        <div className="shrink-0 md:w-[calc((100vw-1280px)/2)]" aria-hidden="true" />
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.id} style={{ scrollSnapAlign: "start" }}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
        <div className="shrink-0 md:w-[calc((100vw-1280px)/2)]" aria-hidden="true" />
      </div>
    </section>
  );
}
