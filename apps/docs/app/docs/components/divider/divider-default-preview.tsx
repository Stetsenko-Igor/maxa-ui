"use client"

import { Divider } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "320px" }
const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: "12px", height: "40px" }

const DIVIDER_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "orientation",
      options: [
        { label: "horizontal", value: "horizontal" },
        { label: "vertical", value: "vertical" },
      ],
      default: "horizontal",
    },
    { type: "boolean", name: "decorative", default: true },
  ],
  render: (v: PlaygroundValues) => {
    const orientation = v.orientation as "horizontal" | "vertical"
    return orientation === "vertical" ? (
      <div style={row}>
        <span>Left</span>
        <Divider orientation="vertical" decorative={v.decorative as boolean} />
        <span>Right</span>
      </div>
    ) : (
      <div style={col}>
        <span>Above</span>
        <Divider orientation="horizontal" decorative={v.decorative as boolean} />
        <span>Below</span>
      </div>
    )
  },
  code: (v: PlaygroundValues) => {
    const attrs = [`orientation="${v.orientation}"`]
    if (!v.decorative) attrs.push("decorative={false}")
    return `<Divider ${attrs.join(" ")} />`
  },
}

export function DividerDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Divider } from "@maxa/ui"\n\n<Divider />`}
      playground={DIVIDER_PLAYGROUND}
    >
      <div style={col}>
        <span>Section one</span>
        <Divider />
        <span>Section two</span>
      </div>
    </ComponentPreview>
  )
}
