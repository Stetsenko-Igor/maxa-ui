import type { Metadata } from "next"
import { DatePicker, DateRangePicker } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Date Picker - MAXA UI" }

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "16px", width: "360px" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#states", label: "States" },
  { href: "#api-reference", label: "API reference" },
]

const DATE_PICKER_PROPS = [
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Controls height, padding, and font size." },
  { name: "label", type: "string", default: undefined, description: "Accessible label rendered above the date field." },
  { name: "hint", type: "string", default: undefined, description: "Helper text rendered below the date field." },
  { name: "error", type: "string", default: undefined, description: "Error message. Sets error status and aria-invalid." },
  { name: "required", type: "boolean", default: "false", description: "Shows the required marker next to the label." },
  { name: "visualState", type: "'default' | 'hover' | 'focus' | 'error' | 'disabled'", default: "'default'", description: "Controlled visual state for docs and examples." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the date field." },
]

const DATE_PICKER_MARKDOWN = `# Date Picker

Separate date form components for single-date and range-date entry.

## Installation

\`\`\`tsx
import { DatePicker, DateRangePicker } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`
`

const GITHUB_DATE_PICKER_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/date-picker"

export default function DatePickerPage() {
  return (
    <ComponentPage
      title="Date Picker"
      toc={TOC}
      githubHref={GITHUB_DATE_PICKER_URL}
      markdown={DATE_PICKER_MARKDOWN}
      previous={{ href: "/docs/components/select", label: "Select" }}
      lead={
        <>
          Separate date form components for single-date and range-date entry.
          These are not Input variants; they share the same FormField shell.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Single date and range">
          <ComponentPreview
            code={`import { DatePicker, DateRangePicker } from "@maxa/ui"\n\n<DatePicker label="Date Picker" />\n<DateRangePicker label="Date Picker" />`}
          >
            <div style={stack}>
              <DatePicker label="Date Picker" />
              <DateRangePicker label="Date Picker" />
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
          imports={`import { DatePicker, DateRangePicker } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<DatePicker label="Date Picker" />`}
        />
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="The current implementation establishes the field shell. Calendar popover behavior can be layered in later."
      >
        <DocsExample title="Validation and disabled states">
          <ComponentPreview code={`<DatePicker label="Default" />
<DatePicker label="Focus" visualState="focus" defaultValue="05/06/2026" />
<DatePicker label="Error" error="Select a valid date" defaultValue="13/40/2026" />
<DatePicker label="Disabled" disabled />`}>
            <div style={stack}>
              <DatePicker label="Default" />
              <DatePicker label="Focus" visualState="focus" defaultValue="05/06/2026" />
              <DatePicker label="Error" error="Select a valid date" defaultValue="13/40/2026" />
              <DatePicker label="Disabled" disabled />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="api-reference"
        title="API reference"
        description={<>Native <code>&lt;input&gt;</code> attributes are forwarded to the field. Use <code>DatePicker</code> for one date and <code>DateRangePicker</code> for a date range.</>}
      >
        <PropsTable props={DATE_PICKER_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
