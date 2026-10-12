import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/services";
import { site } from "@/content/site";

export function Footer() {
  const phone = site.phones[0];
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-8 md:py-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image src="/logo.jpeg" alt="" width={44} height={44} className="rounded-xl" />
            <span className="text-xl font-semibold tracking-tight">{site.name}</span>
          </Link>
          <p className="mt-5 max-w-[28ch] text-muted">{site.tagline}.</p>
        </div>

        <nav aria-label="Services">
          <h2 className="text-sm font-medium text-muted">Services</h2>
          <ul className="mt-4 grid gap-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`} className="inline-flex min-h-9 items-center hover:text-accent-text">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-medium text-muted">Company</h2>
          <ul className="mt-4 grid gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services/" },
              { label: "Articles", href: "/articles/" },
              { label: "About Us", href: "/about-us/" },
              { label: "Contact Us", href: "/contact-us/" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-accent-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium text-muted">Contact info</h2>
          <address className="mt-4 grid gap-1 not-italic">
            <span className="max-w-[24ch]">{site.address}</span>
            <a href={phone.href} className="inline-flex min-h-9 items-center font-mono text-[0.9375rem] hover:text-accent-text">
              {phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-9 items-center hover:text-accent-text">
              {site.email}
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="shell py-6 text-sm text-muted">
          Copyright &copy; {new Date().getFullYear()} algonest.net
        </p>
      </div>
    </footer>
  );
}
