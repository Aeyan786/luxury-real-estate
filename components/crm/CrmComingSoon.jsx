import { Construction } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/shared/ContactForm";
import { PageHero } from "@/components/shared/PageHero";

// Shared shell for the three CRM entry points (/crm/agent, /crm/partner,
// /crm/advertiser). The CRM product itself isn't built yet — this page
// captures interest through the standard contact form in the meantime,
// styled identically to the rest of the marketing site.
export function CrmComingSoon({ kicker, title, description, benefits }) {
  return (
    <>
      <PageHero kicker={kicker} title={title} description={description} />

      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-8">
            <div className="card-surface flex items-start gap-4 p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
                <Construction className="size-4" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-display text-lg text-ink">CRM dashboard — coming soon</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  Self-serve signup and the full dashboard are in active
                  development. Submit your details below and our team will set
                  up your account manually in the meantime.
                </p>
              </div>
            </div>

            {benefits?.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-kicker text-ink">
                  What you&rsquo;ll get at launch
                </p>
                <ul className="flex flex-col gap-2">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-ink-muted">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ContactForm />
        </Container>
      </section>
    </>
  );
}
