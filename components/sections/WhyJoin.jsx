"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Kicker } from "@/components/shared/Kicker";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SITE, WHY_JOIN, WHY_JOIN_OTHERS } from "@/lib/constants";

// "Other Marketplaces vs. Our Marketplace" comparison block — the direct
// equivalent of the design guide's "Why Realist" section: full-bleed
// photo background, kicker + big headline, then a muted card of pain
// points beside a branded card of differentiators.
export function WhyJoin() {
  const reveal = useScrollReveal(staggerContainer(0.1));

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/75 to-ink/90" />
      </div>

      <Container className="relative flex flex-col gap-12">
        <motion.div {...reveal} className="max-w-2xl">
          <motion.div variants={fadeUp}>
            <Kicker className="text-on-dark/60!">Why {SITE.name}</Kicker>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-4xl font-medium leading-[1.1] text-on-dark md:text-5xl"
          >
            Why we&rsquo;re not just another marketplace — we&rsquo;re your
            acquisition partner
          </motion.h2>
        </motion.div>

        <motion.div {...reveal} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            variants={fadeUp}
            className="rounded-card bg-surface/95 p-8 backdrop-blur md:p-10"
          >
            <h3 className="font-display text-xl text-ink">Other Marketplaces</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {WHY_JOIN_OTHERS.map((text) => (
                <li key={text} className="flex items-start gap-3 text-sm text-ink-muted">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink-muted">
                    <X className="size-3" strokeWidth={2.5} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-card bg-brand-primary p-8 md:p-10"
          >
            <h3 className="font-display text-xl text-on-dark">
              Our Marketplace
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {WHY_JOIN.map((feature) => (
                <li
                  key={feature.title}
                  className="flex items-start gap-3 text-sm text-on-dark/90"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-on-dark">
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  {feature.title}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
