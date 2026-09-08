import type { Metadata } from "next"
import { CodeBlock } from "../../_components/code-block"
import { DocsPageLayout, DocsPageSection } from "../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Installation — MAXA UI" }

const TOC = [
  { href: "#install-packages", label: "Install packages" },
  { href: "#external-consumption", label: "External consumption" },
  { href: "#import-stylesheet", label: "Import stylesheet" },
  { href: "#custom-theme", label: "Custom theme and HTML" },
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
  background: "var(--color-bg-muted)",
  border: "1px solid var(--color-border-secondary)",
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
  background: "var(--color-bg-muted)",
  border: "1px solid var(--color-border-secondary)",
  borderRadius: "var(--radius-sm)",
  padding: "1px 5px",
  color: "var(--color-text-primary)",
}

const noteStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "var(--radius-md)",
  background: "var(--color-bg-muted)",
  border: "1px solid var(--color-border-secondary)",
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
          Tailwind is not required. Import the standard token CSS and use the React components. The
          host application controls its reset and font loading.
        </>
      }
    >
      <DocsPageSection id="install-packages" title="Install packages">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>1</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Install packages</p>
            <p style={stepDescStyle}>
              Inside this monorepo, depend on <code style={inlineCodeStyle}>@maxa/ui</code> and{" "}
              <code style={inlineCodeStyle}>@maxa/tokens</code> with the workspace protocol. Tokens
              are a separate package so apps can consume them independently of the React components.
            </p>
            <CodeBlock
              code={`{
  "dependencies": {
    "@maxa/ui": "workspace:^",
    "@maxa/tokens": "workspace:^"
  }
}`}
            />
            <p style={noteStyle}>
              <strong style={{ color: "var(--color-text-primary)" }}>Note:</strong> MAXA UI is
              available from source. The packages are not published to any registry yet.
            </p>
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection id="external-consumption" title="External consumption">
        <p style={pStyle}>
          For external projects, clone and build the repository, then pack UI and its workspace
          dependencies. Packed manifests rewrite workspace ranges; direct source-directory links are
          not the verified installation route. Packages remain unpublished.
        </p>
        <CodeBlock
          code={`git clone https://github.com/Stetsenko-Igor/maxa-ui.git
cd maxa-ui
pnpm install
pnpm build
mkdir -p /absolute/path/to/consumer/vendor/maxa
pnpm --filter '@maxa/ui...' -r exec pnpm pack --pack-destination /absolute/path/to/consumer/vendor/maxa`}
        />
        <p style={pStyle}>
          In the consuming app, depend on the UI and token tarballs and set pnpm overrides for all
          four packages (UI, tokens, icons, hooks) to their local tarballs. Follow the{" "}
          <a href="https://github.com/Stetsenko-Igor/maxa-ui#in-an-external-project">
            complete package.json recipe
          </a>
          . Adjust paths and versions to the pack output, then run{" "}
          <code style={inlineCodeStyle}>pnpm install</code>. The app supplies React and React DOM
          17–19. Overrides prevent transitive dependencies from resolving against unpublished
          registry packages.
        </p>
      </DocsPageSection>

      <DocsPageSection id="import-stylesheet" title="Import stylesheet">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>2</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Import the token stylesheet</p>
            <p style={stepDescStyle}>
              For a new client, add the namespaced MAXA theme to your app root. This standard CSS
              needs no Tailwind processing and loads primitive, semantic, and component tokens as
              CSS custom properties on <code style={inlineCodeStyle}>:root</code>.
            </p>
            <CodeBlock
              code={`// app/layout.tsx (Next.js App Router)
import "@maxa/tokens/namespaced/theme.css"

// or in your global CSS entry
@import "@maxa/tokens/namespaced/theme.css";`}
            />
            <p style={noteStyle}>
              <strong style={{ color: "var(--color-text-primary)" }}>Note:</strong> Import{" "}
              <code style={inlineCodeStyle}>theme.css</code> once at the app root. It includes no
              global reset or font files. Load the selected fonts and configure your host reset
              explicitly.
            </p>
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection id="custom-theme" title="Custom theme and HTML">
        <p style={pStyle}>
          The namespaced full theme combines reusable non-brand palettes and component aliases with
          a complete MAXA profile. To replace the profile, supply a complete reviewed theme:
        </p>
        <CodeBlock
          code={`@import "@maxa/tokens/namespaced/core.css";
@import "./client-theme.css";`}
        />
        <p style={pStyle}>
          The MAXA profile is exported as{" "}
          <code style={inlineCodeStyle}>@maxa/tokens/namespaced/themes/maxa.css</code>. It owns
          semantic mappings, brand teal, blue primary actions, typography, geometry, motion,
          shadows, and component-specific decisions. Primary actions can be overridden independently
          of brand roles. A palette swap alone is not a complete rebrand; review action states,
          foregrounds, focus, and both color modes with the other theme decisions.
        </p>
        <p style={pStyle}>
          Owned variables use <code style={inlineCodeStyle}>--maxa-*</code>, such as{" "}
          <code style={inlineCodeStyle}>--maxa-color-action-primary</code>. The namespace identifies
          the library, not a client brand. Matching React helpers and local CSS variables are
          generated together; vendor Radix variables are preserved. No generic aliases are injected.
          No real Concept3D palette or scaffold is included yet.
        </p>
        <p style={pStyle}>
          HTML or Rails ERB consumers pair the namespaced token theme with{" "}
          <code style={inlineCodeStyle}>@maxa/ui/namespaced/styles.css</code> through the host asset
          pipeline. CSS supplies styles and component-local border-box sizing; the host implements
          behavior, keyboard handling, focus management, and accessibility, and loads fonts.
        </p>
        <p style={noteStyle}>
          Use only one UI delivery variant per document: generic and namespaced styles share
          component classes. Existing generic exports and Figma remain compatible; legacy
          <code style={inlineCodeStyle}> core.css</code> still contains MAXA defaults and is not
          neutral. Whole-document themes remain the supported scope. Nested themes, React 16, and a
          Tailwind adapter are not added. Namespacing does not isolate arbitrary global host CSS.
        </p>
      </DocsPageSection>

      <DocsPageSection id="dark-mode" title="Dark mode">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>3</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Set up dark mode</p>
            <p style={stepDescStyle}>
              Dark mode is driven entirely by a{" "}
              <code style={inlineCodeStyle}>data-maxa-theme="dark"</code> attribute on the{" "}
              <code style={inlineCodeStyle}>{"<html>"}</code> element.
            </p>
            <CodeBlock
              code={`// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-maxa-theme="dark">
      <body>{children}</body>
    </html>
  )
}

document.documentElement.setAttribute("data-maxa-theme", "dark")
document.documentElement.removeAttribute("data-maxa-theme")`}
            />
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection id="use-a-component" title="Use a component">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>4</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Import and use a component</p>
            <p style={stepDescStyle}>
              Use matching components from <code style={inlineCodeStyle}>@maxa/ui/namespaced</code>.
              Styling is controlled via CSS variables.
            </p>
            <CodeBlock
              code={`import { Button } from "@maxa/ui/namespaced"

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
      </DocsPageSection>

      <DocsPageSection id="verify-token-resolution" title="Verify token resolution">
        <div style={stepStyle}>
          <div style={stepNumberStyle}>5</div>
          <div style={stepBodyStyle}>
            <p style={stepTitleStyle}>Verify token resolution</p>
            <p style={stepDescStyle}>
              Inspect any MAXA UI component in DevTools. Computed styles should show resolved CSS
              values, not bare <code style={inlineCodeStyle}>var(--...)</code> strings.
            </p>
            <CodeBlock
              code={`/* Expected in DevTools computed styles */
background-color: #1a1a1a;
color: #ffffff;
border-radius: 8px;

/* If you see this instead, theme.css is missing: */
background-color: var(--maxa-button-primary-bg);`}
            />
            <p style={noteStyle}>
              Run <code style={inlineCodeStyle}>node scripts/audit-tokens.mjs</code> from the
              repository root to validate token references before shipping.
            </p>
          </div>
        </div>
      </DocsPageSection>

      <DocsPageSection id="peer-dependencies" title="Peer dependencies">
        <p style={pStyle}>
          MAXA UI supports React 17, 18, and 19 and does not bundle React itself. The component
          package depends directly on <code style={inlineCodeStyle}>@maxa/tokens</code>; the
          consuming app still explicitly loads token CSS once. React 16 is unsupported. Radix UI
          primitives and <code style={inlineCodeStyle}>@maxa/icons</code> are direct dependencies of{" "}
          <code style={inlineCodeStyle}>@maxa/ui</code> and are installed automatically.
        </p>
        <CodeBlock
          code={`{
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
    "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
  }
}`}
        />
      </DocsPageSection>

      <DocsPageSection id="next-steps" title="Next steps">
        <p style={pStyle}>
          Browse the <strong>Foundations</strong> section to understand the color, typography, and
          spacing token system. Then head to <strong>Components</strong> to see each component
          variant and size API.
        </p>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
