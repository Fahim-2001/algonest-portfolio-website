import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell grid min-h-[80dvh] content-center gap-6 pt-28">
      <h1 className="display max-w-[14ch]">This page does not exist.</h1>
      <p className="lead">The link may be old or mistyped. The services page lists everything we do.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Go to the home page
        </Link>
        <Link href="/services/" className="btn btn-secondary">
          See our services
        </Link>
      </div>
    </section>
  );
}
