import type { Metadata } from "next"
import { FormField, Input, Checkbox, Radio } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { FormFieldDefaultPreview } from "./form-field-default-preview"

export const metadata: Metadata = { title: "FormField - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#with-input", label: "With Input" },
  { href: "#error-and-hint", label: "Error and hint" },
  { href: "#required-and-info", label: "Required and info icon" },
  { href: "#with-checkbox", label: "Wrapping a Checkbox" },
  { href: "#with-radio-group", label: "Wrapping a Radio group" },
  { href: "#footer-end", label: "Footer end content" },
  { href: "#sizes", label: "Sizes" },
  { href: "#api-reference", label: "API reference" },
]

const FORM_FIELD_PROPS = [
  { name: "children", type: "ReactNode", default: undefined, description: "The form control to wrap (Input, Select, Checkbox, etc.). Required." },
  { name: "label", type: "string", default: undefined, description: "Label text. Renders as <label htmlFor={htmlFor}>." },
  { name: "htmlFor", type: "string", default: undefined, description: "Associates label with the control's id." },
  { name: "required", type: "boolean", default: "false", description: "Renders a red * mark next to the label." },
  { name: "infoIcon", type: "ReactNode", default: undefined, description: "Icon (e.g. info circle) next to the label. aria-hidden." },
  { name: "hint", type: "string", default: undefined, description: "Helper text below the control. Replaced by `error` when error is set." },
  { name: "hintId", type: "string", default: undefined, description: "Pair with the control's aria-describedby so screen readers read the hint." },
  { name: "error", type: "string", default: undefined, description: "Error message. Forces error status and replaces the hint." },
  { name: "footerEnd", type: "ReactNode", default: undefined, description: "Right-aligned element in the footer row (counter, link)." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Controls the visual rhythm between label, control, and hint." },
  { name: "status", type: "'default' | 'success' | 'error'", default: "'default'", description: "Status styling. Overridden by `error` prop when set." },
  { name: "className", type: "string", default: undefined, description: "Pass-through className for layout overrides." },
]

const FORM_FIELD_MARKDOWN = `# FormField

Composes a form control with label, hint, error, optional required mark, info icon, and right-aligned footer slot. Owns the visual rhythm between the parts.

## Installation

\`\`\`tsx
import { FormField, Input } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<FormField label="Email" htmlFor="email" hint="We will never share your email." required>
  <Input id="email" type="email" />
</FormField>
\`\`\`
`

const GITHUB_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/form-field"

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "16px", maxWidth: "420px" }

export default function FormFieldPage() {
  return (
    <ComponentPage
      title="FormField"
      toc={TOC}
      githubHref={GITHUB_URL}
      markdown={FORM_FIELD_MARKDOWN}
      previous={{ href: "/docs/components/file-input", label: "FileInput" }}
      next={{ href: "/docs/components/icon-button", label: "IconButton" }}
      lead={
        <>
          A composition wrapper that pairs any form control with its label, hint,
          optional error, required mark, info icon, and right-aligned footer slot.
          One FormField per control. Use it everywhere a labeled input lives.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <FormFieldDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { FormField, Input } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<FormField label="Email" htmlFor="email">
  <Input id="email" type="email" />
</FormField>`}
        />
      </DocsSection>

      <DocsSection
        id="with-input"
        title="With Input"
        description="Wrap an Input with a label and optional hint."
      >
        <DocsExample title="Label + hint">
          <ComponentPreview code={`<FormField label="Workspace name" htmlFor="ws" hint="Visible to teammates.">
  <Input id="ws" placeholder="Acme Inc." />
</FormField>`}>
            <div style={stack}>
              <FormField label="Workspace name" htmlFor="ws" hint="Visible to teammates.">
                <Input id="ws" placeholder="Acme Inc." />
              </FormField>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="error-and-hint"
        title="Error and hint"
        description={
          <>
            Pass <code>error</code> as a non-empty string to force error styling and
            replace the hint. The <code>status</code> prop is also available for
            success/default states.
          </>
        }
      >
        <DocsExample title="Error overrides hint">
          <ComponentPreview code={`<FormField
  label="Password"
  htmlFor="pwd"
  hint="Use at least 12 characters."
  error="Must be at least 12 characters."
>
  <Input id="pwd" type="password" defaultValue="short" />
</FormField>`}>
            <div style={stack}>
              <FormField
                label="Password"
                htmlFor="pwd"
                hint="Use at least 12 characters."
                error="Must be at least 12 characters."
              >
                <Input id="pwd" type="password" defaultValue="short" />
              </FormField>
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Success status">
          <ComponentPreview code={`<FormField
  label="Username"
  htmlFor="user"
  hint="Available."
  status="success"
>
  <Input id="user" defaultValue="igor" />
</FormField>`}>
            <div style={stack}>
              <FormField
                label="Username"
                htmlFor="user"
                hint="Available."
                status="success"
              >
                <Input id="user" defaultValue="igor" />
              </FormField>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="required-and-info"
        title="Required and info icon"
        description="Add a required mark and an info icon next to the label."
      >
        <ComponentPreview code={`<FormField
  label="Email"
  htmlFor="email-req"
  required
  infoIcon={<span aria-hidden>ⓘ</span>}
  hint="We will only contact you about account events."
>
  <Input id="email-req" type="email" />
</FormField>`}>
          <div style={stack}>
            <FormField
              label="Email"
              htmlFor="email-req"
              required
              infoIcon={<span aria-hidden>ⓘ</span>}
              hint="We will only contact you about account events."
            >
              <Input id="email-req" type="email" />
            </FormField>
          </div>
        </ComponentPreview>
      </DocsSection>

      <DocsSection
        id="with-checkbox"
        title="Wrapping a Checkbox"
        description="The label becomes a group label — let FormField own the labeling, not the Checkbox."
      >
        <ComponentPreview code={`<FormField label="Notifications" hint="We will email you only essentials.">
  <Checkbox sideLabel="Product updates" defaultChecked />
  <Checkbox sideLabel="Security alerts" defaultChecked />
  <Checkbox sideLabel="Newsletter" />
</FormField>`}>
          <div style={stack}>
            <FormField label="Notifications" hint="We will email you only essentials.">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Checkbox sideLabel="Product updates" defaultChecked />
                <Checkbox sideLabel="Security alerts" defaultChecked />
                <Checkbox sideLabel="Newsletter" />
              </div>
            </FormField>
          </div>
        </ComponentPreview>
      </DocsSection>

      <DocsSection
        id="with-radio-group"
        title="Wrapping a Radio group"
        description="Use FormField as the fieldset label. All radios share a `name`."
      >
        <ComponentPreview code={`<FormField label="Plan" hint="You can upgrade or downgrade at any time.">
  <Radio name="plan" value="free" sideLabel="Free" defaultChecked />
  <Radio name="plan" value="pro" sideLabel="Pro" />
  <Radio name="plan" value="team" sideLabel="Team" />
</FormField>`}>
          <div style={stack}>
            <FormField label="Plan" hint="You can upgrade or downgrade at any time.">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Radio name="plan" value="free" sideLabel="Free" defaultChecked />
                <Radio name="plan" value="pro" sideLabel="Pro" />
                <Radio name="plan" value="team" sideLabel="Team" />
              </div>
            </FormField>
          </div>
        </ComponentPreview>
      </DocsSection>

      <DocsSection
        id="footer-end"
        title="Footer end content"
        description="Right-aligned element in the footer row — perfect for counters or inline links."
      >
        <ComponentPreview code={`<FormField
  label="Bio"
  htmlFor="bio"
  hint="A short description (max 280 characters)."
  footerEnd={<span>32 / 280</span>}
>
  <Input id="bio" placeholder="Tell us about yourself" />
</FormField>`}>
          <div style={stack}>
            <FormField
              label="Bio"
              htmlFor="bio"
              hint="A short description (max 280 characters)."
              footerEnd={<span>32 / 280</span>}
            >
              <Input id="bio" placeholder="Tell us about yourself" />
            </FormField>
          </div>
        </ComponentPreview>
      </DocsSection>

      <DocsSection
        id="sizes"
        title="Sizes"
        description={
          <>
            Three sizes: <code>sm</code>, <code>md</code> (default), and{" "}
            <code>lg</code>. Size controls the rhythm between label, control, and
            footer — the wrapped control's own size is independent.
          </>
        }
      >
        <ComponentPreview code={`<FormField label="Small" size="sm" hint="Compact rhythm">
  <Input size="sm" />
</FormField>
<FormField label="Medium" size="md" hint="Standard rhythm">
  <Input size="md" />
</FormField>
<FormField label="Large" size="lg" hint="Spacious rhythm">
  <Input size="lg" />
</FormField>`}>
          <div style={stack}>
            <FormField label="Small" size="sm" hint="Compact rhythm">
              <Input size="sm" />
            </FormField>
            <FormField label="Medium" size="md" hint="Standard rhythm">
              <Input size="md" />
            </FormField>
            <FormField label="Large" size="lg" hint="Spacious rhythm">
              <Input size="lg" />
            </FormField>
          </div>
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={FORM_FIELD_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
