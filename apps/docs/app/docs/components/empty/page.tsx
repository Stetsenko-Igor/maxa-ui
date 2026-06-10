import type { Metadata } from "next"
import { Button, Empty } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Empty - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sizes", label: "Sizes" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "title", type: "ReactNode", default: undefined, description: "Required empty state heading." },
  { name: "description", type: "ReactNode", default: undefined, description: "Optional supporting copy." },
  { name: "icon", type: "ReactNode", default: undefined, description: "Decorative icon." },
  { name: "action", type: "ReactNode", default: undefined, description: "Primary action." },
  { name: "secondaryAction", type: "ReactNode", default: undefined, description: "Secondary action." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Vertical density." },
]

export default function EmptyPage() {
  return (
    <ComponentPage
      title="Empty"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/empty"
      markdown=""
      previous={{ href: "/docs/components/dropdown-menu", label: "Dropdown Menu" }}
      next={{ href: "/docs/components/file-input", label: "FileInput" }}
      lead="Standard empty state for no results, first-run surfaces, carts, folders, and scheduled content."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`<Empty\n  title="Scheduled Post Not Found"\n  description="Try another search or clear the current filters."\n  action={<Button variant="secondary">Clear search</Button>}\n/>`}>
            <div style={{ width: "420px" }}>
              <Empty
                icon={<SearchIcon />}
                title="Scheduled Post Not Found"
                description="Try another search or clear the current filters."
                action={<Button variant="secondary">Clear search</Button>}
              />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Empty } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Empty title="No designs" description="Create a design to get started." />`}
        />
      </DocsSection>

      <DocsSection id="sizes" title="Sizes">
        <DocsExample title="sm, md, lg">
          <ComponentPreview code={`<Empty size="sm" title="No tags" />\n<Empty size="lg" title="No designs" />`}>
            <div style={{ display: "grid", gap: "12px", width: "420px" }}>
              <Empty size="sm" title="No tags" description="Add tags to organize this design." />
              <Empty size="lg" icon={<FolderIcon />} title="No designs" description="Create or upload a design to fill this folder." />
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

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  )
}
