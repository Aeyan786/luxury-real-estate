import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";

export function LegalPage({ title, updated, sections }) {
  return (
    <>
      <PageHero kicker="Legal" title={title} description={`Last updated ${updated}`} />
      <Container className="flex max-w-3xl flex-col gap-10 py-16 md:py-24">
        {sections.map((section) => (
          <div key={section.heading} className="flex flex-col gap-3">
            <h2 className="font-display text-2xl text-ink">{section.heading}</h2>
            <p className="leading-relaxed text-ink-muted">{section.body}</p>
          </div>
        ))}
      </Container>
    </>
  );
}
