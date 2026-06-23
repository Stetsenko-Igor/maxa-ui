import type { Metadata } from "next"
import { DatePicker } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { DatePickerDefaultPreview } from "./date-picker-default-preview"

export const metadata: Metadata = { title: "Date Picker - MAXA UI" }

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "16px", width: "360px" }
const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#single-day-variants", label: "Single day variants" },
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
  { name: "selectedDate", type: "Date", default: undefined, description: "Selected date passed to the calendar popover." },
  { name: "defaultCalendarMonth", type: "Date", default: undefined, description: "Initial visible month for an open single-date calendar." },
  { name: "calendarCurrentDate", type: "Date", default: "today", description: "Date marked as current inside the single-date calendar." },
  { name: "onDateSelect", type: "(date: Date) => void", default: undefined, description: "Called when a date is selected from the calendar." },
  { name: "quickSelect", type: "'inline' | 'more'", default: undefined, description: "Shows single-day quick presets above the calendar." },
  { name: "confirmSelection", type: "boolean", default: "false", description: "Adds Cancel and Apply actions on a muted footer." },
  { name: "timePicker", type: "boolean", default: "false", description: "Adds a time field below the single-day calendar." },
  { name: "defaultTime", type: "string", default: "'8:00 am'", description: "Initial time value for the time picker variant." },
  { name: "startDate / endDate", type: "Date", default: undefined, description: "Selected range dates for DateRangePicker." },
  { name: "onRangeApply", type: "(range) => void", default: undefined, description: "Called when the range dropdown Apply button is pressed." },
  { name: "quarter / year", type: "number", default: undefined, description: "Selected quarter and year for QuarterPicker." },
  { name: "onQuarterSelect", type: "(selection) => void", default: undefined, description: "Called when a quarter is selected." },
]

const DATE_PICKER_MARKDOWN = `# Date Picker

Separate date form components for single-date, range-date, and quarter entry. DatePicker includes a single-month calendar popover; DateRangePicker includes a two-month range popover with presets and footer actions; QuarterPicker includes quarter and year selection.

## Installation

\`\`\`tsx
import { DatePicker, DateRangePicker, QuarterPicker } from "@maxa/ui"
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
          <DatePickerDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection
        id="single-day-variants"
        title="Single day variants"
        description="Single-day picker variants from the layout reference: predefined quick list with confirmation and single-day time selection."
      >
        <DocsExample title="Date Picker Variants">
          <ComponentPreview
            code={`<DatePicker label="Predefined List & Confirmation" defaultValue="12/10/2026" quickSelect="more" confirmSelection />\n<DatePicker label="Single Day w Time Picker" defaultValue="12/10/2026" timePicker confirmSelection />`}
          >
            <div style={stack}>
              <DatePicker label="Predefined List & Confirmation" defaultValue="12/10/2026" quickSelect="more" confirmSelection />
              <DatePicker label="Single Day w Time Picker" defaultValue="12/10/2026" timePicker confirmSelection />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { DatePicker, DateRangePicker, QuarterPicker } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<DatePicker label="Date Picker" />`}
        />
      </DocsSection>

      <DocsSection id="states" title="States" description="Single-date fields open the shared Calendar primitive. Range fields open the two-month range dropdown from the layout reference. Quarter fields open the quarter and year picker.">
        <DocsExample title="Validation and disabled states">
          <ComponentPreview code={`<DatePicker label="Default" />
<DatePicker label="Focus" visualState="focus" defaultValue="5/9/2025" />
<DatePicker label="Error" error="Select a valid date" defaultValue="13/40/2026" />
<DatePicker label="Disabled" disabled />`}>
            <div style={stack}>
              <DatePicker label="Default" />
              <DatePicker label="Focus" visualState="focus" defaultValue="5/9/2025" />
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
