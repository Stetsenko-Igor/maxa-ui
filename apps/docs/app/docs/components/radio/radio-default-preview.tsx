"use client"

import { Radio } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "16px" }

const RADIO_PLAYGROUND: PlaygroundConfig = {
  controls: [
    { type: "text", name: "label", default: "Plan" },
    { type: "text", name: "sideLabel", default: "Pro" },
    { type: "text", name: "description", default: "Best for growing teams." },
    { type: "boolean", name: "checked", label: "defaultChecked", default: true },
    { type: "boolean", name: "error", default: false },
    { type: "boolean", name: "disabled", default: false },
  ],
  render: (v: PlaygroundValues) => (
    <Radio
      name="playground-plan"
      value="pro"
      label={(v.label as string) || undefined}
      sideLabel={(v.sideLabel as string) || undefined}
      description={(v.description as string) || undefined}
      defaultChecked={v.checked as boolean}
      error={v.error as boolean}
      disabled={v.disabled as boolean}
    />
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`name="plan"`, `value="pro"`]
    if (v.label) attrs.push(`label="${v.label}"`)
    if (v.sideLabel) attrs.push(`sideLabel="${v.sideLabel}"`)
    if (v.description) attrs.push(`description="${v.description}"`)
    if (v.checked) attrs.push("defaultChecked")
    if (v.error) attrs.push("error")
    if (v.disabled) attrs.push("disabled")
    return `<Radio ${attrs.join(" ")} />`
  },
}

export function RadioDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Radio } from "@maxa/ui"\n\n<Radio\n  name="plan"\n  value="pro"\n  label="Plan"\n  sideLabel="Pro"\n  description="Best for growing teams."\n  defaultChecked\n/>`}
      playground={RADIO_PLAYGROUND}
    >
      <div style={stack}>
        <Radio
          name="plan-preview"
          value="pro"
          label="Plan"
          sideLabel="Pro"
          description="Best for growing teams."
          defaultChecked
        />
        <Radio
          name="plan-preview"
          value="enterprise"
          label="Plan"
          sideLabel="Enterprise"
          description="Advanced controls and support."
        />
      </div>
    </ComponentPreview>
  )
}
