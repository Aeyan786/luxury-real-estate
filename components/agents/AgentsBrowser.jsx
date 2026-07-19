"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { AgentCard } from "@/components/cards/AgentCard";
import { Container } from "@/components/shared/Container";
import { Input } from "@/components/ui/input";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { AGENTS } from "@/lib/constants";

export function AgentsBrowser() {
  const [query, setQuery] = useState("");
  const gridReveal = useScrollReveal(staggerContainer(0.06));

  const results = AGENTS.filter((agent) => {
    if (!query) return true;
    const haystack = `${agent.name} ${agent.specialty} ${agent.location}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-10">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
            strokeWidth={1.75}
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents by name, specialty, or location"
            className="h-12 rounded-pill border-line bg-canvas pl-11 pr-5"
          />
        </div>

        <p className="text-sm text-ink-muted">
          {results.length} {results.length === 1 ? "agent" : "agents"} found
        </p>

        <motion.div
          key={query}
          {...gridReveal}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {results.map((agent) => (
            <motion.div key={agent.id} variants={fadeUp}>
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
