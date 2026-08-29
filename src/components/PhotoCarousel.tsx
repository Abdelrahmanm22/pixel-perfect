import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { photography } from "@/data/portfolio";

function Card({
  index,
  progress,
  shot,
}: {
  index: number;
  progress: ReturnType<typeof useMotionValue<number>>;
  shot: (typeof photography)[number];
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
      className="absolute left-1/2 top-1/2 w-[62vw] max-w-[380px] -translate-x-1/2 -translate-y-1/2 border-[6px] border-[color:var(--cream)] bg-card shadow-2xl"
    >
      <img
        src={shot.src}
        alt={`${shot.title} — ${shot.client}`}
        loading="lazy"
        draggable={false}
        className="aspect-[3/4] w-full object-cover"
      />
      <figcaption className="flex items-center justify-between gap-2 bg-[color:var(--cream)] px-3 py-2">
        <span className="font-display text-lg uppercase text-[color:var(--ink)]">
          {shot.title}
        </span>
        <span className="meta text-[color:var(--ink)]/60">
          {shot.client} / {shot.year}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function PhotoCarousel() {
  const progress = useMotionValue(Math.floor(photography.length / 2));
  const [active, setActive] = useState(Math.floor(photography.length / 2));
  const dragStart = useRef(0);

  const clamp = (v: number) => Math.max(0, Math.min(photography.length - 1, v));

  return (
    <section id="work" className="relative grid-bg-dark py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg uppercase text-foreground">Selected Work</h2>
          <span className="hand rotate-3 text-2xl md:text-3xl">photography</span>
        </div>
        <p className="meta mt-4">Drag to fan the deck — {photography.length} frames</p>
      </div>

      <div
        className="relative mt-12 h-[62vh] min-h-[420px] select-none"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => {
            dragStart.current = progress.get();
          }}
          onDrag={(_, info) => {
            progress.set(clamp(dragStart.current - info.offset.x / 240));
          }}
          onDragEnd={() => {
            const snapped = clamp(Math.round(progress.get()));
            progress.set(snapped);
            setActive(snapped);
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {photography.map((shot, i) => (
            <Card key={shot.src} index={i} progress={progress} shot={shot} />
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {photography.map((s, i) => (
          <button
            key={s.src}
            aria-label={`Go to ${s.title}`}
            onClick={() => {
              progress.set(i);
              setActive(i);
            }}
            className={`h-[3px] w-8 transition-colors ${
              i === active ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
