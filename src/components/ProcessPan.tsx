import { home } from "@/content/site";
import { HeroMotion } from "./HeroMotion";
import { HorizontalPan } from "./HorizontalPan";

/**
 * The four-step engagement, left to right as time runs. Pinned and panned on
 * large screens with a rail that fills as you go; a swipeable row elsewhere.
 * Each step has a small looping scene that shows what happens in it.
 */
export function ProcessPan() {
  const { process } = home;
  return (
    <HorizontalPan
      id="process"
      label={process.heading}
      ordered
      progress
      header={
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-16">
          <h2 className="h2 pan-title max-w-[13ch]">{process.heading}</h2>
          <p className="max-w-[60ch] text-pretty text-muted lg:text-lg">
            <span className="chip chip-accent mr-3 align-[0.1em]">{process.chip}</span>
            {process.intro.map((part, k) => (
              <span key={k} className={part.accent ? "font-medium text-accent-text" : undefined}>
                {part.text}
              </span>
            ))}
          </p>
        </div>
      }
    >
      {process.steps.map((step, n) => (
        <li
          key={step.title}
          className="pan-panel flex w-[min(84vw,500px)] shrink-0 flex-col overflow-hidden rounded-[20px] border border-line bg-surface"
        >
          <HeroMotion scene={step.motion} className="pan-scene aspect-[5/2] w-full" />
          <div className="pan-body flex flex-1 flex-col gap-4 p-7 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-sm text-accent-text">{String(n + 1).padStart(2, "0")}</span>
              <span className={`chip ${step.free ? "chip-accent" : ""}`}>{step.badge}</span>
            </div>
            <h3 className="h3">{step.title}</h3>
            <p className="text-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </HorizontalPan>
  );
}
