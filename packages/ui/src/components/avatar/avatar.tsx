"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import "./avatar.css"
import { cn } from "../../lib/cn.js"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"
export type AvatarShape = "circle" | "square"
export type AvatarStatus = "online" | "offline" | "busy" | "away"
export type AvatarTone = "strong" | "medium" | "neutral"
export type AvatarColor =
  | "blue"
  | "green"
  | "teal"
  | "yellow"
  | "orange"
  | "red"
  | "rose"
  | "violet"
  | "purple"

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  color?: AvatarColor
  shape?: AvatarShape
  size?: AvatarSize
  status?: AvatarStatus
  tone?: AvatarTone
}

export type AvatarImageProps =
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>

export type AvatarFallbackProps =
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  overflow?: "count" | "ellipsis"
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, children, color = "blue", shape = "circle", size = "md", status, tone = "strong", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("maxa-avatar", className)}
    data-color={color}
    data-shape={shape}
    data-size={size}
    data-tone={tone}
    {...props}
  >
    {children}
    {status && <span className="maxa-avatar__status" data-status={status} aria-hidden="true" />}
  </AvatarPrimitive.Root>
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("maxa-avatar__image", className)}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("maxa-avatar__fallback", className)}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, overflow: overflowVariant = "count", ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visibleChildren = max ? childArray.slice(0, max) : childArray
    const overflow = max ? childArray.length - visibleChildren.length : 0

    return (
      <div
        ref={ref}
        className={cn("maxa-avatar-group", className)}
        {...props}
      >
        {visibleChildren}
        {overflow > 0 && (
          <Avatar aria-label={`${overflow} more`} size="md" tone="neutral">
            <AvatarFallback>{overflowVariant === "ellipsis" ? "..." : `+${overflow}`}</AvatarFallback>
          </Avatar>
        )}
      </div>
    )
  },
)
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage }
