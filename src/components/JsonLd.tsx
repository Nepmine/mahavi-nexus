/**
 * One `@graph` per page. Emitting a single graph rather than several loose
 * scripts lets nodes reference each other by `@id` — the Organization is
 * declared once in the layout and pointed at from every page below it.
 */
const JsonLd = ({ schemas }: { schemas: Record<string, unknown>[] }) => (
  <script
    type="application/ld+json"
    // The payload is built from typed literals in src/lib/seo.ts — no user input
    // reaches it, and JSON.stringify escapes the rest.
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schemas }),
    }}
  />
);

export default JsonLd;
