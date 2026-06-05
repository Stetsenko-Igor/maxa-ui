import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Divider } from "./divider"

describe("Divider", () => {
  it("renders with the base class", () => {
    render(<Divider data-testid="divider" />)
    const el = document.querySelector(".maxa-divider")
    expect(el).toBeInTheDocument()
  })

  it("defaults to horizontal orientation", () => {
    render(<Divider />)
    expect(document.querySelector(".maxa-divider")).toHaveAttribute(
      "data-orientation",
      "horizontal",
    )
  })

  it("applies vertical orientation", () => {
    render(<Divider orientation="vertical" />)
    expect(document.querySelector(".maxa-divider")).toHaveAttribute(
      "data-orientation",
      "vertical",
    )
  })

  it("is decorative by default (role=none)", () => {
    render(<Divider />)
    const el = document.querySelector(".maxa-divider")
    expect(el).toHaveAttribute("role", "none")
  })

  it("exposes role=separator when not decorative", () => {
    render(<Divider decorative={false} />)
    const el = document.querySelector(".maxa-divider")
    expect(el).toHaveAttribute("role", "separator")
  })

  it("sets aria-orientation when non-decorative and vertical", () => {
    render(<Divider decorative={false} orientation="vertical" />)
    const el = document.querySelector(".maxa-divider")
    expect(el).toHaveAttribute("role", "separator")
    expect(el).toHaveAttribute("aria-orientation", "vertical")
  })

  it("forwards ref", () => {
    let node: HTMLElement | null = null
    render(<Divider ref={(el) => { node = el }} />)
    expect(node).not.toBeNull()
    expect(node).toHaveClass("maxa-divider")
  })

  it("merges custom className", () => {
    render(<Divider className="custom" />)
    expect(document.querySelector(".maxa-divider")).toHaveClass("custom")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Divider decorative={false} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
