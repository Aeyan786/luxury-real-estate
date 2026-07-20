import { LegalPage } from "@/components/shared/LegalPage";

export const metadata = { title: "Terms of Service" };

const SECTIONS = [
  {
    heading: "Acceptance of Terms",
    body: "By accessing or using Luxora, you agree to be bound by these Terms of Service and our Privacy Policy.",
  },
  {
    heading: "Marketplace Role",
    body: "Luxora is a marketplace that connects buyers with verified agents and partners. We are not a party to transactions between buyers and sellers, and do not guarantee the accuracy of third-party listings beyond our verification review.",
  },
  {
    heading: "Membership Accounts",
    body: "Agent and Partner memberships are subject to the pricing and billing terms presented at signup. Luxora reserves the right to suspend accounts that violate marketplace verification standards.",
  },
  {
    heading: "Listing Standards",
    body: "All listings must be accurate, lawfully owned or represented by the submitting agent or partner, and free of misleading claims.",
  },
  {
    heading: "Limitation of Liability",
    body: "Luxora is provided on an \"as is\" basis. To the maximum extent permitted by law, Luxora is not liable for indirect or consequential damages arising from use of the marketplace.",
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Service" updated="July 2026" sections={SECTIONS} />;
}
