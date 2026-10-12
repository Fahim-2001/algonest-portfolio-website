import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ArrowLink } from "@/components/ArrowLink";
import { Cta } from "@/components/Cta";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { articles, getArticle } from "@/content/articles";
import { getService } from "@/content/services";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { type: "article", title: article.title, description: article.excerpt, publishedTime: article.date },
  };
}

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const service = getService(article.service);
  const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(article.date),
  );
  const next = articles[(articles.indexOf(article) + 1) % articles.length];

  return (
    <>
      <article>
        <header className="shell pb-10 pt-32 md:pt-40">
          <Reveal amount={0} className="mx-auto max-w-[820px]">
            <Link
              href="/articles/"
              className="t-stagger-line inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <ArrowLeft size={16} aria-hidden="true" /> All articles
            </Link>
            <h1
              className="t-stagger-line mt-4 text-[clamp(2.25rem,4.6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
              style={i(1)}
            >
              {article.title}
            </h1>
            <p className="t-stagger-line mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted" style={i(2)}>
              <span>By the {site.name} team</span>
              <time dateTime={article.date}>{date}</time>
              <span>{article.minutes} min read</span>
            </p>
          </Reveal>
        </header>

        {service && (
          <div className="shell">
            <ParallaxImage src={service.art} priority sizes="100vw" className="aspect-[4/3] w-full md:aspect-[21/9]" />
          </div>
        )}

        <div className="shell py-14 md:py-20">
          <div className="prose mx-auto max-w-[68ch]">
            <p className="!text-[1.375rem] !leading-[1.55] !text-muted">{article.excerpt}</p>
            {article.body.map((block, n) =>
              block.type === "h2" ? (
                <h2 key={n}>{block.text}</h2>
              ) : block.type === "ul" ? (
                <ul key={n}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={n}>{block.text}</p>
              ),
            )}
          </div>

          {service && (
            <aside className="mx-auto mt-16 max-w-[68ch] rounded-[20px] border border-line bg-surface p-8">
              <p className="text-sm text-muted">This article is about</p>
              <p className="h3 mt-2">{service.name}</p>
              <p className="mt-3 text-muted">{service.summary}</p>
              <ArrowLink href={`/${service.slug}/`} className="mt-4">
                See details<span className="sr-only">: {service.name}</span>
              </ArrowLink>
            </aside>
          )}
        </div>
      </article>

      <section className="shell pb-8">
        <Link href={`/articles/${next.slug}/`} className="group block border-y border-line py-10">
          <span className="block text-sm text-muted">Next article</span>
          <span className="h2 mt-2 block max-w-[24ch] transition-colors duration-300 group-hover:text-accent-text">
            {next.title}
          </span>
        </Link>
      </section>

      <Cta />
    </>
  );
}
