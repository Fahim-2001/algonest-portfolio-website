import { home } from "@/content/site";
import { Accent } from "./Accent";
import { REALITY_ICONS } from "./icons";
import { Reel } from "./Reel";
import { Reveal } from "./Reveal";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/** Why AI projects stall: three problems as a ledger, each with what it costs. */
export function Reality() {
  const { reality } = home;
  return (
    <section className="shell py-24 md:py-36" aria-labelledby="reality-heading">
      <h2 id="reality-heading" className="h2 max-w-[17ch]">
        <Accent text={reality.heading} accent={reality.accent} />
      </h2>
      <Reveal as="ul" className="mt-14 grid border-y border-line md:grid-cols-3">
        {reality.items.map((item, n) => {
          const Icon = REALITY_ICONS[item.icon];
          return (
            <li
              key={item.title}
              style={i(n)}
              className="t-stagger-line flex flex-col gap-12 border-line py-10 [&+li]:border-t md:px-8 md:py-12 md:first:pl-0 md:last:pr-0 md:[&+li]:border-l md:[&+li]:border-t-0"
            >
              <div>
                <span className="grid size-12 place-items-center rounded-full border border-line text-accent-text">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="h3 mt-6">{item.title}</h3>
                <p className="mt-3 max-w-[42ch] text-muted">{item.body}</p>
              </div>
              <div className="mt-auto">
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <Reel
                    value={item.figure}
                    className="font-mono text-[clamp(2.5rem,4.2vw,3.75rem)] font-medium leading-none tracking-[-0.04em]"
                  />
                  {item.unit && <span className="text-lg text-muted">{item.unit}</span>}
                </p>
                <p className="mt-3 max-w-[30ch] text-sm text-muted">{item.caption}</p>
              </div>
            </li>
          );
        })}
      </Reveal>
    </section>
  );
}
