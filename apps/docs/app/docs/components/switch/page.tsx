import type { Metadata } from "next"
import { Switch } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Switch - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sizes", label: "Sizes" },
  { href: "#states", label: "States" },
  { href: "#error", label: "Error" },
  { href: "#with-label", label: "With label" },
  { href: "#api-reference", label: "API reference" },
]

const SWITCH_PROPS = [
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Track size. sm = 28×16px, md = 36×20px, lg = 44×24px." },
  { name: "checked", type: "boolean", default: undefined, description: "Controlled on/off state. Pair with onCheckedChange." },
  { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state for an uncontrolled switch." },
  { name: "onCheckedChange", type: "(checked: boolean) => void", default: undefined, description: "Called when the switch is toggled." },
  { name: "error", type: "boolean", default: "false", description: "Renders an error outline and sets aria-invalid." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and dims the switch to 50% opacity." },
  { name: "aria-label", type: "string", default: undefined, description: "Accessible name. Required when there is no associated <label>." },
]

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }
const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "12px" }
const labelRow: React.CSSProperties = { display: "flex", alignItems: "center", gap: "8px" }

export default function SwitchPage() {
  return (
    <ComponentPage
      title="Switch"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/switch"
      markdown=""
      previous={{ href: "/docs/components/select", label: "Select" }}
      next={{ href: "/docs/components/tag", label: "Tag" }}
      lead={
        <>
          A binary on/off toggle for immediate, self-contained state changes.
          Built on Radix for full keyboard and screen-reader support, with three sizes
          and an error state.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Switch } from "@maxa/ui"\n\n<Switch aria-label="Enable notifications" defaultChecked />`}>
            <div style={row}>
              <Switch aria-label="Off example" />
              <Switch aria-label="On example" defaultChecked />
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
          imports={`import { Switch } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Switch aria-label="Enable notifications" defaultChecked />`}
        />
      </DocsSection>

      <DocsSection
        id="sizes"
        title="Sizes"
        description={<>Three sizes: <code>sm</code> (28×16px), <code>md</code> (36×20px, default), <code>lg</code> (44×24px).</>}
      >
        <DocsExample title="sm, md, lg">
          <ComponentPreview code={`<Switch size="sm" aria-label="Small" />\n<Switch size="md" aria-label="Medium" />\n<Switch size="lg" aria-label="Large" />`}>
            <div style={col}>
              <div style={row}>
                <Switch size="sm" aria-label="Small off" />
                <Switch size="md" aria-label="Medium off" />
                <Switch size="lg" aria-label="Large off" />
              </div>
              <div style={row}>
                <Switch size="sm" aria-label="Small on" defaultChecked />
                <Switch size="md" aria-label="Medium on" defaultChecked />
                <Switch size="lg" aria-label="Large on" defaultChecked />
              </div>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="Off, on, and disabled. Disabled dims the switch to 50% opacity and blocks interaction."
      >
        <DocsExample title="Off, on, disabled">
          <ComponentPreview code={`<Switch aria-label="Off" />\n<Switch aria-label="On" defaultChecked />\n<Switch aria-label="Disabled off" disabled />\n<Switch aria-label="Disabled on" disabled defaultChecked />`}>
            <div style={row}>
              <Switch aria-label="Off" />
              <Switch aria-label="On" defaultChecked />
              <Switch aria-label="Disabled off" disabled />
              <Switch aria-label="Disabled on" disabled defaultChecked />
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
          <ComponentPreview code={`<Switch aria-label="Invalid setting" error />\n<Switch aria-label="Invalid setting on" error defaultChecked />`}>
            <div style={row}>
              <Switch aria-label="Invalid setting" error />
              <Switch aria-label="Invalid setting on" error defaultChecked />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="with-label"
        title="With label"
        description="The Switch has no built-in label. Associate a <label> via htmlFor/id, or pass aria-label."
      >
        <DocsExample title="Labeled switch">
          <ComponentPreview code={`<label htmlFor="notifications">Email notifications</label>\n<Switch id="notifications" defaultChecked />`}>
            <div style={labelRow}>
              <Switch id="notifications" defaultChecked />
              <label htmlFor="notifications">Email notifications</label>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={SWITCH_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
