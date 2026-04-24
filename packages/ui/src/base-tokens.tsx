import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from "react"
import { createElement } from "react"
import type { FontSize, FontWeight, Radius, Spacing } from "@maxa/tokens"

type SpaceToken = `${Spacing}`
type RadiusToken = Radius
type FontSizeToken = FontSize
type FontWeightToken = FontWeight

type ElementName =
  | "article"
  | "aside"
  | "div"
  | "footer"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "header"
  | "label"
  | "main"
  | "nav"
  | "p"
  | "section"
  | "span"

export type ContentColorToken =
  | "primary"
  | "secondary"
  | "tertiary"
  | "placeholder"
  | "disabled"
  | "on-brand"
  | "brand"
  | "info"
  | "success"
  | "error"
  | "warning"
  | "neutral"

export type BackgroundColorToken =
  | "default"
  | "surface-layer1"
  | "surface-layer2"
  | "neutral-subtle"
  | "neutral-on-subtle"
  | "neutral-strong"
  | "disabled"
  | "overlay"
  | "nav"
  | "brand-subtle"
  | "brand-surface"
  | "info-subtle"
  | "info-surface"
  | "success-subtle"
  | "success-surface"
  | "success-strong"
  | "error-subtle"
  | "error-surface"
  | "error-strong"
  | "warning-subtle"
  | "warning-surface"
  | "warning-strong"

export type BorderColorToken =
  | "default"
  | "subtle"
  | "focus"
  | "brand-strong"
  | "info-strong"
  | "success-strong"
  | "error-strong"
  | "warning-strong"
  | "neutral-strong"
  | "neutral-subtle"

export type BoxProps = HTMLAttributes<HTMLElement> & {
  as?: ElementName
  background?: BackgroundColorToken
  borderColor?: BorderColorToken
  color?: ContentColorToken
  p?: SpaceToken
  px?: SpaceToken
  py?: SpaceToken
  pt?: SpaceToken
  pr?: SpaceToken
  pb?: SpaceToken
  pl?: SpaceToken
  radius?: RadiusToken
}

export type StackProps = BoxProps & {
  align?: CSSProperties["alignItems"]
  gap?: SpaceToken
  justify?: CSSProperties["justifyContent"]
}

export type InlineProps = StackProps & {
  wrap?: CSSProperties["flexWrap"]
}

type TextElement = "p" | "span" | "div" | "label"

export type TextProps = Omit<BoxProps, "as" | "color"> & {
  as?: TextElement
  color?: ContentColorToken
  size?: Extract<FontSizeToken, `text-${string}` | `caption-${string}`>
  weight?: FontWeightToken
}

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type HeadingProps = Omit<BoxProps, "as" | "color"> & {
  as?: HeadingElement
  color?: ContentColorToken
  size?: Extract<FontSizeToken, `heading-${string}`>
  weight?: FontWeightToken
}

export type SurfaceProps = Omit<BoxProps, "background" | "borderColor" | "radius"> & {
  background?: BackgroundColorToken
  borderColor?: BorderColorToken
  radius?: RadiusToken
}

export type TokenSwatchProps = HTMLAttributes<HTMLDivElement> & {
  label: string
  value: string
  tone?: "background" | "border" | "content"
}

const spaceVar = (token: SpaceToken) => `var(--spacing-${token})`
const radiusVar = (token: RadiusToken) => `var(--radius-${token})`
const contentColorVar = (token: ContentColorToken) => `var(--color-content-${token})`
const backgroundColorVar = (token: BackgroundColorToken) => `var(--color-bg-${token})`
const borderColorVar = (token: BorderColorToken) => `var(--color-border-${token})`
const textVar = (token: FontSizeToken) => `var(--text-${token})`
const lineHeightVar = (token: FontSizeToken) => `var(--text-${token}--line-height)`
const weightVar = (token: FontWeightToken) => `var(--font-weight-${token})`

function tokenBoxStyle(props: BoxProps): CSSProperties {
  const tokenStyle: CSSProperties = {}

  if (props.background) tokenStyle.backgroundColor = backgroundColorVar(props.background)
  if (props.borderColor) tokenStyle.borderColor = borderColorVar(props.borderColor)
  if (props.color) tokenStyle.color = contentColorVar(props.color)
  if (props.radius) tokenStyle.borderRadius = radiusVar(props.radius)
  if (props.p) tokenStyle.padding = spaceVar(props.p)
  if (props.px) {
    tokenStyle.paddingLeft = spaceVar(props.px)
    tokenStyle.paddingRight = spaceVar(props.px)
  }
  if (props.py) {
    tokenStyle.paddingTop = spaceVar(props.py)
    tokenStyle.paddingBottom = spaceVar(props.py)
  }
  if (props.pt) tokenStyle.paddingTop = spaceVar(props.pt)
  if (props.pr) tokenStyle.paddingRight = spaceVar(props.pr)
  if (props.pb) tokenStyle.paddingBottom = spaceVar(props.pb)
  if (props.pl) tokenStyle.paddingLeft = spaceVar(props.pl)

  return tokenStyle
}

function cleanBoxProps<T extends BoxProps>(props: T) {
  const htmlProps = { ...props }

  delete htmlProps.as
  delete htmlProps.background
  delete htmlProps.borderColor
  delete htmlProps.color
  delete htmlProps.p
  delete htmlProps.px
  delete htmlProps.py
  delete htmlProps.pt
  delete htmlProps.pr
  delete htmlProps.pb
  delete htmlProps.pl
  delete htmlProps.radius

  return htmlProps
}

export function Box(props: BoxProps): ReactElement {
  const { as = "div", style } = props
  return createElement(as, {
    ...cleanBoxProps(props),
    style: { ...tokenBoxStyle(props), ...style },
  })
}

export function Stack(props: StackProps): ReactElement {
  const { align, gap = "4", justify, style, ...boxProps } = props
  const stackStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: spaceVar(gap),
  }

  if (align) stackStyle.alignItems = align
  if (justify) stackStyle.justifyContent = justify

  return <Box {...boxProps} style={{ ...stackStyle, ...style }} />
}

export function Inline(props: InlineProps): ReactElement {
  const { align, gap = "4", justify, style, wrap = "wrap", ...boxProps } = props
  const inlineStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: spaceVar(gap),
    flexWrap: wrap,
  }

  if (align) inlineStyle.alignItems = align
  if (justify) inlineStyle.justifyContent = justify

  return <Box {...boxProps} style={{ ...inlineStyle, ...style }} />
}

export function Text(props: TextProps): ReactElement {
  const {
    as = "p",
    color = "secondary",
    size = "text-md",
    style,
    weight = "regular",
    ...boxProps
  } = props
  const textStyle: CSSProperties = {
    color: contentColorVar(color),
    fontFamily: "var(--font-body)",
    fontSize: textVar(size),
    fontWeight: weightVar(weight),
    lineHeight: lineHeightVar(size),
    margin: 0,
  }

  return <Box {...boxProps} as={as} style={{ ...textStyle, ...style }} />
}

export function Heading(props: HeadingProps): ReactElement {
  const {
    as = "h2",
    color = "primary",
    size = "heading-md",
    style,
    weight = "semibold",
    ...boxProps
  } = props
  const headingStyle: CSSProperties = {
    color: contentColorVar(color),
    fontFamily: "var(--font-body)",
    fontSize: textVar(size),
    fontWeight: weightVar(weight),
    lineHeight: lineHeightVar(size),
    margin: 0,
  }

  return <Box {...boxProps} as={as} style={{ ...headingStyle, ...style }} />
}

export function Surface(props: SurfaceProps): ReactElement {
  const {
    background = "surface-layer1",
    borderColor = "default",
    p = "4",
    radius = "lg",
    style,
  } = props
  const surfaceStyle: CSSProperties = {
    borderStyle: "solid",
    borderWidth: "var(--width-1)",
  }

  return (
    <Box
      {...props}
      background={background}
      borderColor={borderColor}
      p={p}
      radius={radius}
      style={{ ...surfaceStyle, ...style }}
    />
  )
}

export function TokenSwatch({
  label,
  value,
  tone = "background",
  style,
  ...props
}: TokenSwatchProps): ReactElement {
  const swatchStyle: CSSProperties = {
    alignItems: "center",
    background: "var(--color-bg-default)",
    border: "var(--width-1) solid var(--color-border-subtle)",
    borderRadius: radiusVar("md"),
    display: "flex",
    gap: spaceVar("3"),
    minWidth: "220px",
    padding: spaceVar("3"),
  }

  const chipStyle: CSSProperties = {
    alignItems: "center",
    border: "var(--width-1) solid var(--color-border-default)",
    borderRadius: radiusVar("sm"),
    display: "flex",
    flex: "0 0 auto",
    fontFamily: "var(--font-body)",
    fontSize: textVar("caption-sm"),
    fontWeight: weightVar("semibold"),
    height: spaceVar("8"),
    justifyContent: "center",
    lineHeight: lineHeightVar("caption-sm"),
    width: spaceVar("8"),
  }

  const labelStyle: CSSProperties = {
    color: contentColorVar("primary"),
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: textVar("text-sm"),
    fontWeight: weightVar("semibold"),
    lineHeight: lineHeightVar("text-sm"),
  }

  const codeStyle: CSSProperties = {
    color: contentColorVar("tertiary"),
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: textVar("caption-sm"),
    lineHeight: lineHeightVar("caption-sm"),
    marginTop: spaceVar("1"),
  }

  if (tone === "background") chipStyle.background = value
  if (tone === "border") chipStyle.borderColor = value
  if (tone === "content") chipStyle.color = value

  return (
    <div {...props} style={{ ...swatchStyle, ...style }}>
      <span aria-hidden="true" style={chipStyle}>
        {tone === "content" ? "Aa" : null}
      </span>
      <span>
        <strong style={labelStyle}>{label}</strong>
        <code style={codeStyle}>{value}</code>
      </span>
    </div>
  )
}

export type { FontSizeToken, FontWeightToken, RadiusToken, ReactNode, SpaceToken }
