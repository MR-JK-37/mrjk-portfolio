import type { Metadata } from "next";
import Link from "next/link";
import { Sparkle } from "@/components/sparkle";
import { Footer } from "@/components/home";
import { ProjectsDirectory } from "@/components/projects-directory";
import { ArrowLeft } from "@/components/icons";

export const metadata: Metadata = {
  title: "Engineering Projects & Systems Architecture — Jaikiran E",
  description:
    "Systems, security tools, and AI platforms engineered by Jaikiran E — built around clear security perimeters, resilient architectures, and verifiable proof.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
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
            <span className="breadcrumb-current">Projects</span>
          </div>

          <p className="section-kicker">
            <Sparkle /> CASE REPOSITORY &amp; ARCHITECTURE
          </p>
          <h1 className="display subpage-title">
            Engineered with <span className="text-gradient-rose">Purpose</span>.
          </h1>
          <p className="lede subpage-lede">
            From stage-adaptive healthcare AI companions and passive network OS fingerprinting
            to edge-ML predictive maintenance on constrained single-board hardware.
          </p>
        </div>
      </header>

      <section className="section section--navy-surface subpage-content-section">
        <div className="container">
          <ProjectsDirectory />
        </div>
      </section>

      <Footer />
    </main>
  );
}
