import { CrmComingSoon } from "@/components/crm/CrmComingSoon";
import { MEMBERSHIPS } from "@/lib/constants";

export const metadata = {
  title: "Join as Partner",
  description: "Become a Luxora Partner — verified badge, unlimited listings, featured placement.",
};

const partnerMembership = MEMBERSHIPS.find((m) => m.id === "partner");

export default function CrmPartnerPage() {
  return (
    <CrmComingSoon
      kicker="Join as Partner"
      title="Bring your inventory to Luxora"
      description={`Partner membership is a ${partnerMembership.price} ${partnerMembership.billing.toLowerCase()} — unlimited listings, featured placement, and a verified partner badge.`}
      benefits={partnerMembership.benefits}
    />
  );
}
