import { motion } from "motion/react";
import { services } from "@/data/portfolio";

export function Services() {
  return (
    <section id="services" className="relative grid-bg-dark py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg uppercase text-foreground">
            What I <span className="text-primary">Do</span>
          </h2>
          <span className="hand -rotate-3 text-2xl md:text-3xl">six disciplines</span>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -8, rotate: i % 2 ? 0.6 : -0.6 }}
              className="group relative bg-card p-8 transition-colors hover:bg-[color:var(--charcoal)]"
            >
              <span className="font-display text-5xl text-primary">{s.id}</span>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-wide text-card-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors group-hover:border-primary" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
