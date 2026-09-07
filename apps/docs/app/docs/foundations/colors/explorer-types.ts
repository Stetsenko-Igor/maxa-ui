export type ColorMode = "light" | "dark"
export interface TokenModeValue {
  raw: string
  resolved: string | null
  references: string[]
}
export interface ColorExplorerToken {
  name: string
  layer: "primitive" | "semantic" | "component" | "foundation"
  group: string
  source: string
  color: boolean
  light: TokenModeValue
  dark: TokenModeValue
  consumers: { component: string; selector: string; property: string }[]
}
export interface ColorExplorerData {
  tokens: ColorExplorerToken[]
}
