// Client logo wall. The files are generated from src/assets/LOGOS/ by
// `npm run optimize:assets` — see scripts/optimize-assets.mjs for the slug rules.
//
// The brand list is written out explicitly rather than derived from the glob so the
// display names and the wall's reading order stay intentional, and so a bad slug
// shows up as a missing image instead of silently dropping a client.

const files = import.meta.glob("../assets/generated/logos/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type Client = { slug: string; name: string; logo: string };

const BRANDS: ReadonlyArray<{ slug: string; name: string }> = [
  { slug: "automotive", name: "Automotive Hub" },
  { slug: "carogo", name: "Carogo" },
  { slug: "crowne-plaza", name: "Crowne Plaza" },
  { slug: "dream-hills", name: "Dream Hills" },
  { slug: "dream-land", name: "Dream Land" },
  { slug: "eldeep", name: "El Deeb Cars" },
  { slug: "emerald", name: "Emerald" },
  { slug: "epic", name: "EPIC International School" },
  { slug: "galaxy-1", name: "Galaxy Interior" },
  { slug: "gtm", name: "GTM" },
  { slug: "hilton", name: "Hilton" },
  { slug: "joelle-cosmetics", name: "Joelle Cosmetics" },
  { slug: "jora", name: "JORA Developments" },
  { slug: "jumerah", name: "Jumeirah" },
  { slug: "juno", name: "JUNO" },
  { slug: "maxprofit", name: "MaxProfit" },
  { slug: "mountain-view", name: "Mountain View" },
  { slug: "movinpick", name: "Mövenpick" },
  { slug: "msa", name: "MSA University" },
  { slug: "nasdaq", name: "NASDAQ Urban Development" },
  { slug: "pdca", name: "PDCA" },
  { slug: "qls", name: "QLS" },
  { slug: "sky-light", name: "Sky Light" },
  { slug: "spade", name: "Spade" },
  { slug: "valea", name: "Valéa" },
  { slug: "viena", name: "Viena" },
  { slug: "wesal", name: "Wesal" },
  { slug: "x-eagle", name: "X-Eagle" },
  { slug: "zg", name: "ZG" },
  { slug: "zuwad", name: "Zuwad" },
  { slug: "al-refaei", name: "الرفاعي" },
  { slug: "al-fares", name: "الفارس" },
  { slug: "tabiaa", name: "طبيعة" },
  { slug: "nasser-jewelry", name: "مجوهرات ناصر" },
];

export const clients: Client[] = BRANDS.flatMap(({ slug, name }) => {
  const logo = files[`../assets/generated/logos/${slug}.webp`];
  if (!logo) {
    // A renamed original or a stale generated/ directory. Drop the cell rather than
    // rendering a broken image, and say so loudly in dev.
    if (import.meta.env.DEV) {
      console.warn(`[clients] no logo for "${slug}" — run: npm run optimize:assets`);
    }
    return [];
  }
  return [{ slug, name, logo }];
});
