import type { Metadata } from "next"
import { Badge } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Badge - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#intent", label: "Intent" },
  { href: "#emphasis", label: "Emphasis" },
  { href: "#sizes", label: "Sizes" },
  { href: "#with-icon", label: "With icon" },
  { href: "#color-palette", label: "Color palette" },
  { href: "#api-reference", label: "API reference" },
]

const BADGE_PROPS = [
  { name: "intent", type: "'neutral' | 'info' | 'success' | 'warning' | 'error'", default: "'neutral'", description: "Semantic intent. Maps to the status color scale." },
  { name: "emphasis", type: "'low' | 'medium' | 'high'", default: "'low'", description: "Visual weight. Low = subtle bg; medium = muted bg; high = solid bg + inverse text." },
  { name: "size", type: "'sm' | 'md'", default: "'md'", description: "Height 20px (sm) or 24px (md)." },
  { name: "icon", type: "ReactNode", default: undefined, description: "Leading icon. Rendered aria-hidden." },
  { name: "trailingIcon", type: "ReactNode", default: undefined, description: "Trailing icon. Rendered aria-hidden." },
  { name: "appearance", type: "'grey' | 'blue' | 'green' | 'red' | 'orange' | 'raspberry' | 'magenta' | 'purple' | 'grape' | 'violet' | 'cyan' | 'teal' | 'aquamarine' | 'emerald'", default: undefined, description: "Decorative user-chosen color. Overrides intent coloring. Use with emphasis='low' (default) or emphasis='high'." },
  { name: "asChild", type: "boolean", default: "false", description: "Merge props onto a custom child element via Radix Slot." },
]

const GITHUB_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/badge"

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }
const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "12px" }

export default function BadgePage() {
  return (
    <ComponentPage
      title="Badge"
      toc={TOC}
      githubHref={GITHUB_URL}
      markdown=""
      previous={{ href: "/docs/components", label: "Overview" }}
      next={{ href: "/docs/components/button", label: "Button" }}
      lead={
        <>
          A compact, non-interactive indicator for status, count, or metadata.
          Supports five intents, three emphasis levels, and two sizes.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Badge } from "@maxa/ui"\n\n<Badge intent="success" emphasis="low">Active</Badge>`}>
            <div style={row}>
              <Badge intent="neutral">Draft</Badge>
              <Badge intent="info">In review</Badge>
              <Badge intent="success">Active</Badge>
              <Badge intent="warning">Pending</Badge>
              <Badge intent="error">Failed</Badge>
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
          imports={`import { Badge } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Badge intent="success">Active</Badge>`}
        />
      </DocsSection>

      <DocsSection
        id="intent"
        title="Intent"
        description="Use intent to convey status meaning. Neutral is the default for metadata without semantic weight."
      >
        <DocsExample title="All intents (low emphasis)">
          <ComponentPreview code={`<Badge intent="neutral">Neutral</Badge>
<Badge intent="info">Info</Badge>
<Badge intent="success">Success</Badge>
<Badge intent="warning">Warning</Badge>
<Badge intent="error">Error</Badge>`}>
            <div style={row}>
              <Badge intent="neutral">Neutral</Badge>
              <Badge intent="info">Info</Badge>
              <Badge intent="success">Success</Badge>
              <Badge intent="warning">Warning</Badge>
              <Badge intent="error">Error</Badge>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="emphasis"
        title="Emphasis"
        description="Three levels of visual weight. Low is subtle; medium is muted; high is solid with inverse text."
      >
        <DocsExample title="Emphasis × intent matrix">
          <ComponentPreview code={`{/* low */}
<Badge intent="success" emphasis="low">Active</Badge>
{/* medium */}
<Badge intent="success" emphasis="medium">Active</Badge>
{/* high */}
<Badge intent="success" emphasis="high">Active</Badge>`}>
            <div style={col}>
              <div style={row}>
                <Badge intent="neutral" emphasis="low">Neutral</Badge>
                <Badge intent="info" emphasis="low">Info</Badge>
                <Badge intent="success" emphasis="low">Success</Badge>
                <Badge intent="warning" emphasis="low">Warning</Badge>
                <Badge intent="error" emphasis="low">Error</Badge>
              </div>
              <div style={row}>
                <Badge intent="neutral" emphasis="medium">Neutral</Badge>
                <Badge intent="info" emphasis="medium">Info</Badge>
                <Badge intent="success" emphasis="medium">Success</Badge>
                <Badge intent="warning" emphasis="medium">Warning</Badge>
                <Badge intent="error" emphasis="medium">Error</Badge>
              </div>
              <div style={row}>
                <Badge intent="neutral" emphasis="high">Neutral</Badge>
                <Badge intent="info" emphasis="high">Info</Badge>
                <Badge intent="success" emphasis="high">Success</Badge>
                <Badge intent="warning" emphasis="high">Warning</Badge>
                <Badge intent="error" emphasis="high">Error</Badge>
              </div>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="sizes"
        title="Sizes"
        description={<>Two sizes: <code>sm</code> (20px) and <code>md</code> (24px, default).</>}
      >
        <DocsExample title="sm and md">
          <ComponentPreview code={`<Badge size="sm" intent="success">Active</Badge>
<Badge size="md" intent="success">Active</Badge>`}>
            <div style={row}>
              <Badge size="sm" intent="success">Active</Badge>
              <Badge size="md" intent="success">Active</Badge>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="with-icon"
        title="With icon"
        description="Use icon (leading) or trailingIcon for visual reinforcement. Icons are decorative — always include a text label."
      >
        <DocsExample title="Leading dot icon">
          <ComponentPreview code={`<Badge intent="success" icon={<span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />}>
  Active
</Badge>`}>
            <div style={row}>
              {(["neutral", "info", "success", "warning", "error"] as const).map(intent => (
                <Badge
                  key={intent}
                  intent={intent}
                  icon={
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "currentColor",
                        display: "inline-block",
                      }}
                    />
                  }
                >
                  {intent.charAt(0).toUpperCase() + intent.slice(1)}
                </Badge>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="color-palette"
        title="Color palette"
        description="14 decorative colors for user-defined labels (e.g. mail list names). Use appearance instead of intent when the color is chosen by the user, not derived from semantic status. Supports low (subtle) and high (solid) emphasis."
      >
        <DocsExample title="Low emphasis (default)">
          <ComponentPreview code={`<Badge appearance="grey">Grey</Badge>
<Badge appearance="blue">Blue</Badge>
<Badge appearance="green">Green</Badge>
<Badge appearance="raspberry">Raspberry</Badge>
<Badge appearance="magenta">Magenta</Badge>
<Badge appearance="purple">Purple</Badge>
<Badge appearance="grape">Grape</Badge>
<Badge appearance="violet">Violet</Badge>
<Badge appearance="cyan">Cyan</Badge>
<Badge appearance="teal">Teal</Badge>
<Badge appearance="aquamarine">Aquamarine</Badge>
<Badge appearance="emerald">Emerald</Badge>
<Badge appearance="red">Red</Badge>
<Badge appearance="orange">Orange</Badge>`}>
            <div style={row}>
              {(["grey","blue","green","red","orange","raspberry","magenta","purple","grape","violet","cyan","teal","aquamarine","emerald"] as const).map(a => (
                <Badge key={a} appearance={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</Badge>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
        <DocsExample title="High emphasis (solid)">
          <ComponentPreview code={`<Badge appearance="violet" emphasis="high">Violet</Badge>
<Badge appearance="raspberry" emphasis="high">Raspberry</Badge>`}>
            <div style={row}>
              {(["grey","blue","green","red","orange","raspberry","magenta","purple","grape","violet","cyan","teal","aquamarine","emerald"] as const).map(a => (
                <Badge key={a} appearance={a} emphasis="high">{a.charAt(0).toUpperCase() + a.slice(1)}</Badge>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={BADGE_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
