import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Luxora — The Marketplace for Extraordinary Assets",
    template: "%s — Luxora",
  },
  description:
    "Luxora is a curated global marketplace for luxury properties, private jets, luxury cars, super yachts, and fine watches — connecting discerning buyers with verified sellers, agents, and partners.",
  keywords: [
    "luxury marketplace",
    "luxury real estate",
    "private jets",
    "luxury cars",
    "super yachts",
    "luxury watches",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-canvas text-ink overflow-x-hidden">
        <NavbarWrapper />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
