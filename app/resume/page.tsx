import type { Metadata } from "next";
import Link from "next/link";
import { profile, projects, hackathons, skillGroups, optionalContent } from "@/lib/content";
import { proofLog } from "@/content/achievements";
import { site } from "@/lib/site";
import { PrintResumeButton } from "@/components/print-resume-button";
import { ArrowLeft, Github, Linkedin, Mail, MapPin, Shield, Star } from "@/components/icons";

export const metadata: Metadata = {
  title: "Resume — Jaikiran E (MR!JK!)",
  description:
    "Executive cybersecurity resume of Jaikiran E — Penetration Testing, Application Security, Bug Bounty, and System Engineering.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  const bountiesAndCTFs = proofLog.filter((e) => e.kind === "bounty" || e.kind === "ctf");

  return (
    <main id="main" className="resume-sheet">
      {/* Top action bar (hidden in print) */}
      <div className="resume-action-bar no-print">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
        <div className="resume-action-right">
          <PrintResumeButton />
        </div>
      </div>

      <article className="resume-document">
        {/* Document Header */}
        <header className="resume-doc-header">
          <div className="resume-doc-title">
            <span className="mono resume-doc-kicker">CURRICULUM VITAE / VERIFIED RECORD</span>
            <h1 className="resume-name">{profile.legalName}</h1>
            <p className="resume-headline">{profile.headline}</p>
          </div>

          <div className="resume-contact-block">
            <div className="resume-contact-item">
              <MapPin size={14} />
              <span>{profile.location}</span>
            </div>
            {site.email && (
              <a href={`mailto:${site.email}`} className="resume-contact-link">
                <Mail size={14} />
                <span>{site.email}</span>
              </a>
            )}
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a href={profile.bugcrowd} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
              <Shield size={14} />
              <span>Bugcrowd</span>
            </a>
            <a href={profile.tryhackme} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
              <Star size={14} />
              <span>TryHackMe</span>
            </a>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="resume-section">
          <h2 className="resume-section-title">Executive Profile</h2>
          <p className="resume-summary-text">{profile.about}</p>
        </section>

        {/* Education */}
        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          <div className="resume-entries">
            {optionalContent.education.map((edu) => (
              <div key={edu.degree} className="resume-entry">
                <div className="resume-entry-header">
                  <h3 className="resume-entry-title">{edu.degree}</h3>
                  {edu.period && <span className="resume-entry-date">{edu.period}</span>}
                </div>
                <p className="resume-entry-subtitle">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Security Disclosures & Bounties */}
        <section className="resume-section">
          <h2 className="resume-section-title">Security Disclosures &amp; Bug Bounties</h2>
          <div className="resume-entries">
            <div className="resume-entry resume-entry--highlight">
              <div className="resume-entry-header">
                <h3 className="resume-entry-title">Glassdoor Bug Bounty — $650 Reward + Hall of Fame</h3>
                <span className="resume-entry-date">Sep 2026</span>
              </div>
              <p className="resume-entry-subtitle">Bugcrowd Platform</p>
              <p className="resume-entry-desc">
                Discovered and responsibly disclosed an unauthorized Candidate Experience Survey injection business logic flaw accepting arbitrary employer identifiers without active candidate-employer relationship.
              </p>
            </div>
          </div>
        </section>

        {/* Industry Experience */}
        <section className="resume-section">
          <h2 className="resume-section-title">Industry Experience</h2>
          <div className="resume-entries">
            {optionalContent.experience.map((exp) => (
              <div key={exp.role + exp.organization} className="resume-entry">
                <div className="resume-entry-header">
                  <h3 className="resume-entry-title">{exp.role}</h3>
                  {exp.period && <span className="resume-entry-date">{exp.period}</span>}
                </div>
                <p className="resume-entry-subtitle">{exp.organization}</p>
                {exp.summary && <p className="resume-entry-desc">{exp.summary}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Hackathons & Awards */}
        <section className="resume-section">
          <h2 className="resume-section-title">Hackathon Honors &amp; Podium Finishes</h2>
          <div className="resume-entries">
            {hackathons.map((h) => (
              <div key={h.name} className="resume-entry">
                <div className="resume-entry-header">
                  <h3 className="resume-entry-title">
                    {h.project !== "—" ? `${h.project} · ` : ""}
                    {h.name}
                  </h3>
                  <span className="resume-entry-date">{h.result ?? h.year}</span>
                </div>
                <p className="resume-entry-subtitle">
                  {h.team ? `${h.team} · ` : ""}
                  {h.year}
                </p>
                <p className="resume-entry-desc">{h.detail}</p>
                {h.decisions.length > 0 && (
                  <div className="resume-chip-row">
                    {h.decisions.map((d) => (
                      <span key={d} className="resume-chip">{d}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Competitions & CTFs */}
        <section className="resume-section">
          <h2 className="resume-section-title">Capture The Flag (CTF) Achievements</h2>
          <div className="resume-grid-2">
            {bountiesAndCTFs.map((entry) => (
              <div key={entry.id} className="resume-compact-card">
                <div className="resume-compact-top">
                  <strong>{entry.title}</strong>
                  <span className="mono">{entry.date}</span>
                </div>
                {entry.detail && <p className="resume-compact-detail">{entry.detail}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Selected Engineering Projects */}
        <section className="resume-section">
          <h2 className="resume-section-title">Selected Engineering Projects</h2>
          <div className="resume-entries">
            {projects.map((proj) => (
              <div key={proj.slug} className="resume-entry">
                <div className="resume-entry-header">
                  <h3 className="resume-entry-title">
                    {proj.name} — <span className="resume-sub-title">{proj.classification}</span>
                  </h3>
                  <span className="resume-entry-date">{proj.status}</span>
                </div>
                <p className="resume-entry-desc">{proj.summary}</p>
                <div className="resume-tech-row">
                  <strong className="mono">Stack: </strong>
                  <span>{proj.stack.join(" · ")}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="resume-section">
          <h2 className="resume-section-title">Certifications &amp; Credentials</h2>
          <div className="resume-cert-grid">
            {optionalContent.certifications.map((c) => (
              <div key={c.name} className="resume-cert-item">
                <div className="resume-cert-name">{c.name}</div>
                <div className="resume-cert-meta">
                  <span>{c.issuer}</span>
                  {c.date && <span> · {c.date}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Competencies */}
        <section className="resume-section">
          <h2 className="resume-section-title">Core Technical Competencies</h2>
          <div className="resume-skills-block">
            {skillGroups.map((group) => (
              <div key={group.name} className="resume-skill-row">
                <span className="resume-skill-label">{group.name}:</span>
                <span className="resume-skill-items">{group.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
