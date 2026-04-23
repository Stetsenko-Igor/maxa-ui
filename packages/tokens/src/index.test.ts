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

  it("maps Typography to responsive Desktop, Tablet, and Mobile modes", () => {
    expect(manifest.collections.Typography?.modes.Desktop).toEqual(["typography.json"])
    expect(manifest.collections.Typography?.modes.Tablet).toEqual(["typography-tablet.json"])
    expect(manifest.collections.Typography?.modes.Mobile).toEqual(["typography-mobile.json"])
  })

  it("includes responsive Layout collection", () => {
    expect(manifest.collections.Layout?.modes.Desktop).toEqual(["layout-desktop.json"])
    expect(manifest.collections.Layout?.modes.Tablet).toEqual(["layout-tablet.json"])
    expect(manifest.collections.Layout?.modes.Mobile).toEqual(["layout-mobile.json"])
  })

  it("includes Component-based Tokens collection", () => {
    expect(manifest.collections["Component-based Tokens"]?.modes.Light).toEqual([
      "component-button-light.json",
    ])
    expect(manifest.collections["Component-based Tokens"]?.modes.Dark).toEqual([
      "component-button-dark.json",
    ])
  })

  it("includes unified Primitives collection", () => {
    expect(manifest.collections.Primitives?.modes.Value).toEqual(["primitives.json"])
  })

  it("uses Color modes collection naming", () => {
    expect(manifest.collections["Color modes"]?.modes.Light).toEqual(["colors-semantic-light.json"])
    expect(manifest.collections["Color modes"]?.modes.Dark).toEqual(["colors-semantic-dark.json"])
  })

  it("does not keep deprecated Containers collection", () => {
    expect(manifest.collections.Containers).toBeUndefined()
  })
})

describe("figma import bundle", () => {
  const bundle = JSON.parse(
    readFileSync(join(root, "figma/import-bundle.json"), "utf-8"),
  ) as {
    aliasDefaults: Record<string, string>
    collections: Record<string, { modes: Record<string, Record<string, number | string>> }>
  }

  it("maps Layout short spacing aliases to the Spacing collection", () => {
    expect(bundle.aliasDefaults.Layout).toBe("Spacing")
    expect(bundle.collections.Layout?.modes.Desktop?.["Stack/tight"]).toBe("{Spacing/spacing-xs}")
    expect(bundle.collections.Layout?.modes.Desktop?.["Container/padding"]).toBe("{Spacing/spacing-4xl}")
    expect(bundle.collections.Layout?.modes.Desktop?.["Grid/margin"]).toBe("{Container/padding}")
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
    expect(lightFile.text.primary?.$value).toBe("{Colors.Neutral.950}")
    expect(lightFile.text.secondary?.$value).toBe("{Colors.Neutral.800}")
    expect(lightFile.text.tertiary?.$value).toBe("{Colors.Neutral.600}")
    expect(lightFile.text["on-brand"]?.$value).toBe("{Colors.Neutral.950}")
    expect(lightFile.text.info?.$value).toBe("{Colors.Blue.600}")
    expect(lightFile.action["primary-subtle-hover"]?.$value).toBe("{Colors.Blue.50}")
    expect(lightFile.action["brand-subtle-hover"]?.$value).toBe("{Colors.Brand.50}")
    expect(darkFile.text.secondary?.$value).toBe("{Colors.Neutral.200}")
    expect(darkFile.text["on-brand"]?.$value).toBe("{Colors.Neutral.950}")
    expect(darkFile.text.brand?.$value).toBe("{Colors.Brand.400}")
    expect(darkFile.bg["brand-solid"]?.$value).toBe("{Colors.Brand.600}")
    expect(darkFile.bg.inverse?.$value).toBe("{Colors.Neutral.950}")
    expect(darkFile.border.focus?.$value).toBe("{Colors.Blue.400}")
    expect(darkFile.action.primary?.$value).toBe("{Colors.Blue.400}")
    expect(darkFile.action.brand?.$value).toBe("{Colors.Brand.600}")
    expect(darkFile.action["primary-subtle-hover"]?.$value).toBe("{Colors.Blue.950}")
    expect(darkFile.action["brand-subtle-active"]?.$value).toBe("{Colors.Brand.900}")
  })
})

describe("figma typography tokens", () => {
  const desktopTypographyFile = JSON.parse(
    readFileSync(join(root, "figma/typography.json"), "utf-8"),
  ) as Record<string, Record<string, { $value: number | string; $type: string }>>

  const tabletTypographyFile = JSON.parse(
    readFileSync(join(root, "figma/typography-tablet.json"), "utf-8"),
  ) as Record<string, Record<string, { $value: number | string; $type: string }>>

  const mobileTypographyFile = JSON.parse(
    readFileSync(join(root, "figma/typography-mobile.json"), "utf-8"),
  ) as Record<string, Record<string, { $value: number | string; $type: string }>>

  it("uses Untitled-style foundation groups", () => {
    expect(Object.keys(desktopTypographyFile)).toEqual([
      "Font family",
      "Font weight",
      "Font size",
      "Line height",
    ])
  })

  it("matches web font-family naming", () => {
    expect(Object.keys(desktopTypographyFile["Font family"] ?? {})).toEqual([
      "body",
      "mono",
    ])
  })

  it("uses Montserrat for all font family tokens", () => {
    for (const file of [desktopTypographyFile, tabletTypographyFile, mobileTypographyFile]) {
      expect(file["Font family"].body?.$value).toBe("Montserrat")
      expect(file["Font family"].mono?.$value).toBe("Bebas Neue")
    }
  })

  it("keeps the canonical desktop scale", () => {
    expect(desktopTypographyFile["Font size"]["heading-2xl"]?.$value).toBe(40)
    expect(desktopTypographyFile["Font size"]["text-md"]?.$value).toBe(14)
    expect(desktopTypographyFile["Font size"]["caption-sm"]?.$value).toBe(10)
    expect(desktopTypographyFile["Font size"]["caption-xs"]?.$value).toBe(8)
    expect(desktopTypographyFile["Line height"]["heading-2xl"]?.$value).toBe(48)
    expect(desktopTypographyFile["Line height"]["text-md"]?.$value).toBe(20)
  })

  it("adds a reduced tablet scale", () => {
    expect(tabletTypographyFile["Font size"]["heading-2xl"]?.$value).toBe(36)
    expect(tabletTypographyFile["Font size"]["heading-md"]?.$value).toBe(20)
    expect(tabletTypographyFile["Font size"]["text-lg"]?.$value).toBe(15)
    expect(tabletTypographyFile["Line height"]["heading-2xl"]?.$value).toBe(44)
    expect(tabletTypographyFile["Line height"]["text-lg"]?.$value).toBe(22)
  })

  it("adds a reduced mobile scale", () => {
    expect(mobileTypographyFile["Font size"]["heading-2xl"]?.$value).toBe(32)
    expect(mobileTypographyFile["Font size"]["heading-md"]?.$value).toBe(19)
    expect(mobileTypographyFile["Font size"]["text-md"]?.$value).toBe(13)
    expect(mobileTypographyFile["Line height"]["heading-2xl"]?.$value).toBe(40)
    expect(mobileTypographyFile["Line height"]["text-md"]?.$value).toBe(18)
  })
})

describe("figma layout tokens", () => {
  const desktopLayoutFile = JSON.parse(
    readFileSync(join(root, "figma/layout-desktop.json"), "utf-8"),
  ) as Record<string, { $value: number | string; $type: string; $description?: string }>

  const tabletLayoutFile = JSON.parse(
    readFileSync(join(root, "figma/layout-tablet.json"), "utf-8"),
  ) as Record<string, { $value: number | string; $type: string; $description?: string }>

  const mobileLayoutFile = JSON.parse(
    readFileSync(join(root, "figma/layout-mobile.json"), "utf-8"),
  ) as Record<string, { $value: number | string; $type: string; $description?: string }>

  it("defines shared stack and inline aliases across modes", () => {
    for (const file of [desktopLayoutFile, tabletLayoutFile, mobileLayoutFile]) {
      expect(file["Stack/tight"]?.$value).toBe("{spacing-xs}")
      expect(file["Stack/default"]?.$value).toBe("{spacing-xl}")
      expect(file["Stack/group"]?.$value).toBe("{spacing-3xl}")
      expect(file["Inline/default"]?.$value).toBe("{spacing-lg}")
    }
  })

  it("uses responsive values for section spacing and container padding", () => {
    expect(desktopLayoutFile["Stack/section"]?.$value).toBe("{spacing-8xl}")
    expect(tabletLayoutFile["Stack/section"]?.$value).toBe("{spacing-7xl}")
    expect(mobileLayoutFile["Stack/section"]?.$value).toBe("{spacing-6xl}")

    expect(desktopLayoutFile["Container/padding"]?.$value).toBe("{spacing-4xl}")
    expect(tabletLayoutFile["Container/padding"]?.$value).toBe("{spacing-3xl}")
    expect(mobileLayoutFile["Container/padding"]?.$value).toBe("{spacing-xl}")
  })

  it("defines responsive grid spacing tokens", () => {
    expect(desktopLayoutFile["Grid/gutter"]?.$value).toBe("{spacing-3xl}")
    expect(tabletLayoutFile["Grid/gutter"]?.$value).toBe("{spacing-2xl}")
    expect(mobileLayoutFile["Grid/gutter"]?.$value).toBe("{spacing-xl}")
    expect(desktopLayoutFile["Grid/margin"]?.$value).toBe("{Container/padding}")
  })

  it("documents layout token intent", () => {
    expect(desktopLayoutFile["Stack/default"]?.$description).toBe(
      "Default vertical gap for component internals. Alias: spacing-xl.",
    )
    expect(desktopLayoutFile["Stack/tight"]?.$description).toBe(
      "Dense vertical gap for tightly related elements. Alias: spacing-xs.",
    )
    expect(mobileLayoutFile["Container/padding"]?.$description).toBe(
      "Mobile horizontal container padding. Alias: spacing-xl.",
    )
    expect(desktopLayoutFile["Container/max-width"]?.$description).toBe(
      "Maximum container width.",
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
  type PrimitiveLeaf = { $value: number | string; $type: string; $description?: string }
  type PrimitiveGroup = Record<string, PrimitiveLeaf | PrimitiveGroup>

  const primitivesFile = JSON.parse(
    readFileSync(join(root, "figma/primitives.json"), "utf-8"),
  ) as PrimitiveGroup

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

describe("figma component-based button tokens", () => {
  type TokenLeaf = { $value: number | string; $type: string; $description?: string }
  type ButtonTokens = {
    Button: Record<string, Record<string, TokenLeaf | Record<string, TokenLeaf>>>
  }

  const lightFile = JSON.parse(
    readFileSync(join(root, "figma/component-button-light.json"), "utf-8"),
  ) as ButtonTokens

  const darkFile = JSON.parse(
    readFileSync(join(root, "figma/component-button-dark.json"), "utf-8"),
  ) as ButtonTokens

  it("keeps light and dark token names aligned", () => {
    expect(Object.keys(lightFile.Button)).toEqual(Object.keys(darkFile.Button))

    for (const key of Object.keys(lightFile.Button)) {
      expect(Object.keys(lightFile.Button[key] ?? {})).toEqual(Object.keys(darkFile.Button[key] ?? {}))
    }
  })

  it("defines approved Button variants", () => {
    expect(Object.keys(lightFile.Button)).toEqual([
      "primary",
      "secondary",
      "outline",
      "ghost",
      "link",
      "success",
      "danger",
      "disabled",
      "size",
      "icon-only",
    ])
  })

  it("aliases primary to action primary, not brand", () => {
    expect(lightFile.Button.primary.bg?.$value).toBe("{Color modes/action/primary}")
    expect(lightFile.Button.primary["bg-hover"]?.$value).toBe("{Color modes/action/primary-hover}")
    expect(lightFile.Button.primary["bg-active"]?.$value).toBe("{Color modes/action/primary-active}")
    expect(lightFile.Button.primary.text?.$value).toBe("{Color modes/text/inverse}")
  })

  it("defines success and danger from positive and negative actions", () => {
    expect(lightFile.Button.success.bg?.$value).toBe("{Color modes/action/positive}")
    expect(lightFile.Button.success["bg-hover"]?.$value).toBe("{Color modes/action/positive-hover}")
    expect(lightFile.Button.danger.bg?.$value).toBe("{Color modes/action/negative}")
    expect(lightFile.Button.danger["bg-hover"]?.$value).toBe("{Color modes/action/negative-hover}")
  })

  it("uses one disabled opacity token for Button", () => {
    const lightDisabled = lightFile.Button.disabled as Record<string, TokenLeaf>
    const darkDisabled = darkFile.Button.disabled as Record<string, TokenLeaf>

    expect(lightDisabled.opacity?.$value).toBe(50)
    expect(darkDisabled.opacity?.$value).toBe(50)

    for (const variant of ["primary", "secondary", "outline", "ghost", "link", "success", "danger"]) {
      const tokens = lightFile.Button[variant] as Record<string, TokenLeaf>
      expect(tokens["bg-disabled"]).toBeUndefined()
      expect(tokens["text-disabled"]).toBeUndefined()
      expect(tokens["border-disabled"]).toBeUndefined()
    }
  })

  it("keeps link transparent and action-colored", () => {
    expect(lightFile.Button.link.bg?.$value).toBe("{Primitives/Colors/Base/Transparent}")
    expect(lightFile.Button.link["bg-hover"]?.$value).toBe("{Primitives/Colors/Base/Transparent}")
    expect(lightFile.Button.link.text?.$value).toBe("{Color modes/action/primary}")
    expect(lightFile.Button.link["text-hover"]?.$value).toBe("{Color modes/action/primary-hover}")
  })

  it("defines size, typography, icon-size, and icon-only tokens", () => {
    const size = lightFile.Button.size as Record<string, Record<string, TokenLeaf>>
    const iconOnly = lightFile.Button["icon-only"] as Record<string, Record<string, TokenLeaf>>

    expect(size.sm.height?.$value).toBe(32)
    expect(size.sm["padding-x"]?.$value).toBe("{Spacing/spacing-lg}")
    expect(size.sm.text?.$value).toBe("{Typography/Font size/text-sm}")
    expect(size.sm["line-height"]?.$value).toBe("{Typography/Line height/text-sm}")
    expect(size.sm.weight?.$value).toBe("{Typography/Font weight/semibold}")
    expect(size.sm["icon-size"]?.$value).toBe(16)

    expect(size.md.height?.$value).toBe(40)
    expect(size.md["padding-x"]?.$value).toBe("{Spacing/spacing-xl}")
    expect(size.md["icon-size"]?.$value).toBe(20)

    expect(size.lg.height?.$value).toBe(48)
    expect(size.lg.radius?.$value).toBe("{Radius/radius-lg}")
    expect(size.lg["icon-size"]?.$value).toBe(20)

    expect(iconOnly.sm.size?.$value).toBe(32)
    expect(iconOnly.md.size?.$value).toBe(40)
    expect(iconOnly.lg.size?.$value).toBe(48)
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
