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
import { MilestoneMarquee } from "@/components/milestone-marquee";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <AchievementStrip />
      <div className="section-draw-line" aria-hidden="true" />
      <SelectedWork />
      <div className="section-draw-line" aria-hidden="true" />
      <HighlightsSection />
      <div className="section-draw-line" aria-hidden="true" />
      <MilestoneMarquee />
      <div className="section-draw-line" aria-hidden="true" />
      <Arsenal />
      <div className="section-draw-line" aria-hidden="true" />
      <AboutMe />
      <div className="section-draw-line" aria-hidden="true" />
      <Contact />
      <Footer />
    </main>
  );
}
