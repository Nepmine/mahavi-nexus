import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** The fallback card for every route that does not generate its own. */
export default function OpengraphImage() {
  return ogCard({
    eyebrow: "Software Development & Design",
    title: "Where Technology Meets Creativity",
    subtitle: "Custom software, web & app development, UI/UX design and AI — for Nepal and clients worldwide.",
  });
}
