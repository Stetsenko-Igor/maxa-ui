"use client"

import { CopyIconButton } from "./copy-icon-button"
import { HighlightedCode } from "./syntax-highlight"

interface InstallationBlockProps {
  command: string
  imports: string
  usage: string
}

export function InstallationBlock({ command, imports, usage }: InstallationBlockProps) {
  return (
    <div
      style={{
        display: "grid",
        gap: "12px",
        width: "100%",
        maxWidth: "1200px",
        marginTop: "16px",
        boxSizing: "border-box",
      }}
    >
      <CodeRow label="Install" value={command} />
      <CodeRow label="Import" value={imports} />
      <CodeRow label="Use" value={usage} />
    </div>
  )
}

function CodeRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(72px, 88px) minmax(0, 1fr) 36px",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        borderRadius: "var(--radius-md)",
        background: "var(--color-bg-muted)",
      }}
    >
      <span
        style={{
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-semibold)",
          color: "var(--color-text-tertiary)",
        }}
      >
        {label}
      </span>
      <code
        style={{
          minWidth: 0,
          display: "table",
          overflowX: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-primary)",
          whiteSpace: "pre",
        }}
      >
        <HighlightedCode code={value} />
      </code>
      <CopyIconButton value={value} ariaLabel={`Copy ${label}`} />
    </div>
  )
}
