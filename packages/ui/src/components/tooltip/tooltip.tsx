"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import "./tooltip.css"

/**
 * Re-export of Radix Tooltip Provider. Mount once near your app root so
 * tooltips can share a single delay timer and pointer-leave grace period.
 *
 * @example
 * <TooltipProvider>
 *   <App />
 * </TooltipProvider>
 */
const TooltipProvider = TooltipPrimitive.Provider

export type TooltipSide = "top" | "right" | "bottom" | "left"
export type TooltipAlign = "start" | "center" | "end"

export interface TooltipProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    "content"
  > {
  /** Tooltip body. Keep it short — tooltips are not for rich/interactive content. */
  content: React.ReactNode
  /** Preferred side of the trigger to render against. */
  side?: TooltipSide
  /** Alignment along the chosen side. */
  align?: TooltipAlign
  /** Hover delay before the tooltip opens, in ms. */
  delayDuration?: number
  /** Distance in px between trigger and content. */
  sideOffset?: number
  /** Controlled open state (forwarded to Radix Root). */
  open?: boolean
  /** Default open state for uncontrolled usage. */
  defaultOpen?: boolean
  /** Open-state change handler. */
  onOpenChange?: (open: boolean) => void
  /** The trigger element. Rendered via Radix `asChild`. */
  children: React.ReactNode
}

/**
 * Tooltip — accessible, positioned hint shown on hover/focus of its trigger.
 *
 * Composes Radix `Root + Trigger(asChild) + Portal + Content + Arrow`.
 * The forwarded ref points at the Content element.
 *
 * Requires a `TooltipProvider` somewhere above it in the tree.
 *
 * @example
 * <Tooltip content="Copy to clipboard">
 *   <Button aria-label="Copy"><CopyIcon /></Button>
 * </Tooltip>
 */
const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps
>(
  (
    {
      content,
      children,
      side = "top",
      align = "center",
      delayDuration = 200,
      sideOffset = 6,
      open,
      defaultOpen,
      onOpenChange,
      className,
      ...contentProps
    },
    ref,
  ) => {
    // Spread root-only props conditionally so we never pass an explicit
    // `undefined` under `exactOptionalPropertyTypes`.
    const rootProps: React.ComponentPropsWithoutRef<
      typeof TooltipPrimitive.Root
    > = { delayDuration }
    if (open !== undefined) rootProps.open = open
    if (defaultOpen !== undefined) rootProps.defaultOpen = defaultOpen
    if (onOpenChange !== undefined) rootProps.onOpenChange = onOpenChange

    return (
      <TooltipPrimitive.Root {...rootProps}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={["maxa-tooltip", className].filter(Boolean).join(" ")}
            {...contentProps}
          >
            {content}
            <TooltipPrimitive.Arrow className="maxa-tooltip__arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    )
  },
)

Tooltip.displayName = "Tooltip"

export { Tooltip, TooltipProvider }
