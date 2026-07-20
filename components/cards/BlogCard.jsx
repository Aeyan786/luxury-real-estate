"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cardHover, imageZoom } from "@/lib/animations";
import { resolveHref } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function BlogCard({ post }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="card-surface overflow-hidden"
    >
      <a href={resolveHref(`/blogs/${post.id}`)} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div variants={imageZoom} className="h-full w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute left-4 top-4">
            <span className="btn-label rounded-pill bg-surface/90 px-3 py-1 text-[11px] text-brand-primary">
              {post.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-6">
          <p className="text-xs uppercase tracking-kicker text-ink-muted">
            {dateFormatter.format(new Date(post.date))}
          </p>
          <h3 className="font-display text-lg leading-snug text-ink">
            {post.title}
          </h3>
          <p className="text-sm text-ink-muted">By {post.author}</p>
        </div>
      </a>
    </motion.div>
  );
}
