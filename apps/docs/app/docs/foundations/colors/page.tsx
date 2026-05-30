import type { Metadata } from "next"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Colors — MAXA UI" }
const TOC = [
  { href: "#tokens-in-context", label: "Tokens in context" },
  { href: "#neutral-scale", label: "Neutral scale" },
  { href: "#foreground", label: "Foreground" },
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
  { step: "0",    variable: "--color-base-white", hex: "#FFFFFF",  light: ["bg/surface", "bg/float"],                         dark: [] },
  { step: "25",   variable: "--color-neutral-25",    hex: "#F8F8F8",  light: ["bg/muted"],                                      dark: [] },
  { step: "50",   variable: "--color-neutral-50",    hex: "#F5F6FA",  light: ["bg/page"],                                       dark: [] },
  { step: "100",  variable: "--color-neutral-100",   hex: "#F4F3F3",  light: ["border/tertiary", "bg/disabled", "bg/neutral-subtle"], dark: [] },
  { step: "200",  variable: "--color-neutral-200",   hex: "#E9EAEF",  light: ["border/secondary", "bg/neutral-on-subtle"],      dark: [] },
  { step: "300",  variable: "--color-neutral-300",   hex: "#E4E4E4",  light: ["border/primary", "action/neutral"],              dark: [] },
  { step: "400",  variable: "--color-neutral-400",   hex: "#D7D5D5",  light: ["text/disabled", "action/neutral-hover"],         dark: [] },
  { step: "500",  variable: "--color-neutral-500",   hex: "#A1A1A4",  light: ["action/neutral-active"],                         dark: ["text/tertiary", "border/neutral-strong"] },
  { step: "600",  variable: "--color-neutral-600",   hex: "#8C8C8E",  light: ["text/tertiary"],                                 dark: ["action/neutral-active"] },
  { step: "700",  variable: "--color-neutral-700",   hex: "#6B6B6D",  light: [],                                                dark: ["border/primary", "text/disabled", "action/neutral-hover"] },
  { step: "800",  variable: "--color-neutral-800",   hex: "#444445",  light: ["text/secondary", "bg/neutral-strong"],           dark: ["border/secondary", "bg/float", "bg/neutral-subtle", "action/neutral"] },
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

type TokenItem = {
  label: string
  token: string
  usage: string
}

function Swatch({ label, token, usage, textDark: _textDark = false }: TokenItem & { textDark?: boolean }) {
  return (
    <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--color-border-tertiary)" }}>
      <div style={{ height: "56px", background: `var(${token})` }} />
      <div style={{ padding: "8px 10px", background: "var(--color-bg-page)" }}>
        <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: "var(--text-caption-sm)", fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}>{token}</p>
        <p style={{ margin: "6px 0 0", fontSize: "var(--text-caption-sm)", color: "var(--color-text-secondary)", lineHeight: 1.35 }}>{usage}</p>
      </div>
    </div>
  )
}

const ACTION_GROUPS: TokenItem[] = [
  { label: "Primary", token: "--color-action-primary", usage: "Primary interactive fill, default state." },
  { label: "Primary Hover", token: "--color-action-primary-hover", usage: "Primary interactive fill on hover." },
  { label: "Primary Active", token: "--color-action-primary-active", usage: "Primary interactive fill while pressed." },
  { label: "Primary Subtle", token: "--color-action-primary-subtle", usage: "Low-emphasis primary actions and selected fills." },
  { label: "Primary Subtle Hover", token: "--color-action-primary-subtle-hover", usage: "Low-emphasis primary action hover." },
  { label: "Primary Subtle Active", token: "--color-action-primary-subtle-active", usage: "Low-emphasis primary action pressed state." },
  { label: "Neutral", token: "--color-action-neutral", usage: "Neutral controls, secondary buttons, toggles." },
  { label: "Neutral Hover", token: "--color-action-neutral-hover", usage: "Neutral control hover state." },
  { label: "Neutral Active", token: "--color-action-neutral-active", usage: "Neutral control pressed state." },
  { label: "Neutral Subtle", token: "--color-action-neutral-subtle", usage: "Quiet neutral controls and selected rows." },
  { label: "Neutral Subtle Hover", token: "--color-action-neutral-subtle-hover", usage: "Quiet neutral control hover state." },
  { label: "Neutral Subtle Active", token: "--color-action-neutral-subtle-active", usage: "Quiet neutral control pressed state." },
  { label: "Brand", token: "--color-action-brand", usage: "Brand actions and branded confirmation fills." },
  { label: "Brand Hover", token: "--color-action-brand-hover", usage: "Brand action hover state." },
  { label: "Brand Active", token: "--color-action-brand-active", usage: "Brand action pressed state." },
  { label: "Brand Subtle", token: "--color-action-brand-subtle", usage: "Low-emphasis brand action background." },
  { label: "Brand Subtle Hover", token: "--color-action-brand-subtle-hover", usage: "Low-emphasis brand action hover." },
  { label: "Brand Subtle Active", token: "--color-action-brand-subtle-active", usage: "Low-emphasis brand action pressed state." },
  { label: "Positive", token: "--color-action-positive", usage: "Positive or success action fill." },
  { label: "Positive Hover", token: "--color-action-positive-hover", usage: "Positive action hover state." },
  { label: "Positive Active", token: "--color-action-positive-active", usage: "Positive action pressed state." },
  { label: "Positive Subtle", token: "--color-action-positive-subtle", usage: "Low-emphasis positive action background." },
  { label: "Positive Subtle Hover", token: "--color-action-positive-subtle-hover", usage: "Low-emphasis positive action hover." },
  { label: "Positive Subtle Active", token: "--color-action-positive-subtle-active", usage: "Low-emphasis positive action pressed state." },
  { label: "Negative", token: "--color-action-negative", usage: "Destructive or negative action fill." },
  { label: "Negative Hover", token: "--color-action-negative-hover", usage: "Negative action hover state." },
  { label: "Negative Active", token: "--color-action-negative-active", usage: "Negative action pressed state." },
  { label: "Negative Subtle", token: "--color-action-negative-subtle", usage: "Low-emphasis negative action background." },
  { label: "Negative Subtle Hover", token: "--color-action-negative-subtle-hover", usage: "Low-emphasis negative action hover." },
  { label: "Negative Subtle Active", token: "--color-action-negative-subtle-active", usage: "Low-emphasis negative action pressed state." },
  { label: "Warning", token: "--color-action-warning", usage: "Warning or caution action fill." },
  { label: "Warning Hover", token: "--color-action-warning-hover", usage: "Warning action hover state." },
  { label: "Warning Active", token: "--color-action-warning-active", usage: "Warning action pressed state." },
  { label: "Warning Subtle", token: "--color-action-warning-subtle", usage: "Low-emphasis warning action background." },
  { label: "Warning Subtle Hover", token: "--color-action-warning-subtle-hover", usage: "Low-emphasis warning action hover." },
  { label: "Warning Subtle Active", token: "--color-action-warning-subtle-active", usage: "Low-emphasis warning action pressed state." },
]

const BG_GROUPS: TokenItem[] = [
  { label: "Page", token: "--color-bg-page", usage: "App canvas and lowest page layer." },
  { label: "Surface", token: "--color-bg-surface", usage: "Raised surfaces: cards, inputs, modals, tables." },
  { label: "Float", token: "--color-bg-float", usage: "Floating surfaces: dropdowns, popovers, tooltips." },
  { label: "Muted", token: "--color-bg-muted", usage: "Quiet recessed zones, code blocks, wells." },
  { label: "Overlay", token: "--color-bg-overlay", usage: "Modal scrims and blocking overlays." },
  { label: "Inverse", token: "--color-bg-inverse", usage: "High-contrast inverse blocks." },
  { label: "Disabled", token: "--color-bg-disabled", usage: "Disabled backgrounds and inactive fills." },
  { label: "Neutral Subtle", token: "--color-bg-neutral-subtle", usage: "Neutral badges, tags, soft status fills." },
  { label: "Neutral On Subtle", token: "--color-bg-neutral-on-subtle", usage: "Elements placed on neutral subtle backgrounds." },
  { label: "Neutral Strong", token: "--color-bg-neutral-strong", usage: "Strong neutral badges and emphasis fills." },
  { label: "Brand Subtle", token: "--color-bg-brand-subtle", usage: "Soft brand badges, highlights, callouts." },
  { label: "Brand Surface", token: "--color-bg-brand-surface", usage: "Brand-tinted panels and selected containers." },
  { label: "Brand Strong", token: "--color-bg-brand-strong", usage: "Strong brand badges and emphasis fills." },
  { label: "Info Subtle", token: "--color-bg-info-subtle", usage: "Soft informational badges and alerts." },
  { label: "Info Surface", token: "--color-bg-info-surface", usage: "Info panels and alert surfaces." },
  { label: "Info Strong", token: "--color-bg-info-strong", usage: "Strong informational badges." },
  { label: "Success Subtle", token: "--color-bg-success-subtle", usage: "Soft success badges and alerts." },
  { label: "Success Surface", token: "--color-bg-success-surface", usage: "Success panels and alert surfaces." },
  { label: "Success Strong", token: "--color-bg-success-strong", usage: "Strong success badges." },
  { label: "Error Subtle", token: "--color-bg-error-subtle", usage: "Soft error badges and alerts." },
  { label: "Error Surface", token: "--color-bg-error-surface", usage: "Error panels and alert surfaces." },
  { label: "Error Strong", token: "--color-bg-error-strong", usage: "Strong error badges." },
  { label: "Warning Subtle", token: "--color-bg-warning-subtle", usage: "Soft warning badges and alerts." },
  { label: "Warning Surface", token: "--color-bg-warning-surface", usage: "Warning panels and alert surfaces." },
  { label: "Warning Strong", token: "--color-bg-warning-strong", usage: "Strong warning badges." },
]

const FG_GROUPS: TokenItem[] = [
  { label: "Primary", token: "--color-fg-primary", usage: "Primary icons and SVG strokes." },
  { label: "Secondary", token: "--color-fg-secondary", usage: "Supporting icons and quiet controls." },
  { label: "Tertiary", token: "--color-fg-tertiary", usage: "Subtle icons, placeholders, metadata icons." },
  { label: "Disabled", token: "--color-fg-disabled", usage: "Disabled icons and inactive glyphs." },
  { label: "Inverse", token: "--color-fg-inverse", usage: "Icons on inverse backgrounds." },
  { label: "On Brand", token: "--color-fg-on-brand", usage: "Icons on brand-filled controls." },
  { label: "Brand", token: "--color-fg-brand", usage: "Brand icons and accent glyphs." },
  { label: "Info", token: "--color-fg-info", usage: "Informational icons." },
  { label: "Positive", token: "--color-fg-positive", usage: "Success and positive icons." },
  { label: "Negative", token: "--color-fg-negative", usage: "Error and destructive icons." },
  { label: "Warning", token: "--color-fg-warning", usage: "Warning and caution icons." },
]

const TEXT_GROUPS: TokenItem[] = [
  { label: "Primary", token: "--color-text-primary", usage: "Main copy, headings, important labels." },
  { label: "Secondary", token: "--color-text-secondary", usage: "Supporting copy and secondary labels." },
  { label: "Tertiary", token: "--color-text-tertiary", usage: "Captions, metadata, helper text." },
  { label: "Disabled", token: "--color-text-disabled", usage: "Disabled text and unavailable values." },
  { label: "Inverse", token: "--color-text-inverse", usage: "Text on inverse backgrounds." },
  { label: "On Brand", token: "--color-text-on-brand", usage: "Text on brand-filled actions." },
  { label: "Brand", token: "--color-text-brand", usage: "Brand text links and accents." },
  { label: "Info", token: "--color-text-info", usage: "Informational message text." },
  { label: "Success", token: "--color-text-success", usage: "Success and positive message text." },
  { label: "Error", token: "--color-text-error", usage: "Error and destructive message text." },
  { label: "Warning", token: "--color-text-warning", usage: "Warning and caution message text." },
]

const BORDER_GROUPS: TokenItem[] = [
  { label: "Primary", token: "--color-border-primary", usage: "Default component outlines and dividers." },
  { label: "Secondary", token: "--color-border-secondary", usage: "Lower-emphasis separators and nested outlines." },
  { label: "Tertiary", token: "--color-border-tertiary", usage: "Subtle separators and quiet outlines." },
  { label: "Focus", token: "--color-border-focus", usage: "Keyboard focus rings and focused inputs." },
  { label: "Brand", token: "--color-border-brand", usage: "Brand-selected component outlines." },
  { label: "Error", token: "--color-border-error", usage: "Invalid inputs and error boundaries." },
  { label: "Info Strong", token: "--color-border-info-strong", usage: "Strong informational borders." },
  { label: "Success Strong", token: "--color-border-success-strong", usage: "Strong success borders and validation states." },
  { label: "Warning Strong", token: "--color-border-warning-strong", usage: "Strong warning borders." },
  { label: "Neutral Strong", token: "--color-border-neutral-strong", usage: "High-emphasis neutral outlines." },
  { label: "Neutral Subtle", token: "--color-border-neutral-subtle", usage: "Low-emphasis neutral outlines." },
]

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
