import { describe, expect, it } from "vitest"
import {
  canonicalizeAliasPath,
  diffBundles,
  normalizeHex,
  normalizeValue,
  valuesEquivalent,
} from "./diff-figma-export.mjs"

// Minimal bundle shells. The repo bundle uses dot shorthand + aliasDefaults;
// a live Figma export always emits fully-qualified `{Collection/path}` aliases.
const repoBundle = {
  aliasDefaults: {
    Spacing: "Primitives",
    "Color modes": "Primitives",
    "Component-based": "Primitives",
    Layout: "Spacing",
  },
  collections: {
    Primitives: { modes: { Value: {} } },
    Spacing: { modes: { Value: {} } },
    "Color modes": { modes: { Light: {}, Dark: {} } },
    "Component-based": { modes: { Default: {} } },
  },
}

const exportBundle = {
  aliasDefaults: {},
  collections: {
    Primitives: { modes: { Value: {} } },
    Spacing: { modes: { Value: {} } },
    "Color modes": { modes: { Light: {}, Dark: {} } },
    "Component-based": { modes: { Default: {} } },
  },
}

describe("canonicalizeAliasPath", () => {
  it("keeps an explicit collection prefix as-is", () => {
    expect(canonicalizeAliasPath(exportBundle, "Component-based", "{Primitives/Colors/Neutral/900}")).toBe(
      "Primitives/Colors/Neutral/900",
    )
    expect(canonicalizeAliasPath(exportBundle, "Component-based", "{Color modes/control/control-checked}")).toBe(
      "Color modes/control/control-checked",
    )
  })

  it("resolves dot shorthand through aliasDefaults", () => {
    expect(canonicalizeAliasPath(repoBundle, "Color modes", "{Colors.Neutral.900}")).toBe(
      "Primitives/Colors/Neutral/900",
    )
    expect(canonicalizeAliasPath(repoBundle, "Component-based", "{Colors.Status.Info.950}")).toBe(
      "Primitives/Colors/Status/Info/950",
    )
  })

  it("resolves a same-collection slash path against the current collection", () => {
    expect(canonicalizeAliasPath(repoBundle, "Component-based", "{Utility/bg-red-strong}")).toBe(
      "Component-based/Utility/bg-red-strong",
    )
  })

  it("resolves a bare name through aliasDefaults", () => {
    expect(canonicalizeAliasPath(repoBundle, "Layout", "{spacing-xl}")).toBe("Spacing/spacing-xl")
  })
})

describe("normalizeHex", () => {
  it("uppercases hex", () => {
    expect(normalizeHex("#2d2d2e")).toBe("#2D2D2E")
  })

  it("strips a redundant opaque alpha channel", () => {
    expect(normalizeHex("#2d2d2eff")).toBe("#2D2D2E")
    expect(normalizeHex("#2D2D2EFF")).toBe("#2D2D2E")
  })

  it("keeps a meaningful alpha channel", () => {
    expect(normalizeHex("#2d2d2e80")).toBe("#2D2D2E80")
  })

  it("passes through non-hex values untouched", () => {
    expect(normalizeHex("transparent")).toBe("transparent")
  })
})

describe("valuesEquivalent", () => {
  const ctx = (bundle, collectionName, value) => ({ bundle, collectionName, value })

  it("treats dot shorthand and full path as the same alias target", () => {
    expect(
      valuesEquivalent(
        ctx(exportBundle, "Color modes", "{Primitives/Colors/Neutral/900}"),
        ctx(repoBundle, "Color modes", "{Colors.Neutral.900}"),
      ),
    ).toBe(true)
  })

  it("treats same-collection and fully-qualified component aliases as equal", () => {
    expect(
      valuesEquivalent(
        ctx(exportBundle, "Component-based", "{Component-based/Utility/bg-red-strong}"),
        ctx(repoBundle, "Component-based", "{Utility/bg-red-strong}"),
      ),
    ).toBe(true)
  })

  it("flags different alias targets as different", () => {
    expect(
      valuesEquivalent(
        ctx(exportBundle, "Color modes", "{Primitives/Colors/Neutral/950}"),
        ctx(repoBundle, "Color modes", "{Colors.Neutral.900}"),
      ),
    ).toBe(false)
  })

  it("ignores hex case and opaque alpha", () => {
    expect(
      valuesEquivalent(
        ctx(exportBundle, "Primitives", "#2d2d2eff"),
        ctx(repoBundle, "Primitives", "#2D2D2E"),
      ),
    ).toBe(true)
  })

  it("does not equate an alias with the hex it happens to resolve to", () => {
    expect(
      valuesEquivalent(
        ctx(exportBundle, "Color modes", "{Primitives/Colors/Neutral/900}"),
        ctx(repoBundle, "Color modes", "#2A2A2B"),
      ),
    ).toBe(false)
  })

  it("tolerates float drift in numbers", () => {
    expect(valuesEquivalent(ctx(exportBundle, "Spacing", 16.0000001), ctx(repoBundle, "Spacing", 16))).toBe(true)
    expect(valuesEquivalent(ctx(exportBundle, "Spacing", 16.5), ctx(repoBundle, "Spacing", 16))).toBe(false)
  })
})

describe("diffBundles", () => {
  function makeBundles({ exportedTokens, currentTokens, exportedModes, currentModes }) {
    const exported = {
      aliasDefaults: {},
      collections: {
        "Component-based": { modes: exportedModes ?? { Default: exportedTokens ?? {} } },
      },
    }
    const current = {
      aliasDefaults: { "Component-based": "Primitives" },
      collections: {
        Primitives: { modes: { Value: {} } },
        "Component-based": { modes: currentModes ?? { Default: currentTokens ?? {} } },
      },
    }
    return { exported, current }
  }

  it("reports zero changes when only representation differs", () => {
    const { exported, current } = makeBundles({
      exportedTokens: {
        "Checkbox/color/bg-checked": "{Primitives/Colors/Neutral/900}",
        "Alert/color/info/bg": "#e0f2ff",
      },
      currentTokens: {
        "Checkbox/color/bg-checked": "{Colors.Neutral.900}",
        "Alert/color/info/bg": "#E0F2FF",
      },
    })
    expect(diffBundles(exported, current).totalChanges).toBe(0)
  })

  it("reports a real value change", () => {
    const { exported, current } = makeBundles({
      exportedTokens: { "Checkbox/color/bg-checked": "{Primitives/Colors/Neutral/950}" },
      currentTokens: { "Checkbox/color/bg-checked": "{Colors.Neutral.900}" },
    })
    const report = diffBundles(exported, current)
    expect(report.totalChanges).toBe(1)
    expect(report.collections[0].lines[0]).toContain("Checkbox/color/bg-checked")
  })

  it("collapses a stale legacy mode into one structural note instead of per-token noise", () => {
    const tokens = { "Checkbox/color/bg-checked": "{Primitives/Colors/Neutral/900}" }
    const { exported, current } = makeBundles({
      exportedModes: { Light: tokens, Dark: tokens },
      currentModes: { Default: { "Checkbox/color/bg-checked": "{Colors.Neutral.900}" } },
    })
    const report = diffBundles(exported, current)
    const componentReport = report.collections.find((c) => c.name === "Component-based")
    expect(componentReport.modeNotes).toHaveLength(3) // Light + Dark stale, Default missing
    expect(componentReport.lines).toHaveLength(0) // no shared modes -> no token noise
  })

  it("reports added and removed tokens within a shared mode", () => {
    const { exported, current } = makeBundles({
      exportedTokens: { "Checkbox/color/new-token": "#FFFFFF" },
      currentTokens: { "Checkbox/color/old-token": "#000000" },
    })
    const report = diffBundles(exported, current)
    const lines = report.collections[0].lines.join("\n")
    expect(lines).toContain("NEW in Figma")
    expect(lines).toContain("REMOVED in Figma")
  })
})
