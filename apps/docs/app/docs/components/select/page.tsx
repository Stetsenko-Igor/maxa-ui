import type { Metadata } from "next"
import { Select } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Select - MAXA UI" }

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "12px", width: "320px" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#states", label: "States" },
  { href: "#api-reference", label: "API reference" },
]

const SELECT_PROPS = [
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Controls height, padding, and font size." },
  { name: "label", type: "string", default: undefined, description: "Accessible label rendered above the select." },
  { name: "hint", type: "string", default: undefined, description: "Helper text rendered below the select." },
  { name: "error", type: "string", default: undefined, description: "Error message. Sets error status and aria-invalid." },
  { name: "required", type: "boolean", default: "false", description: "Shows the required marker next to the label." },
  { name: "visualState", type: "'default' | 'hover' | 'focus' | 'error' | 'disabled'", default: "'default'", description: "Controlled visual state for docs and examples." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the select." },
]

const SELECT_MARKDOWN = `# Select

A form control for choosing one value from a known list.

## Installation

\`\`\`tsx
import { Select } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`
`

const GITHUB_SELECT_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/select"

export default function SelectPage() {
  return (
    <ComponentPage
      title="Select"
      toc={TOC}
      githubHref={GITHUB_SELECT_URL}
      markdown={SELECT_MARKDOWN}
      previous={{ href: "/docs/components/input", label: "Input" }}
      next={{ href: "/docs/components/date-picker", label: "Date Picker" }}
      lead={
        <>
          A form control for choosing one value from a known list. In Figma this
          can be named Dropdown; in code it is Select because of its semantic
          role.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview
            code={`import { Select } from "@maxa/ui"\n\n<Select label="Dropdown" defaultValue="">\n  <option value="" disabled>Placeholder</option>\n  <option value="starter">Starter</option>\n</Select>`}
          >
            <div style={{ width: "320px" }}>
              <Select label="Dropdown" defaultValue="">
                <option value="" disabled>Placeholder</option>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
              </Select>
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
          imports={`import { Select } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Select label="Plan"><option>Starter</option></Select>`}
        />
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="Select shares the same form wrapper model as Input: label, helper text, errors, and size."
      >
        <DocsExample title="Validation and disabled states">
          <ComponentPreview code={`<Select label="Default" defaultValue=""><option value="" disabled>Placeholder</option></Select>
<Select label="Focus" visualState="focus" defaultValue=""><option value="" disabled>Placeholder</option></Select>
<Select label="Error" error="Choose an option" defaultValue=""><option value="" disabled>Placeholder</option></Select>
<Select label="Disabled" disabled defaultValue=""><option value="" disabled>Placeholder</option></Select>`}>
            <div style={stack}>
              <Select label="Default" defaultValue=""><option value="" disabled>Placeholder</option><option>One</option></Select>
              <Select label="Focus" visualState="focus" defaultValue=""><option value="" disabled>Placeholder</option><option>One</option></Select>
              <Select label="Error" error="Choose an option" defaultValue=""><option value="" disabled>Placeholder</option><option>One</option></Select>
              <Select label="Disabled" disabled defaultValue=""><option value="" disabled>Placeholder</option><option>One</option></Select>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="api-reference"
        title="API reference"
        description={<>Native <code>&lt;select&gt;</code> attributes are forwarded to the underlying element. Use Select for form selection, not for action menus.</>}
      >
        <PropsTable props={SELECT_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
