import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
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
})
