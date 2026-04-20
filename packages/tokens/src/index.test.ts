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

  it("imports in correct order: primitives → maxa → semantic → dimensions", () => {
    const primIdx = css.indexOf('@import "./primitives.css"')
    const maxaIdx = css.indexOf('@import "./themes/maxa.css"')
    const semIdx  = css.indexOf('@import "./semantic.css"')
    const dimIdx  = css.indexOf('@import "./dimensions.css"')
    expect(primIdx).toBeLessThan(maxaIdx)
    expect(maxaIdx).toBeLessThan(semIdx)
    expect(semIdx).toBeLessThan(dimIdx)
  })
})

// ── themes/maxa.css — brand ────────────────────────────────────────────────

describe("themes/maxa.css — brand", () => {
  const css = readFileSync(join(src, "themes/maxa.css"), "utf-8")

  it("defines all 11 brand steps", () => {
    for (const step of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
      expect(css).toContain(`--color-brand-${step}:`)
    }
  })

  it("brand-600 is teal hinge #31E5C2", () => {
    expect(css.toLowerCase()).toContain("#31e5c2")
  })
})

describe("themes/maxa.css — dark brand override", () => {
  const css = readFileSync(join(src, "themes/maxa.css"), "utf-8")

  it("has [data-theme='dark'] block with dark brand scale", () => {
    expect(css).toContain('[data-theme="dark"]')
    expect(css.toLowerCase()).toContain("#09483c")
  })
})
