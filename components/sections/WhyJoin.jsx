"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { WHY_JOIN } from "@/lib/constants";

export function WhyJoin() {
  const gridReveal = useScrollReveal(staggerContainer(0.08));

  return (
    <section className="py-24 md:py-36">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          kicker="Why Join Vebryx"
          title="Built for sellers who represent extraordinary assets"
          description="Every feature exists to put your listings in front of buyers who are ready to act — not to add more noise to your dashboard."
          align="center"
        />

        <motion.div
          {...gridReveal}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_JOIN.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
