"use client"

import { TextArea } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const fieldWidth: React.CSSProperties = { width: "min(100%, 420px)" }

function textAreaExample(name: string, jsx: string) {
  return `import { TextArea } from "@maxa/ui"\n\nexport function ${name}() {\n  return ${jsx}\n}`
}

const TEXTAREA_PLAYGROUND: PlaygroundConfig = {
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
    { type: "text", name: "label", default: "Message" },
    { type: "text", name: "placeholder", default: "Write a message" },
    { type: "text", name: "hint", default: "" },
    { type: "boolean", name: "required", default: false },
    { type: "boolean", name: "disabled", default: false },
    { type: "boolean", name: "readOnly", default: false },
  ],
  render: (v: PlaygroundValues) => {
    const hint = v.hint as string
    return (
      <div style={fieldWidth}>
        <TextArea
          size={v.size as "sm" | "md" | "lg"}
          label={v.label as string}
          placeholder={v.placeholder as string}
          {...(hint ? { hint } : {})}
          required={v.required as boolean}
          disabled={v.disabled as boolean}
          readOnly={v.readOnly as boolean}
        />
      </div>
    )
  },
  code: (v: PlaygroundValues) => {
    const attrs = [`size="${v.size}"`, `label="${v.label}"`, `placeholder="${v.placeholder}"`]
    if (v.hint) attrs.push(`hint="${v.hint}"`)
    if (v.required) attrs.push("required")
    if (v.disabled) attrs.push("disabled")
    if (v.readOnly) attrs.push("readOnly")
    return `<TextArea ${attrs.join(" ")} />`
  },
}

export function TextareaDefaultPreview() {
  return (
    <ComponentPreview
      code={textAreaExample("TextAreaDefaultExample", `<TextArea label="Message" placeholder="Write a message" />`)}
      playground={TEXTAREA_PLAYGROUND}
    >
      <div style={fieldWidth}>
        <TextArea label="Message" placeholder="Write a message" />
      </div>
    </ComponentPreview>
  )
}
