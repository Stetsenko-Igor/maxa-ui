import { defineConfig, devices } from "@playwright/test"

/**
 * Visual regression tests against the statically-exported docs site.
 *
 * The static export only happens under GITHUB_PAGES=true (see next.config.ts),
 * so the flow is:
 *
 *   GITHUB_PAGES=true pnpm --filter @maxa/docs build   # writes out/
 *   pnpm --filter @maxa/docs test:visual               # serves out/ + compares
 *
 * PAGES_BASE_PATH must stay unset so the site is served from /.
 *
 * Baselines are Linux-generated (CI is the reference platform);
 * snapshotPathTemplate drops the platform suffix so darwin runs compare
 * against the same files. Refresh baselines with:
 *   pnpm --filter @maxa/docs test:visual:update   (run on Linux/CI)
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      // Component previews are static. A small absolute pixel budget absorbs
      // sub-pixel anti-aliasing noise but still fails on any real visual
      // change (a ratio-based budget silently swallowed a full button
      // recolor during gate testing — do not switch back to ratios).
      animations: "disabled",
      maxDiffPixels: 150,
    },
  },
  use: {
    baseURL: "http://127.0.0.1:4173",
    colorScheme: "light",
    viewport: { width: 1280, height: 900 },
    trace: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm exec http-server out -p 4173 -s -c-1",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
