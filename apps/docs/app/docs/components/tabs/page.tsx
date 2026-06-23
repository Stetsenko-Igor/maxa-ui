import type { Metadata } from "next"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { TabsDefaultPreview } from "./tabs-default-preview"

export const metadata: Metadata = { title: "Tabs - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "Tabs", type: "Radix Root", default: undefined, description: "Controls selected tab value." },
  { name: "TabsList", type: "Radix List", default: undefined, description: "Container for tab triggers." },
  { name: "TabsTrigger", type: "Radix Trigger", default: undefined, description: "Selectable tab control." },
  { name: "TabsContent", type: "Radix Content", default: undefined, description: "Panel associated with a trigger value." },
]

export default function TabsPage() {
  return (
    <ComponentPage
      title="Tabs"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/tabs"
      markdown=""
      previous={{ href: "/docs/components/spinner", label: "Spinner" }}
      next={{ href: "/docs/components/tag", label: "Tag" }}
      lead="A connected horizontal tab row for switching between related panels on the same surface."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <TabsDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  Tabs,\n  TabsContent,\n  TabsList,\n  TabsTrigger,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Tabs defaultValue="designs">\n  <TabsList aria-label="Dashboard view">\n    <TabsTrigger value="designs">Designs</TabsTrigger>\n  </TabsList>\n  <TabsContent value="designs">Designs panel</TabsContent>\n</Tabs>`}
        />
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
