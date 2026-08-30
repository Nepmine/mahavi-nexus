import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "MaHaVi services";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Services",
    title: "Two disciplines, one team",
    subtitle: "Web, apps, AI and SaaS. Branding, video, social and SEO. Bought together.",
  });
}
