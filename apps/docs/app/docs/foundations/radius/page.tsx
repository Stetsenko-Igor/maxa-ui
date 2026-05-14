import type { Metadata } from "next"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Radius — MAXA UI" }
const TOC = [
  { href: "#visual-scale", label: "Visual scale" },
  { href: "#reference-table", label: "Reference table" },
]

const SCALE = [
  { name: "none", token: "--radius-none", px: 0,    usage: "Flush, table cells" },
  { name: "xxs",  token: "--radius-xxs",  px: 2,    usage: "Badges, tags" },
  { name: "xs",   token: "--radius-xs",   px: 4,    usage: "Buttons, inputs" },
  { name: "sm",   token: "--radius-sm",   px: 6,    usage: "Large buttons" },
  { name: "md",   token: "--radius-md",   px: 8,    usage: "Default — dropdowns, tooltips" },
  { name: "lg",   token: "--radius-lg",   px: 10,   usage: "Surface cards" },
  { name: "xl",   token: "--radius-xl",   px: 12,   usage: "Panels" },
  { name: "2xl",  token: "--radius-2xl",  px: 16,   usage: "Cards, modals" },
  { name: "3xl",  token: "--radius-3xl",  px: 20,   usage: "Large sheets" },
  { name: "4xl",  token: "--radius-4xl",  px: 24,   usage: "Hero cards" },
  { name: "full", token: "--radius-full", px: 9999, usage: "Pills, avatars, loaders" },
]

export default function RadiusPage() {
  return (
    <DocsPageLayout
      eyebrow="Foundations"
      title="Radius"
      toc={TOC}
      lead={<>11-step border radius scale. Buttons and inputs use <code>xs</code>. Cards and modals use <code>2xl</code>.</>}
    >
      <DocsPageSection id="visual-scale" title="Visual scale">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px", marginBottom: "40px" }}>
        {SCALE.filter(s => s.px <= 24).map(({ name, token, px }) => (
          <div key={name} style={{ padding: "16px", border: "1px solid var(--color-border-secondary)", background: "var(--color-bg-surface)", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ width: "56px", height: "56px", background: "var(--color-action-primary-subtle)", border: "2px solid var(--color-action-primary)", borderRadius: `var(${token})` }} />
            <div>
              <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{name}</p>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--text-caption-sm)", color: "var(--color-text-tertiary)" }}>{px}px</p>
            </div>
          </div>
        ))}
        {/* full */}
        <div style={{ padding: "16px", border: "1px solid var(--color-border-secondary)", background: "var(--color-bg-surface)", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ width: "56px", height: "56px", background: "var(--color-action-primary-subtle)", border: "2px solid var(--color-action-primary)", borderRadius: "var(--radius-full)" }} />
          <div>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>full</p>
            <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--text-caption-sm)", color: "var(--color-text-tertiary)" }}>9999px</p>
          </div>
        </div>
      </div>
      </DocsPageSection>

      <DocsPageSection id="reference-table" title="Reference table">
      <div style={{ border: "1px solid var(--color-border-secondary)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-muted)" }}>
              {["Token", "CSS var", "Value", "Usage"].map(h => (
                <th key={h} style={{ padding: "8px 16px", fontSize: "var(--text-caption-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "left", borderBottom: "1px solid var(--color-border-secondary)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCALE.map(({ name, token, px, usage }, i) => (
              <tr key={name} style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border-secondary)" }}>
                <td style={{ padding: "10px 16px" }}><code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-primary)", fontWeight: "var(--font-weight-medium)" }}>{name}</code></td>
                <td style={{ padding: "10px 16px" }}><code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-caption-sm)", color: "var(--color-text-tertiary)" }}>{token}</code></td>
                <td style={{ padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>{px === 9999 ? "9999px" : `${px}px`}</td>
                <td style={{ padding: "10px 16px", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
