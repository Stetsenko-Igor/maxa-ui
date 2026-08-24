import * as React from "react"
import { cn } from "../../lib/cn.js"
import "./maxa-logo.css"

export interface MaxaLogoProps extends React.SVGAttributes<SVGSVGElement> {
  decorative?: boolean
}

const MaxaLogo = React.forwardRef<SVGSVGElement, MaxaLogoProps>(
  (
    {
      decorative = false,
      width = 120,
      height,
      className,
      style,
      role,
      "aria-label": ariaLabel,
      "aria-hidden": ariaHidden,
      ...props
    },
    ref,
  ) => (
    <svg
      {...props}
      ref={ref}
      className={cn("maxa-logo", className)}
      viewBox="0 0 1518 262"
      preserveAspectRatio="xMidYMid meet"
      width={width}
      height={height}
      role={decorative ? undefined : (role ?? "img")}
      aria-label={decorative ? undefined : (ariaLabel ?? "MAXA")}
      aria-hidden={decorative ? true : ariaHidden}
      focusable="false"
      style={height === undefined ? { height: "auto", ...style } : style}
    >
      <g fill="currentColor">
        <path d="M0 0h38l124 170L279 0h38v262h-36V49L173 221h-21L36 50v212H0z" />
        <path d="M391 262h46L556 31l117 231h49L579 0h-46L391 262zM513 164h110l17 34H531z" />
        <path d="M795 0h64l254 262h-64zM1034 0h56L853 262h-56z" />
        <path d="M1187 262h46L1352 31l117 231h49L1375 0h-46L1187 262zM1309 164h110l17 34h-109z" />
      </g>
    </svg>
  ),
)
MaxaLogo.displayName = "MaxaLogo"

export { MaxaLogo }
