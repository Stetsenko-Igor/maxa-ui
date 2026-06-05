import * as React from "react"
import "./utility-button.css"

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
      className={["maxa-utility-button", `maxa-utility-button--${size}`, className].filter(Boolean).join(" ")}
      {...props}
    >
      {icon}
    </button>
  ),
)
UtilityButton.displayName = "UtilityButton"

export { UtilityButton }
