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
  { href: "#sizes", label: "Sizes" },
  { href: "#api-reference", label: "API reference" },
]

const RADIO_PROPS = [
  { name: "checked", type: "boolean", default: undefined, description: "Controlled checked state." },
  { name: "defaultChecked", type: "boolean", default: undefined, description: "Initial checked state for uncontrolled usage." },
  { name: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", default: undefined, description: "Native change event handler." },
  { name: "size", type: "'sm' | 'md'", default: "'md'", description: "Controls the radio size." },
  { name: "error", type: "boolean", default: "false", description: "Error state. Red border." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the radio. Applies 50% opacity to the whole element." },
  { name: "label", type: "ReactNode", default: undefined, description: "Label text rendered beside the radio." },
  { name: "helperText", type: "string", default: undefined, description: "Helper or error text rendered below the label." },
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
<Radio name="plan" value="free" label="Free" />
<Radio name="plan" value="pro" label="Pro" />
<Radio name="plan" value="enterprise" label="Enterprise" />
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
          mutual exclusion in the browser.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Radio } from "@maxa/ui"\n\n<Radio name="plan" value="free" label="Free" />\n<Radio name="plan" value="pro" label="Pro" defaultChecked />\n<Radio name="plan" value="enterprise" label="Enterprise" />`}>
            <div style={stack}>
              <Radio name="plan-preview" value="free" label="Free" />
              <Radio name="plan-preview" value="pro" label="Pro" defaultChecked />
              <Radio name="plan-preview" value="enterprise" label="Enterprise" />
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
          usage={`<Radio name="plan" value="free" label="Free" />`}
        />
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="Radio supports default, checked, disabled, and error states."
      >
        <DocsExample title="All states">
          <ComponentPreview code={`<Radio name="states" value="default" label="Default" />
<Radio name="states" value="checked" label="Checked" defaultChecked />
<Radio name="states" value="disabled" label="Disabled" disabled />
<Radio name="states" value="error" label="Error" error helperText="Please select an option." />`}>
            <div style={stack}>
              <Radio name="states-demo" value="default" label="Default" />
              <Radio name="states-demo" value="checked" label="Checked" defaultChecked />
              <Radio name="states-disabled" value="disabled" label="Disabled" disabled />
              <Radio name="states-error" value="error" label="Error" error helperText="Please select an option." />
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
          <ComponentPreview code={`<Radio name="tier" value="starter" label="Starter" />
<Radio name="tier" value="growth" label="Growth" defaultChecked />
<Radio name="tier" value="enterprise" label="Enterprise" />`}>
            <div style={stack}>
              <Radio name="tier-demo" value="starter" label="Starter" />
              <Radio name="tier-demo" value="growth" label="Growth" defaultChecked />
              <Radio name="tier-demo" value="enterprise" label="Enterprise" />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="sizes"
        title="Sizes"
        description={
          <>
            Two sizes: <code>sm</code> and <code>md</code> (default).
          </>
        }
      >
        <DocsExample title="sm and md">
          <ComponentPreview code={`<Radio name="size-sm" value="sm" label="Small" size="sm" />
<Radio name="size-md" value="md" label="Medium" size="md" />`}>
            <Radio name="size-sm-demo" value="sm" label="Small" size="sm" />
            <Radio name="size-md-demo" value="md" label="Medium" size="md" />
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={RADIO_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
