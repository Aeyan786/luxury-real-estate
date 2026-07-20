import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/shared/ContactForm";
import { PageHero } from "@/components/shared/PageHero";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the Luxora team — general inquiries, agent introductions, and support.",
};

const CONTACT_DETAILS = [
  { icon: Mail, label: "Email", value: "hello@luxora.com", href: "mailto:hello@luxora.com" },
  { icon: Phone, label: "Phone", value: "+1 (305) 555-0199", href: "tel:+13055550199" },
  { icon: MapPin, label: "Headquarters", value: "Miami, FL · London, UK · Dubai, UAE" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="We're here to help"
        description="Questions about a listing, membership, or a partnership inquiry — send us a message and a member of the team will follow up directly."
      />

      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-8">
            <div className="card-surface flex flex-col gap-6 p-8">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <Icon className="size-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-kicker text-ink-muted">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block font-display text-base text-ink transition-colors duration-200 ease-standard hover:text-brand-primary"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-display text-base text-ink">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-card">
              <iframe
                title="Luxora headquarters map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-80.30%2C25.70%2C-80.10%2C25.85&layer=mapnik"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <ContactForm />
        </Container>
      </section>
    </>
  );
}
