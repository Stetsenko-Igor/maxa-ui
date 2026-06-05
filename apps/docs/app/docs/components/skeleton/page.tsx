import type { Metadata } from "next"
import { Skeleton } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Skeleton - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#variants", label: "Variants" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "variant", type: "'text' | 'rect' | 'circle'", default: "'rect'", description: "Placeholder shape." },
]

export default function SkeletonPage() {
  return (
    <ComponentPage
      title="Skeleton"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/skeleton"
      markdown=""
      previous={{ href: "/docs/components/select", label: "Select" }}
      next={{ href: "/docs/components/spinner", label: "Spinner" }}
      lead="Layout-preserving placeholder for loading cards, rows, text, avatars, and thumbnails."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Card loading">
          <ComponentPreview code={`<Skeleton style={{ height: 128 }} />\n<Skeleton variant="text" style={{ width: "70%" }} />`}>
            <div style={{ display: "grid", gap: "12px", width: "260px", padding: "24px" }}>
              <Skeleton style={{ height: 128 }} />
              <Skeleton variant="text" style={{ width: "70%" }} />
              <Skeleton variant="text" style={{ width: "48%" }} />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Skeleton } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Skeleton variant="text" style={{ width: "70%" }} />`}
        />
      </DocsSection>

      <DocsSection id="variants" title="Variants">
        <DocsExample title="text, rect, circle">
          <ComponentPreview code={`<Skeleton variant="circle" />\n<Skeleton variant="text" />\n<Skeleton variant="rect" />`}>
            <div style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: "12px", alignItems: "center", width: "320px", padding: "24px" }}>
              <Skeleton variant="circle" />
              <div style={{ display: "grid", gap: "8px" }}>
                <Skeleton variant="text" />
                <Skeleton variant="text" style={{ width: "60%" }} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <Skeleton variant="rect" style={{ height: 92 }} />
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
