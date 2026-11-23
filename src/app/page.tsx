import Image from "next/image";
import Link from "next/link";
import { Accent } from "@/components/Accent";
import { ArrowLink } from "@/components/ArrowLink";
import { Compare } from "@/components/Compare";
import { Coverage } from "@/components/Coverage";
import { Cta } from "@/components/Cta";
import { HeroCanvas } from "@/components/HeroCanvas";
import { WHY_ICONS } from "@/components/icons";
import { OfferStrip } from "@/components/OfferStrip";
import { Partners } from "@/components/Partners";
import { ProcessPan } from "@/components/ProcessPan";
import { ProjectGlimpse } from "@/components/ProjectGlimpse";
import { Reality } from "@/components/Reality";
import { Reveal } from "@/components/Reveal";
import { ScrollWords } from "@/components/ScrollWords";
import { ServiceStage } from "@/components/ServiceStage";
import { StackedStages } from "@/components/StackedStages";
import { TiltCard } from "@/components/TiltCard";
import { capabilities, services } from "@/content/capabilities";
import { projects } from "@/content/projects";
import { home, projectsPage, site } from "@/content/site";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

// Bento: two artwork cells, one accent cell, one plain cell.
const BENTO = [
  { span: "md:col-span-7", art: "/art/technical-team-hiring.webp" },
  { span: "md:col-span-5", art: null },
  { span: "md:col-span-5", art: null, accent: true },
  { span: "md:col-span-7", art: "/art/data-driven-solutions.webp" },
];

export default function HomePage() {
  const { hero, why } = home;

  return (
    <>
      {/* Hero: asymmetric split with live canvas, the offer along its foot */}
      <section className="flex min-h-[100dvh] flex-col">
        <div className="shell grid flex-1 items-center gap-10 pb-12 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-12 lg:pt-24 xl:grid-cols-[minmax(0,1fr)_minmax(0,430px)]">
          <Reveal amount={0}>
            <h1 className="display display-hero">
              {hero.lines.map((line, n) => (
                <span key={line} className="t-stagger-line" style={i(n)}>
                  <Accent text={line} accent={hero.accent} />
                </span>
              ))}
            </h1>
            <p className="lead t-stagger-line mt-7 max-w-[46ch]" style={i(3)}>
              {hero.sub}
            </p>
            <div className="t-stagger-line mt-9 flex flex-wrap gap-3" style={i(5)}>
              <Link href={site.cta.href} className="btn btn-primary">
                {site.cta.label}
              </Link>
              <Link href={hero.secondary.href} className="btn btn-secondary">
                {hero.secondary.label}
              </Link>
            </div>
          </Reveal>
          <div className="mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[20px] border border-line bg-surface lg:max-w-none">
            <HeroCanvas src="/logo.jpeg" />
          </div>
        </div>
        <OfferStrip items={home.offer} label={home.offerLabel} />
      </section>

      {/* Reality: three-column ledger */}
      <Reality />

      {/* Statement: scroll-scrubbed answer to the reality above */}
      <section className="shell pb-24 pt-4 md:pb-36 md:pt-8">
        <ScrollWords
          text={home.statement.text}
          accent={home.statement.accent}
          className="max-w-[26em] text-[clamp(1.5rem,3.1vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.02em]"
        />
      </section>

      {/* Our services: the five services as stacked stages, each tagged with its focus */}
      <section className="pb-20 md:pb-24" aria-labelledby="services-heading">
        <div className="shell">
          <p className="label">{home.capabilities.eyebrow}</p>
          <h2 id="services-heading" className="h2 mt-4">
            <Accent text={home.capabilities.heading} accent={home.capabilities.accent} />
          </h2>
          <p className="lead mt-6">{home.capabilities.lead}</p>
          <div className="mt-10 rounded-[20px] border border-accent/40 bg-surface p-6 md:p-8">
            <p className="label">{home.capabilities.focusLabel}</p>
            <ol className="mt-5 grid gap-5 md:grid-cols-2 md:gap-10">
              {home.capabilities.focus.map((f, n) => (
                <li key={f} className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline">
                  <span className="font-mono text-sm text-accent-text">{String(n + 1).padStart(2, "0")}</span>
                  <span className="text-xl font-semibold leading-snug tracking-[-0.02em] md:text-2xl">{f}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="shell mt-12 md:mt-16">
          <StackedStages>
            {services.map((svc, n) => {
              const focus = capabilities.find((c) => c.slug === svc.focus);
              return (
                <ServiceStage
                  key={svc.id}
                  service={svc}
                  position={n + 1}
                  total={services.length}
                  focusTag={focus ? `${home.capabilities.focusTag} ${focus.index}` : home.capabilities.bothTag}
                  explore={home.capabilities.exploreService}
                  flip={n % 2 === 1}
                />
              );
            })}
          </StackedStages>
        </div>
      </section>

      {/* The page's one marquee */}
      <div className="marquee border-y border-line py-7" aria-hidden="true">
        {[0, 1].map((n) => (
          <ul key={n} className="marquee-track">
            {home.marquee.map((c) => (
              <li key={c} className="flex items-center whitespace-nowrap text-xl text-muted md:text-2xl">
                {c}
                <span className="mx-7 inline-block h-5 w-px rotate-[32deg] bg-accent" />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Projects: a glimpse, the preview pinned beside the list */}
      <section className="shell py-24 md:py-36" aria-labelledby="projects-heading">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-14">
          <h2 id="projects-heading" className="h2 max-w-[14ch]">
            <Accent text={home.projects.heading} accent={home.projects.accent} />
          </h2>
          <p className="lead">{home.projects.lead}</p>
        </div>
        <div className="mt-12 md:mt-16">
          <ProjectGlimpse
            label={home.projects.listLabel}
            items={projects.map((p) => ({
              id: p.id,
              name: p.name,
              tagline: p.tagline,
              sector: p.sector,
              status: p.status,
              shot: p.shot,
              scene: p.scene,
              statusLabel: projectsPage.status[p.status],
              address: p.link?.label ?? projectsPage.privateBuild,
              isPublic: !!p.link,
            }))}
          />
        </div>
        <ArrowLink href="/projects/" className="mt-10">
          {home.projects.link}
        </ArrowLink>
      </section>

      {/* Process: pinned horizontal pan */}
      <ProcessPan />

      {/* Why AlgoNest: asymmetric bento, then the comparison */}
      <section className="shell py-24 md:py-36" aria-labelledby="why-heading">
        <p className="label">{why.eyebrow}</p>
        <h2 id="why-heading" className="h2 mt-4 max-w-[16ch]">
          <Accent text={why.heading} accent={why.accent} />
        </h2>
        <Reveal className="mt-12 grid gap-5 md:grid-cols-12">
          {why.items.map((item, n) => {
            const Icon = WHY_ICONS[n];
            const cell = BENTO[n];
            const tone = cell.art
              ? "bg-slate text-on-art"
              : cell.accent
                ? "bg-accent text-on-accent"
                : "border border-line bg-surface";
            return (
              <div key={item.title} className={`t-stagger-line ${cell.span}`} style={i(n)}>
                <TiltCard className="h-full">
                  <div className={`relative flex min-h-[280px] flex-col justify-between gap-10 p-8 md:min-h-[320px] md:p-10 ${tone}`}>
                    {cell.art && (
                      <>
                        <Image src={cell.art} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover opacity-45" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--slate)] via-transparent to-transparent" />
                      </>
                    )}
                    <Icon size={36} weight="light" aria-hidden="true" className="relative" />
                    <div className="relative">
                      <h3 className="h3 max-w-[22ch]">{item.title}</h3>
                      <p className={`mt-3 max-w-[44ch] ${cell.art ? "text-on-art" : cell.accent ? "" : "text-muted"}`}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </Reveal>
        <Compare />
      </section>

      {/* Partners: spotlight */}
      <Partners />

      {/* Global coverage: Bangladesh, the US and Australia on a dot map */}
      <Coverage />

      <Cta />
    </>
  );
}
