import { CASE_STUDIES, PROJECT_DETAILS, getCaseStudy, getProjectDetail } from "@/content/work";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "MaHaVi project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const generateStaticParams = () => [
  ...CASE_STUDIES.map((c) => ({ slug: c.slug })),
  ...PROJECT_DETAILS.map((p) => ({ slug: p.slug })),
];

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const study = getCaseStudy(slug);
  if (study) {
    return ogCard({
      eyebrow: `${study.client} · ${study.clientCountry}`,
      title: study.title,
      subtitle: study.summary,
    });
  }

  const detail = getProjectDetail(slug);
  return ogCard({
    eyebrow: detail?.category ?? "Our work",
    title: detail?.title ?? "Our work",
    subtitle: detail?.summary,
  });
}
