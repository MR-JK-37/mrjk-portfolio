import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const SUBPAGES = [
  { path: "/projects/", title: "Projects" },
  { path: "/experience/", title: "Experience" },
  { path: "/security/", title: "Security" },
  { path: "/memories/", title: "Memories" },
  { path: "/resume/", title: "Resume" },
  { path: "/work/we-care/", title: "WE care" },
];

test.describe("Subpages Layout & Visual Integrity Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem("mrjk_loader_seen", "1");
      } catch {}
    });
  });

  for (const sp of SUBPAGES) {
    test(`${sp.path} renders with zero horizontal overflow across viewports`, async ({ page }) => {
      for (const width of [375, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(sp.path, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("#main");

        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(width + 1);
      }
    });
  }

  test("Resume page has functional print trigger and verified credentials", async ({ page }) => {
    await page.goto("/resume/", { waitUntil: "domcontentloaded" });
    const printBtn = page.locator(".print-button");
    await expect(printBtn).toBeVisible();
    await expect(printBtn).toHaveText(/Print \/ Save as PDF/);

    // Verify Glassdoor bounty and DRESTEIN honors are present
    await expect(page.getByText("Glassdoor Bug Bounty", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("DRESTEIN '26", { exact: false }).first()).toBeVisible();
  });

  test("Security threat model bento grid renders all 6 control dossiers", async ({ page }) => {
    await page.goto("/security/", { waitUntil: "domcontentloaded" });
    const controlCards = page.locator(".security-ctrl-card");
    await expect(controlCards).toHaveCount(6);
  });

  test("Subpages accessibility audit has 0 serious or critical violations", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const sp of ["/projects/", "/experience/", "/security/", "/resume/"]) {
      await page.goto(sp, { waitUntil: "domcontentloaded" });
      const results = await new AxeBuilder({ page }).analyze();
      const criticalViolations = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? "")
      );
      expect(criticalViolations).toEqual([]);
    }
  });
});
