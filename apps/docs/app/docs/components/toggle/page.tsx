import type { Metadata } from "next"
import { Toggle } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { ToggleDefaultPreview } from "./toggle-default-preview"

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
  { name: "label", type: "ReactNode", default: undefined, description: "Optional label rendered above the toggle row." },
  { name: "sideLabel", type: "ReactNode", default: undefined, description: "Optional label rendered to the right of the toggle." },
  { name: "children", type: "ReactNode", default: undefined, description: "Alternative side label content." },
  { name: "description", type: "ReactNode", default: undefined, description: "Optional helper text rendered below the side label." },
  { name: "containerClassName", type: "string", default: undefined, description: "Class name for the label/content wrapper." },
  { name: "error", type: "boolean", default: "false", description: "Renders an error outline and sets aria-invalid." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and applies the Figma disabled colors." },
  { name: "aria-label", type: "string", default: undefined, description: "Accessible name. Use when the toggle has no visible label." },
]

const stack: React.CSSProperties = { display: "grid", gap: "16px", alignItems: "start" }

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
          Built on Radix with built-in top label, side label, and helper text. Toggle has one visual size: md.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ToggleDefaultPreview />
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
          usage={`<Toggle
  label="Notifications"
  sideLabel="Email updates"
  description="Optional notices."
  defaultChecked
/>`}
        />
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="Off, on, and disabled states use the same labeled anatomy as the Figma component."
      >
        <DocsExample title="Off, on, disabled">
          <ComponentPreview code={`<Toggle sideLabel="Auto-save" />\n<Toggle sideLabel="Push alerts" defaultChecked />\n<Toggle sideLabel="Locked setting" description="Managed by your organization." disabled />\n<Toggle sideLabel="Required setting" disabled defaultChecked />`}>
            <div style={stack}>
              <Toggle sideLabel="Auto-save" />
              <Toggle sideLabel="Push alerts" defaultChecked />
              <Toggle sideLabel="Locked setting" description="Managed by your organization." disabled />
              <Toggle sideLabel="Required setting" disabled defaultChecked />
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
          <ComponentPreview code={`<Toggle label="Security" sideLabel="Public sharing" description="Review this setting before enabling." error />\n<Toggle sideLabel="External access" error defaultChecked />`}>
            <div style={stack}>
              <Toggle
                label="Security"
                sideLabel="Public sharing"
                description="Review this setting before enabling."
                error
              />
              <Toggle sideLabel="External access" error defaultChecked />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="with-label"
        title="With label"
        description="Use label for the top label, sideLabel or children for the right-side label, and description for additional helper text."
      >
        <DocsExample title="Label anatomy">
          <ComponentPreview code={`<Toggle label="Workspace" sideLabel="Weekly summary" description="Send activity highlights every Friday." defaultChecked />\n<Toggle label="Display">Compact mode</Toggle>`}>
            <div style={stack}>
              <Toggle
                label="Workspace"
                sideLabel="Weekly summary"
                description="Send activity highlights every Friday."
                defaultChecked
              />
              <Toggle label="Display">Compact mode</Toggle>
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
