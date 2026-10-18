import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/home";
import { MemoriesGallery } from "@/components/memories";
import { Sparkle } from "@/components/sparkle";
import { ArrowLeft } from "@/components/icons";

export const metadata: Metadata = {
  title: "Memories & Milestones Visual Archive — Jaikiran E",
  description:
    "Visual archive of national hackathon victories, college award ceremonies, bug bounty announcements, and milestone moments.",
  alternates: { canonical: "/memories" },
};

export default function MemoriesPage() {
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
            <span className="breadcrumb-current">Memories</span>
          </div>

          <p className="section-kicker">
            <Sparkle /> ARCHIVE &amp; VERIFIED RECORDS
          </p>
          <h1 className="display subpage-title">
            The Work Between the <span className="text-gradient-rose">Milestones</span>.
          </h1>
          <p className="lede subpage-lede">
            From the DRESTEIN &apos;26 podium and ₹1,00,000 award cheque to university recognition and the Glassdoor bug bounty honor.
          </p>
        </div>
      </header>

      <section className="section section--navy-surface subpage-content-section">
        <div className="container">
          <MemoriesGallery />
        </div>
      </section>

      <Footer />
    </main>
  );
}
