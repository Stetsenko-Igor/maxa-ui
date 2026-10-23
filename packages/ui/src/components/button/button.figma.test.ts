import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

/**
 * Keeps the Code Connect template honest.
 *
 * A Code Connect template is a promise to designers: select this component in
 * Figma, get this code. Nothing in Figma or in the compiler checks that promise
 * against the real component, so it rots silently - a variant added here, a
 * variant renamed there, and Dev Mode starts handing people snippets that do
 * not compile.
 *
 * These assertions compare the template's mappings against the actual cva
 * definition in button.tsx and against the Figma property list recorded from
 * get_context_for_code_connect on 2026-10-23.
 */
const here = join(import.meta.dirname ?? __dirname)
const template = readFileSync(join(here, "button.figma.ts"), "utf-8")
const source = readFileSync(join(here, "button.tsx"), "utf-8")

/** Figma "🟢 Button v3", node 11020:118515, read 2026-10-23. */
const FIGMA_TYPE_OPTIONS = [
  "Primary",
  "Secondary",
  "Outline",
  "Ghost",
  "Positive",
  "Destructive",
  "Link",
]
const FIGMA_SIZE_OPTIONS = ["lg - 40", "md - 36", "sm - 28", "xs - 24"]
const FIGMA_STATE_OPTIONS = ["Default", "Hover", "Active", "Focus", "Loading", "Disabled"]

/** Variants the code intentionally has without a Figma counterpart yet. */
const CODE_ONLY_VARIANTS = ["destructive-outline"]

function mappingBlock(name: string): Record<string, string> {
  const re = new RegExp(`getEnum\\("${name}",\\s*\\{([^}]*)\\}`, "s")
  const body = re.exec(template)?.[1]
  if (!body) throw new Error(`No getEnum mapping for "${name}" in button.figma.ts`)
  const out: Record<string, string> = {}
  for (const m of body.matchAll(/"?([^",:\s][^",:]*?)"?\s*:\s*"?([\w-]+)"?\s*,/g)) {
    out[m[1].trim()] = m[2].trim()
  }
  return out
}

function cvaOptions(group: string): string[] {
  const re = new RegExp(`${group}:\\s*\\{([^}]*)\\}`, "s")
  const body = re.exec(source)?.[1] ?? ""
  return [...body.matchAll(/^\s*"?([\w-]+)"?\s*:/gm)].map((m) => m[1])
}

describe("Button Code Connect template", () => {
  const typeMapping = mappingBlock("Type")
  const sizeMapping = mappingBlock("📐 Size")
  const stateMapping = mappingBlock("State")
  const codeVariants = cvaOptions("variant")
  const codeSizes = cvaOptions("size")

  it("maps every Figma Type option", () => {
    // An unmapped option silently resolves to undefined and emits variant="undefined".
    expect(Object.keys(typeMapping).sort()).toEqual([...FIGMA_TYPE_OPTIONS].sort())
  })

  it("maps every Figma Size option", () => {
    expect(Object.keys(sizeMapping).sort()).toEqual([...FIGMA_SIZE_OPTIONS].sort())
  })

  it("maps every Figma State option", () => {
    expect(Object.keys(stateMapping).sort()).toEqual([...FIGMA_STATE_OPTIONS].sort())
  })

  it("only emits variants the component actually accepts", () => {
    for (const mapped of Object.values(typeMapping)) {
      expect(codeVariants, `variant "${mapped}" is not defined in button.tsx`).toContain(mapped)
    }
  })

  it("only emits sizes the component actually accepts", () => {
    for (const mapped of Object.values(sizeMapping)) {
      expect(codeSizes, `size "${mapped}" is not defined in button.tsx`).toContain(mapped)
    }
  })

  it("records every code variant that Figma cannot produce", () => {
    // The point of this one: when a variant is added in code before it exists in
    // Figma, this test fails and forces the gap to be acknowledged rather than
    // discovered months later by a designer.
    const uncovered = codeVariants.filter((v) => !Object.values(typeMapping).includes(v))
    expect(uncovered.sort()).toEqual([...CODE_ONLY_VARIANTS].sort())
  })

  it("renders Hover, Active and Focus as the default state", () => {
    // These are browser-owned rendering states; emitting a prop for them would
    // produce code that does not exist.
    for (const s of ["Hover", "Active", "Focus", "Default"]) {
      expect(stateMapping[s]).toBe("default")
    }
    expect(stateMapping.Loading).toBe("loading")
    expect(stateMapping.Disabled).toBe("disabled")
  })

  it("emits only props declared by the component", () => {
    const emitted = [...template.matchAll(/^\s{2}(\w+)(?:=|$)/gm)].map((m) => m[1])
    const declared = [
      ...cvaOptions("variants").length ? [] : [],
      "variant",
      "size",
      "iconOnly",
      "hasBackground",
      "fullWidth",
      "colorScheme",
      "loading",
      "disabled",
      "iconLeading",
      "iconTrailing",
      "asChild",
    ]
    for (const prop of emitted) {
      expect(declared, `template emits unknown prop "${prop}"`).toContain(prop)
    }
  })

  it("imports from the public package entry", () => {
    expect(template).toContain('import { Button } from "@maxa/ui"')
  })
})
