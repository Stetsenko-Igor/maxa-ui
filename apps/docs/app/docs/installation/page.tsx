import type { Metadata } from "next"
import { CodeBlock } from "../../_components/code-block"

export const metadata: Metadata = { title: "Installation — MAXA UI" }

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

const dividerStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid var(--color-border-subtle)",
  margin: "40px 0",
}

const stepStyle: React.CSSProperties = {
  display: "flex",
  gap: "16px",
  marginBottom: "32px",
}

const stepNumberStyle: React.CSSProperties = {
  flexShrink: 0,
  width: "28px",
  height: "28px",
  borderRadius: "var(--radius-full)",
  background: "var(--color-bg-surface-layer2)",
  border: "1px solid var(--color-border-subtle)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "var(--text-sm)",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-mono)",
  marginTop: "2px",
}

const stepBodyStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
}

const stepTitleStyle: React.CSSProperties = {
  fontSize: "var(--text-md)",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-primary)",
  margin: "0 0 8px",
  lineHeight: "24px",
}

const stepDescStyle: React.CSSProperties = {
  fontSize: "var(--text-md)",
  lineHeight: "24px",
  color: "var(--color-text-secondary)",
  margin: "0 0 12px",
}

const inlineCodeStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-sm)",
  background: "var(--color-bg-surface-layer2)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-sm)",
  padding: "1px 5px",
  color: "var(--color-text-primary)",
}

const noteStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "var(--radius-md)",
  background: "var(--color-bg-surface-layer2)",
  border: "1px solid var(--color-border-subtle)",
  fontSize: "var(--text-sm)",
  lineHeight: "20px",
  color: "var(--color-text-secondary)",
  margin: "12px 0 0",
}

export default function InstallationPage() {
  return (
    <div style={pageStyle}>
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-tertiary)",
          margin: "0 0 8px",
        }}
      >
        Getting Started
      </p>
      <h1 style={h1Style}>Installation</h1>
      <p style={leadStyle}>
        Get MAXA UI running in your React project in five steps. The token layer
        is separate from components — install both packages to get the full
        system.
      </p>

      <hr style={dividerStyle} />

      {/* Step 1 */}
      <div style={stepStyle}>
        <div style={stepNumberStyle}>1</div>
        <div style={stepBodyStyle}>
          <p style={stepTitleStyle}>Install packages</p>
          <p style={stepDescStyle}>
            Install <code style={inlineCodeStyle}>@maxa/ui</code> and{" "}
            <code style={inlineCodeStyle}>@maxa/tokens</code> from the registry.
            Tokens are a separate package so you can consume them independently
            of the React components.
          </p>
          <CodeBlock
            code={`npm install @maxa/ui @maxa/tokens
# or
pnpm add @maxa/ui @maxa/tokens
# or
yarn add @maxa/ui @maxa/tokens`}
          />
        </div>
      </div>

      {/* Step 2 */}
      <div style={stepStyle}>
        <div style={stepNumberStyle}>2</div>
        <div style={stepBodyStyle}>
          <p style={stepTitleStyle}>Import the token stylesheet</p>
          <p style={stepDescStyle}>
            Add the token CSS to your app's root entry point. This loads all
            three token layers — primitives, semantic, and component — as CSS
            custom properties on{" "}
            <code style={inlineCodeStyle}>:root</code>.
          </p>
          <CodeBlock
            code={`// app/layout.tsx (Next.js App Router)
import "@maxa/tokens/theme.css"

// or in your global CSS entry
@import "@maxa/tokens/theme.css";`}
          />
          <p style={noteStyle}>
            <strong style={{ color: "var(--color-text-primary)" }}>
              Note:
            </strong>{" "}
            Import <code style={inlineCodeStyle}>theme.css</code> once at the
            top of your CSS cascade. Importing it multiple times is harmless but
            unnecessary.
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div style={stepStyle}>
        <div style={stepNumberStyle}>3</div>
        <div style={stepBodyStyle}>
          <p style={stepTitleStyle}>Set up dark mode (optional)</p>
          <p style={stepDescStyle}>
            Dark mode is driven entirely by a{" "}
            <code style={inlineCodeStyle}>data-theme="dark"</code> attribute on
            the <code style={inlineCodeStyle}>{"<html>"}</code> element. No
            component changes are needed — all token overrides live in the
            stylesheet.
          </p>
          <CodeBlock
            code={`// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  )
}

// To toggle dynamically, set/remove the attribute:
document.documentElement.setAttribute("data-theme", "dark")
document.documentElement.removeAttribute("data-theme")`}
          />
        </div>
      </div>

      {/* Step 4 */}
      <div style={stepStyle}>
        <div style={stepNumberStyle}>4</div>
        <div style={stepBodyStyle}>
          <p style={stepTitleStyle}>Import and use a component</p>
          <p style={stepDescStyle}>
            All components are exported from{" "}
            <code style={inlineCodeStyle}>@maxa/ui</code>. Each component is
            fully typed and forwards refs. Styling is controlled via CSS
            variables — no className overrides needed.
          </p>
          <CodeBlock
            code={`import { Button } from "@maxa/ui"

export default function Page() {
  return (
    <main>
      <Button variant="primary" size="md">
        Get started
      </Button>
      <Button variant="secondary" size="md">
        Learn more
      </Button>
    </main>
  )
}`}
          />
        </div>
      </div>

      {/* Step 5 */}
      <div style={stepStyle}>
        <div style={stepNumberStyle}>5</div>
        <div style={stepBodyStyle}>
          <p style={stepTitleStyle}>Verify token resolution</p>
          <p style={stepDescStyle}>
            Open DevTools and inspect any MAXA UI component. Its computed styles
            should show resolved CSS custom properties. If you see bare{" "}
            <code style={inlineCodeStyle}>var(--...)</code> strings, the token
            stylesheet was not imported correctly.
          </p>
          <CodeBlock
            code={`/* Expected in DevTools computed styles */
background-color: #1a1a1a;   /* resolved from var(--button-primary-bg) */
color: #ffffff;               /* resolved from var(--button-primary-text) */
border-radius: 8px;           /* resolved from var(--button-radius) */

/* If you see this instead, theme.css is missing: */
background-color: var(--button-primary-bg);  /* ← not resolved */`}
          />
          <p style={noteStyle}>
            Run{" "}
            <code style={inlineCodeStyle}>node scripts/audit-tokens.mjs</code>{" "}
            from the repository root to validate that all token references in
            your CSS are correct before shipping.
          </p>
        </div>
      </div>

      <hr style={dividerStyle} />

      <h2 style={h2Style}>Peer dependencies</h2>
      <p style={pStyle}>
        MAXA UI requires React 18 or 19 and does not bundle React itself.
        Radix UI primitives are direct dependencies and are installed
        automatically.
      </p>
      <CodeBlock
        code={`{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}`}
      />

      <hr style={dividerStyle} />

      <h2 style={h2Style}>Next steps</h2>
      <p style={pStyle}>
        Browse the <strong>Foundations</strong> section to understand the color,
        typography, and spacing token system. Then head to{" "}
        <strong>Components</strong> to see each component's variant and size API.
      </p>
    </div>
  )
}
