import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Cta } from "@/components/Cta";
import { LeadForm } from "@/components/LeadForm";
import { HeroMotion, type MotionVariant } from "@/components/HeroMotion";
import { Reel } from "@/components/Reel";
import { Reveal } from "@/components/Reveal";
import { getService, services, serviceSlugs } from "@/content/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.summary };
}

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const next = services[(services.indexOf(service) + 1) % services.length];
  const five = service.stats.length === 5;

  return (
    <>
      <section className="shell grid items-center gap-10 pb-16 pt-32 lg:min-h-[92dvh] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:pt-28">
        <Reveal amount={0}>
          <p className="label t-stagger-line">
            <Link href="/services/" className="inline-flex min-h-11 items-center hover:underline">
              Services
            </Link>
          </p>
          <h1 className="t-stagger-line mt-2 text-[clamp(2.5rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]" style={i(1)}>
            {service.hero}
          </h1>
        </Reveal>
        <HeroMotion variant={service.slug as MotionVariant} className="aspect-[4/3] w-full" />
      </section>

      <section className="shell py-16 md:py-24">
        <Reveal>
          <h2 className="h2 t-stagger-line max-w-[18ch]">{service.subhead}</h2>
          <p className="lead t-stagger-line mt-6" style={i(1)}>
            {service.lead}
          </p>
        </Reveal>
      </section>

      {service.points && (
        <section className="shell py-16 md:py-24">
          <h2 className="h2 max-w-[16ch]">{service.pointsHeading}</h2>
          <div className="mt-12 grid gap-6 pb-10">
            {service.points.map((p, n) => (
              <article
                key={p.title}
                style={i(n)}
                className="stack-card grid gap-5 rounded-[20px] border border-line bg-surface p-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 md:p-12"
              >
                <h3 className="h3">{p.title}</h3>
                <p className="text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="shell py-16 md:py-24">
        <h2 className="h2 max-w-[20ch]">{service.statsHeading}</h2>
        <Reveal as="ul" className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
          {service.stats.map((stat, n) => (
            <li
              key={stat.label}
              style={i(n)}
              className={`t-stagger-line border-t border-line pt-6 ${five ? (n < 2 ? "lg:col-span-3" : "lg:col-span-2") : "lg:col-span-3"}`}
            >
              <Reel
                value={stat.value}
                className="block font-mono text-[clamp(2.75rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.04em] text-accent-text"
              />
              <p className="mt-4 max-w-[34ch] text-muted">{stat.label}</p>
            </li>
          ))}
        </Reveal>
        <p className="mt-10 text-sm text-muted">Industry estimates. Results vary by business.</p>
      </section>

      {service.hasForm ? (
        <section className="shell grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 className="h2 max-w-[12ch]">Let us know your requirements</h2>
          <LeadForm variant="team" />
        </section>
      ) : (
        <Cta />
      )}

      <section className="shell pb-24">
        <Link
          href={`/${next.slug}/`}
          className="t-learn group flex items-center justify-between gap-6 border-y border-line py-10"
        >
          <span>
            <span className="block text-sm text-muted">Next service</span>
            <span className="h2 mt-2 block transition-colors duration-300 group-hover:text-accent-text">{next.name}</span>
          </span>
          <span className="t-learn-chevron shrink-0 text-accent-text" aria-hidden="true">
            <ArrowRight size={36} />
          </span>
        </Link>
      </section>
    </>
  );
}
