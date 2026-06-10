import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { FileInput } from "./file-input"

function file(name: string, size = 128, type = "text/plain") {
  return new File(["x".repeat(size)], name, { type })
}

describe("FileInput", () => {
  it("renders an accessible picker surface", () => {
    render(<FileInput label="Upload file" title="Choose a PDF" description="PDF up to 10 MB" />)

    expect(screen.getByText("Upload file")).toHaveAttribute("for")
    expect(screen.getByRole("button", { name: "Choose a PDF" })).toHaveAttribute(
      "aria-describedby",
    )
    expect(screen.getByText("PDF up to 10 MB")).toBeInTheDocument()
  })

  it("emits selected files from the native input", () => {
    const onFilesChange = vi.fn()
    render(<FileInput label="Upload" onFilesChange={onFilesChange} />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const selected = file("brand.pdf", 2048, "application/pdf")
    fireEvent.change(input, { target: { files: [selected] } })

    expect(onFilesChange).toHaveBeenCalledWith([selected])
    expect(screen.getByText("brand.pdf")).toBeInTheDocument()
    expect(screen.getByText("2.0 KB")).toBeInTheDocument()
  })

  it("limits single-file selection when multiple is false", () => {
    const onFilesChange = vi.fn()
    render(<FileInput label="Upload" onFilesChange={onFilesChange} />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const first = file("first.pdf")
    const second = file("second.pdf")
    fireEvent.change(input, { target: { files: [first, second] } })

    expect(onFilesChange).toHaveBeenCalledWith([first])
  })

  it("accepts dropped files when dropzone is enabled", () => {
    const onFilesChange = vi.fn()
    render(<FileInput label="Upload" multiple onFilesChange={onFilesChange} />)

    const surface = screen.getByRole("button", { name: "Choose files" })
    const first = file("photo.png", 512, "image/png")
    const second = file("logo.svg", 256, "image/svg+xml")

    fireEvent.drop(surface, {
      dataTransfer: {
        files: [first, second],
      },
    })

    expect(onFilesChange).toHaveBeenCalledWith([first, second])
    expect(screen.getByText("photo.png")).toBeInTheDocument()
    expect(screen.getByText("logo.svg")).toBeInTheDocument()
  })

  it("rejects files over maxSize", () => {
    const onFilesChange = vi.fn()
    const onFilesReject = vi.fn()
    render(
      <FileInput
        label="Upload"
        multiple
        maxSize={4}
        onFilesChange={onFilesChange}
        onFilesReject={onFilesReject}
      />,
    )

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const accepted = file("tiny.txt", 4)
    const rejected = file("large.txt", 8)
    fireEvent.change(input, { target: { files: [accepted, rejected] } })

    expect(onFilesChange).toHaveBeenCalledWith([accepted])
    expect(onFilesReject).toHaveBeenCalledWith([{ file: rejected, reason: "max-size" }])
  })

  it("forwards the ref to the native input", () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<FileInput ref={ref} label="Upload" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.type).toBe("file")
  })

  it("applies disabled and error states", () => {
    render(<FileInput label="Upload" disabled error="File is required" />)

    expect(screen.getByRole("button", { name: "Choose files" })).toHaveAttribute("aria-disabled", "true")
    expect(screen.getByText("File is required")).toHaveAttribute("role", "alert")
    expect(document.querySelector(".maxa-file-input")).toHaveClass("maxa-file-input--disabled")
  })
})
