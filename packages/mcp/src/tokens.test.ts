import { describe, expect, it } from "vitest"

import { resolveRepoRoot } from "./repo"
import {
  loadTokens,
  normalizeTokenName,
  parseCssTokens,
  resolveChain,
  searchTokens,
  type TokenMap,
} from "./tokens"

const SAMPLE_CSS = `
/* comment with --not-a-token: #fff; inside */
@theme {
  --color-neutral-950: #0a0a0a;
  --color-brand-600: #31e5c2;
}

:root {
  --color-text-primary: var(--color-neutral-950);
  --button-primary-bg: var(--color-brand-600);
  --spacing-md: 16px;
}

[data-theme="dark"] {
  --color-text-primary: var(--color-base-white);
  --color-brand-600: #1de2bc;
}
`

function sampleMap(): TokenMap {
  const map: TokenMap = new Map()
  for (const entry of parseCssTokens(SAMPLE_CSS, "sample.css")) {
    map.set(entry.name, entry)
  }
  return map
}

describe("parseCssTokens", () => {
  it("parses declarations from @theme and :root blocks", () => {
    const map = sampleMap()
    expect(map.get("--color-neutral-950")?.light).toBe("#0a0a0a")
    expect(map.get("--spacing-md")?.light).toBe("16px")
    expect(map.get("--button-primary-bg")?.light).toBe("var(--color-brand-600)")
  })

  it("tracks dark overrides from [data-theme=dark] blocks", () => {
    const map = sampleMap()
    const textPrimary = map.get("--color-text-primary")
    expect(textPrimary?.light).toBe("var(--color-neutral-950)")
    expect(textPrimary?.dark).toBe("var(--color-base-white)")
    expect(map.get("--color-brand-600")?.dark).toBe("#1de2bc")
    expect(map.get("--spacing-md")?.dark).toBeUndefined()
  })

  it("ignores tokens inside comments and records source file", () => {
    const map = sampleMap()
    expect(map.has("--not-a-token")).toBe(false)
    expect(map.get("--spacing-md")?.sourceFile).toBe("sample.css")
  })
})

describe("searchTokens", () => {
  it("is case-insensitive substring search with total count", () => {
    const map = sampleMap()
    const result = searchTokens(map, "COLOR")
    expect(result.total).toBe(3)
    expect(result.matches.map((m) => m.name)).toContain("--color-text-primary")
  })

  it("caps results at the limit but reports full total", () => {
    const map = sampleMap()
    const result = searchTokens(map, "-", 2)
    expect(result.matches).toHaveLength(2)
    expect(result.total).toBe(5)
  })
})

describe("normalizeTokenName", () => {
  it("adds the leading -- when missing", () => {
    expect(normalizeTokenName("spacing-md")).toBe("--spacing-md")
    expect(normalizeTokenName("--spacing-md")).toBe("--spacing-md")
  })
})

describe("resolveChain", () => {
  it("follows var() references to the raw value", () => {
    const map = sampleMap()
    const chain = resolveChain(map, map.get("--color-text-primary")?.light, "light")
    expect(chain).toEqual([{ name: "--color-neutral-950", value: "#0a0a0a" }])
  })

  it("uses dark values when resolving in dark mode", () => {
    const map = sampleMap()
    const chain = resolveChain(map, map.get("--button-primary-bg")?.light, "dark")
    expect(chain).toEqual([{ name: "--color-brand-600", value: "#1de2bc" }])
  })

  it("marks unknown references and stops", () => {
    const map = sampleMap()
    const chain = resolveChain(map, "var(--does-not-exist)", "light")
    expect(chain).toEqual([{ name: "--does-not-exist", value: "(not found)" }])
  })

  it("guards against cycles and respects max depth", () => {
    const map: TokenMap = new Map()
    map.set("--a", { name: "--a", light: "var(--b)", sourceFile: "x.css" })
    map.set("--b", { name: "--b", light: "var(--a)", sourceFile: "x.css" })
    const chain = resolveChain(map, "var(--a)", "light")
    expect(chain.map((s) => s.name)).toEqual(["--a", "--b"])
  })
})

describe("loadTokens (real repo)", () => {
  it("loads tokens from packages/tokens/src including theme dark overrides", () => {
    const tokens = loadTokens(resolveRepoRoot())
    expect(tokens.size).toBeGreaterThan(100)
    const brand = tokens.get("--color-brand-600")
    expect(brand?.light).toBeTruthy()
    expect(brand?.dark).toBeTruthy()
    expect(brand?.sourceFile).toContain("packages/tokens/src")
  })
})
