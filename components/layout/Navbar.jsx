"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { MegaMenu } from "@/components/layout/MegaMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { NAV_CTAS, NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300 ease-standard",
        scrolled
          ? "border-line bg-canvas/95 shadow-hover backdrop-blur"
          : "border-transparent bg-canvas/80 backdrop-blur"
      )}
    >
      <div className="section-shell relative flex h-20 items-center justify-between gap-6">
        <Link href="/" className="font-display text-2xl tracking-tight text-ink">
          {SITE.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            link.mega ? (
              <button
                key={link.href}
                onMouseEnter={() => setMegaOpen(true)}
                onFocus={() => setMegaOpen(true)}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium text-ink transition-colors duration-200 ease-standard hover:text-brand-primary",
                  megaOpen && "text-brand-primary"
                )}
              >
                {link.label}
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-250 ease-standard",
                    megaOpen && "rotate-180"
                  )}
                  strokeWidth={1.75}
                />
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setMegaOpen(false)}
                className="text-sm font-medium text-ink transition-colors duration-200 ease-standard hover:text-brand-primary"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {NAV_CTAS.map((cta) => (
            <Button key={cta.href} href={cta.href} variant={cta.variant} size="sm">
              {cta.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <Button
            href={NAV_CTAS[2].href}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {NAV_CTAS[2].label}
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 ease-standard hover:border-brand-primary hover:text-brand-primary"
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </button>
            <SheetContent side="right" className="flex w-full flex-col gap-0 bg-canvas p-0 sm:max-w-sm">
              <SheetHeader className="border-b border-line px-6 py-5">
                <SheetTitle className="font-display text-xl">{SITE.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
                {NAV_LINKS.map((link) => (
                  <SheetClose key={link.href} render={<Link href={link.href} />}>
                    <span className="block border-b border-line py-4 text-base font-medium text-ink">
                      {link.label}
                    </span>
                  </SheetClose>
                ))}
              </nav>
              <div className="flex flex-col gap-3 border-t border-line px-6 py-6">
                {NAV_CTAS.map((cta) => (
                  <Button key={cta.href} href={cta.href} variant={cta.variant} className="w-full">
                    {cta.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
      </div>
    </motion.header>
  );
}
