import type { Metadata } from "next"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { BreadcrumbDefaultPreview } from "./breadcrumb-default-preview"

export const metadata: Metadata = { title: "Breadcrumb - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#long-path", label: "Long path" },
  { href: "#installation", label: "Installation" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "Breadcrumb", type: "nav", default: undefined, description: "Navigation landmark with breadcrumb label." },
  { name: "BreadcrumbList", type: "ol", default: undefined, description: "Ordered list of hierarchy items." },
  { name: "BreadcrumbItem", type: "li", default: undefined, description: "Single breadcrumb item." },
  { name: "BreadcrumbLink", type: "a", default: undefined, description: "Navigable parent item." },
  { name: "BreadcrumbPage", type: "span", default: undefined, description: "Current page with aria-current." },
  { name: "BreadcrumbSeparator", type: "li", default: "'/'", description: "Decorative separator." },
  { name: "BreadcrumbEllipsis", type: "button", default: "'...'", description: "Collapsed middle hierarchy trigger. Pair with DropdownMenu when hidden levels are navigable." },
]

export default function BreadcrumbPageDocs() {
  return (
    <ComponentPage
      title="Breadcrumb"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/breadcrumb"
      markdown=""
      previous={{ href: "/docs/components/avatar", label: "Avatar" }}
      next={{ href: "/docs/components/button", label: "Button" }}
      lead="Hierarchy navigation for dashboard folders, template categories, packages, and admin surfaces."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <BreadcrumbDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection id="long-path" title="Long path">
        <DocsExample title="Collapsed middle items">
          <ComponentPreview code={`<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <DropdownMenu>\n        <DropdownMenuTrigger asChild>\n          <BreadcrumbEllipsis />\n        </DropdownMenuTrigger>\n        <DropdownMenuContent align="start">\n          <DropdownMenuItem>Workspaces</DropdownMenuItem>\n          <DropdownMenuItem>Marketing Packages</DropdownMenuItem>\n        </DropdownMenuContent>\n      </DropdownMenu>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbLink href="/docs/components">Components</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`}>
            <div style={{ padding: "32px" }}>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <BreadcrumbEllipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>Workspaces</DropdownMenuItem>
                        <DropdownMenuItem>Marketing Packages</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="/docs/components">Components</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  Breadcrumb,\n  BreadcrumbEllipsis,\n  BreadcrumbItem,\n  BreadcrumbLink,\n  BreadcrumbList,\n  BreadcrumbPage,\n  BreadcrumbSeparator,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Marketing Packages</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`}
        />
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
