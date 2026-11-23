import type { Service } from "@/content/capabilities";
import { ArrowLink } from "./ArrowLink";
import { HeroMotion } from "./HeroMotion";
import { SERVICE_ICONS } from "./icons";

/** One of the five services on the home page: what it is, which focus it serves, and its live scene. */
export function ServiceStage({
  service: s,
  position,
  total,
  focusTag,
  explore,
  flip = false,
}: {
  service: Service;
  /** 1-based place in the list. */
  position: number;
  total: number;
  /** Which focus it sits under, already worded, e.g. "Focus 01". */
  focusTag: string;
  explore: string;
  flip?: boolean;
}) {
  const Icon = SERVICE_ICONS[s.icon];
  return (
    <article
      aria-labelledby={`stage-${s.id}`}
      className={`stage-card grid overflow-hidden rounded-[20px] border border-line bg-surface lg:min-h-[min(500px,calc(100dvh-250px))] ${
        flip ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
      }`}
    >
      <div className={`stage-body flex flex-col gap-7 p-7 md:p-10 xl:p-12 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-sm text-accent-text">
            {String(position).padStart(2, "0")}
            <span className="text-muted"> / {String(total).padStart(2, "0")}</span>
          </p>
          <span className="chip chip-accent">{focusTag}</span>
        </div>
        <div>
          <span className="grid size-12 place-items-center rounded-full bg-surface-2 text-accent-text">
            <Icon size={24} aria-hidden="true" />
          </span>
          <p className="label mt-6">{s.category}</p>
          <h3
            id={`stage-${s.id}`}
            className="mt-2 max-w-[20ch] text-balance text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          >
            {s.title}
          </h3>
          <p className="mt-4 max-w-[52ch] text-muted">{s.body}</p>
        </div>
        <ArrowLink href={s.href} className="mt-auto self-start">
          {explore}
          <span className="sr-only">: {s.title}</span>
        </ArrowLink>
      </div>
      <HeroMotion scene={s.motion} className="min-h-[240px] sm:min-h-[320px] lg:min-h-0" />
    </article>
  );
}
