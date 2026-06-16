type TokenKind =
  | "keyword"
  | "string"
  | "component"
  | "property"
  | "command"
  | "literal"
  | "number"
  | "punctuation"
  | "comment"
  | "text"

interface Token {
  content: string
  kind: TokenKind
}

const TOKEN_PATTERN =
  /(\/\/.*|\/\*.*?\*\/|".*?"|'.*?'|`.*?`|<\/?[A-Z][A-Za-z0-9_.]*|[A-Za-z_$][A-Za-z0-9_$]*(?==)|@[A-Za-z0-9_./-]+|--[A-Za-z0-9-]+|\b(?:import|from|export|function|return|const|let|var|type|interface|extends|as|default|async|await)\b|\b(?:pnpm|npm|npx|yarn|bun)\b|\b(?:true|false|null|undefined)\b|\b\d+\b|[{}()[\]<>/=.,;:|?+-])/g

const TOKEN_COLORS: Record<TokenKind, string> = {
  keyword: "var(--docs-syntax-keyword)",
  string: "var(--docs-syntax-string)",
  component: "var(--docs-syntax-component)",
  property: "var(--docs-syntax-property)",
  command: "var(--docs-syntax-function)",
  literal: "var(--docs-syntax-constant)",
  number: "var(--docs-syntax-number)",
  punctuation: "var(--docs-syntax-punctuation)",
  comment: "var(--docs-syntax-muted)",
  text: "var(--docs-syntax-text)",
}

export function HighlightedCode({ code, withLineNumbers = false }: { code: string; withLineNumbers?: boolean }) {
  const lines = code.trim().split("\n")

  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} style={{ display: "table-row" }}>
          {withLineNumbers && (
            <span
              aria-hidden="true"
              style={{
                display: "table-cell",
                minWidth: "28px",
                paddingRight: "20px",
                color: "var(--docs-syntax-muted)",
                textAlign: "right",
                userSelect: "none",
              }}
            >
              {lineIndex + 1}
            </span>
          )}
          <span style={{ display: "table-cell" }}>
            {tokenize(line).map((token, tokenIndex) => (
              <span key={tokenIndex} style={{ color: TOKEN_COLORS[token.kind] }}>
                {token.content}
              </span>
            ))}
            {line.length === 0 ? "\n" : null}
          </span>
        </span>
      ))}
    </>
  )
}

function tokenize(line: string): Token[] {
  const tokens: Token[] = []
  let lastIndex = 0

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const content = match[0]
    const index = match.index ?? 0

    if (index > lastIndex) {
      tokens.push({ content: line.slice(lastIndex, index), kind: "text" })
    }

    tokens.push({ content, kind: classify(content) })
    lastIndex = index + content.length
  }

  if (lastIndex < line.length) {
    tokens.push({ content: line.slice(lastIndex), kind: "text" })
  }

  return tokens
}

function classify(token: string): TokenKind {
  if (/^(\/\/|\/\*)/.test(token)) return "comment"
  if (/^["'`]/.test(token)) return "string"
  if (/^<\/?[A-Z]/.test(token)) return "component"
  if (/^(pnpm|npm|npx|yarn|bun)$/.test(token)) return "command"
  if (/^(true|false|null|undefined)$/.test(token)) return "literal"
  if (/^\d+$/.test(token)) return "number"
  if (/^(import|from|export|function|return|const|let|var|type|interface|extends|as|default|async|await)$/.test(token)) return "keyword"
  if (/^--[A-Za-z0-9-]+$/.test(token)) return "property"
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(token)) return "property"
  if (/^[{}()[\]<>/=.,;:|?+-]$/.test(token)) return "punctuation"
  return "text"
}
