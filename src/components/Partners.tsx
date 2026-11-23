import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { partners } from "@/content/partners";
import { ArrowLink } from "./ArrowLink";

/**
 * Partner spotlight. Each logo sits in the nest: two orbits in the logo's
 * colours, one cyan and one off-white, circling the partner.
 */
export function Partners() {
  return (
    <section id="partners" className="shell scroll-mt-24 py-24 md:py-36" aria-labelledby="partners-heading">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-16">
        <h2 id="partners-heading" className="h2">
          {partners.heading}
        </h2>
        <p className="lead max-w-[44ch]">{partners.lead}</p>
      </div>
      <ul className="mt-12 grid gap-6 md:mt-16">
        {partners.items.map((p) => (
          <li
            key={p.name}
            className="grid overflow-hidden rounded-[20px] border border-line bg-surface md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <div className="art-panel grid place-items-center px-8 py-12 md:py-16">
              <div className="orbit">
                <span className="orbit-ring orbit-ring-outer" aria-hidden="true">
                  <span className="orbit-dot orbit-dot-accent" />
                </span>
                <span className="orbit-ring orbit-ring-inner" aria-hidden="true">
                  <span className="orbit-dot orbit-dot-light" />
                </span>
                {/* The name is the heading beside it, so the logo itself is not announced. */}
                <Image src={p.logo} alt="" width={176} height={176} sizes="176px" className="orbit-logo" />
              </div>
            </div>
            <div className="flex flex-col gap-5 p-8 md:p-10 xl:p-14">
              <div>
                <p className="text-sm text-muted">{p.relationship}</p>
                <h3 className="h3 mt-2">{p.name}</h3>
              </div>
              <p className="text-muted">{p.body}</p>
              <ul className="flex flex-wrap gap-2">
                {p.facts.map((f) => (
                  <li key={f} className="chip">
                    {f}
                  </li>
                ))}
              </ul>
              <p>{p.story}</p>
              <div className="mt-auto grid justify-items-start">
                {p.project && <ArrowLink href={p.project.href}>{p.project.label}</ArrowLink>}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-learn inline-flex min-h-11 items-center gap-2 font-medium text-accent-text"
                >
                  {partners.visit} {p.domain}
                  <span className="sr-only"> {partners.newTab}</span>
                  <span className="t-learn-chevron" aria-hidden="true">
                    <ArrowUpRight size={18} weight="bold" />
                  </span>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
