"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function MembershipCard({ membership }) {
  const reveal = useScrollReveal(fadeUp);
  const { title, price, billing, benefits, cta, href, featured } = membership;

  return (
    <motion.div
      {...reveal}
      className={cn(
        "flex h-full flex-col gap-8 rounded-card border p-8 md:p-10",
        featured
          ? "border-brand-primary bg-brand-primary text-on-dark shadow-hover"
          : "border-line bg-surface text-ink"
      )}
    >
      <div>
        {featured && (
          <span className="btn-label mb-4 inline-flex items-center rounded-pill bg-on-dark/15 px-3 py-1 text-[11px] text-on-dark">
            Most Popular
          </span>
        )}
        <h3 className="font-display text-2xl">{title}</h3>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-4xl">{price}</span>
        </div>
        <p
          className={cn(
            "mt-1 text-xs uppercase tracking-kicker",
            featured ? "text-on-dark/70" : "text-ink-muted"
          )}
        >
          {billing}
        </p>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm">
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                featured ? "text-on-dark" : "text-brand-primary"
              )}
              strokeWidth={2}
            />
            <span className={featured ? "text-on-dark/90" : "text-ink-muted"}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      <Button
        href={href}
        variant={featured ? "outline" : "primary"}
        size="lg"
        className="w-full"
      >
        {cta}
      </Button>
    </motion.div>
  );
}
