"use client";

import { useEffect } from "react";

/**
 * Tasteful, restrained motion layer. Everything here gates on
 * prefers-reduced-motion and degrades to the final static state with no JS.
 *
 * - .reveal elements fade+rise once when scrolled into view (shared observer).
 * - [data-count-to] numbers count up once when scrolled into view.
 * - .hero-magnetic buttons get a small cursor-attraction pull.
 * - .hero-scene-svg gets a subtle (<=8px) parallax on pointer move.
 * - .floating-nav gets glassmorphism class (.is-scrolled) after 80px.
 * - Sequential .reveal elements within a container get auto-stagger.
 */
export function MotionRuntime() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    if (reduceMotion) {
      // Skip entrance/scroll motion entirely; everything stays in its final state.
      document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
        el.textContent = el.dataset.countTo ?? el.textContent;
      });
      return;
    }

    root.classList.add("is-animated");

    // ── Nav glassmorphism on scroll ──────────────
    const nav = document.querySelector<HTMLElement>(".floating-nav");
    const handleNavScroll = () => {
      if (!nav) return;
      nav.classList.toggle("is-scrolled", window.scrollY > 80);
    };
    window.addEventListener("scroll", handleNavScroll, { passive: true });
    handleNavScroll();

    // ── Shared reveal-on-scroll observer ─────────
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const countEls  = Array.from(document.querySelectorAll<HTMLElement>("[data-count-to]"));

    // Auto-stagger: siblings in the same parent get incremental delay
    const staggered = new Set<HTMLElement>();
    revealEls.forEach((el) => {
      if (staggered.has(el)) return;
      const siblings = Array.from(el.parentElement?.querySelectorAll<HTMLElement>(".reveal") ?? []);
      if (siblings.length > 1) {
        siblings.forEach((sib, i) => {
          if (!sib.style.transitionDelay) {
            sib.style.transitionDelay = `${i * 75}ms`;
          }
          staggered.add(sib);
        });
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );
    countEls.forEach((el) => countObserver.observe(el));

    // ── Magnetic pull on hero CTA buttons ────────
    const magnets = Array.from(document.querySelectorAll<HTMLElement>(".hero-magnetic"));
    const magnetCleanups = magnets.map((el) => {
      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * 0.12}px, ${y * 0.22}px)`;
      };
      const onLeave = () => { el.style.transform = ""; };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    // ── Subtle parallax on hero illustration ─────
    const scene = document.querySelector<HTMLElement>(".hero-scene-svg");
    let sceneCleanup = () => {};
    if (scene) {
      const onMove = (e: PointerEvent) => {
        const rect = scene.getBoundingClientRect();
        const px = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const py = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        scene.style.transform = `translate(${px * 8}px, ${py * 8}px)`;
      };
      const onLeave = () => { scene.style.transform = ""; };
      const visualCol = scene.closest(".hero-visual-col") as HTMLElement | null;
      (visualCol ?? scene).addEventListener("pointermove", onMove);
      (visualCol ?? scene).addEventListener("pointerleave", onLeave);
      sceneCleanup = () => {
        (visualCol ?? scene).removeEventListener("pointermove", onMove);
        (visualCol ?? scene).removeEventListener("pointerleave", onLeave);
      };
    }

    // ── Float card subtle parallax depth ─────────
    const floatCards = document.querySelectorAll<HTMLElement>(".hero-float-card, .hero-float-pill, .hero-stat-badge");
    const heroSection = document.querySelector<HTMLElement>(".hero");
    let floatCleanup = () => {};
    if (heroSection && floatCards.length) {
      const onMove = (e: PointerEvent) => {
        const rect = heroSection.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        floatCards.forEach((card, i) => {
          const depth = 0.4 + i * 0.15;
          card.style.transform = `translate(${px * depth * 10}px, ${py * depth * 6}px)`;
        });
      };
      const onLeave = () => {
        floatCards.forEach((card) => { card.style.transform = ""; });
      };
      heroSection.addEventListener("pointermove", onMove, { passive: true });
      heroSection.addEventListener("pointerleave", onLeave);
      floatCleanup = () => {
        heroSection.removeEventListener("pointermove", onMove);
        heroSection.removeEventListener("pointerleave", onLeave);
      };
    }

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
      magnetCleanups.forEach((fn) => fn());
      sceneCleanup();
      floatCleanup();
      window.removeEventListener("scroll", handleNavScroll);
    };
  }, []);

  return null;
}

function animateCount(el: HTMLElement) {
  const raw = el.dataset.countTo ?? "";
  const match = raw.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) return;
  const [, prefix, digits, suffix] = match;
  const target = parseInt(digits.replace(/,/g, ""), 10);
  if (Number.isNaN(target)) return;

  const duration = 1200;
  const start = performance.now();

  function easeOutExpo(t: number) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function frame(now: number) {
    const t = Math.min(1, (now - start) / duration);
    const eased = easeOutExpo(t);
    const value = Math.round(target * eased);
    el.textContent = `${prefix}${value.toLocaleString("en-IN")}${suffix}`;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = raw;
  }
  requestAnimationFrame(frame);
}
