import type { Metadata } from "next"
import { CodeBlock } from "../../_components/code-block"

export const metadata: Metadata = { title: "Introduction — MAXA UI" }

const pageStyle: React.CSSProperties = {
  maxWidth: "760px",
  padding: "56px 48px 96px",
}

const h1Style: React.CSSProperties = {
  fontSize: "var(--text-heading-lg)",
  lineHeight: "34px",
  fontWeight: "var(--font-weight-bold)",
  color: "var(--color-text-primary)",
  margin: "0 0 12px",
  letterSpacing: "-0.02em",
}

const leadStyle: React.CSSProperties = {
  fontSize: "var(--text-lg)",
  lineHeight: "28px",
  color: "var(--color-text-secondary)",
  margin: "0 0 40px",
}

const h2Style: React.CSSProperties = {
  fontSize: "var(--text-heading-xs)",
  lineHeight: "24px",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-primary)",
  margin: "40px 0 12px",
  letterSpacing: "-0.01em",
}

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
  border: "1px solid var(--color-border-subtle)",
  fontSize: "var(--text-sm)",
  color: "var(--color-text-secondary)",
  background: "var(--color-bg-surface-layer1)",
}

const dividerStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid var(--color-border-subtle)",
  margin: "40px 0",
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
  border: "1px solid var(--color-border-subtle)",
  background: "var(--color-bg-surface-layer1)",
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
    <div style={pageStyle}>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", margin: "0 0 8px" }}>
        Getting Started
      </p>
      <h1 style={h1Style}>Introduction</h1>
      <p style={leadStyle}>
        MAXA UI is a token-first React design system. Every design decision — color, spacing,
        typography, radius — lives in CSS custom properties. Components consume tokens, never
        raw values.
      </p>

      <div style={badgeRowStyle}>
        {["React 19", "TypeScript", "CSS Variables", "Radix Primitives", "CVA"].map((b) => (
          <span key={b} style={badgeStyle}>{b}</span>
        ))}
      </div>

      <hr style={dividerStyle} />

      <h2 style={h2Style}>What is MAXA UI?</h2>
      <p style={pStyle}>
        MAXA UI is built on a three-layer token architecture: primitives → semantic tokens →
        component tokens. Components only reference component-level or semantic tokens — never
        raw color or spacing values.
      </p>
      <p style={pStyle}>
        This means your entire UI responds correctly to theming, dark mode, and brand
        customization without touching a single component.
      </p>

      <div style={featureGridStyle}>
        {[
          { title: "Token-first", desc: "Three-layer CSS variable architecture. Zero hardcoded values." },
          { title: "Dark mode", desc: "data-theme='dark' on <html>. No component changes needed." },
          { title: "Accessible", desc: "Built on Radix UI primitives. Focus, ARIA, keyboard handled." },
          { title: "Type-safe", desc: "Token prop types ensure only valid design values are passed." },
        ].map((f) => (
          <div key={f.title} style={featureCardStyle}>
            <p style={featureTitleStyle}>{f.title}</p>
            <p style={featureDescStyle}>{f.desc}</p>
          </div>
        ))}
      </div>

      <hr style={dividerStyle} />

      <h2 style={h2Style}>Token architecture</h2>
      <p style={pStyle}>
        Every CSS variable follows one of three layers:
      </p>
      <CodeBlock code={`/* Layer 1 — Primitives (never used in components directly) */
--color-blue-500: #3b82f6;

/* Layer 2 — Semantic */
--color-action-primary: var(--color-blue-500);

/* Layer 3 — Component */
--button-primary-bg: var(--color-action-primary);

/* Component code */
.button { background: var(--button-primary-bg); }`} />

      <hr style={dividerStyle} />

      <h2 style={h2Style}>Quick start</h2>
      <CodeBlock code={`import { Button } from "@maxa/ui"
import "@maxa/tokens/theme.css"

export default function App() {
  return <Button variant="primary">Get started</Button>
}`} />
    </div>
  )
}
