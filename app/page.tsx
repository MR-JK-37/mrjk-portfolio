import { Hero } from "@/components/hero";
import {
  AchievementStrip,
  SelectedWork,
  HighlightsSection,
  Arsenal,
  AboutMe,
  Contact,
  Footer,
} from "@/components/home";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <AchievementStrip />
      <SelectedWork />
      <HighlightsSection />
      <Arsenal />
      <AboutMe />
      <Contact />
      <Footer />
    </main>
  );
}
