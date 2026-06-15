import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { FOCUSABLE_SELECTOR, useFocusTrap } from "./use-focus-trap.js"

function Fixture({
  open,
  onEscape,
}: {
  open: boolean
  onEscape?: () => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { onKeyDown } = useFocusTrap(ref, open, { onEscape })
  if (!open) return null
  return (
    <div ref={ref} tabIndex={-1} onKeyDown={onKeyDown} data-testid="trap">
      <button data-testid="btn1">First</button>
      <button data-testid="btn2">Second</button>
    </div>
  )
}

describe("FOCUSABLE_SELECTOR", () => {
  it("is a non-empty CSS selector string", () => {
    expect(typeof FOCUSABLE_SELECTOR).toBe("string")
    expect(FOCUSABLE_SELECTOR.length).toBeGreaterThan(0)
  })
})

describe("useFocusTrap", () => {
  it("calls onEscape when Escape is pressed", () => {
    const onEscape = vi.fn()
    render(<Fixture open onEscape={onEscape} />)
    fireEvent.keyDown(screen.getByTestId("trap"), { key: "Escape" })
    expect(onEscape).toHaveBeenCalledTimes(1)
  })

  it("does not call onEscape when not provided", () => {
    render(<Fixture open />)
    // should not throw
    fireEvent.keyDown(screen.getByTestId("trap"), { key: "Escape" })
  })

  it("wraps focus to last on Shift+Tab from first element", () => {
    render(<Fixture open />)
    const btn1 = screen.getByTestId("btn1")
    const btn2 = screen.getByTestId("btn2")
    btn1.focus()
    fireEvent.keyDown(screen.getByTestId("trap"), { key: "Tab", shiftKey: true })
    expect(document.activeElement).toBe(btn2)
  })

  it("wraps focus to first on Tab from last element", () => {
    render(<Fixture open />)
    const btn1 = screen.getByTestId("btn1")
    const btn2 = screen.getByTestId("btn2")
    btn2.focus()
    fireEvent.keyDown(screen.getByTestId("trap"), { key: "Tab", shiftKey: false })
    expect(document.activeElement).toBe(btn1)
  })

  it("renders nothing when open=false", () => {
    render(<Fixture open={false} />)
    expect(screen.queryByTestId("trap")).toBeNull()
  })
})
