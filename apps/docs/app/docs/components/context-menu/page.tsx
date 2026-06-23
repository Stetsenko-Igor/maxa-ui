import type { Metadata } from "next"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { ContextMenuDefaultPreview } from "./context-menu-default-preview"

export const metadata: Metadata = { title: "Context Menu - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "ContextMenuTrigger", type: "HTMLDivElement props", default: undefined, description: "Area that opens the menu on right click." },
  { name: "ContextMenuItem disabled", type: "boolean", default: "false", description: "Disables an item." },
  { name: "ContextMenuItem variant", type: "'default' | 'destructive'", default: "'default'", description: "Visual intent for menu actions." },
]

export default function ContextMenuPage() {
  return (
    <ComponentPage
      title="Context Menu"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/context-menu"
      markdown=""
      previous={{ href: "/docs/components/checkbox", label: "Checkbox" }}
      next={{ href: "/docs/components/date-picker", label: "Date Picker" }}
      lead="Right-click command menu for canvas, file, and item-level actions."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ContextMenuDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  ContextMenu,\n  ContextMenuContent,\n  ContextMenuItem,\n  ContextMenuTrigger,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<ContextMenu>\n  <ContextMenuTrigger>Right click area</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Open</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`}
        />
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
