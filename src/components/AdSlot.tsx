"use client";

import { useEffect, useRef } from "react";
import { ADS_TEST_MODE, AD_SLOTS, ADSENSE_CLIENT, type AdPlacement } from "@/lib/ads";

// Dev-only: show labelled placeholders for unconfigured slots so placements can
// be reviewed locally (set NEXT_PUBLIC_AD_PREVIEW=1 in .env.development.local).
const AD_PREVIEW = process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_AD_PREVIEW === "1";

function AdPreview({ placement, className }: { placement: AdPlacement; className: string }) {
  return (
    <aside aria-label="Advertisement preview" className={`mx-auto w-full max-w-3xl ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-wider text-muted">Advertisement</p>
      <div className="flex min-h-[250px] flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 text-center text-sm text-muted">
        <span className="font-semibold text-accent">Ad slot: {placement}</span>
        <span>Responsive display ad · preview only (dev)</span>
      </div>
    </aside>
  );
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A responsive AdSense unit with a reserved height (to avoid layout shift).
 * Renders nothing until both the publisher ID and this placement's slot ID are
 * configured; collapses if AdSense has no ad to fill it.
 */
export default function AdSlot({ placement, className = "" }: { placement: AdPlacement; className?: string }) {
  const slot = AD_SLOTS[placement];
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || !ref.current || ref.current.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Blocked by an ad blocker or not ready; leave the slot empty.
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) {
    return AD_PREVIEW ? <AdPreview placement={placement} className={className} /> : null;
  }

  return (
    <aside aria-label="Advertisement" className={`ad-wrap mx-auto w-full max-w-3xl ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-wider text-muted">Advertisement</p>
      <div className="flex min-h-[250px] items-center justify-center">
        <ins
          ref={ref}
          className="adsbygoogle block w-full"
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          {...(ADS_TEST_MODE ? { "data-adtest": "on" } : {})}
        />
      </div>
    </aside>
  );
}
