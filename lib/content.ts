/**
 * Case-study content for /work/[slug] — sourced directly from resume
 * (Jaikiran_E_Resume.docx) and LinkedIn posts, Oct 2026. No invented projects.
 */
export type ProjectStatus = "SHIPPED" | "IN PROGRESS" | "PROTOTYPE";
export type ProjectCategory = "Security" | "AI" | "Mobile" | "Web";
export type Project = { slug:string; caseNumber:string; name:string; classification:string; status:ProjectStatus; summary:string; categories:ProjectCategory[]; year?:string; role:string; problem:string; constraints:string[]; architecture:string[]; stack:string[]; security:string[]; outcome:string; improve:string; links?:{label:string;href:string}[] };

export const projects: Project[] = [
  {
    slug: "we-care",
    caseNumber: "001",
    name: "WE care",
    classification: "AI / DEMENTIA & ELDERLY CARE",
    status: "PROTOTYPE",
    summary: "Voice-first, caregiver-supervised AI companion for dementia and elderly care.",
    categories: ["AI", "Mobile", "Web"],
    year: "2026",
    role: "Android app + Next.js web dashboard, UX design, team of 4",
    problem: "The team's problem statement — revealed on-site at DRESTEIN '26 — was to design a voice-first, stage-adaptive AI companion for dementia patients that caregivers could actually trust and supervise.",
    constraints: [
      "AI must not invent facts about the patient — memory has to be caregiver-verified",
      "Caregivers need real-time visibility and the ability to escalate",
      "Consent and access control across patient/caregiver roles",
    ],
    architecture: [
      "Stage-adaptive voice companion (Android, Jetpack Compose, MVVM, Hilt)",
      "Distress risk scoring (Green / Amber / Red) with human-in-the-loop escalation",
      "Real-time caregiver alerts via Supabase Realtime and Firebase Cloud Messaging",
      "Next.js + React web dashboard for caregivers",
    ],
    stack: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Next.js", "React", "Supabase", "Firebase"],
    security: [
      "Caregiver-verified memory prevents AI-invented facts",
      "Explicit consent workflows",
      "Role-based access via PostgreSQL row-level security (RLS)",
    ],
    outcome: "1st Prize, ₹1,00,000 — DRESTEIN '26 (Saveetha Engineering College). Took the idea from R&D to a working Android and web prototype in two days.",
    improve: "The team intends to keep developing it toward a production-ready product rather than stopping at the hackathon prototype.",
  },
  {
    slug: "netpulse",
    caseNumber: "002",
    name: "NetPulse",
    classification: "SECURITY / NETWORK MONITORING",
    status: "SHIPPED",
    summary: "Real-time network traffic monitor with passive device discovery and OS fingerprinting.",
    categories: ["Security", "Web"],
    year: "2026",
    role: "Full-stack development and detection logic",
    problem: "Give an operator a live, legible view of what's actually on their network — including devices that were never explicitly registered.",
    constraints: [
      "Real-time updates without overwhelming the operator",
      "Passive discovery first, active scanning only as a fallback",
    ],
    architecture: [
      "WebSocket-based live dashboard for connection analytics",
      "Passive ARP-sniffing device discovery with unknown-device flagging",
      "Passive OS fingerprinting (TTL, TCP window, MAC OUI, port analysis) with confidence scores",
      "Background active scans: hostname resolution, TCP port probing, ICMP",
    ],
    stack: ["React", "Python", "FastAPI", "WebSockets", "Network packet analysis"],
    security: [
      "Discovery defaults to passive, read-only capture",
      "Confidence-scored fingerprinting rather than unqualified claims",
    ],
    outcome: "Validated with 6 documented test cases, all passed.",
    improve: "Broaden protocol coverage and device-fingerprint confidence scoring over time.",
    links: [{ label: "Source on GitHub", href: "https://github.com/MR-JK-37/netpulse" }],
  },
  {
    slug: "aran",
    caseNumber: "003",
    name: "ARAN",
    classification: "EDGE AI / PREDICTIVE MAINTENANCE",
    status: "PROTOTYPE",
    summary: "Edge-AI predictive maintenance for MSMEs, built at MSME Hackathon 6.0.",
    categories: ["AI"],
    year: "2026",
    role: "ML pipeline, sensor integration and edge deployment",
    problem: "Most MSMEs can't afford predictive maintenance — cloud-based industrial IoT platforms are too expensive per machine. Build something that works at roughly ₹3,000 per machine.",
    constraints: [
      "Low per-machine cost (~₹3,000)",
      "All processing local — no cloud dependency",
      "Alerts need to be plain-language, not raw sensor data",
    ],
    architecture: [
      "Temperature, vibration, fan RPM and current sensors (DS18B20, ADXL345, SCT-013) per machine",
      "Raspberry Pi gateway processing all data locally",
      "Per-machine baseline learning: z-score, moving average and Isolation Forest anomaly detection",
      "0–100 health score with plain-language alerts",
    ],
    stack: ["Python", "Scikit-Learn", "SQLite", "Raspberry Pi", "IoT sensors"],
    security: ["All sensor data stays on-device — nothing leaves the local gateway"],
    outcome: "Working prototype at MSME Hackathon 6.0; only flags machines that actually need servicing instead of blanket maintenance schedules.",
    improve: "Expand the baseline-learning window and validate health scores against real failure data over a longer deployment.",
  },
];

export type Hackathon={year:string;name:string;team?:string;project:string;detail:string;decisions:string[];lesson:string;result?:string};
export const hackathons:Hackathon[]=[
 {year:"2026",name:"DRESTEIN '26",team:"Team of 4",project:"WE care",detail:"Voice-first, stage-adaptive AI companion for dementia patients, revealed as the problem statement on-site.",decisions:["Caregiver-verified memory, not AI-invented facts","Human-in-the-loop escalation","Consent-based role access"],lesson:"Research before building — the team spent real time on R&D before writing code, which shaped the whole architecture.",result:"1st Prize, ₹1,00,000"},
 {year:"2026",name:"MEGATHON: Fusion for Future",team:"Team CryptX",project:"—",detail:"Hackathon win as part of Team CryptX, III Year CSE (Cyber Security), RMKCET.",decisions:[],lesson:"Teamwork across a 4-person team under time pressure.",result:"1st Prize, ₹1,00,000"},
 {year:"2026",name:"MSME Hackathon 6.0",project:"ARAN",detail:"Edge-AI predictive maintenance for MSME shop floors running fully on a local Raspberry Pi gateway.",decisions:["Local-only processing","Low per-machine hardware cost","Plain-language health scoring"],lesson:"Detection for a shop floor has to respect constrained hardware and keep costs low enough for an MSME to actually adopt it."},
];

export {profile} from "@/content/profile";

export const skillGroups=[
 {name:"Security & testing",items:["Burp Suite","Nmap","Wireshark","Wazuh SIEM","Zabbix","OWASP Top 10"]},
 {name:"CTF & forensics",items:["Steganography","Binwalk","ExifTool","Malware analysis (learning)"]},
 {name:"Programming",items:["Python","Java","Kotlin","C++","JavaScript","SQL","Bash"]},
 {name:"Frameworks",items:["React","Next.js","FastAPI","Jetpack Compose","Supabase","Firebase"]},
] as const;

export const optionalContent={
  experience:[
    {role:"Cyber Security Intern",organization:"C-DAC, Chennai",period:"Jun 2025 – Jul 2025",summary:"Deployed Wazuh SIEM and Zabbix monitoring across Linux and Windows endpoints for real-time security event detection. Reviewed system logs, hardened Windows Firewall rules and applied Linux baseline security configurations."},
    {role:"Software Development Intern",organization:"HTC Pvt Ltd",summary:"First-hand exposure to how an IT company delivers a project: team structure, roles and responsibilities, and collaborative workflows."},
  ] as {role:string;organization:string;period?:string;summary?:string}[],
  education:[
    {institution:"R.M.K. College of Engineering and Technology, Chennai",degree:"B.E. Computer Science & Engineering (Cyber Security)",period:"2024 – 2028"},
    {institution:"R.M.K. Matriculation Higher Secondary School",degree:"Higher Secondary Certificate (Computer Science)",period:"2022 – 2024"},
  ] as {institution:string;degree:string;period?:string}[],
  certifications:[
    {name:"API Security & Vulnerability Testing",issuer:"APISEC"},
    {name:"Certified Online Fraud Prevention Specialist (COFPS)",issuer:"COFPS"},
    {name:"Oracle Cloud Infrastructure 2025 — Certified AI Foundations Associate",issuer:"Oracle",date:"2025"},
    {name:"Introduction to Cybersecurity",issuer:"Cisco Networking Academy",date:"Jun 2025"},
    {name:"Google AI Essentials Specialization",issuer:"Google / Coursera",date:"Jun 2025"},
  ] as {name:string;issuer:string;date?:string;url?:string}[],
  honors:[] as {name:string;issuer?:string;date?:string}[],
  volunteering:[] as {role:string;organization:string;summary?:string}[],
  learning:[] as string[],
  writeups:[] as {challenge:string;category:string;approach:string;tools:string[];lesson:string}[],
};
export function evidenceId(value:string){let hash=2166136261;for(const character of value){hash^=character.charCodeAt(0);hash=Math.imul(hash,16777619)}return `EV-${(hash>>>0).toString(16).toUpperCase().padStart(8,"0")}`}
export const memories: { src: string; alt: string; width: number; height: number }[] = [
  {
    src: "/images/achievements/glassdoor-bounty-650.jpg",
    alt: "Official RMK College announcement poster congratulating Jaikiran E for $650 Glassdoor bug bounty reward",
    width: 819,
    height: 1024,
  },
  {
    src: "/images/achievements/drestein-100k-first-prize.jpg",
    alt: "Jaikiran and team of four receiving the Rs 1,00,000 First Prize winner cheque at DRESTEIN 26, Saveetha Engineering College",
    width: 768,
    height: 1024,
  },
  {
    src: "/images/achievements/hackathon-podium-award.jpg",
    alt: "Jaikiran holding certificate of excellence with team and university faculty dignitaries on auditorium stage",
    width: 480,
    height: 360,
  },
  {
    src: "/images/achievements/ceremony-certificate-stage.jpg",
    alt: "Jaikiran receiving winner honors and certificate from dignitaries during college technical award ceremony",
    width: 480,
    height: 319,
  },
];
