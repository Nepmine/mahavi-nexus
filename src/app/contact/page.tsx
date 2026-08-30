import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";

import ContactSection from "@/components/ContactSection";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import FaqList from "@/components/page/FaqList";
import PageHero from "@/components/page/PageHero";
import { SITE, absoluteUrl, whatsappUrl } from "@/content/site";
import { breadcrumbSchema, faqSchema, orgRef, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact MaHaVi — Start a Project",
  absoluteTitle: true,
  description:
    "Talk to MaHaVi about a website, an app, a platform or a brand. Email, WhatsApp, or send the form — we reply within 24 hours.",
  path: "/contact",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const channels = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: SITE.phoneDisplay,
    href: whatsappUrl(),
    note: "Fastest — usually answered same day",
    external: true,
  },
  {
    Icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: "Best for briefs and documents",
    external: false,
  },
  {
    Icon: MapPin,
    label: "Where we are",
    value: `${SITE.address.locality}, ${SITE.address.countryName}`,
    note: "Working with clients worldwide",
  },
  {
    Icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
    note: "Every enquiry gets a real reply",
  },
];

const briefChecklist = [
  "What the thing is, in one or two sentences — the problem before the solution",
  "Who it is for, and what you want them to do",
  "Anything that already exists: a site, a brand, a codebase, a deadline",
  "A budget range, even a rough one — it changes what we recommend, not whether we reply",
];

const afterYouSend = [
  {
    step: "We read it properly",
    detail:
      "A person reads the brief, not a form router. If something is unclear we ask one or two questions rather than booking a call to find out.",
  },
  {
    step: "You get a real answer within 24 hours",
    detail:
      "Whether we are the right fit, roughly what it takes, and roughly what it costs. If we are not the right fit we say so and point you somewhere better.",
  },
  {
    step: "Then a scope, if you want one",
    detail:
      "Written scope, timeline and a fixed number, with the assumptions listed. No discovery-call funnel and no pressure to sign in the room.",
  },
];

const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope, and anyone quoting before hearing the brief is guessing. What we can say: a marketing site is a different order of magnitude from a platform with accounts and payments, and we will tell you which one you are describing in the first reply rather than after three meetings.",
  },
  {
    q: "Do you work with clients outside Nepal?",
    a: "Yes — a large share of our work is for clients abroad, including Australia. We overlap working hours where we can, keep everything in writing, and give you a staging URL from the first week so progress is visible rather than reported.",
  },
  {
    q: "What if we only need part of a project?",
    a: "That is common and completely fine. Brand only, a rebuild of an existing site, an API for an app someone else is building, or an SEO fix on a site we did not make. We are happy to take the piece you actually need.",
  },
  {
    q: "How quickly can you start?",
    a: "Usually within one to two weeks of a signed scope. If you have a hard deadline, tell us in the first message — it is the single thing most likely to change what we propose.",
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Get in touch"
        trail={trail}
        title={
          <>
            Turn your idea into <span className="gradient-text-creative">reality</span>
          </>
        }
        lead="Tell us what you are trying to build and what is in the way. You will get a real answer — including when the honest answer is that you need less than you think."
      />

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map(({ Icon, label, value, href, note, external }) => {
              const body = (
                <>
                  <Icon size={22} className="text-primary mb-4" aria-hidden />
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
                  <p className="font-heading font-bold text-foreground break-words">{value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{note}</p>
                </>
              );
              const className = "reveal glass rounded-2xl p-6 hover-lift block h-full";
              return href ? (
                <a
                  key={label}
                  href={href}
                  className={className}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {body}
                </a>
              ) : (
                <div key={label} className={className}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="reveal">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                Before you write
              </p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                What makes a brief useful
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                None of this is required — a single line is a fine way to start. But a message with
                these four things in it gets a far more useful reply than one without.
              </p>
              <ul className="space-y-4">
                {briefChecklist.map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                After you send
              </p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">What happens next</h2>
              <ol className="space-y-6">
                {afterYouSend.map(({ step, detail }, i) => (
                  <li key={step} className="flex gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-tech font-heading font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1.5">{step}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      <FaqList faqs={faqs} heading="Before you get in touch" />

      <JsonLd
        schemas={[
          breadcrumbSchema(trail),
          faqSchema(faqs),
          {
            "@type": "ContactPage",
            "@id": `${absoluteUrl("/contact")}#webpage`,
            url: absoluteUrl("/contact"),
            name: "Contact MaHaVi",
            description: "Email, WhatsApp or send a brief. We reply within 24 hours.",
            mainEntity: orgRef,
            isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          },
        ]}
      />
    </PageShell>
  );
}
