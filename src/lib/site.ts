// Canonical site settings used for metadata, sitemap and structured data.
// Set NEXT_PUBLIC_SITE_URL to the production origin (e.g. https://snaplift.app).

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "Snaplift";
export const SITE_TAGLINE = "Instagram Video, Reels & Photo Downloader";
export const SITE_DESCRIPTION =
  "Download Instagram videos, reels, photos, stories and audio in original quality. Free, fast, no login and no watermark.";

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
