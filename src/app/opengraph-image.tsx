import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} – ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const svg = await readFile(join(process.cwd(), "src/app/icon.svg"));
  const icon = `data:image/svg+xml;base64,${svg.toString("base64")}`;
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
          <img src={icon} width={96} height={96} alt="" />
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
