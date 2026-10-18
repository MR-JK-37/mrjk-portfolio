"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { projects, Project } from "@/lib/content";
import { otherProjects } from "@/content/projects";

type CategoryFilter = "ALL" | "SECURITY" | "AI" | "IOT" | "MOBILE";

export function ProjectsDirectory() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("ALL");

  const filterMatches = (p: Project) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "SECURITY") return p.categories.includes("Security");
    if (activeFilter === "AI") return p.categories.includes("AI");
    if (activeFilter === "IOT") return p.slug === "aran";
    if (activeFilter === "MOBILE") return p.categories.includes("Mobile");
    return true;
  };

  const filteredProjects = projects.filter(filterMatches);

  return (
    <div className="projects-directory">
      {/* Metric strip */}
      <div className="projects-metrics-bar">
        <div className="projects-metric-item">
          <span className="metric-number">03</span>
          <span className="metric-label">Detailed Case Studies</span>
        </div>
        <div className="projects-metric-divider" />
        <div className="projects-metric-item">
          <span className="metric-number">₹2,00,000+</span>
          <span className="metric-label">National Prize Implementations</span>
        </div>
        <div className="projects-metric-divider" />
        <div className="projects-metric-item">
          <span className="metric-number">100%</span>
          <span className="metric-label">Verifiable Code &amp; Architecture</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="projects-filter-row" role="tablist" aria-label="Project category filter">
        {(
          [
            { id: "ALL", label: "All Cases" },
            { id: "SECURITY", label: "Security & Networks" },
            { id: "AI", label: "AI Systems" },
            { id: "IOT", label: "IoT & Hardware" },
            { id: "MOBILE", label: "Mobile Apps" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeFilter === tab.id}
            className={`projects-filter-btn ${activeFilter === tab.id ? "active" : ""}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Case Studies Grid */}
      <div className="projects-dossier-grid">
        {filteredProjects.map((p) => {
          const isShipped = p.status === "SHIPPED";
          return (
            <article key={p.slug} className="project-dossier-card">
              {/* Corner Cyber Accents */}
              <div className="dossier-bracket tl" aria-hidden="true" />
              <div className="dossier-bracket tr" aria-hidden="true" />
              <div className="dossier-bracket bl" aria-hidden="true" />
              <div className="dossier-bracket br" aria-hidden="true" />

              <div className="dossier-header">
                <div className="dossier-meta-left">
                  <span className="mono dossier-case">CASE {p.caseNumber}</span>
                  <span className="dossier-classification">{p.classification}</span>
                </div>
                <span className={`dossier-status-badge ${isShipped ? "status-shipped" : "status-prototype"}`}>
                  <span className="status-dot" aria-hidden="true" />
                  {p.status}
                </span>
              </div>

              <div className="dossier-body">
                <h2 className="dossier-title">{p.name}</h2>
                <p className="dossier-summary">{p.summary}</p>

                {/* Key Architectural Decision Highlight */}
                <div className="dossier-highlight-box">
                  <span className="mono dossier-box-label">CORE ARCHITECTURE</span>
                  <p className="dossier-box-text">
                    {p.architecture[0] || p.problem}
                  </p>
                </div>
              </div>

              <div className="dossier-footer">
                <div className="dossier-stack">
                  {p.stack.slice(0, 5).map((tech) => (
                    <span key={tech} className="dossier-tech-chip">
                      {tech}
                    </span>
                  ))}
                  {p.stack.length > 5 && (
                    <span className="dossier-tech-more">+{p.stack.length - 5}</span>
                  )}
                </div>

                <div className="dossier-actions">
                  <Link
                    href={`/work/${p.slug}`}
                    className="button button--outline-dark dossier-cta-btn"
                    aria-label={`Read Case Study: ${p.name}`}
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Auxiliary Engineering Repositories Section */}
      <div className="aux-projects-section">
        <div className="aux-projects-header">
          <h3 className="aux-projects-title">Additional Applied Systems</h3>
          <p className="aux-projects-desc">
            Supporting engineering implementations and mobile experiments.
          </p>
        </div>

        <div className="aux-projects-grid">
          {otherProjects.map((item) => (
            <div key={item.id} className="aux-project-card">
              <div className="aux-card-top">
                <span className="aux-card-badge">ENGINEERING</span>
                <span className="mono aux-card-id">{item.id}</span>
              </div>
              <h4 className="aux-card-title">{item.name}</h4>
              <p className="aux-card-summary">{item.summary}</p>
              <div className="aux-card-stack">
                {item.stack.map((s) => (
                  <span key={s} className="aux-stack-pill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
