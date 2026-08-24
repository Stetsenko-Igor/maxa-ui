import type { Metadata } from "next"
import { MaxaLogo } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Maxa Logo - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sizing", label: "Sizing" },
  { href: "#accessibility", label: "Accessibility" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "decorative", type: "boolean", default: "false", description: "Hides the SVG from assistive technology when nearby content already identifies MAXA." },
  { name: "width", type: "number | string", default: "120", description: "Rendered width. The official aspect ratio is preserved." },
  { name: "height", type: "number | string", default: undefined, description: "Optional explicit height. Omit it to derive height from the width." },
  { name: "aria-label", type: "string", default: "'MAXA'", description: "Accessible image name when the mark is meaningful." },
  { name: "className", type: "string", default: undefined, description: "Additional class applied to the SVG element." },
]

const tile: React.CSSProperties = {
  display: "flex",
  minHeight: "152px",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px",
  borderRadius: "var(--radius-md)",
}

const MAXA_LOGO_MARKDOWN = `# MaxaLogo

The official MAXA wordmark for product and documentation surfaces.

## Installation

\`\`\`tsx
import { MaxaLogo } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<MaxaLogo />
<MaxaLogo width={112} />
\`\`\`
`

export default function MaxaLogoPage() {
  return (
    <ComponentPage
      title="Maxa Logo"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/maxa-logo"
      markdown={MAXA_LOGO_MARKDOWN}
      previous={{ href: "/docs/components/input", label: "Input" }}
      next={{ href: "/docs/components/multi-select", label: "Multi Select" }}
      lead="The official MAXA wordmark with connected letterforms and fixed white artwork."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { MaxaLogo } from "@maxa/ui"\n\n<MaxaLogo />`}>
            <div style={{ ...tile, width: "100%", background: "var(--color-bg-inverse)" }}>
              <MaxaLogo />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { MaxaLogo } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<MaxaLogo />`}
        />
      </DocsSection>

      <DocsSection
        id="sizing"
        title="Sizing"
        description="Set the width and let the component preserve the official 1518:262 aspect ratio. The artwork remains white at every size."
      >
        <DocsExample title="80, 120, and 184 pixels wide">
          <ComponentPreview code={`<MaxaLogo width={80} />\n<MaxaLogo width={120} />\n<MaxaLogo width={184} />`}>
            <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "32px", padding: "32px", borderRadius: "var(--radius-md)", background: "var(--color-bg-inverse)" }}>
              <MaxaLogo width={80} decorative />
              <MaxaLogo width={120} decorative />
              <MaxaLogo width={184} decorative />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="accessibility"
        title="Accessibility"
        description="The standalone logo is an image named MAXA. Use a more specific aria-label when needed, or decorative when a wrapping link or nearby heading already provides the same name."
      >
        <ComponentPreview code={`<MaxaLogo aria-label="MAXA home" />\n<MaxaLogo decorative />`}>
          <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "32px", padding: "32px", borderRadius: "var(--radius-md)", background: "var(--color-bg-inverse)" }}>
            <MaxaLogo aria-label="MAXA home" />
            <MaxaLogo decorative />
          </div>
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
