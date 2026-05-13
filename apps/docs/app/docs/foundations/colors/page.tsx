import type { Metadata } from "next"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Colors — MAXA UI" }
const TOC = [
  { href: "#action", label: "Action" },
  { href: "#background", label: "Background" },
  { href: "#text", label: "Text" },
  { href: "#border", label: "Border" },
]

const swatchGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }

function Swatch({ label, token, textDark: _textDark = false }: { label: string; token: string; textDark?: boolean }) {
  return (
    <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--color-border-subtle)" }}>
      <div style={{ height: "56px", background: `var(${token})` }} />
      <div style={{ padding: "8px 10px", background: "var(--color-bg-primary)" }}>
        <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: "var(--text-caption-sm)", fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}>{token}</p>
      </div>
    </div>
  )
}

const ACTION_GROUPS = [
  { label: "Primary", token: "--color-action-primary" },
  { label: "Primary Hover", token: "--color-action-primary-hover" },
  { label: "Primary Active", token: "--color-action-primary-active" },
  { label: "Neutral", token: "--color-action-neutral" },
  { label: "Neutral Hover", token: "--color-action-neutral-hover" },
  { label: "Brand", token: "--color-action-brand" },
  { label: "Brand Hover", token: "--color-action-brand-hover" },
  { label: "Positive", token: "--color-action-positive" },
  { label: "Positive Hover", token: "--color-action-positive-hover" },
  { label: "Negative", token: "--color-action-negative" },
  { label: "Negative Hover", token: "--color-action-negative-hover" },
  { label: "Warning", token: "--color-action-warning" },
]

const BG_GROUPS = [
  { label: "Page", token: "--color-bg-page" },
  { label: "White", token: "--color-bg-white" },
  { label: "Primary", token: "--color-bg-primary" },
  { label: "Secondary", token: "--color-bg-secondary" },
  { label: "Tertiary", token: "--color-bg-tertiary" },
  { label: "Disabled", token: "--color-bg-disabled" },
  { label: "Inverse", token: "--color-bg-inverse" },
  { label: "Brand Subtle", token: "--color-bg-brand-subtle" },
  { label: "Brand", token: "--color-bg-brand" },
  { label: "Success Subtle", token: "--color-bg-success-subtle" },
  { label: "Error Subtle", token: "--color-bg-error-subtle" },
  { label: "Warning Subtle", token: "--color-bg-warning-subtle" },
  { label: "Info Subtle", token: "--color-bg-info-subtle" },
]

const TEXT_GROUPS = [
  { label: "Primary", token: "--color-text-primary" },
  { label: "Secondary", token: "--color-text-secondary" },
  { label: "Tertiary", token: "--color-text-tertiary" },
  { label: "Disabled", token: "--color-text-disabled" },
  { label: "Inverse", token: "--color-text-inverse" },
  { label: "Brand", token: "--color-text-brand" },
  { label: "Success", token: "--color-text-success" },
  { label: "Error", token: "--color-text-error" },
  { label: "Warning", token: "--color-text-warning" },
]

const BORDER_GROUPS = [
  { label: "Primary", token: "--color-border-primary" },
  { label: "Secondary", token: "--color-border-secondary" },
  { label: "Disabled", token: "--color-border-disabled" },
  { label: "Focus", token: "--color-border-focus" },
  { label: "Brand", token: "--color-border-brand" },
  { label: "Error", token: "--color-border-error" },
]

export default function ColorsPage() {
  return (
    <DocsPageLayout
      eyebrow="Foundations"
      title="Colors"
      toc={TOC}
      lead={<>Semantic color tokens. Components reference only these, never raw primitives like <code>--color-blue-500</code>.</>}
    >
      <DocsPageSection id="action" title="Action">
      <div style={swatchGridStyle}>
        {ACTION_GROUPS.map(s => <Swatch key={s.token} label={s.label} token={s.token} />)}
      </div>
      </DocsPageSection>

      <DocsPageSection id="background" title="Background">
      <div style={swatchGridStyle}>
        {BG_GROUPS.map(s => <Swatch key={s.token} label={s.label} token={s.token} />)}
      </div>
      </DocsPageSection>

      <DocsPageSection id="text" title="Text">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {TEXT_GROUPS.map(({ label, token }) => (
          <div key={token} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-subtle)" }}>
            <span style={{ color: `var(${token})`, fontSize: "var(--text-md)", fontWeight: "var(--font-weight-semibold)", width: "120px" }}>Aa {label}</span>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{token}</code>
          </div>
        ))}
      </div>
      </DocsPageSection>

      <DocsPageSection id="border" title="Border">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {BORDER_GROUPS.map(({ label, token }) => (
          <div key={token} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 16px", borderRadius: "var(--radius-sm)", border: `2px solid var(${token})` }}>
            <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", width: "120px" }}>{label}</span>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{token}</code>
          </div>
        ))}
      </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
