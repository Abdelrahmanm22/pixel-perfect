import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Play, X, ArrowRight } from "lucide-react";
import { films, contact, type Film } from "@/data/portfolio";

function Card({ film, onOpen }: { film: Film; onOpen: (f: Film) => void }) {
  return (
    <button
      onClick={() => onOpen(film)}
      className="group relative w-[300px] shrink-0 border border-border bg-card text-left transition-colors hover:border-primary md:w-[380px]"
    >
      <div className="relative overflow-hidden">
        <img
          src={film.thumb}
          alt={film.title}
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
            <Play size={18} />
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <h3 className="font-display text-2xl uppercase tracking-wide text-card-foreground">
            {film.title}
          </h3>
          <span className="meta">{film.meta}</span>
        </div>
        <span className="meta border border-primary px-2 py-1 text-primary">{film.category}</span>
      </div>
    </button>
  );
}

export function VideoCards() {
  const [open, setOpen] = useState<Film | null>(null);
  const reduceMotion = useReducedMotion();
  const loop = [...films, ...films];

  return (
    <section id="showreel" className="relative grid-bg-dark py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg uppercase text-foreground">
            Show<span className="text-primary">reel</span>
          </h2>
          <a
            href={contact.portfolio}
            target="_blank"
            rel="noreferrer noopener"
            className="meta inline-flex -rotate-1 items-center gap-2 bg-primary px-5 py-3 text-primary-foreground transition-transform hover:rotate-0"
          >
            View full videos <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* The padding lives on the wrapper and the trailing pr-6 matches the gap, so
          the -50% loop point lands exactly one set along with no seam. */}
      <div className="relative mt-12 overflow-hidden pl-5 md:pl-10">
        <motion.div
          className="flex gap-6 pr-6"
          animate={{ x: reduceMotion ? "0%" : ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {loop.map((f, i) => (
            <Card key={`${f.title}-${i}`} film={f} onOpen={setOpen} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-5"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl border border-border bg-card"
            >
              <button
                aria-label="Close"
                onClick={() => setOpen(null)}
                className="absolute -top-10 right-0 text-foreground"
              >
                <X size={22} />
              </button>
              {open.url ? (
                <iframe
                  src={open.url}
                  title={open.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              ) : (
                <img
                  src={open.thumb}
                  alt={open.title}
                  className="aspect-video w-full object-cover"
                />
              )}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="font-display text-3xl uppercase text-card-foreground">
                    {open.title}
                  </h3>
                  <span className="meta">
                    {open.category} — {open.meta}
                  </span>
                </div>
                <a
                  href={contact.portfolio}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="meta inline-flex items-center gap-2 border border-primary px-4 py-2 text-primary"
                >
                  Watch on drive <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
