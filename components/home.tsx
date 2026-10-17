"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, ArrowUpRight, Mail, Linkedin, MapPin, Briefcase,
  Trophy, Shield, DollarSign, Building, Star,
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
  { id: "bugcrowd", icon: "dollar" as const, label: "$650", sublabel: "Bug Bounty", detail: "Glassdoor Security Team" },
  { id: "cdac",     icon: "building" as const, label: "Internship", sublabel: "C-DAC Chennai", detail: "Jun – Jul 2025" },
  { id: "drestein", icon: "trophy" as const, label: "₹1,00,000", sublabel: "1st Prize", detail: "DRESTEIN '26" },
  { id: "defcon",   icon: "shield" as const, label: "8th Place", sublabel: "DEFCON-conducted CTF", detail: "International, team" },
];
const ACHIEVEMENT_ICONS = { trophy: Trophy, shield: Shield, dollar: DollarSign, building: Building, star: Star };

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
  nextjs:     <span style={{ fontWeight: 900, fontSize: ".7rem" }}>N</span>,
  fastapi:    <span style={{ fontWeight: 900, fontSize: ".55rem", color: "#00c7b1" }}>⬡</span>,
  postgresql: <span style={{ fontWeight: 900, fontSize: ".55rem", color: "#336791" }}>⬡</span>,
  python:     <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#1D5380" }}>Py</span>,
  ai:         <span style={{ fontWeight: 900, fontSize: ".6rem" }}>AI</span>,
  react:      <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#61dafb" }}>⚛</span>,
  kotlin:     <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#7F52FF" }}>K</span>,
  android:    <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#3DDC84" }}>▲</span>,
  firebase:   <span style={{ fontWeight: 900, fontSize: ".6rem", color: "#FFA000" }}>▲</span>,
};

function WeCareVisual() {
  return (
    <svg className="proj-visual" viewBox="0 0 320 180" preserveAspectRatio="none">
      <rect width="320" height="180" fill="#0a1630" />
      <circle cx="60" cy="90" r="34" fill="none" stroke="#35D07F" strokeWidth="3" opacity=".6" />
      <circle cx="60" cy="90" r="18" fill="#35D07F" opacity=".25" />
      <rect x="120" y="40" width="160" height="10" rx="3" fill="rgba(248,240,229,.3)" />
      <rect x="120" y="62" width="120" height="8" rx="3" fill="rgba(248,240,229,.18)" />
      <rect x="120" y="100" width="90" height="26" rx="6" fill="#A32847" opacity=".5" />
      <rect x="220" y="100" width="60" height="26" rx="6" fill="rgba(248,240,229,.12)" />
      <rect x="120" y="140" width="160" height="8" rx="3" fill="rgba(248,240,229,.14)" />
    </svg>
  );
}
function NetPulseVisual() {
  return (
    <svg className="proj-visual" viewBox="0 0 320 180" preserveAspectRatio="none">
      <rect width="320" height="180" fill="#0a1630" />
      <polyline points="20,140 60,110 95,125 130,80 165,100 200,60 235,95 270,50 300,75" fill="none" stroke="#C8405F" strokeWidth="2.5" />
      <circle cx="130" cy="80" r="4" fill="#C8405F" />
      <circle cx="200" cy="60" r="4" fill="#C8405F" />
      <rect x="20" y="150" width="60" height="6" rx="3" fill="rgba(248,240,229,.2)" />
      <rect x="90" y="150" width="60" height="6" rx="3" fill="rgba(248,240,229,.2)" />
      <rect x="160" y="150" width="60" height="6" rx="3" fill="rgba(248,240,229,.2)" />
      <rect x="230" y="150" width="60" height="6" rx="3" fill="rgba(248,240,229,.2)" />
    </svg>
  );
}
function AranVisual() {
  return (
    <svg className="proj-visual" viewBox="0 0 320 180" preserveAspectRatio="none">
      <rect width="320" height="180" fill="#0a1630" />
      <rect x="30" y="30" width="60" height="60" rx="8" fill="rgba(248,240,229,.1)" />
      <text x="60" y="66" textAnchor="middle" fontSize="20" fill="#35D07F" fontWeight="700">87</text>
      <rect x="110" y="30" width="60" height="60" rx="8" fill="rgba(248,240,229,.1)" />
      <text x="140" y="66" textAnchor="middle" fontSize="20" fill="#E0B23D" fontWeight="700">62</text>
      <rect x="190" y="30" width="60" height="60" rx="8" fill="rgba(163,40,71,.3)" />
      <text x="220" y="66" textAnchor="middle" fontSize="20" fill="#C8405F" fontWeight="700">24</text>
      <rect x="30" y="110" width="220" height="8" rx="4" fill="rgba(248,240,229,.15)" />
      <rect x="30" y="128" width="160" height="8" rx="4" fill="rgba(248,240,229,.15)" />
      <rect x="30" y="146" width="190" height="8" rx="4" fill="rgba(248,240,229,.15)" />
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
        <h2 id="highlights-title" className="h2" style={{ color: "var(--navy)" }}>CTFs &amp; Highlights</h2>
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
    <section className="section arsenal-section arsenal-section--cream" id="arsenal" aria-labelledby="arsenal-title">
      <div className="container">
        <div className="arsenal-layout">
          <div className="arsenal-col-left reveal" style={{ flex: "1 1 100%" }}>
            <div className="arsenal-label">SKILLS &amp; TOOLS</div>
            <h2 id="arsenal-title" className="h2" style={{ color: "var(--navy)", marginBottom: "1.5rem" }}>My Arsenal</h2>

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

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(8,32,82,.1)" }}>
          <p className="achievement-strip-eyebrow" style={{ color: "var(--burgundy)" }}>CURRENTLY EXPLORING</p>
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
        <div>
          <Image
            src="/images/portrait.jpg"
            alt="Portrait of Jaikiran E"
            width={260}
            height={320}
            style={{ objectFit: "cover", objectPosition: "top", borderRadius: "18px", border: "1px solid rgba(248,240,229,.15)" }}
          />
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
            <nav className="contact-links" aria-label="Contact links">
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
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--burgundy)", display: "grid", placeItems: "center", color: "var(--cream)", flexShrink: 0 }}>
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
