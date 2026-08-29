import { motion } from "motion/react";
import { bts } from "@/data/portfolio";

const tilts = ["-3deg", "2deg", "-1.5deg", "3deg", "-2.5deg", "1.5deg"];

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

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
          {bts.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -8, rotate: 0 }}
              style={{ rotate: tilts[i % tilts.length] ?? "0deg", marginTop: i % 2 ? "2.5rem" : 0 }}
              className={`bg-[color:var(--off-white)] p-3 shadow-xl ${
                i % 3 === 1 ? "border-4 border-[color:var(--red)]" : ""
              }`}
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="meta mt-3 text-[color:var(--ink)]/70">
                {item.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
