/**
 * Skills — sourced directly from resume Technical Skills section (Oct 2026).
 */

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "security",
    label: "Security & testing",
    items: [
      "Burp Suite",
      "Nmap",
      "Wireshark",
      "Wazuh SIEM",
      "Zabbix",
      "OWASP Top 10",
      "API security testing",
      "Vulnerability assessment",
      "Log analysis",
    ],
  },
  {
    id: "ctf",
    label: "CTF & forensics",
    items: ["Steganography (Steghide, StegSolve)", "Binwalk", "ExifTool", "Malware analysis (learning)"],
  },
  {
    id: "programming",
    label: "Programming",
    items: ["Python", "Java", "Kotlin", "C++", "JavaScript", "SQL (MySQL)", "Bash"],
  },
  {
    id: "frameworks",
    label: "Frameworks & platforms",
    items: [
      "React",
      "Next.js",
      "FastAPI",
      "Jetpack Compose",
      "Supabase",
      "Firebase",
      "Kali Linux",
      "Parrot OS",
      "Arch Linux",
      "Windows",
    ],
  },
];

export const currentlyExploring: string[] = [
  "Cybersecurity labs & CTFs",
  "Full-stack development",
  "AI + MCP systems",
  "Security research",
  "Building useful digital products",
];
