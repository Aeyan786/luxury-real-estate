import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/shared/ContactForm";
import { AGENTS } from "@/lib/constants";
import { resolveHref } from "@/lib/utils";

export function generateStaticParams() {
  return AGENTS.map((agent) => ({ id: agent.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const agent = AGENTS.find((entry) => entry.id === id);
  if (!agent) return {};
  return {
    title: agent.name,
    description: `${agent.name} — ${agent.specialty} agent based in ${agent.location}.`,
  };
}

export default async function AgentDetailPage({ params }) {
  const { id } = await params;
  const agent = AGENTS.find((entry) => entry.id === id);
  if (!agent) notFound();

  return (
    <Container className="flex flex-col gap-10 py-16 md:py-24">
      <Link
        href={resolveHref("/agents")}
        className="flex w-fit items-center gap-2 text-sm font-medium text-ink-muted transition-colors duration-200 ease-standard hover:text-brand-primary"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} />
        Back to Agents
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs uppercase tracking-kicker text-brand-secondary">
              {agent.specialty}
            </p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">{agent.name}</h1>
            <p className="mt-3 flex items-center gap-2 text-base text-ink-muted">
              <MapPin className="size-4" strokeWidth={1.5} />
              {agent.location}
            </p>
          </div>

          <p className="leading-relaxed text-ink-muted">
            {agent.name} is a Luxora-verified agent specializing in {agent.specialty.toLowerCase()},
            representing buyers and sellers across {agent.location} and beyond. Every
            engagement begins with a private consultation to understand exactly what
            you&rsquo;re looking for before any listing is shared.
          </p>

          <div className="flex flex-col gap-3 border-y border-line py-6 text-sm">
            <a
              href={`mailto:${agent.email}`}
              className="flex items-center gap-3 text-ink-muted transition-colors duration-200 ease-standard hover:text-brand-primary"
            >
              <Mail className="size-4" strokeWidth={1.5} />
              {agent.email}
            </a>
            <a
              href={`tel:${agent.phone}`}
              className="flex items-center gap-3 text-ink-muted transition-colors duration-200 ease-standard hover:text-brand-primary"
            >
              <Phone className="size-4" strokeWidth={1.5} />
              {agent.phone}
            </a>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-kicker text-ink">
              Send {agent.name.split(" ")[0]} a message
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
