import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
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
})
