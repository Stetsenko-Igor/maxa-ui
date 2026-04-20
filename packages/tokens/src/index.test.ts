import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const src = join(import.meta.dirname, ".")

// ── theme.css ──────────────────────────────────────────────────────────────

describe("theme.css", () => {
  const css = readFileSync(join(src, "theme.css"), "utf-8")

  it("imports primitives", () => {
    expect(css).toContain('@import "./primitives.css"')
  })

  it("imports maxa theme", () => {
    expect(css).toContain('@import "./themes/maxa.css"')
  })

  it("imports semantic", () => {
    expect(css).toContain('@import "./semantic.css"')
  })

  it("imports dimensions", () => {
    expect(css).toContain('@import "./dimensions.css"')
  })
})
