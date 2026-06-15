"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import "./popover.css"
import { cn } from "../../lib/cn.js"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor
const PopoverClose = PopoverPrimitive.Close

export type PopoverSide = "top" | "right" | "bottom" | "left"
export type PopoverAlign = "start" | "center" | "end"

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /** Preferred side of the trigger to render against. */
  side?: PopoverSide
  /** Alignment along the chosen side. */
  align?: PopoverAlign
  /** Distance in px between trigger and content. */
  sideOffset?: number
  /** Render the directional arrow. */
  arrow?: boolean
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      children,
      side = "bottom",
      align = "center",
      sideOffset = 8,
      arrow = true,
      ...props
    },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn("maxa-popover", className)}
        {...props}
      >
        {children}
        {arrow && <PopoverPrimitive.Arrow className="maxa-popover__arrow" />}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
)

PopoverContent.displayName = "PopoverContent"

export {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
}
