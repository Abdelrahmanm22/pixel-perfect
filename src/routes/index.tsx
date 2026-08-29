import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { VideoCards } from "@/components/VideoCards";
import { BTS } from "@/components/BTS";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";

const title = "Abdalla Saber — Art Director, Filmmaker & Photographer";
const description =
  "Portfolio of Abdalla Saber, an Art Director, Filmmaker, Photographer and Studio Manager with 14+ years in commercial photography, cinematic videography and advertising production.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: "Abdalla Saber — Art Director" },
      {
        property: "og:description",
        content: "Filmmaker • Photographer • Studio Manager — 14+ years of visual storytelling",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <SkillsMarquee />
      <PhotoCarousel />
      <VideoCards />
      <BTS />
      <Clients />
      <Contact />
      <Toaster />
    </main>
  );
}
