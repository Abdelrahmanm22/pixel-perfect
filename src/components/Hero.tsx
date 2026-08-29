import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import mainPhoto from "@/assets/abdalla-main.jpg.asset.json";
import signature from "@/assets/signature.jpg.asset.json";

const HeroScene = lazy(() => import("./HeroScene"));

export function Hero() {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, 90]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="top" className="relative min-h-svh overflow-hidden grid-bg-dark">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />

      {mounted && (
        <div className="pointer-events-none absolute right-[-6%] top-[8%] h-[70vh] w-[70vw] opacity-40 md:w-[45vw]">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-end gap-6 px-5 pb-16 pt-32 md:grid-cols-12 md:px-10 md:pb-24 md:pt-40">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="meta mb-6"
          >
            30.0444° N, 31.2357° E — Cairo / Giza, EG
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="display-xl uppercase text-foreground"
            >
              Abdalla
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="display-xl uppercase text-primary"
            >
              Saber
            </motion.h1>
          </div>

          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            src={signature.url}
            alt="Abdalla Saber signature"
            className="mt-6 h-16 w-auto -rotate-2 mix-blend-screen invert md:h-24"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-lg"
          >
            <p className="font-display text-3xl uppercase tracking-wide text-foreground md:text-4xl">
              Art Director
            </p>
            <p className="meta mt-2 text-foreground/70">
              Filmmaker • Photographer • Studio Manager
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <span className="meta border border-border px-3 py-1">14+ yrs experience</span>
            <span className="meta">© 2024 — All rights reserved</span>
          </motion.div>
        </div>

        <div className="relative md:col-span-5">
          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <img
              src={mainPhoto.url}
              alt="Portrait of Abdalla Saber"
              className="cutout-photo mx-auto w-full max-w-md rotate-2"
            />
            <span className="hand absolute left-2 top-6 -rotate-6 text-2xl md:text-3xl">
              Cairo, EG
            </span>
            <span className="meta absolute bottom-10 right-0 rotate-90 origin-bottom-right">
              50mm ƒ/1.4 — iso 200
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="meta">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-primary"
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
