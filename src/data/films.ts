// Showreel films. Videos are served from /videos/*.mp4 (written to public/ by
// `npm run optimize:videos`); posters are bundled from src/assets/generated/posters.
// Both come from the masters in src/assets/Videos/, which are gitignored.
//
// Durations are measured from the files. Years are deliberately absent — the file
// timestamps run 2022-2024 but a modified date is not a production date. Add a
// `year` here and render it beside `duration` if you want them shown.

const posters = import.meta.glob("../assets/generated/posters/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type Film = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  poster: string;
  src: string;
  /** 9:16 reel vs 16:9 film — decides how the lightbox sizes itself. */
  vertical: boolean;
};

// Ordered so the marquee doesn't run several identical category badges back to
// back — half the slate is real estate work.
const REELS: ReadonlyArray<Omit<Film, "poster" | "src">> = [
  {
    slug: "automotive-hub",
    title: "Automotive Hub",
    category: "Automotive",
    duration: "0:53",
    vertical: true,
  },
  {
    slug: "zg-developments",
    title: "ZG Developments",
    category: "Real Estate",
    duration: "0:50",
    vertical: false,
  },
  {
    slug: "x-eagle-cosmetics",
    title: "X-Eagle Cosmetics",
    category: "Commercial",
    duration: "0:06",
    vertical: true,
  },
  {
    // Filed as "JONO PLAZA.mp4", but the client's logo in the Trusted By wall
    // reads JUNO PLAZA — one spelling per brand across the page.
    slug: "juno-plaza",
    title: "JUNO Plaza",
    category: "Real Estate",
    duration: "1:03",
    vertical: true,
  },
  {
    slug: "epic-school-advertisement",
    title: "EPIC International School",
    category: "Education",
    duration: "0:25",
    vertical: true,
  },
  {
    slug: "dcm-real-estate-2",
    title: "DCM Real Estate II",
    category: "Real Estate",
    duration: "0:40",
    vertical: true,
  },
  {
    slug: "drink-advertisement",
    title: "Drink Commercial",
    category: "Commercial",
    duration: "0:29",
    vertical: true,
  },
  {
    slug: "dcm-real-estate",
    title: "DCM Real Estate",
    category: "Real Estate",
    duration: "0:41",
    vertical: true,
  },
  {
    slug: "ramadan-vibes",
    title: "Ramadan Vibes",
    category: "Seasonal",
    duration: "0:23",
    vertical: true,
  },
  {
    slug: "school-advertisement",
    title: "School Campaign",
    category: "Education",
    duration: "0:19",
    vertical: false,
  },
];

export const films: Film[] = REELS.flatMap((reel) => {
  const poster = posters[`../assets/generated/posters/${reel.slug}.webp`];
  if (!poster) {
    // A renamed master or a stale generated/ directory. Drop the card rather than
    // rendering a broken poster over a video that may not exist either.
    if (import.meta.env.DEV) {
      console.warn(`[films] no poster for "${reel.slug}" — run: npm run optimize:videos`);
    }
    return [];
  }
  return [{ ...reel, poster, src: `/videos/${reel.slug}.mp4` }];
});
