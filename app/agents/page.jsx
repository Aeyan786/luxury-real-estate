import { PageHero } from "@/components/shared/PageHero";
import { AgentsBrowser } from "@/components/agents/AgentsBrowser";

export const metadata = {
  title: "Agents",
  description: "Meet the verified agents representing Vebryx's luxury marketplace worldwide.",
};

export default function AgentsPage() {
  return (
    <>
      <PageHero
        kicker="Our Network"
        title="Verified agents, worldwide"
        description="Every Vebryx agent is identity- and license-verified before their profile goes live, so you always know who you're working with."
      />
      <AgentsBrowser />
    </>
  );
}
