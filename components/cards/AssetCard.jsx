"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Tag } from "@/components/shared/Tag";
import { cardHover, imageZoom } from "@/lib/animations";

// The single card design reused across every asset category (properties,
// jets, cars, yachts, watches) per Section 6 of the design guide — only
// the data changes, never the shape.
export function AssetCard({ item, href }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="card-surface group flex h-full flex-col overflow-hidden"
    >
      <Link href={href ?? `/listings/${item.id}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div variants={imageZoom} className="h-full w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute left-4 top-4">
            <Tag>{item.status}</Tag>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg leading-snug text-ink">
              {item.title}
            </h3>
          </div>

          <p className="flex items-center gap-1.5 text-sm text-ink-muted">
            <MapPin className="size-3.5 shrink-0" strokeWidth={1.5} />
            {item.location}
          </p>

          <p className="text-xs uppercase tracking-kicker text-ink-muted">
            {item.meta}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              {item.type}
            </span>
            <span className="font-display text-base text-brand-primary">
              {item.price}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
