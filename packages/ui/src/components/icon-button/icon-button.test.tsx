import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { IconButton } from "./icon-button"

describe("IconButton", () => {
  it("renders with required aria-label", () => {
    render(<IconButton icon={<svg data-testid="icon" />} aria-label="Add item" />)
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument()
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("applies icon-only class", () => {
    render(<IconButton icon={<svg />} aria-label="Close" />)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--icon-only")
  })

  it("applies size class", () => {
    const { rerender } = render(<IconButton icon={<svg />} aria-label="Test" size="sm" />)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--sm")

    rerender(<IconButton icon={<svg />} aria-label="Test" size="lg" />)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--lg")
  })

  it("applies variant class", () => {
    render(<IconButton icon={<svg />} aria-label="Test" variant="ghost" />)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--ghost")
  })

  it("is disabled when disabled prop is set", () => {
    render(<IconButton icon={<svg />} aria-label="Test" disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("defaults to md size", () => {
    render(<IconButton icon={<svg />} aria-label="Test" />)
    expect(screen.getByRole("button")).toHaveClass("maxa-button--md")
  })
})
