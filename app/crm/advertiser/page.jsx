import { CrmComingSoon } from "@/components/crm/CrmComingSoon";

export const metadata = {
  title: "Become an Advertiser",
  description: "Advertise to a verified, high-intent luxury audience on Luxora.",
};

const ADVERTISER_BENEFITS = [
  "Homepage featured placement",
  "Category-page takeovers",
  "Newsletter placement",
  "Access to a verified, high-intent luxury audience",
  "Dedicated placement reporting",
];

export default function CrmAdvertiserPage() {
  return (
    <CrmComingSoon
      kicker="Become an Advertiser"
      title="Reach a verified luxury audience"
      description="Advertising is scoped separately from agent and partner listing accounts. Tell us about your brand and our team will put together placement options."
      benefits={ADVERTISER_BENEFITS}
    />
  );
}
