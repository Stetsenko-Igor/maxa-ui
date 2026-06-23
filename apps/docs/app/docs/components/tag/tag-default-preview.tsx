"use client"

import { Tag } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }

const APPEARANCE_OPTIONS = [
  "gray", "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky",
  "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
].map(a => ({ label: a, value: a }))

type TagAppearance =
  | "gray" | "red" | "orange" | "amber" | "yellow" | "lime"
  | "green" | "emerald" | "teal" | "cyan" | "sky"
  | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"

const TAG_PLAYGROUND: PlaygroundConfig = {
  controls: [
    { type: "select", name: "appearance", options: APPEARANCE_OPTIONS, default: "violet" },
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
    { type: "boolean", name: "removable", default: true },
    { type: "text", name: "label", label: "Label", default: "Customers" },
  ],
  render: (v: PlaygroundValues) => (
    <Tag
      appearance={v.appearance as TagAppearance}
      emphasis={v.emphasis as "low" | "medium" | "high"}
      size={v.size as "sm" | "md" | "lg"}
      removable={v.removable as boolean}
    >
      {v.label as string}
    </Tag>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`appearance="${v.appearance}"`, `emphasis="${v.emphasis}"`, `size="${v.size}"`]
    if (v.removable) attrs.push("removable onRemove={() => {}}")
    return `<Tag ${attrs.join(" ")}>${v.label}</Tag>`
  },
}

export function TagDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Tag } from "@maxa/ui"\n\n<Tag appearance="violet" removable onRemove={() => {}}>Customers</Tag>`}
      playground={TAG_PLAYGROUND}
    >
      <div style={row}>
        <Tag appearance="gray">Segment</Tag>
        <Tag appearance="blue" removable>Audience</Tag>
        <Tag appearance="violet" emphasis="high" removable>VIP</Tag>
        <Tag appearance="teal">Prague</Tag>
        <Tag appearance="rose" removable>Luxury</Tag>
      </div>
    </ComponentPreview>
  )
}
