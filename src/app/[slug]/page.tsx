import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ArrowLink } from "@/components/ArrowLink";
import { Cta } from "@/components/Cta";
import { HeroMotion } from "@/components/HeroMotion";
import { INCLUDE_ICONS } from "@/components/icons";
import { Reel } from "@/components/Reel";
import { Reveal } from "@/components/Reveal";
import { capabilities, capabilitySlugs, getCapability } from "@/content/capabilities";
import { capabilitiesPage, engagement, home } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return capabilitySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return {};
  return { title: capability.name, description: capability.summary };
}

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/** Stats grid spans: five read as two then three; otherwise rows of two or three. */
function statSpan(count: number, n: number) {
  if (count === 5) return n < 2 ? "lg:col-span-3" : "lg:col-span-2";
  return count % 3 === 0 ? "lg:col-span-2" : "lg:col-span-3";
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();
  const c = capability;

  const next = capabilities[(capabilities.indexOf(c) + 1) % capabilities.length];

  return (
    <>
      <section className="shell grid items-center gap-10 pb-16 pt-32 lg:min-h-[92dvh] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:pt-28">
        <Reveal amount={0}>
          <p className="label t-stagger-line">
            <Link href="/services/" className="inline-flex min-h-11 items-center hover:underline">
              {capabilitiesPage.crumb}
            </Link>
            <span className="text-muted" aria-hidden="true">
              {" "}
              / {c.index}
            </span>
          </p>
          <p className="t-stagger-line mt-1 max-w-[40ch] text-lg font-medium text-muted" style={i(1)}>
            {c.name}
          </p>
          <h1
            className="t-stagger-line mt-5 text-[clamp(2.5rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            style={i(2)}
          >
            {c.hero}
          </h1>
        </Reveal>
        <HeroMotion scene={c.motion} className="aspect-[4/3] w-full rounded-[20px]" />
      </section>

      <section className="shell py-16 md:py-24">
        <Reveal>
          <h2 className="h2 t-stagger-line max-w-[18ch]">{c.subhead}</h2>
          <p className="lead t-stagger-line mt-6" style={i(1)}>
            {c.lead}
          </p>
        </Reveal>
      </section>

      <section className="shell py-16 md:py-24" aria-labelledby="includes-heading">
        <h2 id="includes-heading" className="h2">
          {c.includesHeading}
        </h2>
        <Reveal as="ul" className={`mt-12 grid gap-5 ${c.includes.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {c.includes.map((inc, n) => {
            const Icon = INCLUDE_ICONS[inc.icon];
            return (
              <li
                key={inc.id}
                id={inc.id}
                style={i(n)}
                className="include t-stagger-line scroll-mt-28 rounded-[20px] border border-line bg-surface p-8 md:p-10"
              >
                <span className="grid size-12 place-items-center rounded-full bg-surface-2 text-accent-text">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="h3 mt-6">{inc.title}</h3>
                <p className="mt-3 max-w-[48ch] text-muted">{inc.body}</p>
              </li>
            );
          })}
        </Reveal>
      </section>

      <section className="shell py-16 md:py-24">
        <h2 className="h2 max-w-[16ch]">{c.pointsHeading}</h2>
        <div className="mt-12 grid gap-6 pb-10">
          {c.points.map((p, n) => (
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

      <section className="shell py-16 md:py-24">
        <h2 className="h2 max-w-[22ch]">{c.statsHeading}</h2>
        <Reveal as="ul" className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
          {c.stats.map((stat, n) => (
            <li
              key={stat.label}
              style={i(n)}
              className={`t-stagger-line border-t border-line pt-6 ${statSpan(c.stats.length, n)}`}
            >
              <Reel
                value={stat.value}
                className="block font-mono text-[clamp(2.75rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.04em] text-accent-text"
              />
              <p className="mt-4 max-w-[34ch] text-muted">{stat.label}</p>
            </li>
          ))}
        </Reveal>
        <p className="mt-10 text-sm text-muted">{capabilitiesPage.statsNote}</p>
      </section>

      <section className="shell py-16 md:py-24" aria-labelledby="engagement-heading">
        <div className="rounded-[20px] border border-line bg-surface p-8 md:p-12">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <h2 id="engagement-heading" className="h2 max-w-[15ch]">
              {engagement.heading}
            </h2>
            <ArrowLink href={engagement.href}>{engagement.link}</ArrowLink>
          </div>
          <Reveal as="ol" className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {home.process.steps.map((step, n) => (
              <li key={step.title} style={i(n)} className="t-stagger-line border-t border-line pt-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm text-accent-text">{String(n + 1).padStart(2, "0")}</span>
                  <span className={`chip ${step.free ? "chip-accent" : ""}`}>{step.badge}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug">{step.title}</h3>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <Cta />

      <section className="shell pb-24">
        <Link
          href={`/${next.slug}/`}
          className="t-learn group flex items-center justify-between gap-6 border-y border-line py-10"
        >
          <span>
            <span className="block text-sm text-muted">{capabilitiesPage.nextLabel}</span>
            <span className="h2 mt-2 block max-w-[24ch] text-balance transition-colors duration-300 group-hover:text-accent-text">
              {next.name}
            </span>
          </span>
          <span className="t-learn-chevron shrink-0 text-accent-text" aria-hidden="true">
            <ArrowRight size={36} />
          </span>
        </Link>
      </section>
    </>
  );
}
