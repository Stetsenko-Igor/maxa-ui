import type { Metadata } from "next"
import { Alert, AlertAction } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Alert - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#intents", label: "Intents" },
  { href: "#with-title", label: "With title (stacked)" },
  { href: "#action", label: "Action button" },
  { href: "#dismissible", label: "Dismissible" },
  { href: "#combined", label: "Combined" },
  { href: "#api-reference", label: "API reference" },
]

const ALERT_PROPS = [
  { name: "intent", type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: "Visual and semantic intent. info/success → role=status; warning/danger → role=alert." },
  { name: "title", type: "ReactNode", default: undefined, description: "Bold heading. When present, switches to stacked layout (action below text). Absent → inline layout (action on right)." },
  { name: "icon", type: "ReactNode", default: "intent default", description: "Leading decorative icon, aria-hidden. Defaults to intent-specific SVG." },
  { name: "action", type: "ReactNode", default: undefined, description: "Optional call-to-action. Use <AlertAction> to get automatic intent-colored styling." },
  { name: "dismissible", type: "boolean", default: "false", description: "Shows a × dismiss button." },
  { name: "onDismiss", type: "() => void", default: undefined, description: "Called when dismiss button is clicked." },
  { name: "role", type: "'alert' | 'status'", default: "derived", description: "Override the auto-derived ARIA role." },
]

const ALERT_ACTION_PROPS = [
  { name: "variant", type: "ButtonProps['variant']", default: "'outline'", description: "Button variant. In stacked layout use 'primary' for filled style matching Figma." },
  { name: "size", type: "'sm' | 'md'", default: "'sm'", description: "Button size." },
]

const INTENTS = (["info", "success", "warning", "danger"] as const)
const col: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-6)",
  width: "100%",
  maxWidth: "657px",
  padding: "var(--spacing-4) 0",
  boxSizing: "border-box",
}

export default function AlertPage() {
  return (
    <ComponentPage
      title="Alert"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/alert"
      markdown=""
      previous={{ href: "/docs/components/toggle", label: "Toggle" }}
      next={{ href: "/docs/components/tooltip", label: "Tooltip" }}
      lead={
        <>
          Contextual callout with left accent strip, icon, optional title, action button,
          and dismiss. Two layouts: inline (text + action right) and stacked (title + body + action below).
          ARIA roles derived from intent.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Alert, AlertAction } from "@maxa/ui"\n\n<Alert intent="info">\n  Your trial ends in 3 days.\n</Alert>`}>
            <div style={col}>
              <Alert intent="info">Your trial ends in 3 days.</Alert>
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Alert, AlertAction } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Alert intent="success" title="Saved">\n  Changes saved.\n</Alert>`}
        />
      </DocsSection>

      <DocsSection
        id="intents"
        title="Intents — inline layout"
        description="No title → inline layout. Text on left, dismiss/action on right. info and success use role=status (polite). warning and danger use role=alert (assertive)."
      >
        <DocsExample title="All intents, no title">
          <ComponentPreview code={`<Alert intent="info">Informational message.</Alert>\n<Alert intent="success">Operation completed.</Alert>\n<Alert intent="warning">Check this before continuing.</Alert>\n<Alert intent="danger">Something went wrong.</Alert>`}>
            <div style={col}>
              {INTENTS.map((intent) => (
                <Alert key={intent} intent={intent}>
                  {intent.charAt(0).toUpperCase() + intent.slice(1)} — a short contextual message.
                </Alert>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="with-title"
        title="With title — stacked layout"
        description="Adding a title switches to stacked layout: icon + title (bold) + body stacked vertically. Action button appears below the body text."
      >
        <DocsExample title="Stacked — all intents">
          <ComponentPreview code={`<Alert intent="success" title="File uploaded">\n  Your file has been processed and is ready.\n</Alert>`}>
            <div style={col}>
              {INTENTS.map((intent) => (
                <Alert key={intent} intent={intent} title={`${intent.charAt(0).toUpperCase() + intent.slice(1)} title`}>
                  Supporting body text that explains the message in more detail.
                </Alert>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="action"
        title="Action button"
        description="Pass action={<AlertAction>Label</AlertAction>} to add a call-to-action. AlertAction is a thin wrapper over Button that inherits intent color via CSS cascade. In inline layout: outline. In stacked layout: pass variant='primary' for filled style."
      >
        <DocsExample title="Inline — action on right (outline)">
          <ComponentPreview code={`<Alert intent="warning" action={<AlertAction>Undo</AlertAction>}>\n  File deleted.\n</Alert>`}>
            <div style={col}>
              {INTENTS.map((intent) => (
                <Alert
                  key={intent}
                  intent={intent}
                  action={<AlertAction>Action</AlertAction>}
                >
                  {intent.charAt(0).toUpperCase() + intent.slice(1)} inline with action.
                </Alert>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Stacked — action below text (primary)">
          <ComponentPreview code={`<Alert\n  intent="danger"\n  title="Session expired"\n  action={<AlertAction variant="primary">Sign in again</AlertAction>}\n>\n  Your session has timed out.\n</Alert>`}>
            <div style={col}>
              {INTENTS.map((intent) => (
                <Alert
                  key={intent}
                  intent={intent}
                  title={`${intent.charAt(0).toUpperCase() + intent.slice(1)} with action`}
                  action={<AlertAction variant="primary">Take action</AlertAction>}
                >
                  Supporting body text explaining the situation.
                </Alert>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="dismissible"
        title="Dismissible"
        description="Add dismissible to show a × button. Keyboard-accessible, labelled Dismiss, stopsPropagation."
      >
        <DocsExample title="With dismiss">
          <ComponentPreview code={`<Alert intent="info" dismissible onDismiss={() => setVisible(false)}>\n  You can close this.\n</Alert>`}>
            <div style={col}>
              {INTENTS.map((intent) => (
                <Alert key={intent} intent={intent} dismissible>
                  {intent.charAt(0).toUpperCase() + intent.slice(1)} — dismiss me.
                </Alert>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="combined"
        title="Combined"
        description="Title + action + dismiss together."
      >
        <DocsExample title="Full stacked alert">
          <ComponentPreview code={`<Alert\n  intent="warning"\n  title="Storage almost full"\n  action={<AlertAction variant="primary">Upgrade plan</AlertAction>}\n  dismissible\n>\n  You are using 90% of your storage. Upgrade to avoid data loss.\n</Alert>`}>
            <div style={col}>
              <Alert
                intent="warning"
                title="Storage almost full"
                action={<AlertAction variant="primary">Upgrade plan</AlertAction>}
                dismissible
              >
                You are using 90% of your storage. Upgrade to avoid data loss.
              </Alert>
              <Alert
                intent="danger"
                title="Payment failed"
                action={<AlertAction variant="primary">Update billing</AlertAction>}
                dismissible
              >
                Your last payment could not be processed. Please update your billing info.
              </Alert>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={ALERT_PROPS} />
        <div style={{ marginTop: "32px" }}>
          <h3 style={{ fontSize: "var(--text-md)", fontWeight: "var(--font-weight-semibold)", marginBottom: "12px" }}>
            AlertAction props
          </h3>
          <PropsTable props={ALERT_ACTION_PROPS} />
        </div>
      </DocsSection>
    </ComponentPage>
  )
}
