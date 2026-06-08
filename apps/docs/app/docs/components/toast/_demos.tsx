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

type ToastIntent = "neutral" | "info" | "success" | "warning" | "error"

function DemoProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <ToastViewport />
    </ToastProvider>
  )
}

export function ControlledToast({
  intent,
  title,
  description,
  action,
}: {
  intent?: ToastIntent
  title: string
  description?: string
  action?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  function show() {
    setOpen(false)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setOpen(true), 50)
  }

  return (
    <DemoProvider>
      <Button size="sm" variant="outline" onClick={show}>
        Show toast
      </Button>
      <Toast intent={intent} open={open} onOpenChange={setOpen}>
        <div className="maxa-toast__body">
          <ToastTitle>{title}</ToastTitle>
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
        {action}
        <ToastClose />
      </Toast>
    </DemoProvider>
  )
}

export const INTENTS: { intent: ToastIntent; title: string }[] = [
  { intent: "neutral", title: "Design saved" },
  { intent: "info",    title: "Import started" },
  { intent: "success", title: "Design published" },
  { intent: "warning", title: "Session expiring soon" },
  { intent: "error",   title: "Upload failed" },
]

export function AllIntentsDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {INTENTS.map(({ intent, title }) => (
        <ControlledToast key={intent} intent={intent} title={title} />
      ))}
    </div>
  )
}

export function WithDescriptionDemo() {
  return (
    <ControlledToast
      intent="info"
      title="Import started"
      description="48 designs are being imported. This may take a moment."
    />
  )
}

export function WithActionDemo() {
  return (
    <ControlledToast
      intent="success"
      title="Design published"
      description="Your design is now live."
      action={<ToastAction altText="View the published design">View</ToastAction>}
    />
  )
}

export function DefaultDemo() {
  return <ControlledToast title="Design saved" />
}
