import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Footer } from "@/components/home";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Systems, security tools, and AI applications engineered by Jaikiran E — built around clear boundaries and verifiable evidence.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <header className="subpage-hero section--navy">
        <div className="container">
          <p className="section-kicker">INDEX / CASE REPOSITORY</p>
          <h1 className="display">Engineered with Purpose.</h1>
          <p className="lede">
            From container-sandboxed educational platforms and campus grievance triage
            to local voice AI and pharmaceutical supply chain integrity systems.
          </p>
        </div>
      </header>

      <section className="section section--navy-surface">
        <div className="container">
          <div className="projects-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {projects.map((p) => (
              <article key={p.slug} className="project-card glass-navy">
                <div className="project-card-top">
                  <span className="project-number">CASE {p.caseNumber}</span>
                  <span className="project-category-pill">{p.classification}</span>
                </div>

                <div className="project-card-body">
                  <h2 className="project-title" style={{ fontSize: "1.4rem", margin: "0.5rem 0" }}>
                    {p.name}
                  </h2>
                  <p className="project-summary">{p.summary}</p>
                </div>

                <div className="project-card-footer">
                  <div className="project-tech-chips">
                    {p.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="project-tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/work/${p.slug}`}
                    className="project-arrow-btn"
                    aria-label={`View ${p.name} case study`}
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
