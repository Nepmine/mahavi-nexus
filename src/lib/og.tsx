import { ImageResponse } from "next/og";

import { SITE } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Brand tokens, restated as literals — the OG renderer cannot read CSS vars. */
const COLORS = {
  ground: "#faf8f4",
  ink: "#1e232b",
  muted: "#6b7280",
  tech: "#2b6b56",
  techLight: "#4a8574",
  creativeFrom: "#e2683f",
  creativeTo: "#e6b13d",
};

interface OgCardProps {
  /** Small line above the title — the section, or the client. */
  eyebrow: string;
  title: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
}

/**
 * One card layout for every route, so a link to any page on this site is
 * recognisably from this site. Satori supports flexbox only — no grid, and
 * every element with more than one child needs an explicit display.
 */
export function ogCard({ eyebrow, title, subtitle }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: `linear-gradient(160deg, ${COLORS.ground} 0%, #f6f3ec 55%, #eef3f0 100%)`,
          position: "relative",
        }}
      >
        {/* The two blurred blobs from the site hero, flattened into soft discs. */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 480,
            height: 480,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${COLORS.creativeFrom}, ${COLORS.creativeTo})`,
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -120,
            width: 420,
            height: 420,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${COLORS.tech}, ${COLORS.techLight})`,
            opacity: 0.16,
          }}
        />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 700 }}>
          <span style={{ color: COLORS.tech }}>MaHa</span>
          <span style={{ color: COLORS.creativeFrom }}>Vi</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: COLORS.tech,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 58 ? 60 : 74,
              lineHeight: 1.08,
              fontWeight: 700,
              color: COLORS.ink,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 28,
                lineHeight: 1.35,
                color: COLORS.muted,
                maxWidth: 900,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, color: COLORS.muted }}>{SITE.url.replace("https://", "")}</div>
          <div
            style={{
              display: "flex",
              height: 10,
              width: 280,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${COLORS.tech}, ${COLORS.creativeFrom}, ${COLORS.creativeTo})`,
            }}
          />
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
