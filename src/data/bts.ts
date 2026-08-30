// Behind-the-scenes clips. Videos are served from /bts/*.mp4 (written to public/
// by `npm run optimize:videos`); posters are bundled from generated/bts-posters.
// Both come from the masters in "src/assets/Behind the Scenes/", which are
// gitignored. Encoded at 720x1280 with audio stripped — they are muted hover loops.
//
// Slugs are stable ordinals because the camera filenames are UUIDs. Captions are
// the visible text and describe what each clip actually shows.

const posters = import.meta.glob("../assets/generated/bts-posters/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type BTSClip = {
  slug: string;
  caption: string;
  poster: string;
  src: string;
};

const CLIPS: ReadonlyArray<{ slug: string; caption: string }> = [
  // Gimbal walk, a rig shooting from a car window, lit interior setups.
  { slug: "bts-01", caption: "On location" },
  // Drone launch at golden hour, monitor checks, showroom interiors.
  { slug: "bts-02", caption: "Aerial setup" },
  // Car tracking shots into the Automotive Hub dealership floor.
  { slug: "bts-03", caption: "Automotive set" },
];

export const bts: BTSClip[] = CLIPS.flatMap(({ slug, caption }) => {
  const poster = posters[`../assets/generated/bts-posters/${slug}.webp`];
  if (!poster) {
    // A renamed master or a stale generated/ directory. Drop the card rather than
    // rendering a broken poster over a video that may not exist either.
    if (import.meta.env.DEV) {
      console.warn(`[bts] no poster for "${slug}" — run: npm run optimize:videos`);
    }
    return [];
  }
  return [{ slug, caption, poster, src: `/bts/${slug}.mp4` }];
});
