import type { Metadata } from "next"
import { Slider } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { SliderDefaultPreview } from "./slider-default-preview"

export const metadata: Metadata = { title: "Slider - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#range", label: "Range" },
  { href: "#disabled", label: "Disabled" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "value", type: "number[]", default: undefined, description: "Controlled value array." },
  { name: "defaultValue", type: "number[]", default: "[50]", description: "Initial uncontrolled value." },
  { name: "min", type: "number", default: "0", description: "Minimum value." },
  { name: "max", type: "number", default: "100", description: "Maximum value." },
  { name: "step", type: "number", default: "1", description: "Step increment." },
  { name: "label", type: "string", default: undefined, description: "Visible label used as the accessible name." },
  { name: "showValue", type: "boolean", default: "false", description: "Shows the first selected value." },
  { name: "marks", type: "Array<string | number>", default: undefined, description: "Visual scale labels under the track." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables pointer and keyboard interaction." },
]

export default function SliderPage() {
  return (
    <ComponentPage
      title="Slider"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/slider"
      markdown=""
      previous={{ href: "/docs/components/skeleton", label: "Skeleton" }}
      next={{ href: "/docs/components/spinner", label: "Spinner" }}
      lead="Numeric range control for zoom, opacity, volume, density, and other adjustable settings."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <SliderDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Slider } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Slider label="Opacity" defaultValue={[64]} showValue />`}
        />
      </DocsSection>

      <DocsSection id="range" title="Range">
        <DocsExample title="single value and range">
          <ComponentPreview code={`<Slider label="Zoom" defaultValue={[50]} marks={[0, 50, 100]} />\n<Slider label="Price range" defaultValue={[24, 72]} marks={[0, 50, 100]} />`}>
            <div style={{ display: "grid", gap: "32px", width: "420px", padding: "32px" }}>
              <Slider label="Zoom" defaultValue={[50]} showValue marks={[0, 50, 100]} />
              <Slider label="Price range" defaultValue={[24, 72]} marks={[0, 50, 100]} />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="disabled" title="Disabled">
        <DocsExample title="locked value">
          <ComponentPreview code={`<Slider label="Locked scale" defaultValue={[72]} disabled showValue />`}>
            <div style={{ width: "360px", padding: "32px" }}>
              <Slider label="Locked scale" defaultValue={[72]} disabled showValue />
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
