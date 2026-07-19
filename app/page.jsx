import { Hero } from "@/components/sections/Hero";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { Membership } from "@/components/sections/Membership";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqContact } from "@/components/sections/FaqContact";
import { CATEGORIES, CATEGORY_ITEMS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Hero />

      {CATEGORIES.map((category, index) => (
        <CategoryShowcase
          key={category.slug}
          category={category}
          items={CATEGORY_ITEMS[category.slug]}
          alt={index % 2 === 1}
        />
      ))}

      <WhyJoin />
      <Membership />
      <HowItWorks />
      <Testimonials />
      <FaqContact />
    </>
  );
}
