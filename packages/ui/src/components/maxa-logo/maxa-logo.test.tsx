import * as React from "react"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { MaxaLogo } from "./maxa-logo"

const OFFICIAL_PATHS = [
  "M0 0h38l124 170L279 0h38v262h-36V49L173 221h-21L36 50v212H0z",
  "M391 262h46L556 31l117 231h49L579 0h-46L391 262zM513 164h110l17 34H531z",
  "M795 0h64l254 262h-64zM1034 0h56L853 262h-56z",
  "M1187 262h46L1352 31l117 231h49L1375 0h-46L1187 262zM1309 164h110l17 34h-109z",
]

describe("MaxaLogo", () => {
  it("renders the official wordmark geometry with accessible defaults", () => {
    render(<MaxaLogo />)

    const logo = screen.getByRole("img", { name: "MAXA" })
    expect(logo).toHaveAttribute("viewBox", "0 0 1518 262")
    expect(logo).toHaveAttribute("preserveAspectRatio", "xMidYMid meet")
    expect(logo).toHaveAttribute("width", "120")
    expect(logo).toHaveStyle({ height: "auto" })
    expect(logo).not.toHaveAttribute("data-appearance")
    expect(logo.querySelector("g")).toHaveAttribute("fill", "currentColor")
    expect(Array.from(logo.querySelectorAll("path"), (path) => path.getAttribute("d"))).toEqual(
      OFFICIAL_PATHS,
    )
  })

  it("forwards SVG props, dimensions, styles, and its ref", () => {
    const ref = React.createRef<SVGSVGElement>()
    render(
      <MaxaLogo
        ref={ref}
        width={184}
        height={32}
        className="product-logo"
        data-testid="logo"
        style={{ marginInlineEnd: "8px" }}
      />,
    )

    const logo = screen.getByTestId("logo")
    expect(ref.current).toBe(logo)
    expect(logo).toHaveClass("maxa-logo", "product-logo")
    expect(logo).toHaveAttribute("width", "184")
    expect(logo).toHaveAttribute("height", "32")
    expect(logo).toHaveStyle({ marginInlineEnd: "8px" })
    expect(logo.getAttribute("style")).not.toContain("height: auto")
  })

  it("accepts a custom accessible label", () => {
    render(<MaxaLogo aria-label="MAXA home" />)

    expect(screen.getByRole("img", { name: "MAXA home" })).toBeInTheDocument()
  })

  it("can be hidden from assistive technology when decorative", () => {
    render(<MaxaLogo decorative data-testid="logo" />)

    const logo = screen.getByTestId("logo")
    expect(logo).toHaveAttribute("aria-hidden", "true")
    expect(logo).not.toHaveAttribute("role")
    expect(logo).not.toHaveAttribute("aria-label")
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<MaxaLogo />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
