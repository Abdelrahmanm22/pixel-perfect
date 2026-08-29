import { motion } from "motion/react";
import { toast } from "sonner";
import { contact } from "@/data/portfolio";
import wordmark from "@/assets/generated/wordmark-white.webp";

// No backend here — the form hands the message to the visitor's mail client
// addressed to Abdalla, so nothing on the page pretends to have sent something.
function composeEmail(form: HTMLFormElement) {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "");
  const email = String(data.get("email") ?? "");
  const message = String(data.get("message") ?? "");

  const subject = `Project enquiry — ${name}`;
  const body = `${message}\n\n—\n${name}\n${email}`;

  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
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

            <a
              href={contact.portfolio}
              target="_blank"
              rel="noreferrer noopener"
              className="meta mt-8 inline-flex items-center gap-2 border border-primary px-4 py-3 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Full portfolio on Drive
            </a>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              window.location.href = composeEmail(form);
              form.reset();
              toast.success("Opening your mail app with the message ready to send.");
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
              className="meta w-full bg-primary px-5 py-3 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send message
            </button>
            <p className="meta text-foreground/40">Opens in your mail app</p>
          </form>
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-border py-8">
          <img src={wordmark} alt="Abdalla Saber" className="h-6 w-auto opacity-80" />
          <span className="meta">© {new Date().getFullYear()} Abdalla Saber — Art Director</span>
        </footer>
      </div>
    </section>
  );
}
