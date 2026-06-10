import type { Metadata } from "next"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
} from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Drawer - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#placement", label: "Placement" },
  { href: "#api-reference", label: "API reference" },
]

const DRAWER_PROPS = [
  { name: "open", type: "boolean", default: undefined, description: "Controlled open state." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Initial uncontrolled open state." },
  { name: "onOpenChange", type: "(open: boolean) => void", default: undefined, description: "Called when the drawer opens or closes." },
  { name: "DrawerContent side", type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: "Viewport edge the drawer is attached to." },
  { name: "DrawerContent size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Width for left/right drawers and height for top/bottom drawers." },
  { name: "DrawerBody", type: "HTMLDivElement", default: undefined, description: "Scrollable body region." },
  { name: "DrawerClose inline", type: "boolean", default: "false", description: "Use inline close styling for footer actions." },
]

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "center",
  padding: "32px",
}

export default function DrawerPage() {
  return (
    <ComponentPage
      title="Drawer"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/drawer"
      markdown=""
      previous={{ href: "/docs/components/divider", label: "Divider" }}
      next={{ href: "/docs/components/dropdown-menu", label: "Dropdown Menu" }}
      lead="Side overlay primitive for contained settings, filters, and secondary workflows."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`<Drawer>\n  <DrawerTrigger className="maxa-button maxa-button--outline maxa-button--md">Edit package</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Package Settings</DrawerTitle>\n      <DrawerDescription>Update metadata and visibility.</DrawerDescription>\n      <DrawerClose aria-label="Close" />\n    </DrawerHeader>\n    <DrawerBody>\n      <Input label="Package name" defaultValue="Listing Package" />\n    </DrawerBody>\n    <DrawerFooter>\n      <DrawerClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DrawerClose>\n      <Button>Save Changes</Button>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>`}>
            <div style={{ padding: "32px" }}>
              <Drawer>
                <DrawerTrigger className="maxa-button maxa-button--outline maxa-button--md">Edit package</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Package Settings</DrawerTitle>
                    <DrawerDescription>Update metadata and visibility.</DrawerDescription>
                    <DrawerClose aria-label="Close" />
                  </DrawerHeader>
                  <DrawerBody>
                    <Input label="Package name" defaultValue="Listing Package" />
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DrawerClose>
                    <Button>Save Changes</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  Drawer,\n  DrawerBody,\n  DrawerClose,\n  DrawerContent,\n  DrawerFooter,\n  DrawerHeader,\n  DrawerTitle,\n  DrawerTrigger,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Drawer>\n  <DrawerTrigger>Open drawer</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Package Settings</DrawerTitle>\n      <DrawerClose aria-label="Close" />\n    </DrawerHeader>\n    <DrawerBody>Form fields or filters go here.</DrawerBody>\n  </DrawerContent>\n</Drawer>`}
        />
      </DocsSection>

      <DocsSection
        id="placement"
        title="Placement"
        description="Use right or left for side panels. Top and bottom are available for compact viewport-attached workflows."
      >
        <DocsExample title="Sides">
          <ComponentPreview code={`<DrawerContent side="left" />\n<DrawerContent side="right" />\n<DrawerContent side="bottom" />`}>
            <div style={row}>
              <Drawer>
                <DrawerTrigger className="maxa-button maxa-button--outline maxa-button--md">Left</DrawerTrigger>
                <DrawerContent side="left" size="sm"><DrawerHeader><DrawerTitle>Left drawer</DrawerTitle><DrawerDescription>Attached to the left edge.</DrawerDescription></DrawerHeader><DrawerBody>Use for filters when the product context calls for it.</DrawerBody></DrawerContent>
              </Drawer>
              <Drawer>
                <DrawerTrigger className="maxa-button maxa-button--outline maxa-button--md">Right</DrawerTrigger>
                <DrawerContent side="right" size="sm"><DrawerHeader><DrawerTitle>Right drawer</DrawerTitle><DrawerDescription>Default side.</DrawerDescription></DrawerHeader><DrawerBody>Use for settings and details.</DrawerBody></DrawerContent>
              </Drawer>
              <Drawer>
                <DrawerTrigger className="maxa-button maxa-button--outline maxa-button--md">Bottom</DrawerTrigger>
                <DrawerContent side="bottom" size="sm"><DrawerHeader><DrawerTitle>Bottom drawer</DrawerTitle><DrawerDescription>Viewport-attached secondary panel.</DrawerDescription></DrawerHeader><DrawerBody>Use only when a bottom-attached surface is clearer than a dialog.</DrawerBody></DrawerContent>
              </Drawer>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={DRAWER_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
