import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { UtilityButton } from "./utility-button"

function Icon() {
  return <svg aria-hidden="true" />
}

describe("UtilityButton", () => {
  it("requires an accessible label and supports selected state", () => {
    render(<UtilityButton icon={<Icon />} aria-label="Grid view" selected />)
    expect(screen.getByRole("button", { name: "Grid view" })).toHaveAttribute("aria-pressed", "true")
  })
})
