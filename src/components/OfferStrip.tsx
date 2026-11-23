import type { Part } from "@/content/site";
import { Reel } from "./Reel";

/** The four terms of the offer, along the foot of the hero. Figures spin in once. */
export function OfferStrip({ items, label }: { items: { parts: Part[]; note: string }[]; label: string }) {
  return (
    <div className="border-t border-line">
      <ul aria-label={label} className="shell grid grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.note}
            className="border-line py-6 even:border-l even:pl-5 [&:nth-child(n+3)]:border-t lg:border-l lg:px-8 lg:py-7 lg:first:border-l-0 lg:first:pl-0 lg:[&:nth-child(n+3)]:border-t-0"
          >
            <p className="text-[clamp(1.625rem,2.6vw,2.25rem)] font-semibold leading-none tracking-[-0.03em]">
              {item.parts.map((part, k) => {
                const tone = part.accent ? "text-accent-text" : undefined;
                return /\d/.test(part.text) ? (
                  <Reel key={k} value={part.text} className={tone} />
                ) : (
                  <span key={k} className={tone}>
                    {part.text}
                  </span>
                );
              })}
            </p>
            <p className="mt-2.5 text-sm text-muted">{item.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
