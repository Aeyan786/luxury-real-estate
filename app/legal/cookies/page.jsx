import { LegalPage } from "@/components/shared/LegalPage";

export const metadata = { title: "Cookie Policy" };

const SECTIONS = [
  {
    heading: "What Cookies We Use",
    body: "Luxora uses essential cookies required for the site to function, along with analytics cookies that help us understand how the marketplace is used so we can improve it.",
  },
  {
    heading: "Managing Cookies",
    body: "Most browsers let you control cookies through their settings. Disabling essential cookies may affect core functionality such as filter state on the Listings page.",
  },
  {
    heading: "Third-Party Cookies",
    body: "We do not permit third-party advertising cookies on Luxora. Any embedded content (such as maps) may set its own cookies under its own policy.",
  },
];

export default function CookiesPage() {
  return <LegalPage title="Cookie Policy" updated="July 2026" sections={SECTIONS} />;
}
