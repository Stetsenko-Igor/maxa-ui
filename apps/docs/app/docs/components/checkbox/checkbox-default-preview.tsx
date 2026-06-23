"use client"

import { Checkbox } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const CHECKBOX_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "state",
      label: "checked",
      options: [
        { label: "unchecked", value: "false" },
        { label: "checked", value: "true" },
        { label: "indeterminate", value: "indeterminate" },
      ],
      default: "true",
    },
    { type: "text", name: "label", default: "Permissions" },
    { type: "text", name: "sideLabel", default: "Accept terms" },
    { type: "text", name: "description", default: "Required to continue." },
    { type: "boolean", name: "error", default: false },
    { type: "boolean", name: "disabled", default: false },
  ],
  render: (v: PlaygroundValues) => {
    const checked = v.state === "indeterminate" ? "indeterminate" : v.state === "true"
    return (
      <Checkbox
        checked={checked as boolean | "indeterminate"}
        onCheckedChange={() => {}}
        label={(v.label as string) || undefined}
        sideLabel={(v.sideLabel as string) || undefined}
        description={(v.description as string) || undefined}
        error={v.error as boolean}
        disabled={v.disabled as boolean}
      />
    )
  },
  code: (v: PlaygroundValues) => {
    const attrs: string[] = []
    if (v.state === "indeterminate") attrs.push(`checked="indeterminate"`)
    else if (v.state === "true") attrs.push("defaultChecked")
    if (v.label) attrs.push(`label="${v.label}"`)
    if (v.sideLabel) attrs.push(`sideLabel="${v.sideLabel}"`)
    if (v.description) attrs.push(`description="${v.description}"`)
    if (v.error) attrs.push("error")
    if (v.disabled) attrs.push("disabled")
    return `<Checkbox ${attrs.join(" ")} />`
  },
}

export function CheckboxDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Checkbox } from "@maxa/ui"\n\n<Checkbox\n  label="Permissions"\n  sideLabel="Accept terms"\n  description="Required to continue."\n  defaultChecked\n/>`}
      playground={CHECKBOX_PLAYGROUND}
    >
      <Checkbox
        label="Permissions"
        sideLabel="Accept terms"
        description="Required to continue."
        defaultChecked
      />
    </ComponentPreview>
  )
}
