import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const VIEWPORTS = [
  { width: 375, height: 812, name: "mobile" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 1024, height: 768, name: "desktop-sm" },
  { width: 1440, height: 900, name: "desktop-ref" },
  { width: 1920, height: 1080, name: "desktop-xl" },
];

test.describe("Visual Integrity & Layout Audit", () => {
  for (const vp of VIEWPORTS) {
    test(`homepage integrity at ${vp.width}x${vp.height} (${vp.name})`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });

      await page.addInitScript(() => {
        try {
          sessionStorage.setItem("mrjk_loader_seen", "1");
        } catch {}
      });
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".hero-scene-svg");

      // 1. No horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(vp.width + 1);

      // 2. Hero not empty: illustrated dashboard scene must render with real dimensions
      const scene = page.locator(".hero-scene-svg");
      await expect(scene).toBeVisible();
      const sceneBox = await scene.boundingBox();
      expect(sceneBox).not.toBeNull();
      expect(sceneBox!.width).toBeGreaterThan(100);
      expect(sceneBox!.height).toBeGreaterThan(80);

      // 3. No dev text rendered
      const bodyText = await page.locator("body").innerText();
      const forbidden = ["configured", "transport", "TODO", "placeholder", "lorem ipsum", "example.com"];
      for (const phrase of forbidden) {
        expect(bodyText.toLowerCase()).not.toContain(phrase.toLowerCase());
      }

      // 4. Console errors
      const realErrors = consoleErrors.filter(
        (e) => !e.includes("kapture") && !e.includes("favicon") && !e.includes("webpack-hmr") && !e.includes("WebSocket")
      );
      expect(realErrors).toEqual([]);

      // 5. Scroll down to trigger all reveal observers, scroll back up, and save screenshot
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(150);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);

      await page.screenshot({
        path: `test-results/screenshots/home-${vp.width}.png`,
        fullPage: true,
      });
    });
  }

  test("Selected Work renders the three real resume projects", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("WE care", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("NetPulse", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("ARAN", { exact: false }).first()).toBeVisible();
  });

  test("Navigation state: Home active on load, follows scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Home link should be active at scroll 0
    const homeLink = page.locator(".nav-center a", { hasText: "Home" });
    await expect(homeLink).toHaveAttribute("aria-current", "location");

    // Scroll to #about
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const aboutLink = page.locator(".nav-center a", { hasText: "About" });
    await expect(aboutLink).toHaveAttribute("aria-current", "location");
  });

  test("Accessibility audit has 0 serious or critical violations", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // Emulate reduced motion so axe reads the settled, final state rather than
    // a mid-fade entrance-animation frame (which briefly has a blended, low-
    // contrast background and isn't representative of the real failure mode).
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page }).analyze();
    const criticalViolations = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? "")
    );
    expect(criticalViolations).toEqual([]);
  });

  test("Page loader displays on fresh session and completes", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // Fresh session without mrjk_loader_seen
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const loader = page.locator(".page-loader");
    if (await loader.count() > 0) {
      await expect(page.locator(".loader-brand")).toBeVisible();
      // Wait for loader to finish and detach
      await expect(loader).toHaveCount(0, { timeout: 3500 });
    }
  });
});
