import { describe, expect, it } from "vitest"
import {
  canonicalizeAliasPath,
  diffBundles,
  normalizeCssColor,
  normalizeHex,
  normalizeScopes,
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
    expect(canonicalizeAliasPath(repoBundle, "Component-based", "{Colors.Blue.950}")).toBe(
      "Primitives/Colors/Blue/950",
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

describe("normalizeCssColor", () => {
  it("quantizes rgba() to hex8 exactly like the plugin exporter", () => {
    expect(normalizeCssColor("rgba(27, 26, 26, 0.5)")).toBe("#1B1A1A80")
    expect(normalizeCssColor("rgba(0, 0, 0, 0.72)")).toBe("#000000B8")
    expect(normalizeCssColor("rgba(255, 255, 255, 0.45)")).toBe("#FFFFFF73")
  })

  it("treats rgb() and opaque rgba() as 6-digit hex", () => {
    expect(normalizeCssColor("rgb(255, 255, 255)")).toBe("#FFFFFF")
    expect(normalizeCssColor("rgba(255, 255, 255, 1)")).toBe("#FFFFFF")
  })

  it("normalizes hex case and strips redundant FF alpha", () => {
    expect(normalizeCssColor("#1b1a1a80")).toBe("#1B1A1A80")
    expect(normalizeCssColor("#ffffffff")).toBe("#FFFFFF")
  })

  it("passes through non-color strings untouched", () => {
    expect(normalizeCssColor("transparent")).toBe("transparent")
    expect(normalizeCssColor("{Colors.Neutral.900}")).toBe("{Colors.Neutral.900}")
  })
})

describe("normalizeScopes", () => {
  it("treats [] and ['ALL_SCOPES'] as equivalent", () => {
    expect(normalizeScopes([])).toEqual(normalizeScopes(["ALL_SCOPES"]))
  })

  it("sorts and deduplicates", () => {
    expect(normalizeScopes(["TEXT_FILL", "GAP", "TEXT_FILL"])).toEqual(["GAP", "TEXT_FILL"])
  })

  it("keeps a real restriction distinct from ALL_SCOPES", () => {
    expect(normalizeScopes(["TEXT_FILL"])).not.toEqual(normalizeScopes(["ALL_SCOPES"]))
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

  it("treats rgba() and its quantized hex8 as the same color", () => {
    expect(
      valuesEquivalent(
        ctx(exportBundle, "Color modes", "#1b1a1a80"),
        ctx(repoBundle, "Color modes", "rgba(27, 26, 26, 0.5)"),
      ),
    ).toBe(true)
    expect(
      valuesEquivalent(
        ctx(exportBundle, "Color modes", "#000000b8"),
        ctx(repoBundle, "Color modes", "rgba(0, 0, 0, 0.72)"),
      ),
    ).toBe(true)
  })

  it("ignores hex case and opaque alpha", () => {
    expect(
      valuesEquivalent(
        ctx(exportBundle, "Primitives", "#2d2d2eff"),
        ctx(repoBundle, "Primitives", "#2D2D2E"),
      ),
    ).toBe(true)
  })

  it("flags a real color difference", () => {
    expect(
      valuesEquivalent(
        ctx(exportBundle, "Primitives", "#1B1A1A80"),
        ctx(repoBundle, "Primitives", "rgba(27, 26, 26, 0.6)"),
      ),
    ).toBe(false)
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
  function makeBundles({ exportedTokens, currentTokens, exportedModes, currentModes, exportedMeta, currentMeta }) {
    const exported = {
      aliasDefaults: {},
      collections: {
        Primitives: { modes: { Value: {} } },
        "Component-based": {
          modes: exportedModes ?? { Default: exportedTokens ?? {} },
          ...(exportedMeta ?? {}),
        },
      },
    }
    const current = {
      aliasDefaults: { "Component-based": "Primitives" },
      collections: {
        Primitives: { modes: { Value: {} } },
        "Component-based": {
          modes: currentModes ?? { Default: currentTokens ?? {} },
          ...(currentMeta ?? {}),
        },
      },
    }
    return { exported, current }
  }

  it("reports zero changes when only representation differs", () => {
    const { exported, current } = makeBundles({
      exportedTokens: {
        "Checkbox/color/bg-checked": "{Primitives/Colors/Neutral/900}",
        "Alert/color/info/bg": "#e0f2ff",
        "Dialog/overlay-bg": "#1b1a1a80",
      },
      currentTokens: {
        "Checkbox/color/bg-checked": "{Colors.Neutral.900}",
        "Alert/color/info/bg": "#E0F2FF",
        "Dialog/overlay-bg": "rgba(27, 26, 26, 0.5)",
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
    expect(report.counts.values).toBe(1)
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
    expect(report.counts.modes).toBe(3)
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

  it("reports a collection missing from the export instead of skipping it", () => {
    const exported = { collections: { Primitives: { modes: { Value: {} } } } }
    const current = {
      collections: {
        Primitives: { modes: { Value: {} } },
        "Color modes": { modes: { Light: { "text/text-primary": "#000000" } } },
      },
    }
    const report = diffBundles(exported, current)
    const missing = report.collections.find((c) => c.name === "Color modes")
    expect(missing.modeNotes[0]).toContain("MISSING from the Figma export")
    expect(report.counts.collections).toBe(1)
  })

  it("reports type drift exactly", () => {
    const token = { "Checkbox/color/bg": "#FFFFFF" }
    const { exported, current } = makeBundles({
      exportedTokens: token,
      currentTokens: token,
      exportedMeta: { types: { "Checkbox/color/bg": "STRING" } },
      currentMeta: { types: { "Checkbox/color/bg": "COLOR" } },
    })
    const report = diffBundles(exported, current)
    expect(report.counts.types).toBe(1)
    expect(report.collections[0].typeLines[0]).toContain('"COLOR" -> "STRING"')
  })

  it("treats [] vs ['ALL_SCOPES'] and scope ordering as equivalent", () => {
    const token = { "Checkbox/color/bg": "#FFFFFF" }
    const { exported, current } = makeBundles({
      exportedTokens: token,
      currentTokens: token,
      exportedMeta: { scopes: { "Checkbox/color/bg": ["ALL_SCOPES"] } },
      currentMeta: { scopes: { "Checkbox/color/bg": [] } },
    })
    expect(diffBundles(exported, current).counts.scopes).toBe(0)

    const { exported: e2, current: c2 } = makeBundles({
      exportedTokens: token,
      currentTokens: token,
      exportedMeta: { scopes: { "Checkbox/color/bg": ["STROKE_COLOR", "SHAPE_FILL"] } },
      currentMeta: { scopes: { "Checkbox/color/bg": ["SHAPE_FILL", "STROKE_COLOR"] } },
    })
    expect(diffBundles(e2, c2).counts.scopes).toBe(0)
  })

  it("reports a real scope difference with both values", () => {
    const token = { "Checkbox/color/bg": "#FFFFFF" }
    const { exported, current } = makeBundles({
      exportedTokens: token,
      currentTokens: token,
      exportedMeta: { scopes: { "Checkbox/color/bg": ["ALL_SCOPES"] } },
      currentMeta: { scopes: { "Checkbox/color/bg": ["SHAPE_FILL", "STROKE_COLOR"] } },
    })
    const report = diffBundles(exported, current)
    expect(report.counts.scopes).toBe(1)
    const line = report.collections[0].scopeLines[0]
    expect(line).toContain("Checkbox/color/bg")
    expect(line).toContain("SHAPE_FILL")
    expect(line).toContain("ALL_SCOPES")
  })

  it("reports description drift after trimming whitespace", () => {
    const token = { "Checkbox/color/bg": "#FFFFFF" }
    const { exported, current } = makeBundles({
      exportedTokens: token,
      currentTokens: token,
      exportedMeta: { descriptions: { "Checkbox/color/bg": "  Checkbox surface.  " } },
      currentMeta: { descriptions: { "Checkbox/color/bg": "Checkbox surface." } },
    })
    expect(diffBundles(exported, current).counts.descriptions).toBe(0)

    const { exported: e2, current: c2 } = makeBundles({
      exportedTokens: token,
      currentTokens: token,
      exportedMeta: { descriptions: { "Checkbox/color/bg": "New wording." } },
      currentMeta: { descriptions: { "Checkbox/color/bg": "Old wording." } },
    })
    const report = diffBundles(e2, c2)
    expect(report.counts.descriptions).toBe(1)
    expect(report.collections[0].descriptionLines[0]).toContain('"Old wording." -> "New wording."')
  })

  it("keeps per-kind counts separated in the report", () => {
    const { exported, current } = makeBundles({
      exportedTokens: { "Checkbox/color/bg": "#FFFFFF" },
      currentTokens: { "Checkbox/color/bg": "#000000" },
      exportedMeta: {
        types: { "Checkbox/color/bg": "COLOR" },
        scopes: { "Checkbox/color/bg": ["ALL_SCOPES"] },
        descriptions: { "Checkbox/color/bg": "New." },
      },
      currentMeta: {
        types: { "Checkbox/color/bg": "COLOR" },
        scopes: { "Checkbox/color/bg": ["SHAPE_FILL"] },
        descriptions: { "Checkbox/color/bg": "Old." },
      },
    })
    const report = diffBundles(exported, current)
    expect(report.counts).toEqual({ collections: 0, modes: 0, values: 1, types: 0, scopes: 1, descriptions: 1 })
    expect(report.totalChanges).toBe(3)
  })
})

describe("normalizeValue", () => {
  it("prefixes alias and color namespaces so they can never collide", () => {
    expect(normalizeValue(repoBundle, "Color modes", "{Colors.Neutral.900}")).toMatch(/^alias:/)
    expect(normalizeValue(repoBundle, "Color modes", "#2A2A2B")).toMatch(/^color:/)
    expect(normalizeValue(repoBundle, "Color modes", "rgba(0, 0, 0, 0.72)")).toBe("color:#000000B8")
  })
})
