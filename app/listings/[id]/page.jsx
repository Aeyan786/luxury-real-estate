import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { AssetCard } from "@/components/cards/AssetCard";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/shared/ContactForm";
import { Tag } from "@/components/shared/Tag";
import { CATEGORIES, CATEGORY_ITEMS } from "@/lib/constants";

const ALL_ITEMS = CATEGORIES.flatMap((category) =>
  CATEGORY_ITEMS[category.slug].map((item) => ({ ...item, category: category.slug }))
);

export function generateStaticParams() {
  return ALL_ITEMS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = ALL_ITEMS.find((entry) => entry.id === id);
  if (!item) return {};
  return {
    title: item.title,
    description: `${item.title} — ${item.type} in ${item.location}, listed at ${item.price}.`,
  };
}

export default async function ListingDetailPage({ params }) {
  const { id } = await params;
  const item = ALL_ITEMS.find((entry) => entry.id === id);
  if (!item) notFound();

  const category = CATEGORIES.find((c) => c.slug === item.category);
  const related = CATEGORY_ITEMS[item.category]
    .filter((entry) => entry.id !== item.id)
    .slice(0, 3);

  return (
    <>
      <section className="relative">
        <div className="relative aspect-[16/8] w-full overflow-hidden md:aspect-[16/6]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        </div>
      </section>

      <Container className="flex flex-col gap-12 py-12 md:py-20">
        <Link
          href={category?.href ?? "/listings"}
          className="flex w-fit items-center gap-2 text-sm font-medium text-ink-muted transition-colors duration-200 ease-standard hover:text-brand-primary"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} />
          Back to {category?.label ?? "Listings"}
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <Tag>{item.status}</Tag>
                <span className="text-xs uppercase tracking-kicker text-ink-muted">
                  {item.type}
                </span>
              </div>
              <h1 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                {item.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-base text-ink-muted">
                <MapPin className="size-4" strokeWidth={1.5} />
                {item.location}
              </p>
              <p className="mt-6 font-display text-3xl text-brand-primary">{item.price}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-line py-6 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-kicker text-ink-muted">Category</p>
                <p className="mt-1 font-display text-base text-ink">{category?.label}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-kicker text-ink-muted">Specification</p>
                <p className="mt-1 font-display text-base text-ink">{item.meta}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-kicker text-ink-muted">Status</p>
                <p className="mt-1 font-display text-base text-ink">{item.status}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl text-ink">About this {category?.singular?.toLowerCase()}</h2>
              <p className="leading-relaxed text-ink-muted">
                {item.title} represents the standard Vebryx holds every listing to:
                independently verified provenance, editorial-quality presentation, and
                direct access to a genuinely qualified buyer network. Full documentation,
                inspection reports, and provenance records are available to verified
                buyers upon request through your assigned Vebryx agent.
              </p>
              <p className="leading-relaxed text-ink-muted">
                Located in {item.location}, this {category?.singular?.toLowerCase()} is
                represented by a Vebryx-verified agent who can arrange a private viewing,
                answer specification questions, and guide you through every stage of the
                transaction.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="mb-4 text-xs font-semibold uppercase tracking-kicker text-ink">
              Inquire about this listing
            </p>
            <ContactForm />
          </div>
        </div>

        {related.length > 0 && (
          <div className="flex flex-col gap-8 border-t border-line pt-12">
            <h2 className="font-display text-2xl text-ink">
              More {category?.label.toLowerCase()}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedItem) => (
                <AssetCard
                  key={relatedItem.id}
                  item={relatedItem}
                  href={`/listings/${relatedItem.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
