// Video pipeline. Run with `npm run optimize:videos`.
//
// The masters in src/assets/Videos/ are export-grade: ~772 MB total at 17-80 Mbps,
// with one 506 MB file. They are gitignored and never shipped. This script writes
// web encodes to public/videos/ and poster frames to src/assets/generated/posters/,
// both of which ARE committed and are what the app serves.
//
// Kept separate from optimize-assets.mjs because transcoding takes minutes and the
// image pipeline should stay instant. Re-runs are free: anything already newer than
// its source is skipped.

import { mkdir, readdir, stat } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import ffmpeg from "ffmpeg-static";

const run = promisify(execFile);

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Two jobs, one pipeline. Showreel films are full-size and keep their soundtrack;
// BTS clips are muted hover loops rendered in ~350px cards, so they encode smaller
// and drop audio entirely.
const JOBS = [
  {
    name: "Showreel",
    srcDir: join(root, "src/assets/Videos"),
    videoOut: join(root, "public/videos"),
    posterOut: join(root, "src/assets/generated/posters"),
    encode: { maxWidth: 1080, maxrate: "3M", audio: true },
    // Explicit rather than slugified: these filenames are inconsistent ("epic
    // school advertisement" vs "Automotive Hub") and the slugs are referenced by
    // hand in src/data/films.ts, so they need to be stable and obvious.
    sources: [
      { file: "Automotive Hub.mp4", slug: "automotive-hub" },
      { file: "Drink advertisement.mp4", slug: "drink-advertisement" },
      { file: "Ramadan Vibes.mp4", slug: "ramadan-vibes" },
      { file: "epic school advertisement.mp4", slug: "epic-school-advertisement" },
      { file: "school advertisement.mp4", slug: "school-advertisement" },
      // The trailing space before ".mp4" here is real — it is in the filename on
      // disk, not a typo in this list. Removing it breaks the lookup.
      { file: "DCM Real Estate Advertisement .mp4", slug: "dcm-real-estate" },
      { file: "DCM Real Estate Advertisement 2.mp4", slug: "dcm-real-estate-2" },
      // Filename says JONO; the client's own logo in the Trusted By wall reads
      // JUNO PLAZA, so the slug and card title follow the logo.
      { file: "JONO PLAZA.mp4", slug: "juno-plaza" },
      // HEVC with a 90-degree display matrix. The H.264 transcode is mandatory
      // rather than merely smaller, and ffmpeg applies the rotation on the way
      // through, so this lands as 1080x1920 portrait.
      { file: "X-Eagle Cosmetics Advertisement.mov", slug: "x-eagle-cosmetics" },
      { file: "zg developments advertisement.mp4", slug: "zg-developments" },
    ],
  },
  {
    name: "Behind the Scenes",
    srcDir: join(root, "src/assets/Behind the Scenes"),
    videoOut: join(root, "public/bts"),
    posterOut: join(root, "src/assets/generated/bts-posters"),
    encode: { maxWidth: 720, maxrate: "1.5M", audio: false },
    // Camera UUIDs carry no meaning, so the slugs are just stable ordinals — the
    // visible text is the caption in src/data/bts.ts, not the slug.
    //
    // These are social BTS reels with burned-in title cards and whip transitions,
    // so the default 15% mark lands badly (bts-02 caught a mid-wipe silhouette).
    // posterAt picks a specific second showing actual work instead.
    sources: [
      { file: "8239646C-10C0-4BD3-9966-2AFFED4CC6AE.mov", slug: "bts-01", posterAt: 11 },
      { file: "copy_DC1682A6-47C3-48C5-8F7B-62BDA687A340.mov", slug: "bts-02", posterAt: 8 },
      { file: "copy_F60D813C-AB97-42C6-9467-B23C7B4B1584.mov", slug: "bts-03", posterAt: 13 },
    ],
  },
];

const mb = (n) => `${(n / 1048576).toFixed(1)} MB`;

async function sizeOf(file) {
  try {
    return (await stat(file)).size;
  } catch {
    return 0;
  }
}

/** True when `out` exists and is newer than `src` — nothing to redo. */
async function isFresh(out, src) {
  try {
    const [o, s] = await Promise.all([stat(out), stat(src)]);
    return o.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

/** Duration in seconds, read from ffmpeg's own report on the input. */
async function durationOf(src) {
  // ffmpeg writes stream info to stderr and exits non-zero with -f null on some
  // builds, so read stderr defensively rather than trusting the exit code.
  const { stderr } = await run(ffmpeg, ["-hide_banner", "-i", src], {
    maxBuffer: 1 << 24,
  }).catch((e) => ({ stderr: e.stderr ?? "" }));
  const m = /Duration:\s*(\d+):(\d+):(\d+\.?\d*)/.exec(stderr);
  if (!m) return 0;
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
}

async function encode(src, dest, { maxWidth, maxrate, audio }) {
  await run(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      src,
      // Never upscale: the drink ad is only 640x1136, the rest are 1080 wide.
      // -2 keeps the height even, which libx264 requires.
      "-vf",
      `scale='min(${maxWidth},iw)':-2`,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "23",
      "-maxrate",
      maxrate,
      "-bufsize",
      `${parseFloat(maxrate) * 2}M`,
      "-pix_fmt",
      "yuv420p",
      // Puts moov up front so playback can start before the file is fully fetched.
      "-movflags",
      "+faststart",
      ...(audio ? ["-c:a", "aac", "-b:a", "128k"] : ["-an"]),
      dest,
    ],
    { maxBuffer: 1 << 24 },
  );
}

async function poster(src, dest, seconds) {
  await run(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      // Seek before -i so ffmpeg jumps straight to the frame instead of decoding
      // everything up to it — matters a lot on a 506 MB input.
      "-ss",
      String(seconds),
      "-i",
      src,
      "-frames:v",
      "1",
      "-vf",
      "scale='min(720,iw)':-2",
      "-quality",
      "80",
      dest,
    ],
    { maxBuffer: 1 << 24 },
  );
}

// Cloudflare Workers static assets cap each file at 25 MiB, and vite.config.ts
// deploys there via nitro, so an oversized encode would fail at deploy time.
const LIMIT = 25 * 1048576;

let grandTotal = 0;

for (const job of JOBS) {
  console.log(`\n${job.name}`);
  await mkdir(job.videoOut, { recursive: true });
  await mkdir(job.posterOut, { recursive: true });

  const present = new Set(await readdir(job.srcDir).catch(() => []));
  let totalOut = 0;

  for (const { file, slug, posterAt } of job.sources) {
    if (!present.has(file)) {
      console.log(`  ${slug.padEnd(26)} MISSING — no "${file}"`);
      continue;
    }

    const src = join(job.srcDir, file);
    const mp4 = join(job.videoOut, `${slug}.mp4`);
    const jpg = join(job.posterOut, `${slug}.webp`);
    const srcSize = await sizeOf(src);

    // Checked independently so that re-cutting a poster doesn't trigger a needless
    // multi-minute re-encode of a video that hasn't changed.
    const needsVideo = !(await isFresh(mp4, src));
    const needsPoster = !(await isFresh(jpg, src));

    if (!needsVideo && !needsPoster) {
      const out = await sizeOf(mp4);
      totalOut += out;
      console.log(`  ${slug.padEnd(26)} up to date  ${mb(out).padStart(9)}`);
      continue;
    }

    const seconds = await durationOf(src);
    process.stdout.write(
      `  ${slug.padEnd(26)} ${needsVideo ? `encoding ${mb(srcSize)}` : "re-cutting poster"}…`,
    );

    if (needsVideo) await encode(src, mp4, job.encode);
    if (needsPoster) {
      // Default 15% in: past any black frame or logo sting, into the footage.
      await poster(src, jpg, posterAt ?? Math.max(0.5, seconds * 0.15));
    }

    const out = await sizeOf(mp4);
    totalOut += out;
    const saved = srcSize ? ((1 - out / srcSize) * 100).toFixed(1) : "0";
    console.log(
      `\r  ${slug.padEnd(26)} ${mb(srcSize).padStart(9)} -> ${mb(out).padStart(9)}  (-${saved}%)  ${seconds.toFixed(1)}s`,
    );

    if (out > LIMIT) {
      console.warn(`  WARNING ${slug}.mp4 is ${mb(out)} — over the 25 MiB asset limit`);
    }
  }

  grandTotal += totalOut;
  console.log(`  ${"".padEnd(26)} ${mb(totalOut).padStart(9)} total`);
}

console.log(`\nShipped total: ${mb(grandTotal)}`);
