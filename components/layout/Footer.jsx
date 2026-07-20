"use client";

import { motion } from "framer-motion";
import { AtSign, Camera, Globe2, Pin, PlayCircle, Users } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { SmartLink } from "@/components/shared/SmartLink";
import { Input } from "@/components/ui/input";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import Image from "next/image";

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
    <footer className="border-t border-line bg-[#3F4A36]">
      <motion.div
        {...reveal}
        className="section-shell flex flex-col gap-16 py-16 md:py-24"
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-6 border-b border-[#FAF7F1]/15 pb-12 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="kicker text-[#FAF7F1]/60!">Newsletter</p>
            <h3 className="mt-3 text-2xl text-[#FAF7F1] md:text-3xl">
              Get Fresh Updates
            </h3>
            <p className="mt-2 max-w-md text-sm text-[#FAF7F1]/70">
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
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="shrink-0"
            >
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
              <p className="text-xs font-semibold uppercase tracking-kicker text-[#FAF7F1]">
                {column}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <SmartLink
                      href={link.href}
                      className="text-sm text-[#FAF7F1]/70 transition-colors duration-200 ease-standard hover:text-[#FAF7F1]"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* <motion.div
          variants={fadeUp}
          className="flex justify-center"
        >
          <div className="flex flex-col gap-2">
            <Image
              width={1200}
              height={1200}
              src="/whitelogo.png"
              alt="footer-logo"
            />
          </div>
        </motion.div> */}

        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-6 border-t border-[#FAF7F1]/15 pt-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xl text-[#FAF7F1]">{SITE.name}</span>
            <p className="text-xs text-[#FAF7F1]/60">
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
                  className="flex size-9 items-center justify-center rounded-full border border-[#FAF7F1]/25 text-[#FAF7F1] transition-colors duration-200 ease-standard hover:border-brand-secondary hover:text-brand-secondary"
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
