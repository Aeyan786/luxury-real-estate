"use client";

import { motion } from "framer-motion";
import { Kicker } from "@/components/shared/Kicker";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

// The kicker -> headline -> body pattern repeated at the top of every
// section throughout the site (Section 1 / Section 5 of the design guide).
export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  action,
  className,
}) {
  const reveal = useScrollReveal(staggerContainer(0.08));

  return (
    <motion.div
      {...reveal}
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "md:max-w-3xl")}>
        {kicker && (
          <motion.div variants={fadeUp}>
            <Kicker>{kicker}</Kicker>
          </motion.div>
        )}
        {title && (
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl leading-[1.1] font-medium md:text-[2.75rem]"
          >
            {title}
          </motion.h2>
        )}
        {description && (
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
      {action && <motion.div variants={fadeUp}>{action}</motion.div>}
    </motion.div>
  );
}
