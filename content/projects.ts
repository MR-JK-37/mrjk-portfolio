/**
 * Featured projects — sourced directly from resume (Jaikiran_E_Resume.docx, Oct 2026).
 * No invented projects or metrics.
 */

export type FeaturedProject = {
  id: string;
  number: "01" | "02" | "03";
  category: string;
  categoryPill: string;
  name: string;
  summary: string;
  bullets: string[];
  stack: { name: string; icon: string }[];
  slug: string;
  year: string;
  href?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "we-care",
    number: "01",
    category: "AI + Healthcare",
    categoryPill: "AI + HEALTHCARE",
    name: "WE care — AI-Based Dementia & Elderly Care Platform",
    summary:
      "Voice-first, caregiver-supervised AI companion with stage-adaptive responses and human-in-the-loop escalation. Team of 4 — 1st Prize, DRESTEIN '26.",
    bullets: [
      "Built the Android app and Next.js web dashboard; designed the UX for stage-adaptive responses and distress risk scoring (Green/Amber/Red).",
      "Integrated real-time caregiver alerts (Supabase Realtime, Firebase Cloud Messaging); caregiver-verified memory prevents AI-invented facts, plus consent workflows and role-based access via PostgreSQL RLS.",
    ],
    stack: [
      { name: "Kotlin", icon: "kotlin" },
      { name: "Jetpack Compose", icon: "android" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Supabase", icon: "postgresql" },
      { name: "Firebase", icon: "firebase" },
    ],
    slug: "we-care",
    year: "2026",
  },
  {
    id: "netpulse",
    number: "02",
    category: "Security + Networking",
    categoryPill: "SECURITY + NETWORKING",
    name: "NetPulse — Real-Time Network Traffic Monitor",
    summary:
      "WebSocket-based live dashboard for connection analytics, passive ARP-sniffing device discovery and unknown-device flagging.",
    bullets: [
      "Passive OS fingerprinting (TTL, TCP window, MAC OUI, port analysis) with confidence scores, plus background active scans (hostname resolution, TCP port probing, ICMP).",
      "Validated with 6 documented test cases, all passed.",
    ],
    stack: [
      { name: "React", icon: "react" },
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "WebSockets", icon: "ai" },
    ],
    slug: "netpulse",
    year: "2026",
    href: "https://github.com/MR-JK-37/netpulse",
  },
  {
    id: "aran",
    number: "03",
    category: "Edge AI + IoT",
    categoryPill: "EDGE AI + IOT",
    name: "ARAN — Edge-AI Predictive Maintenance for MSMEs",
    summary:
      "Low-cost (~₹3,000 per machine) machine-level monitoring using temperature, vibration, fan RPM and current sensors, with a Raspberry Pi gateway processing data locally. Built at MSME Hackathon 6.0.",
    bullets: [
      "Per-machine baseline learning with z-score, moving average and Isolation Forest anomaly detection to generate 0–100 health scores and plain-language alerts.",
      "Only faulty machines get serviced — cuts unnecessary maintenance visits.",
    ],
    stack: [
      { name: "Python", icon: "python" },
      { name: "Scikit-Learn", icon: "ai" },
      { name: "SQLite", icon: "postgresql" },
      { name: "Raspberry Pi", icon: "ai" },
    ],
    slug: "aran",
    year: "2026",
  },
];

export const otherProjects = [
  {
    id: "android-automation-agent",
    name: "Android Automation Agent",
    summary: "AI agent that controls Android devices from natural-language commands.",
    stack: ["Python", "ADB", "Appium"],
  },
  {
    id: "task-reminder-ctf-feed",
    name: "Task Reminder & CTF Feed App",
    summary: "Android app with smart reminders and live CTF/hackathon feeds.",
    stack: ["Kotlin", "Firebase", "CTFtime API"],
  },
] as const;
