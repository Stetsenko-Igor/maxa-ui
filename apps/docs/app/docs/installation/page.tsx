import type { Metadata } from "next"
import { CodeBlock } from "../../_components/code-block"
import { DocsPageLayout, DocsPageSection } from "../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Installation — MAXA UI" }

const TOC = [
  { href: "#install-packages", label: "Install packages" },
  { href: "#import-stylesheet", label: "Import stylesheet" },
  { href: "#dark-mode", label: "Dark mode" },
  { href: "#use-a-component", label: "Use a component" },
  { href: "#verify-token-resolution", label: "Verify tokens" },
  { href: "#peer-dependencies", label: "Peer dependencies" },
  { href: "#next-steps", label: "Next steps" },
]

const pStyle: React.CSSProperties = {
  fontSize: "var(--text-md)",
  lineHeight: "24px",
  color: "var(--color-text-secondary)",
  margin: "0 0 16px",
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
    <DocsPageLayout
      eyebrow="Getting Started"
      title="Installation"
      toc={TOC}
      lead={
        <>
          Get MAXA UI running in your React project in five steps. The token
          layer is separate from components, so install both packages to get
          the full system.
        </>
      }
    >
      <DocsPageSection id="install-packages" title="Install packages">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>1</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Install packages</p>
            <p style={stepDescStyle}>
              Install <code style={inlineCodeStyle}>@maxa/ui</code> and{" "}
              <code style={inlineCodeStyle}>@maxa/tokens</code> from the
              registry. Tokens are a separate package so you can consume them
              independently of the React components.
            </p>
            <CodeBlock code={`npm install @maxa/ui @maxa/tokens
# or
pnpm add @maxa/ui @maxa/tokens
# or
yarn add @maxa/ui @maxa/tokens`} />
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection id="import-stylesheet" title="Import stylesheet">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>2</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Import the token stylesheet</p>
            <p style={stepDescStyle}>
              Add the token CSS to your app root. This loads primitive,
              semantic, and component tokens as CSS custom properties on{" "}
              <code style={inlineCodeStyle}>:root</code>.
            </p>
            <CodeBlock code={`// app/layout.tsx (Next.js App Router)
import "@maxa/tokens/theme.css"

// or in your global CSS entry
@import "@maxa/tokens/theme.css";`} />
            <p style={noteStyle}>
              <strong style={{ color: "var(--color-text-primary)" }}>Note:</strong>{" "}
              Import <code style={inlineCodeStyle}>theme.css</code> once at the
              top of your CSS cascade.
            </p>
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection id="dark-mode" title="Dark mode">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>3</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Set up dark mode</p>
            <p style={stepDescStyle}>
              Dark mode is driven entirely by a{" "}
              <code style={inlineCodeStyle}>data-theme="dark"</code> attribute
              on the <code style={inlineCodeStyle}>{"<html>"}</code> element.
            </p>
            <CodeBlock code={`// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  )
}

document.documentElement.setAttribute("data-theme", "dark")
document.documentElement.removeAttribute("data-theme")`} />
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection id="use-a-component" title="Use a component">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>4</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Import and use a component</p>
            <p style={stepDescStyle}>
              All components are exported from{" "}
              <code style={inlineCodeStyle}>@maxa/ui</code>. Styling is
              controlled via CSS variables.
            </p>
            <CodeBlock code={`import { Button } from "@maxa/ui"

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
}`} />
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection id="verify-token-resolution" title="Verify token resolution">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>5</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Verify token resolution</p>
            <p style={stepDescStyle}>
              Inspect any MAXA UI component in DevTools. Computed styles should
              show resolved CSS values, not bare <code style={inlineCodeStyle}>var(--...)</code> strings.
            </p>
            <CodeBlock code={`/* Expected in DevTools computed styles */
background-color: #1a1a1a;
color: #ffffff;
border-radius: 8px;

/* If you see this instead, theme.css is missing: */
background-color: var(--button-primary-bg);`} />
            <p style={noteStyle}>
              Run <code style={inlineCodeStyle}>node scripts/audit-tokens.mjs</code>{" "}
              from the repository root to validate token references before shipping.
            </p>
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection id="peer-dependencies" title="Peer dependencies">
        <p style={pStyle}>
          MAXA UI requires React 18 or 19 and does not bundle React itself.
          Radix UI primitives are direct dependencies and are installed
          automatically.
        </p>
        <CodeBlock code={`{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}`} />
      </DocsPageSection>

      <DocsPageSection id="next-steps" title="Next steps">
        <p style={pStyle}>
          Browse the <strong>Foundations</strong> section to understand the
          color, typography, and spacing token system. Then head to{" "}
          <strong>Components</strong> to see each component variant and size API.
        </p>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
