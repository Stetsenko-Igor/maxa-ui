import type { Metadata } from "next"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"
import tokenData from "./tokens.generated.json"

export const metadata: Metadata = { title: "Colors — MAXA UI" }
const TOC = [
  { href: "#tokens-in-context", label: "Tokens in context" },
  { href: "#neutral-scale", label: "Neutral scale" },
  { href: "#foreground", label: "Foreground" },
  { href: "#action", label: "Action" },
  { href: "#background", label: "Background" },
  { href: "#control", label: "Control" },
  { href: "#feedback", label: "Feedback" },
  { href: "#text", label: "Text" },
  { href: "#border", label: "Border" },
]

/*
 * Token lists and hex values come from tokens.generated.json — emitted by
 * scripts/generate-tokens-reference.mjs from the CSS source, and guarded by
 * `pnpm tokens:reference:check`. Only the usage prose below is hand-written;
 * a token missing a usage entry still renders (with an empty description),
 * so coverage can never silently drift.
 */
type GeneratedToken = {
  name: string
  lightValue?: string
  darkValue: string | null
  lightHex?: string
  darkHex?: string
}

function labelFor(name: string, prefix: string): string {
  return name
    .slice(prefix.length)
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")
}

/* Editorial usage tags for the neutral-scale table (semantic roles per step). */
const NEUTRAL_USAGE: Record<string, { light: string[]; dark: string[] }> = {
  "--color-base-white":   { light: ["bg/surface", "bg/float"], dark: [] },
  "--color-neutral-25":   { light: ["bg/muted"], dark: [] },
  "--color-neutral-50":   { light: ["bg/page"], dark: [] },
  "--color-neutral-100":  { light: ["border/tertiary", "bg/disabled", "bg/neutral-subtle"], dark: [] },
  "--color-neutral-200":  { light: ["border/secondary", "bg/neutral-on-subtle", "bg/neutral-muted"], dark: [] },
  "--color-neutral-300":  { light: ["border/primary", "action/neutral", "bg/neutral-on-muted"], dark: [] },
  "--color-neutral-400":  { light: ["text/disabled", "action/neutral-hover"], dark: ["bg/neutral-strong"] },
  "--color-neutral-500":  { light: ["action/neutral-active"], dark: ["text/tertiary", "border/neutral-strong"] },
  "--color-neutral-600":  { light: ["text/tertiary"], dark: ["action/neutral-active", "bg/neutral-on-muted"] },
  "--color-neutral-700":  { light: [], dark: ["border/primary", "text/disabled", "bg/neutral-on-subtle", "bg/neutral-muted"] },
  "--color-neutral-800":  { light: ["text/secondary", "bg/neutral-strong"], dark: ["border/secondary", "bg/float", "bg/neutral-subtle"] },
  "--color-neutral-900":  { light: [], dark: ["bg/surface", "border/tertiary"] },
  "--color-neutral-950":  { light: ["text/primary", "bg/inverse"], dark: ["bg/inverse", "bg/page"] },
  "--color-neutral-975":  { light: [], dark: ["bg/muted"] },
  "--color-neutral-1000": { light: [], dark: [] },
}

const NEUTRAL_SCALE = tokenData.neutralScale
  .filter((t: GeneratedToken) => t.name !== "--color-base-ink" && t.name !== "--color-base-black")
  .map((t: GeneratedToken) => ({
    step: t.name === "--color-base-white" ? "0" : t.name.replace("--color-neutral-", ""),
    variable: t.name,
    hex: t.lightHex ?? "",
    light: NEUTRAL_USAGE[t.name]?.light ?? [],
    dark: NEUTRAL_USAGE[t.name]?.dark ?? [],
  }))

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

type TokenItem = {
  label: string
  token: string
  usage: string
  lightHex?: string | undefined
  darkHex?: string | undefined
}

function HexPair({ lightHex, darkHex }: { lightHex?: string | undefined; darkHex?: string | undefined }) {
  if (!lightHex) return null
  const same = !darkHex || darkHex === lightHex
  return (
    <p style={{ margin: "4px 0 0", fontSize: "var(--text-caption-sm)", fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}>
      {same ? lightHex : `${lightHex} · dark ${darkHex}`}
    </p>
  )
}

function Swatch({ label, token, usage, lightHex, darkHex }: TokenItem) {
  return (
    <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--color-border-tertiary)" }}>
      <div style={{ height: "56px", background: `var(${token})` }} />
      <div style={{ padding: "8px 10px", background: "var(--color-bg-page)" }}>
        <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: "var(--text-caption-sm)", fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}>{token}</p>
        <HexPair lightHex={lightHex} darkHex={darkHex} />
        <p style={{ margin: "6px 0 0", fontSize: "var(--text-caption-sm)", color: "var(--color-text-secondary)", lineHeight: 1.35 }}>{usage}</p>
      </div>
    </div>
  )
}

/* Hand-written usage prose per token. Lists themselves come from the
 * generated data — a new token renders even before prose is added here. */
const USAGE: Record<string, string> = {
  "--color-action-primary": "Primary interactive fill, default state.",
  "--color-action-primary-hover": "Primary interactive fill on hover.",
  "--color-action-primary-active": "Primary interactive fill while pressed.",
  "--color-action-primary-subtle": "Low-emphasis primary actions and selected fills.",
  "--color-action-primary-subtle-hover": "Low-emphasis primary action hover.",
  "--color-action-primary-subtle-active": "Low-emphasis primary action pressed state.",
  "--color-action-neutral": "Neutral controls, secondary buttons, toggles.",
  "--color-action-neutral-hover": "Neutral control hover state.",
  "--color-action-neutral-active": "Neutral control pressed state.",
  "--color-action-neutral-subtle": "Quiet neutral controls and selected rows.",
  "--color-action-neutral-subtle-hover": "Quiet neutral control hover state.",
  "--color-action-neutral-subtle-active": "Quiet neutral control pressed state.",
  "--color-action-brand": "Brand actions and branded confirmation fills.",
  "--color-action-brand-hover": "Brand action hover state.",
  "--color-action-brand-active": "Brand action pressed state.",
  "--color-action-brand-subtle": "Low-emphasis brand action background.",
  "--color-action-brand-subtle-hover": "Low-emphasis brand action hover.",
  "--color-action-brand-subtle-active": "Low-emphasis brand action pressed state.",
  "--color-action-success": "Confirm / success action fill.",
  "--color-action-success-hover": "Success action hover state.",
  "--color-action-success-active": "Success action pressed state.",
  "--color-action-success-subtle": "Low-emphasis success action background.",
  "--color-action-success-subtle-hover": "Low-emphasis success action hover.",
  "--color-action-success-subtle-active": "Low-emphasis success action pressed state.",
  "--color-action-destructive": "Destructive action fill.",
  "--color-action-destructive-hover": "Destructive action hover state.",
  "--color-action-destructive-active": "Destructive action pressed state.",
  "--color-action-destructive-subtle": "Low-emphasis destructive action background.",
  "--color-action-destructive-subtle-hover": "Low-emphasis destructive action hover.",
  "--color-action-destructive-subtle-active": "Low-emphasis destructive action pressed state.",
  "--color-action-warning": "Warning or caution action fill.",
  "--color-action-warning-hover": "Warning action hover state.",
  "--color-action-warning-active": "Warning action pressed state.",
  "--color-action-warning-subtle": "Low-emphasis warning action background.",
  "--color-action-warning-subtle-hover": "Low-emphasis warning action hover.",
  "--color-action-warning-subtle-active": "Low-emphasis warning action pressed state.",
  "--color-bg-page": "App canvas and lowest page layer.",
  "--color-bg-surface": "Raised surfaces: cards, inputs, modals, tables.",
  "--color-bg-float": "Floating surfaces: dropdowns, popovers, tooltips.",
  "--color-bg-muted": "Quiet recessed zones, code blocks, wells.",
  "--color-bg-overlay": "Modal scrims and blocking overlays.",
  "--color-bg-inverse": "High-contrast inverse blocks.",
  "--color-bg-disabled": "Disabled backgrounds and inactive fills.",
  "--color-bg-neutral-surface": "Lowest neutral surface tint, one step below subtle.",
  "--color-bg-neutral-subtle": "Neutral badges, tags, soft status fills.",
  "--color-bg-neutral-on-subtle": "Elements placed on neutral subtle backgrounds.",
  "--color-bg-neutral-strong": "Strong neutral badges and emphasis fills.",
  "--color-bg-brand-subtle": "Soft brand badges, highlights, callouts.",
  "--color-bg-brand-surface": "Brand-tinted panels and selected containers.",
  "--color-bg-brand-strong": "Strong brand badges and emphasis fills.",
  "--color-bg-info-subtle": "Soft informational badges and alerts.",
  "--color-bg-info-surface": "Info panels and alert surfaces.",
  "--color-bg-info-strong": "Strong informational badges.",
  "--color-bg-success-subtle": "Soft success badges and alerts.",
  "--color-bg-success-surface": "Success panels and alert surfaces.",
  "--color-bg-success-strong": "Strong success badges.",
  "--color-bg-error-subtle": "Soft error badges and alerts.",
  "--color-bg-error-surface": "Error panels and alert surfaces.",
  "--color-bg-error-strong": "Strong error badges.",
  "--color-bg-warning-subtle": "Soft warning badges and alerts.",
  "--color-bg-warning-surface": "Warning panels and alert surfaces.",
  "--color-bg-warning-strong": "Strong warning badges.",
  "--color-fg-primary": "Primary icons and SVG strokes.",
  "--color-fg-secondary": "Supporting icons and quiet controls.",
  "--color-fg-tertiary": "Subtle icons, placeholders, metadata icons.",
  "--color-fg-disabled": "Disabled icons and inactive glyphs.",
  "--color-fg-inverse": "Icons on inverse backgrounds.",
  "--color-fg-on-brand": "Icons on brand-filled controls.",
  "--color-fg-brand": "Brand icons and accent glyphs.",
  "--color-fg-info": "Informational icons.",
  "--color-fg-success": "Success icons.",
  "--color-fg-error": "Error and destructive icons.",
  "--color-fg-warning": "Warning and caution icons.",
  "--color-text-primary": "Main copy, headings, important labels.",
  "--color-text-secondary": "Supporting copy and secondary labels.",
  "--color-text-tertiary": "Captions, metadata, helper text.",
  "--color-text-disabled": "Disabled text and unavailable values.",
  "--color-text-inverse": "Text on inverse backgrounds.",
  "--color-text-on-brand": "Text on brand-filled actions.",
  "--color-text-brand": "Brand text links and accents.",
  "--color-text-info": "Informational message text.",
  "--color-text-success": "Success message text.",
  "--color-text-error": "Error and destructive message text.",
  "--color-text-warning": "Warning and caution message text.",
  "--color-border-primary": "Default component outlines and dividers.",
  "--color-border-secondary": "Lower-emphasis separators and nested outlines.",
  "--color-border-tertiary": "Subtle separators and quiet outlines.",
  "--color-border-focus": "Keyboard focus rings and focused inputs.",
  "--color-border-brand": "Brand-selected component outlines.",
  "--color-border-error-strong": "Invalid inputs and error boundaries.",
  "--color-border-info-strong": "Strong informational borders.",
  "--color-border-success-strong": "Strong success borders and validation states.",
  "--color-border-warning-strong": "Strong warning borders.",
  "--color-border-neutral-strong": "High-emphasis neutral outlines.",
  "--color-border-neutral-subtle": "Low-emphasis neutral outlines.",
}

function buildGroup(tokens: GeneratedToken[], prefix: string): TokenItem[] {
  return tokens.map((t) => ({
    label: labelFor(t.name, prefix),
    token: t.name,
    usage: USAGE[t.name] ?? "",
    lightHex: t.lightHex,
    darkHex: t.darkHex,
  }))
}

const ACTION_GROUPS = buildGroup(tokenData.groups.action, "--color-action-")
const BG_GROUPS = buildGroup(tokenData.groups.background, "--color-bg-")
const FG_GROUPS = buildGroup(tokenData.groups.foreground, "--color-fg-")
const TEXT_GROUPS = buildGroup(tokenData.groups.text, "--color-text-")
const BORDER_GROUPS = buildGroup(tokenData.groups.border, "--color-border-")
const CONTROL_GROUPS = buildGroup(tokenData.groups.control, "--color-control-")
const FEEDBACK_GROUPS = buildGroup(tokenData.groups.feedback, "--color-feedback-")

/* ─── Annotation diagram data ─── */
type AnnotationLabel = {
  name: string
  labelY: number   // pill top y
  targetY: number  // dot y on card edge
  chip: "text-primary" | "text-secondary" | "fg-secondary" | "border-brand" | "border-primary" | "bg-surface" | "radius" | "shadow"
}

const ANNOTATION_LABELS: AnnotationLabel[] = [
  { name: "fg-secondary",   labelY: 28,  targetY: 62,  chip: "fg-secondary" },
  { name: "text-primary",   labelY: 78,  targetY: 108, chip: "text-primary" },
  { name: "text-secondary", labelY: 128, targetY: 130, chip: "text-secondary" },
  { name: "border-brand",   labelY: 178, targetY: 181, chip: "border-brand" },
  { name: "border-primary", labelY: 228, targetY: 259, chip: "border-primary" },
  { name: "bg-surface",     labelY: 278, targetY: 292, chip: "bg-surface" },
  { name: "radius-xl",      labelY: 328, targetY: 406, chip: "radius" },
  { name: "shadow-lg",      labelY: 378, targetY: 424, chip: "shadow" },
]

function TokenAnnotationDiagram() {
  /* Layout constants */
  const PILL_W = 162
  const PILL_H = 28
  const LX = 8          /* pill left x */
  const CX = 248        /* card left x */
  const CY = 18         /* card top y */
  const CW = 428        /* card width */
  const CH = 396        /* card height */

  return (
    <svg
      viewBox="0 0 700 448"
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
      aria-label="Semantic design tokens annotated on a 'Change your plan' modal dialog"
    >
      {/* ── Card shadow (decorative) ── */}
      <rect x={CX + 2} y={CY + 4} width={CW} height={CH} rx="18"
        style={{ fill: "rgba(0,0,0,0.06)" }}
      />

      {/* ── Card ── */}
      <rect x={CX} y={CY} width={CW} height={CH} rx="18"
        style={{ fill: "var(--color-bg-surface)", stroke: "var(--color-border-primary)", strokeWidth: "1" }}
      />

      {/* Icon box */}
      <rect x={CX + 24} y={CY + 24} width="40" height="40" rx="8"
        style={{ fill: "var(--color-bg-muted)", stroke: "var(--color-border-secondary)", strokeWidth: "1" }}
      />
      {/* Icon: simple card outline */}
      <rect x={CX + 32} y={CY + 36} width="24" height="16" rx="2"
        style={{ fill: "none", stroke: "var(--color-fg-secondary)", strokeWidth: "1.5" }}
      />
      <line x1={CX + 32} y1={CY + 44} x2={CX + 56} y2={CY + 44}
        style={{ stroke: "var(--color-fg-secondary)", strokeWidth: "2" }}
      />

      {/* Title */}
      <text x={CX + 24} y={CY + 90}
        style={{ fill: "var(--color-text-primary)", fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-body)" }}
      >Change your plan</text>

      {/* Subtitle */}
      <text x={CX + 24} y={CY + 112}
        style={{ fill: "var(--color-text-secondary)", fontSize: "13px", fontFamily: "var(--font-body)" }}
      >Flexible pricing that grows with you.</text>

      {/* ── Selected plan (border-brand) ── */}
      <rect x={CX + 24} y={CY + 130} width={CW - 48} height="66" rx="8"
        style={{ fill: "var(--color-bg-surface)", stroke: "var(--color-border-brand)", strokeWidth: "1.5" }}
      />
      <rect x={CX + 38} y={CY + 147} width="32" height="32" rx="6"
        style={{ fill: "var(--color-bg-muted)", stroke: "var(--color-border-secondary)", strokeWidth: "1" }}
      />
      <text x={CX + 82} y={CY + 163}
        style={{ fill: "var(--color-text-primary)", fontSize: "13px", fontWeight: "500", fontFamily: "var(--font-body)" }}
      >Basic plan · $10/month</text>
      <text x={CX + 82} y={CY + 181}
        style={{ fill: "var(--color-text-secondary)", fontSize: "12px", fontFamily: "var(--font-body)" }}
      >Up to 10 users and 20GB data.</text>

      {/* ── Unselected plan (border-primary) ── */}
      <rect x={CX + 24} y={CY + 208} width={CW - 48} height="66" rx="8"
        style={{ fill: "var(--color-bg-surface)", stroke: "var(--color-border-primary)", strokeWidth: "1" }}
      />
      <rect x={CX + 38} y={CY + 225} width="32" height="32" rx="6"
        style={{ fill: "var(--color-bg-muted)", stroke: "var(--color-border-secondary)", strokeWidth: "1" }}
      />
      <text x={CX + 82} y={CY + 241}
        style={{ fill: "var(--color-text-primary)", fontSize: "13px", fontWeight: "500", fontFamily: "var(--font-body)" }}
      >Business plan · $20/month</text>
      <text x={CX + 82} y={CY + 259}
        style={{ fill: "var(--color-text-secondary)", fontSize: "12px", fontFamily: "var(--font-body)" }}
      >Up to 20 users and 40GB data.</text>

      {/* ── Footer ── */}
      <line x1={CX} y1={CY + 290} x2={CX + CW} y2={CY + 290}
        style={{ stroke: "var(--color-border-secondary)", strokeWidth: "1" }}
      />
      {/* Cancel */}
      <rect x={CX + 24} y={CY + 306} width="184" height="40" rx="8"
        style={{ fill: "var(--color-bg-surface)", stroke: "var(--color-border-primary)", strokeWidth: "1" }}
      />
      <text x={CX + 116} y={CY + 331} textAnchor="middle"
        style={{ fill: "var(--color-text-primary)", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-body)" }}
      >Cancel</text>
      {/* Confirm */}
      <rect x={CX + 216} y={CY + 306} width="188" height="40" rx="8"
        style={{ fill: "var(--color-action-brand)" }}
      />
      <text x={CX + 310} y={CY + 331} textAnchor="middle"
        style={{ fill: "var(--color-text-on-brand)", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-body)" }}
      >Confirm</text>

      {/* ── Labels + bezier connection lines ── */}
      {ANNOTATION_LABELS.map(({ name, labelY, targetY, chip }) => {
        const cy = labelY + PILL_H / 2
        const x1 = LX + PILL_W
        const cp1x = x1 + 28
        const cp2x = CX - 28

        return (
          <g key={name}>
            {/* Dashed bezier */}
            <path
              d={`M ${x1} ${cy} C ${cp1x} ${cy} ${cp2x} ${targetY} ${CX} ${targetY}`}
              style={{ fill: "none", stroke: "var(--color-border-secondary)", strokeWidth: "1", strokeDasharray: "4 3" }}
            />
            {/* Target dot */}
            <circle cx={CX} cy={targetY} r="3"
              style={{ fill: "var(--color-border-secondary)" }}
            />

            {/* Pill background */}
            <rect x={LX} y={labelY} width={PILL_W} height={PILL_H} rx={PILL_H / 2}
              style={{ fill: "var(--color-bg-surface)", stroke: "var(--color-border-secondary)", strokeWidth: "1" }}
            />

            {/* Color chip */}
            {chip === "text-primary" && (
              <rect x={LX + 12} y={labelY + 8} width="12" height="12" rx="3"
                style={{ fill: "var(--color-text-primary)" }}
              />
            )}
            {chip === "text-secondary" && (
              <rect x={LX + 12} y={labelY + 8} width="12" height="12" rx="3"
                style={{ fill: "var(--color-text-secondary)" }}
              />
            )}
            {chip === "fg-secondary" && (
              <rect x={LX + 12} y={labelY + 8} width="12" height="12" rx="3"
                style={{ fill: "none", stroke: "var(--color-fg-secondary)", strokeWidth: "2" }}
              />
            )}
            {chip === "border-brand" && (
              <rect x={LX + 12} y={labelY + 8} width="12" height="12" rx="3"
                style={{ fill: "none", stroke: "var(--color-border-brand)", strokeWidth: "2.5" }}
              />
            )}
            {chip === "border-primary" && (
              <rect x={LX + 12} y={labelY + 8} width="12" height="12" rx="3"
                style={{ fill: "none", stroke: "var(--color-border-primary)", strokeWidth: "2" }}
              />
            )}
            {chip === "bg-surface" && (
              <rect x={LX + 12} y={labelY + 8} width="12" height="12" rx="3"
                style={{ fill: "var(--color-bg-surface)", stroke: "var(--color-border-secondary)", strokeWidth: "1" }}
              />
            )}
            {chip === "radius" && (
              <path d={`M ${LX + 24},${labelY + 20} L ${LX + 24},${labelY + 11} Q ${LX + 24},${labelY + 8} ${LX + 27},${labelY + 8} L ${LX + 36},${labelY + 8}`}
                style={{ fill: "none", stroke: "var(--color-text-tertiary)", strokeWidth: "1.5" }}
              />
            )}
            {chip === "shadow" && (
              <>
                <rect x={LX + 14} y={labelY + 11} width="10" height="9" rx="2"
                  style={{ fill: "rgba(0,0,0,0.12)" }}
                />
                <rect x={LX + 12} y={labelY + 8} width="10" height="9" rx="2"
                  style={{ fill: "var(--color-bg-surface)", stroke: "var(--color-border-tertiary)", strokeWidth: "0.5" }}
                />
              </>
            )}

            {/* Label text */}
            <text x={LX + 30} y={labelY + PILL_H / 2 + 5}
              style={{ fill: "var(--color-text-primary)", fontSize: "12px", fontFamily: "var(--font-mono)", fontWeight: "600" }}
            >{name}</text>
          </g>
        )
      })}
    </svg>
  )
}

function TokenContextDemo() {
  return (
    <div style={{
      padding: "var(--spacing-8)",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--color-border-secondary)",
      background: "var(--color-bg-muted)",
      overflow: "hidden",
    }}>
      <TokenAnnotationDiagram />
    </div>
  )
}

export default function ColorsPage() {
  return (
    <DocsPageLayout
      eyebrow="Foundations"
      title="Colors"
      toc={TOC}
      lead={<>Semantic color tokens. Components reference only these, never raw primitives like <code>--color-blue-500</code>.</>}
    >
      <DocsPageSection
        id="tokens-in-context"
        title="Tokens in context"
        description="A static component illustration showing how semantic tokens map to real UI parts. The same names are used in CSS, Figma color modes, and component specs."
      >
        <TokenContextDemo />
      </DocsPageSection>

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

      <DocsPageSection id="foreground" title="Foreground" description="Use foreground tokens for icons, SVG strokes, and non-text foreground elements. Use text tokens only for typography.">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {FG_GROUPS.map(({ label, token, usage }) => (
          <div key={token} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-tertiary)", flexWrap: "wrap" }}>
            <span style={{ width: "18px", height: "18px", border: `2px solid var(${token})`, borderRadius: "var(--radius-xs)" }} />
            <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", width: "120px" }}>{label}</span>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{token}</code>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", flex: "1 1 220px" }}>{usage}</span>
          </div>
        ))}
      </div>
      </DocsPageSection>

      <DocsPageSection id="action" title="Action" description="Interactive backgrounds for default, hover, active, and subtle action states. These are component-state tokens, not general surface tokens.">
      <div style={swatchGridStyle}>
        {ACTION_GROUPS.map(s => <Swatch key={s.token} {...s} />)}
      </div>
      </DocsPageSection>

      <DocsPageSection id="background" title="Background" description="Surface elevation tokens plus status and intent backgrounds. Surface tokens describe where the layer sits; intent tokens describe the message or state.">
      <div style={swatchGridStyle}>
        {BG_GROUPS.map(s => <Swatch key={s.token} {...s} />)}
      </div>
      </DocsPageSection>

      <DocsPageSection id="control" title="Control" description="Idle and checked states for form controls: Checkbox, Radio, Toggle.">
      <div style={swatchGridStyle}>
        {CONTROL_GROUPS.map(s => <Swatch key={s.token} {...s} />)}
      </div>
      </DocsPageSection>

      <DocsPageSection id="feedback" title="Feedback" description="Alert and feedback-surface roles: intent backgrounds, borders, accents, and action colors that keep the published Alert appearance stable.">
      <div style={swatchGridStyle}>
        {FEEDBACK_GROUPS.map(s => <Swatch key={s.token} {...s} />)}
      </div>
      </DocsPageSection>

      <DocsPageSection id="text" title="Text" description="Typography-only color roles. Keep icon and SVG color on foreground tokens, even when the visual color matches.">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {TEXT_GROUPS.map(({ label, token, usage }) => (
          <div key={token} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-tertiary)", flexWrap: "wrap" }}>
            <span style={{ color: `var(${token})`, fontSize: "var(--text-md)", fontWeight: "var(--font-weight-semibold)", width: "120px" }}>Aa {label}</span>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{token}</code>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", flex: "1 1 220px" }}>{usage}</span>
          </div>
        ))}
      </div>
      </DocsPageSection>

      <DocsPageSection id="border" title="Border" description="Outline, divider, focus, and validation colors. Strong variants are used when the border itself carries the status meaning.">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {BORDER_GROUPS.map(({ label, token, usage }) => (
          <div key={token} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "10px 16px", borderRadius: "var(--radius-sm)", border: `2px solid var(${token})`, flexWrap: "wrap" }}>
            <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", width: "120px" }}>{label}</span>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{token}</code>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", flex: "1 1 220px" }}>{usage}</span>
          </div>
        ))}
      </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
