import type { Metadata } from "next"
import { FileInput } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { FileInputDefaultPreview } from "./file-input-default-preview"

export const metadata: Metadata = { title: "FileInput - MAXA UI" }

const stack: React.CSSProperties = { display: "grid", gap: "16px", width: "min(100%, 480px)" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sizes", label: "Sizes" },
  { href: "#states", label: "States" },
  { href: "#api-reference", label: "API reference" },
]

const FILE_INPUT_PROPS = [
  { name: "label", type: "ReactNode", default: undefined, description: "Visible label above the control." },
  { name: "buttonLabel", type: "ReactNode", default: "'Choose File'", description: "Text inside the action button." },
  { name: "placeholder", type: "ReactNode", default: "'No File Chosen'", description: "Field text when no file is chosen." },
  { name: "error", type: "ReactNode", default: undefined, description: "Error text below the control. Sets error styling and role='alert'." },
  { name: "required", type: "boolean", default: "false", description: "Shows the required marker and sets native input required." },
  { name: "info", type: "ReactNode", default: undefined, description: "Optional element next to the label (e.g. an info icon)." },
  { name: "buttonIcon", type: "ReactNode", default: "image icon", description: "Icon inside the action button." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Height, padding, and icon size." },
  { name: "visualState", type: "'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled' | 'not-editable'", default: "'default'", description: "Controlled state preview." },
  { name: "notEditable", type: "boolean", default: "false", description: "Locked/read-only: lock icon, greyed button, selection blocked." },
  { name: "fileName", type: "string", default: undefined, description: "Controlled selected file name." },
  { name: "defaultFileName", type: "string", default: undefined, description: "Initial uncontrolled file name." },
  { name: "onFileChange", type: "(file: File | null) => void", default: undefined, description: "Called with the selected file (or null)." },
]

const FILE_INPUT_MARKDOWN = `# FileInput

A styled native file picker: a "Choose File" button joined to a file-name field.
Single-file by design. It never uploads files by itself.

## Installation

\`\`\`tsx
import { FileInput } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<FileInput label="Attachment" accept=".pdf,image/*" onFileChange={(file) => {}} />
\`\`\`
`

const GITHUB_FILE_INPUT_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/file-input"

function fileInputExample(name: string, jsx: string) {
  return `import { FileInput } from "@maxa/ui"\n\nexport function ${name}() {\n  return ${jsx}\n}`
}

export default function FileInputPage() {
  return (
    <ComponentPage
      title="FileInput"
      toc={TOC}
      githubHref={GITHUB_FILE_INPUT_URL}
      markdown={FILE_INPUT_MARKDOWN}
      previous={{ href: "/docs/components/empty", label: "Empty" }}
      next={{ href: "/docs/components/form-field", label: "Form Field" }}
      lead={
        <>
          A styled native file picker — a primary &ldquo;Choose File&rdquo; button
          joined to a file-name field. Single-file by design; upload behavior stays
          in product code.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <FileInputDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { FileInput } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<FileInput label="Attachment" accept=".pdf,image/*" />`}
        />
      </DocsSection>

      <DocsSection
        id="sizes"
        title="Sizes"
        description="Heights align with Input and Button: 28 / 36 / 48 px."
      >
        <DocsExample title="sm, md, lg">
          <ComponentPreview code={fileInputExample("FileInputSizesExample", `(
    <div>
      <FileInput label="Small" size="sm" />
      <FileInput label="Medium" size="md" />
      <FileInput label="Large" size="lg" />
    </div>
  )`)}>
            <div style={stack}>
              <FileInput label="Small" size="sm" />
              <FileInput label="Medium" size="md" />
              <FileInput label="Large" size="lg" />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="Filled (with a clear button to reset), error, disabled, and not-editable (locked). Hover and focus are handled automatically."
      >
        <DocsExample title="Filled, error, disabled, not-editable">
          <ComponentPreview code={fileInputExample("FileInputStatesExample", `(
    <div>
      <FileInput label="Filled" defaultFileName="brand-guidelines.pdf" />
      <FileInput label="Error" error="Choose a file." />
      <FileInput label="Disabled" disabled />
      <FileInput label="Not editable" notEditable defaultFileName="locked.pdf" />
    </div>
  )`)}>
            <div style={stack}>
              <FileInput label="Filled" defaultFileName="brand-guidelines.pdf" />
              <FileInput label="Error" error="Choose a file." />
              <FileInput label="Disabled" disabled />
              <FileInput label="Not editable" notEditable defaultFileName="locked.pdf" />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="api-reference"
        title="API reference"
        description={<>Native file input attributes like <code>accept</code>, <code>capture</code>, and <code>name</code> are forwarded to the hidden input.</>}
      >
        <PropsTable props={FILE_INPUT_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
