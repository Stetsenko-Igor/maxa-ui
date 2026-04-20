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

// ── semantic.css — bg + action ─────────────────────────────────────────────

describe("semantic.css — bg + action", () => {
  const css = readFileSync(join(src, "semantic.css"), "utf-8")

  it("defines all background tokens", () => {
    for (const t of [
      "bg-default", "bg-surface-layer1", "bg-surface-layer2",
      "bg-neutral-subtle", "bg-neutral-on-subtle", "bg-neutral-strong",
      "bg-disabled", "bg-overlay", "bg-nav",
      "bg-brand-subtle", "bg-brand-surface",
      "bg-info-subtle", "bg-info-surface",
      "bg-success-subtle", "bg-success-surface", "bg-success-strong",
      "bg-error-subtle", "bg-error-surface", "bg-error-strong",
      "bg-warning-subtle", "bg-warning-surface", "bg-warning-strong",
    ]) {
      expect(css).toContain(`--color-${t}:`)
    }
  })

  it("defines all action tokens", () => {
    for (const t of [
      "action-primary-normal", "action-primary-hover", "action-primary-active",
      "action-success-normal", "action-success-hover",
      "action-error-normal", "action-error-hover",
      "action-outline-normal",
    ]) {
      expect(css).toContain(`--color-${t}:`)
    }
  })

  it("bg-nav uses hardcoded dark value", () => {
    expect(css).toContain("--color-bg-nav:")
    expect(css).toContain("#1b1a1a")
  })
})

// ── dimensions.css ─────────────────────────────────────────────────────────

describe("dimensions.css — spacing + radius + width", () => {
  const css = readFileSync(join(src, "dimensions.css"), "utf-8")

  it("defines spacing tokens 1-12 + larger", () => {
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
      expect(css).toContain(`--spacing-${n}:`)
    }
  })

  it("defines all 7 radius tokens", () => {
    for (const n of ["none", "sm", "md", "lg", "xl", "2xl", "full"]) {
      expect(css).toContain(`--radius-${n}:`)
    }
  })

  it("defines width tokens", () => {
    for (const n of [1, 2, 4]) {
      expect(css).toContain(`--width-${n}:`)
    }
  })

  it("defines font-sans and font-display", () => {
    expect(css).toContain("--font-sans:")
    expect(css).toContain("--font-display:")
    expect(css).toContain("--font-mono:")
  })
})

// ── tokens.ts — JS constants ───────────────────────────────────────────────

import { radius, spacing, fontFamily } from "./tokens"

describe("tokens.ts — radius", () => {
  it("exports correct values", () => {
    expect(radius.none).toBe("0px")
    expect(radius.sm).toBe("4px")
    expect(radius.md).toBe("8px")
    expect(radius.lg).toBe("12px")
    expect(radius.xl).toBe("16px")
    expect(radius["2xl"]).toBe("24px")
    expect(radius.full).toBe("9999px")
  })
})

describe("tokens.ts — spacing", () => {
  it("exports correct values", () => {
    expect(spacing[1]).toBe("4px")
    expect(spacing[4]).toBe("16px")
    expect(spacing[8]).toBe("32px")
    expect(spacing[12]).toBe("48px")
  })
})

describe("tokens.ts — fontFamily", () => {
  it("contains correct font names", () => {
    expect(fontFamily.sans).toContain("Montserrat")
    expect(fontFamily.display).toContain("Bebas Neue")
    expect(fontFamily.mono).toContain("monospace")
  })
})

// ── Runtime smoke — dark mode override ────────────────────────────────────
// Uses happy-dom environment (set in vitest.config.ts).
// Inlines the theme CSS manually since @import is not processed by happy-dom.
// Purpose: prove [data-theme="dark"] overrides actually change CSS variable values.

function injectCSS(content: string) {
  const style = document.createElement("style")
  style.textContent = content
  document.head.appendChild(style)
  return style
}

function readThemeCSS() {
  // Inline all @import sources since happy-dom doesn't resolve @imports
  const primitives = readFileSync(join(src, "primitives.css"), "utf-8")
  const maxa = readFileSync(join(src, "themes/maxa.css"), "utf-8")
  const semantic = readFileSync(join(src, "semantic.css"), "utf-8")
  const dimensions = readFileSync(join(src, "dimensions.css"), "utf-8")
  // Strip @import lines (already inlined above) and @theme wrappers
  // happy-dom doesn't process @theme — extract variable declarations directly
  const strip = (css: string) =>
    css
      .replace(/@import\s+["'][^"']+["'];/g, "")
      .replace(/@theme\s*\{/g, ":root {")
  return [primitives, maxa, semantic, dimensions].map(strip).join("\n")
}

describe("runtime — dark mode CSS variable override", () => {
  let styleEl: HTMLStyleElement

  beforeAll(() => {
    styleEl = injectCSS(readThemeCSS())
  })

  afterAll(() => {
    styleEl.remove()
    document.documentElement.removeAttribute("data-theme")
  })

  it("light mode: --color-bg-default is set", () => {
    document.documentElement.removeAttribute("data-theme")
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-default")
      .trim()
    expect(val).toBeTruthy()
    expect(val).not.toBe("")
  })

  it("dark mode: --color-bg-default differs from light mode", () => {
    document.documentElement.removeAttribute("data-theme")
    const light = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-default")
      .trim()

    document.documentElement.setAttribute("data-theme", "dark")
    const dark = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-default")
      .trim()

    expect(dark).toBeTruthy()
    expect(dark).not.toBe(light)
  })

  it("dark mode: --color-brand-50 differs from light mode (theme override)", () => {
    document.documentElement.removeAttribute("data-theme")
    const light = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-brand-50")
      .trim()

    document.documentElement.setAttribute("data-theme", "dark")
    const dark = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-brand-50")
      .trim()

    // Light: #E9FCF8 (pale teal)  Dark: #09483C (very dark teal)
    expect(dark).not.toBe(light)
  })

  it("dark mode: --color-content-primary differs from light mode", () => {
    document.documentElement.removeAttribute("data-theme")
    const light = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-content-primary")
      .trim()

    document.documentElement.setAttribute("data-theme", "dark")
    const dark = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-content-primary")
      .trim()

    expect(dark).not.toBe(light)
  })
})
