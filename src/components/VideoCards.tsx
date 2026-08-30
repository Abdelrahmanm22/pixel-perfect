import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Play, X, ArrowRight } from "lucide-react";
import { films, type Film } from "@/data/films";
import { contact } from "@/data/portfolio";

function Card({ film, onOpen }: { film: Film; onOpen: (f: Film) => void }) {
  return (
    <button
      onClick={() => onOpen(film)}
      className="group relative w-[240px] shrink-0 border border-border bg-card text-left transition-colors hover:border-primary md:w-[280px]"
    >
      <div className="relative overflow-hidden">
        {/* The work is vertical reels, so the cards are 9:16. The one landscape
            film is cover-cropped here and plays at its true aspect in the modal. */}
        <img
          src={film.poster}
          alt={film.title}
          loading="lazy"
          decoding="async"
          className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
            <Play size={18} />
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate font-display text-2xl uppercase tracking-wide text-card-foreground">
            {film.title}
          </h3>
          <span className="meta">{film.duration}</span>
        </div>
        <span className="meta shrink-0 border border-primary px-2 py-1 text-primary">
          {film.category}
        </span>
      </div>
    </button>
  );
}

function Lightbox({ film, onClose }: { film: Film; onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Hold the page still behind the lightbox, and always hand the scrollbar back.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      // Stop playback explicitly — a detached <video> can keep its audio going.
      video.current?.pause();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={film.title}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-5"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full border border-border bg-card ${
          film.vertical ? "max-w-[380px]" : "max-w-3xl"
        }`}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute -top-10 right-0 text-foreground transition-colors hover:text-primary"
        >
          <X size={22} />
        </button>

        {/* preload="none" is why the page ships no video bytes until a card is
            opened — the poster alone carries the section. */}
        <video
          ref={video}
          key={film.slug}
          src={film.src}
          poster={film.poster}
          controls
          autoPlay
          playsInline
          preload="none"
          className={`w-full bg-black ${film.vertical ? "aspect-[9/16]" : "aspect-video"}`}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <h3 className="font-display text-3xl uppercase text-card-foreground">{film.title}</h3>
            <span className="meta">
              {film.category} — {film.duration}
            </span>
          </div>
          <a
            href={contact.portfolio}
            target="_blank"
            rel="noreferrer noopener"
            className="meta inline-flex items-center gap-2 border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            More work <ArrowRight size={14} />
          </a>
        </div>
      </motion.div>
    </motion.div>
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
          // Scaled with the slate: the track is one card-width per film, so the
          // duration has to grow with the count or the marquee speeds up.
          transition={{ repeat: Infinity, ease: "linear", duration: films.length * 6 }}
        >
          {loop.map((f, i) => (
            <Card key={`${f.slug}-${i}`} film={f} onOpen={setOpen} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {open && <Lightbox film={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
