import * as React from "react"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { SocialButton } from "./social-button"

describe("SocialButton", () => {
  it("renders the default provider label", () => {
    render(<SocialButton provider="linkedin" />)
    expect(screen.getByRole("button", { name: "Sign in with LinkedIn" })).toBeInTheDocument()
  })

  it("renders a custom label", () => {
    render(<SocialButton provider="google" label="Sign in with Google" />)
    expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument()
  })

  it("supports additional provider presets", () => {
    render(<SocialButton provider="youtube" />)
    expect(screen.getByRole("button", { name: "Sign in with YouTube" })).toBeInTheDocument()
  })

  it("applies size and full-width classes", () => {
    render(<SocialButton provider="google" size="lg" fullWidth />)
    expect(screen.getByRole("button")).toHaveClass("maxa-social-button--lg")
    expect(screen.getByRole("button")).toHaveClass("maxa-social-button--full-width")
  })

  it("forwards ref to the root button element", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<SocialButton ref={ref} provider="github" />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current).toHaveClass("maxa-social-button")
  })

  it("uses shared spacing tokens directly", () => {
    const css = readFileSync(
      resolve(process.cwd(), "src/components/social-button/social-button.css"),
      "utf8",
    )

    expect(css).toContain("gap: var(--spacing-md)")
    expect(css).toContain("padding-inline: var(--spacing-xl)")
    expect(css).not.toContain("--social-button-gap")
    expect(css).not.toContain("--social-button-padding-x")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<SocialButton provider="google" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
