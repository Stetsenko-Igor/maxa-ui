"use client"

import { Progress } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const PROGRESS_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "value",
      options: [
        { label: "0", value: "0" },
        { label: "25", value: "25" },
        { label: "50", value: "50" },
        { label: "64", value: "64" },
        { label: "75", value: "75" },
        { label: "100", value: "100" },
      ],
      default: "64",
    },
    {
      type: "select",
      name: "size",
      options: [
        { label: "sm", value: "sm" },
        { label: "md", value: "md" },
      ],
      default: "md",
    },
    {
      type: "select",
      name: "intent",
      options: [
        { label: "brand", value: "brand" },
        { label: "success", value: "success" },
        { label: "warning", value: "warning" },
        { label: "error", value: "error" },
      ],
      default: "brand",
    },
    { type: "boolean", name: "showValue", default: true },
    { type: "text", name: "label", default: "Uploading package" },
  ],
  render: (v: PlaygroundValues) => (
    <div style={{ width: "360px" }}>
      <Progress
        value={Number(v.value)}
        size={v.size as "sm" | "md"}
        intent={v.intent as "brand" | "success" | "warning" | "error"}
        showValue={v.showValue as boolean}
        label={v.label as string}
      />
    </div>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`value={${v.value}}`, `size="${v.size}"`, `intent="${v.intent}"`, `label="${v.label}"`]
    if (v.showValue) attrs.push("showValue")
    return `<Progress ${attrs.join(" ")} />`
  },
}

export function ProgressDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Progress value={64} label="Uploading package" showValue />`}
      playground={PROGRESS_PLAYGROUND}
    >
      <div style={{ width: "360px", padding: "32px" }}>
        <Progress value={64} label="Uploading package" showValue />
      </div>
    </ComponentPreview>
  )
}
