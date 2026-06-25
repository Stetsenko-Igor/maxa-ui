import { describe, it, expect, beforeAll } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar"

beforeAll(() => {
  class ImageStub {
    onload: (() => void) | null = null
    private listeners = new Map<string, Set<() => void>>()

    set src(_value: string) {
      queueMicrotask(() => {
        this.onload?.()
        this.listeners.get("load")?.forEach((listener) => listener())
      })
    }

    addEventListener(event: string, listener: () => void) {
      const listeners = this.listeners.get(event) ?? new Set<() => void>()
      listeners.add(listener)
      this.listeners.set(event, listeners)
    }

    removeEventListener(event: string, listener: () => void) {
      this.listeners.get(event)?.delete(listener)
    }
  }

  // @ts-expect-error — assigning a test-only image loader for Radix Avatar
  globalThis.Image = ImageStub
})

describe("Avatar", () => {
  it("renders fallback initials", () => {
    render(
      <Avatar>
        <AvatarFallback>IS</AvatarFallback>
      </Avatar>,
    )
    expect(screen.getByText("IS")).toBeInTheDocument()
  })

  it("applies default size and shape", () => {
    render(
      <Avatar>
        <AvatarFallback>IS</AvatarFallback>
      </Avatar>,
    )
    const avatar = document.querySelector(".maxa-avatar")
    expect(avatar).toHaveAttribute("data-size", "md")
    expect(avatar).toHaveAttribute("data-shape", "circle")
    expect(avatar).toHaveAttribute("data-appearance", "blue")
    expect(avatar).toHaveAttribute("data-emphasis", "strong")
  })

  it("applies size, appearance, emphasis, and square shape", () => {
    render(
      <Avatar appearance="green" shape="square" size="lg" emphasis="medium">
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>,
    )
    const avatar = document.querySelector(".maxa-avatar")
    expect(avatar).toHaveAttribute("data-size", "lg")
    expect(avatar).toHaveAttribute("data-shape", "square")
    expect(avatar).toHaveAttribute("data-appearance", "green")
    expect(avatar).toHaveAttribute("data-emphasis", "medium")
  })

  it("renders image with alt text", async () => {
    render(
      <Avatar>
        <AvatarImage alt="Igor Stetsenko" src="/avatar.png" />
        <AvatarFallback>IS</AvatarFallback>
      </Avatar>,
    )
    expect(await screen.findByAltText("Igor Stetsenko")).toHaveClass("maxa-avatar__image")
  })

  it("renders status indicator", () => {
    render(
      <Avatar status="online">
        <AvatarFallback>IS</AvatarFallback>
      </Avatar>,
    )
    const status = document.querySelector(".maxa-avatar__status")
    expect(status).toHaveAttribute("data-status", "online")
    expect(status).toHaveAttribute("aria-hidden", "true")
  })

  it("renders avatar group overflow", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
      </AvatarGroup>,
    )
    expect(screen.getByText("+1")).toBeInTheDocument()
    expect(screen.getByLabelText("1 more")).toHaveAttribute("data-emphasis", "neutral")
  })

  it("renders avatar group overflow as ellipsis", () => {
    render(
      <AvatarGroup max={2} overflow="ellipsis">
        <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
      </AvatarGroup>,
    )
    expect(screen.getByText("...")).toBeInTheDocument()
    expect(screen.getByLabelText("1 more")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    render(
      <Avatar className="custom-avatar">
        <AvatarFallback>IS</AvatarFallback>
      </Avatar>,
    )
    expect(document.querySelector(".maxa-avatar")).toHaveClass("custom-avatar")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>IS</AvatarFallback>
      </Avatar>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
