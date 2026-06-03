import { useState } from "react";
import { Send, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";

const WHATSAPP_NUMBER = "9779866140033";
const WHATSAPP_MSG = encodeURIComponent("Hi, I want to know more about MaHaVi.");
const EMAIL = "contactmahavi+main-website@gmail.com";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const validate = () => {
    const result = contactSchema.safeParse(form);
    if (result.success) { setErrors({}); return true; }
    const fieldErrors: FormErrors = {};
    result.error.issues.forEach((i) => {
      const key = i.path[0] as keyof FormErrors;
      if (!fieldErrors[key]) fieldErrors[key] = i.message;
    });
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    // mailto fallback — opens email client
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`New inquiry from ${form.name}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto, "_blank");

    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 600);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-300 ${
      errors[field] ? "border-destructive focus:ring-destructive/30" : "border-border focus:ring-primary/30 focus:border-primary/40"
    }`;

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Turn Your Idea Into Reality
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Tell us about your project. We'll get back to you within 24 hours.
          </p>
        </div>

        <div className="max-w-xl mx-auto reveal">
          {status === "success" ? (
            <div className="glass rounded-2xl p-10 text-center animate-scale-in">
              <CheckCircle size={48} className="text-primary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10 space-y-5">
              {(["name", "email", "message"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-foreground mb-2 capitalize">{field === "message" ? "Project Details" : field}</label>
                  {field === "message" ? (
                    <textarea
                      rows={4}
                      value={form[field]}
                      onChange={(e) => { setForm({ ...form, [field]: e.target.value }); setErrors({ ...errors, [field]: undefined }); }}
                      className={`${inputClass(field)} resize-none`}
                      placeholder="Tell us about your project..."
                    />
                  ) : (
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                      onChange={(e) => { setForm({ ...form, [field]: e.target.value }); setErrors({ ...errors, [field]: undefined }); }}
                      className={inputClass(field)}
                      placeholder={field === "email" ? "you@company.com" : "Your name"}
                    />
                  )}
                  {errors[field] && (
                    <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 animate-fade-in">
                      <AlertCircle size={12} /> {errors[field]}
                    </p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full gradient-tech rounded-xl py-3.5 text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] glow-primary disabled:opacity-60"
              >
                <Send size={18} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}

          {/* WhatsApp CTA */}
          <div className="mt-8 text-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-primary/20 text-foreground font-semibold hover:border-primary/50 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] animate-pulse-glow"
            >
              <MessageCircle size={22} className="text-primary" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
