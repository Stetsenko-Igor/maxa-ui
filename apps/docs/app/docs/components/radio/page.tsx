import type { Metadata } from "next"
import { Radio } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Radio - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#states", label: "States" },
  { href: "#group", label: "Group" },
  { href: "#with-label", label: "With label" },
  { href: "#api-reference", label: "API reference" },
]

const RADIO_PROPS = [
  { name: "checked", type: "boolean", default: undefined, description: "Controlled checked state." },
  { name: "defaultChecked", type: "boolean", default: undefined, description: "Initial checked state for uncontrolled usage." },
  { name: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", default: undefined, description: "Native change event handler." },
  { name: "label", type: "ReactNode", default: undefined, description: "Optional label rendered above the radio row." },
  { name: "sideLabel", type: "ReactNode", default: undefined, description: "Optional label rendered to the right of the radio." },
  { name: "children", type: "ReactNode", default: undefined, description: "Alternative side label content." },
  { name: "description", type: "ReactNode", default: undefined, description: "Optional helper text rendered below the side label." },
  { name: "helperText", type: "ReactNode", default: undefined, description: "Alias for description." },
  { name: "containerClassName", type: "string", default: undefined, description: "Class name for the outer label wrapper." },
  { name: "error", type: "boolean", default: "false", description: "Error state. Red border and error-colored description." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the radio and applies Figma disabled colors." },
  { name: "name", type: "string", default: undefined, description: "Groups radios for mutual exclusion." },
  { name: "value", type: "string", default: undefined, description: "The value submitted with the form." },
]

const RADIO_MARKDOWN = `# Radio

A single-select control for choosing one option from a group.

## Installation

\`\`\`tsx
import { Radio } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<Radio name="plan" value="free" sideLabel="Free" />
<Radio name="plan" value="pro" sideLabel="Pro" defaultChecked />
<Radio name="plan" value="enterprise" sideLabel="Enterprise" />
\`\`\`
`

const GITHUB_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/radio"

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "16px" }

export default function RadioPage() {
  return (
    <ComponentPage
      title="Radio"
      toc={TOC}
      githubHref={GITHUB_URL}
      markdown={RADIO_MARKDOWN}
      previous={{ href: "/docs/components/checkbox", label: "Checkbox" }}
      next={{ href: "/docs/components/input", label: "Input" }}
      lead={
        <>
          A native radio input with optional label and helper text. Group
          multiple radios with a shared <code>name</code> attribute to enforce
          mutual exclusion in the browser. Radio has one visual size: md.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Radio } from "@maxa/ui"\n\n<Radio\n  name="plan"\n  value="pro"\n  label="Plan"\n  sideLabel="Pro"\n  description="Best for growing teams."\n  defaultChecked\n/>`}>
            <div style={stack}>
              <Radio
                name="plan-preview"
                value="pro"
                label="Plan"
                sideLabel="Pro"
                description="Best for growing teams."
                defaultChecked
              />
              <Radio
                name="plan-preview"
                value="enterprise"
                label="Plan"
                sideLabel="Enterprise"
                description="Advanced controls and support."
              />
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
          imports={`import { Radio } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Radio
  name="plan"
  value="pro"
  label="Plan"
  sideLabel="Pro"
  description="Best for growing teams."
/>`}
        />
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="Radio supports unchecked, checked, disabled, focused, and error states using the Figma anatomy."
      >
        <DocsExample title="All states">
          <ComponentPreview code={`<Radio name="states" value="default" sideLabel="Default" />
<Radio name="states" value="checked" sideLabel="Checked" defaultChecked />
<Radio name="states-disabled" value="disabled" sideLabel="Disabled" disabled />
<Radio name="states-error" value="error" sideLabel="Error" error description="Please select an option." />`}>
            <div style={stack}>
              <Radio name="states-demo" value="default" sideLabel="Default" />
              <Radio name="states-demo" value="checked" sideLabel="Checked" defaultChecked />
              <Radio name="states-disabled" value="disabled" sideLabel="Disabled" disabled />
              <Radio name="states-error" value="error" sideLabel="Error" error description="Please select an option." />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="group"
        title="Group"
        description={
          <>
            Share the same <code>name</code> across radios. The browser enforces
            that only one can be selected at a time.
          </>
        }
      >
        <DocsExample title="Mutual exclusion via name">
          <ComponentPreview code={`<Radio name="tier" value="starter" sideLabel="Starter" />
<Radio name="tier" value="growth" sideLabel="Growth" defaultChecked />
<Radio name="tier" value="enterprise" sideLabel="Enterprise" />`}>
            <div style={stack}>
              <Radio name="tier-demo" value="starter" sideLabel="Starter" />
              <Radio name="tier-demo" value="growth" sideLabel="Growth" defaultChecked />
              <Radio name="tier-demo" value="enterprise" sideLabel="Enterprise" />
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
          <ComponentPreview code={`<Radio name="display" value="compact" label="Display" description="Use a denser layout.">Compact mode</Radio>`}>
            <Radio name="display-demo" value="compact" label="Display" description="Use a denser layout.">
              Compact mode
            </Radio>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={RADIO_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
