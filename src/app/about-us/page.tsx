import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { Cta } from "@/components/Cta";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { ScrollWords } from "@/components/ScrollWords";
import { about } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AlgoNest was founded in 2024 by Md. Tanvir Islam to give businesses technical power through AI, automation, data and custom software.",
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function AboutPage() {
  return (
    <>
      <section className="shell pb-12 pt-36 md:pt-44">
        <Reveal amount={0}>
          <h1 className="display t-stagger-line max-w-[16ch]">{about.title}</h1>
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
