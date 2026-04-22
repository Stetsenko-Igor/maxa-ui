import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const src = join(import.meta.dirname, ".")
const root = join(src, "..")

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

  it("imports typography", () => {
    expect(css).toContain('@import "./typography.css"')
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

  it("defines the full radius scale", () => {
    for (const n of ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"]) {
      expect(css).toContain(`--radius-${n}:`)
    }
  })

  it("defines width tokens", () => {
    for (const n of [1, 2, 4]) {
      expect(css).toContain(`--width-${n}:`)
    }
  })

})

// ── figma tokens ───────────────────────────────────────────────────────────

describe("figma manifest", () => {
  const manifest = JSON.parse(readFileSync(join(root, "figma/manifest.json"), "utf-8")) as {
    collections: Record<string, { modes: Record<string, string[]> }>
  }

  it("includes Radius collection", () => {
    expect(manifest.collections.Radius?.modes.Value).toEqual(["radius.json"])
  })

  it("maps Typography to a single Value mode", () => {
    expect(manifest.collections.Typography?.modes.Value).toEqual(["typography.json"])
  })

  it("includes Containers collection", () => {
    expect(manifest.collections.Containers?.modes.Value).toEqual(["containers.json"])
  })

  it("includes unified Primitives collection", () => {
    expect(manifest.collections.Primitives?.modes.Value).toEqual(["primitives.json"])
  })

  it("uses Color modes collection naming", () => {
    expect(manifest.collections["Color modes"]?.modes.Light).toEqual(["colors-semantic-light.json"])
    expect(manifest.collections["Color modes"]?.modes.Dark).toEqual(["colors-semantic-dark.json"])
  })

  it("does not keep deprecated Layout collection", () => {
    expect(manifest.collections.Layout).toBeUndefined()
  })
})

describe("figma radius tokens", () => {
  const radiusFile = JSON.parse(
    readFileSync(join(root, "figma/radius.json"), "utf-8"),
  ) as Record<string, { $value: number; $type: string }>

  it("defines the full radius scale", () => {
    for (const token of [
      "radius-none",
      "radius-xxs",
      "radius-xs",
      "radius-sm",
      "radius-md",
      "radius-lg",
      "radius-xl",
      "radius-2xl",
      "radius-3xl",
      "radius-4xl",
      "radius-full",
    ]) {
      expect(radiusFile[token]).toBeDefined()
    }
  })
})

describe("figma breakpoint tokens", () => {
  const breakpointsFile = JSON.parse(
    readFileSync(join(root, "figma/breakpoints.json"), "utf-8"),
  ) as Record<string, { $value: number; $type: string; $description?: string }>

  it("uses semantic breakpoint names", () => {
    expect(Object.keys(breakpointsFile)).toEqual([
      "mobile",
      "tablet",
      "laptop",
      "desktop",
      "wide",
      "ultra",
      "max",
    ])
  })

  it("keeps scale aliases in descriptions", () => {
    expect(breakpointsFile.mobile?.$description).toBe("Legacy alias: xs.")
    expect(breakpointsFile.tablet?.$description).toBe("Legacy alias: sm.")
    expect(breakpointsFile.laptop?.$description).toBe("Legacy alias: md.")
    expect(breakpointsFile.desktop?.$description).toBe("Legacy alias: lg.")
    expect(breakpointsFile.wide?.$description).toBe("Legacy alias: xl.")
    expect(breakpointsFile.ultra?.$description).toBe("Legacy alias: 2xl.")
    expect(breakpointsFile.max?.$description).toBe("Legacy alias: 3xl.")
  })
})

describe("figma color modes", () => {
  const lightFile = JSON.parse(
    readFileSync(join(root, "figma/colors-semantic-light.json"), "utf-8"),
  ) as Record<string, Record<string, { $value: string; $type: string }>>

  const darkFile = JSON.parse(
    readFileSync(join(root, "figma/colors-semantic-dark.json"), "utf-8"),
  ) as Record<string, Record<string, { $value: string; $type: string }>>

  it("keeps light and dark semantic groups aligned", () => {
    expect(Object.keys(lightFile)).toEqual(Object.keys(darkFile))
    expect(Object.keys(lightFile.text)).toEqual(Object.keys(darkFile.text))
    expect(Object.keys(lightFile.bg)).toEqual(Object.keys(darkFile.bg))
    expect(Object.keys(lightFile.border)).toEqual(Object.keys(darkFile.border))
    expect(Object.keys(lightFile.action)).toEqual(Object.keys(darkFile.action))
  })

  it("matches agreed semantic values for key tokens", () => {
    expect(lightFile.text.info?.$value).toBe("{Colors.Blue.600}")
    expect(lightFile.action["primary-subtle-hover"]?.$value).toBe("{Colors.Blue.50}")
    expect(lightFile.action["brand-subtle-hover"]?.$value).toBe("{Colors.Brand.50}")
    expect(darkFile.text.secondary?.$value).toBe("{Colors.Neutral.400}")
    expect(darkFile.text.brand?.$value).toBe("{Colors.Brand.400}")
    expect(darkFile.bg.inverse?.$value).toBe("{Colors.Neutral.950}")
    expect(darkFile.border.focus?.$value).toBe("{Colors.Blue.400}")
    expect(darkFile.action.primary?.$value).toBe("{Colors.Blue.400}")
    expect(darkFile.action["primary-subtle-hover"]?.$value).toBe("{Colors.Blue.950}")
    expect(darkFile.action["brand-subtle-active"]?.$value).toBe("{Colors.Brand.900}")
  })
})

describe("figma typography tokens", () => {
  const typographyFile = JSON.parse(
    readFileSync(join(root, "figma/typography.json"), "utf-8"),
  ) as Record<string, Record<string, { $value: number | string; $type: string }>>

  it("uses Untitled-style foundation groups", () => {
    expect(Object.keys(typographyFile)).toEqual([
      "Font family",
      "Font weight",
      "Font size",
      "Line height",
    ])
  })

  it("matches web font-family naming", () => {
    expect(Object.keys(typographyFile["Font family"] ?? {})).toEqual([
      "body",
      "mono",
    ])
  })

  it("uses Montserrat for all font family tokens", () => {
    expect(typographyFile["Font family"].body?.$value).toBe("Montserrat")
    expect(typographyFile["Font family"].mono?.$value).toBe("Bebas Neue")
  })

  it("keeps the canonical size and line-height scale", () => {
    expect(typographyFile["Font size"]["heading-2xl"]?.$value).toBe(40)
    expect(typographyFile["Font size"]["text-md"]?.$value).toBe(14)
    expect(typographyFile["Font size"]["caption-sm"]?.$value).toBe(10)
    expect(typographyFile["Font size"]["caption-xs"]?.$value).toBe(8)
    expect(typographyFile["Line height"]["heading-2xl"]?.$value).toBe(48)
    expect(typographyFile["Line height"]["text-md"]?.$value).toBe(20)
  })
})

describe("figma container tokens", () => {
  const containersFile = JSON.parse(
    readFileSync(join(root, "figma/containers.json"), "utf-8"),
  ) as Record<string, { $value: number | string; $type: string; $description?: string }>

  it("defines container paddings for mobile, tablet, and desktop", () => {
    expect(containersFile["container-padding-mobile"]?.$value).toBe("{spacing-xl}")
    expect(containersFile["container-padding-tablet"]?.$value).toBe("{spacing-3xl}")
    expect(containersFile["container-padding-desktop"]?.$value).toBe("{spacing-4xl}")
  })

  it("defines desktop max width", () => {
    expect(containersFile["container-max-width-desktop"]?.$value).toBe(1568)
  })

  it("documents container token usage", () => {
    expect(containersFile["container-padding-mobile"]?.$description).toBe(
      "Horizontal container padding for mobile. Alias: spacing-xl.",
    )
    expect(containersFile["container-max-width-desktop"]?.$description).toBe(
      "Maximum desktop container width.",
    )
  })
})

describe("figma spacing tokens", () => {
  const spacingFile = JSON.parse(
    readFileSync(join(root, "figma/spacing.json"), "utf-8"),
  ) as Record<string, { $value: string; $type: string; $description?: string }>

  it("aliases semantic spacing tokens to primitives", () => {
    expect(spacingFile["spacing-none"]?.$value).toBe("{Primitives/Spacing/0 (0px)}")
    expect(spacingFile["spacing-xl"]?.$value).toBe("{Primitives/Spacing/4 (16px)}")
    expect(spacingFile["spacing-4xl"]?.$value).toBe("{Primitives/Spacing/8 (32px)}")
  })

  it("documents spacing token intent", () => {
    expect(spacingFile["spacing-none"]?.$description).toBe("Alias: Spacing/0 (0px). No spacing.")
    expect(spacingFile["spacing-xl"]?.$description).toBe(
      "Alias: Spacing/4 (16px). Standard mobile padding and common UI gap.",
    )
    expect(spacingFile["spacing-4xl"]?.$description).toBe(
      "Alias: Spacing/8 (32px). Desktop container padding and large component gap.",
    )
  })
})

describe("figma spacing primitive tokens", () => {
  const primitivesFile = JSON.parse(
    readFileSync(join(root, "figma/primitives.json"), "utf-8"),
  ) as Record<string, any>

  it("includes color and spacing primitives in one file", () => {
    expect(primitivesFile.Colors).toBeDefined()
    expect(primitivesFile.Colors.Brand).toBeDefined()
    expect(primitivesFile.Spacing).toBeDefined()
    expect(primitivesFile.Spacing["0 (0px)"]?.$value).toBe(0)
    expect(primitivesFile.Spacing["0․5 (2px)"]?.$value).toBe(2)
    expect(primitivesFile.Spacing["4 (16px)"]?.$value).toBe(16)
    expect(primitivesFile.Spacing["40 (160px)"]?.$value).toBe(160)
  })

  it("adds readable spacing labels to primitive tokens", () => {
    expect(primitivesFile.Spacing["4 (16px)"]?.$description).toBe("Primitive spacing step 4 (16px).")
  })
})

// ── typography.css ─────────────────────────────────────────────────────────

describe("typography.css — font families", () => {
  const css = readFileSync(join(src, "typography.css"), "utf-8")

  it("defines font-body and font-mono", () => {
    expect(css).toContain("--font-body:")
    expect(css).toContain("--font-mono:")
    expect(css).toContain('"Montserrat", ui-sans-serif, system-ui, sans-serif')
    expect(css).toContain('"Bebas Neue", ui-sans-serif, sans-serif')
  })
})

describe("typography.css — font sizes + line-heights", () => {
  const css = readFileSync(join(src, "typography.css"), "utf-8")

  it("defines heading, text, and caption tokens with line-height pairs", () => {
    for (const n of [
      "heading-2xl",
      "heading-xl",
      "heading-lg",
      "heading-md",
      "heading-sm",
      "heading-xs",
      "lg",
      "md",
      "sm",
      "caption-sm",
      "caption-xs",
    ]) {
      expect(css).toContain(`--text-${n}:`)
      expect(css).toContain(`--text-${n}--line-height:`)
    }
  })
})

describe("typography.css — font weights", () => {
  const css = readFileSync(join(src, "typography.css"), "utf-8")

  it("defines all 4 font-weight tokens", () => {
    for (const n of ["regular", "medium", "semibold", "bold"]) {
      expect(css).toContain(`--font-weight-${n}:`)
    }
  })
})

// ── tokens.ts — JS constants ───────────────────────────────────────────────

import { radius, spacing, fontFamily, fontSize, fontWeight } from "./tokens"

describe("tokens.ts — radius", () => {
  it("exports correct values", () => {
    expect(radius.none).toBe("0px")
    expect(radius.xxs).toBe("2px")
    expect(radius.xs).toBe("4px")
    expect(radius.sm).toBe("6px")
    expect(radius.md).toBe("8px")
    expect(radius.lg).toBe("10px")
    expect(radius.xl).toBe("12px")
    expect(radius["2xl"]).toBe("16px")
    expect(radius["3xl"]).toBe("20px")
    expect(radius["4xl"]).toBe("24px")
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
    expect(fontFamily.body).toContain("Montserrat")
    expect(fontFamily.mono).toContain("Bebas Neue")
  })
})

describe("tokens.ts — fontSize", () => {
  it("exports correct values", () => {
    expect(fontSize["heading-2xl"]).toBe("40px")
    expect(fontSize["heading-xl"]).toBe("32px")
    expect(fontSize["text-lg"]).toBe("16px")
    expect(fontSize["text-md"]).toBe("14px")
    expect(fontSize["text-sm"]).toBe("12px")
    expect(fontSize["caption-sm"]).toBe("10px")
    expect(fontSize["caption-xs"]).toBe("8px")
  })
})

describe("tokens.ts — fontWeight", () => {
  it("exports correct values", () => {
    expect(fontWeight.regular).toBe(400)
    expect(fontWeight.medium).toBe(500)
    expect(fontWeight.semibold).toBe(600)
    expect(fontWeight.bold).toBe(700)
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
  const typography = readFileSync(join(src, "typography.css"), "utf-8")
  // Strip @import lines (already inlined above) and @theme wrappers
  // happy-dom doesn't process @theme — extract variable declarations directly
  const strip = (css: string) =>
    css
      .replace(/@import\s+["'][^"']+["'];/g, "")
      .replace(/@theme\s*\{/g, ":root {")
  return [primitives, maxa, semantic, dimensions, typography].map(strip).join("\n")
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
