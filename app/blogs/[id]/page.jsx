import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { Container } from "@/components/shared/Container";
import { BLOG_POSTS } from "@/lib/constants";
import { resolveHref } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = BLOG_POSTS.find((entry) => entry.id === id);
  if (!post) return {};
  return { title: post.title, description: post.title };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const post = BLOG_POSTS.find((entry) => entry.id === id);
  if (!post) notFound();

  const more = BLOG_POSTS.filter((entry) => entry.id !== post.id).slice(0, 3);

  return (
    <article>
      <div className="relative aspect-[16/8] w-full overflow-hidden md:aspect-[16/6]">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      </div>

      <Container className="flex max-w-3xl flex-col gap-8 py-12 md:py-20">
        <Link
          href={resolveHref("/blogs")}
          className="flex w-fit items-center gap-2 text-sm font-medium text-ink-muted transition-colors duration-200 ease-standard hover:text-brand-primary"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} />
          Back to Journal
        </Link>

        <div>
          <span className="btn-label rounded-pill bg-canvas-alt px-3 py-1 text-[11px] text-brand-primary">
            {post.category}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm uppercase tracking-kicker text-ink-muted">
            {dateFormatter.format(new Date(post.date))} · By {post.author}
          </p>
        </div>

        <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink-muted">
          <p>
            The market for verified, high-value assets has changed more in the last
            two years than in the previous decade — and the buyers driving that shift
            expect the same standard of transparency they get everywhere else in
            their financial lives.
          </p>
          <p>
            That&rsquo;s the throughline across everything we cover in the Luxora
            Journal: verification, provenance, and access. Every listing on the
            platform is reviewed before it&rsquo;s published, every agent is
            identity-checked, and every category — from private islands to
            provenance-verified timepieces — is held to the same bar.
          </p>
          <p>
            Full analysis, sourcing, and interviews for this story are available to
            registered members. Reach out to your Luxora agent for the complete
            report.
          </p>
        </div>
      </Container>

      {more.length > 0 && (
        <section className="border-t border-line bg-canvas-alt py-16 md:py-24">
          <Container className="flex flex-col gap-8">
            <h2 className="font-display text-2xl text-ink">More from the Journal</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((entry) => (
                <BlogCard key={entry.id} post={entry} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
