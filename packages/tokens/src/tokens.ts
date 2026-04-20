export const radius = {
  none: "0px",
  sm:   "4px",
  md:   "8px",
  lg:   "12px",
  xl:   "16px",
  "2xl": "24px",
  full: "9999px",
} as const

export const spacing = {
  1:  "4px",
  2:  "8px",
  3:  "12px",
  4:  "16px",
  5:  "20px",
  6:  "24px",
  7:  "28px",
  8:  "32px",
  9:  "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
} as const

export const fontFamily = {
  sans:    "Montserrat, ui-sans-serif, system-ui, sans-serif",
  display: "Bebas Neue, ui-sans-serif, sans-serif",
  mono:    "ui-monospace, Cascadia Code, monospace",
} as const

export type Radius = keyof typeof radius
export type Spacing = keyof typeof spacing
