import { CASE_STUDIES, getCaseStudy } from "@/content/work";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "MaHaVi case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const generateStaticParams = () => CASE_STUDIES.map((c) => ({ slug: c.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  return ogCard({
    eyebrow: study ? `${study.client} · ${study.clientCountry}` : "Case study",
    title: study?.title ?? "Our work",
    subtitle: study?.summary,
  });
}
