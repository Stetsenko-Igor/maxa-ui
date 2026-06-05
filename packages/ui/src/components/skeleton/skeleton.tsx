import * as React from "react"
import "./skeleton.css"

export type SkeletonVariant = "text" | "rect" | "circle"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rect", ...props }, ref) => (
    <div
      ref={ref}
      className={["maxa-skeleton", `maxa-skeleton--${variant}`, className].filter(Boolean).join(" ")}
      aria-hidden="true"
      {...props}
    />
  ),
)

Skeleton.displayName = "Skeleton"

export { Skeleton }
