import { Plus } from "lucide-react";

/**
 * Native <details>, so every answer is in the HTML on the first response.
 * A JS accordion would hide the text from anything that does not run scripts —
 * which is the opposite of the point, since this is what FAQ rich results read.
 */
const FaqList = ({ faqs, heading = "Frequently asked" }: { faqs: { q: string; a: string }[]; heading?: string }) => (
  <section className="py-20 bg-muted/30">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 reveal">FAQ</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10 reveal">{heading}</h2>
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details key={q} className="reveal group glass rounded-2xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
                <h3 className="font-heading text-base md:text-lg font-semibold text-foreground">{q}</h3>
                <Plus
                  size={20}
                  className="mt-0.5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default FaqList;
