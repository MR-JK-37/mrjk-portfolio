"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "./icons";
import { memories } from "@/lib/content";
import { cloudinaryDeliveryUrl } from "@/lib/utils";

export function MemoriesGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => { if (selected === null) return; const key = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); if (event.key === "ArrowRight") setSelected((selected + 1) % memories.length); if (event.key === "ArrowLeft") setSelected((selected - 1 + memories.length) % memories.length); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [selected]);
  if (!memories.length) return null;
  return <><div className="masonry">{memories.map((memory,index) => <button className="memory-card glass" key={memory.src} onClick={() => setSelected(index)}><Image src={cloudinaryDeliveryUrl(memory.src)} alt={memory.alt} width={memory.width} height={memory.height} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /></button>)}</div>{selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Memory viewer"><button className="button button--icon lightbox-close" onClick={() => setSelected(null)} aria-label="Close viewer"><X /></button><Image src={cloudinaryDeliveryUrl(memories[selected].src, 1800)} alt={memories[selected].alt} width={memories[selected].width} height={memories[selected].height} priority /></div>}</>;
}
