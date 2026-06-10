import type { Metadata } from "next"
import { TextArea } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "TextArea - MAXA UI" }

const fieldWidth: React.CSSProperties = { width: "min(100%, 420px)" }
const stack: React.CSSProperties = { display: "grid", gap: "12px", width: "min(100%, 420px)" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#states", label: "States" },
  { href: "#character-counter", label: "Character counter" },
  { href: "#api-reference", label: "API reference" },
]

const TEXTAREA_PROPS = [
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Controls min-height, padding, and font size." },
  { name: "status", type: "'default' | 'error' | 'success'", default: "'default'", description: "Visual validation state. Error uses red border; success uses green." },
  { name: "visualState", type: "'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled' | 'readonly'", default: "'default'", description: "Controlled state preview for docs and tests. Native hover and focus still work." },
  { name: "label", type: "string", default: undefined, description: "Accessible label rendered above the textarea." },
  { name: "hint", type: "string", default: undefined, description: "Helper text rendered below the textarea. Color follows status." },
  { name: "error", type: "string", default: undefined, description: "Error message. Sets error status and aria-invalid." },
  { name: "required", type: "boolean", default: "false", description: "Shows the required marker next to the label." },
  { name: "readOnly", type: "boolean", default: "false", description: "Not-editable state: readable but not mutable." },
  { name: "characterCounter", type: "boolean", default: "false", description: "Shows current character count when maxLength is provided." },
  { name: "maxLength", type: "number", default: undefined, description: "Native maxlength and counter denominator." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the textarea and applies disabled styling." },
  { name: "wrapperClassName", type: "string", default: undefined, description: "Extra class applied to the outer wrapper div." },
]

const TEXTAREA_MARKDOWN = `# TextArea

Multiline text entry with the same field wrapper, label, helper, error, and size model as Input.

## Installation

\`\`\`tsx
import { TextArea } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<TextArea label="Message" placeholder="Write a message" />
\`\`\`
`

const GITHUB_TEXTAREA_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/textarea"

function textAreaExample(name: string, jsx: string) {
  return `import { TextArea } from "@maxa/ui"\n\nexport function ${name}() {\n  return ${jsx}\n}`
}

export default function TextAreaPage() {
  return (
    <ComponentPage
      title="TextArea"
      toc={TOC}
      githubHref={GITHUB_TEXTAREA_URL}
      markdown={TEXTAREA_MARKDOWN}
      previous={{ href: "/docs/components/input", label: "Input" }}
      next={{ href: "/docs/components/select", label: "Select" }}
      lead={
        <>
          Multiline text entry for descriptions, bios, notes, disclaimers, and
          other long-form values. TextArea is a separate component entry, not an
          Input variant.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={textAreaExample("TextAreaDefaultExample", `<TextArea label="Message" placeholder="Write a message" />`)}>
            <div style={fieldWidth}>
              <TextArea label="Message" placeholder="Write a message" />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { TextArea } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<TextArea label="Message" placeholder="Write a message" />`}
        />
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="TextArea shares the same label, helper text, errors, sizes, and read-only behavior as Input."
      >
        <DocsExample title="Validation and read-only states">
          <ComponentPreview code={textAreaExample("TextAreaStatesExample", `(
    <div>
      <TextArea label="Default" placeholder="Write a message" />
      <TextArea label="Error" defaultValue="Too short" error="Add more detail." />
      <TextArea label="Not editable" defaultValue="Locked copy" readOnly />
      <TextArea label="Disabled" defaultValue="Unavailable" disabled />
    </div>
  )`)}>
            <div style={stack}>
              <TextArea label="Default" placeholder="Write a message" />
              <TextArea label="Error" defaultValue="Too short" error="Add more detail." />
              <TextArea label="Not editable" defaultValue="Locked copy" readOnly />
              <TextArea label="Disabled" defaultValue="Unavailable" disabled />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="character-counter"
        title="Character counter"
        description="Use the counter when the product has a visible length rule. Pair it with maxLength so the denominator is real."
      >
        <DocsExample title="Counter">
          <ComponentPreview code={textAreaExample("TextAreaCounterExample", `<TextArea label="Bio" defaultValue="Short agent bio" characterCounter maxLength={500} />`)}>
            <div style={fieldWidth}>
              <TextArea label="Bio" defaultValue="Short agent bio" characterCounter maxLength={500} />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="api-reference"
        title="API reference"
        description={<>All native <code>&lt;textarea&gt;</code> attributes are forwarded to the underlying element.</>}
      >
        <PropsTable props={TEXTAREA_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
