import { SERVICES, getService } from "@/content/services";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "MaHaVi service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  return ogCard({
    eyebrow: service?.side === "creative" ? "Creative" : "Technology",
    title: service?.heading ?? "Services",
    subtitle: service?.intro,
  });
}
