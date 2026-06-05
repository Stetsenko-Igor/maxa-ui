import * as React from "react"
import "./spinner.css"

export type SpinnerSize = "sm" | "md" | "lg"
export type SpinnerAppearance = "white" | "primary" | "greyscale" | "inverted"
export type SpinnerTone = "brand" | "neutral" | "inverse"

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  appearance?: SpinnerAppearance
  /** @deprecated Use appearance. */
  tone?: SpinnerTone
  label?: string
  decorative?: boolean
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      size = "md",
      appearance,
      tone,
      label = "Loading",
      decorative = false,
      ...props
    },
    ref,
  ) => {
    const resolvedAppearance = appearance ?? mapToneToAppearance(tone)

    return (
      <span
        ref={ref}
        className={[
          "maxa-spinner",
          `maxa-spinner--${size}`,
          `maxa-spinner--${resolvedAppearance}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
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

function mapToneToAppearance(tone?: SpinnerTone): SpinnerAppearance {
  if (tone === "neutral") return "greyscale"
  if (tone === "inverse") return "inverted"
  return "primary"
}
