"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import "./switch.css"

const switchVariants = cva("maxa-switch", {
  variants: {
    size: {
      sm: "maxa-switch--sm",
      md: "maxa-switch--md",
      lg: "maxa-switch--lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type SwitchSize = "sm" | "md" | "lg"

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  error?: boolean
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, error = false, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={switchVariants({ size, className })}
      data-error={error || undefined}
      aria-invalid={error || undefined}
      {...props}
    >
      <SwitchPrimitive.Thumb className="maxa-switch__thumb" />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = "Switch"

export { Switch, switchVariants }
