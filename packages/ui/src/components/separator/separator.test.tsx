import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Separator } from "./separator"

describe("Separator", () => {
  it("renders with the base class", () => {
    render(<Separator data-testid="sep" />)
    const el = document.querySelector(".maxa-separator")
    expect(el).toBeInTheDocument()
  })

  it("defaults to horizontal orientation", () => {
    render(<Separator />)
    expect(document.querySelector(".maxa-separator")).toHaveAttribute(
      "data-orientation",
      "horizontal",
    )
  })

  it("applies vertical orientation", () => {
    render(<Separator orientation="vertical" />)
    expect(document.querySelector(".maxa-separator")).toHaveAttribute(
      "data-orientation",
      "vertical",
    )
  })

  it("is decorative by default (role=none)", () => {
    render(<Separator />)
    const el = document.querySelector(".maxa-separator")
    expect(el).toHaveAttribute("role", "none")
  })

  it("exposes role=separator when not decorative", () => {
    render(<Separator decorative={false} />)
    const el = document.querySelector(".maxa-separator")
    expect(el).toHaveAttribute("role", "separator")
  })

  it("sets aria-orientation when non-decorative and vertical", () => {
    render(<Separator decorative={false} orientation="vertical" />)
    const el = document.querySelector(".maxa-separator")
    expect(el).toHaveAttribute("role", "separator")
    expect(el).toHaveAttribute("aria-orientation", "vertical")
  })

  it("forwards ref", () => {
    let node: HTMLElement | null = null
    render(<Separator ref={(el) => { node = el }} />)
    expect(node).not.toBeNull()
    expect(node).toHaveClass("maxa-separator")
  })

  it("merges custom className", () => {
    render(<Separator className="custom" />)
    expect(document.querySelector(".maxa-separator")).toHaveClass("custom")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Separator decorative={false} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
