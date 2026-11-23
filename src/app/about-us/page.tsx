import type { Metadata } from "next";
import Image from "next/image";
import { Accordion } from "@/components/Accordion";
import { Cta } from "@/components/Cta";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { ScrollWords } from "@/components/ScrollWords";
import { about } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AlgoNest was founded in 2024 by Md. Tanvir Islam to give businesses technical power, as an embedded team building web-based AI and tailored software.",
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function AboutPage() {
  return (
    <>
      <section className="shell pb-12 pt-36 md:pt-44">
        <Reveal amount={0} className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end lg:gap-16">
          <h1 className="t-stagger-line text-[clamp(2rem,4.4vw,3.875rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance">
            {about.title}
          </h1>
          <ul
            aria-label={about.reach.label}
            className="t-stagger-line grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-5"
            style={i(1)}
          >
            {about.reach.items.map((c) => (
              <li key={c.name} className="grid gap-3 lg:grid-cols-[72px_minmax(0,1fr)] lg:items-center lg:gap-5">
                {/* The country is named beside it, so the flag itself is decorative. */}
                <Image
                  src={c.flag}
                  alt=""
                  width={72}
                  height={48}
                  className="aspect-[3/2] w-full max-w-[72px] rounded-md border border-line"
                />
                <p>
                  <span className="block font-medium leading-snug">{c.name}</span>
                  <span className="block text-sm text-muted">{c.role}</span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
        <ParallaxImage src="/art/about.webp" priority sizes="100vw" className="mt-14 aspect-[4/3] w-full md:aspect-[21/9]" />
      </section>

      <section className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
        <ScrollWords
          text={about.pull}
          className="text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.15] tracking-[-0.025em] lg:sticky lg:top-32 lg:self-start"
        />
        <Reveal className="grid gap-6">
          {about.story.map((p, n) => (
            <p key={n} className="t-stagger-line max-w-[58ch] text-lg text-muted" style={i(n)}>
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      <section className="shell py-16 md:py-24">
        <h2 className="h2">{about.principlesHeading}</h2>
        <div className="mt-10">
          <Accordion items={about.principles} />
        </div>
      </section>

      <Cta />
    </>
  );
}
