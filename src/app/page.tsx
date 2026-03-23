import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutPreview } from "@/components/home/AboutPreview";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <PhotoStrip />
      <ContactSection />
    </main>
  );
}
