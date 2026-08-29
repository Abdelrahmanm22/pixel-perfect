import { motion } from "motion/react";
import { contact } from "@/data/portfolio";

const paragraphs = [
  "With over 14 years of professional experience in photography, videography, and commercial advertising production, I have built a strong track record of delivering high-quality visual content across a wide range of industries. I have worked on product photography for numerous brands, collaborated with international schools, and produced media content for factories and leading companies.",
  "I specialize in creating promotional videos, commercial advertisements, and high-converting sales reels. My experience also includes automotive videography, capturing luxury and sports cars for dealerships, exhibitions, and automotive brands while producing cinematic, engaging promotional content.",
  "Throughout my career, I have produced professional real estate promotional videos and sales-focused reels for numerous real estate companies. I am highly skilled in drone operation for aerial photography and videography, as well as cinematic lighting design, ensuring premium visual quality in every production.",
  "In addition, I have extensive experience covering corporate, commercial, and real estate events, delivering professional photography and video production that meets the highest creative and technical standards.",
];

export function About() {
  return (
    <section id="about" className="relative grid-bg-light py-20 text-[color:var(--ink)] md:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-3">
          <div className="flex items-start gap-4">
            <span className="block h-24 w-[3px] bg-[color:var(--red)]" />
            <span className="font-display text-4xl uppercase tracking-widest [writing-mode:vertical-rl]">
              About
            </span>
          </div>
          <p className="meta mt-8 text-[color:var(--ink)]/60">
            Location: October, Giza, Egypt
          </p>
          <p className="meta mt-1 text-[color:var(--ink)]/60">DOB: June 22, 1999</p>
        </div>

        <div className="md:col-span-9">
          <div className="relative max-w-3xl space-y-6">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="text-base leading-relaxed text-[color:var(--ink)]/85 md:text-lg"
              >
                {p}
              </motion.p>
            ))}
            <span className="hand absolute -top-10 right-0 rotate-6 text-2xl md:text-3xl">
              since 2010 ↘
            </span>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[color:var(--ink)]/15 pt-6">
            <a href={`mailto:${contact.email}`} className="meta text-[color:var(--ink)]/70 hover:text-[color:var(--red)]">
              {contact.email}
            </a>
            <span className="text-[color:var(--red)]">•</span>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="meta text-[color:var(--ink)]/70 hover:text-[color:var(--red)]">
              {contact.phone}
            </a>
            <span className="text-[color:var(--red)]">•</span>
            <span className="meta text-[color:var(--ink)]/70">{contact.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
