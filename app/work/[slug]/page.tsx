import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { Footer } from "@/components/home";
import { Sparkle } from "@/components/sparkle";
import { projects } from "@/lib/content";
import { ProjectVisual } from "@/components/visuals/project-visual";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Architecture & Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main">
      <article className="case">
        <header className="case-hero section--navy">
          <div className="subpage-ambient-glow" aria-hidden="true" />
          <div className="container case-hero-grid">
            <div className="case-hero-copy">
              <div className="subpage-breadcrumb">
                <Link className="subpage-back-link" href="/projects">
                  <ArrowLeft size={14} />
                  <span>Case Repository</span>
                </Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">CASE {project.caseNumber}</span>
              </div>

              <div className="case-kicker-row">
                <span className="section-kicker">
                  <Sparkle /> CASE {project.caseNumber} / {project.classification}
                </span>
                <span className="dossier-status-badge status-prototype">
                  <span className="status-dot" aria-hidden="true" />
                  {project.status}
                </span>
              </div>

              <h1 className="display case-title">{project.name}</h1>
              <p className="lede case-lede">{project.summary}</p>
            </div>

            <div className="case-visual-frame glass-navy">
              <ProjectVisual kind={project.slug} />
            </div>

            <div className="case-meta glass-navy">
              <div className="case-meta-item">
                <span className="mono">ROLE</span>
                <strong>{project.role}</strong>
              </div>
              {project.year && (
                <div className="case-meta-item">
                  <span className="mono">YEAR</span>
                  <strong>{project.year}</strong>
                </div>
              )}
              <div className="case-meta-item">
                <span className="mono">DOMAINS</span>
                <strong>{project.categories.join(" · ")}</strong>
              </div>
            </div>
          </div>
        </header>

        <section className="section section--navy-surface">
          <div className="container case-grid">
            <aside className="case-index">
              <span className="mono case-index-title">CASE {project.caseNumber} SPEC</span>
              <a href="#problem" className="case-index-link">01 · Problem &amp; Constraints</a>
              <a href="#architecture" className="case-index-link">02 · Architecture &amp; Stack</a>
              <a href="#security-decisions" className="case-index-link">03 · Security Guardrails</a>
              <a href="#reflection" className="case-index-link">04 · Outcome &amp; Roadmap</a>
            </aside>

            <div className="case-content">
              {/* Problem Section */}
              <section id="problem" className="case-section-block">
                <p className="section-kicker">01 · Problem &amp; Constraints</p>
                <h2 className="case-section-heading">{project.problem}</h2>
                <ul className="spark-list">
                  {project.constraints.map((item) => (
                    <li key={item}>
                      <Sparkle />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Architecture Section */}
              <section id="architecture" className="case-section-block">
                <p className="section-kicker">02 · Architecture &amp; Flow</p>
                <h2 className="case-section-heading">Explicit Perimeters &amp; Component Flow</h2>
                <div className="architecture" aria-label={`${project.name} architecture flow`}>
                  {project.architecture.map((step, i) => (
                    <div key={step} className="architecture-step">
                      <span className="mono">0{i + 1}</span>
                      <strong>{step}</strong>
                      {i < project.architecture.length - 1 && (
                        <ArrowUpRight aria-hidden="true" size={14} />
                      )}
                    </div>
                  ))}
                </div>

                <h3 className="case-subheading">Technology Stack</h3>
                <div className="tag-row">
                  {project.stack.map((item) => (
                    <span className="badge" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              {/* Security Decisions */}
              <section id="security-decisions" className="case-section-block">
                <p className="section-kicker">03 · Security Decisions</p>
                <h2 className="case-section-heading">Trust Boundaries Made Legible</h2>
                <ul className="spark-list">
                  {project.security.map((item) => (
                    <li key={item}>
                      <Sparkle />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Outcome */}
              <section id="reflection" className="case-section-block">
                <p className="section-kicker">04 · Outcome &amp; Roadmap</p>
                <h2 className="case-section-heading">Verified Results &amp; Real-World Testing</h2>
                <p className="case-outcome-text">{project.outcome}</p>

                <h3 className="case-subheading">Next Iterations</h3>
                <p className="case-improve-text">{project.improve}</p>

                {project.links && project.links.length > 0 && (
                  <div className="case-links-row">
                    {project.links.map((link) => (
                      <a
                        className="button button--primary"
                        href={link.href}
                        key={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={16} />
                      </a>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>

          <nav className="case-pagination" aria-label="Case navigation">
            <Link href={`/work/${prev.slug}`} className="pagination-link prev">
              ← CASE {prev.caseNumber} / {prev.name}
            </Link>
            <Link href={`/work/${next.slug}`} className="pagination-link next">
              CASE {next.caseNumber} / {next.name} →
            </Link>
          </nav>
        </section>
      </article>
      <Footer />
    </main>
  );
}
