"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Trophy,
  Medal,
  Target,
  Play,
  Pause,
  Maximize2,
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  ArrowUpRight,
} from "./icons";

export interface MilestoneItem {
  id: string;
  src: string;
  alt: string;
  badge: string;
  title: string;
  subtitle: string;
  detail: string;
  category: "bounty" | "hackathon" | "podium" | "honors";
  theme: "emerald" | "amber" | "rose" | "cyan";
  amount: string;
  organization: string;
  date: string;
  projectHref?: string;
  projectLabel?: string;
  objectPosition: string;
  width: number;
  height: number;
  IconComponent: typeof Trophy;
}

export const MILESTONE_ITEMS: MilestoneItem[] = [
  {
    id: "glassdoor-bounty",
    src: "/images/achievements/glassdoor-bounty-650.jpg",
    alt: "Official RMK College announcement poster congratulating Jaikiran E for $650 Glassdoor bug bounty reward",
    badge: "GLASSDOOR $650 BOUNTY",
    title: "Responsible Disclosure & Reward",
    subtitle: "R.M.K. College of Eng. & Tech. (Cyber Security)",
    detail:
      "Business Logic Vulnerability: unauthorized Candidate Experience Survey injection accepted without an application/interview relationship. First rewarded Bugcrowd finding with Hall of Fame induction.",
    category: "bounty",
    theme: "emerald",
    amount: "$650 USD",
    organization: "Glassdoor (Bugcrowd Managed)",
    date: "September 2026",
    projectHref: "/security",
    projectLabel: "View Security Advisory",
    objectPosition: "center 10%",
    width: 819,
    height: 1024,
    IconComponent: Shield,
  },
  {
    id: "drestein-first-prize",
    src: "/images/achievements/drestein-100k-first-prize.jpg",
    alt: "Jaikiran and team of four receiving the Rs 1,00,000 First Prize winner cheque at DRESTEIN 26, Saveetha Engineering College",
    badge: "1ST PRIZE ₹1,00,000",
    title: "DRESTEIN '26 National Hackathon",
    subtitle: "Saveetha Engineering College • Team of 4",
    detail:
      "Problem statement revealed on-site — engineered 'WE care' AI Dementia & Elderly Care Platform from research to a working Android + web prototype in 48 hours, taking home the grand 1st Prize.",
    category: "hackathon",
    theme: "amber",
    amount: "₹1,00,000 INR",
    organization: "Saveetha Engineering College",
    date: "September 2026",
    projectHref: "/work/we-care",
    projectLabel: "Explore WE Care System",
    objectPosition: "center 28%",
    width: 768,
    height: 1024,
    IconComponent: Trophy,
  },
  {
    id: "hackathon-podium",
    src: "/images/achievements/hackathon-podium-award.jpg",
    alt: "Jaikiran holding certificate of excellence with team and university faculty dignitaries on auditorium stage",
    badge: "PODIUM EXCELLENCE",
    title: "National Hackathon & Innovation Award",
    subtitle: "Team CryptX • Certificate & Medal Ceremony",
    detail:
      "Honored on auditorium stage by academic and industry jury for multi-round hackathon performance, debugging, and live AI threat intelligence implementation.",
    category: "podium",
    theme: "rose",
    amount: "Podium Trophy & Medals",
    organization: "Team CryptX • RMKCET",
    date: "September 2026",
    projectHref: "/experience",
    projectLabel: "View Proof & Timeline",
    objectPosition: "center center",
    width: 480,
    height: 360,
    IconComponent: Medal,
  },
  {
    id: "ceremony-certificate",
    src: "/images/achievements/ceremony-certificate-stage.jpg",
    alt: "Jaikiran receiving winner honors and certificate from dignitaries during college technical award ceremony",
    badge: "STATE & COLLEGE HONORS",
    title: "Official Award Ceremony Presentation",
    subtitle: "Department of CSE (Cyber Security)",
    detail:
      "Recognized on stage by principal and department heads for high-rank competitive CTF finishes (DEFCON CTF 8th, TN Police CTF Top 26, St. Joseph's 1st Place) and cybersecurity research.",
    category: "honors",
    theme: "cyan",
    amount: "Honorary Certificate & Honors",
    organization: "Dept. of CSE (Cyber Security)",
    date: "2026",
    projectHref: "/experience",
    projectLabel: "View All CTF Finishes",
    objectPosition: "center 25%",
    width: 480,
    height: 319,
    IconComponent: Target,
  },
];

export function MilestoneMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIdx((prev) =>
          prev !== null ? (prev + 1) % MILESTONE_ITEMS.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx((prev) =>
          prev !== null
            ? (prev - 1 + MILESTONE_ITEMS.length) % MILESTONE_ITEMS.length
            : 0
        );
      }
    },
    [selectedIdx]
  );

  useEffect(() => {
    if (selectedIdx !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIdx, handleKeyDown]);

  const activeMilestone =
    selectedIdx !== null ? MILESTONE_ITEMS[selectedIdx] : null;

  return (
    <section
      className="section milestone-marquee-section"
      id="milestones"
      aria-labelledby="milestones-heading"
    >
      {/* Background ambient radial glow */}
      <div className="milestone-ambient-glow" aria-hidden="true" />

      <div className="container">
        {/* Top Header Row with executive stats */}
        <div className="milestone-header-row">
          <div className="milestone-header-main">
            <div className="eyebrow milestone-eyebrow">
              <span className="milestone-pulse-dot" aria-hidden="true" />
              FIELD PROOF &amp; PODIUM EVIDENCE
            </div>
            <h2 id="milestones-heading" className="h2 milestone-heading">
              Moments from the <span className="text-gradient-rose">Field &amp; Stage</span>.
            </h2>
            <p className="milestone-lede">
              Verifiable primary records: national hackathon winner checks, official college disclosure posters, and stage honors.
            </p>
          </div>

          <div className="milestone-header-actions">
            {/* Quick Metrics Bar */}
            <div className="milestone-metric-strip" aria-label="Key milestones summary">
              <div className="milestone-metric-pill">
                <span className="milestone-metric-val">4</span>
                <span className="milestone-metric-lbl">Primary Proofs</span>
              </div>
              <div className="milestone-metric-divider" aria-hidden="true" />
              <div className="milestone-metric-pill">
                <span className="milestone-metric-val">₹2,00,000+</span>
                <span className="milestone-metric-lbl">Hackathon Awards</span>
              </div>
              <div className="milestone-metric-divider" aria-hidden="true" />
              <div className="milestone-metric-pill">
                <span className="milestone-metric-val">$650</span>
                <span className="milestone-metric-lbl">Glassdoor Bounty</span>
              </div>
            </div>

            {/* Interactive Stream Controls */}
            <div className="milestone-controls">
              <button
                type="button"
                className="milestone-control-btn"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-pressed={isPaused}
                title={isPaused ? "Resume stream" : "Pause stream"}
              >
                <span
                  className={`milestone-status-indicator${isPaused ? " is-paused" : " is-active"}`}
                  aria-hidden="true"
                />
                {isPaused ? <Play size={13} /> : <Pause size={13} />}
                <span>{isPaused ? "Resume stream" : "Pause stream"}</span>
              </button>
              <span className="milestone-hint-pill" aria-hidden="true">
                Hover to pause • Click to inspect
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Track Viewport with dual edge gradient masks */}
      <div
        className={`milestone-marquee-viewport${isPaused ? " is-paused" : ""}`}
        role="region"
        aria-label="Infinite achievement showcase gallery"
      >
        <div ref={trackRef} className="milestone-marquee-track">
          {/* Set 1: Primary Interactive Elements */}
          {MILESTONE_ITEMS.map((item, idx) => {
            const Icon = item.IconComponent;
            return (
              <div
                key={`primary-${item.id}`}
                className={`milestone-card milestone-card--${item.theme}`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedIdx(idx);
                  }
                }}
              >
                {/* Top Corner Cyber Brackets */}
                <span className="milestone-corner milestone-corner--tl" aria-hidden="true" />
                <span className="milestone-corner milestone-corner--tr" aria-hidden="true" />
                <span className="milestone-corner milestone-corner--bl" aria-hidden="true" />
                <span className="milestone-corner milestone-corner--br" aria-hidden="true" />

                <div className="milestone-card-media">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 600px) 290px, (max-width: 1024px) 340px, 380px"
                    className="milestone-card-img"
                    style={{ objectPosition: item.objectPosition }}
                    priority={idx < 2}
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="milestone-card-media-overlay" aria-hidden="true" />

                  {/* Top Floating Badge Bar */}
                  <div className="milestone-card-topbar">
                    <span className={`milestone-card-badge milestone-card-badge--${item.theme}`}>
                      <Icon size={12} />
                      <span>{item.badge}</span>
                    </span>
                    <span className="milestone-inspect-icon" aria-hidden="true" title="Inspect full certificate">
                      <Maximize2 size={13} />
                    </span>
                  </div>

                  {/* Hover action banner */}
                  <div className="milestone-card-hover-prompt" aria-hidden="true">
                    <span>Inspect Full Record</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="milestone-card-footer">
                  <div className="milestone-card-meta-line">
                    <span className="milestone-card-tag">{item.organization}</span>
                    <span className="milestone-card-date">{item.date}</span>
                  </div>
                  <h3 className="milestone-card-title">{item.title}</h3>
                  <p className="milestone-card-sub">{item.subtitle}</p>
                </div>
              </div>
            );
          })}

          {/* Set 2: Duplicate for seamless loop */}
          {MILESTONE_ITEMS.map((item, idx) => {
            const Icon = item.IconComponent;
            return (
              <div
                key={`dupe1-${item.id}`}
                className={`milestone-card milestone-card--${item.theme}`}
                aria-hidden="true"
                tabIndex={-1}
                onClick={() => setSelectedIdx(idx)}
              >
                <span className="milestone-corner milestone-corner--tl" />
                <span className="milestone-corner milestone-corner--tr" />
                <span className="milestone-corner milestone-corner--bl" />
                <span className="milestone-corner milestone-corner--br" />

                <div className="milestone-card-media">
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 290px, (max-width: 1024px) 340px, 380px"
                    className="milestone-card-img"
                    style={{ objectPosition: item.objectPosition }}
                  />
                  <div className="milestone-card-media-overlay" />
                  <div className="milestone-card-topbar">
                    <span className={`milestone-card-badge milestone-card-badge--${item.theme}`}>
                      <Icon size={12} />
                      <span>{item.badge}</span>
                    </span>
                    <span className="milestone-inspect-icon">
                      <Maximize2 size={13} />
                    </span>
                  </div>
                  <div className="milestone-card-hover-prompt">
                    <span>Inspect Full Record</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                <div className="milestone-card-footer">
                  <div className="milestone-card-meta-line">
                    <span className="milestone-card-tag">{item.organization}</span>
                    <span className="milestone-card-date">{item.date}</span>
                  </div>
                  <div className="milestone-card-title">{item.title}</div>
                  <div className="milestone-card-sub">{item.subtitle}</div>
                </div>
              </div>
            );
          })}

          {/* Set 3: Triplicate ensures zero gap on ultra-wide / 4K displays */}
          {MILESTONE_ITEMS.map((item, idx) => {
            const Icon = item.IconComponent;
            return (
              <div
                key={`dupe2-${item.id}`}
                className={`milestone-card milestone-card--${item.theme}`}
                aria-hidden="true"
                tabIndex={-1}
                onClick={() => setSelectedIdx(idx)}
              >
                <span className="milestone-corner milestone-corner--tl" />
                <span className="milestone-corner milestone-corner--tr" />
                <span className="milestone-corner milestone-corner--bl" />
                <span className="milestone-corner milestone-corner--br" />

                <div className="milestone-card-media">
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 290px, (max-width: 1024px) 340px, 380px"
                    className="milestone-card-img"
                    style={{ objectPosition: item.objectPosition }}
                  />
                  <div className="milestone-card-media-overlay" />
                  <div className="milestone-card-topbar">
                    <span className={`milestone-card-badge milestone-card-badge--${item.theme}`}>
                      <Icon size={12} />
                      <span>{item.badge}</span>
                    </span>
                    <span className="milestone-inspect-icon">
                      <Maximize2 size={13} />
                    </span>
                  </div>
                  <div className="milestone-card-hover-prompt">
                    <span>Inspect Full Record</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                <div className="milestone-card-footer">
                  <div className="milestone-card-meta-line">
                    <span className="milestone-card-tag">{item.organization}</span>
                    <span className="milestone-card-date">{item.date}</span>
                  </div>
                  <div className="milestone-card-title">{item.title}</div>
                  <div className="milestone-card-sub">{item.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Interactive Lightbox Modal */}
      {activeMilestone && (
        <div
          className="milestone-lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-modal-title"
          onClick={() => setSelectedIdx(null)}
        >
          <div
            className="milestone-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              className="milestone-lightbox-close"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close milestone preview dialog"
            >
              <X size={18} />
            </button>

            {/* Previous and Next Navigation Buttons */}
            <button
              type="button"
              className="milestone-lightbox-nav milestone-lightbox-nav--prev"
              onClick={() =>
                setSelectedIdx((prev) =>
                  prev !== null
                    ? (prev - 1 + MILESTONE_ITEMS.length) % MILESTONE_ITEMS.length
                    : 0
                )
              }
              aria-label="Previous milestone"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              className="milestone-lightbox-nav milestone-lightbox-nav--next"
              onClick={() =>
                setSelectedIdx((prev) =>
                  prev !== null ? (prev + 1) % MILESTONE_ITEMS.length : 0
                )
              }
              aria-label="Next milestone"
            >
              <ArrowRight size={18} />
            </button>

            <div className="milestone-lightbox-content">
              {/* Image Preview Side */}
              <div className="milestone-lightbox-media-wrap">
                <Image
                  src={activeMilestone.src}
                  alt={activeMilestone.alt}
                  width={activeMilestone.width}
                  height={activeMilestone.height}
                  className="milestone-lightbox-img"
                  priority
                />

                {/* Thumbnail Strip for Direct Switching */}
                <div className="milestone-lightbox-thumbs" role="tablist" aria-label="Milestone thumbnails">
                  {MILESTONE_ITEMS.map((thumbItem, thumbIdx) => (
                    <button
                      key={thumbItem.id}
                      type="button"
                      className={`milestone-lightbox-thumb${thumbIdx === selectedIdx ? " is-active" : ""}`}
                      onClick={() => setSelectedIdx(thumbIdx)}
                      aria-label={`View ${thumbItem.title}`}
                      aria-selected={thumbIdx === selectedIdx}
                      role="tab"
                    >
                      <Image
                        src={thumbItem.src}
                        alt=""
                        width={60}
                        height={60}
                        className="milestone-lightbox-thumb-img"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Information & Verification Details Side */}
              <div className="milestone-lightbox-meta">
                <div className="milestone-lightbox-badge-row">
                  <span className={`milestone-card-badge milestone-card-badge--${activeMilestone.theme}`}>
                    <activeMilestone.IconComponent size={14} />
                    <span>{activeMilestone.badge}</span>
                  </span>
                  <span className="milestone-lightbox-counter">
                    {(selectedIdx ?? 0) + 1} of {MILESTONE_ITEMS.length}
                  </span>
                </div>

                <h3 id="lightbox-modal-title" className="milestone-lightbox-title">
                  {activeMilestone.title}
                </h3>
                <p className="milestone-lightbox-sub">{activeMilestone.subtitle}</p>

                {/* Structured Verification Bento Grid */}
                <div className="milestone-lightbox-grid">
                  <div className="milestone-grid-cell">
                    <span className="milestone-grid-label">Award / Value</span>
                    <span className="milestone-grid-value text-accent-bold">
                      {activeMilestone.amount}
                    </span>
                  </div>
                  <div className="milestone-grid-cell">
                    <span className="milestone-grid-label">Verified Entity</span>
                    <span className="milestone-grid-value">
                      {activeMilestone.organization}
                    </span>
                  </div>
                  <div className="milestone-grid-cell">
                    <span className="milestone-grid-label">Timeline</span>
                    <span className="milestone-grid-value">
                      {activeMilestone.date}
                    </span>
                  </div>
                  <div className="milestone-grid-cell">
                    <span className="milestone-grid-label">Evidence Type</span>
                    <span className="milestone-grid-value">
                      <Check size={12} /> Primary Source Photo
                    </span>
                  </div>
                </div>

                <p className="milestone-lightbox-detail">{activeMilestone.detail}</p>

                {/* Project or Evidence Navigation Link */}
                {activeMilestone.projectHref && (
                  <div className="milestone-lightbox-actions">
                    <Link
                      href={activeMilestone.projectHref}
                      className="button button--burgundy milestone-lightbox-cta"
                      onClick={() => setSelectedIdx(null)}
                    >
                      <span>{activeMilestone.projectLabel ?? "Explore Details"}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                )}

                <div className="milestone-lightbox-footer">
                  <span className="milestone-lightbox-hint">
                    Press <kbd>Esc</kbd> to close • <kbd>←</kbd> <kbd>→</kbd> to navigate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
