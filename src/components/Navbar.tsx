import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import wordmark from "@/assets/generated/wordmark-white.webp";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-display text-2xl leading-none tracking-wide text-foreground">
            AS
          </span>
          <img
            src={wordmark}
            alt="Abdalla Saber"
            className="hidden h-4 w-auto opacity-80 sm:block"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="meta text-foreground/70 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-foreground md:hidden"
        >
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid-bg-dark md:hidden"
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 text-foreground"
            >
              <X size={24} />
            </button>
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-6xl uppercase tracking-wide text-foreground"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
