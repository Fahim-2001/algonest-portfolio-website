import type { Metadata } from "next";
import { Envelope, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call, email or send AlgoNest a message to book a meeting about your business.",
};

export default function ContactPage() {
  return (
    <>
      <section className="shell pb-10 pt-36 md:pt-44">
        <Reveal amount={0}>
          <h1 className="display t-stagger-line max-w-[15ch]">{contact.title}</h1>
        </Reveal>
      </section>

      <section className="shell grid gap-14 pb-24 pt-10 md:pb-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <address className="grid content-start gap-10 not-italic">
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
              <MapPin size={18} aria-hidden="true" /> Office
            </h2>
            <p className="mt-3 max-w-[22ch] text-xl">{site.address}</p>
          </div>
        </address>

        <div>
          <h2 className="h3">{contact.formHeading}</h2>
          <div className="mt-8">
            <LeadForm variant="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
