import type { Metadata } from "next";
import Link from "next/link";
import Downloader from "@/components/Downloader";
import { CONTENT, STEPS } from "@/lib/content";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { TOOLS, toolById, type ToolId } from "@/lib/tools";

export function toolMetadata(id: ToolId): Metadata {
  const tool = toolById(id);
  const content = CONTENT[id];
  const isHome = tool.path === "/";
  // Page-level openGraph replaces the parent's, so attach the shared image
  // from app/opengraph-image.tsx explicitly.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: content.h1 }];
  return {
    // The home page title already leads with the brand-free keyword; the
    // layout template adds "| Snaplift" to the others.
    title: isHome ? { absolute: `${content.title} | ${SITE_NAME}` } : content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: { canonical: tool.path },
    openGraph: {
      type: "website",
      url: tool.path,
      siteName: SITE_NAME,
      title: content.title,
      description: content.description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images,
    },
  };
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function LandingPage({ tool: id }: { tool: ToolId }) {
  const tool = toolById(id);
  const content = CONTENT[id];
  const url = absoluteUrl(tool.path);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${SITE_NAME} – ${content.h1}`,
      url,
      description: content.description,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    ...(tool.path === "/"
      ? [
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url,
            description: SITE_DESCRIPTION,
          },
        ]
      : [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: content.h1, item: url },
            ],
          },
        ]),
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      <section className="px-4 pb-16 pt-10 sm:pt-16">
        <h1 className="mx-auto max-w-2xl text-balance text-center text-3xl font-bold tracking-tight sm:text-5xl">
          {content.h1}
        </h1>
        <p className="mx-auto mb-8 mt-4 max-w-xl text-pretty text-center text-muted sm:text-lg">{content.subtitle}</p>
        <Downloader tool={id} />
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted">
          Public content only. Not affiliated with Instagram or Meta. Respect creators&apos; rights.
        </p>
      </section>

      <section aria-labelledby="features" className="px-4 pb-16">
        <div className="mx-auto max-w-5xl">
          <h2 id="features" className="sr-only">
            Features
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.features.map((f) => (
              <li key={f.title} className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="how" aria-labelledby="how-heading" className="scroll-mt-4 border-t border-line bg-surface px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 id="how-heading" className="mb-8 text-center text-2xl font-bold">
            How to use the {content.h1}
          </h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-background p-5">
                <span className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="px-4 py-16">
        <article className="mx-auto max-w-2xl">
          <h2 id="about-heading" className="mb-4 text-2xl font-bold">
            {content.article.heading}
          </h2>
          {content.article.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="mb-4 leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </article>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-4 px-4 pb-16">
        <div className="mx-auto max-w-2xl">
          <h2 id="faq-heading" className="mb-6 text-center text-2xl font-bold">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {content.faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  <h3>{f.q}</h3>
                  <span className="shrink-0 text-muted transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="more-tools" className="border-t border-line bg-surface px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 id="more-tools" className="mb-6 text-center text-2xl font-bold">
            More Instagram tools
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.filter((t) => t.id !== id).map((t) => (
              <li key={t.id}>
                <Link
                  href={t.path}
                  className="block h-full rounded-2xl border border-line bg-background p-5 transition hover:border-accent/50"
                >
                  <span className="font-semibold">{CONTENT[t.id].h1}</span>
                  <span className="mt-1 block text-sm text-muted">{t.about}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
