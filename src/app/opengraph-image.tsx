import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} – ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #fff1f5 0%, #fafaf9 60%)",
          color: "#1c1917",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "#e1306c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
            </svg>
          </div>
          <div style={{ fontSize: 56, fontWeight: 700 }}>{SITE_NAME}</div>
        </div>
        <div style={{ marginTop: 48, fontSize: 72, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2 }}>
          Download Instagram videos, reels &amp; photos
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#6b6560" }}>
          Original quality · No login · No watermark
        </div>
      </div>
    ),
    size,
  );
}
