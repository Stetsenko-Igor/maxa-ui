import { codeToTokens, type BundledLanguage } from "shiki"

interface CodeBlockProps {
  code: string
  language?: BundledLanguage
}

const DARK_COLOR_MAP: Record<string, string> = {
  "#e6edf3": "var(--docs-syntax-text)",
  "#8b949e": "var(--docs-syntax-muted)",
  "#ff7b72": "var(--docs-syntax-keyword)",
  "#a5d6ff": "var(--docs-syntax-string)",
  "#79c0ff": "var(--docs-syntax-property)",
  "#d2a8ff": "var(--docs-syntax-function)",
  "#ffa657": "var(--docs-syntax-component)",
  "#7ee787": "var(--docs-syntax-number)",
  "#c9d1d9": "var(--docs-syntax-punctuation)",
}

function TokenLines({
  tokens,
  colorMap,
  vividIdentifiers = false,
}: {
  tokens: { color?: string; content: string }[][]
  colorMap?: Record<string, string>
  vividIdentifiers?: boolean
}) {
  return (
    <code>
      {tokens.map((line, i) => (
        <span key={i} style={{ display: "block" }}>
          {line.length === 0 ? "\n" : line.map((token, j) => (
            <span key={j} style={{ color: resolveTokenColor(token, colorMap, vividIdentifiers) }}>
              {token.content}
            </span>
          ))}
        </span>
      ))}
    </code>
  )
}

function resolveTokenColor(
  token: { color?: string; content: string },
  colorMap?: Record<string, string>,
  vividIdentifiers = false,
) {
  if (vividIdentifiers) {
    const semanticColor = resolveSemanticTokenColor(token.content)
    if (semanticColor) return semanticColor
  }

  return token.color && colorMap ? colorMap[token.color.toLowerCase()] ?? token.color : token.color
}

function resolveSemanticTokenColor(content: string) {
  if (/^\s+$/.test(content)) return undefined
  if (/^["'`].*["'`]$/.test(content)) return "var(--docs-syntax-string)"
  if (/^(\/\/|\/\*)/.test(content)) return "var(--docs-syntax-muted)"
  if (/^(import|from|export|function|return|const|let|var|type|interface|extends|as|default|async|await)$/.test(content)) {
    return "var(--docs-syntax-keyword)"
  }
  if (/^(true|false|null|undefined)$/.test(content)) return "var(--docs-syntax-constant)"
  if (/^\d+$/.test(content)) return "var(--docs-syntax-number)"
  if (/^<\/?[a-z][A-Za-z0-9-]*/.test(content)) return "var(--docs-syntax-number)"
  if (/^<\/?[A-Z][A-Za-z0-9_.]*/.test(content)) return "var(--docs-syntax-identifier)"
  if (/^[@./~A-Za-z0-9_-]+$/.test(content) && content.includes("/")) return "var(--docs-syntax-string)"
  if (/^[A-Z][A-Za-z0-9_$]*$/.test(content)) return "var(--docs-syntax-identifier)"
  if (/^[a-z_$][A-Za-z0-9_$-]*(?==)?$/.test(content)) return "var(--docs-syntax-property)"
  return undefined
}

const preStyle: React.CSSProperties = {
  border: "1px solid var(--color-border-secondary)",
  borderRadius: "var(--radius-md)",
  padding: "20px 24px 24px",
  overflowX: "auto",
  scrollbarGutter: "stable",
  fontFamily: "var(--font-code)",
  fontSize: "var(--docs-code-font-size)",
  lineHeight: "var(--docs-code-line-height)",
  margin: 0,
}

export async function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const trimmed = code.trim()

  const [light, dark] = await Promise.all([
    codeToTokens(trimmed, { lang: language, theme: "github-light" }),
    codeToTokens(trimmed, { lang: language, theme: "github-dark" }),
  ])

  return (
    <>
      {/* Light mode */}
      <pre className="code-block-light" style={{ ...preStyle, background: "var(--docs-code-bg)" }}>
        <TokenLines tokens={light.tokens} />
      </pre>
      {/* Dark mode */}
      <pre className="code-block-dark" style={{ ...preStyle, background: "var(--docs-code-bg)", border: "1px solid var(--docs-code-border)" }}>
        <TokenLines tokens={dark.tokens} colorMap={DARK_COLOR_MAP} vividIdentifiers />
      </pre>
    </>
  )
}
