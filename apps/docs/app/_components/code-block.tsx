import { codeToTokens, type BundledLanguage } from "shiki"

interface CodeBlockProps {
  code: string
  language?: BundledLanguage
}

function TokenLines({ tokens }: { tokens: { color?: string; content: string }[][] }) {
  return (
    <code>
      {tokens.map((line, i) => (
        <span key={i} style={{ display: "block" }}>
          {line.length === 0 ? "\n" : line.map((token, j) => (
            <span key={j} style={{ color: token.color }}>
              {token.content}
            </span>
          ))}
        </span>
      ))}
    </code>
  )
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
        <TokenLines tokens={dark.tokens} />
      </pre>
    </>
  )
}
