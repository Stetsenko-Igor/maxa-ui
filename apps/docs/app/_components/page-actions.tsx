"use client"

import { useState } from "react"

export interface AdjacentPage {
  href: string
  label: string
}

interface PageActionsProps {
  markdown: string
  next?: AdjacentPage | undefined
  previous?: AdjacentPage | undefined
  title: string
}

const menuItemStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "8px 10px",
  border: "none",
  borderRadius: "var(--radius-xs)",
  background: "transparent",
  color: "var(--color-text-secondary)",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  textAlign: "left",
  textDecoration: "none",
  cursor: "pointer",
}

export function PageActions({ markdown, next, previous, title }: PageActionsProps) {
  const [open, setOpen] = useState(false)

  function getPrompt() {
    return `I'm looking at this MAXA UI documentation: ${window.location.href}.\n\nHelp me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.\n\nMarkdown source:\n${markdown}`
  }

  function viewMarkdown() {
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank", "noopener,noreferrer")
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  async function copyMarkdown() {
    await navigator.clipboard.writeText(markdown)
    setOpen(false)
  }

  function openPrompt(target: "chatgpt" | "claude" | "jira") {
    const encodedPrompt = encodeURIComponent(getPrompt())
    const href =
      target === "chatgpt"
        ? `https://chatgpt.com/?q=${encodedPrompt}`
        : target === "claude"
          ? `https://claude.ai/new?q=${encodedPrompt}`
          : `https://jira.atlassian.com/secure/CreateIssueDetails!init.jspa?summary=${encodeURIComponent(
              `Review ${title} docs`,
            )}&description=${encodedPrompt}`

    window.open(href, "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          height: "36px",
          padding: "0 12px",
          border: "1px solid var(--color-border-secondary)",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-bg-surface)",
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-semibold)",
          cursor: "pointer",
        }}
      >
        <CopyIcon />
        Copy
        <ChevronIcon />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "44px",
            right: "88px",
            width: "220px",
            padding: "6px",
            border: "1px solid var(--color-border-secondary)",
            borderRadius: "var(--radius-md)",
            background: "var(--color-bg-page)",
            boxShadow: "0 12px 32px rgba(10, 10, 10, 0.12)",
            zIndex: 20,
          }}
        >
          <button type="button" style={menuItemStyle} onClick={viewMarkdown}>
            View as Markdown
          </button>
          <button type="button" style={menuItemStyle} onClick={copyMarkdown}>
            Copy as Markdown
          </button>
          <button type="button" style={menuItemStyle} onClick={() => openPrompt("chatgpt")}>
            Open in ChatGPT
          </button>
          <button type="button" style={menuItemStyle} onClick={() => openPrompt("claude")}>
            Open in Claude
          </button>
          <button type="button" style={menuItemStyle} onClick={() => openPrompt("jira")}>
            Open in Jira
          </button>
        </div>
      )}

      <a
        href={previous?.href}
        aria-label={previous ? `Previous component: ${previous.label}` : "Previous component"}
        aria-disabled={!previous}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          border: "1px solid var(--color-border-secondary)",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-bg-surface)",
          color: previous ? "var(--color-text-secondary)" : "var(--color-text-disabled)",
          pointerEvents: previous ? "auto" : "none",
          textDecoration: "none",
        }}
      >
        <ArrowLeftIcon />
      </a>
      <a
        href={next?.href}
        aria-label={next ? `Next component: ${next.label}` : "Next component"}
        aria-disabled={!next}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          border: "1px solid var(--color-border-secondary)",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-bg-surface)",
          color: next ? "var(--color-text-secondary)" : "var(--color-text-disabled)",
          pointerEvents: next ? "auto" : "none",
          textDecoration: "none",
        }}
      >
        <ArrowRightIcon />
      </a>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
