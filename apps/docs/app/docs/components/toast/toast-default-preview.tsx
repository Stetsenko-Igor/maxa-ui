"use client"

import * as React from "react"
import {
  Button,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"
import { DefaultDemo } from "./_demos"

type ToastIntent = "neutral" | "info" | "success" | "warning" | "error"

function PlaygroundToast({
  intent,
  title,
  description,
  withAction,
}: {
  intent: ToastIntent
  title: string
  description: string
  withAction: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  function show() {
    setOpen(false)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setOpen(true), 50)
  }

  return (
    <ToastProvider>
      <Button size="sm" variant="outline" onClick={show}>
        Show toast
      </Button>
      <Toast intent={intent} open={open} onOpenChange={setOpen}>
        <div className="maxa-toast__body">
          <ToastTitle>{title}</ToastTitle>
          {description ? <ToastDescription>{description}</ToastDescription> : null}
        </div>
        {withAction ? <ToastAction altText="View the result">View</ToastAction> : null}
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

const TOAST_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "intent",
      options: [
        { label: "neutral", value: "neutral" },
        { label: "info", value: "info" },
        { label: "success", value: "success" },
        { label: "warning", value: "warning" },
        { label: "error", value: "error" },
      ],
      default: "success",
    },
    { type: "text", name: "title", default: "Design published" },
    { type: "text", name: "description", default: "Your design is now live." },
    { type: "boolean", name: "action", default: false },
  ],
  render: (v: PlaygroundValues) => (
    <PlaygroundToast
      intent={v.intent as ToastIntent}
      title={v.title as string}
      description={v.description as string}
      withAction={v.action as boolean}
    />
  ),
  code: (v: PlaygroundValues) => {
    const lines = [
      `const { toast } = useToast()`,
      ``,
      `toast({`,
      `  intent: "${v.intent}",`,
      `  title: "${v.title}",`,
    ]
    if (v.description) lines.push(`  description: "${v.description}",`)
    if (v.action) lines.push(`  action: <ToastAction altText="View the result">View</ToastAction>,`)
    lines.push(`})`)
    return lines.join("\n")
  },
}

export function ToastDefaultPreview() {
  return (
    <ComponentPreview
      code={`<ToastProvider>
  <Toast open={open} onOpenChange={setOpen}>
    <div className="maxa-toast__body">
      <ToastTitle>Design saved</ToastTitle>
    </div>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>`}
      playground={TOAST_PLAYGROUND}
    >
      <DefaultDemo />
    </ComponentPreview>
  )
}
