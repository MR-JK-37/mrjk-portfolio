"use client";

import Link from "next/link";
import {
  Github, Linkedin, Youtube, Mail, AtSign,
} from "./icons";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";

const SOCIALS = [
  { label: "GitHub",   href: profile.github,                            Icon: Github   },
  { label: "LinkedIn", href: profile.linkedin,                          Icon: Linkedin },
  { label: "Bugcrowd", href: profile.bugcrowd,                          Icon: AtSign   },
  { label: "YouTube",  href: profile.youtube,                           Icon: Youtube  },
  { label: "Email",    href: site.email ? `mailto:${site.email}` : null, Icon: Mail    },
] as const;

/* Illustrated laptop + security dashboard scene (no stock photo, no baked text) */
function DashboardScene() {
  return (
    <svg className="hero-scene-svg" viewBox="0 0 560 420" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="laptopBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c2b4a" />
          <stop offset="100%" stopColor="#0c1830" />
        </linearGradient>
        <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f2050" />
          <stop offset="100%" stopColor="#051030" />
        </linearGradient>
      </defs>

      {/* desk surface */}
      <ellipse cx="280" cy="392" rx="260" ry="22" fill="rgba(5,21,56,.18)" />

      {/* laptop base */}
      <rect x="120" y="330" width="320" height="16" rx="4" fill="url(#laptopBody)" />
      <polygon points="100,330 460,330 440,346 120,346" fill="#14233f" />

      {/* laptop screen */}
      <rect x="140" y="110" width="280" height="222" rx="10" fill="#0a1630" />
      <rect x="150" y="120" width="260" height="202" rx="4" fill="url(#screenGlow)" />

      {/* dashboard chrome dots */}
      <circle cx="164" cy="134" r="3" fill="#A32847" />
      <circle cx="176" cy="134" r="3" fill="rgba(248,240,229,.4)" />
      <circle cx="188" cy="134" r="3" fill="rgba(248,240,229,.4)" />

      {/* dashboard content: line chart */}
      <polyline points="162,230 190,210 212,222 236,190 258,205 282,175 306,195 330,165 356,185 380,160"
        fill="none" stroke="#C8405F" strokeWidth="2.5" />
      <polyline points="162,230 190,210 212,222 236,190 258,205 282,175 306,195 330,165 356,185 380,160 380,290 162,290"
        fill="rgba(200,64,95,.12)" stroke="none" />

      {/* dashboard side bars */}
      <rect x="162" y="255" width="14" height="40" rx="2" fill="rgba(248,240,229,.25)" />
      <rect x="182" y="245" width="14" height="50" rx="2" fill="rgba(248,240,229,.35)" />
      <rect x="202" y="265" width="14" height="30" rx="2" fill="rgba(248,240,229,.25)" />
      <rect x="222" y="235" width="14" height="60" rx="2" fill="#A32847" />

      {/* dashboard list lines (right column) */}
      <rect x="320" y="220" width="60" height="6" rx="3" fill="rgba(248,240,229,.3)" />
      <rect x="320" y="236" width="44" height="6" rx="3" fill="rgba(248,240,229,.2)" />
      <rect x="320" y="252" width="52" height="6" rx="3" fill="rgba(248,240,229,.2)" />

      {/* keyboard */}
      <rect x="128" y="332" width="304" height="10" rx="3" fill="rgba(248,240,229,.08)" />
    </svg>
  );
}

const LEARNING = ["Cloud security", "AI security", "System design"];
const EXPLORING = ["Secure AI systems", "Offensive & defensive security", "Building useful products"];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" id="hero">
      <div className="hero-scene-bg" aria-hidden="true">
        <div className="hero-dark-vignette" />
        <div className="hero-shafts">
          <div className="hero-shaft s1" />
          <div className="hero-shaft s2" />
          <div className="hero-shaft s3" />
        </div>
        <div className="hero-panel-wrapper">
          <div className="hero-cream-panel">
            <div className="hero-mullion-shadows">
              <div className="mullion-bar m1" />
              <div className="mullion-bar m2" />
              <div className="mullion-bar m3" />
            </div>
          </div>
        </div>
        <div className="hero-edge-glow" />
        <div className="hero-grain" />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="hero-eyebrow" aria-label="Cybersecurity AI Engineering">
              <span aria-hidden="true" />
              CYBERSECURITY&nbsp;×&nbsp;AI&nbsp;×&nbsp;ENGINEERING
            </p>

            <h1 id="hero-title" className="hero-h1">
              Curiosity drives a <span className="hero-safer-word">safer</span>
              <br />
              digital world.
            </h1>

            <p className="hero-sub">{profile.subheadline}</p>

            <div className="hero-actions">
              <Link href="/projects" className="button button--burgundy hero-magnetic">
                Explore My Work&nbsp;↗
              </Link>
              <Link href="/resume" className="button button--outline hero-magnetic">
                Download Résumé&nbsp;⬇
              </Link>
            </div>

            <div className="hero-socials" role="list" aria-label="Social links">
              {SOCIALS.map(({ label, href, Icon }) => {
                if (!href) return null;
                return (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="hero-social-btn"
                    aria-label={label}
                    role="listitem"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="hero-visual-col">
            <DashboardScene />

            <div className="hero-float-card hero-float-card--learning">
              <span className="hero-float-card-label">Currently learning</span>
              <ul>
                {LEARNING.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="hero-float-pill">
              <span className="hero-float-dot" aria-hidden="true" />
              Open to internships &amp; opportunities
            </div>

            <div className="hero-float-card hero-float-card--exploring">
              <span className="hero-float-card-label">Currently exploring</span>
              <ul>
                {EXPLORING.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
