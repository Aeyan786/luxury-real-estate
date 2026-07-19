"use client";

import { motion } from "framer-motion";
import { AssetCard } from "@/components/cards/AssetCard";
import { FilterBar } from "@/components/listings/FilterBar";
import { Container } from "@/components/shared/Container";
import { useAssetFilters } from "@/hooks/useAssetFilters";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { CATEGORIES, CATEGORY_ITEMS } from "@/lib/constants";

const ALL_ITEMS = CATEGORIES.flatMap((category) =>
  CATEGORY_ITEMS[category.slug].map((item) => ({ ...item, category: category.slug }))
);

export function ListingsBrowser() {
  const { filters, setFilter, resetFilters } = useAssetFilters({
    category: "all",
    type: "all",
    q: "",
  });
  const gridReveal = useScrollReveal(staggerContainer(0.06));

  const results = ALL_ITEMS.filter((item) => {
    if (filters.category && filters.category !== "all" && item.category !== filters.category) {
      return false;
    }
    if (filters.type && filters.type !== "all" && item.status !== filters.type) {
      return false;
    }
    if (filters.q) {
      const haystack = `${item.title} ${item.type} ${item.location}`.toLowerCase();
      if (!haystack.includes(filters.q.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-10">
        <FilterBar filters={filters} setFilter={setFilter} resetFilters={resetFilters} />

        <p className="text-sm text-ink-muted">
          {results.length} {results.length === 1 ? "listing" : "listings"} found
        </p>

        {results.length > 0 ? (
          <motion.div
            key={`${filters.category}-${filters.type}-${filters.q}`}
            {...gridReveal}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {results.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <AssetCard item={item} href={`/listings/${item.id}`} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="card-surface flex flex-col items-center gap-2 p-16 text-center">
            <p className="font-display text-xl text-ink">No listings match your filters</p>
            <p className="text-sm text-ink-muted">
              Try a different category or reset your filters.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
