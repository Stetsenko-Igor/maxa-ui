"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-switch"
import "./toggle.css"

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  error?: boolean
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, error = false, ...props }, ref) => {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={`maxa-toggle${className ? ` ${className}` : ""}`}
      data-error={error || undefined}
      aria-invalid={error || undefined}
      {...props}
    >
      <TogglePrimitive.Thumb className="maxa-toggle__thumb" />
    </TogglePrimitive.Root>
  )
})

Toggle.displayName = "Toggle"

export { Toggle }
