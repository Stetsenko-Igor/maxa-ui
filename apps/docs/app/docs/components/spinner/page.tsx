import type { Metadata } from "next"
import { Spinner } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { SpinnerDefaultPreview } from "./spinner-default-preview"

export const metadata: Metadata = { title: "Spinner - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sizes", label: "Sizes" },
  { href: "#appearances", label: "Appearances" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Visual size." },
  { name: "appearance", type: "'white' | 'primary' | 'greyscale' | 'inverted'", default: "'primary'", description: "Spinner color for different surfaces." },
  { name: "label", type: "string", default: "'Loading'", description: "Accessible label for standalone loading." },
  { name: "decorative", type: "boolean", default: "false", description: "Hide from assistive tech when loading is already announced nearby." },
]

export default function SpinnerPage() {
  return (
    <ComponentPage
      title="Spinner"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/spinner"
      markdown=""
      previous={{ href: "/docs/components/skeleton", label: "Skeleton" }}
      next={{ href: "/docs/components/tabs", label: "Tabs" }}
      lead="Indeterminate loading indicator for compact surfaces, buttons, and inline fetch states."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <SpinnerDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Spinner } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Spinner label="Loading designs" />`}
        />
      </DocsSection>

      <DocsSection id="sizes" title="Sizes">
        <DocsExample title="sm, md, lg">
          <ComponentPreview code={`<Spinner size="sm" label="Loading" />\n<Spinner size="md" label="Loading" />\n<Spinner size="lg" label="Loading" />`}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", padding: "32px" }}>
              <Spinner size="sm" label="Loading small" />
              <Spinner size="md" label="Loading medium" />
              <Spinner size="lg" label="Loading large" />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="appearances" title="Appearances">
        <DocsExample title="white on dark, primary, greyscale, inverted on light">
          <ComponentPreview code={`<Spinner appearance="white" label="Loading" />\n<Spinner appearance="primary" label="Loading" />\n<Spinner appearance="greyscale" label="Loading" />\n<Spinner appearance="inverted" label="Loading" />`}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(120px, 1fr))", gap: "16px", width: "100%", padding: "24px" }}>
              <div style={{ display: "grid", placeItems: "center", minHeight: "96px", borderRadius: "var(--radius-md)", background: "var(--color-bg-neutral-strong)" }}>
                <Spinner appearance="white" label="Loading white" />
              </div>
              <div style={{ display: "grid", placeItems: "center", minHeight: "96px", border: "1px solid var(--color-border-secondary)", borderRadius: "var(--radius-md)", background: "var(--color-bg-surface)" }}>
                <Spinner appearance="primary" label="Loading primary" />
              </div>
              <div style={{ display: "grid", placeItems: "center", minHeight: "96px", border: "1px solid var(--color-border-secondary)", borderRadius: "var(--radius-md)", background: "var(--color-bg-page)" }}>
                <Spinner appearance="greyscale" label="Loading greyscale" />
              </div>
              <div style={{ display: "grid", placeItems: "center", minHeight: "96px", border: "1px solid var(--color-border-secondary)", borderRadius: "var(--radius-md)", background: "var(--color-bg-surface)" }}>
                <Spinner appearance="inverted" label="Loading inverted" />
              </div>
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
