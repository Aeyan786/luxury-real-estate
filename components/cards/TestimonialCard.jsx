"use client";

import Image from "next/image";
import { Play, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestimonialCard({ testimonial }) {
  const { kind, quote, name, role, location, image } = testimonial;

  return (
    <div
      className={cn(
        "card-surface flex w-[300px] shrink-0 flex-col justify-between gap-6 p-6 md:w-[340px]",
        kind === "photo" && "p-0"
      )}
    >
      {kind === "photo" && (
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card">
          <Image src={image} alt={name} fill sizes="340px" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-5 pt-12">
            <p className="font-display text-base text-on-dark">{name}</p>
            <p className="text-xs uppercase tracking-kicker text-on-dark/80">
              {role} · {location}
            </p>
          </div>
        </div>
      )}

      {kind === "quote" && (
        <>
          <Quote className="size-6 text-brand-secondary" strokeWidth={1.5} />
          <p className="font-display text-lg leading-snug text-ink">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="flex items-center gap-3 border-t border-line pt-4">
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
              <Image src={image} alt={name} fill sizes="40px" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{name}</p>
              <p className="text-xs text-ink-muted">
                {role} · {location}
              </p>
            </div>
          </div>
        </>
      )}

      {kind === "video" && (
        <>
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image src={image} alt={name} fill sizes="340px" className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/30">
              <span className="flex size-12 items-center justify-center rounded-full bg-on-dark/90 text-brand-primary">
                <Play className="size-5 translate-x-0.5" fill="currentColor" strokeWidth={0} />
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">{quote}</p>
          <div className="flex items-center gap-3 border-t border-line pt-4">
            <div>
              <p className="text-sm font-semibold text-ink">{name}</p>
              <p className="text-xs text-ink-muted">
                {role} · {location}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
