import type { Metadata } from "next";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/Reveal";
import { ServiceRows } from "@/components/ServiceRows";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI solutions, automation, data-driven solutions, tailored software development and dedicated technical teams from AlgoNest.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="shell pb-12 pt-36 md:pb-20 md:pt-44">
        <Reveal amount={0}>
          <h1 className="display max-w-[14ch]">
            <span className="t-stagger-line">Solutions that work,</span>
            <span className="t-stagger-line text-accent-text" style={{ "--i": 1 } as React.CSSProperties}>
              results that last.
            </span>
          </h1>
        </Reveal>
      </section>
      <section className="shell pb-16" aria-label="All services">
        <ServiceRows items={services} />
      </section>
      <Cta />
    </>
  );
}
