import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "About MaHaVi";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "About",
    title: "Engineering and creative, one team",
    subtitle: "Most projects fail in the gap between two suppliers. We removed the gap.",
  });
}
