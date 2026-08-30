import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import JsonLd from "@/components/JsonLd";
import { SITE, absoluteUrl } from "@/content/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

import "./globals.css";

/**
 * Both families are self-hosted by next/font: no render-blocking request to
 * fonts.googleapis.com, no third-party round trip before the first word, and
 * a matched fallback metric so switching in does not shift the layout.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Digital Agency for Web, Apps & Branding`,
    // Every page below supplies only its own name; the brand is appended here.
    template: `%s | ${SITE.name}`,
  },
  description: SITE.shortDescription,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "technology",
  alternates: { canonical: SITE.url },
  keywords: [
    "digital agency",
    "web development",
    "web development Nepal",
    "app development",
    "AI integration",
    "SaaS development",
    "branding agency",
    "video production",
    "social media marketing",
    "SEO services",
    "MaHaVi",
    "Mahavi digital agency",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortDescription,
  },
  // Icons and the manifest are picked up from app/icon.svg, app/apple-icon.png,
  // app/favicon.ico and app/manifest.ts — declaring them here as well would
  // emit each link tag twice.
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#faf8f4" }],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* The two showreel clips and the largest hero assets come from the same
            origin, so there is nothing to preconnect to — this is the one
            third-party the page touches, and only when a visitor clicks. */}
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-primary-foreground focus:shadow-elevated"
        >
          Skip to content
        </a>
        {children}
        <JsonLd schemas={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
