import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Box, Heading, Inline, Stack, Surface, Text, TokenSwatch, version } from "./index"

describe("ui", () => {
  it("exports version", () => {
    expect(version).toBe("0.0.0")
  })
})

describe("base token components", () => {
  it("renders Box with token-backed styles", () => {
    render(
      <Box data-testid="box" background="surface-layer1" color="primary" p="4" radius="md">
        Box
      </Box>,
    )

    expect(screen.getByTestId("box").getAttribute("style")).toContain(
      "background-color: var(--color-bg-surface-layer1)",
    )
    expect(screen.getByTestId("box").getAttribute("style")).toContain(
      "color: var(--color-content-primary)",
    )
    expect(screen.getByTestId("box").getAttribute("style")).toContain("padding: var(--spacing-4)")
    expect(screen.getByTestId("box").getAttribute("style")).toContain(
      "border-radius: var(--radius-md)",
    )
  })

  it("renders Stack and Inline with token gaps", () => {
    render(
      <>
        <Stack data-testid="stack" gap="6" />
        <Inline data-testid="inline" gap="3" />
      </>,
    )

    expect(screen.getByTestId("stack")).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      gap: "var(--spacing-6)",
    })
    expect(screen.getByTestId("inline")).toHaveStyle({
      display: "flex",
      flexDirection: "row",
      gap: "var(--spacing-3)",
    })
    expect(screen.getByTestId("stack")).not.toHaveAttribute("gap")
    expect(screen.getByTestId("inline")).not.toHaveAttribute("wrap")
  })

  it("renders type components with MAXA typography tokens", () => {
    render(
      <>
        <Heading as="h1" size="heading-xl">
          Title
        </Heading>
        <Text size="caption-sm" weight="medium">
          Caption
        </Text>
      </>,
    )

    expect(screen.getByRole("heading", { level: 1 })).toHaveStyle({
      fontSize: "var(--text-heading-xl)",
      lineHeight: "var(--text-heading-xl--line-height)",
      fontWeight: "var(--font-weight-semibold)",
    })
    expect(screen.getByText("Caption")).toHaveStyle({
      fontSize: "var(--text-caption-sm)",
      lineHeight: "var(--text-caption-sm--line-height)",
      fontWeight: "var(--font-weight-medium)",
    })
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveAttribute("size")
    expect(screen.getByText("Caption")).not.toHaveAttribute("weight")
  })

  it("renders Surface and TokenSwatch for documentation primitives", () => {
    render(
      <Surface data-testid="surface">
        <TokenSwatch label="Brand" value="var(--color-action-primary-normal)" />
      </Surface>,
    )

    expect(screen.getByTestId("surface").getAttribute("style")).toContain(
      "background-color: var(--color-bg-surface-layer1)",
    )
    expect(screen.getByTestId("surface").getAttribute("style")).toContain(
      "border-color: var(--color-border-default)",
    )
    expect(screen.getByTestId("surface").getAttribute("style")).toContain(
      "border-radius: var(--radius-lg)",
    )
    expect(screen.getByText("Brand")).toBeInTheDocument()
  })
})
