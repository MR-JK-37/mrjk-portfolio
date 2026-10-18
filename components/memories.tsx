"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight, Maximize2 } from "./icons";
import { memories } from "@/lib/content";

const MEMORY_METADATA = [
  {
    title: "Glassdoor Bug Bounty — $650 Reward Announcement",
    subtitle: "RMK College Technical Honors Board",
    category: "VULNERABILITY DISCLOSURE",
    date: "Sep 2026",
  },
  {
    title: "DRESTEIN '26 — ₹1,00,000 First Prize Award Ceremony",
    subtitle: "Saveetha Engineering College · Team of 4 ('WE care')",
    category: "NATIONAL HACKATHON",
    date: "Sep 2026",
  },
  {
    title: "National Hackathon Podium & Certificate of Excellence",
    subtitle: "Presented by University Leadership & Dignitaries",
    category: "CHAMPIONSHIP",
    date: "2026",
  },
  {
    title: "Symposium Technical Distinction & Stage Honors",
    subtitle: "College Felicitation & Academic Recognition",
    category: "ACADEMIC HONORS",
    date: "2026",
  },
];

export function MemoriesGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((selected + 1) % memories.length);
      if (event.key === "ArrowLeft") setSelected((selected - 1 + memories.length) % memories.length);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [selected]);

  if (!memories.length) return null;

  return (
    <div className="memories-container">
      {/* Memories Showcase Grid */}
      <div className="memories-grid-modern">
        {memories.map((memory, index) => {
          const meta = MEMORY_METADATA[index] || {
            title: "Achievement Milestone",
            subtitle: "Jaikiran E",
            category: "HONORS",
            date: "2026",
          };

          return (
            <div
              key={memory.src}
              className="memory-card-modern glass-navy"
              onClick={() => setSelected(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${meta.title}`}
            >
              <div className="memory-card-image-wrap">
                <Image
                  src={memory.src}
                  alt={memory.alt}
                  width={memory.width}
                  height={memory.height}
                  className="memory-card-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="memory-card-overlay">
                  <div className="memory-card-zoom-icon">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>

              <div className="memory-card-caption">
                <div className="memory-caption-top">
                  <span className="mono memory-category-pill">{meta.category}</span>
                  <span className="mono memory-date">{meta.date}</span>
                </div>
                <h3 className="memory-caption-title">{meta.title}</h3>
                <p className="memory-caption-sub">{meta.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selected !== null && (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution image viewer"
          onClick={() => setSelected(null)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-topbar">
              <div className="lightbox-info">
                <span className="mono lightbox-counter">
                  {selected + 1} / {memories.length}
                </span>
                <span className="lightbox-title">
                  {MEMORY_METADATA[selected]?.title ?? "Milestone Photo"}
                </span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setSelected(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="lightbox-main-view">
              <Image
                src={memories[selected].src}
                alt={memories[selected].alt}
                width={memories[selected].width}
                height={memories[selected].height}
                className="lightbox-main-img"
                priority
              />

              {/* Navigation arrows */}
              <button
                type="button"
                className="lightbox-nav-arrow left"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected((selected - 1 + memories.length) % memories.length);
                }}
                aria-label="Previous photo"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                type="button"
                className="lightbox-nav-arrow right"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected((selected + 1) % memories.length);
                }}
                aria-label="Next photo"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Thumbnail carousel strip */}
            <div className="lightbox-thumb-strip">
              {memories.map((m, idx) => (
                <button
                  type="button"
                  key={m.src}
                  className={`lightbox-thumb ${selected === idx ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(idx);
                  }}
                  aria-label={`Switch to photo ${idx + 1}`}
                >
                  <Image
                    src={m.src}
                    alt={`Thumbnail ${idx + 1}`}
                    width={80}
                    height={60}
                    className="lightbox-thumb-img"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
