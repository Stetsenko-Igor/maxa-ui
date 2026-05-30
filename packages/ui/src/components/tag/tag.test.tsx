import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Tag } from "./tag"

describe("Tag", () => {
  it("renders children", () => {
    render(<Tag>Segment</Tag>)
    expect(screen.getByText("Segment")).toBeInTheDocument()
  })

  it("applies default appearance=grey, emphasis=low, size=md", () => {
    render(<Tag>Default</Tag>)
    const el = document.querySelector(".maxa-tag")
    expect(el).toHaveClass("maxa-tag--md")
    expect(el).toHaveAttribute("data-appearance", "grey")
    expect(el).toHaveAttribute("data-emphasis", "low")
  })

  it("sets data-appearance and data-emphasis", () => {
    render(<Tag appearance="violet" emphasis="medium">List</Tag>)
    const el = document.querySelector(".maxa-tag")
    expect(el).toHaveAttribute("data-appearance", "violet")
    expect(el).toHaveAttribute("data-emphasis", "medium")
  })

  it("applies size classes", () => {
    const { rerender } = render(<Tag size="sm">S</Tag>)
    expect(document.querySelector(".maxa-tag")).toHaveClass("maxa-tag--sm")
    rerender(<Tag size="lg">L</Tag>)
    expect(document.querySelector(".maxa-tag")).toHaveClass("maxa-tag--lg")
  })

  it("renders leading icon aria-hidden", () => {
    render(<Tag icon={<svg data-testid="icon" />}>Label</Tag>)
    expect(screen.getByTestId("icon").parentElement).toHaveClass("maxa-tag__icon")
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true")
  })

  it("does not render remove button when removable is false", () => {
    render(<Tag>No Remove</Tag>)
    expect(document.querySelector(".maxa-tag__remove")).toBeNull()
  })

  it("renders remove button with aria-label when removable", () => {
    render(<Tag removable>Audience</Tag>)
    const btn = screen.getByRole("button", { name: "Remove Audience" })
    expect(btn).toHaveClass("maxa-tag__remove")
  })

  it("fires onRemove when remove button clicked", () => {
    const onRemove = vi.fn()
    render(<Tag removable onRemove={onRemove}>Segment</Tag>)
    fireEvent.click(screen.getByRole("button", { name: "Remove Segment" }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it("remove button stopsPropagation", () => {
    const parentClick = vi.fn()
    const onRemove = vi.fn()
    render(
      <div onClick={parentClick}>
        <Tag removable onRemove={onRemove}>Label</Tag>
      </div>,
    )
    fireEvent.click(screen.getByRole("button", { name: "Remove Label" }))
    expect(onRemove).toHaveBeenCalled()
    expect(parentClick).not.toHaveBeenCalled()
  })

  it("asChild renders via Slot without remove button (even if removable set)", () => {
    render(
      <Tag asChild appearance="blue" removable>
        <a href="/x">Link tag</a>
      </Tag>,
    )
    const link = screen.getByRole("link", { name: "Link tag" })
    expect(link).toHaveClass("maxa-tag")
    expect(link).toHaveAttribute("data-appearance", "blue")
    expect(document.querySelector(".maxa-tag__remove")).toBeNull()
  })

  it("merges custom className", () => {
    render(<Tag className="custom">X</Tag>)
    expect(document.querySelector(".maxa-tag")).toHaveClass("custom")
  })
})
