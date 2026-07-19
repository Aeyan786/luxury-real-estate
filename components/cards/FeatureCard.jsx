"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp } from "@/lib/animations";

export function FeatureCard({ icon = "Sparkles", title, description }) {
  const reveal = useScrollReveal(fadeUp);
  const Icon = Icons[icon] ?? Icons.Sparkles;

  return (
    <motion.div
      {...reveal}
      className="card-surface flex h-full flex-col gap-4 p-8 transition-shadow duration-350 ease-standard hover:shadow-hover"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
        <Icon className="size-5" strokeWidth={1.5} />
      </span>
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
    </motion.div>
  );
}
