import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/** Text link with an arrow that nudges on hover. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`t-learn inline-flex min-h-11 items-center gap-2 font-medium text-accent-text ${className}`}
    >
      {children}
      <span className="t-learn-chevron" aria-hidden="true">
        <ArrowRight size={18} weight="bold" />
      </span>
    </Link>
  );
}
