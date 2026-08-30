// Selected Work carousel. Images are generated from "src/assets/Selected Work
// Images/" by `npm run optimize:assets`; the masters are gitignored.
//
// There is no client data in this set — the filenames carry a title and a year and
// nothing else — so cards are captioned title + year rather than inventing clients.

import manifest from "../assets/generated/work/manifest.json";

const files = import.meta.glob("../assets/generated/work/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type Shot = {
  slug: string;
  title: string;
  year: string;
  src: string;
  /** Emitted dimensions, read from the generated manifest so the carousel can
   *  reserve the right box before the image loads. */
  width: number;
  height: number;
};

// Ordered so the deck opens on the documentary work rather than a product shot.
const SHOTS: ReadonlyArray<{ slug: string; title: string; year: string }> = [
  { slug: "hardship", title: "Hardship", year: "2026" },
  { slug: "urban-scenes", title: "Urban Scenes", year: "2026" },
  { slug: "street-documentary", title: "Street & Documentary", year: "2026" },
  // The only filename without a year. It shares dimensions, file size and date
  // with the Bentley strip, so 2026 is inferred from that pairing — correct it
  // here if the shoot was actually another year.
  { slug: "rolls-royce", title: "Rolls-Royce", year: "2026" },
  { slug: "fashion-2017", title: "Fashion", year: "2017" },
  { slug: "fashion-2018", title: "Fashion", year: "2018" },
  { slug: "fashion-2025", title: "Fashion", year: "2025" },
  { slug: "commercial-photography", title: "Commercial Photography", year: "2024" },
  { slug: "tobacco", title: "Tobacco", year: "2024" },
  { slug: "luxury-automotive", title: "Luxury Automotive", year: "2026" },
  { slug: "fashion-2015", title: "Fashion", year: "2015" },
];

const sizes = new Map(manifest.map((m) => [m.slug, m]));

export const work: Shot[] = SHOTS.flatMap((shot) => {
  const src = files[`../assets/generated/work/${shot.slug}.webp`];
  const size = sizes.get(shot.slug);
  if (!src || !size) {
    // A renamed master or a stale generated/ directory. Drop the card rather than
    // rendering a broken image in the middle of the deck.
    if (import.meta.env.DEV) {
      console.warn(`[work] no image for "${shot.slug}" — run: npm run optimize:assets`);
    }
    return [];
  }
  return [{ ...shot, src, width: size.width, height: size.height }];
});
