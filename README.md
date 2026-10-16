# MR!JK! — The Case File

An evidence-driven portfolio for Jaikiran E, built with Next.js, strict TypeScript, self-hosted fonts, GSAP/ScrollTrigger and Lenis.

## Setup

```bash
npm install
cp .env.example .env.local
npm run content:import
npm run dev
```

`npm run content:check` rejects forbidden production copy and an enabled contact form without transport. It runs automatically before builds. Other checks are `npm run typecheck`, `npm run lint`, `npm run test`, `npm run verify:contrast`, and `npx playwright test`.

## LinkedIn data

Do not scrape LinkedIn. Download the official data export and place any of these in `content/linkedin/`: `Profile.csv`, `Positions.csv`, `Education.csv`, `Skills.csv`, `Certifications.csv`, `Projects.csv`, `Honors.csv`, `Publications.csv`, `Courses.csv`, and `Volunteering.csv`. A profile “Save to PDF” file can be kept there as evidence. Run `npm run content:import`; the idempotent importer reports present/missing sources and writes `content/generated/linkedin.json`.

Optional sections stay hidden until real records exist. The canonical social URL is `https://www.linkedin.com/in/jaikiran-e-mr1jk1/`.

## Content and resume

Projects and hackathons live in `lib/content.ts`. Add links, results, failure notes or outcomes only when supportable. Retired CTF writeups may be added only after disclosure is permitted. The print-optimized `/resume` route uses the same source. Print it with browser backgrounds enabled and set the verified PDF URL as `NEXT_PUBLIC_RESUME_URL`.

## Environment

- `NEXT_PUBLIC_SITE_URL`: canonical origin.
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_RESUME_URL`: optional; corresponding UI is hidden when absent.
- `ENABLE_CONTACT_FORM=true`: enables contact only when all Resend settings are present.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: mail transport.
- `GITHUB_USERNAME`: optional live-signal source.
- `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`: unlinked protected media administration.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: signed uploads; there is no local fallback.

## Hidden CTF

Four harmless client-side evidence markers are hinted through the terminal, HTML source, `/.well-known/security.txt`, and the Konami sequence. Progress is stored locally. No challenge relies on a vulnerability or secret.

## Owner data still needed

LinkedIn export files, contact email, GitHub username/profile, verified project links, hackathon results, resume details/PDF, portrait, and Cloudinary credentials/assets. Missing data is hidden.
