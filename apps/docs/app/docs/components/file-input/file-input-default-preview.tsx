"use client"

import { FileInput } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const FILE_INPUT_PLAYGROUND: PlaygroundConfig = {
  controls: [
    { type: "text", name: "label", default: "Default Package" },
    { type: "text", name: "buttonLabel", default: "Choose File" },
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
    { type: "boolean", name: "notEditable", default: false },
  ],
  render: (v: PlaygroundValues) => (
    <div style={{ width: "min(100%, 420px)" }}>
      <FileInput
        label={v.label as string}
        buttonLabel={v.buttonLabel as string}
        size={v.size as "sm" | "md" | "lg"}
        required={v.required as boolean}
        disabled={v.disabled as boolean}
        notEditable={v.notEditable as boolean}
        accept=".pdf,image/*"
      />
    </div>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`label="${v.label}"`, `buttonLabel="${v.buttonLabel}"`, `size="${v.size}"`]
    if (v.required) attrs.push("required")
    if (v.disabled) attrs.push("disabled")
    if (v.notEditable) attrs.push("notEditable")
    attrs.push(`accept=".pdf,image/*"`)
    return `<FileInput ${attrs.join(" ")} />`
  },
}

export function FileInputDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { FileInput } from "@maxa/ui"\n\nexport function FileInputDefaultExample() {\n  return <FileInput label="Default Package" accept=".pdf,image/*" />\n}`}
      playground={FILE_INPUT_PLAYGROUND}
    >
      <div style={{ width: "min(100%, 480px)" }}>
        <FileInput label="Default Package" accept=".pdf,image/*" />
      </div>
    </ComponentPreview>
  )
}
