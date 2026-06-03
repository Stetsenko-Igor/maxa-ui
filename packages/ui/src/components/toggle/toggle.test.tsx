import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Toggle } from "./toggle"

describe("Toggle", () => {
  it("renders with role switch", () => {
    render(<Toggle aria-label="Notifications" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("is unchecked by default", () => {
    render(<Toggle aria-label="Notifications" />)
    expect(screen.getByRole("switch")).not.toBeChecked()
  })

  it("renders with defaultChecked", () => {
    render(<Toggle aria-label="Notifications" defaultChecked />)
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("toggles on click", () => {
    const handler = vi.fn()
    render(<Toggle aria-label="Notifications" onCheckedChange={handler} />)
    const toggle = screen.getByRole("switch")
    fireEvent.click(toggle)
    expect(handler).toHaveBeenCalledWith(true)
    expect(toggle).toBeChecked()
  })

  it("renders controlled checked state", () => {
    render(<Toggle aria-label="Notifications" checked onCheckedChange={() => {}} />)
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("uses the single md visual size", () => {
    render(<Toggle aria-label="Notifications" />)
    expect(screen.getByRole("switch")).toHaveClass("maxa-toggle")
    expect(screen.getByRole("switch")).not.toHaveClass("maxa-toggle--sm")
    expect(screen.getByRole("switch")).not.toHaveClass("maxa-toggle--lg")
  })

  it("is disabled when disabled prop is set", () => {
    const handler = vi.fn()
    render(<Toggle aria-label="Notifications" disabled onCheckedChange={handler} />)
    const toggle = screen.getByRole("switch")
    expect(toggle).toBeDisabled()
    fireEvent.click(toggle)
    expect(handler).not.toHaveBeenCalled()
  })

  it("applies error state via data-error and aria-invalid", () => {
    render(<Toggle aria-label="Notifications" error />)
    const toggle = screen.getByRole("switch")
    expect(toggle).toHaveAttribute("data-error")
    expect(toggle).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to the underlying button element", () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>
    render(<Toggle aria-label="Notifications" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("has no a11y violations", async () => {
    const { container } = render(<Toggle aria-label="x" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
