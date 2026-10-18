import { defineConfig, devices } from "@playwright/test";
const baseURL=process.env.PLAYWRIGHT_BASE_URL??"http://127.0.0.1:3000";
export default defineConfig({ testDir: "./tests", outputDir: "test-results", use: { baseURL, trace: "retain-on-failure" }, webServer: process.env.PLAYWRIGHT_BASE_URL?undefined:{ command: "npx serve out -p 3000", url: baseURL, reuseExistingServer: false, timeout: 120_000 }, projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }] });
