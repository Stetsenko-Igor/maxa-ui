"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import "./tag.css"

const tagVariants = cva("maxa-tag", {
  variants: {
    size: {
      sm: "maxa-tag--sm",
      md: "maxa-tag--md",
      lg: "maxa-tag--lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type TagAppearance =
  | "gray" | "red" | "orange" | "amber" | "yellow" | "lime"
  | "green" | "emerald" | "teal" | "cyan" | "sky"
  | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"

export type TagEmphasis = "low" | "medium" | "high"
export type TagSize = "sm" | "md" | "lg"

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  appearance?: TagAppearance
  emphasis?: TagEmphasis
  removable?: boolean
  onRemove?: () => void
  asChild?: boolean
  icon?: React.ReactNode
}

function XIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="2" y1="2" x2="10" y2="10" />
      <line x1="10" y1="2" x2="2" y2="10" />
    </svg>
  )
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      size,
      appearance = "gray",
      emphasis = "low",
      removable = false,
      onRemove,
      asChild = false,
      icon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span"

    // asChild and removable are mutually exclusive:
    // Slot requires a single child, but removable adds a second (button).
    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={tagVariants({ size, className })}
          data-appearance={appearance}
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
        className={tagVariants({ size, className })}
        data-appearance={appearance}
        data-emphasis={emphasis}
        {...props}
      >
        {icon && (
          <span className="maxa-tag__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {children && <span className="maxa-tag__label">{children}</span>}
        {removable && (
          <button
            type="button"
            className="maxa-tag__remove"
            aria-label={typeof children === "string" ? `Remove ${children}` : "Remove"}
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            tabIndex={0}
          >
            <XIcon />
          </button>
        )}
      </Comp>
    )
  },
)

Tag.displayName = "Tag"

export { Tag, tagVariants }
