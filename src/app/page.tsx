import Image from "next/image";
import Link from "next/link";
import { ArrowsClockwise, PuzzlePiece, ShieldCheck, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { ArrowLink } from "@/components/ArrowLink";
import { Cta } from "@/components/Cta";
import { HeroCanvas } from "@/components/HeroCanvas";
import { HorizontalPan } from "@/components/HorizontalPan";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { ScrollWords } from "@/components/ScrollWords";
import { TiltCard } from "@/components/TiltCard";
import { services } from "@/content/services";
import { home, site } from "@/content/site";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function HomePage() {
  const { hero, why } = home;
  const whyIcons = [PuzzlePiece, UsersThree, ShieldCheck, ArrowsClockwise];

  return (
    <>
      {/* Hero: asymmetric split */}
      <section className="shell grid min-h-[100dvh] items-center gap-10 pb-12 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-12 lg:pt-24">
        <Reveal amount={0}>
          <h1 className="display">
            {hero.lines.map((line, n) => (
              <span key={line} className="t-stagger-line" style={i(n)}>
                {line.includes(hero.accentWord) ? (
                  <>
                    {line.replace(hero.accentWord, "")}
                    <span className="text-accent-text">{hero.accentWord}</span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          <p className="lead t-stagger-line mt-7 max-w-[46ch]" style={i(3)}>
            {hero.sub}
          </p>
          <div className="t-stagger-line mt-9 flex flex-wrap gap-3" style={i(5)}>
            <Link href={site.cta.href} className="btn btn-primary">
              {site.cta.label}
            </Link>
            <Link href={hero.secondary.href} className="btn btn-secondary">
              {hero.secondary.label}
            </Link>
          </div>
        </Reveal>
        <div className="mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[20px] border border-line bg-surface lg:max-w-none">
          <HeroCanvas src="/logo.jpeg" />
        </div>
      </section>

      {/* Statement: scroll-scrubbed text */}
      <section className="shell py-24 md:py-36">
        <p className="label">Business smarter with AlgoNest</p>
        <ScrollWords
          text={home.statement}
          className="mt-6 max-w-[26em] text-[clamp(1.5rem,3.1vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.02em]"
        />
      </section>

      {/* Services: pinned horizontal pan */}
      <HorizontalPan label="Services" header={<h2 className="h2">{home.servicesHeading}</h2>}>
        {services.map((s) => (
          <article
            key={s.slug}
            className="pan-panel grid w-[min(86vw,920px)] shrink-0 overflow-hidden rounded-[20px] border border-line bg-surface md:grid-cols-2 lg:h-[min(60dvh,540px)]"
          >
            <div className="relative aspect-[4/3] bg-slate md:aspect-auto">
              <Image src={s.art} alt="" fill sizes="(min-width: 768px) 460px, 86vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
              <div>
                <h3 className="h3">{s.name}</h3>
                <p className="mt-4 text-muted">{s.summary}</p>
              </div>
              <ArrowLink href={`/${s.slug}/`}>
                See details<span className="sr-only">: {s.name}</span>
              </ArrowLink>
            </div>
          </article>
        ))}
      </HorizontalPan>

      {/* Capabilities: the page's one marquee */}
      <div className="marquee border-y border-line py-7" aria-hidden="true">
        {[0, 1].map((n) => (
          <ul key={n} className="marquee-track">
            {home.capabilities.map((c) => (
              <li key={c} className="flex items-center whitespace-nowrap text-xl text-muted md:text-2xl">
                {c}
                <span className="mx-7 inline-block h-5 w-px rotate-[32deg] bg-accent" />
              </li>
            ))}
          </ul>
        ))}
      </div>

      <Process heading={home.process.heading} tabs={home.process.tabs} />

      {/* Why AlgoNest: bento */}
      <section className="shell py-24 md:py-36">
        <h2 className="h2">{why.heading}</h2>
        <Reveal className="mt-12 grid gap-5 md:grid-cols-12">
          {why.items.map((item, n) => {
            const Icon = whyIcons[n];
            const span = n === 0 || n === 3 ? "md:col-span-7" : "md:col-span-5";
            const art = n === 0 ? "/art/tailored-software-development.webp" : n === 3 ? "/art/automation.webp" : null;
            const tone = art
              ? "bg-slate text-on-art"
              : n === 2
                ? "bg-accent text-on-accent"
                : "border border-line bg-surface";
            return (
              <div key={item.title} className={`t-stagger-line ${span}`} style={i(n)}>
                <TiltCard className="h-full">
                  <div className={`relative flex min-h-[280px] flex-col justify-between p-8 md:min-h-[320px] md:p-10 ${tone}`}>
                    {art && (
                      <>
                        <Image src={art} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover opacity-45" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--slate)] via-transparent to-transparent" />
                      </>
                    )}
                    <Icon size={36} weight="light" aria-hidden="true" className="relative" />
                    <div className="relative">
                      <h3 className="h3">{item.title}</h3>
                      <p className={`mt-3 max-w-[40ch] ${art ? "text-on-art" : n === 2 ? "" : "text-muted"}`}>{item.body}</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </Reveal>
      </section>

      <Cta />
    </>
  );
}
