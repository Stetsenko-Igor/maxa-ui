import type { Metadata } from "next"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Breakpoints - MAXA UI" }

const TOC = [
  { href: "#values", label: "Values" },
  { href: "#strategy", label: "Strategy" },
  { href: "#layout-tokens", label: "Layout tokens" },
  { href: "#patterns", label: "Patterns" },
]

const BREAKPOINTS = [
  { name: "mobile", value: "375px", usage: "Base mobile viewport" },
  { name: "tablet", value: "768px", usage: "Tablet portrait and up" },
  { name: "laptop", value: "1024px", usage: "Small laptop and landscape tablet" },
  { name: "desktop", value: "1280px", usage: "Standard desktop" },
  { name: "wide", value: "1440px", usage: "Wide desktop" },
  { name: "ultra", value: "1680px", usage: "Ultra-wide" },
  { name: "max", value: "1920px", usage: "Full HD and up" },
]

const LAYOUT = [
  { token: "Container/padding", mobile: "16px", tablet: "24px", desktop: "32px" },
  { token: "Stack/section", mobile: "48px", tablet: "64px", desktop: "80px" },
  { token: "Grid/gutter", mobile: "16px", tablet: "20px", desktop: "24px" },
]

const th: React.CSSProperties = {
  padding: "8px 16px",
  borderBottom: "1px solid var(--color-border-secondary)",
  background: "var(--color-bg-muted)",
  color: "var(--color-text-tertiary)",
  fontSize: "var(--text-caption-sm)",
  fontWeight: "var(--font-weight-semibold)",
  textAlign: "left",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
}

const td: React.CSSProperties = {
  padding: "10px 16px",
  borderTop: "1px solid var(--color-border-secondary)",
  color: "var(--color-text-secondary)",
  fontSize: "var(--text-sm)",
}

const code: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-caption-sm)",
  color: "var(--color-text-primary)",
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--color-border-secondary)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table>
    </div>
  )
}

export default function BreakpointsPage() {
  return (
    <DocsPageLayout
      eyebrow="Foundations"
      title="Breakpoints"
      toc={TOC}
      lead={<>Mobile-first viewport thresholds and responsive layout token mapping for MAXA UI.</>}
    >
      <DocsPageSection id="values" title="Values">
        <Table>
          <thead><tr>{["Name", "Value", "When it starts"].map((heading) => <th key={heading} style={th}>{heading}</th>)}</tr></thead>
          <tbody>
            {BREAKPOINTS.map((row, index) => (
              <tr key={row.name}>
                <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}><code style={code}>{row.name}</code></td>
                <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}><code style={code}>{row.value}</code></td>
                <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}>{row.usage}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DocsPageSection>

      <DocsPageSection id="strategy" title="Strategy" description="Write base styles for mobile first, then override upward at tablet, laptop, desktop, and wider breakpoints. Do not scale font size directly with viewport width.">
        <pre style={{ margin: 0, padding: "16px", borderRadius: "var(--radius-md)", background: "var(--color-bg-muted)", overflowX: "auto" }}>
          <code style={code}>{`.surface {
  padding: var(--spacing-xl);
}

@media (min-width: 768px) {
  .surface {
    padding: var(--spacing-3xl);
  }
}`}</code>
        </pre>
      </DocsPageSection>

      <DocsPageSection id="layout-tokens" title="Layout Tokens">
        <Table>
          <thead><tr>{["Token", "Mobile", "Tablet", "Desktop"].map((heading) => <th key={heading} style={th}>{heading}</th>)}</tr></thead>
          <tbody>
            {LAYOUT.map((row, index) => (
              <tr key={row.token}>
                <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}><code style={code}>{row.token}</code></td>
                <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}>{row.mobile}</td>
                <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}>{row.tablet}</td>
                <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}>{row.desktop}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DocsPageSection>

      <DocsPageSection id="patterns" title="Patterns" description="Constrain content with max-width 1568px, then apply responsive side padding. Typography changes come from the typography collection at tablet and desktop thresholds.">
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--text-sm)", lineHeight: "var(--text-sm--line-height)" }}>
          Source: <code style={code}>packages/tokens/figma/breakpoints.json</code>
        </p>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
