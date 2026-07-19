import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MembershipCard } from "@/components/cards/MembershipCard";
import { MEMBERSHIPS } from "@/lib/constants";

export function Membership() {
  return (
    <section id="membership" className="bg-canvas-alt py-24 md:py-36">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          kicker="Membership"
          title="One platform, two ways to sell"
          description="Whether you're an independent agent or an agency listing at volume, there's a membership built around how you actually work."
          align="center"
        />

        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {MEMBERSHIPS.map((membership) => (
            <MembershipCard key={membership.id} membership={membership} />
          ))}
        </div>
      </Container>
    </section>
  );
}
