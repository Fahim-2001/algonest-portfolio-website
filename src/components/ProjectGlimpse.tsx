"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { BrowserFrame, ProjectVisual } from "./ProjectFrame";

export type GlimpseItem = Pick<Project, "id" | "name" | "tagline" | "sector" | "status" | "shot" | "scene"> & {
  statusLabel: string;
  /** Public URL, or the note that the build is private. */
  address: string;
  isPublic: boolean;
};

/**
 * Home page glimpse of the projects. Each row links to its chapter on the
 * showcase. On large screens the preview beside the list follows the row under
 * the mouse or keyboard focus; on small screens every row carries its own.
 */
export function ProjectGlimpse({ items, label }: { items: GlimpseItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
      <ul aria-label={label} className="border-t border-line">
        {items.map((p, n) => (
          <li key={p.id} className="border-b border-line">
            <Link
              href={`/projects/#${p.id}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(n)}
              onFocus={() => setActive(n)}
              className="group grid gap-5 py-7 md:py-8"
            >
              <BrowserFrame compact address={p.address} isPublic={p.isPublic} className="lg:hidden">
                <ProjectVisual project={p} still decorative sizes="(min-width: 768px) 90vw, 100vw" />
              </BrowserFrame>
              <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-2 md:grid-cols-[2.5rem_minmax(0,1fr)_auto] md:items-baseline md:gap-x-6">
                <span className="pt-1.5 font-mono text-sm text-accent-text md:pt-0" aria-hidden="true">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3
                    className={`text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.025em] transition-colors duration-[var(--duration-fast)] group-hover:text-accent-text ${
                      n === active ? "lg:text-accent-text" : ""
                    }`}
                  >
                    {p.name}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-muted">{p.tagline}</p>
                </div>
                <span
                  className={`chip col-start-2 mt-4 justify-self-start md:col-start-auto md:mt-0 ${
                    p.status === "prototype" ? "" : "chip-accent"
                  }`}
                >
                  {p.statusLabel}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* The preview repeats what the list says, so it is hidden from assistive tech. */}
      <div className="hidden lg:block" aria-hidden="true">
        <div className="sticky top-28">
          <BrowserFrame address={current.address} isPublic={current.isPublic}>
            {items.map((p, n) => (
              <div
                key={p.id}
                className={`absolute inset-0 transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-smooth-out)] ${
                  n === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <ProjectVisual project={p} still decorative sizes="(min-width: 1320px) 520px, 40vw" />
              </div>
            ))}
          </BrowserFrame>
          <p className="mt-4 text-sm text-muted">{current.sector}</p>
        </div>
      </div>
    </div>
  );
}
