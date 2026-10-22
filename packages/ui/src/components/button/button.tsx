import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { Spinner } from "../spinner/spinner.js"

import "./button.css"

import type { VariantProps } from "class-variance-authority"

const buttonVariants = cva("maxa-button", {
  variants: {
    variant: {
      primary: "maxa-button--primary",
      secondary: "maxa-button--secondary",
      outline: "maxa-button--outline",
      ghost: "maxa-button--ghost",
      link: "maxa-button--link",
      positive: "maxa-button--positive",
      destructive: "maxa-button--destructive",
      "destructive-outline": "maxa-button--destructive-outline",
    },
    colorScheme: {
      default: "",
      inverse: "maxa-button--inverse",
    },
    size: {
      xs: "maxa-button--xs",
      sm: "maxa-button--sm",
      md: "maxa-button--md",
      lg: "maxa-button--lg",
    },
    iconOnly: {
      true: "maxa-button--icon-only",
      false: "",
    },
    fullWidth: {
      true: "maxa-button--full-width",
      false: "",
    },
    hasBackground: {
      true: "maxa-button--has-background",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    colorScheme: "default",
    size: "lg",
    iconOnly: false,
    fullWidth: false,
    hasBackground: false,
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  iconLeading?: React.ReactNode
  iconTrailing?: React.ReactNode
}

const spinnerAppearance = {
  primary: "white",
  secondary: "greyscale",
  outline: "greyscale",
  ghost: "greyscale",
  link: "primary",
  positive: "white",
  destructive: "white",
  "destructive-outline": "greyscale",
} as const

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      colorScheme,
      size,
      iconOnly,
      fullWidth,
      hasBackground,
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
          className={buttonVariants({
            variant,
            colorScheme,
            size,
            iconOnly,
            fullWidth,
            hasBackground,
            className,
          })}
          aria-disabled={isDisabled || undefined}
          aria-busy={loading || undefined}
          data-as-child="true"
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        ref={ref}
        className={buttonVariants({
          variant,
          colorScheme,
          size,
          iconOnly,
          fullWidth,
          hasBackground,
          className,
        })}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        data-icon-leading={loading || iconLeading ? "" : undefined}
        data-icon-trailing={!loading && iconTrailing ? "" : undefined}
        {...props}
      >
        {loading ? (
          <Spinner
            className="maxa-button__spinner"
            appearance={
              colorScheme === "inverse" && (variant === "ghost" || variant === "outline")
                ? "white"
                : spinnerAppearance[variant ?? "primary"]
            }
            decorative
          />
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
