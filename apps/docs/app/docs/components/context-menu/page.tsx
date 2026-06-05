import type { Metadata } from "next"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

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
          <ComponentPreview code={`<ContextMenu>\n  <ContextMenuTrigger>Right click area</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuLabel>Package</ContextMenuLabel>\n    <ContextMenuItem>Open<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuItem>Duplicate<ContextMenuShortcut>Cmd+D</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`}>
            <div style={{ padding: "32px" }}>
              <ContextMenu>
                <ContextMenuTrigger style={{ width: "320px", minHeight: "144px", display: "grid", placeItems: "center", border: "1px dashed var(--color-border-primary)", borderRadius: "var(--radius-md)", color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}>
                  Right click area
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuLabel>Package</ContextMenuLabel>
                  <ContextMenuItem>Open<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>
                  <ContextMenuItem>Duplicate<ContextMenuShortcut>Cmd+D</ContextMenuShortcut></ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>
          </ComponentPreview>
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
