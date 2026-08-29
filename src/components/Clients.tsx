import { motion } from "motion/react";
import { clients } from "@/data/portfolio";

export function Clients() {
  return (
    <section id="clients" className="relative grid-bg-dark py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg uppercase text-foreground">
            Trusted <span className="text-primary">By</span>
          </h2>
          <span className="meta">{clients.length}+ brands</span>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {clients.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
              whileHover={{ scale: 1.04 }}
              className="flex h-24 items-center justify-center bg-card px-3 text-center transition-colors hover:bg-[color:var(--charcoal)]"
            >
              <span className="font-display text-xl uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
