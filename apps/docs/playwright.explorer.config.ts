import { defineConfig } from "@playwright/test"
import base from "./playwright.config"
const { webServer, ...shared } = base
export default defineConfig({
  ...shared,
  testMatch: "color-explorer.spec.ts",
  use: { ...base.use, ...(process.env.EXPLORER_DEV ? { baseURL: "http://127.0.0.1:3000" } : {}) },
  ...(!process.env.EXPLORER_DEV && webServer ? { webServer } : {}),
})
