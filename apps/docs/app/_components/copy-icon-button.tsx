"use client"

import { useState } from "react"

interface CopyIconButtonProps {
  ariaLabel?: string
  size?: "sm" | "md"
  tooltip?: string
  tooltipCopied?: string
  value: string
}

export function CopyIconButton({
  ariaLabel = "Copy",
  size = "sm",
  tooltip = "Copy",
  tooltipCopied = "Copied",
  value,
}: CopyIconButtonProps) {
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [focused, setFocused] = useState(false)
  const isTooltipVisible = hovered || focused
  const dimension = size === "md" ? "34px" : "28px"

  async function handleCopy() {
    await navigator.clipboard.writeText(value.trim())
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      aria-label={copied ? tooltipCopied : ariaLabel}
      onClick={handleCopy}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false)
        setPressed(false)
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setPressed(false)
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dimension,
        height: dimension,
        padding: 0,
        border: copied ? "1px solid var(--color-action-brand)" : "1px solid var(--color-border-secondary)",
        borderRadius: "var(--radius-xs)",
        background: copied || pressed
          ? "var(--color-bg-muted)"
          : hovered || focused
            ? "var(--color-action-neutral-subtle)"
            : "var(--color-bg-page)",
        boxShadow: copied ? "0 0 0 2px var(--color-action-brand-subtle)" : "none",
        color: copied ? "var(--color-action-brand)" : "var(--color-text-secondary)",
        cursor: "pointer",
        transform: pressed ? "scale(0.96)" : "scale(1)",
        transition: "background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease, transform 80ms ease",
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {isTooltipVisible && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            right: "50%",
            bottom: "calc(100% + 8px)",
            transform: "translateX(50%)",
            padding: "6px 9px",
            borderRadius: "var(--radius-sm)",
            background: "var(--color-bg-muted)",
            color: "var(--color-text-primary)",
            boxShadow: "0 8px 24px rgba(10, 10, 10, 0.16)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-caption-sm)",
            fontWeight: "var(--font-weight-semibold)",
            lineHeight: 1,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 30,
          }}
        >
          {copied ? tooltipCopied : tooltip}
        </span>
      )}
    </button>
  )
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
