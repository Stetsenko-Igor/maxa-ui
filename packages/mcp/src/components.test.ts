import { describe, expect, it } from "vitest"

import { getComponentSpec, listComponents, readSpecStatus } from "./components"
import { resolveRepoRoot } from "./repo"

const root = resolveRepoRoot()

describe("readSpecStatus", () => {
  it("reads an explicit Status line near the top", () => {
    expect(readSpecStatus("# Badge\nStatus: implemented\n## Purpose")).toBe("implemented")
    expect(readSpecStatus("# Tag\nStatus: implemented  \n")).toBe("implemented")
  })

  it("returns null when no Status line exists in the header", () => {
    expect(readSpecStatus("# Button\n## Overview\nNo status here")).toBeNull()
  })

  it("ignores Status mentions deep in the body", () => {
    const body = "# Avatar\n" + "line\n".repeat(20) + "Status: online dot\n"
    expect(readSpecStatus(body)).toBeNull()
  })
})

describe("listComponents", () => {
  const components = listComponents(root)

  it("includes components from both specs and ui implementation", () => {
    const names = components.map((c) => c.name)
    expect(names).toContain("button")
    expect(names).toContain("date-picker")
    expect(names).toContain("toast")
  })

  it("includes spec path and implementation flag", () => {
    const button = components.find((c) => c.name === "button")
    expect(button?.specPath).toBe("specs/components/button.md")
    expect(button?.hasImplementation).toBe(true)
  })

  it("uses the explicit Status line when present", () => {
    const tag = components.find((c) => c.name === "tag")
    expect(tag?.status).toBe("implemented")
  })

  it("infers implemented status from the ui directory when no Status line", () => {
    const button = components.find((c) => c.name === "button")
    expect(button?.status).toBe("implemented")
  })
})

describe("getComponentSpec", () => {
  it("returns full markdown for an exact name", () => {
    const result = getComponentSpec(root, "button")
    expect(result.name).toBe("button")
    expect(result.specPath).toBe("specs/components/button.md")
    expect(result.content).toContain("# Button")
  })

  it("matches fuzzily: case-insensitive and hyphen-insensitive", () => {
    expect(getComponentSpec(root, "DatePicker").name).toBe("date-picker")
    expect(getComponentSpec(root, "date picker").name).toBe("date-picker")
    expect(getComponentSpec(root, "BUTTON").name).toBe("button")
  })

  it("returns valid names when nothing matches", () => {
    const result = getComponentSpec(root, "nonexistent-widget")
    expect(result.content).toBeNull()
    expect(result.validNames).toContain("button")
    expect(result.validNames.length).toBeGreaterThan(10)
  })
})
