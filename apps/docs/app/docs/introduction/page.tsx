import type { Metadata } from "next"
import { CodeBlock } from "../../_components/code-block"
import { DocsPageLayout, DocsPageSection } from "../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Introduction — MAXA UI" }

const TOC = [
  { href: "#what-is-maxa-ui", label: "What is MAXA UI?" },
  { href: "#token-architecture", label: "Token architecture" },
  { href: "#quick-start", label: "Quick start" },
]

const pStyle: React.CSSProperties = {
  fontSize: "var(--text-md)",
  lineHeight: "24px",
  color: "var(--color-text-secondary)",
  margin: "0 0 16px",
}

const badgeRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  margin: "0 0 40px",
}

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 10px",
  borderRadius: "var(--radius-full)",
  border: "1px solid var(--color-border-secondary)",
  fontSize: "var(--text-sm)",
  color: "var(--color-text-secondary)",
  background: "var(--color-bg-surface)",
}

const featureGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  marginTop: "16px",
}

const featureCardStyle: React.CSSProperties = {
  padding: "16px 20px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border-secondary)",
  background: "var(--color-bg-surface)",
}

const featureTitleStyle: React.CSSProperties = {
  fontSize: "var(--text-sm)",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-primary)",
  margin: "0 0 4px",
}

const featureDescStyle: React.CSSProperties = {
  fontSize: "var(--text-sm)",
  color: "var(--color-text-secondary)",
  margin: 0,
  lineHeight: "18px",
}

export default function IntroductionPage() {
  return (
    <DocsPageLayout
      eyebrow="Getting Started"
      title="Introduction"
      toc={TOC}
      lead={
        <>
          MAXA UI is a token-first React design system. Every design decision
          color, spacing, typography, radius lives in CSS custom properties.
          Components consume tokens, never raw values.
        </>
      }
    >
      <div style={badgeRowStyle}>
        {["React 19", "TypeScript", "CSS Variables", "Radix Primitives", "CVA"].map((badge) => (
          <span key={badge} style={badgeStyle}>{badge}</span>
        ))}
      </div>

      <DocsPageSection id="what-is-maxa-ui" title="What is MAXA UI?">
        <p style={pStyle}>
          MAXA UI is built on a three-layer token architecture: primitives to
          semantic tokens to component tokens. Components only reference
          component-level or semantic tokens, never raw color or spacing values.
        </p>
        <p style={pStyle}>
          This means your entire UI responds correctly to theming, dark mode,
          and brand customization without touching a single component.
        </p>

        <div style={featureGridStyle}>
          {[
            { title: "Token-first", desc: "Three-layer CSS variable architecture. Zero hardcoded values." },
            { title: "Dark mode", desc: "data-theme='dark' on html. No component changes needed." },
            { title: "Accessible", desc: "Built on Radix UI primitives. Focus, ARIA, keyboard handled." },
            { title: "Type-safe", desc: "Token prop types ensure only valid design values are passed." },
          ].map((feature) => (
            <div key={feature.title} style={featureCardStyle}>
              <p style={featureTitleStyle}>{feature.title}</p>
              <p style={featureDescStyle}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </DocsPageSection>

      <DocsPageSection id="token-architecture" title="Token architecture">
        <p style={pStyle}>Every CSS variable follows one of three layers:</p>
        <CodeBlock code={`/* Layer 1 — Primitives (never used in components directly) */
--color-blue-500: #3b82f6;

/* Layer 2 — Semantic */
--color-action-primary: var(--color-blue-500);

/* Layer 3 — Component */
--button-primary-bg: var(--color-action-primary);

/* Component code */
.button { background: var(--button-primary-bg); }`} />
      </DocsPageSection>

      <DocsPageSection id="quick-start" title="Quick start">
        <CodeBlock code={`import { Button } from "@maxa/ui"
import "@maxa/tokens/theme.css"

export default function App() {
  return <Button variant="primary">Get started</Button>
}`} />
      </DocsPageSection>
    </DocsPageLayout>
  )
}
