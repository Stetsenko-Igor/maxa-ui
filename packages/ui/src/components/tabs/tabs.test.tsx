import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { readFileSync } from "node:fs"
import path from "node:path"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const readCss = (relativePath: string) => readFileSync(path.resolve(process.cwd(), relativePath), "utf8")

function declarations(css: string) {
  return Object.fromEntries([...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)]
    .map((match) => [match[1], match[2].trim()]))
}

function scope(css: string, selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return css.match(new RegExp(escaped + "\\s*\\{([^}]*)\\}", "s"))?.[1] ?? ""
}

function resolveToken(name: string, maps: Array<Record<string, string>>): string {
  const value = maps.find((map) => map[name])?.[name] ?? ""
  const reference = value.match(/^var\((--[\w-]+)\)$/)?.[1]
  return reference ? resolveToken(reference, maps) : value
}

function contrastRatio(foreground: string, background: string) {
  const luminance = (hex: string) => {
    const channels = hex.slice(1).match(/.{2}/g)?.map((channel) => parseInt(channel, 16) / 255) ?? []
    const linear = channels.map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
  }
  const light = luminance(foreground)
  const dark = luminance(background)
  return (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05)
}

function Fixture() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Design sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("renders tabs and selected content", () => {
    render(<Fixture />)
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("data-state", "active")
    expect(screen.getByText("Overview content")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Fixture />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it("uses inward, theme-aware outlines for inactive and selected trigger focus", () => {
    const css = readCss("src/components/tabs/tabs.css")
    const inactive = css.match(/\.maxa-tabs__trigger:focus-visible\s*\{([^}]*)\}/s)?.[1] ?? ""
    const active = css.match(
      /\.maxa-tabs__trigger\[data-state="active"\]:focus-visible\s*\{([^}]*)\}/s,
    )?.[1] ?? ""

    expect(inactive).toMatch(/outline:\s*2px\s+solid\s+var\(--color-focus-ring\)/)
    expect(inactive).toMatch(/outline-offset:\s*-2px/)
    expect(active).toMatch(/outline-color:\s*var\(--tabs-trigger-text-active\)/)
    expect(inactive).not.toMatch(/box-shadow/)
  })

  it("restores a system focus outline in forced-colors mode", () => {
    const css = readCss("src/components/tabs/tabs.css")
    const forcedColors = css.match(/@media\s*\(forced-colors:\s*active\)\s*\{([\s\S]*)\}\s*$/)?.[1] ?? ""

    expect(forcedColors).toMatch(/\.maxa-tabs__trigger:focus-visible\s*\{[^}]*outline-color:\s*Highlight/s)
  })

  it("keeps selected focus contrast at or above 3 to 1 in both themes", () => {
    const tabsCss = readCss("../tokens/src/component-tabs.css")
    const semanticCss = readCss("../tokens/src/semantic.css")
    const primitives = declarations(readCss("../tokens/src/primitives.css"))
    const tabsRoot = declarations(scope(tabsCss, ":root"))
    const tabsDark = declarations(scope(tabsCss, '[data-theme="dark"]'))
    const semanticRoot = declarations(scope(semanticCss, ":root"))
    const semanticDark = declarations(scope(semanticCss, '[data-theme="dark"]'))

    for (const theme of ["light", "dark"] as const) {
      const maps = theme === "dark"
        ? [tabsDark, tabsRoot, semanticDark, semanticRoot, primitives]
        : [tabsRoot, semanticRoot, primitives]
      const focus = resolveToken("--tabs-trigger-text-active", maps)
      const background = resolveToken("--tabs-trigger-bg-active", maps)
      expect(contrastRatio(focus, background), theme).toBeGreaterThanOrEqual(3)
    }
  })
})
