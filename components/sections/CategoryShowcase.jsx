"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AssetCard } from "@/components/cards/AssetCard";
import { Button } from "@/components/shared/Button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Container } from "@/components/shared/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";

// Reusable homepage section for a single asset category. Same card,
// header, and grid rhythm every time — only `category` and `items` change.
export function CategoryShowcase({ category, items, alt = false }) {
  const gridReveal = useScrollReveal(staggerContainer(0.08));

  return (
    <section className={alt ? "bg-canvas-alt py-24 md:py-36" : "py-24 md:py-36"}>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          kicker={category.kicker}
          title={category.label}
          description={category.description}
          action={
            <Button href={category.href} variant="secondary" size="sm">
              View All
              <ArrowRight className="size-3.5" strokeWidth={2} />
            </Button>
          }
        />

        <motion.div
          {...gridReveal}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.slice(0, 4).map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <AssetCard item={item} href={`/listings/${item.id}`} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
