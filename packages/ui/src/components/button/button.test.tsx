import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Button } from "./button"

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole("button", { name: "Click me" })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveClass("maxa-button--primary", "maxa-button--md")
  })

  it("applies variant classes", () => {
    const { rerender } = render(<Button variant="secondary">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--secondary")

    rerender(<Button variant="outline">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--outline")

    rerender(<Button variant="ghost">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--ghost")

    rerender(<Button variant="danger">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--danger")
  })

  it("applies size classes", () => {
    const { rerender } = render(<Button size="sm">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--sm")

    rerender(<Button size="lg">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--lg")
  })

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Test</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true")
  })

  it("is disabled and shows spinner when loading", () => {
    render(<Button loading>Test</Button>)
    const btn = screen.getByRole("button")
    expect(btn).toBeDisabled()
    expect(btn.querySelector(".maxa-button__spinner")).toBeInTheDocument()
  })

  it("renders leading and trailing icons", () => {
    render(
      <Button
        iconLeading={<svg data-testid="lead" />}
        iconTrailing={<svg data-testid="trail" />}
      >
        Test
      </Button>,
    )
    expect(screen.getByTestId("lead")).toBeInTheDocument()
    expect(screen.getByTestId("trail")).toBeInTheDocument()
  })

  it("renders as a different element via asChild", () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>,
    )
    const link = screen.getByRole("link", { name: "Link button" })
    expect(link).toHaveClass("maxa-button--primary")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Submit</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it("has no a11y violations in dark mode", async () => {
    const { container } = render(
      <div data-theme="dark">
        <Button>Submit</Button>
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
