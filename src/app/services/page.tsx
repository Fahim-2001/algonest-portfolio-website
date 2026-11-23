import type { Metadata } from "next";
import { Accent } from "@/components/Accent";
import { ArrowLink } from "@/components/ArrowLink";
import { CapabilityRows } from "@/components/CapabilityRows";
import { Cta } from "@/components/Cta";
import { SERVICE_ICONS } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { capabilities, services } from "@/content/capabilities";
import { capabilitiesPage as page, engagement, home } from "@/content/site";

// The URL stays /services/ so existing links and search ranking survive (docs/RULES.md).
export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Intelligent automation, data driven insights, tailored web applications, process automation and an embedded tech wing, focused on web-based AI and tailored software for business automation and data analytics.",
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function ServicesPage() {
  return (
    <>
      <section className="shell pb-12 pt-36 md:pb-20 md:pt-44">
        <Reveal amount={0}>
          <h1 className="display t-stagger-line max-w-[16ch]">
            <Accent text={page.title} accent={page.accent} />
          </h1>
          <p className="lead t-stagger-line mt-7" style={i(1)}>
            {page.lead}
          </p>
        </Reveal>
      </section>

      <section className="shell pb-16 md:pb-24" aria-labelledby="focus-heading">
        <div className="mb-10 rounded-[20px] border border-accent/40 bg-surface p-6 md:p-8">
          <h2 id="focus-heading" className="label">
            {page.focusHeading}
          </h2>
          <ol className="mt-5 grid gap-5 md:grid-cols-2 md:gap-10">
            {home.capabilities.focus.map((f, n) => (
              <li key={f} className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline">
                <span className="font-mono text-sm text-accent-text">{String(n + 1).padStart(2, "0")}</span>
                <span className="text-xl font-semibold leading-snug tracking-[-0.02em] md:text-2xl">{f}</span>
              </li>
            ))}
          </ol>
        </div>
        <CapabilityRows items={capabilities} label={page.listLabel} />
      </section>

      <section className="shell py-16 md:py-24" aria-labelledby="inside-heading">
        <h2 id="inside-heading" className="h2 max-w-[18ch]">
          {page.insideHeading}
        </h2>
        <p className="lead mt-6">{page.insideLead}</p>
        <Reveal as="ul" className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, n) => {
            const Icon = SERVICE_ICONS[svc.icon];
            const focus = capabilities.find((c) => c.slug === svc.focus);
            return (
              <li
                key={svc.id}
                style={i(n)}
                className={`t-stagger-line flex flex-col rounded-[20px] border border-line bg-surface p-8 md:p-10 ${
                  svc.focus === "both" ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <span className="grid size-12 place-items-center rounded-full bg-surface-2 text-accent-text">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <p className="label mt-6">{svc.category}</p>
                <h3 className="h3 mt-2">{svc.title}</h3>
                <p className="mt-3 max-w-[52ch] text-muted">{svc.body}</p>
                <p className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="chip chip-accent">
                    {focus ? `${page.focusTag} ${focus.index}` : page.bothTag}
                  </span>
                </p>
                <ArrowLink href={svc.href} className="mt-auto pt-6">
                  {svc.title}
                </ArrowLink>
              </li>
            );
          })}
        </Reveal>
      </section>

      <section id="embedded-tech-wing" className="shell scroll-mt-24 py-16 md:py-24">
        <div className="grid gap-8 border-y border-line py-12 md:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 className="h2 max-w-[14ch]">{page.team.heading}</h2>
          <div>
            <p className="lead">{page.team.body}</p>
            <ArrowLink href={engagement.href} className="mt-6">
              {page.team.link}
            </ArrowLink>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
