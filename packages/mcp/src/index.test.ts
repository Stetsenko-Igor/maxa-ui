import { existsSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

import { createServer, resolveRepoRoot, version } from "./index"

describe("mcp", () => {
  it("exports version", () => {
    expect(version).toBe("1.0.0")
  })

  it("resolves the repo root relative to the package", () => {
    const root = resolveRepoRoot({})
    expect(existsSync(join(root, "packages/mcp/package.json"))).toBe(true)
    expect(existsSync(join(root, "specs"))).toBe(true)
  })

  it("honors the MAXA_REPO_ROOT override", () => {
    const root = resolveRepoRoot({ MAXA_REPO_ROOT: "/tmp/some-root" })
    expect(root).toBe("/tmp/some-root")
  })

  it("creates the server without connecting a transport", () => {
    const server = createServer()
    expect(server).toBeDefined()
  })

  it("throws a readable error for an invalid repo root", () => {
    expect(() => createServer("/tmp/definitely-not-the-repo")).toThrow(/MAXA repo root not found/)
  })
})
