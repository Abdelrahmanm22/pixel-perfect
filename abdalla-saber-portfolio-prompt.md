# Abdalla Saber — Art Director Portfolio Website

## Prompt for Lovable / Claude Code

---

Build a modern, single-page React portfolio website for **Abdalla Saber**, an Art Director, Filmmaker, Photographer, and Studio Manager based in Cairo/Giza, Egypt.

---

## 1. DESIGN DIRECTION — Brutalist Editorial

Create a **high-end brutalist editorial portfolio** inspired by contemporary graphic design magazines and independent zines. The aesthetic should feel like a physical art-direction moodboard brought to life as an interactive website.

### Visual Language
- **Oversized experimental typography** — massive display type, mixed weights, type that breaks grid boundaries
- **Cutout photography** with thick colored outlines (red or cream strokes around photos)
- **Overlapping photographic collages** — images layered on top of each other with slight rotations
- **Handwritten annotations** — small scribble-like notes, arrows, or labels scattered around elements (use a handwriting font like `Caveat` or `Permanent Marker`)
- **Imperfect rotations** — images and text blocks rotated slightly (-3° to 5°) for a tactile, hand-placed feel
- **Editorial grids** — asymmetric, magazine-style column layouts
- **Small technical metadata** — tiny monospace labels like coordinates, file sizes, focal lengths, dates scattered as decorative information
- **Grain/noise texture overlay** on images and sections for analog feel

### Color Palette (Restrained)
```
--black:       #111111    (primary background)
--charcoal:    #1a1a1a    (secondary dark)
--cream:       #f3f2ee    (light sections / text on dark)
--off-white:   #e8e6e0    (secondary light)
--red:         #e63946    (accent — used sparingly for highlights, outlines, hover states)
--muted-red:   #c1272d    (secondary accent)
--gray:        #888888    (metadata text, grid lines)
```

### Typography
- **Display / Headings:** Use a bold condensed sans-serif like `"Bebas Neue"`, `"Oswald"`, or `"Anton"` — set very large (clamp-based fluid sizing, up to 15vw for hero text)
- **Body:** Clean geometric sans like `"Inter"`, `"Space Grotesk"`, or `"DM Sans"`
- **Mono / Metadata:** `"JetBrains Mono"` or `"Space Mono"` for technical labels, coordinates, file info
- **Handwritten (annotations):** `"Caveat"` or `"Permanent Marker"`

### Background Grid Pattern
Apply a **subtle technical grid** across the entire site background:

**Dark sections:**
- Base: `#111111`
- Grid lines: `#1d1d1d` to `#252525`
- 24px × 24px squares, 1px lines

**Light sections:**
- Base: `#f3f2ee`
- Grid lines: `#d5d3ce`
- Same 24px × 24px grid

The grid should be rendered via CSS `background-image` using `repeating-linear-gradient` or SVG pattern. It must cover the full viewport, stay behind all content, and not scroll independently.

---

## 2. TECH STACK

- **React** (Vite or Next.js)
- **TypeScript**
- **Tailwind CSS** for utility styles + custom CSS for editorial layouts
- **Framer Motion** for all animations and transitions
- **Three.js** (via `@react-three/fiber` + `@react-three/drei`) for a 3D interactive element (see Section 8)
- **React Router** (if multi-page) or scroll-based sections
- **Lucide React** or **Phosphor Icons** for icons
- Google Fonts: Bebas Neue, Inter, JetBrains Mono, Caveat

---

## 3. SITE SECTIONS (Top to Bottom)

### 3.1 — HERO SECTION

A full-viewport cinematic hero with editorial energy.

**Layout:**
- Left side: Oversized stacked text reading:
  ```
  ABDALLA
  SABER
  ```
  Set in the display font at ~15vw, with letters tracked tightly. Below in smaller type:
  ```
  ART DIRECTOR
  FILMMAKER • PHOTOGRAPHER • STUDIO MANAGER
  ```
- Right side: A **cutout photo** of Abdalla (the uploaded photo of him in white hoodie on phone — `Abdallah_Main.jpg`) with:
  - A thick red (`#e63946`) outline/stroke around the cutout (3-5px offset border effect)
  - Slight rotation (~2°)
  - A small handwritten annotation near the photo like `"Cairo, EG"` or `"est. 1999"` in Caveat font
- **Signature image** (`photo_2026-08-29_21-28-43.jpg` — the handwritten signature) placed below or overlapping the name, rendered in cream/white color, acting as a personal branding element
- Scattered **metadata labels** in monospace: `30.0444° N, 31.2357° E` (Cairo coordinates), `14+ YRS EXPERIENCE`, `© 2024`
- A subtle **parallax scroll** effect on the photo
- Small animated down-arrow or "SCROLL" indicator at bottom

**Animation:**
- Text reveals with staggered Framer Motion `clipPath` or `y` slide-in animations
- Photo slides in from right with slight scale
- Metadata fades in with delay

---

### 3.2 — ABOUT / BIO SECTION

**Layout:** Two-column editorial layout on a cream/light background with the dark grid overlay.

- **Left column (narrow):** Section label `"ABOUT"` rotated -90° along the left edge. A red vertical line accent.
- **Right column (wide):** The bio text in body font:

> With over 14 years of professional experience in photography, videography, and commercial advertising production, I have built a strong track record of delivering high-quality visual content across a wide range of industries. I have worked on product photography for numerous brands, collaborated with international schools, and produced media content for factories and leading companies.
>
> I specialize in creating promotional videos, commercial advertisements, and high-converting sales reels. My experience also includes automotive videography, capturing luxury and sports cars for dealerships, exhibitions, and automotive brands while producing cinematic, engaging promotional content.
>
> Throughout my career, I have produced professional real estate promotional videos and sales-focused reels for numerous real estate companies. I am highly skilled in drone operation for aerial photography and videography, as well as cinematic lighting design, ensuring premium visual quality in every production.
>
> In addition, I have extensive experience covering corporate, commercial, and real estate events, delivering professional photography and video production that meets the highest creative and technical standards.

- Add a **handwritten annotation** near the text like an arrow pointing to "14 years" with the note `"since 2010"` in Caveat font
- Small metadata: `LOCATION: October, Giza, Egypt` / `DOB: June 22, 1999`

**Contact info strip** (small, editorial):
```
abdallasaber500@gmail.com  •  +20 1097901285  •  October, Giza, Egypt
```

---

### 3.3 — SERVICES / WHAT I DO

**Layout:** Dark background. Magazine-style grid with **6 service cards** in a 2×3 or 3×2 asymmetric layout.

Each card:
- Large service number in red display font (`01`, `02`, etc.)
- Service title in display font
- Short description in body font
- On hover: card lifts slightly, red border appears, slight rotation change

**Services:**

| # | Title | Description |
|---|-------|-------------|
| 01 | Commercial Photography | Professional product and branding photography for companies, brands, restaurants, and businesses. |
| 02 | Cinematic Videography | High-end cinematic video production with professional storytelling. |
| 03 | Commercial Advertising | Creative advertisements, promotional campaigns, and marketing videos designed to increase conversions. |
| 04 | Drone Photography & Videography | Professional aerial filming and photography with cinematic drone shots. |
| 05 | Studio Management | Managing photography productions, creative teams, lighting setups, schedules, and commercial projects. |
| 06 | Post Production | Professional color grading, editing, sound design, motion graphics, and final delivery. |

---

### 3.4 — SKILLS TICKER

A **horizontal infinite-scroll marquee** (Framer Motion) displaying skills as pill/tag elements:

```
Photography • Commercial Photography • Product Photography • Videography • Cinematic Storytelling • Video Editing • Adobe Premiere Pro • DaVinci Resolve • Adobe After Effects • Adobe Photoshop • Adobe Lightroom • Drone Operation • Lighting Setup • Color Grading • Sound Design • Creative Direction • Studio Management • Social Media Content • Commercial Advertising • Real Estate Media • Automotive Videography • Product Commercials • Sales Reels • Camera Operation
```

Style: uppercase monospace text, separated by red dots or diamond symbols (`◆`), scrolling continuously left. Two rows scrolling in opposite directions for visual interest.

---

### 3.5 — FEATURED WORK: PHOTOGRAPHY (Collins Carousel)

**Section title:** `"SELECTED WORK"` in massive display type, with `"PHOTOGRAPHY"` as a subtitle or handwritten annotation.

**Carousel Implementation — Framer Motion Collins Carousel:**
Recreate the [Collins Carousel](https://images.motion.dev/made-with-motion/a5f2ba58-57d0-44de-b4f4-92852a4e277a/e3669106-4dda-49d2-b9fd-689dc95c9284.mp4) interaction:

- A horizontal scrolling gallery where images **fan out** from the center
- Cards are stacked and as user scrolls/drags, they spread out in a **curved arc** with perspective
- Each card shows a featured photograph with:
  - The image
  - A small label: project name, year, or client
  - Slight rotation and z-depth offset between cards
- Use `Framer Motion`'s `useMotionValue`, `useTransform`, and `drag` for the interaction
- Cards should have the editorial treatment: thick borders, slight rotations, overlapping

**Placeholder images:** Use 8-10 placeholder image URLs from Unsplash (photography/cinematic themed) until real images are provided. Structure the component to accept an array of image objects `{ src, title, year, client }`.

---

### 3.6 — FEATURED WORK: VIDEOS (Infinite Scroll Cards)

**Section title:** `"SHOWREEL"` or `"FEATURED VIDEOS"` in display type.

**Carousel Implementation — Framer Motion Infinite Scroll Cards:**
Recreate the [Infinite Scroll Cards](https://images.motion.dev/made-with-motion/a5f2ba58-57d0-44de-b4f4-92852a4e277a/9fba0ebb-6fe7-40cb-87cf-41b27324c7fa.mp4) interaction:

- **4-5 video cards** that scroll infinitely in a vertical or horizontal loop
- Each card shows:
  - A video thumbnail (use placeholder thumbnails)
  - Project title
  - Category tag (e.g., "Real Estate", "Automotive", "Commercial")
  - Duration or year
- Cards continuously scroll/loop with smooth Framer Motion animation
- On click/tap: open the video in a **modal/lightbox** with an embedded player or link
- Use `Framer Motion`'s `animate`, `repeat: Infinity`, and layout animations

**"View All Work" CTA Button:**
Below or beside the carousel, place a prominent button/link:
```
VIEW FULL PORTFOLIO →
```
Links to: `https://drive.google.com/drive/folders/1ZqwfQ2N-8UFOohoF3moXNgvm1GzodPU2`
Style: Red background, cream text, uppercase, slight rotation, editorial feel. Opens in new tab.

---

### 3.7 — BEHIND THE SCENES

**Section title:** `"BTS"` or `"BEHIND THE SCENES"` in large display type with a handwritten annotation `"the process"`.

**Layout:** A collage-style grid of 4-6 BTS images/video thumbnails:
- Images overlapping slightly with varied sizes
- Some rotated, some with red outlines
- Polaroid-style or film-strip treatment on some
- Small captions in monospace: `"ON SET"`, `"LIGHTING CHECK"`, `"DRONE SETUP"`, etc.
- Use placeholder images until real ones are provided

---

### 3.8 — CLIENTS / BRANDS WORKED WITH

**Section title:** `"TRUSTED BY"` or `"CLIENTS & BRANDS"` in display type.

**Layout:** A logo grid displaying all the brand/company logos from the uploaded screenshot. Create a responsive grid (5-6 columns on desktop, 3 on tablet, 2 on mobile).

**Logos to include (from the screenshot — use these as text labels with placeholder styling until real logo files are provided):**
```
Automotive Hub, Carogo, Crowne Plaza, Dream Hills, Dream Land, El Deeb Cars, Emerald, EPIC, Galaxy Interior (×3), GTM, Hilton, Joelle Cosmetics, JORA Developments, Jumeirah, JUNO, MaxProfit, Mountain View, Mövenpick, MSA University, NASDAQ Urban Development, PDCA, QLS, Sky Light, Spade, Valéa, Viena, Wesal, X-Eagle, ZG, Zuwad, الرفاعي, الفارس, طبيعة, مجوهرات ناصر
```

**Style:**
- Logos displayed in **grayscale/white** on dark background
- On hover: logo gains color or slight scale + glow effect
- Infinite horizontal scroll marquee as alternative layout option
- Small metadata: `"35+ BRANDS"` counter in monospace

---

### 3.9 — CONTACT SECTION

**Layout:** Full-width dark section with editorial typography.

**Large display text:**
```
LET'S
CREATE
TOGETHER
```

**Contact details** in a clean grid:
```
EMAIL        abdallasaber500@gmail.com
PHONE        +20 1097901285
LOCATION     October, Giza, Egypt
```

- Include the **signature image** (`photo_2026-08-29_21-28-43.jpg`) rendered in cream/white as a decorative element
- Social media icon links (Instagram, Behance, LinkedIn, YouTube) — use placeholder `#` links
- A simple **contact form** (optional): Name, Email, Message, Send button
- The name logo (`عبدالله_صابر_ابيض.png` — Arabic name in white) displayed as a footer brand mark

---

## 4. NAVIGATION

**Fixed top navbar** — minimal, editorial:
- Left: `"AS"` monogram or the Arabic name logo in small size
- Right: Navigation links in uppercase monospace: `ABOUT` / `WORK` / `SERVICES` / `CLIENTS` / `CONTACT`
- On scroll: navbar gets a subtle dark glass/blur background
- Mobile: hamburger menu with full-screen overlay, large stacked links with staggered Framer Motion animation

---

## 5. THREE.JS ELEMENT

Integrate a **Three.js** interactive element using `@react-three/fiber`:

**Option — 3D Floating Camera Model or Abstract Geometry:**
- Place a subtle 3D element in the hero or as a transition between sections
- Ideas:
  - A **wireframe camera** or lens that rotates slowly and responds to mouse movement (parallax)
  - An **abstract geometric shape** (icosahedron or torus knot) made of wireframe lines in red (`#e63946`) that morphs or rotates
  - **Particle field** — scattered dots that react to mouse position, forming a subtle depth effect behind the hero text
- Keep it performant — use `drei` helpers like `Float`, `OrbitControls` (disabled user control, auto-rotate only), or custom shader
- Should NOT block content — render behind or beside text with `pointer-events: none`
- Add `Suspense` fallback and lazy-load the canvas

---

## 6. ANIMATIONS (Framer Motion)

Use Framer Motion throughout:

- **Page load:** Orchestrated staggered reveal — elements animate in sequence (text → photo → metadata → nav)
- **Scroll-triggered:** Use `whileInView` for section reveals (fade + slide up, 60px offset, 0.6s duration)
- **Hover effects:** Cards lift (`y: -8`), scale slightly (`1.02`), gain border or shadow
- **Page transitions:** Smooth scroll with `scroll-behavior: smooth` or a scroll library
- **Cursor:** Custom cursor (optional) — a small red dot that scales up on hoverable elements
- **Magnetic buttons:** Contact CTA and nav links with slight magnetic pull effect on hover
- **Text reveal:** Use `clipPath` or character-by-character stagger for headings entering viewport
- **Respect `prefers-reduced-motion`** — disable animations when user prefers reduced motion

---

## 7. RESPONSIVE DESIGN

- **Desktop (1200px+):** Full editorial grid layouts, large typography, multi-column sections
- **Tablet (768-1199px):** Simplified grids, reduced font sizes, stacked layouts where needed
- **Mobile (< 768px):** Single column, hamburger nav, touch-friendly carousels, reduced Three.js complexity or hidden on low-end devices
- All images: `loading="lazy"`, optimized with `srcset` if possible
- Use CSS `clamp()` for fluid typography

---

## 8. PERFORMANCE

- Lazy-load Three.js canvas and heavy components
- Use `Intersection Observer` (via Framer Motion `whileInView`) to only animate visible elements
- Optimize images (WebP format when possible)
- Code-split sections if using a framework that supports it
- Keep initial bundle lean — defer non-critical scripts

---

## 9. SEO & META

```html
<title>Abdalla Saber — Art Director, Filmmaker & Photographer</title>
<meta name="description" content="Portfolio of Abdalla Saber, an Art Director, Filmmaker, Photographer, and Studio Manager with 14+ years of experience in commercial photography, cinematic videography, and advertising production." />
<meta property="og:title" content="Abdalla Saber — Art Director" />
<meta property="og:description" content="Filmmaker • Photographer • Studio Manager — 14+ years of visual storytelling" />
<meta property="og:image" content="[og-image-url]" />
```

---

## 10. FILE/ASSET STRUCTURE

```
/public
  /images
    /hero
      abdalla-main.jpg          (cutout photo)
      signature.jpg             (handwritten signature)
      name-arabic-white.png     (Arabic name logo)
    /logos
      [all client logo files]
    /portfolio
      [featured photography]
    /bts
      [behind the scenes images]
    /videos
      [video thumbnails]
  /fonts (if self-hosting)

/src
  /components
    /ui           (Button, Card, Badge, etc.)
    /layout       (Navbar, Footer, Section wrapper)
    /hero         (HeroSection, Three.js canvas)
    /about        (AboutSection)
    /services     (ServicesGrid, ServiceCard)
    /skills       (SkillsMarquee)
    /work         (CollinsCarousel, InfiniteScrollCards)
    /bts          (BTSCollage)
    /clients      (LogoGrid, LogoMarquee)
    /contact      (ContactSection, ContactForm)
  /hooks          (useScrollProgress, useMousePosition, etc.)
  /styles         (global.css, grid-background.css)
  /data           (services.ts, clients.ts, portfolio.ts)
  App.tsx
  main.tsx
```

---

## 11. KEY IMPLEMENTATION NOTES

1. **Collins Carousel (Photography):** Build a custom Framer Motion carousel where cards are positioned in a curved arc using `useMotionValue` and `useTransform`. Each card has `rotateY`, `x`, `z`, and `scale` transforms calculated from scroll/drag progress. Cards in the center are largest and face forward; cards at edges are rotated away and smaller.

2. **Infinite Scroll Cards (Videos):** Create a Framer Motion loop animation. Duplicate the card array and animate the container's `y` (or `x`) position continuously. When the first set scrolls fully out, it resets seamlessly. Use `repeat: Infinity` and `ease: "linear"` on the motion.

3. **Grid Background:** Implement as a CSS pseudo-element or dedicated `<div>` with:
```css
.grid-bg-dark {
  background-color: #111111;
  background-image:
    linear-gradient(to right, #1d1d1d 1px, transparent 1px),
    linear-gradient(to bottom, #1d1d1d 1px, transparent 1px);
  background-size: 24px 24px;
}

.grid-bg-light {
  background-color: #f3f2ee;
  background-image:
    linear-gradient(to right, #d5d3ce 1px, transparent 1px),
    linear-gradient(to bottom, #d5d3ce 1px, transparent 1px);
  background-size: 24px 24px;
}
```

4. **Cutout Photo Effect:** Apply a `drop-shadow` or layered `outline` effect:
```css
.cutout-photo {
  filter: drop-shadow(3px 3px 0 #e63946) drop-shadow(-1px -1px 0 #e63946);
  transform: rotate(2deg);
}
```

5. **Editorial Metadata:** Scatter small `<span>` elements with absolute positioning, monospace font, 10-11px size, low opacity, containing technical data like coordinates, dates, or camera specs.

---

## 12. SAMPLE DATA STRUCTURES

```typescript
// services.ts
export const services = [
  {
    id: "01",
    title: "Commercial Photography",
    description: "Professional product and branding photography for companies, brands, restaurants, and businesses.",
    icon: "camera",
  },
  // ... etc
];

// clients.ts
export const clients = [
  { name: "Hilton", logo: "/images/logos/hilton.png" },
  { name: "Crowne Plaza", logo: "/images/logos/crowne-plaza.png" },
  { name: "Mountain View", logo: "/images/logos/mountain-view.png" },
  { name: "Mövenpick", logo: "/images/logos/movenpick.png" },
  { name: "Jumeirah", logo: "/images/logos/jumeirah.png" },
  { name: "MSA University", logo: "/images/logos/msa.png" },
  { name: "Galaxy Interior", logo: "/images/logos/galaxy.png" },
  { name: "Dream Hills", logo: "/images/logos/dream-hills.png" },
  { name: "NASDAQ Urban Development", logo: "/images/logos/nasdaq.png" },
  { name: "EPIC International School", logo: "/images/logos/epic.png" },
  { name: "El Deeb Cars", logo: "/images/logos/eldeeb.png" },
  { name: "Carogo", logo: "/images/logos/carogo.png" },
  { name: "Dream Land", logo: "/images/logos/dreamland.png" },
  { name: "Emerald", logo: "/images/logos/emerald.png" },
  { name: "GTM", logo: "/images/logos/gtm.png" },
  { name: "Joelle Cosmetics", logo: "/images/logos/joelle.png" },
  { name: "JORA Developments", logo: "/images/logos/jora.png" },
  { name: "JUNO", logo: "/images/logos/juno.png" },
  { name: "MaxProfit", logo: "/images/logos/maxprofit.png" },
  { name: "PDCA", logo: "/images/logos/pdca.png" },
  { name: "QLS", logo: "/images/logos/qls.png" },
  { name: "Sky Light", logo: "/images/logos/skylight.png" },
  { name: "Spade", logo: "/images/logos/spade.png" },
  { name: "Valéa", logo: "/images/logos/valea.png" },
  { name: "Viena", logo: "/images/logos/viena.png" },
  { name: "Wesal", logo: "/images/logos/wesal.png" },
  { name: "X-Eagle", logo: "/images/logos/x-eagle.png" },
  { name: "ZG", logo: "/images/logos/zg.png" },
  { name: "Zuwad", logo: "/images/logos/zuwad.png" },
  { name: "Automotive Hub", logo: "/images/logos/automotive.png" },
  { name: "الرفاعي", logo: "/images/logos/alrefaei.png" },
  { name: "الفارس", logo: "/images/logos/alfares.png" },
  { name: "طبيعة", logo: "/images/logos/tabiaa.png" },
  { name: "مجوهرات ناصر", logo: "/images/logos/nasser-jewelry.png" },
];

// portfolio.ts
export const featuredPhotos = [
  { src: "/images/portfolio/photo1.jpg", title: "Brand Campaign", year: "2024", client: "Hilton" },
  // ... etc — use Unsplash placeholders initially
];

export const featuredVideos = [
  { thumbnail: "/images/videos/thumb1.jpg", title: "Mountain View — Compound Tour", category: "Real Estate", duration: "0:45" },
  { thumbnail: "/images/videos/thumb2.jpg", title: "Automotive Showcase", category: "Automotive", duration: "0:30" },
  { thumbnail: "/images/videos/thumb3.jpg", title: "Product Commercial", category: "Commercial", duration: "0:22" },
  { thumbnail: "/images/videos/thumb4.jpg", title: "Event Coverage", category: "Events", duration: "1:15" },
];

export const drivePortfolioLink = "https://drive.google.com/drive/folders/1ZqwfQ2N-8UFOohoF3moXNgvm1GzodPU2";
```

---

## 13. FINAL CHECKLIST

- [ ] Dark grid background on dark sections, light grid on light sections
- [ ] Brutalist editorial typography with oversized display text
- [ ] Cutout photo with red outline in hero
- [ ] Handwritten annotations (Caveat font) scattered throughout
- [ ] Small monospace metadata labels
- [ ] Three.js interactive 3D element (wireframe/particles)
- [ ] Collins Carousel for photography (Framer Motion)
- [ ] Infinite Scroll Cards for videos (Framer Motion)
- [ ] Link to Google Drive full portfolio
- [ ] Client logo grid (35+ brands)
- [ ] Skills marquee ticker
- [ ] Behind the scenes collage section
- [ ] Contact section with signature
- [ ] Responsive (mobile-first)
- [ ] Smooth scroll-triggered animations
- [ ] `prefers-reduced-motion` respected
- [ ] SEO meta tags
- [ ] Performance optimized (lazy loading, code splitting)
