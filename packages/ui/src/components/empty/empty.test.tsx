import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Empty } from "./empty"

describe("Empty", () => {
  it("renders title, description, icon, and actions", () => {
    render(
      <Empty
        icon={<svg />}
        title="Scheduled Post Not Found"
        description="Try another search."
        action={<button type="button">Clear search</button>}
      />,
    )
    expect(screen.getByRole("heading", { name: "Scheduled Post Not Found" })).toBeInTheDocument()
    expect(screen.getByText("Try another search.")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument()
  })

  it("supports sizes", () => {
    render(<Empty title="No designs" size="lg" />)
    expect(screen.getByText("No designs").closest(".maxa-empty")).toHaveClass("maxa-empty--lg")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Empty title="No designs" description="Create a design to get started." />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
