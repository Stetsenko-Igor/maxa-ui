"use client"

import { useState } from "react"
import { Input, Select, Toggle } from "@maxa/ui"
import { CopyIconButton } from "./copy-icon-button"
import { HighlightedCode } from "./syntax-highlight"

export type PlaygroundControl =
  | { type: "select"; name: string; label?: string; options: { label: string; value: string }[]; default: string }
  | { type: "boolean"; name: string; label?: string; default: boolean }
  | { type: "text"; name: string; label?: string; default: string }

export type PlaygroundValues = Record<string, string | boolean>

export interface PlaygroundConfig {
  controls: PlaygroundControl[]
  render: (values: PlaygroundValues) => React.ReactNode
  code: (values: PlaygroundValues) => string
}

function defaultsFrom(controls: PlaygroundControl[]): PlaygroundValues {
  const values: PlaygroundValues = {}
  for (const control of controls) values[control.name] = control.default
  return values
}

export function Playground({ config }: { config: PlaygroundConfig }) {
  const [values, setValues] = useState<PlaygroundValues>(() => defaultsFrom(config.controls))

  function set(name: string, value: string | boolean) {
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const code = config.code(values)

  return (
    <div>
      {/* live preview + controls */}
      <div style={{ display: "flex", alignItems: "stretch", minHeight: "240px" }}>
        {/* preview */}
        <div style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
        }}>
          {config.render(values)}
        </div>

        {/* controls */}
        <div style={{
          width: "280px",
          flexShrink: 0,
          borderLeft: "1px solid var(--color-border-secondary)",
          padding: "20px",
          background: "var(--color-bg-muted)",
          borderRadius: "0 0 var(--radius-md) 0",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}>
            <span style={{
              fontSize: "var(--text-caption-sm)",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              fontFamily: "var(--font-body)",
            }}>
              Controls
            </span>
            <button
              type="button"
              onClick={() => setValues(defaultsFrom(config.controls))}
              style={{
                padding: "4px 10px",
                borderRadius: "var(--radius-xs)",
                border: "1px solid var(--color-border-secondary)",
                background: "var(--color-bg-surface)",
                cursor: "pointer",
                fontSize: "var(--text-caption-sm)",
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--color-text-secondary)",
              }}
            >
              Reset
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {config.controls.map(control => (
              <PlaygroundControlField
                key={control.name}
                control={control}
                value={values[control.name] ?? control.default}
                onChange={value => set(control.name, value)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* generated code */}
      <div style={{
        position: "relative",
        borderTop: "1px solid var(--color-border-secondary)",
      }}>
        <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 1 }}>
          <CopyIconButton value={code} ariaLabel="Copy code" />
        </div>
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
          boxSizing: "border-box",
        }}>
          <code style={{ display: "table", minWidth: "100%" }}>
            <HighlightedCode code={code} withLineNumbers />
          </code>
        </pre>
      </div>
    </div>
  )
}

function PlaygroundControlField({
  control,
  value,
  onChange,
}: {
  control: PlaygroundControl
  value: string | boolean
  onChange: (value: string | boolean) => void
}) {
  const label = control.label ?? control.name

  if (control.type === "select") {
    return (
      <Select
        label={label}
        size="sm"
        options={control.options}
        value={value as string}
        onValueChange={onChange}
      />
    )
  }

  if (control.type === "boolean") {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}>
        <span style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-body)",
        }}>
          {label}
        </span>
        <Toggle
          aria-label={label}
          checked={value as boolean}
          onCheckedChange={onChange}
        />
      </div>
    )
  }

  return (
    <Input
      label={label}
      size="sm"
      value={value as string}
      onChange={event => onChange(event.target.value)}
    />
  )
}
