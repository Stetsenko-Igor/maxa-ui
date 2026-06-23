import type { Metadata } from "next"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { PaginationDefaultPreview } from "./pagination-default-preview"

export const metadata: Metadata = { title: "Pagination - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "Pagination", type: "nav", default: undefined, description: "Navigation landmark with pagination label." },
  { name: "PaginationList", type: "ul", default: undefined, description: "Container for page items." },
  { name: "PaginationLink", type: "a", default: undefined, description: "Page link. Use isActive for the current page." },
  { name: "isActive", type: "boolean", default: "false", description: "Applies active styling and aria-current page." },
  { name: "PaginationPrevious / PaginationNext", type: "a", default: undefined, description: "Previous and next controls." },
]

export default function PaginationPage() {
  return (
    <ComponentPage
      title="Pagination"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/pagination"
      markdown=""
      previous={{ href: "/docs/components/input", label: "Input" }}
      next={{ href: "/docs/components/popover", label: "Popover" }}
      lead="Paged navigation for templates, designs, orders, publications, and admin tables."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <PaginationDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  Pagination,\n  PaginationItem,\n  PaginationLink,\n  PaginationList,\n  PaginationNext,\n  PaginationPrevious,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Pagination>\n  <PaginationList>\n    <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>\n    <PaginationItem><PaginationLink href="?page=2" isActive>2</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationNext href="?page=3" /></PaginationItem>\n  </PaginationList>\n</Pagination>`}
        />
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
