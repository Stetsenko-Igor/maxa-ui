"use client"

import { Toggle } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }

const TOGGLE_PLAYGROUND: PlaygroundConfig = {
  controls: [
    { type: "text", name: "label", default: "Notifications" },
    { type: "text", name: "sideLabel", default: "Email updates" },
    { type: "text", name: "description", default: "Receive product and billing messages." },
    { type: "boolean", name: "checked", default: true },
    { type: "boolean", name: "error", default: false },
    { type: "boolean", name: "disabled", default: false },
  ],
  render: (v: PlaygroundValues) => (
    <Toggle
      label={(v.label as string) || undefined}
      sideLabel={(v.sideLabel as string) || undefined}
      description={(v.description as string) || undefined}
      checked={v.checked as boolean}
      onCheckedChange={() => {}}
      error={v.error as boolean}
      disabled={v.disabled as boolean}
    />
  ),
  code: (v: PlaygroundValues) => {
    const attrs: string[] = []
    if (v.label) attrs.push(`label="${v.label}"`)
    if (v.sideLabel) attrs.push(`sideLabel="${v.sideLabel}"`)
    if (v.description) attrs.push(`description="${v.description}"`)
    if (v.checked) attrs.push("defaultChecked")
    if (v.error) attrs.push("error")
    if (v.disabled) attrs.push("disabled")
    return `<Toggle ${attrs.join(" ")} />`
  },
}

export function ToggleDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Toggle } from "@maxa/ui"\n\n<Toggle\n  label="Notifications"\n  sideLabel="Email updates"\n  description="Receive product and billing messages."\n  defaultChecked\n/>`}
      playground={TOGGLE_PLAYGROUND}
    >
      <div style={row}>
        <Toggle
          label="Notifications"
          sideLabel="Email updates"
          description="Receive product and billing messages."
          defaultChecked
        />
        <Toggle
          label="Privacy"
          sideLabel="Show online status"
          description="Visible to teammates in the workspace."
        />
      </div>
    </ComponentPreview>
  )
}
