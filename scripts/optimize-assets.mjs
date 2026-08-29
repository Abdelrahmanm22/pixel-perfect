// One-shot asset pipeline. Run with `npm run optimize:assets`.
//
// Source files in src/assets/ (the client's originals) are never imported by the
// app — they total ~16 MB. This script trims their transparent padding, downscales
// them and writes WebP into src/assets/generated/, which IS committed and IS what
// the components import. Re-run it whenever an original changes.

import { mkdir, readdir, writeFile, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "src/assets");
const outDir = join(assets, "generated");
const logoOut = join(outDir, "logos");
const publicDir = join(root, "public");

// Transparent background, used by every .trim() call below.
const CLEAR = { background: { r: 0, g: 0, b: 0, alpha: 0 } };

// Filenames that don't slugify to something usable on their own. Arabic names are
// transliterated by hand so the slugs in src/data/clients.ts stay ASCII and stable.
const SLUG_OVERRIDES = {
  الرفاعي: "al-refaei",
  الفارس: "al-fares",
  طبيعه: "tabiaa",
  "مجوهرات ناصر": "nasser-jewelry",
};

// Galaxy Interior shipped three marks: "galaxy 1" is the full lockup, "galaxy 2" is
// the star icon alone and "galaxy 3" is a near-blank variant. One brand, one logo.
const SKIP = new Set(["galaxy 2", "galaxy 3"]);

function slugify(stem) {
  return (
    SLUG_OVERRIDES[stem] ??
    stem
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function report(label, file) {
  const { size } = await stat(file);
  console.log(`  ${label.padEnd(34)} ${kb(size).padStart(8)}`);
  return size;
}

// The logo set runs from a 3.1:1 wordmark (galaxy) to a 0.64:1 portrait mark
// (nasser-jewelry). Fitting each one inside a shared box makes the wide ones carry
// far more ink than the square ones, and the wall looks lopsided. So: scale every
// mark to the same *area*, then pad it out to one uniform 480x240 canvas. Every
// generated file then has identical dimensions and the grid needs no per-logo CSS.
const LOGO_BOX = { w: 480, h: 240 };
const LOGO_AREA = LOGO_BOX.w * LOGO_BOX.h * 0.42;

async function normalizeLogo(src) {
  const trimmed = await sharp(src).trim(CLEAR).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const ratio = meta.width / meta.height;

  let w = Math.round(Math.sqrt(LOGO_AREA * ratio));
  let h = Math.round(Math.sqrt(LOGO_AREA / ratio));
  if (w > LOGO_BOX.w) ((w = LOGO_BOX.w), (h = Math.round(LOGO_BOX.w / ratio)));
  if (h > LOGO_BOX.h) ((h = LOGO_BOX.h), (w = Math.round(LOGO_BOX.h * ratio)));

  const left = Math.floor((LOGO_BOX.w - w) / 2);
  const top = Math.floor((LOGO_BOX.h - h) / 2);

  return sharp(trimmed)
    .resize({ width: w, height: h, fit: "fill" })
    .extend({
      left,
      top,
      right: LOGO_BOX.w - w - left,
      bottom: LOGO_BOX.h - h - top,
      background: CLEAR.background,
    })
    .toBuffer();
}

async function buildLogos() {
  const dir = join(assets, "LOGOS");
  const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith(".png"));

  console.log(`\nLogos (${dir})`);
  let total = 0;
  for (const file of files.sort()) {
    const stem = file.replace(/\.png$/i, "");
    if (SKIP.has(stem)) {
      console.log(`  ${stem.padEnd(34)} ${"skipped".padStart(8)}`);
      continue;
    }
    const slug = slugify(stem);
    const dest = join(logoOut, `${slug}.webp`);
    await sharp(await normalizeLogo(join(dir, file)))
      .webp({ quality: 90, alphaQuality: 90 })
      .toFile(dest);
    total += await report(`${stem} -> ${slug}.webp`, dest);
  }
  console.log(`  ${"".padEnd(34)} ${kb(total).padStart(8)} total`);
}

async function buildBrandMarks() {
  console.log("\nBrand marks");

  // name-arabic-white.png and signature.png are the same artwork in two colours
  // (verified: identical dimensions and opaque-pixel counts, one pure black, one
  // pure white). White is what the dark sections use; the dark one is kept for any
  // future light-section placement.
  for (const [src, out] of [
    ["name-arabic-white.png", "wordmark-white.webp"],
    ["signature.png", "wordmark-dark.webp"],
  ]) {
    const dest = join(outDir, out);
    await sharp(join(assets, src))
      .trim(CLEAR)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 90 })
      .toFile(dest);
    await report(`${src} -> ${out}`, dest);
  }
}

const PORTRAIT_SRC = "Abdalla Saber Main.PNG";

async function buildPortrait() {
  console.log("\nPortrait");

  // The current portrait is a rectangular studio frame, but an earlier one was a
  // transparent cutout with a large empty band. Trim only when there is actually
  // transparent padding to remove, so either kind of source drops in cleanly.
  const src = join(assets, PORTRAIT_SRC);
  const { isOpaque } = await sharp(src).stats();
  const base = isOpaque ? await sharp(src).toBuffer() : await sharp(src).trim(CLEAR).toBuffer();
  const { width, height } = await sharp(base).metadata();
  console.log(
    `  ${PORTRAIT_SRC} — ${width}x${height}, ${isOpaque ? "opaque" : "cutout (trimmed)"}`,
  );

  const dest = join(outDir, "abdalla-main.webp");
  await sharp(base)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(dest);
  const out = await sharp(dest).metadata();
  console.log(`  emitted at ${out.width}x${out.height}`);
  await report(`${PORTRAIT_SRC} -> abdalla-main.webp`, dest);

  // og:image — portrait as a right-hand panel on the site's --ink ground, with the
  // wordmark in the open half.
  const card = { width: 1200, height: 630 };
  const panel = { width: 470, height: card.height };
  const subject = await sharp(base)
    .resize({ ...panel, fit: "cover", position: "top" })
    .toBuffer();

  const mark = await sharp(join(assets, "name-arabic-white.png"))
    .trim(CLEAR)
    .resize({ width: 420, withoutEnlargement: true })
    .toBuffer();
  const { height: mh } = await sharp(mark).metadata();

  // Same 24px technical grid and red rule the site uses, so the card reads as ours.
  const grid = Buffer.from(
    `<svg width="${card.width}" height="${card.height}" xmlns="http://www.w3.org/2000/svg">
       <defs><pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse">
         <path d="M24 0H0V24" fill="none" stroke="#242424" stroke-width="1"/>
       </pattern></defs>
       <rect width="100%" height="100%" fill="url(#g)"/>
       <rect x="72" y="${Math.round(card.height / 2) + 40}" width="120" height="4" fill="#e63946"/>
     </svg>`,
  );

  // Hard red edge down the inside of the photo panel — the same accent the hero uses.
  const edge = Buffer.from(
    `<svg width="6" height="${card.height}" xmlns="http://www.w3.org/2000/svg">
       <rect width="6" height="${card.height}" fill="#e63946"/>
     </svg>`,
  );

  const panelLeft = card.width - panel.width;
  const ogDest = join(publicDir, "og-image.jpg");
  await sharp({
    create: { ...card, channels: 4, background: { r: 17, g: 17, b: 17, alpha: 1 } },
  })
    .composite([
      { input: grid, left: 0, top: 0 },
      { input: subject, left: panelLeft, top: 0 },
      { input: edge, left: panelLeft - 6, top: 0 },
      { input: mark, left: 72, top: Math.round((card.height - mh) / 2) - 30 },
    ])
    .jpeg({ quality: 85 })
    .toFile(ogDest);
  await report("og-image.jpg", ogDest);
}

await mkdir(logoOut, { recursive: true });
await buildLogos();
await buildBrandMarks();
await buildPortrait();

// Written so the generated directory is self-documenting in a diff.
await writeFile(
  join(outDir, "README.md"),
  [
    "# Generated assets",
    "",
    "Do not edit by hand. Produced by `npm run optimize:assets` from the originals",
    `in \`src/assets/\` (\`LOGOS/\`, \`${PORTRAIT_SRC}\`, \`name-arabic-white.png\`,`,
    "`signature.png`). These WebP files are what the components import.",
    "",
  ].join("\n"),
);

console.log("\nDone.");
