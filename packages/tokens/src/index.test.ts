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

// ── primitives.css — gray ──────────────────────────────────────────────────

describe("primitives.css — gray", () => {
  const css = readFileSync(join(src, "primitives.css"), "utf-8")

  it("defines gray-0 (white)", () => {
    expect(css).toContain("--color-gray-0:")
  })

  it("defines all 11 standard gray steps", () => {
    for (const step of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
      expect(css).toContain(`--color-gray-${step}:`)
    }
  })
})

// ── semantic.css — content + border ───────────────────────────────────────

describe("semantic.css — content + border", () => {
  const css = readFileSync(join(src, "semantic.css"), "utf-8")

  it("defines all 12 content tokens in :root", () => {
    for (const t of [
      "content-primary", "content-secondary", "content-tertiary",
      "content-placeholder", "content-disabled", "content-on-brand",
      "content-brand", "content-info", "content-success",
      "content-error", "content-warning", "content-neutral",
    ]) {
      expect(css).toContain(`--color-${t}:`)
    }
  })

  it("defines all 10 border tokens", () => {
    for (const t of [
      "border-default", "border-subtle", "border-focus",
      "border-brand-strong", "border-info-strong", "border-success-strong",
      "border-error-strong", "border-warning-strong",
      "border-neutral-strong", "border-neutral-subtle",
    ]) {
      expect(css).toContain(`--color-${t}:`)
    }
  })

  it("has dark mode section with content-primary override", () => {
    const darkIdx = css.indexOf('[data-theme="dark"]')
    expect(darkIdx).toBeGreaterThan(-1)
    expect(css.slice(darkIdx)).toContain("--color-content-primary:")
  })
})
