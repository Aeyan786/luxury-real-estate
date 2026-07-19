"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Kicker } from "@/components/shared/Kicker";
import { fadeUp, staggerContainer } from "@/lib/animations";

// Compact page-level header used on every internal page (Listings,
// Partners, Agents, About, Contact, Blogs, CRM). Keeps the kicker ->
// headline -> body rhythm consistent even off the homepage.
export function PageHero({ kicker, title, description, children }) {
  return (
    <section className="border-b border-line bg-canvas-alt py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.08)}
          className="max-w-3xl"
        >
          {kicker && (
            <motion.div variants={fadeUp}>
              <Kicker>{kicker}</Kicker>
            </motion.div>
          )}
          <motion.h1
            variants={fadeUp}
            className="mt-3 font-display text-4xl leading-[1.1] font-medium md:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted"
            >
              {description}
            </motion.p>
          )}
          {children && <motion.div variants={fadeUp}>{children}</motion.div>}
        </motion.div>
      </Container>
    </section>
  );
}
