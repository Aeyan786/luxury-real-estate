import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { ContactForm } from "@/components/shared/ContactForm";

export function FaqContact() {
  return (
    <section id="faq" className="py-24 md:py-36">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          kicker="Questions & Answers"
          title="Everything you need to know before you join"
          description="Can't find what you're looking for? Send us a message and our team will follow up directly."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <FaqAccordion />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
