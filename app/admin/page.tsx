import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminPanel } from "@/components/admin";
import { Footer } from "@/components/home";
import { Sparkle } from "@/components/sparkle";
import { verifySession } from "@/lib/security";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function AdminPage() { const authenticated = await verifySession((await cookies()).get("mrjki_session")?.value); return <main id="main"><header className="subpage-hero section--navy"><div className="container"><p className="section-kicker"><Sparkle /> Administration</p><h1 className="display">Publish with proof.</h1><p className="lede">A protected path for real Cloudinary media and future structured writeups.</p></div></header><section className="section"><div className="container admin-wrap"><AdminPanel authenticated={authenticated} /></div></section><Footer /></main>; }
