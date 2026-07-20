import { LegalPage } from "@/components/shared/LegalPage";

export const metadata = { title: "Privacy Policy" };

const SECTIONS = [
  {
    heading: "Information We Collect",
    body: "We collect information you provide directly — name, email, phone, and message content submitted through contact, agent, partner, and advertiser forms — along with standard usage data collected automatically when you browse the marketplace.",
  },
  {
    heading: "How We Use Information",
    body: "Information you submit is used to respond to your inquiry, connect you with the relevant agent or partner, and improve the marketplace experience. We do not sell personal information to third parties.",
  },
  {
    heading: "Data Retention",
    body: "We retain inquiry and account data for as long as needed to provide the service and meet legal obligations, after which it is deleted or anonymized.",
  },
  {
    heading: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time by contacting hello@luxora.com.",
  },
  {
    heading: "Contact",
    body: "Questions about this policy can be directed to hello@luxora.com.",
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="July 2026" sections={SECTIONS} />;
}
