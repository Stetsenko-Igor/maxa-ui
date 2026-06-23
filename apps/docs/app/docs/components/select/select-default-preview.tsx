"use client"

import { Select } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const SELECT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Name", value: "name" },
]

const SELECT_PLAYGROUND: PlaygroundConfig = {
  controls: [
    { type: "text", name: "label", default: "Sort by" },
    {
      type: "select",
      name: "value",
      options: SELECT_OPTIONS,
      default: "newest",
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
    { type: "boolean", name: "required", default: false },
    { type: "boolean", name: "disabled", default: false },
  ],
  render: (v: PlaygroundValues) => (
    <div style={{ width: "280px" }}>
      <Select
        label={v.label as string}
        size={v.size as "sm" | "md" | "lg"}
        options={SELECT_OPTIONS}
        value={v.value as string}
        required={v.required as boolean}
        disabled={v.disabled as boolean}
      />
    </div>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`label="${v.label}"`, `size="${v.size}"`, `defaultValue="${v.value}"`]
    if (v.required) attrs.push("required")
    if (v.disabled) attrs.push("disabled")
    const options = SELECT_OPTIONS.map((o) => `  <option value="${o.value}">${o.label}</option>`).join("\n")
    return `<Select ${attrs.join(" ")}>\n${options}\n</Select>`
  },
}

export function SelectDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Select } from "@maxa/ui"\n\n<Select label="Sort by" defaultValue="newest">\n  <option value="newest">Newest</option>\n  <option value="oldest">Oldest</option>\n  <option value="name">Name</option>\n</Select>`}
      playground={SELECT_PLAYGROUND}
    >
      <div style={{ width: "320px" }}>
        <Select label="Sort by" defaultValue="newest">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="name">Name</option>
        </Select>
      </div>
    </ComponentPreview>
  )
}
