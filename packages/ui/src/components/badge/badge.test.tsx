import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Badge } from "./badge"

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("applies default intent=neutral, emphasis=low, size=md", () => {
    render(<Badge>Default</Badge>)
    const el = document.querySelector(".maxa-badge")
    expect(el).toHaveClass("maxa-badge--md")
    expect(el).toHaveAttribute("data-intent", "neutral")
    expect(el).toHaveAttribute("data-emphasis", "low")
  })

  it("sets data-intent and data-emphasis attributes", () => {
    render(
      <Badge intent="success" emphasis="high">
        Verified
      </Badge>,
    )
    const el = document.querySelector(".maxa-badge")
    expect(el).toHaveAttribute("data-intent", "success")
    expect(el).toHaveAttribute("data-emphasis", "high")
  })

  it("applies size class sm", () => {
    render(<Badge size="sm">Small</Badge>)
    expect(document.querySelector(".maxa-badge")).toHaveClass("maxa-badge--sm")
  })

  it("applies size class lg", () => {
    render(<Badge size="lg">Large</Badge>)
    expect(document.querySelector(".maxa-badge")).toHaveClass("maxa-badge--lg")
  })

  it("renders leading icon, hidden from a11y tree", () => {
    render(
      <Badge icon={<svg data-testid="lead" />}>Label</Badge>,
    )
    const icon = screen.getByTestId("lead").parentElement
    expect(icon).toHaveClass("maxa-badge__icon--leading")
    expect(icon).toHaveAttribute("aria-hidden", "true")
  })

  it("renders trailing icon, hidden from a11y tree", () => {
    render(
      <Badge trailingIcon={<svg data-testid="trail" />}>Label</Badge>,
    )
    const icon = screen.getByTestId("trail").parentElement
    expect(icon).toHaveClass("maxa-badge__icon--trailing")
    expect(icon).toHaveAttribute("aria-hidden", "true")
  })

  it("merges custom className", () => {
    render(<Badge className="extra">X</Badge>)
    expect(document.querySelector(".maxa-badge")).toHaveClass("extra")
  })

  it("sets data-appearance when appearance prop provided", () => {
    render(<Badge appearance="violet">List</Badge>)
    const el = document.querySelector(".maxa-badge")
    expect(el).toHaveAttribute("data-appearance", "violet")
    expect(el).not.toHaveAttribute("data-intent")
  })

  it("does not set data-appearance when prop absent", () => {
    render(<Badge>Label</Badge>)
    expect(document.querySelector(".maxa-badge")).not.toHaveAttribute("data-appearance")
  })

  it("renders as child element when asChild is set", () => {
    render(
      <Badge asChild intent="info">
        <a href="/x">Link badge</a>
      </Badge>,
    )
    const link = screen.getByRole("link", { name: "Link badge" })
    expect(link).toHaveClass("maxa-badge")
    expect(link).toHaveAttribute("data-intent", "info")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge intent="success">Verified</Badge>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it("has no a11y violations in dark mode", async () => {
    const { container } = render(
      <div data-theme="dark">
        <Badge intent="success">Verified</Badge>
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
