import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const src = join(import.meta.dirname, ".")
const root = join(src, "..")

function cssVariable(css: string, name: string): string | undefined {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return css.match(new RegExp(`--${escapedName}\\s*:\\s*([^;]+);`))?.[1]?.trim()
}

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

  it("imports shadows", () => {
    expect(css).toContain('@import "./shadows.css"')
  })

  it("imports popover component tokens", () => {
    expect(css).toContain('@import "./component-popover.css"')
  })

  it("imports avatar component tokens", () => {
    expect(css).toContain('@import "./component-avatar.css"')
  })

  it("imports and defines the fixed white MaxaLogo color", () => {
    expect(css).toContain('@import "./component-maxa-logo.css"')

    const logoCss = readFileSync(join(src, "component-maxa-logo.css"), "utf-8")
    expect(logoCss).toContain("--maxa-logo-color: var(--color-base-white);")
    expect(logoCss).not.toContain("--maxa-logo-color-dark")
    expect(logoCss).not.toContain("--maxa-logo-color-light")
  })

  it("imports dropdown menu component tokens", () => {
    expect(css).toContain('@import "./component-dropdown-menu.css"')
  })

  it("imports bulk parity component tokens", () => {
    for (const component of [
      "spinner",
      "skeleton",
      "progress",
      "slider",
      "tabs",
      "segmented-control",
      "breadcrumb",
      "pagination",
      "empty",
    ]) {
      expect(css).toContain(`@import "./component-${component}.css"`)
    }
  })

  it("imports in correct order: primitives → maxa → semantic → dimensions → shadows", () => {
    const primIdx = css.indexOf('@import "./primitives.css"')
    const maxaIdx = css.indexOf('@import "./themes/maxa.css"')
    const semIdx = css.indexOf('@import "./semantic.css"')
    const dimIdx = css.indexOf('@import "./dimensions.css"')
    const shadowIdx = css.indexOf('@import "./shadows.css"')
    expect(primIdx).toBeLessThan(maxaIdx)
    expect(maxaIdx).toBeLessThan(semIdx)
    expect(semIdx).toBeLessThan(dimIdx)
    expect(dimIdx).toBeLessThan(shadowIdx)
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

  it("brand-500 is the MAXA core color #31E5C2", () => {
    expect(css.toLowerCase()).toContain("#31e5c2")
  })

  it("keeps one primitive scale and delegates theme changes to semantic roles", () => {
    expect(css).not.toContain('[data-theme="dark"]')
  })
})

// ── primitives.css — gray ──────────────────────────────────────────────────

describe("primitives.css — gray", () => {
  const css = readFileSync(join(src, "primitives.css"), "utf-8")

  it("defines gray-0 (white)", () => {
    expect(css).toContain("--color-neutral-0:")
  })

  it("defines all 11 standard gray steps", () => {
    for (const step of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
      expect(css).toContain(`--color-neutral-${step}:`)
    }
  })

  it("defines the Figma neutral surface steps exactly", () => {
    expect(cssVariable(css, "color-neutral-50")?.toLowerCase()).toBe("#fafafa")
    expect(cssVariable(css, "color-neutral-925")?.toLowerCase()).toBe("#232324")
  })

  it("defines the product page background as Neutral/75", () => {
    expect(cssVariable(css, "color-neutral-75")?.toLowerCase()).toBe("#f5f6fa")
  })

  it("defines all status palette steps used by semantic tokens", () => {
    for (const color of ["blue", "green", "red", "yellow", "orange"]) {
      for (const step of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
        expect(css).toContain(`--color-${color}-${step}:`)
      }
    }
  })

  it("does not keep button-only intermediate palette steps", () => {
    for (const token of ["color-blue-550", "color-green-650", "color-green-750", "color-red-550"]) {
      expect(cssVariable(css, token)).toBeUndefined()
    }
  })

  it("defines the exact soft-focus blue primitive", () => {
    expect(cssVariable(css, "color-blue-150")?.toLowerCase()).toBe("#c7e5f0")
  })
})

// ── semantic.css — text + border ──────────────────────────────────────────

describe("semantic.css — text + border", () => {
  const css = readFileSync(join(src, "semantic.css"), "utf-8")

  it("defines the canonical text roles in :root", () => {
    for (const t of [
      "text-primary",
      "text-secondary",
      "text-tertiary",
      "text-disabled",
      "text-inverse",
      "text-on-brand",
      "text-on-color",
      "text-on-warning",
      "text-on-neutral-action-active",
      "text-brand",
      "text-link",
      "text-link-hover",
      "text-link-active",
      "text-info",
      "text-success",
      "text-error",
      "text-warning",
    ]) {
      expect(css).toContain(`--color-${t}:`)
    }
  })

  it("defines canonical border tokens", () => {
    for (const t of [
      "border-primary",
      "border-secondary",
      "border-tertiary",
      "border-brand",
      "border-error-strong",
      "border-error-subtle",
      "border-info-strong",
      "border-info-subtle",
      "border-success-strong",
      "border-success-subtle",
      "border-warning-strong",
      "border-warning-subtle",
      "border-neutral-strong",
      "border-neutral-muted",
      "border-neutral-subtle",
    ]) {
      expect(css).toContain(`--color-${t}:`)
    }
    for (const t of ["border-default", "border-brand-strong"]) {
      expect(css).not.toContain(`--color-${t}:`)
    }
  })

  it("has dark mode section with text-primary override", () => {
    const darkIdx = css.indexOf('\n[data-theme="dark"] {')
    expect(darkIdx).toBeGreaterThan(-1)
    expect(css.slice(darkIdx)).toContain("--color-text-primary:")
  })

  it("defines foreground tokens for icons and non-text foregrounds", () => {
    for (const t of [
      "fg-primary",
      "fg-secondary",
      "fg-tertiary",
      "fg-disabled",
      "fg-inverse",
      "fg-on-brand",
      "fg-on-color",
      "fg-brand",
      "fg-link",
      "fg-link-hover",
      "fg-link-active",
      "fg-info",
      "fg-success",
      "fg-error",
      "fg-warning",
    ]) {
      expect(css).toContain(`--color-${t}:`)
    }
  })
})

// ── semantic.css — bg + action ─────────────────────────────────────────────

describe("semantic.css — bg + action", () => {
  const css = readFileSync(join(src, "semantic.css"), "utf-8")

  it("defines all background tokens", () => {
    for (const t of [
      "bg-page",
      "bg-surface",
      "bg-float",
      "bg-muted",
      "bg-neutral-surface",
      "bg-neutral-subtle",
      "bg-neutral-on-muted",
      "bg-neutral-strong",
      "bg-disabled",
      "bg-overlay",
      "bg-inverse",
      "bg-brand-subtle",
      "bg-brand-surface",
      "bg-brand-strong",
      "bg-info-subtle",
      "bg-info-surface",
      "bg-info-strong",
      "bg-success-subtle",
      "bg-success-surface",
      "bg-success-strong",
      "bg-error-subtle",
      "bg-error-surface",
      "bg-error-strong",
      "bg-warning-subtle",
      "bg-warning-surface",
      "bg-warning-strong",
    ]) {
      expect(css).toContain(`--color-${t}:`)
    }
  })

  it("defines all action tokens", () => {
    for (const t of [
      "action-primary",
      "action-primary-hover",
      "action-primary-active",
      "action-primary-subtle",
      "action-primary-subtle-hover",
      "action-primary-subtle-active",
      "action-neutral",
      "action-neutral-hover",
      "action-neutral-active",
      "action-neutral-subtle",
      "action-neutral-subtle-hover",
      "action-neutral-subtle-active",
      "action-brand",
      "action-brand-hover",
      "action-brand-active",
      "action-brand-subtle",
      "action-brand-subtle-hover",
      "action-brand-subtle-active",
      "action-positive",
      "action-positive-hover",
      "action-positive-active",
      "action-destructive",
      "action-destructive-hover",
      "action-destructive-active",
      "action-warning",
      "action-warning-hover",
      "action-warning-active",
      "action-warning-subtle",
      "action-warning-subtle-hover",
      "action-warning-subtle-active",
    ]) {
      expect(css).toContain(`--color-${t}:`)
    }
  })

  it("maps CSS action primary to blue, not brand", () => {
    expect(cssVariable(css, "color-action-primary")).toBe("var(--color-blue-500)")
    expect(cssVariable(css, "color-action-primary-hover")).toBe("var(--color-blue-600)")
    expect(cssVariable(css, "color-action-primary-active")).toBe("var(--color-blue-700)")
    expect(css).not.toContain("--color-action-primary-normal:")
  })

  it("uses compact opposite-direction action ladders across themes", () => {
    const darkIdx = css.indexOf('\n[data-theme="dark"] {')
    const light = css.slice(0, darkIdx)
    const dark = css.slice(darkIdx)

    expect(cssVariable(light, "color-action-positive")).toBe("var(--color-green-500)")
    expect(cssVariable(light, "color-action-positive-hover")).toBe("var(--color-green-600)")
    expect(cssVariable(light, "color-action-positive-active")).toBe("var(--color-green-700)")
    expect(cssVariable(light, "color-action-destructive-hover")).toBe("var(--color-red-600)")
    expect(cssVariable(dark, "color-action-primary")).toBe("var(--color-blue-600)")
    expect(cssVariable(dark, "color-action-primary-hover")).toBe("var(--color-blue-500)")
    expect(cssVariable(dark, "color-action-primary-active")).toBe("var(--color-blue-400)")
    expect(cssVariable(dark, "color-action-positive")).toBe("var(--color-green-600)")
    expect(cssVariable(dark, "color-action-destructive")).toBe("var(--color-red-600)")
    expect(css).not.toContain("--color-action-positive-subtle:")
    expect(css).not.toContain("--color-action-destructive-subtle:")
  })

  it("maps neutral states to adjacent balanced steps", () => {
    const darkIdx = css.indexOf('\n[data-theme="dark"] {')
    const light = css.slice(0, darkIdx)
    const dark = css.slice(darkIdx)

    expect(cssVariable(light, "color-action-neutral-hover")).toBe("var(--color-neutral-400)")
    expect(cssVariable(light, "color-action-neutral-active")).toBe("var(--color-neutral-450)")
    expect(cssVariable(dark, "color-action-neutral-hover")).toBe("var(--color-neutral-700)")
    expect(cssVariable(dark, "color-action-neutral-active")).toBe("var(--color-neutral-600)")
  })

  it("does not redefine bg-nav in semantic layer (moved to component-nav.css)", () => {
    expect(css).not.toContain("--color-bg-nav:")
  })

  it("keeps a dedicated feedback recipe alongside the shared semantic roles", () => {
    const darkIdx = css.indexOf('\n[data-theme="dark"] {')
    const light = css.slice(0, darkIdx)
    const dark = css.slice(darkIdx)

    expect(cssVariable(light, "color-bg-info-subtle")).toBe("var(--color-blue-100)")
    expect(cssVariable(light, "color-border-info-subtle")).toBe("var(--color-blue-200)")
    expect(cssVariable(light, "color-action-positive")).toBe("var(--color-green-500)")
    expect(cssVariable(light, "color-action-destructive")).toBe("var(--color-red-500)")
    expect(cssVariable(dark, "color-bg-info-subtle")).toBe("var(--color-blue-950)")
    expect(cssVariable(dark, "color-bg-success-subtle")).toBe("var(--color-green-950)")
    expect(cssVariable(dark, "color-bg-warning-subtle")).toBe("var(--color-yellow-950)")
    expect(cssVariable(dark, "color-bg-error-subtle")).toBe("var(--color-red-950)")
    expect(cssVariable(light, "color-feedback-info-bg")).toBe("var(--color-blue-100)")
    expect(cssVariable(light, "color-feedback-success-bg")).toBe("var(--color-green-100)")
    expect(cssVariable(light, "color-feedback-warning-bg")).toBe("var(--color-orange-100)")
    expect(cssVariable(light, "color-feedback-error-bg")).toBe("var(--color-red-100)")
    expect(cssVariable(light, "color-feedback-success-action")).toBe("var(--color-green-500)")
    expect(cssVariable(light, "color-feedback-error-action-hover")).toBe("var(--color-red-700)")
    expect(cssVariable(dark, "color-feedback-info-bg")).toBe("var(--color-blue-800)")
    expect(cssVariable(dark, "color-feedback-success-bg")).toBe("var(--color-green-900)")
    expect(cssVariable(dark, "color-feedback-error-bg")).toBe("var(--color-red-800)")
    expect(cssVariable(dark, "color-feedback-success-action")).toBe("var(--color-green-400)")
    expect(cssVariable(dark, "color-feedback-error-action-hover")).toBe("var(--color-red-300)")
    expect(css).not.toContain("--color-status-")
    expect(cssVariable(dark, "color-bg-overlay-strong")).toBe("var(--color-neutral-alpha-black-72)")
  })
})

// ── component-nav.css ─────────────────────────────────────────────────────

describe("component-nav.css", () => {
  const css = readFileSync(join(src, "component-nav.css"), "utf-8")

  it("defines --nav-bg sourced from a primitive (no hardcoded hex)", () => {
    expect(css).toContain("--nav-bg:")
    expect(css).toContain("var(--color-neutral-950)")
    expect(css.match(/#[0-9a-fA-F]{3,8}/)).toBeNull()
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

// ── component-avatar.css ──────────────────────────────────────────────────

describe("component-avatar.css", () => {
  const css = readFileSync(join(src, "component-avatar.css"), "utf-8")

  it("matches the canonical Figma body border and radius tokens", () => {
    expect(cssVariable(css, "avatar-border")).toBe("var(--color-border-secondary)")
    expect(cssVariable(css, "avatar-border-width")).toBe("1px")
    expect(cssVariable(css, "avatar-radius")).toBe("var(--radius-full)")
    expect(cssVariable(css, "avatar-radius-square")).toBe("var(--radius-md)")
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

  it("gives Component-based one mode-neutral Default source set", () => {
    const modes = manifest.collections["Component-based"]?.modes ?? {}
    const files = modes.Default ?? []
    expect(Object.keys(modes)).toEqual(["Default"])
    expect(files.length).toBeGreaterThan(14)
    expect(files).toContain("component-button.json")
    expect(files).toContain("component-select.json")
    expect(files).toContain("component-social-button.json")
    expect(files.some((file) => /-(?:light|dark)\.json$/.test(file))).toBe(false)
  })

  it("includes unified Primitives collection", () => {
    expect(manifest.collections.Primitives?.modes.Value).toEqual(["primitives.json"])
  })

  it("uses Color modes collection naming", () => {
    expect(manifest.collections["Color modes"]?.modes.Light).toEqual([
      "colors-semantic-light.json",
      "colors-feedback-light.json",
      "colors-support-light.json",
      "colors-utility-light.json",
    ])
    expect(manifest.collections["Color modes"]?.modes.Dark).toEqual([
      "colors-semantic-dark.json",
      "colors-feedback-dark.json",
      "colors-support-dark.json",
      "colors-utility-dark.json",
    ])
  })

  it("does not keep deprecated Containers collection", () => {
    expect(manifest.collections.Containers).toBeUndefined()
  })
})

describe("figma import bundle", () => {
  it("excludes the unused Slate primitive palette", () => {
    const primitives = bundle.collections.Primitives?.modes.Value ?? {}

    expect(Object.keys(primitives).some((name) => name.startsWith("Colors/Slate/"))).toBe(false)
  })

  const bundle = JSON.parse(readFileSync(join(root, "figma/import-bundle.json"), "utf-8")) as {
    aliasDefaults: Record<string, string>
    collections: Record<
      string,
      {
        modes: Record<string, Record<string, number | string | boolean>>
        types?: Record<string, "BOOLEAN" | "COLOR" | "FLOAT" | "STRING">
        scopes?: Record<string, string[]>
      }
    >
    effects?: { shadows?: Record<string, Record<string, Record<string, unknown[]>>> }
  }

  function resolveAliasPath(collectionName: string, value: string): string {
    const inner = value.trim().slice(1, -1).trim()
    const slashIndex = inner.indexOf("/")
    if (slashIndex !== -1) {
      if (bundle.collections[inner.slice(0, slashIndex)]) return inner
      return `${collectionName}/${inner}`
    }

    if (inner.includes(".")) {
      const defaultCollection = bundle.aliasDefaults[collectionName]
      return `${defaultCollection}/${inner.replace(/\./g, "/")}`
    }

    const defaultCollection = bundle.aliasDefaults[collectionName]
    return defaultCollection ? `${defaultCollection}/${inner}` : `${collectionName}/${inner}`
  }

  it("maps Layout short spacing aliases to the Spacing collection", () => {
    expect(bundle.aliasDefaults.Layout).toBe("Spacing")
    expect(bundle.collections.Layout?.modes.Desktop?.["V-stack/tight"]).toBe("{Spacing/spacing-xs}")
    expect(bundle.collections.Layout?.modes.Desktop?.["Container/padding"]).toBe(
      "{Spacing/spacing-4xl}",
    )
    expect(bundle.collections.Layout?.modes.Desktop?.["Grid/margin"]).toBe("{Container/padding}")
  })

  it("matches the balanced neutral action aliases in both color modes", () => {
    const light = bundle.collections["Color modes"]?.modes.Light
    const dark = bundle.collections["Color modes"]?.modes.Dark

    expect(light?.["action/action-neutral-hover"]).toBe("{Colors.Neutral.400}")
    expect(light?.["action/action-neutral-active"]).toBe("{Colors.Neutral.450}")
    expect(dark?.["action/action-neutral-hover"]).toBe("{Colors.Neutral.700}")
    expect(dark?.["action/action-neutral-active"]).toBe("{Colors.Neutral.600}")
  })

  it("matches the updated neutral primitives and semantic aliases", () => {
    const primitives = bundle.collections.Primitives?.modes.Value
    const light = bundle.collections["Color modes"]?.modes.Light
    const dark = bundle.collections["Color modes"]?.modes.Dark

    expect(primitives?.["Colors/Neutral/50"]).toBe("#FAFAFA")
    expect(primitives?.["Colors/Neutral/75"]).toBe("#F5F6FA")
    expect(primitives?.["Colors/Neutral/450"]).toBe("#C9C9C9")
    expect(primitives?.["Colors/Neutral/925"]).toBe("#232324")
    expect(light?.["background/bg-page"]).toBe("{Colors.Neutral.75}")
    expect(light?.["text/text-disabled"]).toBe("{Colors.Neutral.500}")
    expect(dark?.["background/bg-neutral-surface"]).toBe("{Colors.Neutral.925}")
  })

  it("matches the canonical Avatar body border contract", () => {
    const component = bundle.collections["Component-based"]
    const tokens = component?.modes.Default

    expect(tokens?.["Avatar/surface/border"]).toBe("{Color modes/border/border-secondary}")
    expect(tokens?.["Avatar/layout/border-width"]).toBe(1)
    expect(component?.types?.["Avatar/layout/border-width"]).toBe("FLOAT")
    expect(component?.scopes?.["Avatar/layout/border-width"]).toEqual(["STROKE_FLOAT"])
  })

  it("includes shadow effect styles for Figma", () => {
    expect(bundle.effects?.shadows?.Shadows?.Light?.xs).toBeDefined()
    expect(bundle.effects?.shadows?.Shadows?.Light?.["3xl"]).toHaveLength(2)
    expect(bundle.effects?.shadows?.Shadows?.Dark).toBeUndefined()
  })

  it("contains no CSS expressions masquerading as Figma variable values", () => {
    const invalid: string[] = []

    for (const [collectionName, collection] of Object.entries(bundle.collections)) {
      for (const [modeName, tokens] of Object.entries(collection.modes)) {
        for (const [tokenName, value] of Object.entries(tokens)) {
          if (typeof value === "string" && /(?:var\(--|color-mix\(|\b(?:px|rem)\b)/.test(value)) {
            invalid.push(`${collectionName}/${tokenName} [${modeName}] = ${value}`)
          }
        }
      }
    }

    expect(invalid).toEqual([])
  })

  it("resolves every alias to a token present in the bundle", () => {
    const missing: string[] = []

    for (const [collectionName, collection] of Object.entries(bundle.collections)) {
      for (const [modeName, tokens] of Object.entries(collection.modes)) {
        for (const [tokenName, value] of Object.entries(tokens)) {
          if (typeof value !== "string" || !/^\{[^}]+\}$/.test(value.trim())) continue
          const targetPath = resolveAliasPath(collectionName, value)
          const targetSlash = targetPath.indexOf("/")
          const targetCollectionName = targetPath.slice(0, targetSlash)
          const targetTokenName = targetPath.slice(targetSlash + 1)
          const targetCollection = bundle.collections[targetCollectionName]
          const targetExists =
            targetCollection &&
            Object.values(targetCollection.modes).some(
              (targetTokens) => targetTokens[targetTokenName] !== undefined,
            )
          if (!targetExists)
            missing.push(`${collectionName}/${tokenName} [${modeName}] -> ${targetPath}`)
        }
      }
    }

    expect(missing).toEqual([])
  })

  it("carries an explicit Figma resolved type for every variable", () => {
    const missing: string[] = []

    for (const [collectionName, collection] of Object.entries(bundle.collections)) {
      const tokenNames = new Set(
        Object.values(collection.modes).flatMap((tokens) => Object.keys(tokens)),
      )
      for (const tokenName of tokenNames) {
        if (!collection.types?.[tokenName]) missing.push(`${collectionName}/${tokenName}`)
      }
    }

    expect(missing).toEqual([])
    expect(bundle.collections["Component-based"]?.types?.["Select/bg"]).toBe("COLOR")
    expect(bundle.collections["Component-based"]?.types?.["Select/size-md-height"]).toBe("FLOAT")
  })

  it("carries explicit picker scopes for every variable", () => {
    const missing: string[] = []

    for (const [collectionName, collection] of Object.entries(bundle.collections)) {
      for (const tokenName of Object.keys(collection.types ?? {})) {
        if (!Array.isArray(collection.scopes?.[tokenName]))
          missing.push(`${collectionName}/${tokenName}`)
      }
    }

    expect(missing).toEqual([])
    expect(bundle.collections["Color modes"]?.scopes?.["text/text-primary"]).toEqual(["TEXT_FILL"])
    expect(bundle.collections["Color modes"]?.scopes?.["foreground/fg-on-color"]).toEqual([
      "SHAPE_FILL",
      "STROKE_COLOR",
    ])
    expect(bundle.collections.Primitives?.scopes?.["Colors/Orange/500"]).toEqual(["ALL_FILLS"])
    expect(bundle.collections.Primitives?.scopes?.["Colors/Red/500"]).toEqual(["ALL_FILLS"])
    expect(bundle.collections.Primitives?.scopes?.["Colors/Yellow/500"]).toEqual(["ALL_FILLS"])
    expect(bundle.collections.Primitives?.scopes?.["Colors/Blue/500"]).toEqual([])
    expect(bundle.collections["Component-based"]?.scopes?.["Select/bg"]).toEqual(["ALL_FILLS"])
    expect(bundle.collections["Component-based"]?.scopes?.["Select/border"]).toEqual([
      "STROKE_COLOR",
    ])
    expect(bundle.collections["Component-based"]?.scopes?.["Alert/color/info/action"]).toEqual([
      "ALL_FILLS",
    ])
    expect(bundle.collections["Component-based"]?.scopes?.["Alert/color/neutral/action"]).toEqual([
      "ALL_FILLS",
      "STROKE_COLOR",
    ])
    expect(bundle.collections["Component-based"]?.scopes?.["Select/size-md-height"]).toEqual([
      "WIDTH_HEIGHT",
    ])
    expect(bundle.collections["Component-based"]?.scopes?.["Context Menu/z"]).toEqual([])
  })

  it("uses real cross-component aliases and excludes effects from variables", () => {
    const component = bundle.collections["Component-based"]?.modes.Default

    expect(component?.["Select/bg"]).toBe("{Component-based/Input/bg}")
    expect(component?.["Context Menu/bg"]).toBe("{Component-based/Dropdown Menu/surface/bg}")
    expect(component?.["Social Button/bg"]).toBe("{Color modes/background/bg-surface}")
    expect(component?.["Drawer/overlay-bg"]).toBe("{Component-based/Dialog/overlay-bg}")
    expect(component?.["Spinner/color"]).toBe("{Component-based/Spinner/primary-color}")
    expect(component?.["Alert/color/info/action"]).toBe("{Color modes/feedback/info/action}")
    expect(component?.["Alert/color/success/action"]).toBe("{Color modes/feedback/success/action}")
    expect(component?.["Alert/color/warning/action"]).toBe("{Color modes/feedback/warning/action}")
    expect(component?.["Alert/color/error/action"]).toBe("{Color modes/feedback/error/action}")
    expect(component?.["Alert/color/neutral/action"]).toBe("{Color modes/feedback/neutral/action}")
    for (const intent of ["info", "success", "warning", "error", "neutral", "emphasize"]) {
      const textAlias = ["neutral", "emphasize"].includes(intent)
        ? `{Color modes/feedback/${intent}/text}`
        : "{Color modes/feedback/text}"
      expect(component?.[`Alert/color/${intent}/text`]).toBe(textAlias)
    }
    expect(component?.["Calendar/shadow"]).toBeUndefined()
    expect(component?.["Context Menu/shadow"]).toBeUndefined()
    expect(component?.["Social Button/shadow-focus"]).toBeUndefined()
    expect(component?.["Toast/shadow"]).toBeUndefined()
  })

  it("keeps theme behavior in semantic Color modes without a duplicate component namespace", () => {
    const light = bundle.collections["Color modes"]?.modes.Light
    const dark = bundle.collections["Color modes"]?.modes.Dark
    const component = bundle.collections["Component-based"]?.modes.Default

    expect(light?.["control/control-idle"]).toBe("{Colors.Neutral.500}")
    expect(dark?.["control/control-idle"]).toBe("{Colors.Neutral.600}")
    // The gray hue family lives in utility, never in the background group.
    expect(light?.["background/bg-gray-muted"]).toBeUndefined()
    expect(light?.["utility/bg-gray-muted"]).toBe("{Colors.Gray.100}")
    expect(dark?.["utility/bg-gray-muted"]).toBe("{Colors.Gray.900}")
    expect(light?.["border/border-info-strong"]).toBe("{Colors.Blue.700}")
    expect(dark?.["border/border-info-strong"]).toBe("{Colors.Blue.500}")
    expect(light?.["border/border-neutral-muted"]).toBe("{Colors.Neutral.400}")
    expect(dark?.["border/border-neutral-muted"]).toBe("{Colors.Neutral.600}")
    expect(dark?.["border/border-neutral-strong"]).toBe("{Colors.Neutral.300}")
    expect(light?.["Effects/Focus rings/focus-ring"]).toBe("{Colors.Blue.500}")
    expect(dark?.["Effects/Focus rings/focus-ring"]).toBe("{Colors.Blue.400}")
    expect(light?.["Effects/Focus rings/focus-ring-error"]).toBe("{Colors.Red.500}")
    expect(dark?.["Effects/Focus rings/focus-ring-error"]).toBe("{Colors.Red.400}")
    expect(light?.["border/border-focus-soft"]).toBe("{Colors.Blue.150}")
    expect(dark?.["border/border-focus-soft"]).toBe("{Colors.Blue.150}")
    expect(Object.keys(light ?? {}).some((name) => name.startsWith("component/"))).toBe(false)
    expect(Object.keys(dark ?? {}).some((name) => name.startsWith("component/"))).toBe(false)
    expect(bundle.collections.Primitives?.modes.Value?.["Colors/Blue/50"]).toBe("#EFF7FF")
    expect(bundle.collections.Primitives?.modes.Value?.["Colors/Blue/500"]).toBe("#0576DA")
    expect(bundle.collections.Primitives?.modes.Value?.["Colors/Green/500"]).toBe("#30AA50")
    expect(bundle.collections.Primitives?.modes.Value?.["Colors/Red/500"]).toBe("#D31510")
    expect(bundle.collections.Primitives?.modes.Value?.["Colors/Brand/500"]).toBe("#31E5C2")
    expect(light?.["background/bg-overlay-strong"]).toBe("{Colors.Neutral (alpha).Ink.50}")
    expect(dark?.["background/bg-overlay-strong"]).toBe("{Colors.Neutral (alpha).Black.72}")
    expect(light?.["action/action-menu-hover"]).toBe(
      "{Color modes/action/action-neutral-subtle-hover}",
    )
    expect(dark?.["action/action-menu-hover"]).toBe("{Color modes/action/action-neutral-hover}")
    expect(light?.["utility/bg-violet-muted"]).toBe("{Colors.Violet.100}")
    expect(dark?.["utility/bg-violet-muted"]).toBe("{Colors.Violet.900}")
    expect(component?.["Checkbox/color/border"]).toBe("{Color modes/control/control-idle}")
    expect(component?.["Multi Select/chip-bg"]).toBe("{Color modes/utility/bg-gray-muted}")
    expect(component?.["Toast/color/stripe-info"]).toBe("{Color modes/border/border-info-strong}")
    expect(component?.["Alert/color/info/bg"]).toBe("{Color modes/feedback/info/bg}")
    expect(component?.["Alert/color/info/border"]).toBe("{Color modes/feedback/info/border}")
    expect(component?.["Alert/color/info/accent"]).toBe("{Color modes/feedback/info/accent}")
    expect(component?.["Alert/color/neutral/bg"]).toBe("{Color modes/feedback/neutral/bg}")
    expect(component?.["Alert/color/emphasize/bg"]).toBe("{Color modes/feedback/emphasize/bg}")
    expect(component?.["Dialog/overlay-bg"]).toBe("{Color modes/background/bg-overlay-strong}")
    expect(component?.["Dropdown Menu/item/bg-hover"]).toBe(
      "{Color modes/action/action-menu-hover}",
    )
    expect(component?.["Utility/bg-violet-muted"]).toBe("{Color modes/utility/bg-violet-muted}")
    expect(component?.["Button/outline/border-hover"]).toBe(
      "{Color modes/border/border-neutral-muted}",
    )
    expect(component?.["Button/outline/border-active"]).toBe(
      "{Color modes/border/border-neutral-muted}",
    )
  })

  it("routes Alert through the dedicated feedback namespace backed directly by primitives", () => {
    const colorModes = bundle.collections["Color modes"]
    for (const [modeName, values] of Object.entries(colorModes?.modes ?? {})) {
      const feedbackEntries = Object.entries(values).filter(([name]) =>
        name.startsWith("feedback/"),
      )
      expect(feedbackEntries, `${modeName} feedback roles`).toHaveLength(33)
      for (const [name, value] of feedbackEntries) {
        expect(value, `${name} [${modeName}]`).toMatch(/^\{Colors\./)
      }
    }

    const primitives = bundle.collections.Primitives?.modes.Value
    expect(primitives?.["Colors/Base/Ink"]).toBe("#1B1A1A")
    expect(Object.keys(primitives ?? {}).some((name) => name.startsWith("Colors/Status/"))).toBe(
      false,
    )

    const component = bundle.collections["Component-based"]?.modes.Default ?? {}
    expect(component["Alert/color/info/bg"]).toBe("{Color modes/feedback/info/bg}")
    expect(component["Alert/color/success/bg"]).toBe("{Color modes/feedback/success/bg}")
    expect(component["Alert/color/warning/bg"]).toBe("{Color modes/feedback/warning/bg}")
    expect(component["Alert/color/error/bg"]).toBe("{Color modes/feedback/error/bg}")
    expect(
      Object.values(component).some(
        (value) => typeof value === "string" && value.includes("Color modes/feedback/"),
      ),
    ).toBe(true)
  })

  it("matches the published dark Alert feedback surfaces", () => {
    const dark = bundle.collections["Color modes"]?.modes.Dark

    expect(dark?.["feedback/info/bg"]).toBe("{Colors.Blue.800}")
    expect(dark?.["feedback/info/border"]).toBe("{Colors.Blue.600}")
    expect(dark?.["feedback/info/accent"]).toBe("{Colors.Blue.400}")

    expect(dark?.["feedback/success/bg"]).toBe("{Colors.Green.900}")
    expect(dark?.["feedback/success/border"]).toBe("{Colors.Green.700}")
    expect(dark?.["feedback/success/accent"]).toBe("{Colors.Green.500}")

    expect(dark?.["feedback/warning/bg"]).toBe("{Colors.Orange.900}")
    expect(dark?.["feedback/warning/border"]).toBe("{Colors.Orange.700}")
    expect(dark?.["feedback/warning/accent"]).toBe("{Colors.Orange.600}")
    expect(bundle.collections.Primitives?.modes.Value?.["Colors/Orange/900"]).toBe("#6d240d")

    expect(dark?.["feedback/error/bg"]).toBe("{Colors.Red.800}")
    expect(dark?.["feedback/error/border"]).toBe("{Colors.Red.500}")
    expect(dark?.["feedback/error/accent"]).toBe("{Colors.Red.300}")

    for (const intent of ["neutral", "emphasize"]) {
      expect(dark?.[`feedback/${intent}/bg`]).toBe("{Colors.Neutral.900}")
      expect(dark?.[`feedback/${intent}/border`]).toBe("{Colors.Neutral.800}")
      expect(dark?.[`feedback/${intent}/accent`]).toBe("{Colors.Neutral.500}")
    }
  })

  it("keeps Warning Alert actions on the approved orange palette", () => {
    const light = bundle.collections["Color modes"]?.modes.Light
    const dark = bundle.collections["Color modes"]?.modes.Dark

    expect(light?.["feedback/warning/action"]).toBe("{Colors.Orange.700}")
    expect(light?.["feedback/warning/action-hover"]).toBe("{Colors.Orange.700}")
    expect(dark?.["feedback/warning/action"]).toBe("{Colors.Orange.400}")
    expect(dark?.["feedback/warning/action-hover"]).toBe("{Colors.Orange.300}")
  })

  it("keeps every Color modes COLOR value as an alias — no raw literals in any group", () => {
    const colorModes = bundle.collections["Color modes"]
    for (const [modeName, values] of Object.entries(colorModes?.modes ?? {})) {
      for (const [name, value] of Object.entries(values)) {
        if (colorModes?.types?.[name] === "COLOR") {
          expect(value, `${name} [${modeName}]`).toMatch(/^\{[^}]+\}$/)
        }
      }
    }
  })

  it("routes overlay and inverse-muted roles through the exact alpha primitives", () => {
    const colorModes = bundle.collections["Color modes"]?.modes
    expect(colorModes?.Light["background/bg-overlay-strong"]).toBe(
      "{Colors.Neutral (alpha).Ink.50}",
    )
    expect(colorModes?.Dark["background/bg-overlay-strong"]).toBe(
      "{Colors.Neutral (alpha).Black.72}",
    )
    expect(colorModes?.Light["foreground/fg-on-inverse-muted"]).toBe(
      "{Colors.Neutral (alpha).White.45}",
    )
    expect(colorModes?.Dark["foreground/fg-on-inverse-muted"]).toBe(
      "{Colors.Neutral (alpha).White.45}",
    )

    const primitives = bundle.collections.Primitives?.modes.Value
    expect(primitives?.["Colors/Neutral (alpha)/Ink/50"]).toBe("#1B1A1A80")
    expect(primitives?.["Colors/Neutral (alpha)/Black/72"]).toBe("#000000B8")
    expect(primitives?.["Colors/Neutral (alpha)/White/45"]).toBe("#FFFFFF73")
  })

  it("adds no unused alpha primitives beyond the three required ones", () => {
    const primitives = bundle.collections.Primitives?.modes.Value ?? {}
    const alphaLeaves = Object.keys(primitives).filter((name) =>
      name.startsWith("Colors/Neutral (alpha)/"),
    )
    const decades = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]
    const expected = [
      "Colors/Neutral (alpha)/Ink/50",
      ...decades.map((s) => `Colors/Neutral (alpha)/White/${s}`),
      "Colors/Neutral (alpha)/White/45",
      ...decades.map((s) => `Colors/Neutral (alpha)/Black/${s}`),
      "Colors/Neutral (alpha)/Black/72",
    ]
    expect(alphaLeaves.sort()).toEqual(expected.sort())

    // Each of the three new primitives must actually be consumed.
    const allValues = Object.values(bundle.collections)
      .flatMap((collection) => Object.values(collection.modes))
      .flatMap((tokens) => Object.values(tokens))
    for (const target of [
      "{Colors.Neutral (alpha).Ink.50}",
      "{Colors.Neutral (alpha).Black.72}",
      "{Colors.Neutral (alpha).White.45}",
    ]) {
      expect(allValues, `expected a consumer of ${target}`).toContain(target)
    }
  })

  it("keeps the neutral background ladder aligned across CSS and Figma", () => {
    const light = bundle.collections["Color modes"]?.modes.Light
    const dark = bundle.collections["Color modes"]?.modes.Dark
    const css = readFileSync(join(root, "src/semantic.css"), "utf-8")

    // The reconciled ladder: surface → subtle → muted → on-muted → strong.
    expect(light?.["background/bg-neutral-surface"]).toBe("{Colors.Neutral.50}")
    expect(dark?.["background/bg-neutral-surface"]).toBe("{Colors.Neutral.925}")
    expect(light?.["background/bg-neutral-on-subtle"]).toBeUndefined()
    expect(light?.["background/bg-neutral-muted"]).toBe("{Colors.Neutral.200}")
    expect(dark?.["background/bg-neutral-muted"]).toBe("{Colors.Neutral.800}")
    expect(light?.["background/bg-neutral-on-muted"]).toBe("{Colors.Neutral.300}")
    expect(dark?.["background/bg-neutral-on-muted"]).toBe("{Colors.Neutral.700}")
    expect(cssVariable(css, "color-bg-neutral-surface")).toBe("var(--color-neutral-50)")
    expect(css).not.toContain("--color-bg-neutral-on-subtle")
    expect(cssVariable(css, "color-bg-neutral-on-muted")).toBe("var(--color-neutral-300)")

    // Table header consumes the new step.
    const tableCss = readFileSync(join(root, "src/component-table.css"), "utf-8")
    expect(tableCss).toContain("--table-header-bg: var(--color-bg-neutral-muted)")
    expect(bundle.collections["Component-based"]?.modes.Default["Table/header-bg"]).toBe(
      "{Color modes/background/bg-neutral-muted}",
    )
  })

  it("keeps Table text colors attached to explicit content roles", () => {
    const tableTokens = readFileSync(join(root, "src/component-table.css"), "utf-8")
    const tableStyles = readFileSync(join(root, "../ui/src/components/table/table.css"), "utf-8")
    const componentMode = bundle.collections["Component-based"]?.modes.Default ?? {}

    expect(tableTokens).not.toContain("--table-text:")
    expect(tableStyles).not.toContain("var(--table-text)")
    expect(componentMode["Table/text"]).toBeUndefined()
    expect(tableTokens).toContain("--table-cell-text:")
    expect(tableStyles).toContain("color: var(--table-cell-text)")
    expect(componentMode["Table/cell-text"]).toBeDefined()
  })

  it("keeps Table row backgrounds and caption roles aligned with the Figma model", () => {
    const tableTokens = readFileSync(join(root, "src/component-table.css"), "utf-8")
    const tableStyles = readFileSync(join(root, "../ui/src/components/table/table.css"), "utf-8")
    const componentMode = bundle.collections["Component-based"]?.modes.Default ?? {}

    expect(componentMode["Table/row-bg"]).toBe("{Color modes/background/bg-surface}")
    expect(componentMode["Table/row-bg-striped"]).toBe(
      "{Color modes/background/bg-neutral-surface}",
    )
    expect(componentMode["Table/cell-bg"]).toBeUndefined()
    expect(componentMode["Table/text-caption"]).toBe("{Color modes/text/text-tertiary}")
    expect(tableTokens).toContain("--table-row-bg-striped:")
    expect(tableTokens).not.toContain("--table-cell-bg:")
    expect(tableStyles).toContain("background: var(--table-row-bg-striped)")
    expect(tableStyles).toContain("background: transparent")
    expect(tableStyles).toContain("color: var(--table-text-caption)")
  })

  it("keeps CSS and Figma Color modes vocabularies in bidirectional name parity", () => {
    // The blind spot this closes: the export↔bundle diff compares two files
    // generated from the same figma/*.json sources, so a CSS-vs-Figma naming
    // divergence (like bg-neutral-surface vs bg-neutral-on-subtle) was
    // invisible until a human noticed. This asserts name parity directly.
    const css = readFileSync(join(root, "src/semantic.css"), "utf-8")
    const cssNames = new Set([...css.matchAll(/(--color-[\w-]+)\s*:/g)].map((m) => m[1]))
    const lightTokens = bundle.collections["Color modes"]?.modes.Light ?? {}

    const HUES =
      "gray|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose"
    const groups: Array<[string, string]> = [
      ["text", "text"],
      ["border", "border"],
      ["action", "action"],
      ["fg", "foreground"],
      ["bg", "background"],
      ["control", "control"],
    ]

    for (const [cssPrefix, figmaGroup] of groups) {
      const figmaKeys = new Set(
        Object.keys(lightTokens)
          .filter((k) => k.startsWith(`${figmaGroup}/`))
          .map((k) => k.slice(figmaGroup.length + 1)),
      )
      const hueRe = new RegExp(`^${cssPrefix}-(${HUES})(-|$)`)
      const cssKeys = new Set(
        [...cssNames]
          .map((n) => n.slice("--color-".length))
          .filter((rest) => rest === cssPrefix || rest.startsWith(`${cssPrefix}-`))
          // Decorative hue families live in Color modes/utility, not here.
          .filter((rest) => !(["bg", "text", "fg"].includes(cssPrefix) && hueRe.test(rest))),
      )
      expect(
        [...cssKeys].filter((k) => !figmaKeys.has(k)).sort(),
        `${cssPrefix}: CSS-only names`,
      ).toEqual([])
      expect(
        [...figmaKeys].filter((k) => !cssKeys.has(k)).sort(),
        `${figmaGroup}: Figma-only names`,
      ).toEqual([])
    }

    const figmaFeedback = new Set(
      Object.keys(lightTokens)
        .filter((name) => name.startsWith("feedback/"))
        .map((name) => name.replaceAll("/", "-")),
    )
    const cssFeedback = new Set(
      [...cssNames]
        .map((name) => name.slice("--color-".length))
        .filter((name) => name.startsWith("feedback-")),
    )
    expect([...cssFeedback].filter((name) => !figmaFeedback.has(name)).sort()).toEqual([])
    expect([...figmaFeedback].filter((name) => !cssFeedback.has(name)).sort()).toEqual([])
  })

  it("gives Component-based one Default mode and no raw color values", () => {
    const component = bundle.collections["Component-based"]
    const values = component?.modes.Default ?? {}

    expect(Object.keys(component?.modes ?? {})).toEqual(["Default"])
    // 6 intents × (bg, border, accent, text, action, action-hover) = 36.
    const alertColorNames = Object.keys(values).filter((name) => name.startsWith("Alert/color/"))
    expect(alertColorNames).toHaveLength(36)
    for (const [name, type] of Object.entries(component?.types ?? {})) {
      if (type === "COLOR") expect(values[name], name).toMatch(/^\{[^}]+\}$/)
    }
  })

  it("includes Checkbox, Radio, Badge, Tag, Alert, Toggle, Tooltip, Popover, Dropdown Menu, Divider, and Utility component tokens", () => {
    const component = bundle.collections["Component-based"]?.modes.Default

    expect(component?.["Badge/size/lg/height"]).toBe(28)
    expect(component?.["Checkbox/size/md/control"]).toBe(20)
    expect(component?.["Checkbox/color/bg-checked"]).toBe("{Color modes/control/control-checked}")
    expect(component?.["Radio/color/dot"]).toBe("{Color modes/action/action-primary}")
    expect(component?.["Tag/radius"]).toBe("{Radius/radius-sm}")
    expect(component?.["Avatar/layout/size-md"]).toBe(40)
    expect(component?.["Alert/layout/radius"]).toBe("{Radius/radius-md}")
    expect(component?.["Alert/color/error/accent"]).toBe("{Color modes/feedback/error/accent}")
    expect(component?.["Toggle/size/md/track-width"]).toBe(36)
    expect(component?.["Toggle/color/track-on"]).toBe("{Color modes/action/action-primary}")
    expect(component?.["Toggle/color/text"]).toBe("{Color modes/text/text-primary}")
    expect(component?.["Toggle/color/description"]).toBe("{Color modes/text/text-secondary}")
    expect(component?.["Tooltip/layout/max-width"]).toBe(240)
    expect(component?.["Popover/layout/width"]).toBe(320)
    expect(component?.["Dropdown Menu/surface/bg"]).toBe("{Color modes/background/bg-float}")
    expect(component?.["Button/link/fg"]).toBe("{Color modes/foreground/fg-link}")
    expect(component?.["Button/focus/border"]).toBeUndefined()
    expect(component?.["Button/primary/text"]).toBe("{Color modes/text/text-on-color}")
    expect(component?.["Button/primary/fg"]).toBe("{Color modes/foreground/fg-on-color}")
    expect(component?.["Button/secondary/fg"]).toBe("{Color modes/foreground/fg-primary}")
    expect(component?.["Button/outline/fg"]).toBe("{Color modes/foreground/fg-primary}")
    expect(component?.["Button/ghost/fg"]).toBe("{Color modes/foreground/fg-primary}")
    expect(component?.["Button/positive/fg"]).toBe("{Color modes/foreground/fg-on-color}")
    expect(component?.["Button/destructive/fg"]).toBe("{Color modes/foreground/fg-on-color}")
    expect(component?.["Button/warning/fg"]).toBe("{Color modes/foreground/fg-on-color}")
    expect(component?.["Button/text/bg"]).toBeUndefined()
    expect(component?.["Divider/size"]).toBe(1)
    expect(component?.["Utility/text-violet"]).toBe("{Color modes/utility/text-violet}")
  })
})

describe("figma radius tokens", () => {
  const radiusFile = JSON.parse(readFileSync(join(root, "figma/radius.json"), "utf-8")) as Record<
    string,
    { $value: number; $type: string }
  >

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

  const colorPrimitives = JSON.parse(
    readFileSync(join(root, "figma/primitives.json"), "utf-8"),
  ) as { Colors: Record<string, Record<string, { $value: string }>> }

  it("keeps light and dark semantic groups aligned", () => {
    expect(Object.keys(lightFile)).toEqual(Object.keys(darkFile))
    expect(Object.keys(lightFile.text)).toEqual(Object.keys(darkFile.text))
    expect(Object.keys(lightFile.foreground)).toEqual(Object.keys(darkFile.foreground))
    expect(Object.keys(lightFile.background)).toEqual(Object.keys(darkFile.background))
    expect(Object.keys(lightFile.border)).toEqual(Object.keys(darkFile.border))
    expect(Object.keys(lightFile["Effects/Focus rings"])).toEqual(
      Object.keys(darkFile["Effects/Focus rings"]),
    )
    expect(Object.keys(lightFile.action)).toEqual(Object.keys(darkFile.action))
  })

  it("matches agreed semantic values for key tokens", () => {
    expect(lightFile.text["text-primary"]?.$value).toBe("{Colors.Neutral.950}")
    expect(lightFile.text["text-secondary"]?.$value).toBe("{Colors.Neutral.800}")
    expect(lightFile.text["text-tertiary"]?.$value).toBe("{Colors.Neutral.600}")
    expect(lightFile.text["text-disabled"]?.$value).toBe("{Colors.Neutral.500}")
    expect(lightFile.text["text-on-brand"]?.$value).toBe("{Colors.Neutral.950}")
    expect(lightFile.text["text-on-color"]?.$value).toBe("{Colors.Base.White}")
    expect(lightFile.foreground["fg-tertiary"]?.$value).toBe("{Colors.Neutral.600}")
    expect(lightFile.background["bg-muted"]?.$value).toBe("{Colors.Neutral.100}")
    expect(lightFile.background["bg-float"]?.$value).toBe("{Colors.Base.White}")
    expect(lightFile.background["bg-info-strong"]?.$value).toBe("{Colors.Blue.700}")
    expect(lightFile.text["text-info"]?.$value).toBe("{Colors.Blue.900}")
    expect(lightFile.action["action-primary-subtle"]?.$value).toBe("{Colors.Blue.100}")
    expect(lightFile.action["action-primary-subtle-hover"]?.$value).toBe("{Colors.Blue.150}")
    expect(lightFile.background["bg-info-subtle"]?.$value).toBe("{Colors.Blue.100}")
    expect(lightFile.action["action-brand-subtle-hover"]?.$value).toBe("{Colors.Brand.50}")
    expect(darkFile.text["text-secondary"]?.$value).toBe("{Colors.Neutral.200}")
    expect(darkFile.text["text-on-brand"]?.$value).toBe("{Colors.Neutral.950}")
    expect(darkFile.text["text-brand"]?.$value).toBe("{Colors.Brand.400}")
    expect(darkFile.foreground["fg-tertiary"]?.$value).toBe("{Colors.Neutral.500}")
    expect(darkFile.background["bg-muted"]?.$value).toBe("{Colors.Neutral.975}")
    expect(darkFile.background["bg-neutral-surface"]?.$value).toBe("{Colors.Neutral.925}")
    expect(darkFile.background["bg-float"]?.$value).toBe("{Colors.Neutral.800}")
    expect(darkFile.background["bg-info-strong"]?.$value).toBe("{Colors.Blue.500}")
    expect(darkFile.background["bg-brand-strong"]?.$value).toBe("{Colors.Brand.600}")
    expect(darkFile.background["bg-inverse"]?.$value).toBe("{Colors.Neutral.950}")
    expect(darkFile["Effects/Focus rings"]["focus-ring"]?.$value).toBe("{Colors.Blue.400}")
    expect(darkFile["Effects/Focus rings"]["focus-ring-error"]?.$value).toBe("{Colors.Red.400}")
    expect(darkFile.text["text-on-color"]?.$value).toBe("{Colors.Base.White}")
    expect(darkFile.action["action-primary"]?.$value).toBe("{Colors.Blue.600}")
    expect(darkFile.action["action-primary-hover"]?.$value).toBe("{Colors.Blue.500}")
    expect(darkFile.action["action-primary-active"]?.$value).toBe("{Colors.Blue.400}")
    expect(lightFile.action["action-positive"]?.$value).toBe("{Colors.Green.500}")
    expect(darkFile.action["action-positive"]?.$value).toBe("{Colors.Green.600}")
    expect(lightFile.action["action-destructive-hover"]?.$value).toBe("{Colors.Red.600}")
    expect(darkFile.action["action-destructive"]?.$value).toBe("{Colors.Red.600}")
    expect(lightFile.action["action-positive-subtle"]).toBeUndefined()
    expect(darkFile.action["action-destructive-subtle"]).toBeUndefined()
    expect(darkFile.action["action-brand"]?.$value).toBe("{Colors.Brand.600}")
    expect(darkFile.action["action-primary-subtle-hover"]?.$value).toBe("{Colors.Blue.950}")
    expect(darkFile.action["action-brand-subtle-active"]?.$value).toBe("{Colors.Brand.900}")
  })

  it("keeps filled Button content white and all published action aliases resolvable", () => {
    for (const mode of [lightFile, darkFile]) {
      expect(mode.text["text-on-color"]?.$value).toBe("{Colors.Base.White}")
      expect(mode.foreground["fg-on-color"]?.$value).toBe("{Colors.Base.White}")
      for (const intent of ["primary", "positive", "destructive"]) {
        for (const state of ["", "-hover", "-active"]) {
          const alias = mode.action[`action-${intent}${state}`]?.$value
          const match = /^\{Colors\.([^.]+)\.([^.]+)\}$/.exec(alias)
          expect(match, alias).not.toBeNull()
          if (!match) throw new Error(`Invalid action alias: ${alias}`)
          const background = colorPrimitives.Colors[match[1]!]?.[match[2]!]?.$value
          expect(background, alias).toMatch(/^#[0-9A-Fa-f]{6}$/)
        }
      }
    }

    expect(lightFile.text["text-link"]?.$value).toBe("{Color modes/action/action-primary}")
    expect(lightFile.text["text-link-hover"]?.$value).toBe(
      "{Color modes/action/action-primary-hover}",
    )
    expect(lightFile.text["text-link-active"]?.$value).toBe(
      "{Color modes/action/action-primary-active}",
    )
    expect(darkFile.text["text-link"]?.$value).toBe("{Color modes/action/action-primary}")
    expect(darkFile.foreground["fg-link"]?.$value).toBe("{Colors.Blue.600}")
    expect(darkFile.foreground["fg-link-hover"]?.$value).toBe("{Colors.Blue.500}")
    expect(darkFile.foreground["fg-link-active"]?.$value).toBe("{Colors.Blue.400}")
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
    expect(Object.keys(desktopTypographyFile["Font family"] ?? {})).toEqual(["body", "mono"])
  })

  it("uses Montserrat for body and Roboto Mono for mono font family tokens", () => {
    for (const file of [desktopTypographyFile, tabletTypographyFile, mobileTypographyFile]) {
      expect(file["Font family"].body?.$value).toBe("Montserrat")
      expect(file["Font family"].mono?.$value).toBe("Roboto Mono")
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
      expect(file["V-stack/tight"]?.$value).toBe("{spacing-xs}")
      expect(file["V-stack/default"]?.$value).toBe("{spacing-xl}")
      expect(file["V-stack/group"]?.$value).toBe("{spacing-3xl}")
      expect(file["H-stack/default"]?.$value).toBe("{spacing-lg}")
    }
  })

  it("uses responsive values for section spacing and container padding", () => {
    expect(desktopLayoutFile["V-stack/section"]?.$value).toBe("{spacing-8xl}")
    expect(tabletLayoutFile["V-stack/section"]?.$value).toBe("{spacing-7xl}")
    expect(mobileLayoutFile["V-stack/section"]?.$value).toBe("{spacing-6xl}")

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
    expect(desktopLayoutFile["V-stack/default"]?.$description).toBe(
      "Default vertical gap for component internals. Alias: spacing-xl.",
    )
    expect(desktopLayoutFile["V-stack/tight"]?.$description).toBe(
      "Dense vertical gap for tightly related elements. Alias: spacing-xs.",
    )
    expect(mobileLayoutFile["Container/padding"]?.$description).toBe(
      "Mobile horizontal container padding. Alias: spacing-xl.",
    )
    expect(desktopLayoutFile["Container/max-width"]?.$description).toBe("Maximum container width.")
  })
})

describe("figma spacing tokens", () => {
  const spacingFile = JSON.parse(readFileSync(join(root, "figma/spacing.json"), "utf-8")) as Record<
    string,
    { $value: string; $type: string; $description?: string }
  >

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
    expect(primitivesFile.Spacing["4 (16px)"]?.$description).toBe(
      "Primitive spacing step 4 (16px).",
    )
  })
})

describe("figma component-based button tokens", () => {
  type TokenLeaf = { $value: number | string; $type: string; $description?: string }
  type ButtonTokens = {
    Button: Record<string, Record<string, TokenLeaf | Record<string, TokenLeaf>>>
  }
  type TokenTree = TokenLeaf | Record<string, TokenLeaf | TokenTree>

  const lightFile = JSON.parse(
    readFileSync(join(root, "figma/component-button.json"), "utf-8"),
  ) as ButtonTokens

  function collectTokenValues(node: TokenTree, values: string[] = []) {
    if (!node || typeof node !== "object") return values
    if ("$value" in node && typeof node.$value === "string") {
      values.push(node.$value)
      return values
    }

    for (const value of Object.values(node)) {
      collectTokenValues(value as TokenTree, values)
    }

    return values
  }

  it("defines approved Button variants", () => {
    expect(Object.keys(lightFile.Button)).toEqual([
      "primary",
      "secondary",
      "outline",
      "ghost",
      "link",
      "positive",
      "destructive",
      "warning",
      "disabled",
      "size",
      "font-family",
    ])
  })

  it("aliases Button font family to body typography", () => {
    expect(lightFile.Button["font-family"]?.$value).toBe("{Typography/Font family/body}")
  })

  it("uses current semantic color alias paths for Button variables", () => {
    const aliases = collectTokenValues(lightFile).filter((value) =>
      value.startsWith("{Color modes/"),
    )

    expect(aliases.length).toBeGreaterThan(0)
    expect(aliases).not.toContain("{Color modes/action/primary}")
    expect(aliases).not.toContain("{Color modes/bg/surface}")
    expect(aliases).not.toContain("{Color modes/fg/primary}")

    for (const alias of aliases) {
      expect(alias).toMatch(
        /^\{Color modes\/(text\/text-|foreground\/fg-|background\/bg-|border\/border-|action\/action-|Effects\/Focus rings\/focus-ring)/,
      )
    }
  })

  it("aliases primary to action primary, not brand", () => {
    expect(lightFile.Button.primary.bg?.$value).toBe("{Color modes/action/action-primary}")
    expect(lightFile.Button.primary["bg-hover"]?.$value).toBe(
      "{Color modes/action/action-primary-hover}",
    )
    expect(lightFile.Button.primary["bg-active"]?.$value).toBe(
      "{Color modes/action/action-primary-active}",
    )
    expect(lightFile.Button.primary.text?.$value).toBe("{Color modes/text/text-on-color}")
    expect(lightFile.Button.primary.fg?.$value).toBe("{Color modes/foreground/fg-on-color}")
  })

  it("keeps explicit on-color content roles on every colored Button variant", () => {
    expect(lightFile.Button.focus).toBeUndefined()

    expect(lightFile.Button.positive.bg?.$value).toBe("{Color modes/action/action-positive}")
    expect(lightFile.Button.positive["bg-hover"]?.$value).toBe(
      "{Color modes/action/action-positive-hover}",
    )
    expect(lightFile.Button.destructive.bg?.$value).toBe("{Color modes/action/action-destructive}")
    expect(lightFile.Button.destructive["bg-hover"]?.$value).toBe(
      "{Color modes/action/action-destructive-hover}",
    )

    for (const variant of ["primary", "positive", "destructive"]) {
      const tokens = lightFile.Button[variant] as Record<string, TokenLeaf>
      expect(tokens.text?.$value).toBe("{Color modes/text/text-on-color}")
      expect(tokens.fg?.$value).toBe("{Color modes/foreground/fg-on-color}")
      expect(tokens["border-focus"]).toBeUndefined()
    }
  })

  it("uses one disabled opacity token for Button", () => {
    const lightDisabled = lightFile.Button.disabled as Record<string, TokenLeaf>

    expect(lightDisabled.opacity?.$value).toBe(50)

    for (const variant of [
      "primary",
      "secondary",
      "outline",
      "ghost",
      "link",
      "positive",
      "destructive",
    ]) {
      const tokens = lightFile.Button[variant] as Record<string, TokenLeaf>
      expect(tokens["bg-disabled"]).toBeUndefined()
      expect(tokens["text-disabled"]).toBeUndefined()
      expect(tokens["border-disabled"]).toBeUndefined()
    }
  })

  it("keeps link transparent and uses dedicated accessible content roles", () => {
    expect(lightFile.Button.link.bg?.$value).toBe("{Primitives/Colors/Base/Transparent}")
    expect(lightFile.Button.link["bg-hover"]?.$value).toBe("{Primitives/Colors/Base/Transparent}")
    expect(lightFile.Button.link.text?.$value).toBe("{Color modes/text/text-link}")
    expect(lightFile.Button.link["text-hover"]?.$value).toBe("{Color modes/text/text-link-hover}")
    expect(lightFile.Button.link.fg?.$value).toBe("{Color modes/foreground/fg-link}")
  })

  it("keeps outline transparent with an explicit optional surface token", () => {
    expect(lightFile.Button.outline.bg?.$value).toBe("{Primitives/Colors/Base/Transparent}")
    expect(lightFile.Button.outline["bg-surface"]?.$value).toBe(
      "{Color modes/background/bg-surface}",
    )
    expect(lightFile.Button.outline["border-hover"]?.$value).toBe(
      "{Color modes/border/border-neutral-muted}",
    )
    expect(lightFile.Button.outline["border-active"]?.$value).toBe(
      "{Color modes/border/border-neutral-muted}",
    )
  })

  it("defines size-specific geometry, internal spacing, and typography tokens", () => {
    const size = lightFile.Button.size as Record<string, Record<string, TokenLeaf>>

    expect(size.sm.height?.$value).toBe(28)
    expect(size.sm["padding-x"]?.$value).toBe("{Spacing/spacing-md}")
    expect(size.sm.gap?.$value).toBe("{Spacing/spacing-xs}")
    expect(size.sm["text-padding-x"]?.$value).toBe("{Spacing/spacing-xxs}")
    expect(size.sm.text?.$value).toBe("{Typography/Font size/text-sm}")
    expect(size.sm["line-height"]?.$value).toBe(14)
    expect(size.sm.weight?.$value).toBe("{Typography/Font weight/semibold}")
    expect(size.sm["icon-size"]?.$value).toBe(16)

    expect(size.md.height?.$value).toBe(36)
    expect(size.md["padding-x"]?.$value).toBe(14)
    expect(size.md.gap?.$value).toBe("{Spacing/spacing-sm}")
    expect(size.md["text-padding-x"]?.$value).toBe("{Spacing/spacing-xxs}")
    expect(size.md["icon-size"]?.$value).toBe(16)

    expect(size.lg.height?.$value).toBe(48)
    expect(size.lg["padding-x"]?.$value).toBe("{Spacing/spacing-2xl}")
    expect(size.lg.gap?.$value).toBe("{Spacing/spacing-xs}")
    expect(size.lg["text-padding-x"]?.$value).toBe("{Spacing/spacing-xs}")
    expect(size.lg.radius?.$value).toBe("{Radius/radius-sm}")
    expect(size.lg["icon-size"]?.$value).toBe(20)

    expect(size.xs["padding-x"]?.$value).toBe("{Spacing/spacing-sm}")
    expect(size.xs.gap?.$value).toBe("{Spacing/spacing-xxs}")
    expect(size.xs["text-padding-x"]?.$value).toBe("{Spacing/spacing-xxs}")
    expect(lightFile.Button["icon-only"]).toBeUndefined()
    for (const tokens of Object.values(size)) {
      expect(tokens["padding-x-icon"]).toBeUndefined()
    }
  })
})

describe("figma component-based input tokens", () => {
  type TokenLeaf = { $value: number | string; $type: string; $description?: string }
  type TokenTree = TokenLeaf | Record<string, TokenLeaf | TokenTree>
  type InputTokens = {
    Input: Record<string, TokenLeaf | Record<string, TokenLeaf | TokenTree>>
  }

  const lightFile = JSON.parse(
    readFileSync(join(root, "figma/component-input.json"), "utf-8"),
  ) as InputTokens

  function collectTokenValues(node: TokenTree, values: string[] = []) {
    if (!node || typeof node !== "object") return values
    if ("$value" in node && typeof node.$value === "string") {
      values.push(node.$value)
      return values
    }

    for (const value of Object.values(node)) {
      collectTokenValues(value as TokenTree, values)
    }

    return values
  }

  it("defines the core Input anatomy for Figma components", () => {
    expect(Object.keys(lightFile.Input)).toEqual([
      "bg",
      "text",
      "filled-text",
      "placeholder",
      "icon",
      "icon-hover",
      "border",
      "border-hover",
      "border-focus",
      "focus-ring",
      "focus-ring-offset",
      "focus-ring-width",
      "label",
      "hint",
      "error",
      "success",
      "disabled",
      "readonly",
      "size",
      "textarea",
      "font-family",
      "font-weight",
    ])
  })

  it("uses current semantic color alias paths for Input variables", () => {
    const aliases = collectTokenValues(lightFile as TokenTree).filter((value) =>
      value.startsWith("{Color modes/"),
    )

    expect(aliases.length).toBeGreaterThan(0)
    expect(aliases).not.toContain("{Color modes/bg/surface}")
    expect(aliases).not.toContain("{Color modes/fg/primary}")

    for (const alias of aliases) {
      expect(alias).toMatch(
        /^\{Color modes\/(text\/text-|foreground\/fg-|background\/bg-|border\/border-|action\/action-|Effects\/Focus rings\/focus-ring)/,
      )
    }
  })

  it("aliases surface, text, border, focus, status, and disabled states", () => {
    expect(lightFile.Input.bg?.$value).toBe("{Color modes/background/bg-surface}")
    expect(lightFile.Input.text?.$value).toBe("{Color modes/text/text-primary}")
    expect(lightFile.Input.placeholder?.$value).toBe("{Color modes/text/text-tertiary}")
    expect(lightFile.Input.icon?.$value).toBe("{Color modes/foreground/fg-tertiary}")
    expect(lightFile.Input.border?.$value).toBe("{Color modes/border/border-primary}")
    expect(lightFile.Input["border-focus"]?.$value).toBe(
      "{Color modes/Effects/Focus rings/focus-ring}",
    )
    expect(lightFile.Input["focus-ring"]?.$value).toBe(
      "{Color modes/Effects/Focus rings/focus-ring}",
    )

    const error = lightFile.Input.error as Record<string, TokenLeaf>
    const success = lightFile.Input.success as Record<string, TokenLeaf>
    const disabled = lightFile.Input.disabled as Record<string, TokenLeaf>
    const readonly = lightFile.Input.readonly as Record<string, TokenLeaf>

    expect(error.text?.$value).toBe("{Color modes/text/text-error}")
    expect(error.border?.$value).toBe("{Color modes/border/border-error-strong}")
    expect(success.hint?.$value).toBe("{Color modes/text/text-success}")
    expect(success.border?.$value).toBe("{Color modes/border/border-success-strong}")
    expect(disabled.bg?.$value).toBe("{Color modes/background/bg-disabled}")
    expect(disabled.opacity?.$value).toBe(100)
    expect(readonly.bg?.$value).toBe("{Color modes/background/bg-muted}")
  })

  it("defines Input size, typography, and textarea tokens", () => {
    const size = lightFile.Input.size as Record<string, Record<string, TokenLeaf>>
    const textarea = lightFile.Input.textarea as Record<
      string,
      TokenLeaf | Record<string, TokenLeaf>
    >
    const textareaSm = textarea.sm as Record<string, TokenLeaf>
    const textareaMd = textarea.md as Record<string, TokenLeaf>
    const textareaLg = textarea.lg as Record<string, TokenLeaf>

    expect(size.sm.height?.$value).toBe(28)
    expect(size.sm["padding-x"]?.$value).toBe(10)
    expect(size.sm.text?.$value).toBe("{Typography/Font size/text-sm}")
    expect(size.sm["line-height"]?.$value).toBe("{Typography/Line height/text-sm}")
    expect(size.sm.radius?.$value).toBe("{Radius/radius-xs}")
    expect(size.sm["icon-size"]?.$value).toBe(14)

    expect(size.md.height?.$value).toBe(36)
    expect(size.md["padding-x"]?.$value).toBe("{Spacing/spacing-lg}")
    expect(size.md.gap?.$value).toBe("{Spacing/spacing-sm}")
    expect(size.md["icon-size"]?.$value).toBe(16)

    expect(size.lg.height?.$value).toBe(48)
    expect(size.lg["padding-x"]?.$value).toBe("{Spacing/spacing-xl}")
    expect(size.lg.text?.$value).toBe("{Typography/Font size/text-md}")
    expect(size.lg.radius?.$value).toBe("{Radius/radius-sm}")
    expect(size.lg["icon-size"]?.$value).toBe(20)

    expect(textareaSm["min-height"]?.$value).toBe(88)
    expect(textareaMd["min-height"]?.$value).toBe(108)
    expect(textareaLg["min-height"]?.$value).toBe(128)
    expect((textarea["padding-y"] as TokenLeaf).$value).toBe(10)
    expect(lightFile.Input["font-family"]?.$value).toBe("{Typography/Font family/body}")
    expect(lightFile.Input["font-weight"]?.$value).toBe("{Typography/Font weight/regular}")
  })
})

describe("figma component-based utility tokens", () => {
  type TokenLeaf = { $value: number | string; $type: string; $description?: string }
  type TokenTree = TokenLeaf | Record<string, TokenLeaf | TokenTree>
  type ComponentUtilityTokens = {
    Utility: Record<string, TokenLeaf | Record<string, TokenLeaf | TokenTree>>
  }
  type ColorUtilityTokens = {
    utility: Record<string, TokenLeaf | Record<string, TokenLeaf | TokenTree>>
  }

  const componentFile = JSON.parse(
    readFileSync(join(root, "figma/component-utility.json"), "utf-8"),
  ) as ComponentUtilityTokens

  const lightFile = JSON.parse(
    readFileSync(join(root, "figma/colors-utility-light.json"), "utf-8"),
  ) as ColorUtilityTokens
  const darkFile = JSON.parse(
    readFileSync(join(root, "figma/colors-utility-dark.json"), "utf-8"),
  ) as ColorUtilityTokens

  function collectTokenPaths(node: TokenTree, prefix = "", paths: string[] = []) {
    if (!node || typeof node !== "object") return paths
    if ("$value" in node) {
      paths.push(prefix)
      return paths
    }

    for (const [key, value] of Object.entries(node)) {
      collectTokenPaths(value as TokenTree, prefix ? `${prefix}/${key}` : key, paths)
    }

    return paths
  }

  it("keeps utility Light and Dark paths aligned in Color modes", () => {
    expect(collectTokenPaths(lightFile.utility as TokenTree).sort()).toEqual(
      collectTokenPaths(darkFile.utility as TokenTree).sort(),
    )
  })

  it("keeps Component-based utility IDs as stable aliases to Color modes", () => {
    for (const [name, token] of Object.entries(componentFile.Utility)) {
      expect((token as TokenLeaf).$value, name).toBe(`{Color modes/utility/${name}}`)
    }
  })

  it("defines bg-{hue}-strong in both Color modes", () => {
    const hues = [
      "gray",
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
    ]
    for (const hue of hues) {
      const key = `bg-${hue}-strong`
      expect(darkFile.utility[key]).toBeDefined()
      expect((darkFile.utility[key] as TokenLeaf).$value).toBe(
        (lightFile.utility[key] as TokenLeaf).$value,
      )
    }
  })
})

// ── typography.css ─────────────────────────────────────────────────────────

describe("typography.css — font families", () => {
  const css = readFileSync(join(src, "typography.css"), "utf-8")

  it("defines font-body and font-mono", () => {
    expect(css).toContain("--font-body:")
    expect(css).toContain("--font-mono:")
    expect(css).toContain('"Montserrat", ui-sans-serif, system-ui, sans-serif')
    expect(css).toContain(
      'ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    )
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
    expect(fontFamily.mono).toContain("SF Mono")
    expect(fontFamily.mono).toContain("Consolas")
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
  const shadows = readFileSync(join(src, "shadows.css"), "utf-8")
  // Strip @import lines (already inlined above) and @theme wrappers
  // happy-dom doesn't process @theme — extract variable declarations directly
  const strip = (css: string) =>
    css.replace(/@import\s+["'][^"']+["'];/g, "").replace(/@theme\s*\{/g, ":root {")
  return [primitives, maxa, semantic, dimensions, typography, shadows].map(strip).join("\n")
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

  it("light mode: --color-bg-page is set", () => {
    document.documentElement.removeAttribute("data-theme")
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-page")
      .trim()
    expect(val).toBeTruthy()
    expect(val).not.toBe("")
  })

  it("light mode: --color-bg-surface differs from --color-bg-page (gray vs white)", () => {
    document.documentElement.removeAttribute("data-theme")
    const page = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-page")
      .trim()
    const surface = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-surface")
      .trim()
    expect(page).toBeTruthy()
    expect(surface).toBeTruthy()
    expect(page).not.toBe(surface)
  })

  it("dark mode: --color-bg-float differs from --color-bg-surface", () => {
    document.documentElement.setAttribute("data-theme", "dark")
    const surface = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-surface")
      .trim()
    const float = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-float")
      .trim()
    expect(surface).toBeTruthy()
    expect(float).toBeTruthy()
    expect(float).not.toBe(surface)
  })

  it("dark mode: --color-bg-page differs from light mode", () => {
    document.documentElement.removeAttribute("data-theme")
    const light = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-page")
      .trim()

    document.documentElement.setAttribute("data-theme", "dark")
    const dark = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-page")
      .trim()

    expect(dark).toBeTruthy()
    expect(dark).not.toBe(light)
  })

  it("dark mode: primitive brand scale remains stable", () => {
    document.documentElement.removeAttribute("data-theme")
    const light = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-brand-50")
      .trim()

    document.documentElement.setAttribute("data-theme", "dark")
    const dark = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-brand-50")
      .trim()

    expect(dark).toBe(light)
  })

  it("dark mode: --color-text-primary differs from light mode", () => {
    document.documentElement.removeAttribute("data-theme")
    const light = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-text-primary")
      .trim()

    document.documentElement.setAttribute("data-theme", "dark")
    const dark = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-text-primary")
      .trim()

    expect(dark).not.toBe(light)
  })
})
