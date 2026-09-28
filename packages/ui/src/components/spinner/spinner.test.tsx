import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { Spinner } from "./spinner"

describe("Spinner", () => {
  it("renders status by default", () => {
    render(<Spinner label="Loading designs" />)
    expect(screen.getByRole("status", { name: "Loading designs" })).toHaveClass("maxa-spinner")
  })

  it("supports sizes", () => {
    render(<Spinner size="xl" label="Loading" />)
    expect(screen.getByRole("status")).toHaveClass("maxa-spinner--xl")
  })

  it("renders xl at 40px with a 4px stroke", () => {
    const componentCss = readFileSync(join(import.meta.dirname, "spinner.css"), "utf-8")
    const tokenCss = readFileSync(
      join(import.meta.dirname, "../../../..", "tokens/src/component-spinner.css"),
      "utf-8",
    )

    expect(componentCss).toMatch(
      /\.maxa-spinner--xl\s*{[^}]*width:\s*var\(--spinner-size-xl\);[^}]*height:\s*var\(--spinner-size-xl\);[^}]*border-width:\s*var\(--spinner-stroke-width-xl\);[^}]*}/s,
    )
    expect(tokenCss).toContain("--spinner-size-xl: 40px;")
    expect(tokenCss).toContain("--spinner-stroke-width-xl: 4px;")
  })

  it("supports appearances", () => {
    render(<Spinner appearance="inverted" label="Loading" />)
    expect(screen.getByRole("status")).toHaveClass("maxa-spinner--inverted")
  })

  it("can be decorative", () => {
    render(<Spinner decorative data-testid="spinner" />)
    const spinner = screen.getByTestId("spinner")
    expect(spinner).toHaveAttribute("aria-hidden", "true")
    expect(screen.queryByRole("status")).toBeNull()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner label="Loading dashboard" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
