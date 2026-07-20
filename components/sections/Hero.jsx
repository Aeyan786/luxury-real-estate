"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Kicker } from "@/components/shared/Kicker";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/constants";
import { EASE_OUT_EXPO, fadeUp, staggerContainer } from "@/lib/animations";
import { resolveHref } from "@/lib/utils";

const WORDS = [
  "properties.",
  "private jets.",
  "luxury cars.",
  "super yachts.",
  "fine watches.",
];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [category, setCategory] = useState(CATEGORIES[0].slug);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("category", category);
    if (query) params.set("q", query);
    router.push(resolveHref(`/listings?${params.toString()}`));
  }

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <video
          src="/aivideo(1).mp4"
          alt="Extraordinary assets curated by Luxora"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          sizes="100vw"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.12, 0.1)}
        className="section-shell relative flex min-h-[88vh] flex-col justify-center gap-10 py-32 text-on-dark md:min-h-[92vh]"
      >
        <motion.div variants={fadeUp}>
          <Kicker className=" text-white/60!">The Global Marketplace</Kicker>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="max-w-4xl text-white/90 font-display text-5xl leading-[1.05] font-medium md:text-7xl"
        >
          Buy. Sell. Discover
          <br />
          <span className="inline-flex overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[wordIndex]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="italic text-[#f9c803] pb-2"
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-xl text-lg leading-relaxed text-on-dark/80"
        >
          Luxora connects discerning buyers with verified sellers, agents, and
          partners across the world&rsquo;s most extraordinary assets — one
          curated, trustworthy marketplace.
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSearch}
          className="flex w-full max-w-2xl flex-col gap-3 rounded-card bg-surface/95 p-3 backdrop-blur md:flex-row md:items-center"
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="btn-label rounded-pill border border-line bg-canvas px-4 py-3 text-ink outline-none md:w-56"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, location, or brand"
            className="h-12 flex-1 rounded-pill border-line bg-canvas px-5 text-ink"
          />
          <Button type="submit" variant="primary" className="shrink-0">
            <Search className="size-4" strokeWidth={2} />
            Search
          </Button>
        </motion.form>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-8 pt-4">
          {[
            ["1,200+", "Verified Listings"],
            ["48", "Countries"],
            ["320+", "Agents & Partners"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-3xl text-on-dark">{stat}</p>
              <p className="text-xs uppercase tracking-kicker text-on-dark/70">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
