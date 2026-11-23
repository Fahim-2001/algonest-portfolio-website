import Image from "next/image";
import { places, project } from "@/content/world";
import { about, home } from "@/content/site";
import { Accent } from "./Accent";
import { ArrowLink } from "./ArrowLink";
import { HeroMotion } from "./HeroMotion";
import { Reveal } from "./Reveal";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

// Which side of its marker each name sits, so the three never meet on the map.
const SIDE: Record<string, string> = { bangladesh: "bottom-3", us: "bottom-3", australia: "top-3" };

/**
 * Global coverage: a dot map with a line from Bangladesh, where the team works,
 * to the United States and Australia, the markets it serves. The map is
 * decorative; the list under it says the same in words.
 */
export function Coverage() {
  const { coverage } = home;
  return (
    <section id="coverage" className="shell scroll-mt-24 py-24 md:py-36" aria-labelledby="coverage-heading">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-14">
        <h2 id="coverage-heading" className="h2 max-w-[16ch]">
          <Accent text={coverage.heading} accent={coverage.accent} />
        </h2>
        <p className="lead">{coverage.lead}</p>
      </div>

      {/* The panel matches the map's own shape, so the names below land on their places. */}
      <div className="relative mt-12 md:mt-16">
        <HeroMotion scene="coverage" className="aspect-[175/65] w-full rounded-[20px]" />
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
          {about.reach.items.map((c) => {
            const at = project(places[c.place]);
            return (
              <span
                key={c.name}
                className="absolute"
                style={{ left: `${at.x * 100}%`, top: `${at.y * 100}%` }}
              >
                <span
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-on-art ${SIDE[c.place]}`}
                >
                  {c.name}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <Reveal as="ul" className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
        {about.reach.items.map((c, n) => (
          <li key={c.name} className="t-stagger-line border-t border-line pt-6" style={i(n)}>
            <div className="flex items-center gap-4">
              {/* The country is named beside it, so the flag itself is decorative. */}
              <Image
                src={c.flag}
                alt=""
                width={48}
                height={32}
                className="aspect-[3/2] w-12 rounded border border-line"
              />
              <p>
                <span className="block font-medium leading-snug">{c.name}</span>
                <span className="block text-sm text-muted">{c.role}</span>
              </p>
            </div>
            <p className="mt-4 max-w-[34ch] text-muted">{c.note}</p>
          </li>
        ))}
      </Reveal>

      <ArrowLink href="/about-us/" className="mt-10">
        {coverage.link}
      </ArrowLink>
    </section>
  );
}
