import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** The fallback card for every route that does not generate its own. */
export default function OpengraphImage() {
  return ogCard({
    eyebrow: "Digital Agency",
    title: "Where Technology Meets Creativity",
    subtitle: "Web & app development, AI, SaaS platforms, branding, video and digital marketing.",
  });
}
