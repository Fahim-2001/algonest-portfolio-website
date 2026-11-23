import type { Metadata } from "next";
import { Envelope, Phone } from "@phosphor-icons/react/dist/ssr";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Book a free 30-minute discovery call with AlgoNest. No sales pitch: we map where AI and automation can help your business, at zero cost.",
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function ContactPage() {
  return (
    <>
      <section className="shell pb-10 pt-36 md:pt-44">
        <Reveal amount={0}>
          <h1 className="display t-stagger-line max-w-[14ch]">{contact.title}</h1>
          <p className="lead t-stagger-line mt-7" style={i(1)}>
            {contact.lead}
          </p>
        </Reveal>
      </section>

      <section className="shell grid gap-14 pb-24 pt-10 md:pb-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="grid content-start gap-12">
          <div className="rounded-[20px] border border-line bg-surface p-8">
            <h2 className="text-sm font-medium text-muted">{contact.next.heading}</h2>
            <Reveal as="ol" className="mt-5 grid gap-4">
              {contact.next.steps.map((step, n) => (
                <li key={step} className="t-stagger-line grid grid-cols-[2rem_minmax(0,1fr)] items-baseline" style={i(n)}>
                  <span className="font-mono text-sm text-accent-text">{String(n + 1).padStart(2, "0")}</span>
                  <span className="text-lg">{step}</span>
                </li>
              ))}
            </Reveal>
          </div>

          <address className="grid content-start gap-10 not-italic">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-medium text-muted">
                <Envelope size={18} aria-hidden="true" /> Email
              </h2>
              <a href={`mailto:${site.email}`} className="mt-3 inline-flex min-h-11 items-center text-xl hover:text-accent-text md:text-2xl">
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-sm font-medium text-muted">
                <Phone size={18} aria-hidden="true" /> Phone
              </h2>
              <ul className="mt-3 grid gap-2">
                {site.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="inline-flex min-h-11 items-center font-mono text-xl hover:text-accent-text md:text-2xl">
                      {p.display}
                    </a>
                    <span className="block text-sm text-muted">{p.region}</span>
                  </li>
                ))}
              </ul>
            </div>
          </address>
        </div>

        <div>
          <h2 className="h3">{contact.formHeading}</h2>
          <div className="mt-8">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
