import type { Metadata } from "next"
import { MultiSelect } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Multi Select - MAXA UI" }

const OPTIONS = [
  { label: "Brand design", value: "brand" },
  { label: "Social post", value: "social" },
  { label: "Presentation", value: "presentation" },
  { label: "Print file", value: "print" },
]

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#states", label: "States" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "label", type: "string", default: undefined, description: "Accessible field label." },
  { name: "options", type: "{ label: string; value: string }[]", default: undefined, description: "Available options." },
  { name: "value", type: "string[]", default: undefined, description: "Controlled selected values." },
  { name: "defaultValue", type: "string[]", default: "[]", description: "Initial uncontrolled selected values." },
  { name: "onValueChange", type: "(value: string[]) => void", default: undefined, description: "Called when selections change." },
  { name: "placeholder", type: "string", default: "'Select options'", description: "Text shown when no values are selected." },
  { name: "error", type: "string", default: undefined, description: "Error message. Sets aria-invalid." },
  { name: "hint", type: "string", default: undefined, description: "Helper text below the field." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the field and chip remove controls." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Form field size." },
]

export default function MultiSelectPage() {
  return (
    <ComponentPage
      title="Multi Select"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/multi-select"
      markdown=""
      previous={{ href: "/docs/components/input", label: "Input" }}
      next={{ href: "/docs/components/pagination", label: "Pagination" }}
      lead="Input-like multi-value selector for choosing several form values from a known list."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`<MultiSelect\n  label="Asset types"\n  options={options}\n  defaultValue={["brand", "social"]}\n/>`}>
            <div style={{ padding: "32px" }}>
              <MultiSelect label="Asset types" options={OPTIONS} defaultValue={["brand", "social"]} />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { MultiSelect } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<MultiSelect\n  label="Asset types"\n  options={options}\n  defaultValue={["brand", "social"]}\n/>`}
        />
      </DocsSection>

      <DocsSection id="states" title="States">
        <DocsExample title="Error and disabled">
          <ComponentPreview code={`<MultiSelect label="Asset types" options={options} error="Choose at least one type" />\n<MultiSelect label="Locked types" options={options} defaultValue={["brand"]} disabled />`}>
            <div style={{ display: "grid", gap: "20px", padding: "32px" }}>
              <MultiSelect label="Asset types" options={OPTIONS} error="Choose at least one type" />
              <MultiSelect label="Locked types" options={OPTIONS} defaultValue={["brand"]} disabled />
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
