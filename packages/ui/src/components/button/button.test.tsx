import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, it, expect, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
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

    rerender(<Button variant="destructive">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--destructive")
  })

  it("applies size classes", () => {
    const { rerender } = render(<Button size="sm">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--sm")

    rerender(<Button size="lg">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--lg")
  })

  it("adds the optional surface class without changing the outline variant", () => {
    render(
      <Button variant="outline" outlineSurface>
        Test
      </Button>,
    )
    expect(screen.getByRole("button")).toHaveClass(
      "maxa-button--outline",
      "maxa-button--outline-surface",
    )
  })

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Test</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true")
  })

  it("is disabled and shows spinner when loading", () => {
    const onClick = vi.fn()
    render(
      <div style={{ "--button-disabled-opacity": "0.5" } as React.CSSProperties}>
        <Button loading onClick={onClick}>
          Saving
        </Button>
      </div>,
    )
    const btn = screen.getByRole("button")
    const spinner = btn.querySelector(".maxa-button__spinner")
    const label = btn.querySelector(".maxa-button__label")

    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute("aria-busy", "true")
    expect(btn).toHaveAttribute("data-icon-leading")
    expect(btn).not.toHaveAttribute("data-icon-trailing")
    expect(spinner).toBeInTheDocument()
    expect(label).toHaveTextContent("Saving")
    expect(spinner?.nextElementSibling).toBe(label)

    fireEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("keeps the loading state fully opaque", () => {
    const css = readFileSync(resolve(process.cwd(), "src/components/button/button.css"), "utf8")

    expect(css).toMatch(/\.maxa-button\[data-loading="true"\]\s*\{[^}]*opacity:\s*1;/s)
  })

  it("renders leading and trailing icons", () => {
    render(
      <Button iconLeading={<svg data-testid="lead" />} iconTrailing={<svg data-testid="trail" />}>
        Test
      </Button>,
    )
    const btn = screen.getByRole("button")
    expect(btn).toHaveAttribute("data-icon-leading")
    expect(btn).toHaveAttribute("data-icon-trailing")
    expect(screen.getByTestId("lead")).toBeInTheDocument()
    expect(screen.getByTestId("trail")).toBeInTheDocument()
  })

  it("does not mark icon edges when no icons are rendered", () => {
    render(<Button>Test</Button>)
    const btn = screen.getByRole("button")
    expect(btn).not.toHaveAttribute("data-icon-leading")
    expect(btn).not.toHaveAttribute("data-icon-trailing")
  })

  it("renders as a different element via asChild", () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>,
    )
    const link = screen.getByRole("link", { name: "Link button" })
    expect(link).toHaveClass("maxa-button--primary")
    expect(link).toHaveAttribute("data-as-child", "true")
  })

  it("implements the v3 optical spacing without icon-edge token branches", () => {
    const css = readFileSync(resolve(process.cwd(), "src/components/button/button.css"), "utf8")

    expect(css).toContain("--button-label-padding-x-current: var(--spacing-xxs)")
    expect(css).toMatch(/\.maxa-button__label\s*\{[^}]*padding-inline:/s)
    expect(css).toMatch(/\.maxa-button--link\s*\{[^}]*padding:\s*0;[^}]*height:\s*auto;/s)
    expect(css).not.toContain("padding-x-icon")
    expect(css).not.toContain("button-icon-only-")
    expect(css).not.toContain("button-size-md-gap")
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
