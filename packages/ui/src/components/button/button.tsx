import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import "./button.css"

const buttonVariants = cva("maxa-button", {
  variants: {
    variant: {
      primary:   "maxa-button--primary",
      secondary: "maxa-button--secondary",
      outline:   "maxa-button--outline",
      ghost:     "maxa-button--ghost",
      link:      "maxa-button--link",
      success:   "maxa-button--success",
      danger:    "maxa-button--danger",
    },
    size: {
      xs: "maxa-button--xs",
      sm: "maxa-button--sm",
      md: "maxa-button--md",
      lg: "maxa-button--lg",
    },
    iconOnly: {
      true:  "maxa-button--icon-only",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    iconOnly: false,
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  iconLeading?: React.ReactNode
  iconTrailing?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconOnly,
      asChild = false,
      loading = false,
      disabled,
      iconLeading,
      iconTrailing,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    // When asChild, Slot merges props onto the single child — pass children as-is.
    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={buttonVariants({ variant, size, iconOnly, className })}
          aria-disabled={isDisabled || undefined}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        ref={ref}
        className={buttonVariants({ variant, size, iconOnly, className })}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        data-loading={loading || undefined}
        {...props}
      >
        {loading ? (
          <span className="maxa-button__spinner" aria-hidden="true" />
        ) : (
          iconLeading && (
            <span className="maxa-button__icon maxa-button__icon--leading" aria-hidden="true">
              {iconLeading}
            </span>
          )
        )}
        {children && <span className="maxa-button__label">{children}</span>}
        {!loading && iconTrailing && (
          <span className="maxa-button__icon maxa-button__icon--trailing" aria-hidden="true">
            {iconTrailing}
          </span>
        )}
      </Comp>
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants }
