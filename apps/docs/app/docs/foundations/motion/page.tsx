import type { Metadata } from "next"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Motion - MAXA UI" }

const TOC = [
  { href: "#durations", label: "Durations" },
  { href: "#easings", label: "Easings" },
  { href: "#usage", label: "Usage" },
  { href: "#reduced-motion", label: "Reduced motion" },
]

const DURATIONS = [
  { name: "instant", token: "--duration-instant", value: "50ms", usage: "Near-immediate tap feedback" },
  { name: "fast", token: "--duration-fast", value: "100ms", usage: "Hover and small state changes" },
  { name: "base", token: "--duration-base", value: "150ms", usage: "Default interactive transitions" },
  { name: "slow", token: "--duration-slow", value: "250ms", usage: "Overlays and larger movement" },
  { name: "slower", token: "--duration-slower", value: "400ms", usage: "Large expressive surfaces" },
]

const EASINGS = [
  { name: "standard", token: "--easing-standard", value: "cubic-bezier(0.2, 0, 0, 1)", usage: "Default for most transitions" },
  { name: "emphasized", token: "--easing-emphasized", value: "cubic-bezier(0.3, 0, 0, 1)", usage: "Expressive movement" },
  { name: "decelerate", token: "--easing-decelerate", value: "cubic-bezier(0, 0, 0, 1)", usage: "Entering elements" },
]

const tableWrap: React.CSSProperties = {
  border: "1px solid var(--color-border-secondary)",
  borderRadius: "var(--radius-md)",
  overflow: "hidden",
}

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

function TokenTable({ rows }: { rows: Array<{ name: string; token: string; value: string; usage: string }> }) {
  return (
    <div style={tableWrap}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Name", "Token", "Value", "Usage"].map((heading) => <th key={heading} style={th}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.name}>
              <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}>{row.name}</td>
              <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}><code style={code}>{row.token}</code></td>
              <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}><code style={code}>{row.value}</code></td>
              <td style={{ ...td, borderTop: index === 0 ? 0 : td.borderTop }}>{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function MotionPage() {
  return (
    <DocsPageLayout
      eyebrow="Foundations"
      title="Motion"
      toc={TOC}
      lead={<>Duration and easing tokens for MAXA UI. Components reference these variables for transitions and animations instead of hardcoded timing values.</>}
    >
      <DocsPageSection id="durations" title="Durations">
        <TokenTable rows={DURATIONS} />
      </DocsPageSection>

      <DocsPageSection id="easings" title="Easings">
        <TokenTable rows={EASINGS} />
      </DocsPageSection>

      <DocsPageSection id="usage" title="Usage">
        <pre style={{ margin: 0, padding: "16px", borderRadius: "var(--radius-md)", background: "var(--color-bg-muted)", overflowX: "auto" }}>
          <code style={code}>{`transition:
  background-color var(--duration-fast) var(--easing-standard),
  transform var(--duration-base) var(--easing-standard);`}</code>
        </pre>
      </DocsPageSection>

      <DocsPageSection
        id="reduced-motion"
        title="Reduced motion"
        description="The global token bundle includes a prefers-reduced-motion guard. Components keep their transition declarations, but animation and transition durations collapse when the OS requests reduced motion."
      >
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--text-sm)", lineHeight: "var(--text-sm--line-height)" }}>
          Source: <code style={code}>packages/tokens/src/motion.css</code>
        </p>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
