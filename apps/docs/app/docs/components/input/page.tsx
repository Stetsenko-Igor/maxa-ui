import type { Metadata } from "next"
import { Input, TextArea, FormField } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Input - MAXA UI" }

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "12px", width: "320px" }
const fieldWidth: React.CSSProperties = { width: "min(100%, 320px)" }

function inputExample(name: string, jsx: string, imports = "Input") {
  return `import { ${imports} } from "@maxa/ui"\n\nexport function ${name}() {\n  return ${jsx}\n}`
}

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#field-types", label: "Field types" },
  { href: "#with-icons", label: "With icons" },
  { href: "#sizes", label: "Sizes" },
  { href: "#states", label: "States" },
  { href: "#label-and-helper-content", label: "Label and helper content" },
  { href: "#text-area", label: "Text area" },
  { href: "#form-composition", label: "Form composition" },
  { href: "#api-reference", label: "API reference" },
]

const INPUT_PROPS = [
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Controls height, padding, and font size." },
  { name: "kind", type: "'text' | 'password' | 'search' | 'quantity'", default: "'text'", description: "Chooses the field primitive and built-in affordances." },
  { name: "status", type: "'default' | 'error' | 'success'", default: "'default'", description: "Visual validation state. Error uses red border; success uses green." },
  { name: "visualState", type: "'default' | 'hover' | 'focus' | 'filled' | 'error' | 'disabled' | 'readonly'", default: "'default'", description: "For docs and controlled state previews. Native hover and focus still work." },
  { name: "label", type: "string", default: undefined, description: "Accessible label rendered above the input." },
  { name: "hint", type: "string", default: undefined, description: "Helper text rendered below the input. Color follows status." },
  { name: "error", type: "string", default: undefined, description: "Error message. Sets error status and aria-invalid." },
  { name: "required", type: "boolean", default: "false", description: "Shows the required marker next to the label." },
  { name: "readOnly", type: "boolean", default: "false", description: "Not-editable state: readable but not mutable." },
  { name: "leadingIcon", type: "ReactNode", default: undefined, description: "Icon rendered inside the input on the left." },
  { name: "trailingIcon", type: "ReactNode", default: undefined, description: "Icon rendered inside the input on the right." },
  { name: "onClear", type: "() => void", default: undefined, description: "Renders a clear button for search-like fields." },
  { name: "onIncrement", type: "() => void", default: undefined, description: "Quantity stepper increment handler." },
  { name: "onDecrement", type: "() => void", default: undefined, description: "Quantity stepper decrement handler." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input. Applies reduced opacity to the whole field." },
  { name: "wrapperClassName", type: "string", default: undefined, description: "Extra class applied to the outer wrapper div." },
]

const INPUT_MARKDOWN = `# Input

A composable form field family. MAXA separates field primitives from form-level components.

## Installation

\`\`\`tsx
import { Input, TextArea } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<Input label="Email" placeholder="you@example.com" />
<TextArea label="Message" placeholder="Write a message" />
\`\`\`
`

const GITHUB_INPUT_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/input"

export default function InputPage() {
  return (
    <ComponentPage
      title="Input"
      toc={TOC}
      githubHref={GITHUB_INPUT_URL}
      markdown={INPUT_MARKDOWN}
      previous={{ href: "/docs/components/button", label: "Button" }}
      next={{ href: "/docs/components/select", label: "Select" }}
      lead={
        <>
          A composable form field family. MAXA separates field primitives from
          form-level components: text, select, and date picker each get their
          own component instead of one large universal input matrix.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={inputExample("InputDefaultExample", `<Input label="Default Package" placeholder="Any" />`)}>
            <div style={{ width: "320px" }}>
              <Input label="Default Package" placeholder="Any" />
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
          imports={`import { Input, TextArea } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Input label="Email" placeholder="you@example.com" />`}
        />
      </DocsSection>

      <DocsSection
        id="field-types"
        title="Field types"
        description="Each field type gets its own example container. This keeps the docs readable and avoids rebuilding the giant Figma matrix in code."
      >
        <DocsExample title="Text">
          <ComponentPreview code={inputExample("InputTextExample", `<Input kind="text" label="Text" placeholder="Any" />`)}>
            <div style={fieldWidth}>
              <Input kind="text" label="Text" placeholder="Any" />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Password">
          <ComponentPreview code={inputExample("InputPasswordExample", `<Input kind="password" label="Password" placeholder="Any" />`)}>
            <div style={fieldWidth}>
              <Input kind="password" label="Password" placeholder="Any" />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Search">
          <ComponentPreview code={inputExample("InputSearchExample", `<Input kind="search" label="Search" placeholder="Type to search" />`)}>
            <div style={fieldWidth}>
              <Input kind="search" label="Search" placeholder="Type to search" />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Quantity">
          <ComponentPreview code={inputExample("InputQuantityExample", `<Input kind="quantity" label="Quantity" defaultValue={1} />`)}>
            <div style={fieldWidth}>
              <Input kind="quantity" label="Quantity" defaultValue={1} />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="with-icons"
        title="With icons"
        description={
          <>
            Pass any <code>ReactNode</code> to <code>leadingIcon</code> or{" "}
            <code>trailingIcon</code>. The field automatically adds padding so
            text never overlaps the icon.
          </>
        }
      >
        <DocsExample title="Leading icon">
          <ComponentPreview code={inputExample("InputLeadingIconExample", `<Input
    label="Email"
    placeholder="you@example.com"
    leadingIcon={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    }
  />`)}>
            <div style={fieldWidth}>
              <Input
                label="Email"
                placeholder="you@example.com"
                leadingIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
              />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Trailing icon">
          <ComponentPreview code={inputExample("InputTrailingIconExample", `<Input
    label="Website"
    placeholder="https://example.com"
    trailingIcon={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" x2="21" y1="14" y2="3" />
      </svg>
    }
  />`)}>
            <div style={fieldWidth}>
              <Input
                label="Website"
                placeholder="https://example.com"
                trailingIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" x2="21" y1="14" y2="3" />
                  </svg>
                }
              />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Leading and trailing">
          <ComponentPreview code={inputExample("InputBothIconsExample", `<Input
    label="Amount"
    placeholder="0.00"
    leadingIcon={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    }
    trailingIcon={
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
      </svg>
    }
  />`)}>
            <div style={fieldWidth}>
              <Input
                label="Amount"
                placeholder="0.00"
                leadingIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                }
                trailingIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                  </svg>
                }
              />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="sizes"
        title="Sizes"
        description={
          <>
            Three sizes: <code>sm</code> 28px, <code>md</code> 36px, and{" "}
            <code>lg</code> 48px.
          </>
        }
      >
        <DocsExample title="Small, medium, and large">
          <ComponentPreview code={inputExample("InputSizesExample", `(
    <div>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  )`)}>
            <div style={stack}>
              <Input size="sm" placeholder="Small" />
              <Input size="md" placeholder="Medium" />
              <Input size="lg" placeholder="Large" />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="states"
        title="States"
        description={
          <>
            Native hover and focus work in the browser. The{" "}
            <code>visualState</code> prop exists so docs, tests, and controlled
            previews can render the same state matrix found in Figma.
          </>
        }
      >
        <DocsExample title="Default">
          <ComponentPreview code={inputExample("InputStateDefaultExample", `<Input label="Default" placeholder="Any" />`)}>
            <div style={fieldWidth}>
              <Input label="Default" placeholder="Any" />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Hover">
          <ComponentPreview code={inputExample("InputStateHoverExample", `<Input label="Hover" placeholder="Any" visualState="hover" />`)}>
            <div style={fieldWidth}>
              <Input label="Hover" placeholder="Any" visualState="hover" />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Focus">
          <ComponentPreview code={inputExample("InputStateFocusExample", `<Input label="Focus" defaultValue="Any" visualState="focus" />`)}>
            <div style={fieldWidth}>
              <Input label="Focus" defaultValue="Any" visualState="focus" />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Filled">
          <ComponentPreview code={inputExample("InputStateFilledExample", `<Input label="Filled" defaultValue="Any" />`)}>
            <div style={fieldWidth}>
              <Input label="Filled" defaultValue="Any" />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Error">
          <ComponentPreview code={inputExample("InputStateErrorExample", `<Input label="Error" defaultValue="Any" error="Error message goes here." />`)}>
            <div style={fieldWidth}>
              <Input label="Error" defaultValue="Any" error="Error message goes here." />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Not editable">
          <ComponentPreview code={inputExample("InputStateReadOnlyExample", `<Input label="Not editable" defaultValue="Any" readOnly />`)}>
            <div style={fieldWidth}>
              <Input label="Not editable" defaultValue="Any" readOnly />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Disabled">
          <ComponentPreview code={inputExample("InputStateDisabledExample", `<Input label="Disabled" defaultValue="Any" disabled />`)}>
            <div style={fieldWidth}>
              <Input label="Disabled" defaultValue="Any" disabled />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="label-and-helper-content"
        title="Label and helper content"
        description="Labels, required markers, helper text, and errors live outside the field primitive."
      >
        <DocsExample title="Helper text and error text">
          <ComponentPreview code={inputExample("InputHelperExample", `(
    <div>
      <Input label="Email" required hint="Use your work email." placeholder="you@example.com" />
      <Input label="Email" error="Enter a valid email address." defaultValue="bad-email" />
    </div>
  )`)}>
            <div style={stack}>
              <Input label="Email" required hint="Use your work email." placeholder="you@example.com" />
              <Input label="Email" error="Enter a valid email address." defaultValue="bad-email" />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="text-area"
        title="Text area"
        description="Textarea uses the same wrapper, states, helper text, and error model as Input."
      >
        <DocsExample title="Default textarea">
          <ComponentPreview code={inputExample("TextAreaDefaultExample", `<TextArea label="Text Area" placeholder="Type to search" characterCounter maxLength={500} />`, "TextArea")}>
            <div style={{ width: "min(100%, 420px)" }}>
              <TextArea label="Text Area" placeholder="Type to search" characterCounter maxLength={500} />
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Textarea error">
          <ComponentPreview code={inputExample("TextAreaErrorExample", `<TextArea label="Text Area" defaultValue="Bad text" error="Error message goes here." maxLength={500} characterCounter />`, "TextArea")}>
            <div style={{ width: "min(100%, 420px)" }}>
              <TextArea label="Text Area" defaultValue="Bad text" error="Error message goes here." maxLength={500} characterCounter />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="form-composition"
        title="Form composition"
        description={
          <>
            Use <code>FormField</code> to wrap any control — Input, Checkbox, or Radio — with
            a shared label, hint, error, and required marker. The label/hint model is built into
            Input directly, but FormField is useful when composing mixed controls in the same form.
          </>
        }
      >
        <DocsExample title="Input with FormField">
          <ComponentPreview code={`import { Input, FormField } from "@maxa/ui"

<FormField label="Email" htmlFor="email" hint="We will never share it." required>
  <Input id="email" type="email" placeholder="you@example.com" />
</FormField>`}>
            <div style={fieldWidth}>
              <FormField label="Email" htmlFor="email-fc" hint="We will never share it." required>
                <Input id="email-fc" type="email" placeholder="you@example.com" />
              </FormField>
            </div>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="FormField with error">
          <ComponentPreview code={`<FormField label="Password" htmlFor="pwd" error="Must be at least 12 characters.">
  <Input id="pwd" type="password" />
</FormField>`}>
            <div style={fieldWidth}>
              <FormField label="Password" htmlFor="pwd-fc" error="Must be at least 12 characters.">
                <Input id="pwd-fc" type="password" />
              </FormField>
            </div>
          </ComponentPreview>
        </DocsExample>

      </DocsSection>

      <DocsSection
        id="api-reference"
        title="API reference"
        description={
          <>
            All native <code>&lt;input&gt;</code> attributes are forwarded to the
            underlying element. Textarea-specific attributes are available on{" "}
            <code>TextArea</code>. Select and date picker should be built as
            separate form components that reuse the same label, helper, and error
            model.
          </>
        }
      >
        <PropsTable props={INPUT_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
