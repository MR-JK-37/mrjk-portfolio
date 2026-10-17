import type { Metadata } from "next";
import { Footer } from "@/components/home";
import { Sparkle } from "@/components/sparkle";
import { Building, Shield, Trophy, DollarSign } from "@/components/icons";
import { hackathons, optionalContent } from "@/lib/content";
import { proofLog } from "@/content/achievements";

export const metadata: Metadata = {
  title: "Experience & Track Record",
  description:
    "Internships, national hackathons, and CTF rankings by Jaikiran E (MR!JK!) — verified milestones in security engineering and software development.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <main id="main">
      <header className="subpage-hero section--navy">
        <div className="container">
          <p className="section-kicker">
            <Sparkle /> MILESTONES &amp; RECORD
          </p>
          <h1 className="display">Experience &amp; Track Record</h1>
          <p className="lede">
            Hands-on work across research centres, competitive hackathons, bug bounties,
            and national capture-the-flag competitions.
          </p>
        </div>
      </header>

      {/* ─── Work & Internships ─── */}
      <section className="section section--navy">
        <div className="container">
          <h2 className="h2" style={{ marginBottom: "2.5rem" }}>
            Industry Experience
          </h2>

          <div className="experience-timeline">
            {optionalContent.experience.map((exp) => (
              <div key={exp.role + exp.organization} className="exp-item">
                <div className="exp-marker">
                  <Building size={14} />
                </div>
                <article>
                  {exp.period && <span className="exp-period">{exp.period}</span>}
                  <h3>{exp.role}</h3>
                  <p className="exp-org">{exp.organization}</p>
                  {exp.summary && (
                    <p style={{ marginTop: "0.75rem", color: "rgba(248,240,229,.8)", maxWidth: "56ch" }}>
                      {exp.summary}
                    </p>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hackathons ─── */}
      <section className="section section--navy-surface">
        <div className="container">
          <h2 className="h2" style={{ marginBottom: "2.5rem" }}>
            National Hackathons
          </h2>

          <div className="experience-timeline">
            {hackathons.map((h) => (
              <div key={h.name} className="exp-item">
                <div className="exp-marker">
                  <Shield size={14} />
                </div>
                <article>
                  <span className="exp-period">{h.year}</span>
                  <h3>
                    {h.project}
                    {h.team ? ` · Team ${h.team}` : ""}
                  </h3>
                  <p className="exp-org">{h.name}</p>
                  <p style={{ marginTop: "0.75rem", color: "rgba(248,240,229,.8)", maxWidth: "56ch" }}>
                    {h.detail}
                  </p>
                  <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                    {h.decisions.map((d) => (
                      <span key={d} className="badge">
                        {d}
                      </span>
                    ))}
                  </div>
                  <p style={{ marginTop: "1rem", fontStyle: "italic", fontSize: ".9rem", color: "rgba(248,240,229,.6)" }}>
                    Key takeaway: &ldquo;{h.lesson}&rdquo;
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTFs & Bounties ─── */}
      <section className="section section--navy">
        <div className="container">
          <h2 className="h2" style={{ marginBottom: "2.5rem" }}>
            Competitions &amp; Recognitions
          </h2>

          <div className="experience-timeline">
            {proofLog.filter((e) => e.kind === "ctf" || e.kind === "bounty").map((entry) => (
              <div key={entry.id} className="exp-item">
                <div className="exp-marker">
                  {entry.kind === "bounty" ? <DollarSign size={14} /> : <Trophy size={14} />}
                </div>
                <article>
                  <span className="exp-period">{entry.date}</span>
                  <h3>{entry.title}</h3>
                  {entry.detail && <p className="exp-org">{entry.detail}</p>}
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
