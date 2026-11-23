import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/capabilities";
import { capabilitiesPage, footer, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.3fr_1.1fr_0.9fr_1.2fr] md:gap-8 md:py-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image src="/logo.jpeg" alt="" width={44} height={44} className="rounded-xl" />
            <span className="text-xl font-semibold tracking-tight">{site.name}</span>
          </Link>
          <p className="mt-5 max-w-[28ch] text-muted">{site.tagline}.</p>
        </div>

        <nav aria-label={capabilitiesPage.crumb}>
          <h2 className="text-sm font-medium text-muted">{capabilitiesPage.crumb}</h2>
          <ul className="mt-4 grid gap-1">
            {services.map((svc) => (
              <li key={svc.id}>
                <Link href={svc.href} className="inline-flex min-h-9 items-center py-1 hover:text-accent-text">
                  {svc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={footer.company}>
          <h2 className="text-sm font-medium text-muted">{footer.company}</h2>
          <ul className="mt-4 grid gap-1">
            {footer.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-accent-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium text-muted">{footer.contact}</h2>
          <address className="mt-4 grid gap-1 not-italic">
            <a href={`mailto:${site.email}`} className="inline-flex min-h-9 items-center hover:text-accent-text">
              {site.email}
            </a>
            {site.phones.map((ph) => (
              <a key={ph.href} href={ph.href} className="inline-flex min-h-9 items-center gap-2 font-mono text-[0.9375rem] hover:text-accent-text">
                {ph.display}
                <span className="font-sans text-sm text-muted">{ph.region}</span>
              </a>
            ))}
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
