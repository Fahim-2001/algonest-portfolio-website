"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";

export type IndexItem = { id: string; name: string; note: string };

/**
 * Index of the projects on the page. On large screens it stays in view beside
 * the chapters and a marker follows the one being read; on small screens it is
 * a row of jump links.
 */
export function ProjectIndex({ items, label }: { items: IndexItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const ids = items.map((it) => it.id).join(" ");

  useEffect(() => {
    const list = ids.split(" ");
    const chapters = list.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    // The chapter crossing a thin band just above the middle of the screen is the one being read.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(list.indexOf(e.target.id));
      },
      { rootMargin: "-38% 0px -58% 0px" },
    );
    chapters.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    window.history.replaceState(null, "", `#${id}`);
    scrollToId(id);
  };

  return (
    <nav aria-label={label} className="lg:sticky lg:top-28 lg:self-start">
      <div className="relative hidden lg:block">
        <span
          aria-hidden="true"
          className="index-marker"
          style={{ transform: `translateY(${active * 100}%)` }}
        />
        <ol>
          {items.map((it, n) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => go(e, it.id)}
                aria-current={n === active ? "location" : undefined}
                className="flex h-16 items-center gap-4 border-l border-line pl-5 text-muted transition-colors duration-[var(--duration-fast)] hover:text-ink aria-[current=location]:text-ink"
              >
                <span className="font-mono text-sm text-accent-text">{String(n + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="block truncate font-medium leading-tight">{it.name}</span>
                  <span className="mt-1 block truncate text-xs">{it.note}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:hidden">
        {items.map((it, n) => (
          <li key={it.id} className="shrink-0">
            <a
              href={`#${it.id}`}
              onClick={(e) => go(e, it.id)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors duration-[var(--duration-fast)] hover:border-accent-text"
            >
              <span className="font-mono text-xs text-accent-text">{String(n + 1).padStart(2, "0")}</span>
              {it.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
