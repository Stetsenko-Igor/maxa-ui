import type { Metadata } from "next"

export const metadata: Metadata = { title: "Colors — MAXA UI" }

const pageStyle: React.CSSProperties = { maxWidth: "760px", padding: "56px 48px 96px" }
const h1Style: React.CSSProperties = { fontSize: "var(--text-heading-lg)", lineHeight: "34px", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", margin: "0 0 12px", letterSpacing: "-0.02em" }
const leadStyle: React.CSSProperties = { fontSize: "var(--text-md)", lineHeight: "24px", color: "var(--color-text-secondary)", margin: "0 0 40px" }
const h2Style: React.CSSProperties = { fontSize: "var(--text-heading-xs)", lineHeight: "24px", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", margin: "40px 0 16px", letterSpacing: "-0.01em" }
const dividerStyle: React.CSSProperties = { border: "none", borderTop: "1px solid var(--color-border-subtle)", margin: "40px 0" }

const swatchGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }

function Swatch({ label, token, textDark: _textDark = false }: { label: string; token: string; textDark?: boolean }) {
  return (
    <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--color-border-subtle)" }}>
      <div style={{ height: "56px", background: `var(${token})` }} />
      <div style={{ padding: "8px 10px", background: "var(--color-bg-surface-layer1)" }}>
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
  { label: "Default", token: "--color-bg-default" },
  { label: "Surface Layer 1", token: "--color-bg-surface-layer1" },
  { label: "Surface Layer 2", token: "--color-bg-surface-layer2" },
  { label: "Neutral Subtle", token: "--color-bg-neutral-subtle" },
  { label: "Brand Subtle", token: "--color-bg-brand-subtle" },
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
  { label: "Default", token: "--color-border-default" },
  { label: "Subtle", token: "--color-border-subtle" },
  { label: "Secondary", token: "--color-border-secondary" },
  { label: "Focus", token: "--color-border-focus" },
  { label: "Neutral Strong", token: "--color-border-neutral-strong" },
]

export default function ColorsPage() {
  return (
    <div style={pageStyle}>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", margin: "0 0 8px" }}>Foundations</p>
      <h1 style={h1Style}>Colors</h1>
      <p style={leadStyle}>Semantic color tokens. Components reference only these — never raw primitives like <code>--color-blue-500</code>.</p>

      <h2 style={h2Style}>Action</h2>
      <div style={swatchGridStyle}>
        {ACTION_GROUPS.map(s => <Swatch key={s.token} label={s.label} token={s.token} />)}
      </div>

      <hr style={dividerStyle} />

      <h2 style={h2Style}>Background</h2>
      <div style={swatchGridStyle}>
        {BG_GROUPS.map(s => <Swatch key={s.token} label={s.label} token={s.token} />)}
      </div>

      <hr style={dividerStyle} />

      <h2 style={h2Style}>Text</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {TEXT_GROUPS.map(({ label, token }) => (
          <div key={token} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-subtle)" }}>
            <span style={{ color: `var(${token})`, fontSize: "var(--text-md)", fontWeight: "var(--font-weight-semibold)", width: "120px" }}>Aa {label}</span>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{token}</code>
          </div>
        ))}
      </div>

      <hr style={dividerStyle} />

      <h2 style={h2Style}>Border</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {BORDER_GROUPS.map(({ label, token }) => (
          <div key={token} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 16px", borderRadius: "var(--radius-sm)", border: `2px solid var(${token})` }}>
            <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", width: "120px" }}>{label}</span>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{token}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
