import { defineConfig, devices } from "@playwright/test";
const baseURL=process.env.PLAYWRIGHT_BASE_URL??"http://127.0.0.1:3000";
export default defineConfig({ testDir: "./tests/e2e", outputDir: "test-results", use: { baseURL, trace: "retain-on-failure" }, webServer: process.env.PLAYWRIGHT_BASE_URL?undefined:{ command: "npm run start", url: baseURL, reuseExistingServer: true, timeout: 120_000 }, projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }] });
