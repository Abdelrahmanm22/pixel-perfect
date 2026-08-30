import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { clients } from "@/data/clients";

// Must mirror the grid-cols-* classes on the wall below. CSS grid has no way to
// centre a short last row on its own, so the column count has to be known in JS to
// work out how many slots are left over.
const COLUMNS = [
  { min: 1280, cols: 6 }, // xl
  { min: 1024, cols: 5 }, // lg
  { min: 640, cols: 3 }, // sm
  { min: 0, cols: 2 },
];

function useColumnCount() {
  // Defaults to the widest case so the server-rendered markup matches the primary
  // desktop layout; the fillers are invisible either way.
  const [cols, setCols] = useState(6);

  useEffect(() => {
    const read = () => setCols(COLUMNS.find((c) => window.innerWidth >= c.min)?.cols ?? 2);
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);

  return cols;
}

// Pure geometry, not an empty brand slot — it only carries the card background so
// the leftover space reads as part of the block instead of showing the grey
// container fill that draws the hairlines.
function Filler() {
  return <div aria-hidden className="h-24 bg-card md:h-28" />;
}

function Logo({ client, delay }: { client: (typeof clients)[number]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.04 }}
      className="group flex h-24 items-center justify-center bg-card px-4 transition-colors hover:bg-[color:var(--charcoal)] md:h-28"
    >
      {/* Every logo is generated onto the same 480x240 canvas with its artwork
          area-normalised, so one fixed size balances the whole wall. They are
          already white on transparent — no filter needed, just an opacity lift and
          the red glow on hover. */}
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
  );
}

export function Clients() {
  const cols = useColumnCount();

  // Split the leftovers either side of the last row so it sits centred. Derived
  // from clients.length rather than hardcoded, so adding or dropping a brand
  // re-balances the row instead of silently breaking the layout.
  const remainder = clients.length % cols;
  const free = remainder === 0 ? 0 : cols - remainder;
  const lead = Math.floor(free / 2);
  const splitAt = clients.length - remainder;

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
          {clients.slice(0, splitAt).map((client, i) => (
            <Logo key={client.slug} client={client} delay={(i % cols) * 0.04} />
          ))}

          {Array.from({ length: lead }, (_, i) => (
            <Filler key={`lead-${i}`} />
          ))}

          {clients.slice(splitAt).map((client, i) => (
            <Logo key={client.slug} client={client} delay={((lead + i) % cols) * 0.04} />
          ))}

          {Array.from({ length: free - lead }, (_, i) => (
            <Filler key={`trail-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
