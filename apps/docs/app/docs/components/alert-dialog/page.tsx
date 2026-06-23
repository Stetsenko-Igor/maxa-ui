import type { Metadata } from "next"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { AlertDialogDefaultPreview } from "./alert-dialog-default-preview"

export const metadata: Metadata = { title: "Alert Dialog - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "open", type: "boolean", default: undefined, description: "Controlled open state inherited from Dialog." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Initial uncontrolled open state." },
  { name: "AlertDialogContent size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Content width." },
  { name: "AlertDialogBody", type: "HTMLDivElement", default: undefined, description: "Body region for the destructive confirmation copy." },
]

export default function AlertDialogPage() {
  return (
    <ComponentPage
      title="Alert Dialog"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/alert-dialog"
      markdown=""
      previous={{ href: "/docs/components/alert", label: "Alert" }}
      next={{ href: "/docs/components/avatar", label: "Avatar" }}
      lead="Interruptive confirmation dialog for irreversible or high-risk actions."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Destructive confirmation">
          <AlertDialogDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  AlertDialog,\n  AlertDialogBody,\n  AlertDialogCancel,\n  AlertDialogContent,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogTrigger,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<AlertDialog>\n  <AlertDialogTrigger>Delete list</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Delete List</AlertDialogTitle>\n      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>\n      <AlertDialogCancel aria-label="Close" />\n    </AlertDialogHeader>\n    <AlertDialogBody>Destructive confirmation copy goes here.</AlertDialogBody>\n    <AlertDialogFooter>\n      <AlertDialogCancel inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</AlertDialogCancel>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`}
        />
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
