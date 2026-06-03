import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Switch } from "./switch"

describe("Switch", () => {
  it("renders with role switch", () => {
    render(<Switch aria-label="Notifications" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("is unchecked by default", () => {
    render(<Switch aria-label="Notifications" />)
    expect(screen.getByRole("switch")).not.toBeChecked()
  })

  it("renders with defaultChecked", () => {
    render(<Switch aria-label="Notifications" defaultChecked />)
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("toggles on click", () => {
    const handler = vi.fn()
    render(<Switch aria-label="Notifications" onCheckedChange={handler} />)
    const sw = screen.getByRole("switch")
    fireEvent.click(sw)
    expect(handler).toHaveBeenCalledWith(true)
    expect(sw).toBeChecked()
  })

  it("renders controlled checked state", () => {
    render(<Switch aria-label="Notifications" checked onCheckedChange={() => {}} />)
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("applies size class md by default", () => {
    render(<Switch aria-label="Notifications" />)
    expect(screen.getByRole("switch")).toHaveClass("maxa-switch--md")
  })

  it("applies size class sm", () => {
    render(<Switch aria-label="Notifications" size="sm" />)
    expect(screen.getByRole("switch")).toHaveClass("maxa-switch--sm")
  })

  it("applies size class lg", () => {
    render(<Switch aria-label="Notifications" size="lg" />)
    expect(screen.getByRole("switch")).toHaveClass("maxa-switch--lg")
  })

  it("is disabled when disabled prop is set", () => {
    const handler = vi.fn()
    render(<Switch aria-label="Notifications" disabled onCheckedChange={handler} />)
    const sw = screen.getByRole("switch")
    expect(sw).toBeDisabled()
    fireEvent.click(sw)
    expect(handler).not.toHaveBeenCalled()
  })

  it("applies error state via data-error and aria-invalid", () => {
    render(<Switch aria-label="Notifications" error />)
    const sw = screen.getByRole("switch")
    expect(sw).toHaveAttribute("data-error")
    expect(sw).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to the underlying button element", () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>
    render(<Switch aria-label="Notifications" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("has no a11y violations", async () => {
    const { container } = render(<Switch aria-label="x" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
