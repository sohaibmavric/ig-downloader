import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { CONTENT } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "multimedia",
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold" aria-label={`${SITE_NAME} home`}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-white" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
              </svg>
            </span>
            {SITE_NAME}
          </Link>
          <nav aria-label="Main" className="flex gap-1 text-sm text-muted">
            <a href="#how" className="rounded-lg px-2.5 py-1.5 hover:bg-surface-strong hover:text-foreground">How it works</a>
            <a href="#faq" className="rounded-lg px-2.5 py-1.5 hover:bg-surface-strong hover:text-foreground">FAQ</a>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-line px-4 py-10 text-sm">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Downloaders" className="mb-6">
              <h2 className="mb-3 font-semibold">Downloaders</h2>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-muted sm:grid-cols-3">
                {TOOLS.map((t) => (
                  <li key={t.id}>
                    <Link href={t.path} className="hover:text-foreground">
                      {CONTENT[t.id].h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="text-xs text-muted">
              © {SITE_NAME}. Not affiliated with Instagram or Meta. Only download content you have the right to use.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
