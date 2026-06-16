import type { NextConfig } from "next"
import { PHASE_DEVELOPMENT_SERVER } from "next/constants"
import path from "node:path"
import { fileURLToPath } from "node:url"

const docsDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(docsDir, "../..")

const workspaceSourceAliases = {
  "@maxa/hooks": path.join(repoRoot, "packages/hooks/src/index.ts"),
  "@maxa/icons": path.join(repoRoot, "packages/icons/src/index.ts"),
  "@maxa/tokens": path.join(repoRoot, "packages/tokens/src/index.ts"),
  "@maxa/tokens/theme.css": path.join(repoRoot, "packages/tokens/src/theme.css"),
  "@maxa/ui": path.join(repoRoot, "packages/ui/src/index.ts"),
}

const config: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  webpack(config, { dev }) {
    if (dev) {
      config.resolve ??= {}
      config.resolve.extensionAlias = {
        ...config.resolve.extensionAlias,
        ".js": [".ts", ".tsx", ".js"],
        ".jsx": [".tsx", ".jsx"],
      }
      config.resolve.alias = {
        ...config.resolve.alias,
        "@maxa/hooks$": workspaceSourceAliases["@maxa/hooks"],
        "@maxa/icons$": workspaceSourceAliases["@maxa/icons"],
        "@maxa/tokens$": workspaceSourceAliases["@maxa/tokens"],
        "@maxa/tokens/theme.css$": workspaceSourceAliases["@maxa/tokens/theme.css"],
        "@maxa/ui$": workspaceSourceAliases["@maxa/ui"],
      }
    }

    return config
  },
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
