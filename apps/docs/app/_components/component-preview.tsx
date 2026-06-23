"use client"

import { useState } from "react"
import { CopyIconButton } from "./copy-icon-button"
import { HighlightedCode } from "./syntax-highlight"
import { Playground, type PlaygroundConfig } from "./playground"

type PreviewTab = "preview" | "code" | "playground"

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  label?: string
  layout?: "inline" | "block" | "center"
  playground?: PlaygroundConfig
}

export function ComponentPreview({ children, code, label, layout = "inline", playground }: ComponentPreviewProps) {
  const [tab, setTab] = useState<PreviewTab>("preview")
  const panelMinHeight = layout === "block" ? "220px" : "180px"
  const tabs: PreviewTab[] = playground ? ["preview", "code", "playground"] : ["preview", "code"]

  return (
    <div data-component-preview style={{
      border: "1px solid var(--color-border-secondary)",
      borderRadius: "var(--radius-md)",
      overflow: "visible",
      marginBottom: "24px",
      width: "100%",
      maxWidth: "1200px",
      minWidth: 0,
      boxSizing: "border-box",
      background: "var(--color-bg-muted)",
    }}>
      {/* toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        background: "var(--color-bg-muted)",
        borderBottom: "1px solid var(--color-border-secondary)",
        borderRadius: "var(--radius-md) var(--radius-md) 0 0",
        height: "40px",
      }}>
        {/* tabs */}
        <div style={{ display: "flex", gap: "2px" }}>
          {tabs.map(t => (
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
                background: tab === t ? "var(--color-bg-muted)" : "transparent",
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
              fontFamily: "var(--font-code)",
            }}>
              {label}
            </span>
          )}
          <CopyIconButton value={code} ariaLabel="Copy code" />
        </div>
      </div>

      {/* preview pane */}
      {tab === "preview" && (
        <div className="component-preview-pane" data-layout={layout} style={{
          padding: layout === "block" ? "32px 40px" : "32px 24px",
          display: "flex",
          flexDirection: layout === "block" ? "column" : "row",
          flexWrap: layout === "block" ? undefined : "wrap",
          gap: layout === "block" ? "16px" : "12px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 0 var(--radius-md) var(--radius-md)",
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
          padding: "24px 28px 28px",
          background: "var(--docs-code-bg)",
          borderRadius: "0 0 var(--radius-md) var(--radius-md)",
          fontFamily: "var(--font-code)",
          fontSize: "var(--docs-code-font-size)",
          lineHeight: "var(--docs-code-line-height)",
          color: "var(--docs-syntax-text)",
          overflow: "auto",
          scrollbarGutter: "stable",
          minHeight: panelMinHeight,
          maxHeight: "360px",
          boxSizing: "border-box",
        }}>
          <code style={{ display: "table", minWidth: "100%" }}>
            <HighlightedCode code={code} withLineNumbers />
          </code>
        </pre>
      )}

      {/* playground pane */}
      {tab === "playground" && playground && (
        <Playground config={playground} />
      )}
    </div>
  )
}
