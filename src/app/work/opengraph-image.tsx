import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "MaHaVi portfolio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Portfolio",
    title: "Work that speaks",
    subtitle: "Platforms, websites and creative work for clients in Nepal, Australia and beyond.",
  });
}
