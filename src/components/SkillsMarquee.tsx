import { motion, useReducedMotion } from "motion/react";
import { skills } from "@/data/portfolio";

function Row({ reverse = false, duration = 45 }: { reverse?: boolean; duration?: number }) {
  const reduceMotion = useReducedMotion();
  const items = [...skills, ...skills];
  const rest = reverse ? "-50%" : "0%";
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center gap-6 pr-6"
        animate={{ x: reduceMotion ? rest : reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      >
        {items.map((s, i) => (
          <span key={`${s}-${i}`} className="flex shrink-0 items-center gap-6">
            <span className="meta whitespace-nowrap text-foreground/80">{s}</span>
            <span className="text-xs text-primary">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function SkillsMarquee() {
  return (
    <section className="border-y border-border bg-[color:var(--charcoal)] py-6">
      <div className="space-y-3">
        <Row />
        <Row reverse duration={55} />
      </div>
    </section>
  );
}
