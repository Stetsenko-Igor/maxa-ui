import { codeToTokens, type BundledLanguage } from "shiki"

interface CodeBlockProps {
  code: string
  language?: BundledLanguage
}

export async function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const { tokens, bg } = await codeToTokens(code.trim(), {
    lang: language,
    theme: "github-dark",
  })

  return (
    <pre
      style={{
        background: bg,
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "16px 20px",
        overflowX: "auto",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-sm)",
        lineHeight: "20px",
        margin: 0,
      }}
    >
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
    </pre>
  )
}
