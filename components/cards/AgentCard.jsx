"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { cardHover, imageZoom } from "@/lib/animations";
import { resolveHref } from "@/lib/utils";

export function AgentCard({ agent }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="card-surface overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.div variants={imageZoom} className="h-full w-full">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
      <div className="flex flex-col gap-2 p-6">
        <p className="text-xs uppercase tracking-kicker text-brand-secondary">
          {agent.specialty}
        </p>
        <h3 className="font-display text-lg text-ink">{agent.name}</h3>
        <p className="text-sm text-ink-muted">{agent.location}</p>
        <div className="mt-2 flex flex-col gap-1.5 border-t border-line pt-4 text-sm text-ink-muted">
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center gap-2 transition-colors duration-200 ease-standard hover:text-brand-primary"
          >
            <Mail className="size-3.5" strokeWidth={1.5} />
            {agent.email}
          </a>
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center gap-2 transition-colors duration-200 ease-standard hover:text-brand-primary"
          >
            <Phone className="size-3.5" strokeWidth={1.5} />
            {agent.phone}
          </a>
        </div>
        <a
          href={resolveHref(`/agents/${agent.id}`)}
          className="btn-label mt-3 text-[12px] text-brand-primary underline-offset-4 hover:underline"
        >
          View agent details
        </a>
      </div>
    </motion.div>
  );
}
