/* Cross-layer regression test.                                        */
/* Verifies every TS token name in base-tokens.tsx maps to a defined  */
/* CSS variable in @maxa/tokens. Catches silent drift like the        */
/* "surface-layer1" bug where a TS type referenced a CSS var that      */
/* never existed (Surface component rendered with no background).      */

import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { Box } from "./index"
import { render } from "@testing-library/react"

const tokensSrc = join(import.meta.dirname, "..", "..", "tokens", "src")

function injectThemeCSS() {
  const files = [
    "primitives.css",
    "themes/maxa.css",
    "semantic.css",
    "dimensions.css",
    "typography.css",
    "shadows.css",
    "component-button.css",
    "component-checkbox.css",
    "component-input.css",
    "component-nav.css",
    "component-radio.css",
  ]
  const content = files
    .map((f) => readFileSync(join(tokensSrc, f), "utf-8"))
    .join("\n")
    .replace(/@import\s+["'][^"']+["'];/g, "")
    .replace(/@theme\s*\{/g, ":root {")
  const style = document.createElement("style")
  style.textContent = content
  document.head.appendChild(style)
  return style
}

const backgroundTokens = [
  "page",
  "surface",
  "float",
  "muted",
  "overlay",
  "inverse",
  "disabled",
  "neutral-subtle",
  "neutral-on-subtle",
  "neutral-strong",
  "brand-subtle",
  "brand-surface",
  "brand-strong",
  "info-subtle",
  "info-surface",
  "info-strong",
  "success-subtle",
  "success-surface",
  "success-strong",
  "error-subtle",
  "error-surface",
  "error-strong",
  "warning-subtle",
  "warning-surface",
  "warning-strong",
] as const

const borderTokens = [
  "primary",
  "secondary",
  "tertiary",
  "focus",
  "brand",
  "error",
  "info-strong",
  "success-strong",
  "warning-strong",
  "neutral-strong",
  "neutral-subtle",
] as const

const textTokens = [
  "primary",
  "secondary",
  "tertiary",
  "disabled",
  "inverse",
  "on-brand",
  "brand",
  "info",
  "success",
  "error",
  "warning",
] as const

const foregroundTokens = [
  "primary",
  "secondary",
  "tertiary",
  "disabled",
  "inverse",
  "on-brand",
  "brand",
  "info",
  "positive",
  "negative",
  "warning",
] as const

describe("base-tokens cross-layer drift", () => {
  let styleEl: HTMLStyleElement

  beforeAll(() => {
    styleEl = injectThemeCSS()
  })

  afterAll(() => {
    styleEl.remove()
  })

  it.each(backgroundTokens)("--color-bg-%s resolves to a non-empty value", (name) => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-bg-${name}`)
      .trim()
    expect(value, `expected --color-bg-${name} to be defined in tokens CSS`).toBeTruthy()
  })

  it.each(borderTokens)("--color-border-%s resolves to a non-empty value", (name) => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-border-${name}`)
      .trim()
    expect(value, `expected --color-border-${name} to be defined in tokens CSS`).toBeTruthy()
  })

  it.each(textTokens)("--color-text-%s resolves to a non-empty value", (name) => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-text-${name}`)
      .trim()
    expect(value, `expected --color-text-${name} to be defined in tokens CSS`).toBeTruthy()
  })

  it.each(foregroundTokens)("--color-fg-%s resolves to a non-empty value", (name) => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-fg-${name}`)
      .trim()
    expect(value, `expected --color-fg-${name} to be defined in tokens CSS`).toBeTruthy()
  })

  it.each(backgroundTokens)("Box background=%s renders with the matching CSS var", (name) => {
    const { container } = render(<Box background={name} data-testid="box" />)
    const style = container.firstElementChild?.getAttribute("style") ?? ""
    expect(style).toContain(`background-color: var(--color-bg-${name})`)
  })

  it.each(foregroundTokens)("Box foreground=%s renders with the matching CSS var", (name) => {
    const { container } = render(<Box foreground={name} data-testid="box" />)
    const style = container.firstElementChild?.getAttribute("style") ?? ""
    expect(style).toContain(`color: var(--color-fg-${name})`)
  })
})
