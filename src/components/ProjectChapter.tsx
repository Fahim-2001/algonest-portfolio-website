import Link from "next/link";
import { ArrowUpRight, Check, CircleDashed } from "@phosphor-icons/react/dist/ssr";
import { getServices } from "@/content/capabilities";
import type { Project } from "@/content/projects";
import { projectsPage as page } from "@/content/site";
import { ArrowLink } from "./ArrowLink";
import { BrowserFrame, ProjectVisual } from "./ProjectFrame";
import { Reveal } from "./Reveal";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/** One project on the showcase page: what it is, why it exists, what it solves and where to see it. */
export function ProjectChapter({
  project: p,
  position,
  priority = false,
}: {
  project: Project;
  /** 1-based place on the page. */
  position: number;
  priority?: boolean;
}) {
  const services = getServices(p.services);
  const subhead = "text-sm font-medium text-muted";

  return (
    <article
      id={p.id}
      tabIndex={-1}
      aria-labelledby={`${p.id}-name`}
      className="border-t border-line pt-10 md:pt-14"
    >
      <Reveal amount={0.2}>
        <p className="t-stagger-line flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-sm text-accent-text">{String(position).padStart(2, "0")}</span>
          <span className={`chip ${p.status === "prototype" ? "" : "chip-accent"}`}>{page.status[p.status]}</span>
          <span className="text-sm text-muted">{p.sector}</span>
        </p>
        <h2 id={`${p.id}-name`} className="h2 t-stagger-line mt-5" style={i(1)}>
          {p.name}
        </h2>
        <p className="lead t-stagger-line mt-4" style={i(2)}>
          {p.tagline}
        </p>
        {p.client && (
          <p className="t-stagger-line mt-4 text-sm text-muted" style={i(3)}>
            {page.builtFor} <span className="font-medium text-ink">{p.client}</span>
          </p>
        )}
      </Reveal>

      <BrowserFrame address={p.link?.label ?? page.privateBuild} isPublic={!!p.link} className="mt-8 md:mt-10">
        <ProjectVisual
          project={p}
          priority={priority}
          sizes="(min-width: 1320px) 900px, (min-width: 1024px) 70vw, 100vw"
        />
      </BrowserFrame>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h3 className={subhead}>{page.why}</h3>
          <p className="mt-4 text-pretty text-lg leading-relaxed">{p.motive}</p>
          {p.figure && (
            <p className="mt-8 border-t border-line pt-6">
              <span className="block font-mono text-[clamp(2.5rem,4.5vw,3.5rem)] font-medium leading-none tracking-[-0.04em] text-accent-text">
                {p.figure.value}
              </span>
              <span className="mt-3 block max-w-[30ch] text-muted">{p.figure.label}</span>
            </p>
          )}
        </div>
        <div className="md:col-span-7">
          <h3 className={subhead}>{page.problems}</h3>
          <ol className="mt-4 grid">
            {p.problems.map((problem, k) => (
              <li
                key={problem.title}
                className="grid grid-cols-[2.25rem_minmax(0,1fr)] border-t border-line py-5 first:border-t-0 first:pt-1"
              >
                <span className="pt-1 font-mono text-sm text-accent-text">{String(k + 1).padStart(2, "0")}</span>
                <div>
                  <h4 className="text-lg font-semibold leading-snug">{problem.title}</h4>
                  <p className="mt-1.5 text-muted">{problem.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {p.progress && (
        <div className="mt-10 rounded-[20px] border border-line bg-surface p-7 md:p-10">
          <h3 className="h3">{page.progress.heading}</h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h4 className={subhead}>{page.progress.built}</h4>
              <ul className="mt-3 grid gap-3">
                {p.progress.built.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check size={18} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-accent-text" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={subhead}>{page.progress.next}</h4>
              <ul className="mt-3 grid gap-3">
                {p.progress.next.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CircleDashed size={18} aria-hidden="true" className="mt-1 shrink-0 text-muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <h3 className={subhead}>{page.features}</h3>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {p.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <Check size={18} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-accent-text" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-5">
          <h3 className={subhead}>{page.services}</h3>
          <ul className="mt-2 grid">
            {services.map((svc) => (
              <li key={svc.id}>
                <ArrowLink href={svc.href}>{svc.title}</ArrowLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
        {p.link ? (
          <>
            <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {page.visit} {p.name}
              <span className="sr-only"> {page.newTab}</span>
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <span className="font-mono text-sm text-muted">{p.link.label}</span>
          </>
        ) : (
          <Link href="/contact-us/" className="btn btn-secondary">
            {page.walkthrough}
            <span className="sr-only">: {p.name}</span>
          </Link>
        )}
      </div>
    </article>
  );
}
