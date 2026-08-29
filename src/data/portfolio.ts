// Copy, services and skills below are final. The `photography`, `films` and `bts`
// arrays still hold Unsplash placeholders — swap them for the real work by dropping
// files into src/assets/ and importing them here, or by pasting hosted URLs. Nothing
// outside this file needs to change. Client logos live in ./clients.ts.

export const services = [
  {
    id: "01",
    title: "Commercial Photography",
    description:
      "Professional product and branding photography for companies, brands, restaurants, and businesses.",
  },
  {
    id: "02",
    title: "Cinematic Videography",
    description: "High-end cinematic video production with professional storytelling.",
  },
  {
    id: "03",
    title: "Commercial Advertising",
    description:
      "Creative advertisements, promotional campaigns, and marketing videos designed to increase conversions.",
  },
  {
    id: "04",
    title: "Drone Photography & Video",
    description: "Professional aerial filming and photography with cinematic drone shots.",
  },
  {
    id: "05",
    title: "Studio Management",
    description:
      "Managing photography productions, creative teams, lighting setups, schedules, and commercial projects.",
  },
  {
    id: "06",
    title: "Post Production",
    description:
      "Professional color grading, editing, sound design, motion graphics, and final delivery.",
  },
];

export const skills = [
  "Photography",
  "Commercial Photography",
  "Product Photography",
  "Videography",
  "Cinematic Storytelling",
  "Video Editing",
  "Adobe Premiere Pro",
  "DaVinci Resolve",
  "After Effects",
  "Photoshop",
  "Lightroom",
  "Drone Operation",
  "Lighting Setup",
  "Color Grading",
  "Sound Design",
  "Creative Direction",
  "Studio Management",
  "Social Media Content",
  "Commercial Advertising",
  "Real Estate Media",
  "Automotive Videography",
  "Product Commercials",
  "Sales Reels",
  "Camera Operation",
];

export type Shot = { src: string; title: string; year: string; client: string };

export const photography: Shot[] = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
    title: "Golden Hour",
    year: "2024",
    client: "Emerald",
  },
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80",
    title: "Chrome Study",
    year: "2024",
    client: "El Deeb Cars",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    title: "Interior Lines",
    year: "2023",
    client: "Mountain View",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
    title: "Retail Frames",
    year: "2023",
    client: "Spade",
  },
  {
    src: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=900&q=80",
    title: "Plated",
    year: "2024",
    client: "Mövenpick",
  },
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
    title: "Product Still",
    year: "2022",
    client: "JUNO",
  },
  {
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=900&q=80",
    title: "Aerial Coast",
    year: "2023",
    client: "Dream Hills",
  },
  {
    src: "https://images.unsplash.com/photo-1512427691650-15b6c09b0f0b?w=900&q=80",
    title: "Night Suite",
    year: "2024",
    client: "Hilton",
  },
  {
    src: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=900&q=80",
    title: "Facade",
    year: "2022",
    client: "NASDAQ Urban",
  },
];

export type Film = {
  thumb: string;
  title: string;
  category: string;
  meta: string;
  /** Embeddable player URL (YouTube/Vimeo embed, or a Drive /preview link). When
   *  set, the lightbox plays it instead of re-showing the thumbnail. */
  url?: string;
};

export const films: Film[] = [
  {
    thumb: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80",
    title: "Skyline Residences",
    category: "Real Estate",
    meta: "02:14 — 2024",
  },
  {
    thumb: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=80",
    title: "GT Series Launch",
    category: "Automotive",
    meta: "01:38 — 2024",
  },
  {
    thumb: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=900&q=80",
    title: "Studio Sessions",
    category: "Commercial",
    meta: "00:58 — 2023",
  },
  {
    thumb: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80",
    title: "Campus Story",
    category: "Education",
    meta: "03:05 — 2023",
  },
  {
    thumb: "https://images.unsplash.com/photo-1470229722913-7ea0d7dbfff5?w=900&q=80",
    title: "Brand Event Film",
    category: "Events",
    meta: "02:41 — 2022",
  },
];

export const bts = [
  {
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    caption: "ON SET",
  },
  {
    src: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=800&q=80",
    caption: "LIGHTING CHECK",
  },
  {
    src: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    caption: "DRONE SETUP",
  },
  {
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    caption: "COLOR SUITE",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    caption: "CLIENT REVIEW",
  },
  {
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    caption: "GEAR PREP",
  },
];

export const contact = {
  email: "abdallasaber500@gmail.com",
  phone: "+20 1097901285",
  location: "October, Giza, Egypt",
  portfolio: "https://drive.google.com/drive/folders/1ZqwfQ2N-8UFOohoF3moXNgvm1GzodPU2",
};
