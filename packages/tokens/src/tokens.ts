export const radius = {
  none: "0px",
  xxs:  "2px",
  xs:   "4px",
  sm:   "6px",
  md:   "8px",
  lg:   "10px",
  xl:   "12px",
  "2xl": "16px",
  "3xl": "20px",
  "4xl": "24px",
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
  body: "Montserrat, ui-sans-serif, system-ui, sans-serif",
  mono: "Roboto Mono, ui-monospace, SFMono-Regular, Menlo, monospace",
} as const

export const fontSize = {
  "heading-2xl": "40px",
  "heading-xl": "32px",
  "heading-lg": "26px",
  "heading-md": "22px",
  "heading-sm": "18px",
  "heading-xs": "16px",
  "text-lg": "16px",
  "text-md": "14px",
  "text-sm": "12px",
  "caption-sm": "10px",
  "caption-xs": "8px",
} as const

export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
} as const

export type Radius = keyof typeof radius
export type Spacing = keyof typeof spacing
export type FontSize = keyof typeof fontSize
export type FontWeight = keyof typeof fontWeight
