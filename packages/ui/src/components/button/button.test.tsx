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
    expect(btn).toHaveClass("maxa-button--primary", "maxa-button--lg")
  })

  it("applies variant classes", () => {
    const { rerender } = render(<Button variant="secondary">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--secondary")

    rerender(<Button variant="outline">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--outline")

    rerender(<Button variant="ghost">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--ghost")

    rerender(<Button variant="positive">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--positive")

    rerender(<Button variant="destructive">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--destructive")
  })

  it("applies size classes", () => {
    const { rerender } = render(<Button size="sm">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--sm")

    rerender(<Button size="lg">Test</Button>)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--lg")
  })

  it("scopes inverse controls without forwarding the styling prop to the DOM", () => {
    const { rerender } = render(
      <Button variant="ghost" colorScheme="inverse" hasBackground>
        Navigation
      </Button>,
    )
    expect(screen.getByRole("button")).toHaveClass(
      "maxa-button--inverse",
      "maxa-button--has-background",
    )
    expect(screen.getByRole("button")).not.toHaveAttribute("colorScheme")
    rerender(
      <Button variant="outline" colorScheme="inverse" loading>
        Navigation
      </Button>,
    )
    expect(screen.getByRole("button").querySelector(".maxa-spinner")).toHaveClass(
      "maxa-spinner--white",
    )
    rerender(
      <Button asChild variant="ghost" colorScheme="inverse">
        <a href="/">Home</a>
      </Button>,
    )
    expect(screen.getByRole("link")).toHaveClass("maxa-button--inverse")
    expect(screen.getByRole("link")).not.toHaveAttribute("colorScheme")
  })

  it("supports outlined destructive actions without changing filled destructive loading", () => {
    const { rerender } = render(
      <Button variant="destructive-outline" loading>
        Cancel request
      </Button>,
    )
    const button = screen.getByRole("button")
    expect(button).toHaveClass("maxa-button--destructive-outline")
    expect(button).toBeDisabled()
    expect(button.querySelector(".maxa-spinner")).toHaveClass("maxa-spinner--greyscale")
    rerender(
      <Button variant="destructive" loading>
        Delete
      </Button>,
    )
    expect(screen.getByRole("button").querySelector(".maxa-spinner")).toHaveClass(
      "maxa-spinner--white",
    )
  })

  it("adds the Figma background layer to outline and ghost variants", () => {
    const { rerender } = render(
      <Button variant="outline" hasBackground>
        Test
      </Button>,
    )
    expect(screen.getByRole("button")).toHaveClass(
      "maxa-button--outline",
      "maxa-button--has-background",
    )

    rerender(
      <Button variant="ghost" hasBackground>
        Test
      </Button>,
    )
    expect(screen.getByRole("button")).toHaveClass(
      "maxa-button--ghost",
      "maxa-button--has-background",
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
    expect(spinner).toHaveClass("maxa-spinner", "maxa-spinner--white")
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

    expect(css).toContain("--button-gap-current: var(--button-size-md-gap)")
    expect(css).toContain("--button-label-padding-x-current: var(--button-size-md-text-padding-x)")
    expect(css).toMatch(/\.maxa-button__label\s*\{[^}]*padding-inline:/s)
    expect(css).toMatch(/\.maxa-button--link\s*\{[^}]*padding:\s*0;[^}]*height:\s*auto;/s)
    expect(css).not.toContain("padding-x-icon")
    expect(css).not.toContain("button-icon-only-")
    expect(css).toMatch(
      /\.maxa-button--xs\.maxa-button--link\s*\{[^}]*gap:\s*var\(--spacing-xs\);/s,
    )
    expect(css).toMatch(/\.maxa-button--md\.maxa-button--link,[\s\S]*gap:\s*var\(--spacing-md\);/s)
  })

  it("matches the Figma link underline, focus ring, and loading spinner sizing", () => {
    const css = readFileSync(resolve(process.cwd(), "src/components/button/button.css"), "utf8")

    expect(css).toMatch(
      /\.maxa-button--link \.maxa-button__label\s*\{[^}]*text-decoration:\s*underline;/s,
    )
    expect(css).toMatch(
      /\.maxa-button:focus-visible\s*\{[^}]*box-shadow:\s*0 0 0 var\(--button-focus-ring-inner-width\) var\(--color-bg-surface\),\s*0 0 0 var\(--button-focus-ring-width\) var\(--color-focus-ring\);/s,
    )
    expect(css).toMatch(
      /\.maxa-button--md \.maxa-button__spinner\s*\{[^}]*width:\s*var\(--button-size-md-icon-size\);[^}]*height:\s*var\(--button-size-md-icon-size\);/s,
    )
  })

  it("uses the Figma spinner appearance for neutral and link loading states", () => {
    const { rerender } = render(
      <Button variant="secondary" loading>
        Loading
      </Button>,
    )
    expect(screen.getByRole("button").querySelector(".maxa-button__spinner")).toHaveClass(
      "maxa-spinner--greyscale",
    )

    rerender(
      <Button variant="link" loading>
        Loading
      </Button>,
    )
    expect(screen.getByRole("button").querySelector(".maxa-button__spinner")).toHaveClass(
      "maxa-spinner--primary",
    )
  })

  it("exposes only the seven Button types present in Figma", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/button/button.tsx"), "utf8")
    const css = readFileSync(resolve(process.cwd(), "src/components/button/button.css"), "utf8")

    expect(source).not.toContain('warning: "maxa-button--warning"')
    expect(source).not.toContain("outlineSurface")
    expect(css).not.toContain(".maxa-button--warning")
    expect(css).not.toContain("maxa-button--outline-surface")
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
