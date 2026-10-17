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

    // Shared reveal-on-scroll observer
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const countEls = Array.from(document.querySelectorAll<HTMLElement>("[data-count-to]"));

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
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

    // Magnetic pull on hero CTA buttons only
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

    // Subtle parallax on hero illustration
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

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
      magnetCleanups.forEach((fn) => fn());
      sceneCleanup();
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

  const duration = 800;
  const start = performance.now();

  function frame(now: number) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) * (1 - t);
    const value = Math.round(target * eased);
    el.textContent = `${prefix}${value.toLocaleString("en-IN")}${suffix}`;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = raw;
  }
  requestAnimationFrame(frame);
}
