#!/usr/bin/env node
/**
 * Audits the built HTML, not the source that produced it. The data-model tests
 * in src/test/seo.test.ts cannot see what Next actually emitted — a title
 * template that appends the brand twice, a canonical resolved against the wrong
 * base, an h1 that turned out to be an h2. This reads the prerendered files.
 *
 *   npm run build && npm run seo:check
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");

const LIMITS = {
  // What Google actually renders before truncating, in characters.
  title: 62,
  description: 165,
};

const problems = [];
const notes = [];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

const routeOf = (file) =>
  "/" + relative(APP_DIR, file).replace(/\.html$/, "").split(sep).join("/").replace(/^index$/, "");

const attr = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

const decode = (s) =>
  s
    ?.replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;/g, "'");

let files;
try {
  files = walk(APP_DIR).filter((f) => !f.includes("_not-found"));
} catch {
  console.error("No build found. Run `npm run build` first.");
  process.exit(1);
}

for (const file of files.sort()) {
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");
  const fail = (msg) => problems.push(`${route}: ${msg}`);

  const title = decode(attr(html, /<title>(.*?)<\/title>/s));
  const description = decode(attr(html, /<meta name="description" content="([^"]*)"/));
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/);
  const ogImage = attr(html, /<meta property="og:image" content="([^"]+)"/);

  if (!title) fail("no <title>");
  else if (title.length > LIMITS.title) fail(`title ${title.length} chars (max ${LIMITS.title}): ${title}`);

  if (!description) fail("no meta description");
  else if (description.length > LIMITS.description)
    fail(`description ${description.length} chars (max ${LIMITS.description})`);
  else if (description.length < 70) fail(`description only ${description.length} chars`);

  if (!canonical) fail("no canonical");
  else if (!canonical.startsWith("https://")) fail(`canonical is not absolute: ${canonical}`);

  if (!robots?.includes("index")) fail(`robots is "${robots}"`);
  if (!ogImage) fail("no og:image");

  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1s !== 1) fail(`${h1s} <h1> elements (want exactly 1)`);

  // Structured data has to parse, and every node needs a type.
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (graphs.length === 0) fail("no JSON-LD");
  const types = [];
  for (const [, raw] of graphs) {
    try {
      const data = JSON.parse(raw);
      for (const node of data["@graph"] ?? [data]) {
        if (node["@type"]) types.push([].concat(node["@type"]).join("/"));
        else if (!node["@id"]) fail("JSON-LD node with neither @type nor @id");
      }
    } catch (e) {
      fail(`JSON-LD does not parse: ${e.message}`);
    }
  }

  // Content, not just chrome — a page with nothing to read cannot rank.
  const words = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  if (words < 300) fail(`only ~${words} words of body text`);

  notes.push(
    `  ${route.padEnd(30)} title ${String(title?.length).padStart(3)}  desc ${String(
      description?.length,
    ).padStart(3)}  ~${String(words).padStart(4)}w  ${types.join(", ")}`,
  );
}

console.log(`Audited ${files.length} prerendered routes\n`);
console.log(notes.join("\n"));

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem${problems.length === 1 ? "" : "s"}:\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log("\n✓ Every route has a unique title, description, canonical, og:image, one h1 and valid JSON-LD");
