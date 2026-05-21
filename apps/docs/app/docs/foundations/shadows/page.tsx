import type { Metadata } from "next"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Shadows — MAXA UI" }

const TOC = [
  { href: "#visual-scale", label: "Visual scale" },
  { href: "#reference-table", label: "Reference table" },
  { href: "#usage", label: "Usage" },
]

const SCALE = [
  {
    name: "xs",
    token: "--shadow-xs",
    value: "0px 1px 2px 0px rgba(0,0,0,0.05)",
    usage: "Small cards, subtle lift",
  },
  {
    name: "sm",
    token: "--shadow-sm",
    value: "0 1px 3px rgba(0,0,0,.10), 0 1px 2px -1px rgba(0,0,0,.10)",
    usage: "Dropdowns, select menus",
  },
  {
    name: "md",
    token: "--shadow-md",
    value: "0 4px 6px -1px rgba(0,0,0,.10), 0 2px 4px -2px rgba(0,0,0,.06)",
    usage: "Tooltips, popovers",
  },
  {
    name: "lg",
    token: "--shadow-lg",
    value: "0 12px 16px -4px rgba(0,0,0,.08), …",
    usage: "Modals, drawers",
  },
  {
    name: "xl",
    token: "--shadow-xl",
    value: "0 20px 24px -4px rgba(0,0,0,.08), …",
    usage: "Full-screen overlays",
  },
  {
    name: "2xl",
    token: "--shadow-2xl",
    value: "0 24px 48px -12px rgba(0,0,0,.18), …",
    usage: "Hero cards, featured elements",
  },
  {
    name: "3xl",
    token: "--shadow-3xl",
    value: "0 32px 64px -12px rgba(0,0,0,.14), …",
    usage: "Reserved / max elevation",
  },
]

export default function ShadowsPage() {
  return (
    <DocsPageLayout
      eyebrow="Foundations"
      title="Shadows"
      toc={TOC}
      lead={<>7-level elevation scale for floating surfaces. Use shadows on overlays and cards — never on inline elements.</>}
    >
      <DocsPageSection id="visual-scale" title="Visual scale">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {SCALE.map(({ name, token }) => (
            <div
              key={name}
              style={{
                padding: "24px 20px",
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border-secondary)",
                borderRadius: "var(--radius-xl)",
                boxShadow: `var(${token})`,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <p style={{ margin: 0, fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>
                shadow-{name}
              </p>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "var(--text-caption-sm)", color: "var(--color-text-tertiary)" }}>
                {token}
              </p>
            </div>
          ))}
        </div>
      </DocsPageSection>

      <DocsPageSection id="reference-table" title="Reference table">
        <div style={{ border: "1px solid var(--color-border-secondary)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--color-bg-muted)" }}>
                {["Token", "CSS var", "Usage"].map(h => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 16px",
                      fontSize: "var(--text-caption-sm)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--color-text-tertiary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      textAlign: "left",
                      borderBottom: "1px solid var(--color-border-secondary)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCALE.map(({ name, token, usage }, i) => (
                <tr key={name} style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border-secondary)" }}>
                  <td style={{ padding: "10px 16px" }}>
                    <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-primary)", fontWeight: "var(--font-weight-medium)" }}>
                      shadow-{name}
                    </code>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-caption-sm)", color: "var(--color-text-tertiary)" }}>
                      {token}
                    </code>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                    {usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsPageSection>

      <DocsPageSection id="usage" title="Usage">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "16px", background: "var(--color-bg-muted)", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--color-action-positive)" }}>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-primary)", fontWeight: "var(--font-weight-semibold)" }}>Do</p>
            <p style={{ margin: "4px 0 0", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
              {`--dropdown-shadow: var(--shadow-sm);`}<br />
              {`box-shadow: var(--dropdown-shadow);`}
            </p>
          </div>
          <div style={{ padding: "16px", background: "var(--color-bg-muted)", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--color-action-negative)" }}>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-primary)", fontWeight: "var(--font-weight-semibold)" }}>Don&apos;t</p>
            <p style={{ margin: "4px 0 0", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
              {`box-shadow: var(--shadow-sm); /* use component token, not shadow directly */`}
            </p>
          </div>
        </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
