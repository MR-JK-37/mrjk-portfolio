"use client";

import { useState } from "react";
import { Building, Shield, Trophy, DollarSign } from "./icons";

type FilterType = "ALL" | "INTERNSHIPS" | "HACKATHONS" | "BOUNTIES_CTFS";

interface TimelineItem {
  id: string;
  category: "internship" | "hackathon" | "bounty" | "ctf";
  date: string;
  title: string;
  organization: string;
  description?: string;
  chips?: string[];
  lesson?: string;
  highlight?: string;
}

export function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState<FilterType>("ALL");

  // Construct unified chronological timeline items
  const items: TimelineItem[] = [
    {
      id: "glassdoor-bounty",
      category: "bounty",
      date: "Sep 2026",
      title: "Glassdoor Bug Bounty — $650 Reward & Hall of Fame",
      organization: "Bugcrowd Vulnerability Disclosure Program",
      description:
        "Business Logic vulnerability: unauthorized Candidate Experience Survey injection via an arbitrary employerId accepted without an application/interview relationship. Verified and rewarded by Glassdoor security team.",
      chips: ["Business Logic", "Access Control", "Bugcrowd", "Responsible Disclosure"],
      highlight: "$650 Cash Bounty",
    },
    {
      id: "drestein-26",
      category: "hackathon",
      date: "Sep 2026",
      title: "1st Prize, ₹1,00,000 — DRESTEIN '26",
      organization: "Saveetha Engineering College · Team of 4",
      description:
        "Problem statement revealed on-site. Led UX and full-stack engineering for 'WE care', taking it from research to working Android (Jetpack Compose) and Next.js prototypes in 48 hours.",
      chips: ["Jetpack Compose", "Supabase", "Firebase", "RLS"],
      lesson: "Research before building — frontloading domain research on dementia caregiver workflows shaped the entire resilient architecture.",
      highlight: "1st Prize · ₹1,00,000",
    },
    {
      id: "megathon-fusion",
      category: "hackathon",
      date: "Sep 2026",
      title: "1st Prize, ₹1,00,000 — MEGATHON: Fusion for Future",
      organization: "RMKCET · Team CryptX",
      description:
        "National hackathon win as part of Team CryptX, representing III Year Computer Science and Engineering (Cyber Security).",
      chips: ["Team CryptX", "Cyber Security", "Rapid Prototyping"],
      highlight: "1st Prize · ₹1,00,000",
    },
    {
      id: "defcon-ctf",
      category: "ctf",
      date: "2026",
      title: "8th Place — DEFCON-Affiliated International CTF",
      organization: "DEFCON Global Community",
      description:
        "Competed in an official DEFCON-affiliated Capture-The-Flag competition spanning web exploitation, reverse engineering, and binary triage.",
      chips: ["Web Exploitation", "Reverse Engineering", "Team CTF"],
      highlight: "8th Place Worldwide",
    },
    {
      id: "tn-police-ctf",
      category: "ctf",
      date: "2026",
      title: "Top 26 of 300+ Teams — TN Police State CTF",
      organization: "Tamil Nadu Government Police Department",
      description:
        "State-level cyber defence and digital forensics competition organized by Tamil Nadu Police, testing real-world incident response and investigation scenarios.",
      chips: ["Digital Forensics", "Network Security", "Incident Response"],
      highlight: "Top 26 of 300+ Teams",
    },
    {
      id: "stjosephs-ctf",
      category: "ctf",
      date: "2026",
      title: "1st Place Champion — St. Joseph's College CTF",
      organization: "St. Joseph's College of Engineering",
      description: "First place finish solving cryptography, OSINT, and privilege escalation tracks.",
      chips: ["Cryptography", "Privilege Escalation", "OSINT"],
      highlight: "1st Place Trophy",
    },
    {
      id: "vvertex-ctf",
      category: "ctf",
      date: "2026",
      title: "1st Place Winner — V-Vertex CTF",
      organization: "Vellore Institute of Technology (VIT)",
      description: "Secured first place in technical symposium security challenges.",
      chips: ["Network Forensics", "Web Security"],
      highlight: "1st Place Winner",
    },
    {
      id: "cdac-internship",
      category: "internship",
      date: "Jun – Jul 2025",
      title: "Cyber Security Intern — Centre for Development of Advanced Computing (C-DAC)",
      organization: "C-DAC, Chennai (Ministry of Electronics & IT, Govt. of India)",
      description:
        "Deployed Wazuh SIEM and Zabbix monitoring agents across Linux and Windows server endpoints for real-time security event detection. Analyzed audit logs, hardened Windows Firewall filtering, and applied Linux security baseline policies.",
      chips: ["Wazuh SIEM", "Zabbix", "Endpoint Hardening", "Linux SecOps"],
      highlight: "Govt. Research Lab",
    },
    {
      id: "htc-internship",
      category: "internship",
      date: "2025",
      title: "Software Development Intern — HTC Pvt Ltd",
      organization: "HTC Pvt Ltd",
      description:
        "First-hand industry exposure to enterprise software delivery lifecycle, cross-functional engineering teams, and collaborative agile workflows.",
      chips: ["Agile Lifecycle", "Enterprise Delivery", "Full Stack"],
      highlight: "Enterprise IT Exposure",
    },
    {
      id: "msme-hackathon",
      category: "hackathon",
      date: "2026",
      title: "Edge-AI Predictive Maintenance (ARAN) — MSME Hackathon 6.0",
      organization: "Government MSME Hackathon 6.0",
      description:
        "Engineered edge-AI predictive maintenance gateway for MSMEs running on a local Raspberry Pi with vibration, temperature, and current sensors at ₹3,000 per machine.",
      chips: ["Edge AI", "Raspberry Pi", "Scikit-Learn", "IoT"],
      lesson: "Detection for a shop floor has to respect constrained hardware and keep costs low enough for an MSME to actually adopt it.",
      highlight: "Hardware Prototype",
    },
  ];

  const filteredItems = items.filter((item) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "INTERNSHIPS") return item.category === "internship";
    if (activeTab === "HACKATHONS") return item.category === "hackathon";
    if (activeTab === "BOUNTIES_CTFS") return item.category === "bounty" || item.category === "ctf";
    return true;
  });

  return (
    <div className="experience-showcase">
      {/* Metric Counters */}
      <div className="exp-stats-strip">
        <div className="exp-stat-box">
          <div className="exp-stat-value">₹2,00,000+</div>
          <div className="exp-stat-title">Hackathon Awards</div>
          <div className="exp-stat-sub">DRESTEIN &amp; MEGATHON 1st Prizes</div>
        </div>
        <div className="exp-stat-box">
          <div className="exp-stat-value">$650</div>
          <div className="exp-stat-title">Bug Bounty Reward</div>
          <div className="exp-stat-sub">Glassdoor Hall of Fame</div>
        </div>
        <div className="exp-stat-box">
          <div className="exp-stat-value">Top 8 / Top 26</div>
          <div className="exp-stat-title">DEFCON &amp; State CTFs</div>
          <div className="exp-stat-sub">National &amp; Global Competitions</div>
        </div>
        <div className="exp-stat-box">
          <div className="exp-stat-value">C-DAC</div>
          <div className="exp-stat-title">Cyber Security Research</div>
          <div className="exp-stat-sub">SIEM &amp; Endpoint Monitoring</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="exp-filter-bar" role="tablist" aria-label="Experience milestones category filter">
        {(
          [
            { id: "ALL", label: "All Milestones" },
            { id: "HACKATHONS", label: "National Hackathons" },
            { id: "BOUNTIES_CTFS", label: "Bounties & CTFs" },
            { id: "INTERNSHIPS", label: "Industry & Research" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`exp-filter-pill ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chronological Spine Timeline */}
      <div className="exp-timeline-spine">
        {filteredItems.map((item) => {
          let markerClass = "marker-hackathon";
          let IconComponent = Trophy;

          if (item.category === "bounty") {
            markerClass = "marker-bounty";
            IconComponent = DollarSign;
          } else if (item.category === "internship") {
            markerClass = "marker-internship";
            IconComponent = Building;
          } else if (item.category === "ctf") {
            markerClass = "marker-ctf";
            IconComponent = Shield;
          }

          return (
            <div key={item.id} className="exp-timeline-entry">
              {/* Timeline Marker Node */}
              <div className={`exp-timeline-node ${markerClass}`}>
                <IconComponent size={16} />
              </div>

              {/* Card Container */}
              <article className="exp-timeline-card glass-navy">
                <div className="exp-card-header">
                  <div className="exp-card-date-badge">
                    <span className="mono">{item.date}</span>
                    {item.highlight && (
                      <span className="exp-highlight-tag">{item.highlight}</span>
                    )}
                  </div>
                  <h3 className="exp-card-title">{item.title}</h3>
                  <p className="exp-card-org">{item.organization}</p>
                </div>

                {item.description && (
                  <p className="exp-card-desc">{item.description}</p>
                )}

                {item.lesson && (
                  <div className="exp-card-lesson">
                    <strong>Takeaway: </strong>
                    <span>&ldquo;{item.lesson}&rdquo;</span>
                  </div>
                )}

                {item.chips && item.chips.length > 0 && (
                  <div className="exp-card-chips">
                    {item.chips.map((chip) => (
                      <span key={chip} className="exp-card-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
