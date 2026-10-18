"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   PAGE LOADER — cinematic split-curtain + progress counter
══════════════════════════════════════════════════════════════ */
function shouldSkipLoader() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    if (sessionStorage.getItem("mrjk_loader_seen")) return true;
    sessionStorage.setItem("mrjk_loader_seen", "1");
  } catch {
    // sessionStorage might fail in private browsing mode, proceed normally
  }
  return false;
}

export function PageLoader() {
  const [count, setCount] = useState(0);
  // Server and the first client render must agree, so this always starts
  // "loading" (matching SSR, which has no window/sessionStorage); the skip
  // decision is made client-only in a layout effect, before paint, so a
  // skip never actually flashes the loader.
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");
  const skip = useRef(false);

  useLayoutEffect(() => {
    skip.current = shouldSkipLoader();
    if (skip.current) setPhase("done");
  }, []);

  useEffect(() => {
    if (skip.current) return;

    // Count 0 → 100 over ~1.1s with cubic-ease
    const startTime = performance.now();
    const DURATION = 1100;
    let rafId: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
      const value = Math.round(eased * 100);
      setCount(value);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("exit"), 120);
        setTimeout(() => setPhase("done"), 950);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`page-loader ${phase === "exit" ? "page-loader--exit" : ""}`}
      aria-hidden="true"
    >
      {/* Left curtain */}
      <div className="loader-curtain loader-curtain--left" />
      {/* Right curtain */}
      <div className="loader-curtain loader-curtain--right" />

      {/* Center content */}
      <div className={`loader-center ${phase === "exit" ? "loader-center--exit" : ""}`}>
        <div className="loader-brand">
          <span className="loader-brand-mr">MR</span>
          <span className="loader-brand-exclaim">!</span>
          <span className="loader-brand-jk">JK</span>
          <span className="loader-brand-exclaim">!</span>
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar-track">
            <div
              className="loader-bar-fill"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
          <span className="loader-count">{count}%</span>
        </div>
        <p className="loader-tagline">CYBERSECURITY × AI × ENGINEERING</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PARALLAX ENGINE — rAF compositor-thread parallax for
   hero layers, section backgrounds, floating elements
══════════════════════════════════════════════════════════════ */
export function ParallaxEngine() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Collect all parallax targets and their configured speeds
    const layers = [
      { selector: ".hero-orb--1", speed: 0.16, axis: "y" },
      { selector: ".hero-orb--2", speed: -0.10, axis: "y" },
      { selector: ".hero-orb--3", speed: 0.20, axis: "y" },
      { selector: ".hero-particle-canvas", speed: 0.06, axis: "y" },
      { selector: ".hero-shaft.s1", speed: 0.12, axis: "y" },
      { selector: ".hero-shaft.s2", speed: 0.08, axis: "y" },
      { selector: ".hero-shaft.s3", speed: 0.05, axis: "y" },
      { selector: ".hero-cream-panel", speed: 0.05, axis: "y" },
      { selector: ".hero-scene-svg", speed: -0.06, axis: "y" },
      { selector: ".achievement-strip", speed: 0.03, axis: "y" },
    ] as const;

    type Layer = {
      el: HTMLElement;
      speed: number;
      axis: "x" | "y";
    };

    const active: Layer[] = [];
    layers.forEach(({ selector, speed, axis }) => {
      const els = document.querySelectorAll<HTMLElement>(selector);
      els.forEach((el) => {
        active.push({
          el,
          speed,
          axis: axis as "x" | "y",
        });
        el.style.willChange = "transform";
      });
    });

    if (active.length === 0) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      const sy = window.scrollY;
      active.forEach(({ el, speed, axis }) => {
        const offset = sy * speed;
        if (axis === "y") {
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        } else {
          el.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        raf = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // paint initial state

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      active.forEach(({ el }) => {
        el.style.willChange = "";
        el.style.transform = "";
      });
    };
  }, []);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   SPLIT-TEXT REVEAL — masks text behind clip-path
   and animates words rising from below on scroll
══════════════════════════════════════════════════════════════ */
function splitIntoWordSpans(el: HTMLElement) {
  const text = el.textContent ?? "";
  const words = text.split(/(\s+)/);
  el.textContent = "";
  el.setAttribute("aria-label", text); // preserve accessibility

  words.forEach((seg) => {
    if (/^\s+$/.test(seg)) {
      el.appendChild(document.createTextNode(seg));
      return;
    }
    const mask = document.createElement("span");
    mask.className = "word-mask";
    const inner = document.createElement("span");
    inner.className = "word-inner";
    inner.textContent = seg;
    mask.appendChild(inner);
    el.appendChild(mask);
  });
}

export function SplitRevealRuntime() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Targets explicitly flagged for split-reveal
    const targets = document.querySelectorAll<HTMLElement>("[data-split-reveal]");

    targets.forEach((el) => {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = "1";
      splitIntoWordSpans(el);
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const inners = el.querySelectorAll<HTMLElement>(".word-inner");
          inners.forEach((inner, i) => {
            inner.style.transitionDelay = `${i * 50}ms`;
            inner.classList.add("word-inner--visible");
          });
          obs.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   RIPPLE EFFECT — injects click-ripple on buttons
══════════════════════════════════════════════════════════════ */
export function RippleRuntime() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        ".button, .hero-social-btn, .nav-connect, .arsenal-chip, .project-arrow-btn"
      );
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height) * 2;
      const radius = diameter / 2;

      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.cssText = `
        width:${diameter}px; height:${diameter}px;
        left:${e.clientX - rect.left - radius}px;
        top:${e.clientY - rect.top - radius}px;
      `;

      target.querySelectorAll(".btn-ripple").forEach((r) => r.remove());
      target.style.position = target.style.position || "relative";
      target.style.overflow = "hidden";
      target.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   MICRO-INTERACTIONS ENGINE:
   • Card spotlight glow (tracks mouse per card)
   • Tilt-on-hover for project cards (3D gyroscope feel)
   • Social button bounce
   • Skill chip stagger bounce
══════════════════════════════════════════════════════════════ */
export function MicroInteractionRuntime() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* ── Cursor spotlight on glassmorphic cards ── */
    const glowTargets = document.querySelectorAll<HTMLElement>(
      ".project-card-new, .hero-float-card, .highlight-card, .arsenal-chip, .glass-navy, .achievement-strip-inner"
    );
    const glowCleanups = Array.from(glowTargets).map((el) => {
      el.classList.add("has-spotlight");
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - r.left}px`);
        el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      };
      el.addEventListener("mousemove", onMove);
      return () => el.removeEventListener("mousemove", onMove);
    });

    /* ── Tilt effect on project cards ── */
    const tiltEls = document.querySelectorAll<HTMLElement>(".project-card-new");
    const tiltCleanups = Array.from(tiltEls).map((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `
          perspective(900px)
          rotateY(${x * 6}deg)
          rotateX(${-y * 5}deg)
          translateY(-4px)
          scale(1.01)
        `;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    /* ── Social icon bounce on hover ── */
    const socials = document.querySelectorAll<HTMLElement>(".hero-social-btn");
    const socialCleanups = Array.from(socials).map((el, i) => {
      const onEnter = () => {
        el.style.animationDelay = `${i * 30}ms`;
        el.classList.add("social-bounce");
      };
      const onLeave = () => el.classList.remove("social-bounce");
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      glowCleanups.forEach((fn) => fn());
      tiltCleanups.forEach((fn) => fn());
      socialCleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   SECTION TRANSITION LINES — thin animated hr lines
   that draw horizontally when sections enter view
══════════════════════════════════════════════════════════════ */
export function SectionLineRuntime() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines = document.querySelectorAll<HTMLElement>(".section-draw-line");
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).classList.add("section-draw-line--active");
          o.unobserve(e.target);
        });
      },
      { threshold: 0.3 }
    );
    lines.forEach((l) => obs.observe(l));
    return () => obs.disconnect();
  }, []);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR — top edge of viewport
══════════════════════════════════════════════════════════════ */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      el.style.width = `${pct}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        raf = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MASTER ANIMATION RUNTIME — aggregates all sub-engines
══════════════════════════════════════════════════════════════ */
export function AnimationEngine() {
  return (
    <>
      <PageLoader />
      <ScrollProgressBar />
      <ParallaxEngine />
      <SplitRevealRuntime />
      <RippleRuntime />
      <MicroInteractionRuntime />
      <SectionLineRuntime />
    </>
  );
}
