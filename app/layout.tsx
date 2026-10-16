import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CommandPalette, CursorAura, EvidenceTracker, FloatingNav, ToastProvider } from "@/components/shell";
import { site } from "@/lib/site";
import { MotionRuntime } from "@/components/motion-runtime";

const fraunces = localFont({ src: "./fonts/fraunces-latin-600.woff2", variable: "--font-fraunces", display: "swap", preload: true, weight: "600" });
const uiSans = localFont({ src: [{ path: "./fonts/ui-sans-regular.ttf", weight: "400" }, { path: "./fonts/ui-sans-bold.ttf", weight: "600 900" }], variable: "--font-ui-local", display: "swap", preload: false });
const jetbrains = localFont({ src: [{ path: "./fonts/jetbrains-mono-regular.ttf", weight: "400" }, { path: "./fonts/jetbrains-mono-semibold.ttf", weight: "600" }], variable: "--font-jetbrains", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: site.title, description: site.description, url: "/", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/opengraph-image"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light dark", themeColor: "#F8F0E5" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = { "@context": "https://schema.org", "@type": "Person", name: "MR!JK!", jobTitle: "Cyber Security Student", description: site.description };
  return (
    <html lang="en" className={`${fraunces.variable} ${uiSans.variable} ${jetbrains.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ToastProvider>
          <MotionRuntime />
          <EvidenceTracker />
          <FloatingNav />
          <CommandPalette />
          <CursorAura />
          {children}
          <span hidden dangerouslySetInnerHTML={{__html:"<!-- Evidence 2/4: dispatch evidence-found:source. MRJK{HTML_COMMENTS_ARE_EVIDENCE} -->"}} />
        </ToastProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
