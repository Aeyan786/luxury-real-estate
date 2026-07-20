"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bath, BedDouble, Maximize, MapPin } from "lucide-react";
import { Tag } from "@/components/shared/Tag";
import { resolveHref } from "@/lib/utils";
import CustomCursor from "./CustomCursor";

// The single card design reused across every asset category (properties,
// jets, cars, yachts, watches). Only items that actually carry bed/bath/
// sq-ft data (typical single-residence homes) show that stats row —
// everything else (private islands, jets, cars, yachts, watches) shows
// its own category-appropriate spec line (item.meta, e.g. "986 hp ·
// 0–60 in 2.5s" for a car) instead.
export function AssetCard({ item, href }) {
  const [hovered, setHovered] = useState(false);
  const hasHomeStats =
    item.beds !== undefined && item.baths !== undefined && item.sqft !== undefined;

  return (
    <>
      <CustomCursor visible={hovered} />

      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex h-full flex-col overflow-hidden"
      >
        <Link
          href={resolveHref(href ?? `/listings/${item.id}`)}
          className="flex h-full flex-col cursor-none"
        >
          <div className="relative aspect-[5/3] w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="rounded-md! object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute right-6 top-6">
              <Tag className="rounded-full bg-[#DCEBDC] px-3.5 py-[7px] text-[11px]! font-semibold uppercase tracking-[0.04em] text-[#1E4620] shadow-sm">
                {item.status}
              </Tag>
            </div>
          </div>

          <div className="mt-6 flex flex-1 flex-col gap-4">
            <p className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.02em] text-[#1C1C1C]">
              <MapPin className="size-4 shrink-0" strokeWidth={2} />
              {item.location}
            </p>

            <div className="flex items-center justify-between gap-4">
              {hasHomeStats ? (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-medium text-[#6B7280]">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="size-4" strokeWidth={1.5} />
                    {item.beds}
                  </span>
                  <span className="text-[#C9C5B8]">•</span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="size-4" strokeWidth={1.5} />
                    {item.baths}
                  </span>
                  <span className="text-[#C9C5B8]">•</span>
                  <span className="flex items-center gap-1.5">
                    <Maximize className="size-4" strokeWidth={1.5} />
                    {item.sqft?.toLocaleString()} SQ FT
                  </span>
                </div>
              ) : (
                <p className="text-[15px] font-medium text-[#6B7280]">{item.meta}</p>
              )}
              <span className="whitespace-nowrap text-[27px] font-bold text-[#1C1C1C]">
                {item.price}
              </span>
            </div>

            <div className="border-t border-[#E4E0D6] pt-4">
              <p className="text-[20px] leading-[1.4] text-[#3A3A3A]">
                {item.title}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
