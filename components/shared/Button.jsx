"use client";

import Link from "next/link";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/animations";

// The site's single reusable CTA button, matching Section 7 of the design
// guide: pill radius, uppercase tracked label, restrained hover lift.
const buttonVariants = cva(
  "btn-label inline-flex items-center justify-center gap-2 rounded-pill transition-colors duration-250 ease-standard disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-on-dark hover:bg-brand-primary-hover",
        secondary:
          "border border-ink/70 bg-transparent text-ink hover:border-ink hover:bg-ink/5",
        ghost: "bg-transparent text-ink hover:bg-ink/5",
        outline:
          "border border-on-dark/40 bg-transparent text-on-dark hover:border-on-dark hover:bg-on-dark/10",
        accent: "bg-brand-secondary text-on-dark hover:brightness-95",
      },
      size: {
        default: "px-7 py-3.5",
        sm: "px-5 py-2.5 text-xs",
        lg: "px-9 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export function Button({
  className,
  variant,
  size,
  href,
  as,
  children,
  ...props
}) {
  const classes = cn(buttonVariants({ variant, size, className }));

  const Comp = as || (href ? Link : "button");
  const compProps = href ? { href } : {};

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonHover}
      className="inline-block"
    >
      <Comp className={classes} {...compProps} {...props}>
        {children}
      </Comp>
    </motion.div>
  );
}

export { buttonVariants };
