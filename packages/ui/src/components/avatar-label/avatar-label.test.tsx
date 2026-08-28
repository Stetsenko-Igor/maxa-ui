import * as React from "react"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { describe, expect, it } from "vitest"
import { Avatar, AvatarFallback } from "../avatar/avatar"
import { AvatarLabel } from "./avatar-label"

function identityAvatar() {
  return (
    <Avatar size="xs">
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
  )
}

describe("AvatarLabel", () => {
  it("renders a static identity with an optional description", () => {
    render(
      <AvatarLabel
        avatar={identityAvatar()}
        label="Maxa Design"
        description="Product designer"
        data-testid="identity"
      />,
    )

    const root = screen.getByTestId("identity")
    expect(root.tagName).toBe("DIV")
    expect(root).toHaveAttribute("data-size", "sm")
    expect(root.querySelector(".maxa-avatar")).toHaveAttribute("data-size", "sm")
    expect(screen.getByText("Maxa Design")).toHaveClass("maxa-avatar-label__label")
    expect(screen.getByText("Product designer")).toHaveClass(
      "maxa-avatar-label__description",
    )
  })

  it("omits the description when it is not supplied", () => {
    render(<AvatarLabel avatar={identityAvatar()} label="Maxa Design" />)

    expect(document.querySelector(".maxa-avatar-label__description")).toBeNull()
  })

  it("renders the complete identity target as a profile link", () => {
    render(
      <AvatarLabel
        avatar={identityAvatar()}
        label="Maxa Design"
        description="Product designer"
        href="/profile"
        aria-label="Open Maxa Design profile"
        target="_self"
        data-testid="profile-link"
      />,
    )

    const link = screen.getByTestId("profile-link")
    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("href", "/profile")
    expect(link).toHaveAttribute("target", "_self")
    expect(link).toHaveAccessibleName("Open Maxa Design profile")
    expect(link).toHaveAttribute("data-interaction", "link")
  })

  it("propagates the selected size to the nested Avatar", () => {
    render(
      <AvatarLabel
        avatar={identityAvatar()}
        label="Maxa Design"
        size="xl"
        data-testid="identity"
      />,
    )

    expect(screen.getByTestId("identity")).toHaveAttribute("data-size", "xl")
    expect(document.querySelector(".maxa-avatar")).toHaveAttribute("data-size", "xl")
  })

  it("merges a custom class and forwards its ref", () => {
    const ref = React.createRef<HTMLAnchorElement | HTMLDivElement>()
    render(
      <AvatarLabel
        ref={ref}
        avatar={identityAvatar()}
        label="Maxa Design"
        className="custom-identity"
      />,
    )

    expect(ref.current).toHaveClass("maxa-avatar-label", "custom-identity")
  })

  it("uses semantic link and focus tokens without component aliases", () => {
    const css = readFileSync(join(import.meta.dirname, "avatar-label.css"), "utf-8")

    expect(css).toContain("var(--color-text-secondary)")
    expect(css).toContain("var(--color-text-link-hover)")
    expect(css).toContain("var(--color-text-link-active)")
    expect(css).toContain("var(--color-focus-ring)")
    expect(css).not.toContain("--avatar-label-")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AvatarLabel
        avatar={identityAvatar()}
        label="Maxa Design"
        description="Product designer"
        href="/profile"
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
