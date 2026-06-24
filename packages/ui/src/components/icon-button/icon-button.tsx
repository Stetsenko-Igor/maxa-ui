import * as React from "react"
import { Button } from "../button/button.js"

import type { ButtonProps } from "../button/button.js"

export interface IconButtonProps
  extends Omit<ButtonProps, "iconOnly" | "children" | "iconLeading" | "iconTrailing"> {
  icon: React.ReactNode
  "aria-label": string
  size?: "xs" | "sm" | "md" | "lg"
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "md", ...props }, ref) => {
    return (
      <Button ref={ref} iconOnly iconLeading={icon} size={size} {...props} />
    )
  },
)

IconButton.displayName = "IconButton"

export { IconButton }
