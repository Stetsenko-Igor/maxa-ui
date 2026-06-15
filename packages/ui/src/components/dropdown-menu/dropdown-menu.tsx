"use client"

import * as React from "react"
import { Check, CaretRight } from "@maxa/icons"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import "./dropdown-menu.css"
import { cn } from "../../lib/cn.js"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export type DropdownMenuSide = "top" | "right" | "bottom" | "left"
export type DropdownMenuAlign = "start" | "center" | "end"
export type DropdownMenuItemVariant = "default" | "destructive"

type MenuItemOptions = {
  inset?: boolean
  selection?: "checkbox" | "radio"
  variant?: DropdownMenuItemVariant
}

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  side?: DropdownMenuSide
  align?: DropdownMenuAlign
  sideOffset?: number
}

const getItemClassName = (
  className: string | undefined,
  { inset, selection, variant = "default" }: MenuItemOptions,
) =>
  cn(
    "maxa-dropdown-menu__item",
    inset && "maxa-dropdown-menu__item--inset",
    variant === "destructive" && "maxa-dropdown-menu__item--destructive",
    selection === "checkbox" && "maxa-dropdown-menu__item--checkbox",
    selection === "radio" && "maxa-dropdown-menu__item--radio",
    className,
  )

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(
  (
    {
      className,
      side = "bottom",
      align = "center",
      sideOffset = 6,
      ...props
    },
    ref,
  ) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn("maxa-dropdown-menu", className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  ),
)
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    sideOffset={sideOffset}
    className={cn("maxa-dropdown-menu", "maxa-dropdown-menu--sub", className)}
    {...props}
  />
))
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & MenuItemOptions
>(({ className, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={getItemClassName(className, { inset: Boolean(inset), variant })}
    {...props}
  />
))
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & MenuItemOptions
>(({ className, children, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={getItemClassName(className, {
      inset: Boolean(inset),
      selection: "checkbox",
      variant,
    })}
    {...props}
  >
    <span className="maxa-dropdown-menu__indicator" aria-hidden="true">
      <CheckIcon />
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & MenuItemOptions
>(({ className, children, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={getItemClassName(className, {
      inset: Boolean(inset),
      selection: "radio",
      variant,
    })}
    {...props}
  >
    <span className="maxa-dropdown-menu__indicator" aria-hidden="true">
      <DotIcon />
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & MenuItemOptions
>(({ className, children, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={getItemClassName(className, { inset: Boolean(inset), variant })}
    {...props}
  >
    {children}
    <ChevronRightIcon />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("maxa-dropdown-menu__label", inset && "maxa-dropdown-menu__label--inset", className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("maxa-dropdown-menu__separator", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("maxa-dropdown-menu__shortcut", className)}
    {...props}
  />
))
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}

function CheckIcon() {
  return <Check width="100%" height="100%" aria-hidden focusable={false} />
}

function DotIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
}

function ChevronRightIcon() {
  return <CaretRight width={16} height={16} aria-hidden focusable={false} />
}
