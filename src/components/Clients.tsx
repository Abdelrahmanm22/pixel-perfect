import { motion } from "motion/react";
import { clients } from "@/data/clients";

export function Clients() {
  return (
    <section id="clients" className="relative grid-bg-dark py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg uppercase text-foreground">
            Trusted <span className="text-primary">By</span>
          </h2>
          <span className="meta">{clients.length} brands</span>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {clients.map((client, i) => (
            <motion.div
              key={client.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
              whileHover={{ scale: 1.04 }}
              className="group flex h-24 items-center justify-center bg-card px-4 transition-colors hover:bg-[color:var(--charcoal)] md:h-28"
            >
              {/* Every logo is generated onto the same 480x240 canvas with its
                  artwork area-normalised, so one fixed size balances the whole wall.
                  They are already white on transparent — no filter needed, just an
                  opacity lift and the red glow on hover. */}
              <img
                src={client.logo}
                alt={client.name}
                width={480}
                height={240}
                loading="lazy"
                decoding="async"
                className="h-16 w-32 object-contain opacity-45 transition duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_18px_rgba(230,57,70,0.35)] md:h-20 md:w-40"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
