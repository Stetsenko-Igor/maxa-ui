import * as React from "react"
import "./utility-button.css"
import { cn } from "../../lib/cn.js"

export interface UtilityButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  size?: "sm" | "md" | "lg"
  selected?: boolean
}

const UtilityButton = React.forwardRef<HTMLButtonElement, UtilityButtonProps>(
  ({ className, icon, size = "md", selected, "aria-label": ariaLabel, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      aria-pressed={selected || undefined}
      data-selected={selected || undefined}
      className={cn("maxa-utility-button", `maxa-utility-button--${size}`, className)}
      {...props}
    >
      {icon}
    </button>
  ),
)
UtilityButton.displayName = "UtilityButton"

export { UtilityButton }
