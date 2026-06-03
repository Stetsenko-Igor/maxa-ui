import type { Metadata } from "next"
import { Toggle } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Toggle - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#states", label: "States" },
  { href: "#error", label: "Error" },
  { href: "#with-label", label: "With label" },
  { href: "#api-reference", label: "API reference" },
]

const TOGGLE_PROPS = [
  { name: "checked", type: "boolean", default: undefined, description: "Controlled on/off state. Pair with onCheckedChange." },
  { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state for an uncontrolled toggle." },
  { name: "onCheckedChange", type: "(checked: boolean) => void", default: undefined, description: "Called when the toggle changes." },
  { name: "error", type: "boolean", default: "false", description: "Renders an error outline and sets aria-invalid." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and dims the toggle to 50% opacity." },
  { name: "aria-label", type: "string", default: undefined, description: "Accessible name. Required when there is no associated <label>." },
]

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }
const labelRow: React.CSSProperties = { display: "flex", alignItems: "center", gap: "8px" }

export default function TogglePage() {
  return (
    <ComponentPage
      title="Toggle"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/toggle"
      markdown=""
      previous={{ href: "/docs/components/select", label: "Select" }}
      next={{ href: "/docs/components/tag", label: "Tag" }}
      lead={
        <>
          A binary on/off control for immediate, self-contained state changes.
          Built on Radix for full keyboard and screen-reader support. Toggle has one visual size: md.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Toggle } from "@maxa/ui"\n\n<Toggle aria-label="Enable notifications" defaultChecked />`}>
            <div style={row}>
              <Toggle aria-label="Off example" />
              <Toggle aria-label="On example" defaultChecked />
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
          imports={`import { Toggle } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Toggle aria-label="Enable notifications" defaultChecked />`}
        />
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="Off, on, and disabled. Disabled dims the toggle to 50% opacity and blocks interaction."
      >
        <DocsExample title="Off, on, disabled">
          <ComponentPreview code={`<Toggle aria-label="Off" />\n<Toggle aria-label="On" defaultChecked />\n<Toggle aria-label="Disabled off" disabled />\n<Toggle aria-label="Disabled on" disabled defaultChecked />`}>
            <div style={row}>
              <Toggle aria-label="Off" />
              <Toggle aria-label="On" defaultChecked />
              <Toggle aria-label="Disabled off" disabled />
              <Toggle aria-label="Disabled on" disabled defaultChecked />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="error"
        title="Error"
        description="Set error to render an error-colored outline and aria-invalid. Use for validation failures on an immediate setting."
      >
        <DocsExample title="Error outline">
          <ComponentPreview code={`<Toggle aria-label="Invalid setting" error />\n<Toggle aria-label="Invalid setting on" error defaultChecked />`}>
            <div style={row}>
              <Toggle aria-label="Invalid setting" error />
              <Toggle aria-label="Invalid setting on" error defaultChecked />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="with-label"
        title="With label"
        description="The Toggle has no built-in label. Associate a <label> via htmlFor/id, or pass aria-label."
      >
        <DocsExample title="Labeled toggle">
          <ComponentPreview code={`<label htmlFor="notifications">Email notifications</label>\n<Toggle id="notifications" defaultChecked />`}>
            <div style={labelRow}>
              <Toggle id="notifications" defaultChecked />
              <label htmlFor="notifications">Email notifications</label>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={TOGGLE_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
