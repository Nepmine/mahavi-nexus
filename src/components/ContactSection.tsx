import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would connect to backend
    alert("Thank you! We'll be in touch soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent("Hi MaHaVi! I'm interested in your services.")}`;

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
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project Details</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full gradient-tech rounded-xl py-3.5 text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all glow-primary"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
            >
              <MessageCircle size={20} />
              Or connect via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
