import type { Metadata } from "next"
import { Progress } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Progress - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#statuses", label: "Statuses" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "value", type: "number | null", default: "0", description: "Current value. Clamped between 0 and max." },
  { name: "max", type: "number", default: "100", description: "Maximum value." },
  { name: "size", type: "'sm' | 'md'", default: "'md'", description: "Track height." },
  { name: "intent", type: "'brand' | 'success' | 'warning' | 'error'", default: "'brand'", description: "Progress meaning. Reserve status colors for meaningful workflow states." },
  { name: "label", type: "string", default: undefined, description: "Optional visible label." },
  { name: "showValue", type: "boolean", default: "false", description: "Show rounded percent." },
]

export default function ProgressPage() {
  return (
    <ComponentPage
      title="Progress"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/progress"
      markdown=""
      previous={{ href: "/docs/components/popover", label: "Popover" }}
      next={{ href: "/docs/components/radio", label: "Radio" }}
      lead="Determinate progress for imports, uploads, generation, and setup flows."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`<Progress value={64} label="Uploading package" showValue />`}>
            <div style={{ width: "360px", padding: "32px" }}>
              <Progress value={64} label="Uploading package" showValue />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Progress } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Progress value={64} label="Uploading package" showValue />`}
        />
      </DocsSection>

      <DocsSection id="statuses" title="Statuses" description="Use brand while work is running. Use success, warning, and error only when the progress state changes what the user needs to do next.">
        <DocsExample title="Workflow states">
          <ComponentPreview code={`<Progress value={64} label="Uploading package" showValue />\n<Progress value={100} intent="success" label="Generation complete" showValue />\n<Progress value={76} intent="warning" label="Approval window" showValue />\n<Progress value={100} intent="error" label="Upload failed" showValue />`}>
            <div style={{ display: "grid", gap: "18px", width: "420px", padding: "32px" }}>
              <Progress value={64} intent="brand" label="Uploading package" showValue />
              <Progress value={100} intent="success" label="Generation complete" showValue />
              <Progress value={76} intent="warning" label="Approval window" showValue />
              <Progress value={100} intent="error" label="Upload failed" showValue />
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
