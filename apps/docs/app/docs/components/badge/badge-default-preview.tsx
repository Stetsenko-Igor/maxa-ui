"use client"

import { Badge } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }

const BADGE_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "intent",
      options: [
        { label: "neutral", value: "neutral" },
        { label: "info", value: "info" },
        { label: "success", value: "success" },
        { label: "warning", value: "warning" },
        { label: "error", value: "error" },
      ],
      default: "success",
    },
    {
      type: "select",
      name: "emphasis",
      options: [
        { label: "low", value: "low" },
        { label: "medium", value: "medium" },
        { label: "high", value: "high" },
      ],
      default: "low",
    },
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
    { type: "text", name: "label", label: "Label", default: "Active" },
  ],
  render: (v: PlaygroundValues) => (
    <Badge
      intent={v.intent as "neutral" | "info" | "success" | "warning" | "error"}
      emphasis={v.emphasis as "low" | "medium" | "high"}
      size={v.size as "sm" | "md" | "lg"}
    >
      {v.label as string}
    </Badge>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`intent="${v.intent}"`, `emphasis="${v.emphasis}"`, `size="${v.size}"`]
    return `<Badge ${attrs.join(" ")}>${v.label}</Badge>`
  },
}

export function BadgeDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Badge } from "@maxa/ui"\n\n<Badge intent="success" emphasis="low">Active</Badge>`}
      playground={BADGE_PLAYGROUND}
    >
      <div style={row}>
        <Badge intent="neutral">Draft</Badge>
        <Badge intent="info">In review</Badge>
        <Badge intent="success">Active</Badge>
        <Badge intent="warning">Pending</Badge>
        <Badge intent="error">Failed</Badge>
      </div>
    </ComponentPreview>
  )
}
