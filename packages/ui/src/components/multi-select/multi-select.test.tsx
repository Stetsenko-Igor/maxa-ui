import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { MultiSelect } from "./multi-select"

const options = [
  { label: "PDF", value: "pdf" },
  { label: "PNG", value: "png" },
]

describe("MultiSelect", () => {
  it("renders selected chips", () => {
    const onValueChange = vi.fn()
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} onValueChange={onValueChange} />)
    expect(screen.getByText("PDF")).toBeInTheDocument()
    expect(screen.getByText("PNG")).toBeInTheDocument()
  })

  it("removes chips", () => {
    const onValueChange = vi.fn()
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} onValueChange={onValueChange} />)
    fireEvent.click(screen.getByRole("button", { name: "Remove PNG" }))
    expect(onValueChange).toHaveBeenCalledWith(["pdf"])
  })

  it("renders form error text", () => {
    render(<MultiSelect options={options} error="Choose at least one option" />)
    expect(screen.getByText("Choose at least one option")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute("aria-invalid", "true")
  })
})
