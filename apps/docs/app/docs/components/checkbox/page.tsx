import type { Metadata } from "next"
import { Checkbox } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Checkbox - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#states", label: "States" },
  { href: "#sizes", label: "Sizes" },
  { href: "#with-label-and-helper", label: "With label and helper" },
  { href: "#api-reference", label: "API reference" },
]

const CHECKBOX_PROPS = [
  { name: "checked", type: "boolean | 'indeterminate'", default: undefined, description: "Controlled checked state." },
  { name: "defaultChecked", type: "boolean", default: "false", description: "Initial checked state for uncontrolled usage." },
  { name: "onCheckedChange", type: "(checked: boolean | 'indeterminate') => void", default: undefined, description: "Called when state changes." },
  { name: "size", type: "'sm' | 'md'", default: "'md'", description: "Controls the checkbox size." },
  { name: "error", type: "boolean", default: "false", description: "Error state. Red border." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox. Applies 50% opacity to the whole element." },
  { name: "label", type: "ReactNode", default: undefined, description: "Label text rendered beside the checkbox." },
  { name: "helperText", type: "string", default: undefined, description: "Helper or error text rendered below the label." },
]

const CHECKBOX_MARKDOWN = `# Checkbox

A binary or indeterminate selection control with optional label and helper text.

## Installation

\`\`\`tsx
import { Checkbox } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<Checkbox label="Accept terms and conditions" />
\`\`\`
`

const GITHUB_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/checkbox"

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "16px" }

export default function CheckboxPage() {
  return (
    <ComponentPage
      title="Checkbox"
      toc={TOC}
      githubHref={GITHUB_URL}
      markdown={CHECKBOX_MARKDOWN}
      previous={{ href: "/docs/components/icon-button", label: "IconButton" }}
      next={{ href: "/docs/components/radio", label: "Radio" }}
      lead={
        <>
          A binary selection control. Supports controlled and uncontrolled
          usage, an indeterminate state for partial selections, two sizes, error
          state, and optional label and helper text.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Checkbox } from "@maxa/ui"\n\n<Checkbox label="Accept terms and conditions" defaultChecked />`}>
            <Checkbox label="Accept terms and conditions" defaultChecked />
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
          imports={`import { Checkbox } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Checkbox label="Accept terms and conditions" />`}
        />
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description={
          <>
            The checkbox supports five distinct states. Use{" "}
            <code>checked="indeterminate"</code> when a parent represents a
            partially selected group.
          </>
        }
      >
        <DocsExample title="All states">
          <ComponentPreview code={`<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Indeterminate" checked="indeterminate" />
<Checkbox label="Disabled" disabled />
<Checkbox label="Error" error helperText="This field is required." />`}>
            <div style={stack}>
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked" defaultChecked />
              <Checkbox label="Indeterminate" checked="indeterminate" />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Error" error helperText="This field is required." />
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
          <ComponentPreview code={`<Checkbox label="Small" size="sm" />
<Checkbox label="Medium" size="md" />`}>
            <Checkbox label="Small" size="sm" />
            <Checkbox label="Medium" size="md" />
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="with-label-and-helper"
        title="With label and helper"
        description="Provide contextual guidance or validation feedback below the checkbox."
      >
        <ComponentPreview code={`<Checkbox
  label="Subscribe to newsletter"
  helperText="You can unsubscribe at any time."
/>`}>
          <Checkbox
            label="Subscribe to newsletter"
            helperText="You can unsubscribe at any time."
          />
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={CHECKBOX_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
