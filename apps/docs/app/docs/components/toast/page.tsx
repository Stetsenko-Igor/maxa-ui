import type { Metadata } from "next"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import {
  AllIntentsDemo,
  WithActionDemo,
  WithDescriptionDemo,
} from "./_demos"
import { ToastDefaultPreview } from "./toast-default-preview"

export const metadata: Metadata = { title: "Toast - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#intents", label: "Intents" },
  { href: "#with-description", label: "With description" },
  { href: "#with-action", label: "With action" },
  { href: "#api-reference", label: "API reference" },
]

const TOAST_PROPS = [
  { name: "intent", type: "'neutral' | 'info' | 'success' | 'warning' | 'error'", default: "'neutral'", description: "Visual accent stripe color and semantic meaning." },
  { name: "open", type: "boolean", default: undefined, description: "Controlled open state." },
  { name: "onOpenChange", type: "(open: boolean) => void", default: undefined, description: "Called when open state changes." },
  { name: "duration", type: "number", default: "5000", description: "Auto-dismiss delay in ms. Pauses on hover." },
]

const PROVIDER_PROPS = [
  { name: "duration", type: "number", default: "5000", description: "Default auto-dismiss delay for all toasts." },
  { name: "swipeDirection", type: "'right' | 'left' | 'up' | 'down'", default: "'right'", description: "Swipe gesture direction for dismiss." },
  { name: "label", type: "string", default: "'Notification'", description: "Accessible label for the toast region." },
]

const VIEWPORT_PROPS = [
  { name: "hotkey", type: "string[]", default: "['F8']", description: "Keyboard shortcut to focus the toast region." },
]

const ACTION_PROPS = [
  { name: "altText", type: "string", default: undefined, description: "Required. Screen-reader description of the action when the toast auto-dismisses." },
]

export default function ToastPage() {
  return (
    <ComponentPage
      title="Toast"
      lead="Short-lived viewport notifications for system feedback and async results. Built on Radix Toast — accessible, auto-dismissing, with swipe-to-dismiss and pause-on-hover."
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/toast"
      toc={TOC}
    >
      <DocsSection id="preview" title="Default">
        <ToastDefaultPreview />
      </DocsSection>

      <InstallationBlock
        command="pnpm add @maxa/ui @maxa/tokens"
        imports={`import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  Toaster,
  useToast,
} from "@maxa/ui"
import "@maxa/tokens/theme.css"`}
        usage={`// Add Toaster to your app root
export function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

// Trigger from any component
function SaveButton() {
  const { toast } = useToast()
  return (
    <Button onClick={() => toast({ title: "Saved", intent: "success" })}>
      Save
    </Button>
  )
}`}
      />

      <DocsSection
        id="intents"
        title="Intents"
        description="Five intent variants communicate different message types. The left stripe color maps to the semantic border tokens."
      >
        <DocsExample title="All intents">
          <AllIntentsDemo />
        </DocsExample>
      </DocsSection>

      <DocsSection id="with-description" title="With description" description="Add a ToastDescription for supporting context.">
        <ComponentPreview
          code={`<Toast intent="info" open={open} onOpenChange={setOpen}>
  <div className="maxa-toast__body">
    <ToastTitle>Import started</ToastTitle>
    <ToastDescription>48 designs are being imported.</ToastDescription>
  </div>
  <ToastClose />
</Toast>`}
        >
          <WithDescriptionDemo />
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="with-action" title="With action" description="A single ToastAction gives the user a quick next step.">
        <ComponentPreview
          code={`<Toast intent="success" open={open} onOpenChange={setOpen}>
  <div className="maxa-toast__body">
    <ToastTitle>Design published</ToastTitle>
    <ToastDescription>Your design is now live.</ToastDescription>
  </div>
  <ToastAction altText="View the published design">View</ToastAction>
  <ToastClose />
</Toast>`}
        >
          <WithActionDemo />
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <DocsExample title="Toast">
          <PropsTable props={TOAST_PROPS} />
        </DocsExample>
        <DocsExample title="ToastProvider">
          <PropsTable props={PROVIDER_PROPS} />
        </DocsExample>
        <DocsExample title="ToastViewport">
          <PropsTable props={VIEWPORT_PROPS} />
        </DocsExample>
        <DocsExample title="ToastAction">
          <PropsTable props={ACTION_PROPS} />
        </DocsExample>
      </DocsSection>
    </ComponentPage>
  )
}
