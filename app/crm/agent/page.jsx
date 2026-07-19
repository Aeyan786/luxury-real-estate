import { CrmComingSoon } from "@/components/crm/CrmComingSoon";
import { MEMBERSHIPS } from "@/lib/constants";

export const metadata = {
  title: "Join as Agent",
  description: "Start your Vebryx Agent membership — verified profile, unlimited listings, monthly leads.",
};

const agentMembership = MEMBERSHIPS.find((m) => m.id === "agent");

export default function CrmAgentPage() {
  return (
    <CrmComingSoon
      kicker="Join as Agent"
      title="Start selling on Vebryx"
      description={`Agent membership is ${agentMembership.price} ${agentMembership.billing.toLowerCase()} — a verified profile, unlimited listings, and monthly lead generation from day one.`}
      benefits={agentMembership.benefits}
    />
  );
}
