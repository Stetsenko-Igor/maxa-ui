"use client"
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import "./separator.css"
import { cn } from "../../lib/cn.js"

export type SeparatorOrientation = "horizontal" | "vertical"

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: SeparatorOrientation
  decorative?: boolean
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      className={cn("maxa-separator", className)}
      orientation={orientation}
      decorative={decorative}
      {...props}
    />
  ),
)

Separator.displayName = "Separator"

export { Separator }
