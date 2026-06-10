import * as React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { FormField } from "./form-field"

describe("FormField", () => {
  it("renders with default size and status classes", () => {
    render(<FormField><input /></FormField>)
    const wrapper = document.querySelector(".maxa-form-field")
    expect(wrapper).toHaveClass("maxa-form-field--md")
    expect(wrapper).toHaveClass("maxa-form-field--default")
  })

  it("applies size classes", () => {
    const { rerender } = render(<FormField size="sm"><input /></FormField>)
    expect(document.querySelector(".maxa-form-field")).toHaveClass("maxa-form-field--sm")

    rerender(<FormField size="lg"><input /></FormField>)
    expect(document.querySelector(".maxa-form-field")).toHaveClass("maxa-form-field--lg")
  })

  it("applies status classes", () => {
    const { rerender } = render(<FormField status="success"><input /></FormField>)
    expect(document.querySelector(".maxa-form-field")).toHaveClass("maxa-form-field--success")

    rerender(<FormField status="error"><input /></FormField>)
    expect(document.querySelector(".maxa-form-field")).toHaveClass("maxa-form-field--error")
  })

  it("error prop forces --error class even when status is default", () => {
    render(<FormField error="Something went wrong"><input /></FormField>)
    expect(document.querySelector(".maxa-form-field")).toHaveClass("maxa-form-field--error")
  })

  it("renders label linked to htmlFor", () => {
    render(
      <FormField label="Email" htmlFor="email-input">
        <input id="email-input" />
      </FormField>
    )
    const label = screen.getByText("Email")
    expect(label.tagName).toBe("LABEL")
    expect(label).toHaveAttribute("for", "email-input")
  })

  it("renders required asterisk when required is true", () => {
    render(<FormField label="Name" required><input /></FormField>)
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("does not render required asterisk when required is false", () => {
    render(<FormField label="Name"><input /></FormField>)
    expect(document.querySelector(".maxa-form-field__required")).not.toBeInTheDocument()
  })

  it("renders hint text in footer", () => {
    render(<FormField hint="Must be at least 8 characters"><input /></FormField>)
    expect(screen.getByText("Must be at least 8 characters")).toBeInTheDocument()
  })

  it("error text overrides hint text in footer", () => {
    render(
      <FormField hint="Hint text" error="Error message">
        <input />
      </FormField>
    )
    expect(screen.getByText("Error message")).toBeInTheDocument()
    expect(screen.queryByText("Hint text")).not.toBeInTheDocument()
  })

  it("renders footerEnd content", () => {
    render(
      <FormField footerEnd={<span>0/100</span>}>
        <input />
      </FormField>
    )
    expect(screen.getByText("0/100")).toBeInTheDocument()
    expect(document.querySelector(".maxa-form-field__footer-end")).toBeInTheDocument()
  })

  it("renders infoIcon next to label", () => {
    render(
      <FormField label="Username" infoIcon={<svg data-testid="info-icon" />}>
        <input />
      </FormField>
    )
    expect(screen.getByTestId("info-icon")).toBeInTheDocument()
    expect(document.querySelector(".maxa-form-field__info")).toBeInTheDocument()
  })

  it("does not render footer when hint, error and footerEnd are absent", () => {
    render(<FormField><input /></FormField>)
    expect(document.querySelector(".maxa-form-field__footer")).not.toBeInTheDocument()
  })

  it("does not render label row when label is absent", () => {
    render(<FormField><input /></FormField>)
    expect(document.querySelector(".maxa-form-field__label-row")).not.toBeInTheDocument()
  })

  it("renders children inside the wrapper", () => {
    render(<FormField><input data-testid="field-child" /></FormField>)
    expect(screen.getByTestId("field-child")).toBeInTheDocument()
  })

  it("applies custom className to wrapper", () => {
    render(<FormField className="custom-class"><input /></FormField>)
    expect(document.querySelector(".maxa-form-field")).toHaveClass("custom-class")
  })

  it("forwards ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<FormField ref={ref}><input /></FormField>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass("maxa-form-field")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FormField label="Email" htmlFor="email-input" hint="We never share it">
        <input id="email-input" type="email" />
      </FormField>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
