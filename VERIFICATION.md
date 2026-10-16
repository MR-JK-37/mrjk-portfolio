# Verification evidence

Run date: 2026-10-16 (Asia/Kolkata). Claims below distinguish direct verification from work blocked by credentials or local tooling.

## Passed

- `npm run build`: PASS. Next.js 16.2.10 compiled, type-checked and generated 21 outputs with no warnings. The prior Open Graph dynamic-font warning was removed.
- `npm run content:check`: PASS and wired to `prebuild`.
- `npm run lint`: PASS with zero warnings.
- `npm run test`: PASS security helper assertions.
- `npm run verify:contrast`: PASS; token ratios range from 7.06:1 to 15.87:1.
- Static Chromium screenshots: 375, 768, 1280 and 1920 px for home, design system, security, resume and all five case files. Files are under `docs/evidence/screenshots/`.
- Preference captures: reduced motion, reduced transparency, increased contrast and forced colors.
- axe-core: zero serious/critical findings on design system, security, resume and all five case routes. The initial home pass found a non-focusable horizontal timeline; it was fixed with keyboard focus and a focused post-build axe run returned `[]`.
- The first axe pass also found low contrast on the case-page status stamp; switching it to cream on navy cleared all five case routes.
- Source/render gate: no forbidden production-copy terms in `app`, `components`, `lib`, or `content`; the build-time gate covers all generated static routes.

## Browser behavior covered in source

- Terminal commands, history, arrow navigation, tab completion, mobile command chips and a visible skip link.
- Command palette open/close, focus loop and Escape handling.
- GSAP/ScrollTrigger and Lenis use the required ticker synchronization, refresh after fonts, and clean up on route changes.
- Reduced-motion/coarse-pointer users do not initialize Lenis or GSAP scenes.
- Horizontal timeline and terminal log are keyboard-focusable; native controls retain visible focus styles.

## Not verified

- Lighthouse scores, INP/LCP/CLS and frame-time profiling were not measured. The local `@playwright/test` package is absent despite being declared, so hydrated Playwright tests could not run; static Chromium plus axe was used instead.
- The downloadable binary resume PDF was not generated. `/resume` is print optimized and shares the content source; a final PDF requires owner resume details and a browser print/build environment.
- GitHub live signals are hidden because no username is configured.
- Contact delivery is hidden because mail transport is not configured.
- Cloudinary upload proof is blocked until real credentials and an owner asset are supplied. The signed endpoint still has no local-disk fallback.
- Dependency audit requires a lockfile; this checkout did not include one.
- LinkedIn-derived sections remain hidden until official export files are placed in `content/linkedin/` and imported.

## Owner data needed

LinkedIn export, contact email, GitHub username/profile, verified project links, hackathon results, resume details/PDF, portrait, and Cloudinary credentials/assets.
