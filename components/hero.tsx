"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Github, Linkedin, Youtube, Mail, AtSign,
} from "./icons";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";

const SOCIALS = [
  { label: "GitHub",   href: profile.github,                            Icon: Github   },
  { label: "LinkedIn", href: profile.linkedin,                          Icon: Linkedin },
  { label: "Bugcrowd", href: profile.bugcrowd,                          Icon: AtSign   },
  { label: "YouTube",  href: profile.youtube,                           Icon: Youtube  },
  { label: "Email",    href: site.email ? `mailto:${site.email}` : null, Icon: Mail    },
] as const;

const ROLES = [
  "Application Security",
  "CTF Competitor",
  "AI Security",
  "Bug Hunter",
  "System Builder",
];

/* ── Particle canvas ────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0, H = 0;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      radius: number; alpha: number;
    }
    let particleCount = 55;
    let maxDist = 130;
    let particles: Particle[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      W = canvas!.width  = rect.width;
      H = canvas!.height = rect.height;
      particleCount = Math.min(105, Math.max(50, Math.floor((W * H) / 20000)));
      maxDist = Math.min(160, Math.max(120, W * 0.085));
    }

    function spawn(): Particle {
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.15,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: particleCount }, spawn);
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // update
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }

      // edges
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.18;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(200,64,95,${opacity})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }
      }

      // nodes
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(248,240,229,${p.alpha})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    init();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-particle-canvas"
      aria-hidden="true"
    />
  );
}

/* ── Typewriter role cycling ────────────────────────────── */
function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? ROLES[0]
      : "",
  );
  const [phase, setPhase] = useState<"typing"|"hold"|"erasing">("typing");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayText.length < target.length) {
        timeout = setTimeout(() => setDisplayText(target.slice(0, displayText.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase("hold"), 1800);
      }
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("erasing"), 400);
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 35);
      } else {
        timeout = setTimeout(() => {
          setRoleIdx((i) => (i + 1) % ROLES.length);
          setPhase("typing");
        }, 0);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, phase, roleIdx]);

  return (
    <span className="hero-typewriter" aria-live="polite" aria-atomic="true">
      {displayText}
      <span className="hero-cursor" aria-hidden="true">|</span>
    </span>
  );
}

/* ── Interactive Cybersecurity Deck & Terminal ─────────────────────── */
const QUICK_COMMANDS = [
  { label: "$ whoami", cmd: "whoami" },
  { label: "$ ctf", cmd: "ctf" },
  { label: "$ bounty", cmd: "bounty" },
  { label: "$ projects", cmd: "projects" },
  { label: "$ skills", cmd: "skills" },
  { label: "$ contact", cmd: "contact" },
  { label: "$ clear", cmd: "clear" },
] as const;

function InteractiveCyberDeck() {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<Array<{ id: number; cmd: string; output: React.ReactNode }>>([
    {
      id: 1,
      cmd: "whoami",
      output: (
        <div>
          <span className="deck-hl-brand">Jaikiran E</span> (MR!JK!) — Cybersecurity Student &amp; AI Builder.
          <div className="deck-text-sub">RMK College of Engineering and Technology, Chennai (CSE Cyber Security).</div>
          <div className="deck-pills-row">
            <span className="deck-pill deck-pill--bounty">$650 Bug Bounty</span>
            <span className="deck-pill deck-pill--ctf">NOCTIVUS 4th</span>
            <span className="deck-pill deck-pill--ctf">NULL CORE 13th</span>
            <span className="deck-pill deck-pill--prize">₹2,00,000 Awards</span>
          </div>
        </div>
      ),
    },
  ]);

  const execute = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();

    if (lower === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let output: React.ReactNode;
    if (lower === "whoami") {
      output = (
        <div>
          <span className="deck-hl-brand">Jaikiran E</span> (MR!JK!) — Cybersecurity Student &amp; AI Builder.
          <div className="deck-text-sub">RMK College of Engineering and Technology, Chennai (CSE Cyber Security).</div>
          <div className="deck-pills-row">
            <span className="deck-pill deck-pill--bounty">$650 Bug Bounty</span>
            <span className="deck-pill deck-pill--ctf">NOCTIVUS 4th</span>
            <span className="deck-pill deck-pill--ctf">NULL CORE 13th</span>
          </div>
        </div>
      );
    } else if (lower === "ctf" || lower === "achievements") {
      output = (
        <div className="deck-list">
          <div>🏆 <strong style={{ color: "#F8FAFC" }}>4th Place</strong> / 100+ teams — NOCTIVUS &apos;25 (Team CYBERBEINGS)</div>
          <div>🛡️ <strong style={{ color: "#F8FAFC" }}>13th Place</strong> — NULL CORE (Team SPARTANS)</div>
          <div>🥇 <strong style={{ color: "#F8FAFC" }}>1st Prize (₹1,00,000)</strong> — DRESTEIN &apos;26 (AI Elderly Companion)</div>
          <div>🥇 <strong style={{ color: "#F8FAFC" }}>1st Prize (₹1,00,000)</strong> — MEGATHON: Fusion for Future</div>
          <div>🎯 <strong style={{ color: "#F8FAFC" }}>8th Place</strong> — DEFCON-conducted CTF (International Team)</div>
          <div>⭐ <strong style={{ color: "#F8FAFC" }}>Shortlisted</strong> — Google Gemini Student Ambassador 2026</div>
        </div>
      );
    } else if (lower.includes("bounty") || lower === "glassdoor") {
      output = (
        <div>
          <div style={{ color: "#10B981", fontWeight: 700 }}>[VERIFIED] Glassdoor Security Hall of Fame</div>
          <div>Bounty Award: <strong style={{ color: "#F8FAFC" }}>$650 USD</strong></div>
          <div className="deck-text-sub">Vulnerability: Business Logic Candidate Experience Survey injection via arbitrary employerId accepted without relationship.</div>
        </div>
      );
    } else if (lower === "projects" || lower === "work") {
      output = (
        <div className="deck-list">
          <div>1. <strong style={{ color: "#F8FAFC" }}>WE care</strong> — AI Dementia Care Platform (Next.js, FastAPI, Kotlin)</div>
          <div>2. <strong style={{ color: "#F8FAFC" }}>NetPulse</strong> — Real-Time Network Traffic Monitor &amp; ARP Sniffer (Python)</div>
          <div>3. <strong style={{ color: "#F8FAFC" }}>ARAN</strong> — Edge-AI Predictive Maintenance for MSMEs (Scikit-Learn)</div>
        </div>
      );
    } else if (lower === "skills" || lower === "stack") {
      output = (
        <div>
          <div><strong style={{ color: "#FB7185" }}>Security:</strong> Burp Suite Pro, Nmap, Wireshark, Wazuh SIEM, OWASP Top 10, ExifTool</div>
          <div style={{ marginTop: 3 }}><strong style={{ color: "#38BDF8" }}>Languages:</strong> Python, Java, Kotlin, C++, JavaScript/TypeScript, SQL, Bash</div>
          <div style={{ marginTop: 3 }}><strong style={{ color: "#10B981" }}>Frameworks:</strong> Next.js, React, FastAPI, Firebase, Supabase, Linux</div>
        </div>
      );
    } else if (lower === "contact" || lower === "email") {
      output = (
        <div>
          <div>LinkedIn: <a href="https://linkedin.com/in/jaikiran-e" target="_blank" rel="noreferrer" style={{ color: "#38BDF8", textDecoration: "underline" }}>linkedin.com/in/jaikiran-e</a></div>
          <div>GitHub: <a href="https://github.com/MR-JK-37" target="_blank" rel="noreferrer" style={{ color: "#38BDF8", textDecoration: "underline" }}>github.com/MR-JK-37</a></div>
          <div>Email: <a href="mailto:jaikiran037@gmail.com" style={{ color: "#FB7185", textDecoration: "underline" }}>jaikiran037@gmail.com</a></div>
        </div>
      );
    } else if (lower === "help") {
      output = (
        <div>
          Commands: <span className="deck-cmd-tag">whoami</span>, <span className="deck-cmd-tag">ctf</span>, <span className="deck-cmd-tag">bounty</span>, <span className="deck-cmd-tag">projects</span>, <span className="deck-cmd-tag">skills</span>, <span className="deck-cmd-tag">contact</span>, <span className="deck-cmd-tag">clear</span>
        </div>
      );
    } else {
      output = (
        <div>
          command not found: <span style={{ color: "#FB7185" }}>{trimmed}</span>. Type <span className="deck-cmd-tag">help</span> or click a quick action.
        </div>
      );
    }

    setHistory((prev) => [...prev, { id: Date.now(), cmd: trimmed, output }]);
    setInputVal("");
    setTimeout(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }, 50);
  };

  return (
    <div className="cyber-deck-card">
      {/* Chrome header */}
      <div className="cyber-deck-header">
        <div className="cyber-deck-dots">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="cyber-deck-title">
          <span>mrjk@cyber-mesh:~ (zsh)</span>
        </div>
        <div className="cyber-deck-status" aria-hidden="true" style={{ marginLeft: "auto" }}>
          <span className="ping-dot" />
          <span>SOC ACTIVE • 14ms</span>
        </div>
      </div>

      {/* Quick Action Chips Bar */}
      <div className="cyber-deck-quickbar">
        {QUICK_COMMANDS.map(({ label, cmd }) => (
          <button
            key={cmd}
            type="button"
            className="deck-quick-btn"
            onClick={() => execute(cmd)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Interactive Terminal Body */}
      <div className="cyber-deck-body" ref={terminalBodyRef}>
        <div className="terminal-welcome">
          <span style={{ color: "#38BDF8" }}>MR!JK! Cyber Intelligence Shell</span> [v2.6.4-release]
          <br />
          Host: <span style={{ color: "#10B981" }}>rmkcet-cse-security</span> | Kernel: <span style={{ color: "rgba(248,240,229,.6)" }}>Linux 6.8.0-x86_64</span>
          <br />
          Type a command or click an action pill above to explore.
        </div>

        {history.map((item) => (
          <div key={item.id} className="terminal-log-entry">
            <div className="terminal-cmd-line">
              <span className="terminal-prompt-user">mrjk@cyber-mesh</span>
              <span className="terminal-prompt-sym">:~$</span>
              <span className="terminal-cmd-text">{item.cmd}</span>
            </div>
            <div className="terminal-cmd-result">{item.output}</div>
          </div>
        ))}

        {/* Active Input Line */}
        <div className="terminal-input-row" onClick={() => inputRef.current?.focus()}>
          <span className="terminal-prompt-user">mrjk@cyber-mesh</span>
          <span className="terminal-prompt-sym">:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-real-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                execute(inputVal);
              }
            }}
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="terminal-cursor-block" aria-hidden="true">▋</span>
        </div>
      </div>

      {/* Telemetry Radar Screen: Always visible, exactly one .hero-scene-svg */}
      <div className="cyber-deck-radar-view">
        <div className="radar-view-header">
          <span className="radar-view-title">LIVE SOC TELEMETRY &amp; THREAT RADAR</span>
          <span className="radar-view-tag">DEFENSE GRID ONLINE</span>
        </div>
        <DashboardScene />
      </div>
    </div>
  );
}

/* ── Animated SOC Threat Radar & Cyber HUD SVG ─────────────────────── */
function DashboardScene() {
  return (
    <svg
      className="hero-scene-svg"
      viewBox="0 0 660 360"
      width="100%"
      style={{ aspectRatio: "660 / 360", maxWidth: "38rem", width: "100%", height: "auto" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B1A36" />
          <stop offset="70%" stopColor="#061022" />
          <stop offset="100%" stopColor="#030814" />
        </radialGradient>
        <linearGradient id="sweepBeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(251, 113, 133, 0.45)" />
          <stop offset="60%" stopColor="rgba(251, 113, 133, 0.1)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="crimsonGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Frame Container Background */}
      <rect x="0" y="0" width="660" height="360" rx="12" fill="url(#radarBg)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />

      {/* Corner Cyber Brackets */}
      <path d="M 12 28 L 12 12 L 28 12" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M 648 28 L 648 12 L 632 12" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M 12 332 L 12 348 L 28 348" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M 648 332 L 648 348 L 632 348" fill="none" stroke="#38BDF8" strokeWidth="1.5" />

      {/* Background Cyber Grid */}
      <g opacity="0.15">
        <line x1="40" y1="90" x2="620" y2="90" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="3 3" />
        <line x1="40" y1="180" x2="620" y2="180" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="3 3" />
        <line x1="40" y1="270" x2="620" y2="270" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="3 3" />
        <line x1="160" y1="30" x2="160" y2="330" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="3 3" />
        <line x1="330" y1="30" x2="330" y2="330" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="3 3" />
        <line x1="500" y1="30" x2="500" y2="330" stroke="#38BDF8" strokeWidth="0.7" strokeDasharray="3 3" />
      </g>

      {/* Radar Concentric Rings (Center at 330, 180) */}
      <g className="hero-radar-rings">
        <circle cx="330" cy="180" r="130" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="330" cy="180" r="90" fill="none" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" />
        <circle cx="330" cy="180" r="50" fill="none" stroke="rgba(251, 113, 133, 0.3)" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="330" cy="180" r="16" fill="rgba(251, 113, 133, 0.1)" stroke="#FB7185" strokeWidth="1" />
        {/* Crosshairs */}
        <line x1="180" y1="180" x2="480" y2="180" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" />
        <line x1="330" y1="40" x2="330" y2="320" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.8" />
      </g>

      {/* Rotating Radar Sweep Cone */}
      <g transform="translate(330, 180)">
        <path d="M 0 0 L 125 -45 A 130 130 0 0 1 130 0 Z" fill="url(#sweepBeam)" opacity="0.85">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Central Hub Reticle */}
      <circle cx="330" cy="180" r="4" fill="#38BDF8" filter="url(#cyanGlow)" />
      <text x="330" y="202" textAnchor="middle" fill="#F8FAFC" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="0.08em">
        CHENNAI SOC [RMKCET]
      </text>

      {/* Target Node 1: Glassdoor Bug Bounty */}
      <g className="hero-target-node">
        <circle cx="210" cy="110" r="4.5" fill="#10B981" filter="url(#cyanGlow)" className="hero-chart-dot" />
        <circle cx="210" cy="110" r="9" fill="none" stroke="#10B981" strokeWidth="0.8" opacity="0.6" />
        <line x1="210" y1="110" x2="160" y2="75" stroke="#10B981" strokeWidth="0.8" strokeDasharray="2 2" />
        <rect x="42" y="60" width="124" height="26" rx="4" fill="rgba(6, 16, 36, 0.9)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="0.8" />
        <text x="50" y="72" fill="#10B981" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700">GLASSDOOR BOUNTY</text>
        <text x="50" y="81" fill="#F8FAFC" fontSize="6" fontFamily="var(--font-mono)">$650 USD • VERIFIED</text>
      </g>

      {/* Target Node 2: NOCTIVUS CTF */}
      <g className="hero-target-node">
        <circle cx="450" cy="95" r="4.5" fill="#FB7185" filter="url(#crimsonGlow)" className="hero-chart-dot" style={{ animationDelay: "0.5s" }} />
        <circle cx="450" cy="95" r="9" fill="none" stroke="#FB7185" strokeWidth="0.8" opacity="0.6" />
        <line x1="450" y1="95" x2="495" y2="65" stroke="#FB7185" strokeWidth="0.8" strokeDasharray="2 2" />
        <rect x="495" y="52" width="124" height="26" rx="4" fill="rgba(6, 16, 36, 0.9)" stroke="rgba(251, 113, 133, 0.4)" strokeWidth="0.8" />
        <text x="503" y="64" fill="#FB7185" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700">NOCTIVUS &apos;25 CTF</text>
        <text x="503" y="73" fill="#F8FAFC" fontSize="6" fontFamily="var(--font-mono)">4TH / 100+ TEAMS</text>
      </g>

      {/* Target Node 3: WE care AI Platform */}
      <g className="hero-target-node">
        <circle cx="475" cy="245" r="4.5" fill="#F59E0B" filter="url(#cyanGlow)" className="hero-chart-dot" style={{ animationDelay: "1s" }} />
        <circle cx="475" cy="245" r="9" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
        <line x1="475" y1="245" x2="505" y2="280" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="2 2" />
        <rect x="495" y="270" width="128" height="26" rx="4" fill="rgba(6, 16, 36, 0.9)" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="0.8" />
        <text x="503" y="282" fill="#F59E0B" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700">AI DEMENTIA CARE</text>
        <text x="503" y="291" fill="#F8FAFC" fontSize="6" fontFamily="var(--font-mono)">1ST PRIZE ₹1,00,000</text>
      </g>

      {/* Target Node 4: NULL CORE CTF */}
      <g className="hero-target-node">
        <circle cx="180" cy="240" r="4.5" fill="#38BDF8" filter="url(#cyanGlow)" className="hero-chart-dot" style={{ animationDelay: "1.5s" }} />
        <circle cx="180" cy="240" r="9" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
        <line x1="180" y1="240" x2="150" y2="275" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="2 2" />
        <rect x="42" y="265" width="118" height="26" rx="4" fill="rgba(6, 16, 36, 0.9)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.8" />
        <text x="50" y="277" fill="#38BDF8" fontSize="6.5" fontFamily="var(--font-mono)" fontWeight="700">NULL CORE CTF</text>
        <text x="50" y="286" fill="#F8FAFC" fontSize="6" fontFamily="var(--font-mono)">13TH PLACE SPARTANS</text>
      </g>

      {/* Bottom Telemetry HUD Status Strip */}
      <rect x="30" y="322" width="600" height="22" rx="4" fill="rgba(3, 8, 18, 0.85)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" />
      <text x="44" y="336" fill="#38BDF8" fontSize="6" fontFamily="var(--font-mono)" fontWeight="700">
        EDR: <tspan fill="#F8FAFC">WAZUH ACTIVE</tspan>
      </text>
      <text x="175" y="336" fill="#10B981" fontSize="6" fontFamily="var(--font-mono)" fontWeight="700">
        INTERCEPT: <tspan fill="#F8FAFC">BURP PRO ENGAGED</tspan>
      </text>
      <text x="345" y="336" fill="#FB7185" fontSize="6" fontFamily="var(--font-mono)" fontWeight="700">
        HARDENING: <tspan fill="#F8FAFC">OWASP TOP 10</tspan>
      </text>
      <text x="500" y="336" fill="#38BDF8" fontSize="6" fontFamily="var(--font-mono)" fontWeight="700">
        PING: <tspan fill="#10B981">14ms [SECURE]</tspan>
      </text>
    </svg>
  );
}

const CURRENT_FOCUS = [
  "Web Security & Threat Intel",
  "AI-assisted Triage & Systems",
  "Real-world Vulnerability Research",
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" id="hero">
      {/* Particle network background */}
      <ParticleCanvas />

      {/* Atmospheric layers */}
      <div className="hero-scene-bg" aria-hidden="true">
        <div className="hero-dark-vignette" />
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />
        <div className="hero-orb hero-orb--4" />
        <div className="hero-orb hero-orb--5" />
        <div className="hero-edge-glow" />
        <div className="hero-grain" />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-content">

          {/* ── Copy column ── */}
          <div className="hero-copy">
            <p className="hero-eyebrow" aria-label="Cybersecurity AI Engineering">
              <span aria-hidden="true" />
              CYBERSECURITY&nbsp;×&nbsp;AI&nbsp;×&nbsp;ENGINEERING
            </p>

            {/* Typewriter role line */}
            <div className="hero-role-line">
              <TypewriterRole />
            </div>

            <h1 id="hero-title" className="hero-h1">
              Curiosity drives a{" "}
              <span className="hero-safer-word">safer</span>
              <br />
              digital world.
            </h1>

            <p className="hero-sub">{profile.subheadline}</p>

            {/* Currently focusing strip */}
            <div className="hero-focus-row" aria-label="Current focus areas">
              <span className="hero-focus-pill hero-focus-pill--lead">
                <span className="hero-focus-dot" aria-hidden="true" />
                ACTIVE FOCUS
              </span>
              {CURRENT_FOCUS.map((item) => (
                <span key={item} className="hero-focus-pill">
                  {item}
                </span>
              ))}
            </div>

            <div className="hero-actions">
              <Link href="/projects" className="button button--burgundy hero-magnetic">
                Explore My Work&nbsp;↗
              </Link>
              <Link href="/resume" className="button button--outline hero-magnetic">
                Download Résumé&nbsp;⬇
              </Link>
            </div>

            <div className="hero-socials" role="list" aria-label="Social links">
              {SOCIALS.map(({ label, href, Icon }) => {
                if (!href) return null;
                return (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="hero-social-btn"
                    aria-label={label}
                    role="listitem"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>

            {/* Bottom location & signature tag */}
            <div className="hero-bottom-tag">
              <div className="hero-location-badge">
                <span className="hero-location-dot" aria-hidden="true" />
                <span>CHENNAI, INDIA</span>
              </div>
              <div className="hero-signature-script" aria-hidden="true">
                MR!JK!
              </div>
            </div>

            {/* Scroll cue */}
            <div className="hero-scroll-cue" aria-hidden="true">
              <span className="hero-scroll-text">Scroll</span>
              <div className="hero-scroll-track">
                <div className="hero-scroll-dot" />
              </div>
            </div>
          </div>

          {/* ── Visual column ── */}
          <div className="hero-visual-col">
            <InteractiveCyberDeck />
          </div>

        </div>
      </div>
    </section>
  );
}
