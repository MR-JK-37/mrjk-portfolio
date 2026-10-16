"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Command, Menu, MoonStar, Search, X } from "./icons";
import { Sparkle } from "./sparkle";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/content";

type Toast = { id: number; message: string; tone: "success" | "error" };
type ToastContextValue = { notify: (message: string, tone?: Toast["tone"]) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const notify = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4200);
  }, []);
  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => <div className={cn("toast", `toast--${toast.tone}`)} key={toast.id}><Sparkle />{toast.message}</div>)}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside ToastProvider");
  return value;
}

const links = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Proof", href: "/#proof", id: "proof" },
  { label: "Toolkit", href: "/#toolkit", id: "toolkit" },
  { label: "About", href: "/#about", id: "about" },
];

export function FloatingNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [navyMode, setNavyMode] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => { const y = window.scrollY; setHidden(y > lastY.current && y > 120); lastY.current = y; };
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-30% 0px -60%" });
    links.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [pathname]);
  useEffect(() => { document.documentElement.dataset.theme = navyMode ? "navy" : "cream"; }, [navyMode]);
  return (
    <header className={cn("floating-nav glass", hidden && "floating-nav--hidden")}>
      <Link className="brand" href="/" aria-label="MR!JK! home"><Sparkle /> <span>MR!JK!</span></Link><span className="flag-count mono" aria-label="Hidden evidence flags found">FLAGS <b id="flag-count">0/4</b></span>
      <nav className={cn("nav-links", open && "nav-links--open")} aria-label="Primary navigation">
        {links.map((link) => <Link key={link.id} href={link.href} aria-current={active === link.id ? "location" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <Link href="/memories" onClick={() => setOpen(false)}>Memories</Link>
      </nav>
      <div className="nav-actions">
        <button className="nav-command" type="button" onClick={() => window.dispatchEvent(new Event("open-command"))} aria-label="Open command palette"><Command size={15} />K</button>
        <button className="nav-theme" type="button" onClick={() => setNavyMode((value) => !value)} aria-pressed={navyMode} aria-label="Toggle ambient theme"><MoonStar size={17} /></button>
        <Link className="button button--primary nav-contact" href="/#contact">Contact</Link>
        <button className="mobile-menu" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

const commandLinks = [
  { label: "Home", href: "/" }, { label: "Selected work", href: "/#work" },
  ...projects.map((project) => ({ label: project.name, href: `/work/${project.slug}` })),
  { label: "Resume", href: "/resume" }, { label: "Design system", href: "/design-system" },
  { label: "How this site is secured", href: "/security" }, { label: "Contact", href: "/#contact" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen((v) => !v); } if (event.key === "Escape") setOpen(false); if (event.key === "Tab" && open) { const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button, input") ?? []); if (!focusable.length) return; const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } };
    const custom = () => setOpen(true);
    window.addEventListener("keydown", handler); window.addEventListener("open-command", custom);
    return () => { window.removeEventListener("keydown", handler); window.removeEventListener("open-command", custom); };
  }, [open]);
  useEffect(() => { if (open) window.setTimeout(() => inputRef.current?.focus(), 20); }, [open]);
  if (!open) return null;
  const filtered = commandLinks.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <div ref={dialogRef} className="command-dialog glass-strong" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="command-search"><Search aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search pages" /><button onClick={() => setOpen(false)} aria-label="Close command palette"><X /></button></div>
        <div className="command-list">{filtered.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>{item.label}</span><ArrowRight size={16} /></Link>)}{!filtered.length && <p>No matching destination.</p>}</div>
      </div>
    </div>
  );
}

export function CursorAura() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
        const glass = (event.target as HTMLElement).closest<HTMLElement>(".glass, .glass-strong, .glass-tinted");
        if (glass) { const rect = glass.getBoundingClientRect(); glass.style.setProperty("--mx", `${event.clientX - rect.left}px`); glass.style.setProperty("--my", `${event.clientY - rect.top}px`); }
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);
  return <div className="cursor-aura" aria-hidden="true" />;
}

export function EvidenceTracker(){
  useEffect(()=>{const key="mrjk-evidence";const known=["terminal","source","well-known","konami"];const read=()=>{try{return JSON.parse(localStorage.getItem(key)??"[]") as string[]}catch{return[]}};const render=()=>{const node=document.getElementById("flag-count");if(node)node.textContent=`${read().filter(value=>known.includes(value)).length}/${known.length}`};const found=(event:Event)=>{const id=(event as CustomEvent<string>).detail;const next=Array.from(new Set([...read(),id]));localStorage.setItem(key,JSON.stringify(next));render()};let sequence:number[]=[];const code=[38,38,40,40,37,39,37,39,66,65];const keys=(event:KeyboardEvent)=>{sequence=[...sequence,event.keyCode].slice(-code.length);if(sequence.join()===code.join()){window.dispatchEvent(new CustomEvent("evidence-found",{detail:"konami"}));document.documentElement.dataset.evidence="unlocked"}};window.addEventListener("evidence-found",found);window.addEventListener("keydown",keys);render();return()=>{window.removeEventListener("evidence-found",found);window.removeEventListener("keydown",keys)}},[]);return null
}

