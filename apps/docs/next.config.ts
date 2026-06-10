import type { NextConfig } from "next"
import { PHASE_DEVELOPMENT_SERVER } from "next/constants"

const config: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
}

// GITHUB_PAGES=true switches to a static export served from /<repo-name>/
const githubPages: NextConfig = process.env.GITHUB_PAGES
  ? {
      output: "export",
      basePath: process.env.PAGES_BASE_PATH ?? "",
      images: { unoptimized: true },
    }
  : {}

export default function nextConfig(phase: string): NextConfig {
  return {
    ...config,
    ...githubPages,
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  }
}
