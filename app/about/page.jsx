import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { WHY_JOIN } from "@/lib/constants";

export const metadata = {
  title: "About",
  description:
    "Vebryx is a curated global marketplace connecting verified buyers, agents, and partners across luxury real estate, aviation, automotive, marine, and horology.",
};

const STATS = [
  ["1,200+", "Verified Listings"],
  ["48", "Countries Represented"],
  ["320+", "Agents & Partners"],
  ["8/10", "Avg. Buyer Trust Score"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Vebryx"
        title="A marketplace built on verification, not volume"
        description="We started Vebryx because the luxury asset market deserved the same transparency buyers expect everywhere else — a single, trustworthy place to buy, sell, and discover extraordinary things."
      />

      <section className="py-24 md:py-36">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image
              src="https://picsum.photos/seed/vebryx-about/900/1100"
              alt="Vebryx team"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <p className="kicker">Our Mission</p>
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">
              Connect discerning buyers with verified sellers — nothing else.
            </h2>
            <p className="leading-relaxed text-ink-muted">
              Every listing on Vebryx, from a private island to a provenance-verified
              timepiece, passes through the same review before it goes live. Every
              agent and partner is identity-checked. That standard is the entire
              product — not a feature bolted onto a generic classifieds site.
            </p>
            <p className="leading-relaxed text-ink-muted">
              We work with independent agents, agencies, dealerships, and brand
              partners across five categories: luxury properties, private jets,
              luxury cars, super yachts, and fine watches — each held to the same
              bar of trust.
            </p>
            <div className="flex gap-4 pt-2">
              <Button href="/agents" variant="primary">
                Meet Our Agents
              </Button>
              <Button href="/contact" variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-canvas-alt py-16">
        <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map(([stat, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl text-brand-primary">{stat}</p>
              <p className="mt-2 text-xs uppercase tracking-kicker text-ink-muted">{label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container className="flex flex-col gap-12">
          <SectionHeader
            kicker="What We Stand For"
            title="The standard behind every listing"
            align="center"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_JOIN.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
