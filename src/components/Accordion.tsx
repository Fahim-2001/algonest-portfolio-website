"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

export function Accordion({ items }: { items: readonly { title: string; body: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className="t-acc border-b border-line" data-open={isOpen}>
            <h3>
              <button
                type="button"
                id={`acc-head-${i}`}
                aria-expanded={isOpen}
                aria-controls={`acc-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="t-acc-head h3 flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                {item.title}
                <span className="t-acc-chevron shrink-0 text-accent-text" aria-hidden="true">
                  <CaretDown size={22} />
                </span>
              </button>
            </h3>
            <div className="t-acc-panel" id={`acc-panel-${i}`} role="region" aria-labelledby={`acc-head-${i}`}>
              <div className="t-acc-panel-inner">
                <p className="max-w-[62ch] pb-8 text-muted">{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
