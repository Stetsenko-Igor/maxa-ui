import type { Metadata } from "next"
import { Select } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { SelectDefaultPreview } from "./select-default-preview"

export const metadata: Metadata = { title: "Select - MAXA UI" }

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "12px", width: "320px" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#open-listbox", label: "Open listbox" },
  { href: "#states", label: "States" },
  { href: "#api-reference", label: "API reference" },
]

const SELECT_PROPS = [
  { name: "value", type: "string", default: undefined, description: "Controlled selected value." },
  { name: "defaultValue", type: "string", default: undefined, description: "Initial uncontrolled selected value." },
  { name: "onValueChange", type: "(value: string) => void", default: undefined, description: "Called when a custom listbox option is selected." },
  { name: "onChange", type: "ChangeEvent<HTMLSelectElement>", default: undefined, description: "Receives the hidden native select for form compatibility." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state for demos and controlled examples." },
  { name: "options", type: "{ label: string; value: string; disabled?: boolean }[]", default: undefined, description: "Optional data API. Native option children are also supported." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Controls height, padding, and font size." },
  { name: "label", type: "string", default: undefined, description: "Accessible label rendered above the select." },
  { name: "hint", type: "string", default: undefined, description: "Helper text rendered below the select." },
  { name: "error", type: "string", default: undefined, description: "Error message. Sets error status and aria-invalid." },
  { name: "required", type: "boolean", default: "false", description: "Shows the required marker next to the label." },
  { name: "visualState", type: "'default' | 'hover' | 'focus' | 'error' | 'disabled' | 'open'", default: "'default'", description: "Controlled visual state for docs and examples." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the select." },
]

const SELECT_MARKDOWN = `# Select

A custom listbox form control for choosing one value from a known list.

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
      previous={{ href: "/docs/components/textarea", label: "TextArea" }}
      next={{ href: "/docs/components/date-picker", label: "Date Picker" }}
      lead={
        <>
          A custom listbox form control for choosing one value from a known
          list. In Figma this can be named Dropdown; in code it is Select
          because it stores a form value.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <SelectDefaultPreview />
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
          usage={`<Select label="Plan" defaultValue="starter">\n  <option value="starter">Starter</option>\n  <option value="pro">Pro</option>\n</Select>`}
        />
      </DocsSection>

      <DocsSection
        id="open-listbox"
        title="Open listbox"
        description="Select opens a custom listbox surface with selected, highlighted, and disabled option states. Use DropdownMenu instead for actions or navigation."
      >
        <DocsExample title="Selected, highlighted, disabled">
          <ComponentPreview code={`<Select label="Template type" defaultValue="postcard" defaultOpen>\n  <option value="postcard">Postcard</option>\n  <option value="flyer">Flyer</option>\n  <option value="social">Social media</option>\n  <option value="archived" disabled>Archived</option>\n</Select>`}>
            <div style={{ width: "320px", minHeight: "260px" }}>
              <Select label="Template type" defaultValue="postcard" defaultOpen>
                <option value="postcard">Postcard</option>
                <option value="flyer">Flyer</option>
                <option value="social">Social media</option>
                <option value="archived" disabled>Archived</option>
              </Select>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="Select shares the same form wrapper model as Input: label, helper text, errors, and size."
      >
        <DocsExample title="Validation and disabled states">
          <ComponentPreview code={`<Select label="Default" defaultValue="one"><option value="one">One</option></Select>
<Select label="Focus" visualState="focus" defaultValue="one"><option value="one">One</option></Select>
<Select label="Error" error="Choose an option" defaultValue=""><option value="" disabled>Placeholder</option></Select>
<Select label="Disabled" disabled defaultValue="one"><option value="one">One</option></Select>`}>
            <div style={stack}>
              <Select label="Default" defaultValue="one"><option value="one">One</option><option value="two">Two</option></Select>
              <Select label="Focus" visualState="focus" defaultValue="one"><option value="one">One</option><option value="two">Two</option></Select>
              <Select label="Error" error="Choose an option" defaultValue=""><option value="" disabled>Placeholder</option><option value="one">One</option></Select>
              <Select label="Disabled" disabled defaultValue="one"><option value="one">One</option><option value="two">Two</option></Select>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="api-reference"
        title="API reference"
        description={<>Select forwards native select metadata to a hidden form element. Use Select for form selection, not for action menus.</>}
      >
        <PropsTable props={SELECT_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
