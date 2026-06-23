import type { Metadata } from "next"
import { SegmentedControl, SegmentedControlItem } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { SegmentedControlDefaultPreview } from "./segmented-control-default-preview"

export const metadata: Metadata = { title: "Segment Control - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#counts", label: "Counts" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "value", type: "string", default: undefined, description: "Controlled selected value." },
  { name: "defaultValue", type: "string", default: undefined, description: "Initial selected value for uncontrolled usage." },
  { name: "onValueChange", type: "(value: string) => void", default: undefined, description: "Called when an item is selected." },
  { name: "SegmentedControlItem value", type: "string", default: undefined, description: "Required item value." },
]

export default function SegmentedControlPage() {
  return (
    <ComponentPage
      title="Segment Control"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/segmented-control"
      markdown=""
      previous={{ href: "/docs/components/select", label: "Select" }}
      next={{ href: "/docs/components/skeleton", label: "Skeleton" }}
      lead="Compact mode selector for a small set of mutually exclusive options."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <SegmentedControlDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  SegmentedControl,\n  SegmentedControlItem,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<SegmentedControl defaultValue="center" aria-label="Alignment">\n  <SegmentedControlItem value="left">Left</SegmentedControlItem>\n  <SegmentedControlItem value="center">Center</SegmentedControlItem>\n  <SegmentedControlItem value="right">Right</SegmentedControlItem>\n</SegmentedControl>`}
        />
      </DocsSection>

      <DocsSection id="counts" title="Counts">
        <DocsExample title="2, 4, and 6 items">
          <ComponentPreview code={`<SegmentedControl defaultValue="one" aria-label="Mode">...</SegmentedControl>`}>
            <div style={{ display: "grid", gap: "20px", justifyItems: "center", padding: "32px" }}>
              <SegmentedControl defaultValue="grid" aria-label="View">
                <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
                <SegmentedControlItem value="list">List</SegmentedControlItem>
              </SegmentedControl>
              <SegmentedControl defaultValue="week" aria-label="Calendar range">
                <SegmentedControlItem value="day">Day</SegmentedControlItem>
                <SegmentedControlItem value="week">Week</SegmentedControlItem>
                <SegmentedControlItem value="month">Month</SegmentedControlItem>
                <SegmentedControlItem value="year">Year</SegmentedControlItem>
              </SegmentedControl>
              <SegmentedControl defaultValue="three" aria-label="Step">
                <SegmentedControlItem value="one">One</SegmentedControlItem>
                <SegmentedControlItem value="two">Two</SegmentedControlItem>
                <SegmentedControlItem value="three">Three</SegmentedControlItem>
                <SegmentedControlItem value="four">Four</SegmentedControlItem>
                <SegmentedControlItem value="five">Five</SegmentedControlItem>
                <SegmentedControlItem value="six">Six</SegmentedControlItem>
              </SegmentedControl>
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
