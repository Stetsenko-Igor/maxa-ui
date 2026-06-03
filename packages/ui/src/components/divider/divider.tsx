"use client"
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import "./divider.css"

export type DividerOrientation = "horizontal" | "vertical"

export interface DividerProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: DividerOrientation
  decorative?: boolean
}

const Divider = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  DividerProps
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      className={["maxa-divider", className].filter(Boolean).join(" ")}
      orientation={orientation}
      decorative={decorative}
      {...props}
    />
  ),
)

Divider.displayName = "Divider"

export { Divider }
