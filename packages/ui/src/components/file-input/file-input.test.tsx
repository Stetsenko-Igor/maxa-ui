import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"
import { FileInput } from "./file-input"

function file(name: string, size = 128, type = "text/plain") {
  return new File(["x".repeat(size)], name, { type })
}

function nativeInput() {
  return document.querySelector('input[type="file"]') as HTMLInputElement
}

describe("FileInput", () => {
  it("renders a label-associated control with default button and placeholder", () => {
    render(<FileInput label="Default Package" />)

    expect(screen.getByText("Default Package")).toHaveAttribute("for")
    expect(screen.getByText("Choose File")).toBeInTheDocument()
    expect(screen.getByText("No File Chosen")).toBeInTheDocument()
  })

  it("supports custom button label and placeholder", () => {
    render(<FileInput label="Logo" buttonLabel="Browse" placeholder="Pick an image" />)

    expect(screen.getByText("Browse")).toBeInTheDocument()
    expect(screen.getByText("Pick an image")).toBeInTheDocument()
  })

  it("emits the selected file and shows its name (filled state)", () => {
    const onFileChange = vi.fn()
    render(<FileInput label="Upload" onFileChange={onFileChange} />)

    const selected = file("brand.pdf", 2048, "application/pdf")
    fireEvent.change(nativeInput(), { target: { files: [selected] } })

    expect(onFileChange).toHaveBeenCalledWith(selected)
    expect(screen.getByText("brand.pdf")).toBeInTheDocument()
    expect(document.querySelector(".maxa-file-input")).toHaveClass("maxa-file-input--filled")
  })

  it("renders a controlled file name", () => {
    render(<FileInput label="Upload" fileName="report.csv" />)

    expect(screen.getByText("report.csv")).toBeInTheDocument()
    expect(document.querySelector(".maxa-file-input")).toHaveClass("maxa-file-input--filled")
  })

  it("applies the error state", () => {
    render(<FileInput label="Upload" error="File is required" />)

    expect(screen.getByText("File is required")).toHaveAttribute("role", "alert")
    expect(nativeInput()).toHaveAttribute("aria-invalid", "true")
    expect(document.querySelector(".maxa-file-input")).toHaveClass("maxa-file-input--error")
  })

  it("blocks selection when disabled", () => {
    const onFileChange = vi.fn()
    render(<FileInput label="Upload" disabled onFileChange={onFileChange} />)

    expect(nativeInput()).toBeDisabled()
    expect(document.querySelector(".maxa-file-input")).toHaveClass("maxa-file-input--disabled")
    expect(document.querySelector(".maxa-file-input")).toHaveClass("maxa-file-input--blocked")
  })

  it("clears the selected file via the remove button", () => {
    const onFileChange = vi.fn()
    render(<FileInput label="Upload" onFileChange={onFileChange} />)

    const selected = file("brand.pdf", 1024, "application/pdf")
    fireEvent.change(nativeInput(), { target: { files: [selected] } })
    expect(screen.getByText("brand.pdf")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Remove file" }))

    expect(onFileChange).toHaveBeenLastCalledWith(null)
    expect(screen.getByText("No File Chosen")).toBeInTheDocument()
    expect(document.querySelector(".maxa-file-input")).not.toHaveClass("maxa-file-input--filled")
  })

  it("does not render the remove button when disabled or not-editable", () => {
    const { rerender } = render(<FileInput label="Upload" fileName="locked.pdf" disabled />)
    expect(screen.queryByRole("button", { name: "Remove file" })).not.toBeInTheDocument()

    rerender(<FileInput label="Upload" fileName="locked.pdf" notEditable />)
    expect(screen.queryByRole("button", { name: "Remove file" })).not.toBeInTheDocument()
  })

  it("renders the not-editable (locked) state", () => {
    render(<FileInput label="Upload" notEditable />)

    expect(nativeInput()).toBeDisabled()
    expect(document.querySelector(".maxa-file-input")).toHaveClass("maxa-file-input--not-editable")
    expect(document.querySelector(".maxa-file-input__lock")).toBeInTheDocument()
  })

  it("forwards the ref to the native input", () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<FileInput ref={ref} label="Upload" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.type).toBe("file")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<FileInput label="Default Package" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
