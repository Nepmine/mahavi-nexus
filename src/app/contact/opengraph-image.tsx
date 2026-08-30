import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { SITE } from "@/content/site";

export const alt = "Contact MaHaVi";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Get in touch",
    title: "Turn your idea into reality",
    subtitle: `${SITE.email} · WhatsApp ${SITE.phoneDisplay} · a reply within 24 hours.`,
  });
}
