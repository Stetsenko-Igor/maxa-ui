import type { Metadata } from "next"
import { Calendar } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Calendar - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#range", label: "Range" },
  { href: "#disabled", label: "Disabled dates" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "month", type: "Date", default: undefined, description: "Controlled visible month." },
  { name: "defaultMonth", type: "Date", default: "new Date(2026, 5, 1)", description: "Initial visible month for uncontrolled usage." },
  { name: "onMonthChange", type: "(month: Date) => void", default: undefined, description: "Called when month navigation changes." },
  { name: "selected", type: "Date", default: undefined, description: "Selected date." },
  { name: "currentDate", type: "Date", default: "new Date()", description: "Date rendered as the outlined current day." },
  { name: "rangeStart / rangeEnd", type: "Date", default: undefined, description: "Range boundary dates. Boundaries render selected and dates between them render in-range." },
  { name: "onDateSelect", type: "(date: Date) => void", default: undefined, description: "Called when a day is selected." },
  { name: "disabledDates", type: "Date[]", default: "[]", description: "Specific dates that cannot be selected." },
  { name: "minDate / maxDate", type: "Date", default: undefined, description: "Lower and upper date bounds." },
  { name: "disableDate", type: "(date: Date) => boolean", default: undefined, description: "Custom disabled date predicate." },
]

export default function CalendarPage() {
  return (
    <ComponentPage
      title="Calendar"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/calendar"
      markdown=""
      previous={{ href: "/docs/components/button", label: "Button" }}
      next={{ href: "/docs/components/checkbox", label: "Checkbox" }}
      lead="Month grid primitive for date pickers, scheduling, and calendar popovers."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Selected date">
          <ComponentPreview code={`<Calendar\n  defaultMonth={new Date(2025, 4, 1)}\n  selected={new Date(2025, 4, 9)}\n  currentDate={new Date(2025, 4, 15)}\n  onDateSelect={(date) => console.log(date)}\n/>`}>
            <div style={{ padding: "32px" }}>
              <Calendar defaultMonth={new Date(2025, 4, 1)} selected={new Date(2025, 4, 9)} currentDate={new Date(2025, 4, 15)} />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Calendar } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Calendar defaultMonth={new Date(2025, 4, 1)} selected={new Date(2025, 4, 9)} />`}
        />
      </DocsSection>

      <DocsSection id="range" title="Range">
        <DocsExample title="Range selection">
          <ComponentPreview code={`<Calendar\n  defaultMonth={new Date(2025, 4, 1)}\n  currentDate={new Date(2025, 4, 15)}\n  rangeStart={new Date(2025, 4, 9)}\n  rangeEnd={new Date(2025, 5, 18)}\n/>`}>
            <div style={{ padding: "32px" }}>
              <Calendar
                defaultMonth={new Date(2025, 4, 1)}
                currentDate={new Date(2025, 4, 15)}
                rangeStart={new Date(2025, 4, 9)}
                rangeEnd={new Date(2025, 5, 18)}
              />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="disabled" title="Disabled dates">
        <DocsExample title="Bounds and exact disabled dates">
          <ComponentPreview code={`<Calendar\n  defaultMonth={new Date(2026, 5, 1)}\n  minDate={new Date(2026, 5, 3)}\n  maxDate={new Date(2026, 5, 24)}\n  disabledDates={[new Date(2026, 5, 12)]}\n/>`}>
            <div style={{ padding: "32px" }}>
              <Calendar
                defaultMonth={new Date(2026, 5, 1)}
                minDate={new Date(2026, 5, 3)}
                maxDate={new Date(2026, 5, 24)}
                disabledDates={[new Date(2026, 5, 12)]}
              />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
