import type { Metadata } from "next";

import BrandStrip from "@/components/BrandStrip";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import DualExperience from "@/components/DualExperience";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import HeroSection from "@/components/HeroSection";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import ScrollReveal from "@/components/ScrollReveal";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import { SITE, absoluteUrl } from "@/content/site";
import { SERVICES } from "@/content/services";
import { pageMetadata, orgRef } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${SITE.name} — Digital Agency for Web, Apps & Branding`,
    description:
      "MaHaVi is a digital agency where technology meets creativity — web and app development, AI integration, SaaS platforms, branding, video and marketing.",
    path: "/",
  }),
  // The homepage owns the bare domain; the layout's template would otherwise
  // append the brand a second time.
  title: {
    absolute: `${SITE.name} — Digital Agency for Web, Apps & Branding`,
  },
};

/** The service catalogue, so the homepage itself declares what is on offer. */
const offerCatalog = {
  "@type": "OfferCatalog",
  name: "Digital agency services",
  itemListElement: SERVICES.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.desc,
      url: absoluteUrl(`/services/${service.slug}`),
      provider: orgRef,
    },
  })),
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollReveal />
      <Navbar />
      <main id="main">
        <HeroSection />
        <BrandStrip />
        <DualExperience />
        <WhyChooseUs />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
      <JsonLd
        schemas={[
          {
            "@type": "WebPage",
            "@id": `${SITE.url}/#webpage`,
            url: absoluteUrl("/"),
            name: `${SITE.name} — ${SITE.tagline}`,
            description: SITE.shortDescription,
            isPartOf: { "@id": `${SITE.url}/#website` },
            about: orgRef,
            primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/opengraph-image") },
          },
          { ...orgRef, hasOfferCatalog: offerCatalog },
        ]}
      />
    </div>
  );
}
