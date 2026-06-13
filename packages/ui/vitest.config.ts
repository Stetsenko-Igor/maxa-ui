import { configDefaults, defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "dist/**"],
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    // Headroom for interaction tests (userEvent + fake timers). The @maxa/icons
    // barrel re-exports the full Phosphor set, which inflates module import time
    // under parallel turbo runs and can tip 5s-default interaction tests over.
    testTimeout: 15000,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.tsx",
        "src/test-setup.ts",
        "src/**/index.ts",
        "dist/**",
      ],
      // Thresholds are a regression floor, not a target. Set ~5pts below the
      // measured 2026-06-05 baseline (stmts 86.7, branches 81.2, funcs 87.1,
      // lines 90.7). Raise as coverage grows; never lower silently.
      thresholds: {
        statements: 81,
        branches: 76,
        functions: 82,
        lines: 85,
      },
    },
  },
})
