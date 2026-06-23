"use client"

import { Input } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const INPUT_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "kind",
      options: [
        { label: "text", value: "text" },
        { label: "password", value: "password" },
        { label: "search", value: "search" },
        { label: "quantity", value: "quantity" },
      ],
      default: "text",
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
    {
      type: "select",
      name: "status",
      options: [
        { label: "default", value: "default" },
        { label: "error", value: "error" },
        { label: "success", value: "success" },
      ],
      default: "default",
    },
    { type: "boolean", name: "required", default: false },
    { type: "boolean", name: "disabled", default: false },
    { type: "text", name: "label", label: "Label", default: "Default Package" },
  ],
  render: (v: PlaygroundValues) => (
    <div style={{ width: "320px" }}>
      <Input
        kind={v.kind as "text" | "password" | "search" | "quantity"}
        size={v.size as "sm" | "md" | "lg"}
        status={v.status as "default" | "error" | "success"}
        required={v.required as boolean}
        disabled={v.disabled as boolean}
        label={v.label as string}
        placeholder="Any"
      />
    </div>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`kind="${v.kind}"`, `size="${v.size}"`]
    if (v.status !== "default") attrs.push(`status="${v.status}"`)
    if (v.required) attrs.push("required")
    if (v.disabled) attrs.push("disabled")
    attrs.push(`label="${v.label}"`, `placeholder="Any"`)
    return `<Input ${attrs.join(" ")} />`
  },
}

export function InputDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Input } from "@maxa/ui"\n\nexport function InputDefaultExample() {\n  return <Input label="Default Package" placeholder="Any" />\n}`}
      playground={INPUT_PLAYGROUND}
    >
      <div style={{ width: "320px" }}>
        <Input label="Default Package" placeholder="Any" />
      </div>
    </ComponentPreview>
  )
}
