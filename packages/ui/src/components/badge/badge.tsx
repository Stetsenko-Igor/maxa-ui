import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import "./badge.css"

const badgeVariants = cva("maxa-badge", {
  variants: {
    size: {
      sm: "maxa-badge--sm",
      md: "maxa-badge--md",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type BadgeIntent = "neutral" | "info" | "success" | "warning" | "error"
export type BadgeEmphasis = "low" | "medium" | "high"
export type BadgeSize = "sm" | "md"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  intent?: BadgeIntent
  emphasis?: BadgeEmphasis
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
      asChild = false,
      icon,
      trailingIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span"

    // When asChild, Slot merges props onto the single child — pass children as-is.
    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={badgeVariants({ size, className })}
          data-intent={intent}
          data-emphasis={emphasis}
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
        data-intent={intent}
        data-emphasis={emphasis}
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
