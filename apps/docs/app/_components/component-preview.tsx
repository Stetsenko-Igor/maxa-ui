"use client"

import { useState } from "react"
import { CopyIconButton } from "./copy-icon-button"
import { HighlightedCode } from "./syntax-highlight"

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  label?: string
  layout?: "inline" | "block" | "center"
}

export function ComponentPreview({ children, code, label, layout = "inline" }: ComponentPreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const panelMinHeight = layout === "block" ? "220px" : "180px"

  return (
    <div data-component-preview style={{
      border: "1px solid var(--color-border-subtle)",
      borderRadius: "var(--radius-md)",
      overflow: "visible",
      marginBottom: "24px",
      width: "100%",
      maxWidth: "1200px",
      minWidth: 0,
      boxSizing: "border-box",
      background: "var(--color-bg-default)",
    }}>
      {/* toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        background: "var(--color-bg-surface-layer1)",
        borderBottom: "1px solid var(--color-border-subtle)",
        height: "40px",
      }}>
        {/* tabs */}
        <div style={{ display: "flex", gap: "2px" }}>
          {(["preview", "code"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "4px 12px",
                borderRadius: "var(--radius-xs)",
                border: "none",
                cursor: "pointer",
                fontSize: "var(--text-sm)",
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                background: tab === t ? "var(--color-bg-surface-layer2)" : "transparent",
                color: tab === t ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                transition: "background 100ms, color 100ms",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {label && (
            <span style={{
              fontSize: "var(--text-caption-sm)",
              color: "var(--color-text-tertiary)",
              fontFamily: "var(--font-mono)",
            }}>
              {label}
            </span>
          )}
          <CopyIconButton value={code} ariaLabel="Copy code" />
        </div>
      </div>

      {/* preview pane */}
      {tab === "preview" && (
        <div style={{
          padding: layout === "block" ? "32px 40px" : "32px 24px",
          display: "flex",
          flexDirection: layout === "block" ? "column" : "row",
          flexWrap: layout === "block" ? undefined : "wrap",
          gap: layout === "block" ? "16px" : "12px",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg-default)",
          minHeight: panelMinHeight,
          boxSizing: "border-box",
        }}>
          {children}
        </div>
      )}

      {/* code pane */}
      {tab === "code" && (
        <pre style={{
          margin: 0,
          padding: "20px 24px",
          background: "var(--color-bg-surface-layer2)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          lineHeight: "20px",
          color: "var(--color-text-primary)",
          overflow: "auto",
          minHeight: panelMinHeight,
          maxHeight: "360px",
          boxSizing: "border-box",
        }}>
          <code style={{ display: "table", minWidth: "100%" }}>
            <HighlightedCode code={code} withLineNumbers />
          </code>
        </pre>
      )}
    </div>
  )
}
