import { SERVICES } from "@/content/services";
import { SITE, absoluteUrl } from "@/content/site";
import { CASE_STUDIES, PROJECT_DETAILS } from "@/content/work";

/**
 * The emerging convention for LLM crawlers and answer engines (ChatGPT,
 * Perplexity, Gemini, Copilot) that mirrors what robots.txt does for search
 * crawlers: a single plain-text page that states who this site is and links
 * to the pages worth reading, without the navigation chrome an HTML page
 * carries. Generated from the same content arrays as the sitemap, so it
 * cannot drift out of date the way a hand-written one would.
 */
export const dynamic = "force-static";

function render(): string {
  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.shortDescription}`);
  lines.push("");
  lines.push(
    `${SITE.legalName} is a two-discipline studio — engineering and creative on one team — founded ${SITE.founded}, based in ${SITE.address.locality}, ${SITE.address.countryName}, serving clients in ${SITE.areaServed.slice(0, -1).join(", ")} and beyond. Contact: ${SITE.email}.`,
  );
  lines.push("");

  lines.push("## Services");
  for (const service of SERVICES) {
    lines.push(`- [${service.heading}](${absoluteUrl(`/services/${service.slug}`)}): ${service.metaDescription}`);
  }
  lines.push("");

  lines.push("## Case studies");
  for (const study of CASE_STUDIES) {
    lines.push(
      `- [${study.title} — ${study.client}, ${study.clientCountry}](${absoluteUrl(`/work/${study.slug}`)}): ${study.summary}`,
    );
  }
  lines.push("");

  lines.push("## Other work");
  for (const detail of PROJECT_DETAILS) {
    lines.push(`- [${detail.title}](${absoluteUrl(`/work/${detail.slug}`)}): ${detail.summary}`);
  }
  lines.push("");

  lines.push("## Company");
  lines.push(`- [About](${absoluteUrl("/about")}): who MaHaVi is, how the team works, and pricing philosophy.`);
  lines.push(`- [Services overview](${absoluteUrl("/services")})`);
  lines.push(`- [Work](${absoluteUrl("/work")})`);
  lines.push(`- [Contact](${absoluteUrl("/contact")})`);

  return lines.join("\n") + "\n";
}

export function GET() {
  return new Response(render(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
