"use client"

import { Alert, AlertAction } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const col: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-6)",
  width: "100%",
  maxWidth: "657px",
  padding: "var(--spacing-4) 0",
  boxSizing: "border-box",
}

const ALERT_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "intent",
      options: [
        { label: "info", value: "info" },
        { label: "success", value: "success" },
        { label: "warning", value: "warning" },
        { label: "danger", value: "danger" },
      ],
      default: "info",
    },
    { type: "text", name: "title", label: "Title", default: "" },
    { type: "boolean", name: "action", default: false },
    { type: "boolean", name: "dismissible", default: false },
    { type: "text", name: "body", label: "Body", default: "Your trial ends in 3 days." },
  ],
  render: (v: PlaygroundValues) => (
    <div style={{ width: "100%", maxWidth: "657px" }}>
      <Alert
        intent={v.intent as "info" | "success" | "warning" | "danger"}
        title={(v.title as string) || undefined}
        dismissible={v.dismissible as boolean}
        action={
          v.action ? (
            <AlertAction variant={v.title ? "primary" : "outline"}>Action</AlertAction>
          ) : undefined
        }
      >
        {v.body as string}
      </Alert>
    </div>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`intent="${v.intent}"`]
    if (v.title) attrs.push(`title="${v.title}"`)
    if (v.action) attrs.push(`action={<AlertAction${v.title ? ' variant="primary"' : ""}>Action</AlertAction>}`)
    if (v.dismissible) attrs.push("dismissible")
    return `<Alert ${attrs.join(" ")}>\n  ${v.body}\n</Alert>`
  },
}

export function AlertDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Alert, AlertAction } from "@maxa/ui"\n\n<Alert intent="info">\n  Your trial ends in 3 days.\n</Alert>`}
      playground={ALERT_PLAYGROUND}
    >
      <div style={col}>
        <Alert intent="info">Your trial ends in 3 days.</Alert>
      </div>
    </ComponentPreview>
  )
}
