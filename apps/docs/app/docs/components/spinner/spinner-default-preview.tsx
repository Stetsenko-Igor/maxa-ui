"use client"

import { Spinner } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const SPINNER_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "size",
      options: [
        { label: "sm", value: "sm" },
        { label: "md", value: "md" },
        { label: "lg", value: "lg" },
      ],
      default: "md",
    },
    {
      type: "select",
      name: "appearance",
      options: [
        { label: "white", value: "white" },
        { label: "primary", value: "primary" },
        { label: "greyscale", value: "greyscale" },
        { label: "inverted", value: "inverted" },
      ],
      default: "primary",
    },
    { type: "boolean", name: "decorative", default: false },
    { type: "text", name: "label", default: "Loading designs" },
  ],
  render: (v: PlaygroundValues) => {
    const appearance = v.appearance as "white" | "primary" | "greyscale" | "inverted"
    const onDark = appearance === "white"
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "96px",
          width: "160px",
          borderRadius: "var(--radius-md)",
          background: onDark ? "var(--color-bg-neutral-strong)" : "var(--color-bg-surface)",
          border: onDark ? "none" : "1px solid var(--color-border-secondary)",
        }}
      >
        <Spinner
          size={v.size as "sm" | "md" | "lg"}
          appearance={appearance}
          decorative={v.decorative as boolean}
          label={v.label as string}
        />
      </div>
    )
  },
  code: (v: PlaygroundValues) => {
    const attrs = [`size="${v.size}"`, `appearance="${v.appearance}"`]
    if (v.decorative) attrs.push("decorative")
    else attrs.push(`label="${v.label}"`)
    return `<Spinner ${attrs.join(" ")} />`
  },
}

export function SpinnerDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Spinner label="Loading designs" />`}
      playground={SPINNER_PLAYGROUND}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "32px" }}>
        <Spinner label="Loading designs" />
      </div>
    </ComponentPreview>
  )
}
