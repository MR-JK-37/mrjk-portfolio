import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/home";
import { Sparkle } from "@/components/sparkle";
import { ArrowLeft } from "@/components/icons";
import { ExperienceTimeline } from "@/components/experience-timeline";

export const metadata: Metadata = {
  title: "Experience & Track Record — Jaikiran E (MR!JK!)",
  description:
    "Cybersecurity research internships at C-DAC, national hackathon championships (DRESTEIN '26, MEGATHON), Glassdoor Bug Bounty reward, and CTF competition rankings.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <main id="main">
      <header className="subpage-hero section--navy">
        <div className="subpage-ambient-glow" aria-hidden="true" />
        <div className="container subpage-hero-inner">
          <div className="subpage-breadcrumb">
            <Link href="/" className="subpage-back-link">
              <ArrowLeft size={14} />
              <span>Evidence Locker</span>
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Experience</span>
          </div>

          <p className="section-kicker">
            <Sparkle /> MILESTONES &amp; TRACK RECORD
          </p>
          <h1 className="display subpage-title">
            Proven Under <span className="text-gradient-rose">Pressure</span>.
          </h1>
          <p className="lede subpage-lede">
            Hands-on technical depth verified across government research centers, competitive 48-hour
            national hackathons, Bugcrowd vulnerability disclosures, and international DEFCON CTF challenges.
          </p>
        </div>
      </header>

      <section className="section section--navy-surface subpage-content-section">
        <div className="container">
          <ExperienceTimeline />
        </div>
      </section>

      <Footer />
    </main>
  );
}
