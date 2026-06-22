import * as React from "react"
import { beforeAll, describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { MultiSelect } from "./multi-select"

beforeAll(() => {
  if (!("ResizeObserver" in globalThis)) {
    class ResizeObserverStub {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    // @ts-expect-error — assigning a test-only polyfill onto the global
    globalThis.ResizeObserver = ResizeObserverStub
  }
})

const options = [
  { label: "PDF", value: "pdf" },
  { label: "PNG", value: "png" },
]

function openMenu(name: string | RegExp = "Select options") {
  fireEvent.pointerDown(screen.getByRole("button", { name }), {
    button: 0,
    ctrlKey: false,
  })
}

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

  it("removing a chip does not open the dropdown menu", () => {
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} />)
    const removeButton = screen.getByRole("button", { name: "Remove PNG" })

    fireEvent.pointerDown(removeButton, { button: 0, ctrlKey: false })
    fireEvent.click(removeButton)

    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    expect(screen.queryByRole("menuitemcheckbox")).not.toBeInTheDocument()
    expect(screen.queryByText("PNG")).not.toBeInTheDocument()
  })

  it("removing a chip updates the rendered chips", () => {
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} />)
    expect(document.querySelectorAll(".maxa-multi-select__chip")).toHaveLength(2)

    fireEvent.click(screen.getByRole("button", { name: "Remove PDF" }))

    expect(document.querySelectorAll(".maxa-multi-select__chip")).toHaveLength(1)
    expect(screen.queryByText("PDF")).not.toBeInTheDocument()
    expect(screen.getByText("PNG")).toBeInTheDocument()
  })

  it("renders form error text", () => {
    render(<MultiSelect options={options} error="Choose at least one option" />)
    expect(screen.getByText("Choose at least one option")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute("aria-invalid", "true")
  })

  it("does not render menu options before interaction", () => {
    render(<MultiSelect options={options} />)
    expect(screen.queryByRole("menuitemcheckbox")).not.toBeInTheDocument()
  })

  it("opens the menu when the trigger is clicked", async () => {
    render(<MultiSelect options={options} />)
    openMenu()
    await waitFor(() => {
      expect(screen.getByRole("menuitemcheckbox", { name: "PDF" })).toBeInTheDocument()
    })
    expect(screen.getByRole("menuitemcheckbox", { name: "PNG" })).toBeInTheDocument()
  })

  it("closes the menu on Escape", async () => {
    render(<MultiSelect options={options} />)
    openMenu()
    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument()
    })

    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" })

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    })
  })

  it("closes the menu on outside pointer down", async () => {
    render(<MultiSelect options={options} />)
    openMenu()
    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument()
    })

    fireEvent.pointerDown(document.body, { button: 0, ctrlKey: false })

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    })
  })

  it("toggles an option to add and remove chips", async () => {
    const onValueChange = vi.fn()
    render(<MultiSelect options={options} onValueChange={onValueChange} />)
    openMenu()
    await waitFor(() => {
      expect(screen.getByRole("menuitemcheckbox", { name: "PNG" })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole("menuitemcheckbox", { name: "PNG" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["png"])
    await waitFor(() => {
      expect(document.querySelectorAll(".maxa-multi-select__chip")).toHaveLength(1)
    })
    expect(screen.getByRole("menuitemcheckbox", { name: "PNG" })).toHaveAttribute(
      "aria-checked",
      "true",
    )

    fireEvent.click(screen.getByRole("menuitemcheckbox", { name: "PNG" }))
    expect(onValueChange).toHaveBeenLastCalledWith([])
    await waitFor(() => {
      expect(document.querySelectorAll(".maxa-multi-select__chip")).toHaveLength(0)
    })
  })

  it("forwards ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<MultiSelect ref={ref} options={options} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass("maxa-form-field")
  })
})
