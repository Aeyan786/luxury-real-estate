"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/constants";

const LISTING_TYPES = ["For Sale", "For Rent", "Charter", "Sold"];

export function FilterBar({ filters, setFilter, resetFilters }) {
  return (
    <div className="card-surface flex flex-col gap-4 p-5 md:flex-row md:flex-wrap md:items-center">
      <select
        value={filters.category ?? "all"}
        onChange={(e) => setFilter("category", e.target.value)}
        className="btn-label rounded-pill border border-line bg-canvas px-4 py-3 text-ink outline-none md:w-56"
        aria-label="Category"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        value={filters.type ?? "all"}
        onChange={(e) => setFilter("type", e.target.value)}
        className="btn-label rounded-pill border border-line bg-canvas px-4 py-3 text-ink outline-none md:w-48"
        aria-label="Listing type"
      >
        <option value="all">Listing Type</option>
        {LISTING_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div className="relative flex-1 md:min-w-[220px]">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
          strokeWidth={1.75}
        />
        <Input
          value={filters.q ?? ""}
          onChange={(e) => setFilter("q", e.target.value)}
          placeholder="Search by name, location, or brand"
          className="h-12 rounded-pill border-line bg-canvas pl-11 pr-5"
        />
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="secondary" size="sm" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
