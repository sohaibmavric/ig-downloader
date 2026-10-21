// Canonical site settings used for metadata, sitemap and structured data.
// Set NEXT_PUBLIC_SITE_URL to the production origin (e.g. https://example.com).
// On Vercel it falls back to the project's production domain automatically.

const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelProductionUrl ? `https://${vercelProductionUrl}` : "http://localhost:3000")
).replace(/\/$/, "");
export const SITE_NAME = "IG Video Exporter";
export const SITE_TAGLINE = "Instagram Video, Reels & Photo Downloader";
export const SITE_DESCRIPTION =
  "Download Instagram videos, reels, photos, stories and audio in original quality. Free, fast, no login and no watermark.";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sohaib@mavrictech.com";

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
