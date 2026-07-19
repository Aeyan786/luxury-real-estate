"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_GROUPS } from "@/lib/constants";

export function FaqAccordion({ className }) {
  return (
    <div className={className}>
      {FAQ_GROUPS.map((group) => (
        <div key={group.category} className="mb-8 last:mb-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-kicker text-brand-primary">
            {group.category}
          </p>
          <Accordion  className="border-t border-line">
            {group.items.map((item, index) => (
              <AccordionItem key={item.q} value={`${group.category}-${index}`}>
                <AccordionTrigger className="py-5 font-display text-base font-normal text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-ink-muted">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
