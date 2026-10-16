"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Info, X } from "./icons";
import type { Project, ProjectCategory } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Sparkle } from "./sparkle";

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node) return; node.dataset.ready = "true"; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.dataset.visible = "true"; observer.disconnect(); } }, { threshold: .12 }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={cn("reveal", className)}>{children}</div>;
}

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const categories: Array<"All" | ProjectCategory> = ["All", "Security", "AI", "Mobile", "Web"];
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const visible = active === "All" ? projects : projects.filter((project) => project.categories.includes(active));
  return <><div className="tabs glass" role="tablist" aria-label="Filter projects">{categories.map((category) => <button key={category} role="tab" aria-selected={active === category} onClick={() => setActive(category)}>{category}</button>)}</div><div className="project-grid">{visible.map((project, index) => <ProjectCard project={project} featured={index === 0 && active === "All"} key={project.slug} />)}</div></>;
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article className={cn("project-card glass", featured && "project-card--featured")}><div className="project-card__meta"><span className="mono">{project.classification}</span><span className="mono">{project.year}</span></div><div><h3>{project.name}</h3><p>{project.summary}</p></div><div className={cn("project-visual", `project-visual--${project.slug}`)} aria-hidden="true"><span /><span /><span /><i /><i /></div><div className="project-card__foot"><div className="tag-row">{project.categories.map((category) => <span className="badge" key={category}>{category}</span>)}</div><Link className="project-link" href={`/work/${project.slug}`} aria-label={`Read ${project.name} case study`}><ArrowUpRight size={18} /></Link></div></article>;
}

export function Toggle({ label = "Enable signal" }: { label?: string }) { const [checked, setChecked] = useState(false); return <button className="toggle-row" role="switch" aria-checked={checked} onClick={() => setChecked((v) => !v)}><span>{label}</span><span className="toggle"><span /></span></button>; }
export function Checkbox({ label = "Remember preference" }: { label?: string }) { const [checked, setChecked] = useState(false); return <label className="checkbox"><input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} /><span aria-hidden="true">{checked && <Check size={15} />}</span>{label}</label>; }
export function Tooltip() { return <span className="tooltip-wrap"><button className="button button--icon button--secondary" aria-label="Why evidence matters" aria-describedby="tooltip-demo"><Info /></button><span className="tooltip" role="tooltip" id="tooltip-demo">Evidence before claims.</span></span>; }

export function ModalDemo() {
  const [open, setOpen] = useState(false); const closeRef = useRef<HTMLButtonElement>(null); const modalRef = useRef<HTMLElement>(null); const titleId = useId();
  useEffect(() => { if (!open) return; closeRef.current?.focus(); const key = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); if (event.key === "Tab") { const focusable = Array.from(modalRef.current?.querySelectorAll<HTMLElement>("button, a[href], input") ?? []); if (!focusable.length) return; const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [open]);
  return <><button className="button button--primary" onClick={() => setOpen(true)}>Open modal</button>{open && <div className="dialog-backdrop"><section ref={modalRef} className="modal glass-strong" role="dialog" aria-modal="true" aria-labelledby={titleId}><button ref={closeRef} className="modal-close button button--icon button--secondary" onClick={() => setOpen(false)} aria-label="Close modal"><X /></button><Sparkle /><h2 id={titleId}>A focused layer.</h2><p>Dialogs trap attention only when the task truly requires it. Escape always closes this example.</p><button className="button button--primary" onClick={() => setOpen(false)}>Understood</button></section></div>}</>;
}
