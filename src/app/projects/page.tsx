import type { Metadata } from "next";
import { Accent } from "@/components/Accent";
import { Cta } from "@/components/Cta";
import { ProjectChapter } from "@/components/ProjectChapter";
import { BrowserFrame, ProjectVisual } from "@/components/ProjectFrame";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";
import { projectsPage as page } from "@/content/site";

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

// Hero fan: the three products with a public build, back to front.
const FAN = [
  { id: "tradeflow", place: "left-0 top-[4%] w-[74%] -rotate-[5deg]" },
  { id: "qantly", place: "right-0 top-[16%] w-[70%] rotate-[4deg]" },
  { id: "voltari", place: "bottom-0 left-[12%] w-[76%] -rotate-1" },
];

export default function ProjectsPage() {
  const live = projects.filter((p) => p.link).length;
  const prototypes = projects.filter((p) => p.status === "prototype").length;
  const counts = [
    { value: projects.length, label: page.counts.projects },
    { value: live, label: page.counts.live },
    { value: prototypes, label: page.counts.prototypes },
  ];

  return (
    <>
      <section className="shell grid items-center gap-14 pb-16 pt-36 md:pb-24 md:pt-44 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
        <Reveal amount={0}>
          <h1 className="display t-stagger-line max-w-[12ch]">
            <Accent text={page.title} accent={page.accent} />
          </h1>
          <p className="lead t-stagger-line mt-7" style={i(1)}>
            {page.lead}
          </p>
          <dl className="t-stagger-line mt-10 grid max-w-[30rem] grid-cols-3 gap-6 border-t border-line pt-6" style={i(2)}>
            {counts.map((c) => (
              <div key={c.label} className="flex flex-col-reverse gap-2">
                <dt className="text-sm text-muted">{c.label}</dt>
                <dd className="font-mono text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-none tracking-[-0.04em] text-accent-text">
                  {String(c.value).padStart(2, "0")}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="relative mx-auto aspect-[6/5] w-full max-w-[620px]" aria-hidden="true">
          {FAN.map((f) => {
            const p = projects.find((x) => x.id === f.id);
            if (!p?.link) return null;
            return (
              <BrowserFrame
                key={p.id}
                compact
                address={p.link.label}
                isPublic
                className={`absolute shadow-[0_40px_80px_-40px_rgb(5_10_13/0.75)] ${f.place}`}
              >
                <ProjectVisual project={p} decorative priority sizes="(min-width: 1024px) 34vw, 70vw" />
              </BrowserFrame>
            );
          })}
        </div>
      </section>

      <section className="shell pb-16 md:pb-24" aria-label={page.counts.projects}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-16">
          <ProjectIndex
            label={page.indexLabel}
            items={projects.map((p) => ({ id: p.id, name: p.name, note: page.status[p.status] }))}
          />
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-20 md:gap-28">
            {projects.map((p, n) => (
              <ProjectChapter key={p.id} project={p} position={n + 1} />
            ))}
          </div>
        </div>
      </section>

      <Cta heading={page.ctaHeading} />
    </>
  );
}
