"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Sun, Moon, Search, X } from "./icons";
import { Sparkle } from "./sparkle";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/content";

/* ─── Toast ─── */
type Toast = { id: number; message: string; tone: "success" | "error" };
type ToastContextValue = { notify: (message: string, tone?: Toast["tone"]) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const notify = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now();
    setToasts((cur) => [...cur, { id, message, tone }]);
    window.setTimeout(() => setToasts((cur) => cur.filter((t) => t.id !== id)), 4200);
  }, []);
  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div className={cn("toast", `toast--${t.tone}`)} key={t.id}>
            <Sparkle />
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside ToastProvider");
  return value;
}

/* ─── Nav links matching reference design ─── */
const NAV_LINKS = [
  { label: "Home",       href: "/",           id: null },
  { label: "About",      href: "/#about",      id: "about" },
  { label: "Projects",   href: "/projects",    id: null },
  { label: "Security",   href: "/security",    id: null },
  { label: "Experience", href: "/experience",  id: null },
  { label: "Blog",       href: "/#about",      id: null },
] as const;

/* ─── FloatingNav ─── */
export function FloatingNav() {
  const pathname = usePathname();
  const [hidden,    setHidden]    = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [nightMode, setNightMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "night";
    }
    return true; // default night per reference
  });
  const [active,    setActive]    = useState("");
  const lastY = useRef(0);

  useEffect(() => {
    const mode = nightMode ? "night" : "day";
    document.documentElement.dataset.theme = mode;
    localStorage.setItem("theme", mode);
  }, [nightMode]);

  useEffect(() => {
    const updateActiveSection = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;

      if (pathname === "/") {
        const aboutEl = document.getElementById("about");
        if (aboutEl) {
          const rect = aboutEl.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            setActive("about");
            return;
          }
        }
        if (window.scrollY < 400) {
          setActive("hero");
          return;
        }
      }
    };
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();

    // Section observer for active link
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (e.target.id === "about") {
              setActive("about");
            } else if (e.target.id === "hero" && window.scrollY < 400) {
              setActive("hero");
            }
          }
        });
      },
      { threshold: [0, 0.2] },
    );
    const heroNode = document.getElementById("hero");
    if (heroNode) observer.observe(heroNode);
    const aboutNode = document.getElementById("about");
    if (aboutNode) observer.observe(aboutNode);
    return () => { window.removeEventListener("scroll", updateActiveSection); observer.disconnect(); };
  }, [pathname]);

  return (
    <>
      <header className={cn("floating-nav", hidden && "floating-nav--hidden")} role="banner">
        {/* Left pill — logo */}
        <Link href="/" className="nav-brand" aria-label="MR!JK! home">
          <span>MR!JK!</span>
        </Link>

        {/* Center — nav links */}
        <nav className="nav-center" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const isHome = link.href === "/";
            const isCurrent = isHome
              ? pathname === "/" && (active === "" || active === "hero")
              : link.id
              ? active === link.id
              : pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isCurrent ? "location" : undefined}
                className={isCurrent ? "is-active" : undefined}
              >
                {link.label}
                {isCurrent && <span className="nav-active-bar" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>

        {/* Right — theme + CTA */}
        <div className="nav-actions">
          <button
            className="nav-theme-btn"
            type="button"
            aria-pressed={nightMode}
            aria-label={nightMode ? "Switch to day mode" : "Switch to night mode"}
            onClick={() => setNightMode((v) => !v)}
          >
            {nightMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link href="/#about" className="nav-connect">
            Let&apos;s Connect&nbsp;↗
          </Link>

          <button
            className="mobile-menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drop panel */}
      <nav
        className={cn("nav-mobile-panel", menuOpen && "open")}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/#contact" onClick={() => setMenuOpen(false)}>Let&apos;s Connect</Link>
      </nav>
    </>
  );
}

/* ─── Command Palette ─── */
const commandLinks = [
  { label: "Home",            href: "/" },
  { label: "Selected work",   href: "/#work" },
  { label: "All projects",    href: "/projects" },
  ...projects.map((p) => ({ label: p.name, href: `/work/${p.slug}` })),
  { label: "Security",        href: "/security" },
  { label: "Experience",      href: "/experience" },
  { label: "Resume",          href: "/resume" },
  { label: "Design system",   href: "/design-system" },
  { label: "Contact",         href: "/#contact" },
];

export function CommandPalette() {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState("");
  const inputRef  = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && open) {
        const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("a[href],button,input") ?? []);
        if (!focusable.length) return;
        const [first, last] = [focusable[0], focusable[focusable.length - 1]];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const custom = () => setOpen(true);
    window.addEventListener("keydown", handler);
    window.addEventListener("open-command", custom);
    return () => { window.removeEventListener("keydown", handler); window.removeEventListener("open-command", custom); };
  }, [open]);

  useEffect(() => { if (open) window.setTimeout(() => inputRef.current?.focus(), 20); }, [open]);

  if (!open) return null;
  const filtered = commandLinks.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div ref={dialogRef} className="command-dialog glass" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="command-search">
          <Search aria-hidden="true" size={18} />
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search pages" placeholder="Search…" /> {/* content-check allow */}
          <button onClick={() => setOpen(false)} aria-label="Close command palette"><X size={16} /></button>
        </div>
        <div className="command-list">
          {filtered.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <span>{item.label}</span>
              <ArrowRight size={16} />
            </Link>
          ))}
          {!filtered.length && <p>No matching destination.</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Cursor Aura ─── */
export function CursorAura() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
        const glass = (e.target as HTMLElement).closest<HTMLElement>(".glass, .glass-navy");
        if (glass) {
          const r = glass.getBoundingClientRect();
          glass.style.setProperty("--mx", `${e.clientX - r.left}px`);
          glass.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);
  return <div className="cursor-aura" aria-hidden="true" />;
}

/* ─── Evidence Tracker ─── */
export function EvidenceTracker() {
  useEffect(() => {
    const key = "mrjk-evidence";
    const read = () => { try { return JSON.parse(localStorage.getItem(key) ?? "[]") as string[]; } catch { return []; } };
    const found = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const next = Array.from(new Set([...read(), id]));
      localStorage.setItem(key, JSON.stringify(next));
    };
    let sequence: number[] = [];
    const code = [38,38,40,40,37,39,37,39,66,65];
    const keys = (e: KeyboardEvent) => {
      sequence = [...sequence, e.keyCode].slice(-code.length);
      if (sequence.join() === code.join()) {
        window.dispatchEvent(new CustomEvent("evidence-found", { detail: "konami" }));
        document.documentElement.dataset.evidence = "unlocked";
      }
    };
    window.addEventListener("evidence-found", found);
    window.addEventListener("keydown", keys);
    return () => { window.removeEventListener("evidence-found", found); window.removeEventListener("keydown", keys); };
  }, []);
  return null;
}

