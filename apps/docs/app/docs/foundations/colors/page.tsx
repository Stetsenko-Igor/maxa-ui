import type { Metadata } from "next"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Colors — MAXA UI" }
const TOC = [
  { href: "#neutral-scale", label: "Neutral scale" },
  { href: "#action", label: "Action" },
  { href: "#background", label: "Background" },
  { href: "#text", label: "Text" },
  { href: "#border", label: "Border" },
]

type NeutralStep = {
  step: string
  variable: string
  hex: string
  light: string[]
  dark: string[]
}

const NEUTRAL_SCALE: NeutralStep[] = [
  { step: "0",    variable: "--color-base-white", hex: "#FFFFFF",  light: ["bg/surface"],                                    dark: [] },
  { step: "25",   variable: "--color-neutral-25",    hex: "#F8F8F8",  light: ["bg/muted"],                                      dark: [] },
  { step: "50",   variable: "--color-neutral-50",    hex: "#F5F6FA",  light: ["bg/page"],                                       dark: [] },
  { step: "100",  variable: "--color-neutral-100",   hex: "#F4F3F3",  light: ["border/tertiary", "bg/disabled", "bg/neutral-subtle"], dark: [] },
  { step: "200",  variable: "--color-neutral-200",   hex: "#E9EAEF",  light: ["border/secondary", "bg/neutral-on-subtle"],      dark: [] },
  { step: "300",  variable: "--color-neutral-300",   hex: "#E4E4E4",  light: ["border/primary", "action/neutral"],              dark: [] },
  { step: "400",  variable: "--color-neutral-400",   hex: "#D7D5D5",  light: ["text/disabled", "action/neutral-hover"],         dark: [] },
  { step: "500",  variable: "--color-neutral-500",   hex: "#A1A1A4",  light: ["action/neutral-active"],                         dark: ["text/tertiary", "border/neutral-strong"] },
  { step: "600",  variable: "--color-neutral-600",   hex: "#8C8C8E",  light: ["text/tertiary"],                                 dark: ["action/neutral-active"] },
  { step: "700",  variable: "--color-neutral-700",   hex: "#6B6B6D",  light: [],                                                dark: ["border/primary", "text/disabled", "action/neutral-hover"] },
  { step: "800",  variable: "--color-neutral-800",   hex: "#444445",  light: ["text/secondary", "bg/neutral-strong"],           dark: ["border/secondary", "bg/neutral-subtle", "action/neutral"] },
  { step: "900",  variable: "--color-neutral-900",   hex: "#2A2A2B",  light: [],                                                dark: ["bg/surface", "border/tertiary"] },
  { step: "950",  variable: "--color-neutral-950",   hex: "#1B1A1A",  light: ["text/primary", "bg/inverse", "nav-bg"],          dark: ["bg/inverse", "nav-bg"] },
  { step: "975",  variable: "--color-neutral-975",   hex: "#161616",  light: [],                                                dark: ["bg/muted"] },
  { step: "1000", variable: "--color-neutral-1000",  hex: "#0D0D0D",  light: [],                                                dark: ["bg/page"] },
]

function UsageTag({ label, mode }: { label: string; mode: "light" | "dark" }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      height: "20px",
      padding: "0 7px",
      paddingBottom: "1px",
      borderRadius: "var(--radius-full)",
      fontSize: "var(--text-caption-sm)",
      fontFamily: "var(--font-mono)",
      background: mode === "light" ? "var(--color-bg-muted)" : "var(--color-neutral-800)",
      color: mode === "light" ? "var(--color-text-secondary)" : "var(--color-neutral-200)",
      border: `1px solid ${mode === "light" ? "var(--color-border-tertiary)" : "var(--color-neutral-700)"}`,
    }}>{label}</span>
  )
}

const swatchGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }

function Swatch({ label, token, textDark: _textDark = false }: { label: string; token: string; textDark?: boolean }) {
  return (
    <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--color-border-tertiary)" }}>
      <div style={{ height: "56px", background: `var(${token})` }} />
      <div style={{ padding: "8px 10px", background: "var(--color-bg-page)" }}>
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
  { label: "Surface", token: "--color-bg-surface" },
  { label: "Muted", token: "--color-bg-muted" },
  { label: "Overlay", token: "--color-bg-overlay" },
  { label: "Inverse", token: "--color-bg-inverse" },
  { label: "Disabled", token: "--color-bg-disabled" },
  { label: "Brand Subtle", token: "--color-bg-brand-subtle" },
  { label: "Brand", token: "--color-bg-brand" },
  { label: "Brand Solid", token: "--color-bg-brand-solid" },
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
  { label: "Tertiary", token: "--color-border-tertiary" },
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
      <DocsPageSection
        id="neutral-scale"
        title="Neutral scale"
        description={<>Raw primitive steps. Components never reference these directly — always use semantic tokens. Named <code>gray-*</code> in CSS, <code>Neutral.*</code> in Figma.</>}
      >
        {/* Scale rows */}
        <div style={{ display: "flex", flexDirection: "column", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-secondary)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "48px 52px 96px 1fr 1fr",
            gap: "0 16px",
            padding: "8px 16px",
            background: "var(--color-bg-muted)",
            borderBottom: "1px solid var(--color-border-secondary)",
          }}>
            {["", "Step", "Hex", "Light usage", "Dark usage"].map(h => (
              <span key={h} style={{ fontSize: "var(--text-caption-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
            ))}
          </div>

          {NEUTRAL_SCALE.map(({ step, variable, hex, light, dark }, i) => (
            <div
              key={step}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 52px 96px 1fr 1fr",
                gap: "0 16px",
                padding: "10px 16px",
                alignItems: "center",
                borderTop: i === 0 ? "none" : "1px solid var(--color-border-secondary)",
              }}
            >
              {/* Swatch */}
              <div style={{
                width: "36px",
                height: "28px",
                borderRadius: "var(--radius-xs)",
                background: `var(${variable}, ${hex})`,
                border: "1px solid var(--color-border-secondary)",
                flexShrink: 0,
              }} />

              {/* Step */}
              <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", fontFamily: "var(--font-mono)" }}>
                {step}
              </span>

              {/* Hex */}
              <code style={{ fontSize: "var(--text-sm)", fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)", letterSpacing: "0.02em" }}>
                {hex}
              </code>

              {/* Light usages */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {light.map(u => <UsageTag key={u} label={u} mode="light" />)}
              </div>

              {/* Dark usages */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {dark.map(u => <UsageTag key={u} label={u} mode="dark" />)}
              </div>
            </div>
          ))}
        </div>
      </DocsPageSection>

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
          <div key={token} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-tertiary)" }}>
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
