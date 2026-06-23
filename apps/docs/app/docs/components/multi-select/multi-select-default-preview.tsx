"use client"

import { useState } from "react"
import { MultiSelect } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const OPTIONS = [
  { label: "Brand design", value: "brand" },
  { label: "Social post", value: "social" },
  { label: "Presentation", value: "presentation" },
  { label: "Print file", value: "print" },
]

type Size = "sm" | "md" | "lg"

function MultiSelectDemo({ values }: { values: PlaygroundValues }) {
  const [selected, setSelected] = useState<string[]>(["brand", "social"])
  const hasError = values.error as boolean
  return (
    <div style={{ width: "320px" }}>
      <MultiSelect
        label="Asset types"
        options={OPTIONS}
        value={selected}
        onValueChange={setSelected}
        size={values.size as Size}
        placeholder={values.placeholder as string}
        disabled={values.disabled as boolean}
        {...(hasError ? { error: "Choose at least one type" } : {})}
      />
    </div>
  )
}

const MULTI_SELECT_PLAYGROUND: PlaygroundConfig = {
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
    { type: "text", name: "placeholder", default: "Select options" },
    { type: "boolean", name: "error", default: false },
    { type: "boolean", name: "disabled", default: false },
  ],
  render: (v: PlaygroundValues) => <MultiSelectDemo values={v} />,
  code: (v: PlaygroundValues) => {
    const attrs = [
      `label="Asset types"`,
      `options={options}`,
      `defaultValue={["brand", "social"]}`,
      `size="${v.size}"`,
    ]
    if (v.placeholder && v.placeholder !== "Select options") attrs.push(`placeholder="${v.placeholder}"`)
    if (v.error) attrs.push(`error="Choose at least one type"`)
    if (v.disabled) attrs.push("disabled")
    return `<MultiSelect\n  ${attrs.join("\n  ")}\n/>`
  },
}

export function MultiSelectDefaultPreview() {
  return (
    <ComponentPreview
      code={`<MultiSelect\n  label="Asset types"\n  options={options}\n  defaultValue={["brand", "social"]}\n/>`}
      playground={MULTI_SELECT_PLAYGROUND}
    >
      <div style={{ width: "320px" }}>
        <MultiSelect label="Asset types" options={OPTIONS} defaultValue={["brand", "social"]} />
      </div>
    </ComponentPreview>
  )
}
