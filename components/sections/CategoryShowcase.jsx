"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AssetCard } from "@/components/cards/AssetCard";
import { Button } from "@/components/shared/Button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Container } from "@/components/shared/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";

// ─── Constants ────────────────────────────────────────────────────────────────

const PILLS = [
  { id: "all",     label: "All"     },
  { id: "cars",    label: "Cars"    },
  { id: "watches", label: "Watches" },
  { id: "jets",    label: "Jets"    },
  { id: "yachts",  label: "Yachts"  },
];

// ─── Pill ─────────────────────────────────────────────────────────────────────

function Pill({ label, active, onClick }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        // shape & spacing
        "relative isolate rounded-full px-4 py-1.5",
        // typography — matches your kicker / overline scale
        "text-[10px] font-semibold uppercase tracking-[0.18em]",
        // interaction
        "cursor-pointer transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2",
        // colour states
        active
          ? "text-[#3F4A36]! hover:text-[#3F4A36]!"
          : "text-black",
      ].join(" ")}
    >
      {/* Animated background lives behind the label so layoutId morphs smoothly */}
      {active && (
        <motion.span
          layoutId="pill-bg"
          className="absolute inset-0 rounded-full bg-gold"
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
      )}

      {/* Resting background — faint surface tint when not active */}
      {!active && (
        <span className="absolute inset-0 -z-10 rounded-full bg-surface-2 transition-colors duration-150 hover:bg-surface-3" />
      )}

      {label}
    </button>
  );
}

// ─── PillBar ──────────────────────────────────────────────────────────────────

function PillBar({ active, onChange }) {
  return (
    // Scrollable on mobile — hidden scrollbar across browsers
    <div
      role="tablist"
      aria-label="Filter by category"
      className="
        flex items-center gap-2
        overflow-x-auto
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
      "
    >
      {PILLS.map((pill) => (
        <Pill
          key={pill.id}
          label={pill.label}
          active={active === pill.id}
          onClick={() => onChange(pill.id)}
        />
      ))}
    </div>
  );
}

// ─── CategoryShowcase ─────────────────────────────────────────────────────────

export function CategoryShowcase({ category, items, alt = false }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const gridReveal = useScrollReveal(staggerContainer(0.08));

  // Filter items by pill selection; "all" shows everything
  const visibleItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <section
      className={alt ? "bg-[#F1ECE2] py-18 md:py-22" : "py-24 md:py-36"}
    >
       {alt &&
       
       <div className="flex justify-center pb-15">
         <PillBar active={activeFilter} onChange={setActiveFilter} />

       </div>
}
      <Container className="flex flex-col gap-12">

        {/* ── Header ──────────────────────────────────────────────────────── */}
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

        {/* ── Pills ───────────────────────────────────────────────────────── */}

        {/* ── Grid ────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}           // remount grid on filter change
            {...gridReveal}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2"
          >
            {visibleItems.slice(0, 4).map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <AssetCard item={item} href={`/listings/${item.id}`} />
              </motion.div>
            ))}

            {/* Empty state */}
            {visibleItems.length === 0 && (
              <motion.p
                variants={fadeUp}
                className="col-span-full py-20 text-center text-sm text-muted"
              >
                No listings in this category yet.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

      </Container>
    </section>
  );
}