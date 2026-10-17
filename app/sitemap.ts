import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { site } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const pages = ["", "/design-system", "/security", "/memories", ...projects.map(({ slug }) => `/work/${slug}`)]; return pages.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: path ? "monthly" : "weekly", priority: path ? .7 : 1 })); }
