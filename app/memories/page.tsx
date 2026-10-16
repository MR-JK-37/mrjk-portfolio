import type { Metadata } from "next";
import { Footer } from "@/components/home";
import { MemoriesGallery } from "@/components/memories";
import { Sparkle } from "@/components/sparkle";
export const metadata: Metadata = { title: "Memories", description: "A Cloudinary-backed visual archive of builds, teams and moments.", alternates: { canonical: "/memories" } };
export default function MemoriesPage() { return <main id="main"><header className="subpage-hero section--navy"><div className="container"><p className="section-kicker"><Sparkle /> Memories</p><h1 className="display">The work between the milestones.</h1><p className="lede">Build tables, whiteboards, teammates and the small details worth keeping.</p></div></header><section className="section section--cream-deep"><div className="container"><MemoriesGallery /></div></section><Footer /></main>; }
