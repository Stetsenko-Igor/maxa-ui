import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import "./badge.css"

const badgeVariants = cva("maxa-badge", {
  variants: {
    size: {
      sm: "maxa-badge--sm",
      md: "maxa-badge--md",
      lg: "maxa-badge--lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type BadgeIntent = "neutral" | "info" | "success" | "warning" | "error"
export type BadgeEmphasis = "low" | "medium" | "high"
export type BadgeSize = "sm" | "md" | "lg"
export type BadgeAppearance =
  | "gray" | "red" | "orange" | "amber" | "yellow" | "lime"
  | "green" | "emerald" | "teal" | "cyan" | "sky"
  | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  intent?: BadgeIntent
  emphasis?: BadgeEmphasis
  appearance?: BadgeAppearance
  asChild?: boolean
  icon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      size,
      intent = "neutral",
      emphasis = "low",
      appearance,
      asChild = false,
      icon,
      trailingIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span"

    const dataProps = {
      "data-intent": appearance ? undefined : intent,
      "data-emphasis": emphasis,
      ...(appearance ? { "data-appearance": appearance } : {}),
    }

    // When asChild, Slot merges props onto the single child — pass children as-is.
    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={badgeVariants({ size, className })}
          {...dataProps}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        ref={ref}
        className={badgeVariants({ size, className })}
        {...dataProps}
        {...props}
      >
        {icon && (
          <span className="maxa-badge__icon maxa-badge__icon--leading" aria-hidden="true">
            {icon}
          </span>
        )}
        {children && <span className="maxa-badge__label">{children}</span>}
        {trailingIcon && (
          <span className="maxa-badge__icon maxa-badge__icon--trailing" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </Comp>
    )
  },
)

Badge.displayName = "Badge"

export { Badge, badgeVariants }
