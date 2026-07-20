"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SmartLink } from "@/components/shared/SmartLink";
import { CATEGORIES } from "@/lib/constants";
import { EASE_OUT_EXPO } from "@/lib/animations";

export function MegaMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          className="absolute inset-x-0 top-full z-40 border-b border-line bg-[#FAF7F1] shadow-hover mt-1 rounded-xl"
          onMouseLeave={onClose}
        >
          <div className="section-shell grid grid-cols-2 gap-4 py-8 md:grid-cols-5">
            {CATEGORIES.map((category) => (
              <SmartLink
                key={category.slug}
                href={category.href}
                onClick={onClose}
                className="group flex flex-col gap-3"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                  <Image
                    src={`https://picsum.photos/seed/${category.slug}-nav/600/450`}
                    alt={category.label}
                    fill
                    sizes="220px"
                    className="object-cover transition-transform duration-400 ease-standard group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-kicker text-ink-muted">
                      {category.kicker}
                    </p>
                    <p className="font-display text-base text-ink">
                      {category.label}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-brand-primary opacity-0 transition-opacity duration-200 ease-standard group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </div>
              </SmartLink>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
