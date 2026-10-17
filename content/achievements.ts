/**
 * Proof log — dated, verifiable entries sourced directly from resume (Oct 2026)
 * and LinkedIn activity. Every entry below is primary-sourced; no invented data.
 */

export type LogEntry = {
  id: string;
  date: string; // display string, most recent first
  kind: "bounty" | "hackathon" | "ctf" | "cert" | "internship" | "talk";
  title: string;
  detail?: string;
  href?: string;
};

export const proofLog: LogEntry[] = [
  {
    id: "glassdoor-bounty",
    date: "Sep 2026",
    kind: "bounty",
    title: "Glassdoor bug bounty — $650 + Hall of Fame",
    detail:
      "Business Logic vulnerability: unauthorized Candidate Experience Survey injection via an arbitrary employerId accepted without an application/interview relationship. First rewarded Bugcrowd finding.",
  },
  {
    id: "drestein-26",
    date: "Sep 2026",
    kind: "hackathon",
    title: "1st Prize, ₹1,00,000 — DRESTEIN '26 (Saveetha Engineering College)",
    detail:
      "Team of 4. Problem statement revealed on-site — took \"WE care\" from R&D to a working Android + web prototype in two days.",
  },
  {
    id: "megathon",
    date: "Sep 2026",
    kind: "hackathon",
    title: "1st Prize, ₹1,00,000 — MEGATHON: Fusion for Future",
    detail: "Team CryptX, III Year CSE (Cyber Security), RMKCET.",
  },
  {
    id: "defcon-ctf",
    date: "2026",
    kind: "ctf",
    title: "8th place — DEFCON-conducted CTF (international, team)",
    detail: "Competed as part of a team in an official DEFCON-affiliated CTF.",
  },
  {
    id: "tn-police-ctf",
    date: "2026",
    kind: "ctf",
    title: "Top 26 of 300+ — TN Government Police CTF",
    detail: "State-level CTF hosted by Tamil Nadu Police.",
  },
  {
    id: "stjosephs-ctf",
    date: "2026",
    kind: "ctf",
    title: "1st place — St. Joseph's College CTF",
  },
  {
    id: "v-vertex-ctf",
    date: "2026",
    kind: "ctf",
    title: "1st place — V-Vertex CTF, VIT",
  },
  {
    id: "brainstorm",
    date: "2026",
    kind: "hackathon",
    title: "3rd place — Brain Storm Competition",
    detail: "Debugging, PPT and hackathon rounds, Dhanalakshmi Engineering College.",
  },
  {
    id: "cdac-internship",
    date: "Jun – Jul 2025",
    kind: "internship",
    title: "Cyber Security Intern — C-DAC, Chennai",
    detail:
      "Deployed Wazuh SIEM and Zabbix monitoring across Linux and Windows endpoints. Reviewed system logs, hardened Windows Firewall rules and applied Linux baseline security configurations.",
  },
  {
    id: "htc-internship",
    date: "2025",
    kind: "internship",
    title: "Software Development Intern — HTC Pvt Ltd",
    detail: "First-hand exposure to how an IT company delivers a project: team structure, roles and collaborative workflows.",
  },
  {
    id: "apisec-cert",
    date: "2026",
    kind: "cert",
    title: "APISEC Certification — API Security & Vulnerability Testing",
  },
  {
    id: "cofps-cert",
    date: "2026",
    kind: "cert",
    title: "COFPS — Certified Online Fraud Prevention Specialist",
  },
  {
    id: "oci-ai-cert",
    date: "2025",
    kind: "cert",
    title: "Oracle Cloud Infrastructure 2025 — Certified AI Foundations Associate",
  },
  {
    id: "cisco-cert",
    date: "Jun 2025",
    kind: "cert",
    title: "Cisco Networking Academy — Introduction to Cybersecurity",
  },
  {
    id: "google-ai-cert",
    date: "Jun 2025",
    kind: "cert",
    title: "Google AI Essentials Specialization (Coursera)",
  },
];

export const bugcrowdStats = {
  validSubmissions: 9,
  accuracy: "81.82%",
  badges: ["Bounty Bee L3", "Submission Shogun L3"],
  categories: ["Web", "API", "Android"],
} as const;
