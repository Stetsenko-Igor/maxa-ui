import type { Metadata } from "next"
import { FileInput } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "FileInput - MAXA UI" }

const fieldWidth: React.CSSProperties = { width: "min(100%, 480px)" }
const stack: React.CSSProperties = { display: "grid", gap: "16px", width: "min(100%, 480px)" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#dropzone", label: "Dropzone" },
  { href: "#states", label: "States" },
  { href: "#validation", label: "Validation" },
  { href: "#api-reference", label: "API reference" },
]

const FILE_INPUT_PROPS = [
  { name: "label", type: "ReactNode", default: undefined, description: "Visible label above the picker." },
  { name: "title", type: "ReactNode", default: "'Choose files'", description: "Primary text inside the picker surface." },
  { name: "description", type: "ReactNode", default: "'Drag and drop files here, or click to browse.'", description: "Supporting text inside the picker surface." },
  { name: "hint", type: "ReactNode", default: undefined, description: "Helper text below the picker." },
  { name: "error", type: "ReactNode", default: undefined, description: "Error text. Sets error styling and role='alert'." },
  { name: "required", type: "boolean", default: "false", description: "Shows the required marker and sets native input required." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Controls padding, min-height, and icon size." },
  { name: "files", type: "File[]", default: undefined, description: "Controlled selected file list." },
  { name: "defaultFiles", type: "File[]", default: undefined, description: "Initial uncontrolled selected file list." },
  { name: "multiple", type: "boolean", default: "false", description: "Allows more than one file." },
  { name: "accept", type: "string", default: undefined, description: "Native accept filter." },
  { name: "maxFiles", type: "number", default: undefined, description: "Maximum accepted files." },
  { name: "maxSize", type: "number", default: undefined, description: "Maximum accepted file size in bytes." },
  { name: "enableDropzone", type: "boolean", default: "true", description: "Enables drag/drop behavior." },
  { name: "onFilesChange", type: "(files: File[]) => void", default: undefined, description: "Called with accepted files." },
  { name: "onFilesReject", type: "(rejections) => void", default: undefined, description: "Called with rejected files and reasons." },
]

const FILE_INPUT_MARKDOWN = `# FileInput

Low-level file picker and optional dropzone primitive. It never uploads files by itself.

## Installation

\`\`\`tsx
import { FileInput } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<FileInput label="Attachment" accept=".pdf,image/*" />
\`\`\`
`

const GITHUB_FILE_INPUT_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/file-input"

function fileInputExample(name: string, jsx: string) {
  return `import { FileInput } from "@maxa/ui"\n\nexport function ${name}() {\n  return ${jsx}\n}`
}

const sampleFiles = [
  new File(["design"], "brand-guidelines.pdf", { type: "application/pdf" }),
  new File(["image"], "listing-photo.jpg", { type: "image/jpeg" }),
]

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
          Low-level file picker and optional dropzone primitive. FileInput handles
          accessible selection UI and selected-file display, but upload behavior
          stays in product code.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={fileInputExample("FileInputDefaultExample", `<FileInput label="Attachment" accept=".pdf,image/*" />`)}>
            <div style={fieldWidth}>
              <FileInput label="Attachment" accept=".pdf,image/*" />
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
          imports={`import { FileInput } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<FileInput label="Attachment" accept=".pdf,image/*" />`}
        />
      </DocsSection>

      <DocsSection
        id="dropzone"
        title="Dropzone"
        description="Drag/drop is an enhancement. Users can always click the surface or activate it with the keyboard."
      >
        <DocsExample title="Multiple files">
          <ComponentPreview code={fileInputExample("FileInputDropzoneExample", `<FileInput
  label="Assets"
  title="Drop files here"
  description="PDF, PNG, JPG, or SVG"
  accept=".pdf,image/*"
  multiple
/>`)}>
            <div style={fieldWidth}>
              <FileInput
                label="Assets"
                title="Drop files here"
                description="PDF, PNG, JPG, or SVG"
                accept=".pdf,image/*"
                multiple
              />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description="FileInput exposes controlled visual states for docs and mirrors native disabled/error behavior."
      >
        <DocsExample title="Selected, error, and disabled">
          <ComponentPreview code={fileInputExample("FileInputStatesExample", `(
    <div>
      <FileInput label="Selected" defaultFiles={[new File(["design"], "brand-guidelines.pdf", { type: "application/pdf" })]} />
      <FileInput label="Error" error="Choose at least one file." />
      <FileInput label="Disabled" disabled />
    </div>
  )`)}>
            <div style={stack}>
              <FileInput label="Selected" defaultFiles={sampleFiles.slice(0, 1)} />
              <FileInput label="Error" error="Choose at least one file." />
              <FileInput label="Disabled" disabled />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="validation"
        title="Validation"
        description="maxFiles and maxSize are primitive guards. Product-level validation should still happen at the upload boundary."
      >
        <DocsExample title="Limited files">
          <ComponentPreview code={fileInputExample("FileInputValidationExample", `<FileInput
  label="Images"
  accept="image/*"
  multiple
  maxFiles={3}
  maxSize={5 * 1024 * 1024}
  hint="Up to 3 images, 5 MB each."
/>`)}>
            <div style={fieldWidth}>
              <FileInput
                label="Images"
                accept="image/*"
                multiple
                maxFiles={3}
                maxSize={5 * 1024 * 1024}
                hint="Up to 3 images, 5 MB each."
              />
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
