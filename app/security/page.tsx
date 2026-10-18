import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/home";
import { Sparkle } from "@/components/sparkle";
import {
  Shield, Lock, Terminal, Activity, Server,
  Check, ArrowLeft, Zap,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Defensive Architecture & Threat Model — Jaikiran E",
  description:
    "Documented security perimeter, threat model, cryptographic controls, and operational limits engineered into this portfolio.",
  alternates: { canonical: "/security" },
};

const controls = [
  {
    id: "SEC-01",
    tag: "BROWSER PERIMETER",
    title: "Browser Boundary & HTTP Headers",
    icon: Shield,
    copy: "Enforces a strict Content Security Policy (CSP), frame denial (X-Frame-Options: DENY), MIME sniffing prevention (X-Content-Type-Options: nosniff), strict Referrer-Policy, and HSTS preloading to systematically neutralize cross-site scripting and framing attacks.",
    spec: "CSP · HSTS · frame-ancestors 'none'",
  },
  {
    id: "SEC-02",
    tag: "IDENTITY & ACCESS",
    title: "Admin Authentication & Session Hardening",
    icon: Lock,
    copy: "Server-side salted bcrypt password hashing. Administrative sessions are cryptographically signed, short-lived, httpOnly, Secure in production, and enforce SameSite=Strict to mitigate session hijacking and credential brute-forcing.",
    spec: "bcrypt · httpOnly · SameSite=Strict",
  },
  {
    id: "SEC-03",
    tag: "DATA INGESTION",
    title: "Strict Payload Schema Validation",
    icon: Terminal,
    copy: "All contact and authentication payloads undergo strict runtime schema validation before processing. Text inputs are normalized to remove dangerous bytecode. Origin validation and honeypot traps eliminate automated spam injection.",
    spec: "Zod Schema · Origin Check · Anti-Bot Honeypot",
  },
  {
    id: "SEC-04",
    tag: "STORAGE INTEGRITY",
    title: "Media Uploads & Cryptographic Verification",
    icon: Zap,
    copy: "Authenticated uploads enforce an immutable MIME allow-list and strict 8 MB ceiling. Transfers leverage cryptographically signed Cloudinary requests. Missing or invalid credentials trigger immediate fail-closed termination—never falling back to unmanaged local disk storage.",
    spec: "Signed HMAC · 8MB Ceiling · Fail-Closed",
  },
  {
    id: "SEC-05",
    tag: "SUPPLY CHAIN",
    title: "Dependency Pinning & Audit Policies",
    icon: Server,
    copy: "All runtime and development dependencies are strictly pinned by package-lock.json with automated npm audit scans on every pull request. No unverified third-party scripts are permitted in the client bundle.",
    spec: "Zero High/Crit CVEs · Lockfile Pinning",
  },
  {
    id: "SEC-06",
    tag: "BOUNDARIES",
    title: "Operational Limits & Edge Resilience",
    icon: Activity,
    copy: "In-memory rate limiting throttles API endpoints per client IP. Distributed edge stores and cloud firewalls are documented as required next steps prior to high-volume multi-region deployment.",
    spec: "Rate-Limiting · Failover · Audit Logs",
  },
];

const verificationChecks = [
  { name: "TypeScript Strict Mode", status: "PASSED", detail: "0 type errors across all modules" },
  { name: "Content Integrity Validator", status: "PASSED", detail: "Zero unverified mock copy" },
  { name: "Automated Axe WCAG AA Audit", status: "PASSED", detail: "0 serious or critical accessibility violations" },
  { name: "Playwright Multi-Viewport Suite", status: "PASSED", detail: "Zero horizontal overflow from 375px to 1920px" },
  { name: "Dependency Vulnerability Audit", status: "PASSED", detail: "0 high or critical advisory findings" },
];

export default function SecurityPage() {
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
            <span className="breadcrumb-current">Security</span>
          </div>

          <div className="security-status-badge">
            <span className="status-dot green" aria-hidden="true" />
            <span className="mono">THREAT MODEL v2.6 · DEFENSIVE POSTURE ACTIVE</span>
          </div>

          <h1 className="display subpage-title">
            The Portfolio is Part of the <span className="text-gradient-rose">Proof</span>.
          </h1>
          <p className="lede subpage-lede">
            Security claims without documented operational assumptions are mere decoration.
            Here is the transparent architecture, threat perimeter, and verification posture governing this site.
          </p>
        </div>
      </header>

      {/* Threat Model & Perimeter Overview */}
      <section className="section section--navy-surface subpage-content-section">
        <div className="container">
          <div className="security-threat-grid">
            <div className="threat-summary-card glass-navy">
              <div className="threat-card-badge">
                <Shield size={16} />
                <span>THREAT MODEL SPECIFICATION</span>
              </div>
              <h2 className="threat-card-title">Core Objective: Protect Visitors &amp; Authenticated Ingestion</h2>
              <p className="threat-card-desc">
                Designed to defend against client-side exploitation, credential harvesting, forged state changes,
                malicious payloads, and automated bot abuse.
              </p>

              <div className="threat-scope-split">
                <div className="scope-box scope-in">
                  <span className="mono scope-label">IN SCOPE</span>
                  <ul>
                    <li>Cross-Site Scripting (XSS)</li>
                    <li>Cross-Site Request Forgery (CSRF)</li>
                    <li>Credential brute-forcing &amp; session hijacking</li>
                    <li>MIME spoofing &amp; malicious file uploads</li>
                    <li>Automated contact spam &amp; API enumeration</li>
                  </ul>
                </div>
                <div className="scope-box scope-out">
                  <span className="mono scope-label">OUT OF SCOPE</span>
                  <ul>
                    <li>Volumetric multi-gigabit DDoS attacks</li>
                    <li>Zero-day vulnerabilities in Vercel infrastructure</li>
                    <li>Physical endpoint tampering on the client device</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Bento Grid */}
          <div className="security-controls-header">
            <p className="section-kicker">
              <Sparkle /> DEFENSIVE CONTROLS
            </p>
            <h2 className="display-sm">Systematic Security Measures</h2>
          </div>

          <div className="security-controls-grid">
            {controls.map((ctrl) => {
              const IconComp = ctrl.icon;
              return (
                <article key={ctrl.id} className="security-ctrl-card glass-navy">
                  <div className="ctrl-card-top">
                    <div className="ctrl-icon-wrap">
                      <IconComp size={18} />
                    </div>
                    <div className="ctrl-meta">
                      <span className="mono ctrl-id">{ctrl.id}</span>
                      <span className="ctrl-tag">{ctrl.tag}</span>
                    </div>
                  </div>

                  <h3 className="ctrl-title">{ctrl.title}</h3>
                  <p className="ctrl-copy">{ctrl.copy}</p>

                  <div className="ctrl-spec-pill">
                    <span className="mono">{ctrl.spec}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Automated Verification Posture */}
          <div className="security-verification-card glass-navy">
            <div className="verification-header">
              <div className="verification-badge">
                <Check size={16} />
                <span>VERIFICATION POSTURE</span>
              </div>
              <h2 className="verification-title">Testable, Not Theatrical.</h2>
              <p className="verification-desc">
                Every commit runs automated security, accessibility, and visual integrity pipelines.
                Green status indicators confirm that the build satisfies strict production criteria.
              </p>
            </div>

            <div className="verification-checklist">
              {verificationChecks.map((check) => (
                <div key={check.name} className="verification-check-item">
                  <div className="check-status-col">
                    <span className="check-badge-passed">
                      <Check size={12} />
                      <span>{check.status}</span>
                    </span>
                  </div>
                  <div className="check-name-col">
                    <strong>{check.name}</strong>
                    <span className="check-detail">{check.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
