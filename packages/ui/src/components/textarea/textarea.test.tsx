import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import { TextArea } from "./textarea"

describe("TextArea entrypoint", () => {
  it("renders the shared TextArea implementation", () => {
    render(<TextArea label="Message" placeholder="Write a message" />)

    const textarea = screen.getByRole("textbox", { name: "Message" })
    expect(textarea).toBeInstanceOf(HTMLTextAreaElement)
    expect(textarea.closest(".maxa-input-wrapper")).toHaveClass("maxa-input-wrapper--textarea")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<TextArea label="Message" placeholder="Write a message" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
