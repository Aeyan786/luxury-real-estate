"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AtSign,
  Camera,
  Globe2,
  Pin,
  PlayCircle,
  Users,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

// lucide-react no longer ships brand/logo icons; generic glyphs stand in
// for each platform while staying visually consistent with the icon set.
const SOCIAL_ICONS = {
  Instagram: Camera,
  LinkedIn: Users,
  X: AtSign,
  YouTube: PlayCircle,
  Facebook: Globe2,
  Pinterest: Pin,
};

export default function Footer() {
  const reveal = useScrollReveal(staggerContainer(0.06));

  return (
    <footer className="border-t border-line bg-canvas-alt">
      <motion.div {...reveal} className="section-shell flex flex-col gap-16 py-16 md:py-24">
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-6 border-b border-line pb-12 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="kicker">Newsletter</p>
            <h3 className="mt-3 font-display text-2xl text-ink md:text-3xl">
              Get Fresh Updates
            </h3>
            <p className="mt-2 max-w-md text-sm text-ink-muted">
              New listings, market insight, and partner news — delivered
              monthly, never more.
            </p>
          </div>
          <form
            className="flex w-full max-w-md items-center gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              required
              placeholder="Your email address"
              className="h-12 rounded-pill border-line bg-surface px-5"
            />
            <Button type="submit" variant="primary" size="sm" className="shrink-0">
              Subscribe
            </Button>
          </form>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5"
        >
          {Object.entries(FOOTER_LINKS).map(([column, links]) => (
            <div key={column} className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-kicker text-ink">
                {column}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors duration-200 ease-standard hover:text-brand-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-col gap-2">
            <span className="font-display text-xl text-ink">{SITE.name}</span>
            <p className="text-xs text-ink-muted">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.label] ?? Globe2;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-200 ease-standard hover:border-brand-primary hover:text-brand-primary"
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                </a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
