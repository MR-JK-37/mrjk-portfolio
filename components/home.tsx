"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, ArrowUpRight, Mail, Linkedin, MapPin, Briefcase,
  Trophy, Shield, DollarSign, Building, Star, Medal,
  Cpu, Network, Activity, Layers, Server, Target, Lock,
} from "./icons";
import { profile } from "@/content/profile";
import { proofLog } from "@/content/achievements";
import { featuredProjects, otherProjects } from "@/content/projects";
import { skillGroups, currentlyExploring } from "@/content/skills";
import { site } from "@/lib/site";

/* ════════════════════════════════════════════
   FEATURED IN — floating glass strip (real items only)
════════════════════════════════════════════ */
const FEATURED_IN = [
  { id: "noctivus", icon: "trophy" as const,   label: "4th Place",   sublabel: "NOCTIVUS '25", detail: "Team CYBERBEINGS" },
  { id: "nullcore", icon: "medal" as const,    label: "13th Place",  sublabel: "NULL CORE",    detail: "Team SPARTANS" },
  { id: "bugcrowd", icon: "shield" as const,   label: "$650",        sublabel: "Bug Bounty",   detail: "Glassdoor Security Team" },
  { id: "cdac",     icon: "building" as const, label: "Internship",  sublabel: "C-DAC Chennai", detail: "Jun 2025 – Jul 2025" },
  { id: "gemini",   icon: "star" as const,     label: "Shortlisted", sublabel: "Google Gemini", detail: "Student Ambassador 2026" },
];
const ACHIEVEMENT_ICONS = { trophy: Trophy, medal: Medal, shield: Shield, dollar: DollarSign, building: Building, star: Star };

export function AchievementStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && ref.current?.classList.add("in-view"),
      { threshold: 0.3 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="achievement-strip">
      <div className="container achievement-strip-container">
        <div ref={ref} className="achievement-strip-inner reveal">
          <p className="achievement-strip-eyebrow">
            <span aria-hidden="true" />
            FEATURED IN
          </p>
          <div className="achievement-strip-items">
            {FEATURED_IN.map((a) => {
              const Icon = ACHIEVEMENT_ICONS[a.icon];
              return (
                <div key={a.id} className="achievement-item">
                  <div className="achievement-icon"><Icon size={20} /></div>
                  <div className="achievement-label" data-count-to={a.label}>{a.label}</div>
                  <div className="achievement-sublabel">{a.sublabel}</div>
                  <div className="achievement-detail">{a.detail}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SELECTED WORK — real projects, simple inset visuals
════════════════════════════════════════════ */
const STACK_ICONS: Record<string, React.ReactNode> = {
  nextjs:     <span style={{ fontWeight: 900, fontSize: ".7rem", color: "#F8FAFC" }}>N</span>,
  fastapi:    <span style={{ fontWeight: 900, fontSize: ".55rem", color: "#2DD4BF" }}>⬡</span>,
  postgresql: <span style={{ fontWeight: 900, fontSize: ".55rem", color: "#60A5FA" }}>⬡</span>,
  python:     <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#38BDF8" }}>Py</span>,
  ai:         <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#FB7185" }}>AI</span>,
  react:      <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#61dafb" }}>⚛</span>,
  kotlin:     <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#A78BFA" }}>K</span>,
  android:    <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#3DDC84" }}>▲</span>,
  firebase:   <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#FBBF24" }}>▲</span>,
};

function WeCareVisual() {
  return (
    <svg className="proj-visual" viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="wecareBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1A30" />
          <stop offset="100%" stopColor="#050E1A" />
        </linearGradient>
        <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="80%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#wecareBg)" />
      
      {/* Grid Lines */}
      <g opacity="0.1">
        <line x1="0" y1="45" x2="320" y2="45" stroke="#38BDF8" strokeWidth="0.8" />
        <line x1="0" y1="90" x2="320" y2="90" stroke="#38BDF8" strokeWidth="0.8" />
        <line x1="0" y1="135" x2="320" y2="135" stroke="#38BDF8" strokeWidth="0.8" />
      </g>

      {/* Top Telemetry Header */}
      <rect x="12" y="10" width="296" height="22" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <circle cx="24" cy="21" r="3" fill="#10B981" />
      <text x="34" y="24" fill="#38BDF8" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">AI CAREGIVER MONITOR</text>
      <text x="220" y="24" fill="#10B981" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="700">STAGE-2 ACTIVE</text>

      {/* Voice Frequency Spectrogram Bars */}
      <g transform="translate(18, 48)">
        {[14, 28, 42, 22, 36, 50, 62, 38, 20, 48, 56, 32, 18, 40, 52, 24].map((h, i) => (
          <rect key={i} x={i * 8} y={65 - h} width="5" height={h} rx="2" fill="rgba(56, 189, 248, 0.65)" />
        ))}
        <text x="0" y="80" fill="rgba(248,240,229,0.7)" fontSize="7" fontFamily="var(--font-mono)">VOICE BIOMARKER TRIAGE</text>
      </g>

      {/* Dementia Cognitive Orientation Gauge */}
      <g transform="translate(195, 52)">
        <circle cx="50" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
        <circle cx="50" cy="40" r="30" fill="none" stroke="#10B981" strokeWidth="5" strokeDasharray="160 190" strokeLinecap="round" />
        <text x="50" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontFamily="var(--font-display)" fontWeight="700">94%</text>
        <text x="50" y="50" textAnchor="middle" fill="rgba(248,240,229,0.7)" fontSize="6" fontFamily="var(--font-mono)">ORIENTATION</text>
      </g>

      {/* Biometric ECG Wave Trace */}
      <path d="M 12 155 L 70 155 L 80 142 L 90 168 L 100 132 L 110 162 L 120 155 L 200 155 L 210 145 L 220 165 L 230 155 L 308 155" fill="none" stroke="url(#ecgGrad)" strokeWidth="1.8" />
      <circle cx="100" cy="132" r="3" fill="#FB7185" />
      <text x="14" y="172" fill="rgba(248,240,229,0.6)" fontSize="6.5" fontFamily="var(--font-mono)">TELEMETRY: DRESTEIN 1ST PRIZE [₹1,00,000] • KOTLIN + FASTAPI</text>
    </svg>
  );
}

function NetPulseVisual() {
  return (
    <svg className="proj-visual" viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="netBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1528" />
          <stop offset="100%" stopColor="#040914" />
        </linearGradient>
        <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(251, 113, 133, 0.4)" />
          <stop offset="100%" stopColor="rgba(251, 113, 133, 0)" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#netBg)" />

      {/* Top Header Strip */}
      <rect x="12" y="10" width="296" height="22" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <circle cx="24" cy="21" r="3" fill="#FB7185" />
      <text x="34" y="24" fill="#F8FAFC" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">NETPULSE // ARP SNIFFER</text>
      <text x="215" y="24" fill="#38BDF8" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="700">8,420 PKTS/S</text>

      {/* Traffic Throughput Area Wave */}
      <path d="M 12 110 L 45 88 L 85 96 L 125 58 L 165 78 L 205 45 L 245 70 L 285 38 L 308 55 L 308 118 L 12 118 Z" fill="url(#areaGlow)" />
      <polyline points="12,110 45,88 85,96 125,58 165,78 205,45 245,70 285,38 308,55" fill="none" stroke="#FB7185" strokeWidth="2" />
      <circle cx="205" cy="45" r="3" fill="#FB7185" />
      <circle cx="285" cy="38" r="3" fill="#38BDF8" />

      {/* Live Packet Inspection Log Terminal */}
      <g transform="translate(12, 122)">
        <rect x="0" y="0" width="296" height="48" rx="4" fill="rgba(2, 6, 16, 0.85)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <text x="8" y="13" fill="#38BDF8" fontSize="6.5" fontFamily="var(--font-mono)">[ARP] 192.168.1.104 &gt; WHO-HAS 192.168.1.1? [RESOLVED]</text>
        <text x="8" y="26" fill="#10B981" fontSize="6.5" fontFamily="var(--font-mono)">[DEVICE] NEW HOST DISCOVERED: 00:1A:2B:6C:8D [SAFE]</text>
        <text x="8" y="39" fill="#FB7185" fontSize="6.5" fontFamily="var(--font-mono)">[SECURITY] PROMISCUOUS PACKET AUDIT: 0 ANOMALIES</text>
      </g>
    </svg>
  );
}

function AranVisual() {
  return (
    <svg className="proj-visual" viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="aranBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B172C" />
          <stop offset="100%" stopColor="#040914" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#aranBg)" />

      {/* Top Header Strip */}
      <rect x="12" y="10" width="296" height="22" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <circle cx="24" cy="21" r="3" fill="#FBBF24" />
      <text x="34" y="24" fill="#F8FAFC" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">ARAN // EDGE-AI TELEMETRY</text>
      <text x="210" y="24" fill="#10B981" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="700">MACHINE HEALTH: 96%</text>

      {/* Three Metric Bento Gauges */}
      <g transform="translate(12, 38)">
        {/* Metric 1: Vibration */}
        <rect x="0" y="0" width="94" height="60" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.8" />
        <text x="10" y="16" fill="rgba(248, 240, 229, 0.6)" fontSize="6" fontFamily="var(--font-mono)">VIBRATION</text>
        <text x="10" y="38" fill="#10B981" fontSize="18" fontFamily="var(--font-display)" fontWeight="700">1.8</text>
        <text x="44" y="38" fill="rgba(248, 240, 229, 0.6)" fontSize="7" fontFamily="var(--font-mono)">mm/s</text>
        <text x="10" y="52" fill="#10B981" fontSize="6.5" fontFamily="var(--font-mono)">✓ NOMINAL</text>

        {/* Metric 2: Temperature */}
        <rect x="101" y="0" width="94" height="60" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" />
        <text x="111" y="16" fill="rgba(248, 240, 229, 0.6)" fontSize="6" fontFamily="var(--font-mono)">CORE TEMP</text>
        <text x="111" y="38" fill="#38BDF8" fontSize="18" fontFamily="var(--font-display)" fontWeight="700">42°</text>
        <text x="145" y="38" fill="rgba(248, 240, 229, 0.6)" fontSize="7" fontFamily="var(--font-mono)">Celsius</text>
        <text x="111" y="52" fill="#38BDF8" fontSize="6.5" fontFamily="var(--font-mono)">✓ STABLE</text>

        {/* Metric 3: RUL */}
        <rect x="202" y="0" width="94" height="60" rx="8" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="0.8" />
        <text x="212" y="16" fill="rgba(248, 240, 229, 0.6)" fontSize="6" fontFamily="var(--font-mono)">REMAINING LIFE</text>
        <text x="212" y="38" fill="#FBBF24" fontSize="18" fontFamily="var(--font-display)" fontWeight="700">840</text>
        <text x="254" y="38" fill="rgba(248, 240, 229, 0.6)" fontSize="7" fontFamily="var(--font-mono)">Hours</text>
        <text x="212" y="52" fill="#FBBF24" fontSize="6.5" fontFamily="var(--font-mono)">• NO RISK</text>
      </g>

      {/* FFT Vibration Frequency Bar Spectrum */}
      <g transform="translate(16, 108)">
        <text x="0" y="10" fill="rgba(248,240,229,0.7)" fontSize="6.5" fontFamily="var(--font-mono)">FFT VIBRATION FREQUENCY SPECTRUM (0–2000 Hz)</text>
        {[8, 14, 22, 38, 26, 44, 18, 12, 28, 48, 30, 16, 20, 36, 10, 6, 12, 24, 16, 8].map((h, i) => (
          <rect key={i} x={i * 14} y={55 - h} width="9" height={h} rx="2" fill="rgba(56, 189, 248, 0.6)" />
        ))}
      </g>
      <text x="14" y="172" fill="rgba(248,240,229,0.6)" fontSize="6.5" fontFamily="var(--font-mono)">DEPLOYED: RASPBERRY PI + SCIKIT-LEARN • MSME HACKATHON 6.0</text>
    </svg>
  );
}

const PROJECT_VISUALS: Record<string, React.ReactNode> = {
  "we-care": <WeCareVisual />,
  netpulse: <NetPulseVisual />,
  aran: <AranVisual />,
};
const PROJECT_ICONS: Record<string, React.ReactNode> = {
  "we-care": <Layers size={20} />,
  netpulse: <Network size={20} />,
  aran: <Target size={20} />,
};

function ProjectCard({ project, index }: { project: typeof featuredProjects[number]; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card-new reveal"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="project-card-top">
        <div className="project-number-row">
          <span className="project-category-pill">{project.categoryPill}</span>
          <span className="project-card-number">{project.number}</span>
        </div>
        <div className="project-icon-tile">{PROJECT_ICONS[project.id]}</div>
        <div className="project-card-name">{project.name}</div>
        <div className="project-card-summary">{project.summary}</div>
      </div>

      <div className="project-visual-inset" aria-hidden="true">
        {PROJECT_VISUALS[project.id]}
      </div>

      <div className="project-card-footer">
        <div className="project-stack-chips">
          {project.stack.map((s) => (
            <span key={s.name} className="stack-chip">
              {STACK_ICONS[s.icon]}
              {s.name}
            </span>
          ))}
        </div>
        <span className="project-arrow-btn" aria-hidden="true"><ArrowUpRight size={16} /></span>
      </div>
    </Link>
  );
}

export function SelectedWork() {
  return (
    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="work-header reveal">
          <div className="work-header-left">
            <div className="eyebrow" style={{ marginBottom: ".75rem" }}>FEATURED PROJECTS</div>
            <div className="work-title-row">
              <h2 id="work-title" className="h2">Selected Work</h2>
              <div className="work-title-line" aria-hidden="true" />
            </div>
          </div>
          <Link href="/projects" className="work-header-link">
            View All Projects <ArrowRight size={15} />
          </Link>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {otherProjects.map((p) => (
              <span key={p.id} className="stack-chip" style={{ fontSize: ".82rem", padding: ".5rem 1rem" }}>
                {p.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   CTFs & HIGHLIGHTS — real, dated, from resume/LinkedIn
════════════════════════════════════════════ */
export function HighlightsSection() {
  const items = proofLog.filter((e) => e.kind === "bounty" || e.kind === "hackathon" || e.kind === "ctf");
  const kindLabel: Record<string, string> = { bounty: "Bug bounty", hackathon: "Hackathon", ctf: "CTF" };

  return (
    <section className="section highlights-section" id="highlights" aria-labelledby="highlights-title">
      <div className="container">
        <p className="eyebrow">ACHIEVEMENTS</p>
        <h2 id="highlights-title" className="h2">CTFs &amp; Highlights</h2>
        <div className="highlights-grid">
          {items.map((entry, index) => (
            <div
              key={entry.id}
              className="highlight-card reveal"
              style={{ transitionDelay: `${(index % 4) * 70}ms` }}
            >
              <span className="highlight-kind">{kindLabel[entry.kind]}</span>
              <h3 className="highlight-title">{entry.title}</h3>
              {entry.detail && <p className="highlight-detail">{entry.detail}</p>}
              <span className="highlight-date">{entry.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   MY ARSENAL — filter tabs, real skills from resume
════════════════════════════════════════════ */
const GROUP_ICONS: Record<string, React.ReactNode> = {
  security: <Lock size={15} />,
  ctf: <Activity size={15} />,
  programming: <Cpu size={15} />,
  frameworks: <Server size={15} />,
};

export function Arsenal() {
  const [active, setActive] = useState<string>("all");
  const visibleGroups = active === "all" ? skillGroups : skillGroups.filter((g) => g.id === active);

  return (
    <section className="section arsenal-section" id="arsenal" aria-labelledby="arsenal-title">
      <div className="container">
        <div className="arsenal-layout">
          <div className="arsenal-col-left reveal" style={{ flex: "1 1 100%" }}>
            <div className="arsenal-label">SKILLS &amp; TOOLS</div>
            <h2 id="arsenal-title" className="h2" style={{ marginBottom: "1.5rem" }}>My Arsenal</h2>

            <div className="arsenal-filter-tabs" role="group" aria-label="Filter skills">
              <button
                className={`arsenal-filter-tab${active === "all" ? " active" : ""}`}
                onClick={() => setActive("all")}
                aria-pressed={active === "all"}
                type="button"
              >
                All
              </button>
              {skillGroups.map((g) => (
                <button
                  key={g.id}
                  className={`arsenal-filter-tab${active === g.id ? " active" : ""}`}
                  onClick={() => setActive(g.id)}
                  aria-pressed={active === g.id}
                  type="button"
                >
                  {g.label}
                </button>
              ))}
            </div>

            <div className="arsenal-rows-wrap" role="list" aria-label="Skills">
              {visibleGroups.map((group) => (
                <div key={group.id} className="arsenal-row" style={{ marginBottom: ".6rem" }}>
                  {group.items.map((item) => (
                    <span key={item} className="arsenal-chip" role="listitem">
                      <span className="arsenal-chip-icon">{GROUP_ICONS[group.id]}</span>
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <Link href="/experience" className="arsenal-view-details">
              View Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(248,240,229,.1)" }}>
          <p className="achievement-strip-eyebrow" style={{ color: "#FB7185" }}>CURRENTLY EXPLORING</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginTop: "1rem" }}>
            {currentlyExploring.map((item) => (
              <span key={item} className="arsenal-chip" style={{ fontSize: ".85rem" }}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   ABOUT ME — dark teaser panel, real bio
════════════════════════════════════════════ */
export function AboutMe() {
  return (
    <section className="about-teaser" id="about" aria-labelledby="about-title">
      <div className="container about-teaser-layout">
        <div className="about-photo-frame">
          <div className="about-photo-status">
            <span className="about-status-dot" />
            <span>SECURITY RESEARCHER // UNDERGRAD</span>
          </div>
          <div className="about-photo-inner">
            <Image
              src="/images/portrait.jpg"
              alt="Portrait of Jaikiran E"
              width={260}
              height={320}
              className="about-photo-img"
            />
            <span className="photo-bracket photo-bracket--tl" aria-hidden="true" />
            <span className="photo-bracket photo-bracket--tr" aria-hidden="true" />
            <span className="photo-bracket photo-bracket--bl" aria-hidden="true" />
            <span className="photo-bracket photo-bracket--br" aria-hidden="true" />
          </div>
        </div>
        <div className="about-teaser-body reveal">
          <p className="eyebrow eyebrow--light">ABOUT ME</p>
          <h2 id="about-title" className="about-teaser-heading">
            A student, builder <br /> and <em>problem solver</em>.
          </h2>
          <p>{profile.about}</p>
          <div className="about-chips" style={{ marginBottom: "1.5rem" }}>
            <span className="about-chip">
              <span className="about-chip-icon"><MapPin size={15} /></span>
              <div className="about-chip-text"><span>{profile.location}</span></div>
            </span>
            <span className="about-chip">
              <span className="about-chip-icon"><Briefcase size={15} /></span>
              <div className="about-chip-text"><span>Open to internships &amp; opportunities</span></div>
            </span>
          </div>
          <Link href="/experience" className="button button--outline">
            Know More <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   CONTACT — static: links only, no form/API
════════════════════════════════════════════ */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    if (site.email) {
      navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const links = [
    site.email && { label: "Email", href: `mailto:${site.email}` },
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Bugcrowd", href: profile.bugcrowd },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-layout">
          <div>
            <p className="eyebrow eyebrow--light">CONTACT</p>
            <h2 id="contact-title" className="h2">Let&apos;s talk.</h2>
            <p style={{ marginTop: "1rem", maxWidth: "46ch", color: "rgba(248,240,229,.7)" }}>
              I&apos;m looking for internships and projects where security research turns into working software.
            </p>

            {site.email && (
              <button
                type="button"
                onClick={copyEmail}
                className="contact-copy-pill"
                aria-label="Copy email address"
              >
                <span className="contact-copy-dot" />
                <span className="contact-copy-text">{copied ? `Copied: ${site.email}` : site.email}</span>
                <span className="contact-copy-badge">{copied ? "✓ Copied" : "Copy"}</span>
              </button>
            )}

            <nav className="contact-links" aria-label="Contact links" style={{ marginTop: "1.25rem" }}>
              {links.map((link) => (
                <a key={link.label} href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer" className="contact-link">
                  {link.label} ↗
                </a>
              ))}
            </nav>
          </div>

          <div className="contact-form-wrap glass-navy" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "2.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".85rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#BE123C", display: "grid", placeItems: "center", color: "#FFF", flexShrink: 0, boxShadow: "0 0 16px rgba(190, 18, 60, 0.4)" }}>
                <Linkedin size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--cream)", margin: 0 }}>Direct Inquiries &amp; Collaboration</h3>
                <p style={{ fontSize: ".82rem", color: "rgba(248,240,229,.75)", margin: ".2rem 0 0" }}>Open to security engineering internships, research, and technical projects.</p>
              </div>
            </div>
            <p style={{ color: "rgba(248,240,229,.85)", fontSize: ".92rem", lineHeight: 1.6, margin: 0 }}>
              The fastest way to reach me is through LinkedIn or direct email. I review incoming messages daily.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: ".5rem" }}>
              <a className="button button--burgundy" href={profile.linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn <ArrowUpRight size={15} />
              </a>
              {site.email ? (
                <a className="button button--outline" href={`mailto:${site.email}`}>
                  Send Email <Mail size={15} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════ */
export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      }).format(new Date()),
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const socials = [
    { label: "GitHub",   href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Bugcrowd", href: profile.bugcrowd },
    site.email && { label: "Email", href: `mailto:${site.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-layout">
          <div>
            <Link href="/" className="footer-brand">
              <span style={{ color: "var(--burgundy)" }}>✦</span> {profile.displayName}
            </Link>
            <p className="footer-tagline">
              Cybersecurity student building security tools and AI-powered products.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/projects">Projects</Link>
            <Link href="/experience">Experience</Link>
            <Link href="/#about">About</Link>
            <Link href="/security">Security</Link>
            <Link href="/resume">Resume</Link>
          </nav>

          <div className="footer-socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer" className="footer-social">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {new Date().getFullYear()} {profile.displayName} · {profile.location} · {time || "IST"}
          </span>
          <Link href="/security" className="footer-security-link">
            Security Policy ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
