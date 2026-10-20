// Google AdSense configuration. Ads render only when NEXT_PUBLIC_ADSENSE_CLIENT
// (ca-pub-XXXXXXXXXXXXXXXX) is set; each placement also needs its ad unit ID.

export const ADSENSE_CLIENT = /^ca-pub-\d{10,20}$/.test(process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "")
  ? process.env.NEXT_PUBLIC_ADSENSE_CLIENT!
  : undefined;

export type AdPlacement = "results" | "inContent" | "article";

// NEXT_PUBLIC_ values are inlined at build time, so each must be referenced literally.
export const AD_SLOTS: Record<AdPlacement, string | undefined> = {
  results: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULTS,
  inContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
  article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE,
};

/**
 * Serve AdSense test ads everywhere except the Vercel production deployment
 * (including local `next start`), so your own clicks never count as invalid traffic.
 */
export const ADS_TEST_MODE = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";
