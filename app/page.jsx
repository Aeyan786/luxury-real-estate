import { Hero } from "@/components/sections/Hero";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { Membership } from "@/components/sections/Membership";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqContact } from "@/components/sections/FaqContact";
import { CATEGORIES, CATEGORY_ITEMS } from "@/lib/constants";

const PROPERTIES_CATEGORY = CATEGORIES.find((c) => c.slug === "properties");
const OTHER_CATEGORIES = CATEGORIES.filter((c) => c.slug !== "properties");

// Jets, Cars, Yachts, and Watches are consolidated into a single "More
// Collections" section on the homepage — one flagship item per category,
// one shared "View All" button — rather than four near-identical sections
// back to back.
const COLLECTIONS_CATEGORY = {
  kicker: "More Collections",
  label: "Jets, Cars, Yachts & Watches",
  description:
    "Beyond real estate — aviation, automotive, marine, and horology, all held to the same verification standard.",
  href: "/listings",
};
const COLLECTIONS_ITEMS = OTHER_CATEGORIES.map((category) => ({
  ...CATEGORY_ITEMS[category.slug][0],
  category: category.slug,
}));

export default function HomePage() {
  return (
    <>
      <Hero />

      <CategoryShowcase
        category={PROPERTIES_CATEGORY}
        items={CATEGORY_ITEMS.properties}
        alt={false}
      />
      <CategoryShowcase
        category={COLLECTIONS_CATEGORY}
        items={COLLECTIONS_ITEMS}
        alt={true}
      />

      <WhyJoin />
      <Membership />
      <HowItWorks />
      <Testimonials />
      <FaqContact />
    </>
  );
}
