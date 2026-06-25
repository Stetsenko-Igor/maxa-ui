import * as React from "react"
import "./spinner.css"
import { cn } from "../../lib/cn.js"

export type SpinnerSize = "sm" | "md" | "lg"
// `appearance` is a non-semantic color treatment (contrast on a given surface),
// not the shared decorative hue palette. See specs/patterns/variant-vocabulary.md.
export type SpinnerAppearance = "white" | "primary" | "greyscale" | "inverted"

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  appearance?: SpinnerAppearance
  label?: string
  decorative?: boolean
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      size = "md",
      appearance = "primary",
      label = "Loading",
      decorative = false,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn("maxa-spinner", `maxa-spinner--${size}`, `maxa-spinner--${appearance}`, className)}
        role={decorative ? undefined : "status"}
        aria-label={decorative ? undefined : label}
        aria-hidden={decorative || undefined}
        {...props}
      />
    )
  },
)

Spinner.displayName = "Spinner"

export { Spinner }
