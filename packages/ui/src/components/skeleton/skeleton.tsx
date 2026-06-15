import * as React from "react"
import "./skeleton.css"
import { cn } from "../../lib/cn.js"

export type SkeletonVariant = "text" | "rect" | "circle"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rect", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("maxa-skeleton", `maxa-skeleton--${variant}`, className)}
      aria-hidden="true"
      {...props}
    />
  ),
)

Skeleton.displayName = "Skeleton"

export { Skeleton }
