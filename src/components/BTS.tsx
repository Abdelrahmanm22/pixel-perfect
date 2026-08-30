import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { bts, type BTSClip } from "@/data/bts";

// Per-slot collage geometry. Three tall frames on one baseline read flat, so each
// gets its own tilt, vertical offset and width. The stagger only applies from md
// up, where there is room for it; below that the third frame centres itself under
// the first two rather than leaving a ragged hole.
const SLOTS = [
  { tilt: "-3deg", frame: "md:mt-0 md:max-w-[92%]" },
  { tilt: "2deg", frame: "md:mt-16 md:max-w-full" },
  {
    tilt: "-1.5deg",
    frame: "col-span-2 mx-auto max-w-[62%] md:col-span-1 md:mx-0 md:ml-auto md:mt-6 md:max-w-[85%]",
  },
];

function Clip({ clip, index }: { clip: BTSClip; index: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const slot = SLOTS[index % SLOTS.length]!;

  const play = useCallback(() => {
    const v = video.current;
    if (!v) return;
    // Hovering is not a user gesture as far as the autoplay policy is concerned, so
    // play() is only permitted while the element is genuinely muted. React sets
    // `muted` as a property rather than a reflected attribute, so assert it here
    // instead of trusting hydration.
    v.muted = true;
    // Rejects if the pointer leaves before the first frame decodes, or if playback
    // is refused outright. Both are expected — swallow them rather than let React
    // surface an unhandled rejection on every fast mouse-over.
    v.play().then(
      () => setPlaying(true),
      () => {},
    );
  }, []);

  const stop = useCallback(() => {
    const v = video.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  }, []);

  // Hover and focus-to-play are desktop affordances. On touch there is no hover,
  // and under reduced motion nothing should start moving on its own — both fall
  // back to the explicit click toggle, which is always wired up.
  const autoplays = !isMobile && !reduceMotion;
  const auto = autoplays
    ? { onMouseEnter: play, onMouseLeave: stop, onFocus: play, onBlur: stop }
    : {};

  return (
    <motion.figure
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -8, rotate: 0 }}
      style={{ rotate: slot.tilt }}
      className={`bg-[color:var(--off-white)] p-3 shadow-xl ${slot.frame} ${
        index === 1 ? "border-4 border-[color:var(--red)]" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => (playing ? stop() : play())}
        aria-pressed={playing}
        aria-label={`${playing ? "Stop" : "Play"} ${clip.caption}`}
        className="relative block w-full outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--red)]"
        {...auto}
      >
        {/* preload="none" is why the section ships posters only until someone
            hovers or taps a card. */}
        <video
          ref={video}
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="none"
          className="aspect-[9/16] w-full bg-[color:var(--ink)]/5 object-cover"
        />
        <span
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-[color:var(--red)] text-[color:var(--cream)] shadow-lg">
            <Play size={16} />
          </span>
        </span>
      </button>
      <figcaption className="meta mt-3 text-[color:var(--ink)]/70">{clip.caption}</figcaption>
    </motion.figure>
  );
}

export function BTS() {
  return (
    <section id="bts" className="relative grid-bg-light py-20 text-[color:var(--ink)] md:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg uppercase">
            Behind the <span className="text-[color:var(--red)]">Scenes</span>
          </h2>
          <span className="hand -rotate-3 text-2xl md:text-3xl">the process</span>
        </div>

        <div className="mt-14 grid grid-cols-2 items-start gap-6 md:grid-cols-3 md:gap-10">
          {bts.map((clip, i) => (
            <Clip key={clip.slug} clip={clip} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
