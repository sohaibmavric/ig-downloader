import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { formatDate, POSTS } from "@/lib/blog";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const title = "Instagram Guides & Tips";
const description =
  "Step-by-step guides for saving Instagram reels, photos, stories, audio and profile pictures on iPhone, Android and desktop.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function BlogIndex() {
  return (
    <div className="px-4 pb-16 pt-10 sm:pt-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE_NAME} Blog`,
          url: absoluteUrl("/blog"),
          description,
          blogPost: POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.published,
          })),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-balance text-center text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-muted sm:text-lg">{description}</p>
        <ul className="mt-12 grid gap-4">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="block rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/50"
              >
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
                <p className="mt-3 text-xs text-muted">
                  <time dateTime={p.published}>{formatDate(p.published)}</time> · {p.readingMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
