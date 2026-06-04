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
  { href: "#with-label-and-helper", label: "With label and helper" },
  { href: "#api-reference", label: "API reference" },
]

const CHECKBOX_PROPS = [
  { name: "checked", type: "boolean | 'indeterminate'", default: undefined, description: "Controlled checked state." },
  { name: "defaultChecked", type: "boolean", default: "false", description: "Initial checked state for uncontrolled usage." },
  { name: "onCheckedChange", type: "(checked: boolean | 'indeterminate') => void", default: undefined, description: "Called when state changes." },
  { name: "label", type: "ReactNode", default: undefined, description: "Optional label rendered above the checkbox row." },
  { name: "sideLabel", type: "ReactNode", default: undefined, description: "Optional label rendered to the right of the checkbox." },
  { name: "children", type: "ReactNode", default: undefined, description: "Alternative side label content." },
  { name: "description", type: "ReactNode", default: undefined, description: "Optional helper text rendered below the side label." },
  { name: "helperText", type: "ReactNode", default: undefined, description: "Alias for description." },
  { name: "containerClassName", type: "string", default: undefined, description: "Class name for the outer label wrapper." },
  { name: "error", type: "boolean", default: "false", description: "Error state. Red border and error-colored description." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox and applies Figma disabled colors." },
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
<Checkbox sideLabel="Accept terms and conditions" />
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
          usage, an indeterminate state for partial selections, error state,
          and optional top label, side label, and helper text. Checkbox has one visual size: md.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Checkbox } from "@maxa/ui"\n\n<Checkbox\n  label="Permissions"\n  sideLabel="Accept terms"\n  description="Required to continue."\n  defaultChecked\n/>`}>
            <Checkbox
              label="Permissions"
              sideLabel="Accept terms"
              description="Required to continue."
              defaultChecked
            />
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
          usage={`<Checkbox
  label="Permissions"
  sideLabel="Accept terms"
  description="Required to continue."
/>`}
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
          <ComponentPreview code={`<Checkbox sideLabel="Unchecked" />
<Checkbox sideLabel="Checked" defaultChecked />
<Checkbox sideLabel="Indeterminate" checked="indeterminate" />
<Checkbox sideLabel="Disabled" disabled />
<Checkbox sideLabel="Error" error description="This field is required." />`}>
            <div style={stack}>
              <Checkbox sideLabel="Unchecked" />
              <Checkbox sideLabel="Checked" defaultChecked />
              <Checkbox sideLabel="Indeterminate" checked="indeterminate" />
              <Checkbox sideLabel="Disabled" disabled />
              <Checkbox sideLabel="Error" error description="This field is required." />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="with-label-and-helper"
        title="With label and helper"
        description="Use label for the top label, sideLabel or children for the right-side label, and description for additional helper text."
      >
        <ComponentPreview code={`<Checkbox
  label="Workspace"
  sideLabel="Subscribe to newsletter"
  description="You can unsubscribe at any time."
/>`}>
          <Checkbox
            label="Workspace"
            sideLabel="Subscribe to newsletter"
            description="You can unsubscribe at any time."
          />
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={CHECKBOX_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
