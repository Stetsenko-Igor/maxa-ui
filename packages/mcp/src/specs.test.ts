import { describe, expect, it } from "vitest"

import { getFoundationSpec, getPatternSpec, listSpecs } from "./specs"
import { resolveRepoRoot } from "./repo"

const root = resolveRepoRoot()

describe("listSpecs", () => {
  const specs = listSpecs(root)

  it("includes all foundations", () => {
    const foundations = specs.filter((s) => s.kind === "foundation").map((s) => s.name)
    expect(foundations).toEqual(
      expect.arrayContaining(["breakpoints", "color", "icons", "motion", "radius", "shadows", "spacing", "typography"]),
    )
  })

  it("includes all patterns", () => {
    const patterns = specs.filter((s) => s.kind === "pattern").map((s) => s.name)
    expect(patterns).toEqual(
      expect.arrayContaining(["interactive-hierarchy", "toolbar-menus", "variant-vocabulary"]),
    )
  })

  it("includes the architecture spec", () => {
    const architecture = specs.find((s) => s.kind === "architecture")
    expect(architecture?.specPath).toBe("specs/architecture.md")
  })

  it("carries repo-relative paths and titles", () => {
    const color = specs.find((s) => s.name === "color")
    expect(color?.specPath).toBe("specs/foundations/color.md")
    expect(color?.title).toContain("Color")
  })

  it("does not expose excluded top-level files", () => {
    const names = specs.map((s) => s.name)
    expect(names).not.toContain("README")
    expect(names).not.toContain("tokens-reference")
    expect(names).not.toContain("core-gap-audit")
    expect(names).not.toContain("figma-code-connect-readiness")
    expect(names).not.toContain("maxadevs-fsd-coverage")
  })
})

describe("getFoundationSpec", () => {
  it("returns full markdown for an exact name", () => {
    const result = getFoundationSpec(root, "spacing")
    expect(result.name).toBe("spacing")
    expect(result.specPath).toBe("specs/foundations/spacing.md")
    expect(result.content).toContain("#")
  })

  it("resolves the colors alias to color.md", () => {
    // The docs route is /foundations/colors while the spec file is color.md.
    const result = getFoundationSpec(root, "colors")
    expect(result.name).toBe("color")
    expect(result.specPath).toBe("specs/foundations/color.md")
  })

  it("resolves singular input to a plural file", () => {
    expect(getFoundationSpec(root, "shadow").name).toBe("shadows")
    expect(getFoundationSpec(root, "breakpoint").name).toBe("breakpoints")
  })

  it("matches fuzzily: case-insensitive", () => {
    expect(getFoundationSpec(root, "Typography").name).toBe("typography")
  })

  it("returns valid names when nothing matches", () => {
    const result = getFoundationSpec(root, "nonexistent")
    expect(result.name).toBeNull()
    expect(result.content).toBeNull()
    expect(result.validNames).toContain("color")
  })
})

describe("getPatternSpec", () => {
  it("returns full markdown for an exact name", () => {
    const result = getPatternSpec(root, "interactive-hierarchy")
    expect(result.name).toBe("interactive-hierarchy")
    expect(result.content).toContain("One primary action per view")
  })

  it("matches fuzzily: case-insensitive and hyphen-insensitive", () => {
    expect(getPatternSpec(root, "InteractiveHierarchy").name).toBe("interactive-hierarchy")
    expect(getPatternSpec(root, "variant vocabulary").name).toBe("variant-vocabulary")
  })

  it("returns valid names when nothing matches", () => {
    const result = getPatternSpec(root, "nonexistent")
    expect(result.name).toBeNull()
    expect(result.validNames).toContain("toolbar-menus")
  })
})
