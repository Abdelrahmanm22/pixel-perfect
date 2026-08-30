import { useCallback, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { work, type Shot } from "@/data/work";

function Card({
  index,
  progress,
  shot,
}: {
  index: number;
  progress: ReturnType<typeof useMotionValue<number>>;
  shot: Shot;
}) {
  const offset = useTransform(progress, (p) => index - p);
  const x = useTransform(offset, (o) => o * 240);
  const rotateY = useTransform(offset, (o) => Math.max(-45, Math.min(45, -o * 18)));
  const rotate = useTransform(offset, (o) => o * 2);
  const scale = useTransform(offset, (o) => Math.max(0.7, 1 - Math.abs(o) * 0.12));
  const y = useTransform(offset, (o) => Math.abs(o) * 26);
  const opacity = useTransform(offset, (o) => Math.max(0, 1 - Math.abs(o) * 0.22));
  const zIndex = useTransform(offset, (o) => 100 - Math.round(Math.abs(o) * 10));

  return (
    <motion.figure
      style={{ x, y, rotate, rotateY, scale, opacity, zIndex }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-[6px] border-[color:var(--cream)] bg-card shadow-2xl"
    >
      {/* The set runs from 3:2 landscapes to 0.56 verticals, so the card is sized
          by height and lets width follow the photo — nothing gets cropped. The
          third min() term caps the height so the derived width can never exceed
          78vw, which is what keeps a landscape frame on a phone screen. */}
      <img
        src={shot.src}
        alt={`${shot.title}, ${shot.year}`}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        draggable={false}
        style={{ height: `min(38vh, 420px, calc(78vw / ${shot.width / shot.height}))` }}
        className="block w-auto"
      />
      <figcaption className="flex items-center justify-between gap-3 bg-[color:var(--cream)] px-3 py-2">
        <span className="font-display text-lg uppercase text-[color:var(--ink)]">{shot.title}</span>
        <span className="meta text-[color:var(--ink)]/60">{shot.year}</span>
      </figcaption>
    </motion.figure>
  );
}

const clamp = (v: number) => Math.max(0, Math.min(work.length - 1, v));

export function PhotoCarousel() {
  const progress = useMotionValue(Math.floor(work.length / 2));
  const [active, setActive] = useState(Math.floor(work.length / 2));
  const dragStart = useRef(0);

  // Springs the deck to a card instead of snapping the motion value outright,
  // which is what made drag-release jump.
  const goTo = useCallback(
    (index: number) => {
      const target = clamp(index);
      setActive(target);
      animate(progress, target, { type: "spring", stiffness: 260, damping: 30 });
    },
    [progress],
  );

  return (
    <section id="work" className="relative grid-bg-dark py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg uppercase text-foreground">Selected Work</h2>
          <span className="hand rotate-3 text-2xl md:text-3xl">photography</span>
        </div>
        <p className="meta mt-4">Drag or use the arrow keys — {work.length} frames</p>
      </div>

      <div
        className="relative mt-12 h-[62vh] min-h-[420px] select-none"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          role="group"
          aria-roledescription="carousel"
          aria-label="Selected photography"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              goTo(active - 1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              goTo(active + 1);
            }
          }}
          className="absolute inset-0 cursor-grab outline-none active:cursor-grabbing focus-visible:ring-1 focus-visible:ring-primary"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => {
            dragStart.current = progress.get();
          }}
          onDrag={(_, info) => {
            progress.set(clamp(dragStart.current - info.offset.x / 240));
          }}
          onDragEnd={() => goTo(Math.round(progress.get()))}
          style={{ transformStyle: "preserve-3d" }}
        >
          {work.map((shot, i) => (
            <Card key={shot.slug} index={i} progress={progress} shot={shot} />
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          aria-label="Previous frame"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          className="flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="flex gap-2">
          {work.map((s, i) => (
            <button
              key={s.slug}
              aria-label={`Go to ${s.title}, ${s.year}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-[3px] w-8 transition-colors ${
                i === active ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        <button
          aria-label="Next frame"
          onClick={() => goTo(active + 1)}
          disabled={active === work.length - 1}
          className="flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
