import { useState } from "react";
import { motion } from "motion/react";
import { Instagram, Linkedin, Youtube, Dribbble } from "lucide-react";
import { toast } from "sonner";
import { contact } from "@/data/portfolio";
import signature from "@/assets/signature.jpg.asset.json";
import nameLogo from "@/assets/name-arabic-white.png.asset.json";

const socials = [
  { label: "Instagram", icon: Instagram },
  { label: "Behance", icon: Dribbble },
  { label: "LinkedIn", icon: Linkedin },
  { label: "YouTube", icon: Youtube },
];

export function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <section id="contact" className="relative grid-bg-dark pt-20 md:pt-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="display-xl uppercase leading-[0.82] text-foreground"
        >
          Let's
          <br />
          Create
          <br />
          <span className="text-primary">Together</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <dl className="space-y-4 border-t border-border pt-6">
              <div className="flex flex-wrap items-baseline gap-4">
                <dt className="meta w-24">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="text-lg hover:text-primary">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-4">
                <dt className="meta w-24">Phone</dt>
                <dd>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-lg hover:text-primary"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-4">
                <dt className="meta w-24">Location</dt>
                <dd className="text-lg">{contact.location}</dd>
              </div>
            </dl>

            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>

            <img
              src={signature.url}
              alt="Abdalla Saber signature"
              className="mt-10 h-16 w-auto -rotate-2 opacity-90 mix-blend-screen invert"
            />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              setTimeout(() => {
                setSending(false);
                (e.target as HTMLFormElement).reset();
                toast.success("Message noted — I'll be in touch shortly.");
              }, 600);
            }}
            className="space-y-4 border border-border bg-card p-6"
          >
            <label className="block">
              <span className="meta">Name</span>
              <input
                required
                name="name"
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="meta">Email</span>
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="meta">Message</span>
              <textarea
                required
                name="message"
                rows={4}
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="meta w-full bg-primary px-5 py-3 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-border py-8">
          <img src={nameLogo.url} alt="Abdalla Saber" className="h-6 w-auto opacity-80" />
          <span className="meta">© 2024 Abdalla Saber — Art Director</span>
        </footer>
      </div>
    </section>
  );
}
