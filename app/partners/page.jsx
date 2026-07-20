import { FeatureCard } from "@/components/cards/FeatureCard";
import { MembershipCard } from "@/components/cards/MembershipCard";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MEMBERSHIPS, WHY_JOIN } from "@/lib/constants";

export const metadata = {
  title: "Partners",
  description:
    "Become a Luxora Partner — unlimited listings, featured placement, and a verified badge for agencies and brands.",
};

const partnerMembership = MEMBERSHIPS.find((m) => m.id === "partner");
const partnerFeatures = WHY_JOIN.filter((f) =>
  ["Verified Marketplace", "Premium Branding", "Global Exposure"].includes(f.title)
);

export default function PartnersPage() {
  return (
    <>
      <PageHero
        kicker="Partners"
        title="List at scale, backed by a verified marketplace"
        description="Partner membership is built for agencies, dealerships, and brands who list in volume and want their inventory presented at an editorial standard."
      >
        <div className="mt-8">
          <Button href="/crm/partner" variant="primary" size="lg">
            Become a Partner
          </Button>
        </div>
      </PageHero>

      <section className="py-24 md:py-36">
        <Container className="flex flex-col gap-12">
          <SectionHeader
            kicker="Partner Benefits"
            title="Everything a high-volume seller needs"
            align="center"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {partnerFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-canvas-alt py-24 md:py-36">
        <Container className="flex flex-col items-center gap-12">
          <SectionHeader
            kicker="Membership"
            title="Partner Membership"
            description="A one-time fee, unlimited listings, and priority placement across every category."
            align="center"
          />
          <div className="w-full max-w-md">
            {partnerMembership && <MembershipCard membership={partnerMembership} />}
          </div>
        </Container>
      </section>
    </>
  );
}
