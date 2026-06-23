import type { Metadata } from "next"
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { DialogDefaultPreview } from "./dialog-default-preview"

export const metadata: Metadata = { title: "Dialog - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sizes", label: "Sizes" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "open", type: "boolean", default: undefined, description: "Controlled open state." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Initial uncontrolled open state." },
  { name: "onOpenChange", type: "(open: boolean) => void", default: undefined, description: "Called when the dialog opens or closes." },
  { name: "DialogContent size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Dialog content width." },
  { name: "DialogBody", type: "HTMLDivElement", default: undefined, description: "Body region with Direct Mail modal typography and padding." },
  { name: "DialogClose inline", type: "boolean", default: "false", description: "Use inline close styling for footer actions." },
]

export default function DialogPage() {
  return (
    <ComponentPage
      title="Dialog"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/dialog"
      markdown=""
      previous={{ href: "/docs/components/date-picker", label: "Date Picker" }}
      next={{ href: "/docs/components/divider", label: "Divider" }}
      lead="Modal surface for focused decisions, forms, and short confirmation flows."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <DialogDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  Dialog,\n  DialogBody,\n  DialogClose,\n  DialogContent,\n  DialogFooter,\n  DialogHeader,\n  DialogTitle,\n  DialogTrigger,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Dialog>\n  <DialogTrigger>Open dialog</DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Edit List Settings</DialogTitle>\n      <DialogClose aria-label="Close" />\n    </DialogHeader>\n    <DialogBody>Form fields or content go here.</DialogBody>\n    <DialogFooter>\n      <DialogClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DialogClose>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`}
        />
      </DocsSection>

      <DocsSection id="sizes" title="Sizes">
        <DocsExample title="Content widths">
          <ComponentPreview code={`<DialogContent size="sm" />\n<DialogContent size="md" />\n<DialogContent size="lg" />`}>
            <div style={{ display: "flex", gap: "12px", padding: "32px", flexWrap: "wrap" }}>
              <Dialog><DialogTrigger className="maxa-button maxa-button--outline maxa-button--md">Small</DialogTrigger><DialogContent size="sm"><DialogHeader><DialogTitle>Small dialog</DialogTitle><DialogDescription>Compact confirmation copy.</DialogDescription></DialogHeader><DialogBody>Use for short decisions.</DialogBody></DialogContent></Dialog>
              <Dialog><DialogTrigger className="maxa-button maxa-button--outline maxa-button--md">Medium</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Medium dialog</DialogTitle><DialogDescription>Default width for most flows.</DialogDescription></DialogHeader><DialogBody>Matches Direct Mail delete and block flows.</DialogBody></DialogContent></Dialog>
              <Dialog><DialogTrigger className="maxa-button maxa-button--outline maxa-button--md">Large</DialogTrigger><DialogContent size="lg"><DialogHeader><DialogTitle>Large dialog</DialogTitle><DialogDescription>Use for short forms or larger decisions.</DialogDescription></DialogHeader><DialogBody>Matches edit settings form flows.</DialogBody></DialogContent></Dialog>
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
