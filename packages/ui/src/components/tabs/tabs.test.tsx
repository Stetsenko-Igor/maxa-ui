import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { readFileSync } from "node:fs"
import path from "node:path"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

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

  it("keeps the trigger focus ring inside the clipped tab list", () => {
    const css = readFileSync(path.resolve(process.cwd(), "src/components/tabs/tabs.css"), "utf8")
    const focusRule = css.match(/\.maxa-tabs__trigger:focus-visible\s*\{([^}]*)\}/s)?.[1] ?? ""

    expect(focusRule).toMatch(/box-shadow:\s*inset\s+0\s+0\s+0\s+2px\s+var\(--color-focus-ring\)/)
    expect(focusRule).not.toMatch(/outline-offset:\s*[1-9]/)
  })
})
