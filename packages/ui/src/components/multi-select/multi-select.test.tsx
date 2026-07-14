import * as React from "react"
import { beforeAll, describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { axe } from "vitest-axe"
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

function openListbox() {
  fireEvent.click(screen.getByRole("combobox"))
}

describe("MultiSelect", () => {
  it("renders selected chips", () => {
    const onValueChange = vi.fn()
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} onValueChange={onValueChange} />)
    const control = document.querySelector(".maxa-multi-select__trigger")
    expect(control).not.toBeNull()
    expect(within(control as HTMLElement).getByText("PDF")).toBeInTheDocument()
    expect(within(control as HTMLElement).getByText("PNG")).toBeInTheDocument()
  })

  it("renders chip remove buttons outside the combobox trigger", () => {
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} />)
    const trigger = screen.getByRole("combobox")

    expect(screen.getByRole("button", { name: "Remove PNG" })).toBeInTheDocument()
    expect(within(trigger).queryByRole("button", { name: "Remove PNG" })).not.toBeInTheDocument()
  })

  it("removes chips", () => {
    const onValueChange = vi.fn()
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} onValueChange={onValueChange} />)
    fireEvent.click(screen.getByRole("button", { name: "Remove PNG" }))
    expect(onValueChange).toHaveBeenCalledWith(["pdf"])
  })

  it("removing a chip does not open the listbox", () => {
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} />)
    const removeButton = screen.getByRole("button", { name: "Remove PNG" })

    fireEvent.pointerDown(removeButton, { button: 0, ctrlKey: false })
    fireEvent.click(removeButton)

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    expect(screen.queryByRole("option")).not.toBeInTheDocument()
    const control = document.querySelector(".maxa-multi-select__trigger")
    expect(control).not.toBeNull()
    expect(within(control as HTMLElement).queryByText("PNG")).not.toBeInTheDocument()
  })

  it("removing a chip updates the rendered chips", () => {
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} />)
    expect(document.querySelectorAll(".maxa-multi-select__chip")).toHaveLength(2)

    fireEvent.click(screen.getByRole("button", { name: "Remove PDF" }))

    expect(document.querySelectorAll(".maxa-multi-select__chip")).toHaveLength(1)
    const control = document.querySelector(".maxa-multi-select__trigger")
    expect(control).not.toBeNull()
    expect(within(control as HTMLElement).queryByText("PDF")).not.toBeInTheDocument()
    const chip = document.querySelector(".maxa-multi-select__chip")
    expect(chip).not.toBeNull()
    expect(within(chip as HTMLElement).getByText("PNG")).toBeInTheDocument()
  })

  it("renders form error text", () => {
    render(<MultiSelect options={options} error="Choose at least one option" />)
    expect(screen.getByText("Choose at least one option")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
  })

  it("exposes listbox combobox semantics on the trigger", () => {
    render(<MultiSelect options={options} />)
    const trigger = screen.getByRole("combobox")
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("names the combobox from the FormField label", () => {
    // role="combobox" does not take its name from content, so the field label
    // must name it.
    render(<MultiSelect label="Asset types" options={options} />)
    expect(screen.getByRole("combobox")).toHaveAccessibleName(/Asset types/)
  })

  it("names the combobox from the selection summary when unlabeled", () => {
    // Without a FormField label the combobox falls back to an aria-label built
    // from the summary, so it is never left unnamed.
    render(<MultiSelect options={options} defaultValue={["pdf", "png"]} />)
    expect(screen.getByRole("combobox")).toHaveAccessibleName("PDF, PNG")
  })

  it("does not render listbox options before interaction", () => {
    render(<MultiSelect options={options} />)
    expect(screen.queryByRole("option")).not.toBeInTheDocument()
  })

  it("opens the listbox when the trigger is clicked", async () => {
    render(<MultiSelect options={options} />)
    openListbox()
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "PDF" })).toBeInTheDocument()
    })
    expect(screen.getByRole("option", { name: "PNG" })).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true")
  })

  it("closes the listbox on Escape", async () => {
    render(<MultiSelect options={options} />)
    openListbox()
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    })

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Escape" })

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    })
  })

  it("closes the listbox on outside pointer down", async () => {
    render(<MultiSelect options={options} />)
    openListbox()
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    })

    fireEvent.pointerDown(document.body, { button: 0, ctrlKey: false })

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    })
  })

  it("closes the listbox when focus leaves the component", async () => {
    render(
      <>
        <MultiSelect options={options} />
        <button type="button">outside</button>
      </>,
    )
    openListbox()
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    })

    fireEvent.blur(screen.getByRole("combobox"), { relatedTarget: screen.getByRole("button", { name: "outside" }) })

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    })
  })

  it("toggles an option to add and remove chips and keeps the listbox open", async () => {
    const onValueChange = vi.fn()
    render(<MultiSelect options={options} onValueChange={onValueChange} />)
    openListbox()
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "PNG" })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole("option", { name: "PNG" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["png"])
    await waitFor(() => {
      expect(document.querySelectorAll(".maxa-multi-select__chip")).toHaveLength(1)
    })
    expect(screen.getByRole("option", { name: "PNG" })).toHaveAttribute("aria-selected", "true")
    // Listbox stays open so multiple values can be picked in one pass.
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("option", { name: "PNG" }))
    expect(onValueChange).toHaveBeenLastCalledWith([])
    await waitFor(() => {
      expect(document.querySelectorAll(".maxa-multi-select__chip")).toHaveLength(0)
    })
  })

  it("moves the active option with the arrow keys and toggles with Enter", async () => {
    const onValueChange = vi.fn()
    render(<MultiSelect options={options} onValueChange={onValueChange} />)
    const trigger = screen.getByRole("combobox")

    fireEvent.keyDown(trigger, { key: "ArrowDown" })
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    })
    // First open highlights the first enabled option (PDF).
    fireEvent.keyDown(trigger, { key: "ArrowDown" })
    fireEvent.keyDown(trigger, { key: "Enter" })
    expect(onValueChange).toHaveBeenLastCalledWith(["png"])
  })

  it("does not select a disabled option", async () => {
    const onValueChange = vi.fn()
    const withDisabled = [
      { label: "PDF", value: "pdf" },
      { label: "PNG", value: "png", disabled: true },
    ]
    render(<MultiSelect options={withDisabled} onValueChange={onValueChange} />)
    openListbox()
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "PNG" })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole("option", { name: "PNG" }))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("forwards ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<MultiSelect ref={ref} options={options} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass("maxa-form-field")
  })

  it("builds valid option ids for values with spaces and keeps aria-activedescendant resolvable", async () => {
    render(
      <MultiSelect
        label="Regions"
        options={[
          { label: "North America", value: "North America" },
          { label: "Europe", value: "Europe" },
        ]}
      />,
    )

    const trigger = screen.getByRole("combobox")
    fireEvent.keyDown(trigger, { key: "ArrowDown" })
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    })

    const option = screen.getByRole("option", { name: "North America" })
    expect(option.id).toMatch(/^[\w-]+$/)

    const activeId = trigger.getAttribute("aria-activedescendant")
    expect(activeId).toBe(option.id)
    expect(document.getElementById(activeId as string)).toBe(option)
  })

  it("reports original option values even when the id segment is sanitized", async () => {
    const onValueChange = vi.fn()
    render(
      <MultiSelect
        label="Regions"
        onValueChange={onValueChange}
        options={[
          { label: "North America", value: "North America" },
          { label: "Europe", value: "Europe" },
        ]}
      />,
    )

    openListbox()
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole("option", { name: "North America" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["North America"])
  })

  it("has no accessibility violations with the listbox open", async () => {
    // Listbox content renders in a portal, so run axe on baseElement to include it.
    const { baseElement } = render(
      <MultiSelect label="Asset types" options={options} defaultValue={["pdf"]} />,
    )
    openListbox()
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    })
    // region is a page-level landmark rule; a component fixture is not a page.
    expect(
      await axe(baseElement, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
