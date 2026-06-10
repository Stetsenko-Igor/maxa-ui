import { existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Resolve the repository root.
 *
 * Order of precedence:
 * 1. `MAXA_REPO_ROOT` environment variable (explicit override)
 * 2. Three levels above this file (packages/mcp/{src|dist}/repo.* -> repo root)
 */
export function resolveRepoRoot(env: NodeJS.ProcessEnv = process.env): string {
  const override = env["MAXA_REPO_ROOT"]
  if (override && override.trim() !== "") {
    return resolve(override)
  }
  const here = dirname(fileURLToPath(import.meta.url))
  // here = <root>/packages/mcp/src (dev) or <root>/packages/mcp/dist (built)
  return resolve(here, "..", "..", "..")
}

/** Throw a readable error when the resolved root does not look like the MAXA repo. */
export function assertRepoRoot(root: string): void {
  const probe = resolve(root, "packages", "tokens", "src")
  if (!existsSync(probe)) {
    throw new Error(
      `MAXA repo root not found at "${root}" (expected packages/tokens/src). ` +
        `Set MAXA_REPO_ROOT to the repository root.`,
    )
  }
}
