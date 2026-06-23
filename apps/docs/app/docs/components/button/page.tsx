import type { Metadata } from "next"
import { Button, IconButton } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { ButtonDefaultPreview } from "./button-default-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Button - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#variants", label: "Variants" },
  { href: "#sizes", label: "Sizes" },
  { href: "#with-icons", label: "With icons" },
  { href: "#icon-button", label: "Icon button" },
  { href: "#loading", label: "Loading" },
  { href: "#disabled", label: "Disabled" },
  { href: "#as-child", label: "asChild" },
  { href: "#api-reference", label: "API reference" },
]

const BUTTON_PROPS = [
  { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'danger'", default: "'primary'", description: "Visual hierarchy." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: "Height, padding, and font size." },
  { name: "iconLeading", type: "ReactNode", default: undefined, description: "Icon before the label." },
  { name: "iconTrailing", type: "ReactNode", default: undefined, description: "Icon after the label." },
  { name: "iconOnly", type: "boolean", default: "false", description: "Square layout, no label. Always pair with aria-label." },
  { name: "loading", type: "boolean", default: "false", description: "Shows spinner, disables interaction." },
  { name: "asChild", type: "boolean", default: "false", description: "Merges props onto the child element (Radix Slot)." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
]

const ICON_BUTTON_PROPS = [
  { name: "icon", type: "ReactNode", default: undefined, description: "Required. Icon to display." },
  { name: "aria-label", type: "string", default: undefined, description: "Required. Accessible label for screen readers." },
  { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'danger'", default: "'secondary'", description: "Visual style." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: "Square size." },
  { name: "loading", type: "boolean", default: "false", description: "Shows spinner." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
]

const GITHUB_BUTTON_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/button"

const BUTTON_MARKDOWN = `# Button

Actions, navigation, and form submission. Seven variants, four sizes, icon support, and a dedicated IconButton wrapper for icon-only use cases.

## Installation

\`\`\`tsx
import { Button, IconButton } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<Button variant="primary">Save changes</Button>
\`\`\`
`

export default function ButtonPage() {
  return (
    <ComponentPage
      title="Button"
      toc={TOC}
      githubHref={GITHUB_BUTTON_URL}
      markdown={BUTTON_MARKDOWN}
      next={{ href: "/docs/components/checkbox", label: "Checkbox" }}
      lead={
        <>
          Actions, navigation, and form submission. Seven variants, four sizes,
          icon support, and a dedicated <code>IconButton</code> wrapper for
          icon-only use cases.
        </>
      }
    >
      {/* Preview */}
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ButtonDefaultPreview />
        </DocsExample>
      </section>

      {/* Installation */}
      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Button, IconButton } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Button variant="primary">Save changes</Button>`}
        />
      </DocsSection>

      {/* Variants */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Seven variants map to the action hierarchy. Use primary once per view for the main call-to-action."
      >
        <DocsExample title="Action variants">
          <ComponentPreview code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Semantic variants">
          <ComponentPreview code={`<Button variant="success">Confirm</Button>
<Button variant="danger">Delete</Button>`}>
            <Button variant="success">Confirm</Button>
            <Button variant="danger">Delete</Button>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      {/* Sizes */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Four sizes from xs (24 px) to lg (48 px). Mix sizes intentionally — match the surrounding content density."
      >
        <ComponentPreview code={`<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}>
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ComponentPreview>
      </DocsSection>

      {/* With icons */}
      <DocsSection
        id="with-icons"
        title="With icons"
        description={<>Pass any React node to <code>iconLeading</code> or <code>iconTrailing</code>.</>}
      >
        <DocsExample title="Leading icon">
          <ComponentPreview code={`<Button variant="primary" iconLeading={<PlusIcon />}>New item</Button>
<Button variant="secondary" iconLeading={<DownloadIcon />}>Export</Button>
<Button variant="ghost" iconLeading={<DownloadIcon />}>Download</Button>`}>
            <Button variant="primary" iconLeading={<PlusIcon />}>New item</Button>
            <Button variant="secondary" iconLeading={<DownloadIcon />}>Export</Button>
            <Button variant="ghost" iconLeading={<DownloadIcon />}>Download</Button>
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Trailing icon">
          <ComponentPreview code={`<Button variant="primary" iconTrailing={<ArrowRightIcon />}>Continue</Button>
<Button variant="outline" iconTrailing={<ArrowRightIcon />}>Next step</Button>`}>
            <Button variant="primary" iconTrailing={<ArrowRightIcon />}>Continue</Button>
            <Button variant="outline" iconTrailing={<ArrowRightIcon />}>Next step</Button>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      {/* Icon button */}
      <DocsSection
        id="icon-button"
        title="Icon button"
        description={
          <>
            <code>IconButton</code> is a purpose-built wrapper that enforces{" "}
            <code>aria-label</code> at the type level. Use it whenever there is
            no visible label. You can also use <code>Button</code> with{" "}
            <code>iconOnly</code> directly.
          </>
        }
      >
        <DocsExample title="Variants">
          <ComponentPreview code={`import { IconButton } from "@maxa/ui"

<IconButton icon={<PlusIcon />} aria-label="Add" variant="primary" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="outline" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="ghost" />
<IconButton icon={<TrashIcon />} aria-label="Delete" variant="danger" />`}>
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="primary" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="outline" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="ghost" />
            <IconButton icon={<TrashIcon />} aria-label="Delete" variant="danger" />
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Sizes">
          <ComponentPreview code={`<IconButton icon={<PlusIcon />} aria-label="Add" size="xs" />
<IconButton icon={<PlusIcon />} aria-label="Add" size="sm" />
<IconButton icon={<PlusIcon />} aria-label="Add" size="md" />
<IconButton icon={<PlusIcon />} aria-label="Add" size="lg" />`}>
            <IconButton icon={<PlusIcon />} aria-label="Add" size="xs" />
            <IconButton icon={<PlusIcon />} aria-label="Add" size="sm" />
            <IconButton icon={<PlusIcon />} aria-label="Add" size="md" />
            <IconButton icon={<PlusIcon />} aria-label="Add" size="lg" />
          </ComponentPreview>
        </DocsExample>

        <DocsExample title="Using Button directly">
          <ComponentPreview code={`<Button iconOnly iconLeading={<PlusIcon />} variant="primary" aria-label="Add" />
<Button iconOnly iconLeading={<EditIcon />} variant="secondary" aria-label="Edit" />
<Button iconOnly iconLeading={<TrashIcon />} variant="ghost" aria-label="Delete" />`}>
            <Button iconOnly iconLeading={<PlusIcon />} variant="primary" aria-label="Add" />
            <Button iconOnly iconLeading={<EditIcon />} variant="secondary" aria-label="Edit" />
            <Button iconOnly iconLeading={<TrashIcon />} variant="ghost" aria-label="Delete" />
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      {/* Loading */}
      <DocsSection id="loading" title="Loading" description="Replaces content with a spinner. Button stays the same size and disables interaction.">
        <ComponentPreview code={`<Button variant="primary" loading>Saving…</Button>
<Button variant="secondary" loading>Loading</Button>
<Button variant="outline" loading>Processing</Button>
<IconButton icon={<PlusIcon />} aria-label="Add" loading />`}>
          <Button variant="primary" loading>Saving…</Button>
          <Button variant="secondary" loading>Loading</Button>
          <Button variant="outline" loading>Processing</Button>
          <IconButton icon={<PlusIcon />} aria-label="Add" loading />
        </ComponentPreview>
      </DocsSection>

      {/* Disabled */}
      <DocsSection
        id="disabled"
        title="Disabled"
        description="Applies 50% opacity. No individual property overrides."
      >
        <ComponentPreview code={`<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="outline" disabled>Outline</Button>
<IconButton icon={<PlusIcon />} aria-label="Add" disabled />`}>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="outline" disabled>Outline</Button>
          <IconButton icon={<PlusIcon />} aria-label="Add" disabled />
        </ComponentPreview>
      </DocsSection>

      {/* asChild */}
      <DocsSection
        id="as-child"
        title="Polymorphic asChild"
        description={<>Renders button styles on any element via Radix <code>Slot</code>. Useful for Next.js <code>Link</code> or anchor tags.</>}
      >
        <ComponentPreview code={`import Link from "next/link"\n\n<Button asChild variant="outline">\n  <Link href="/docs/introduction">Back to intro</Link>\n</Button>`}>
          <Button asChild variant="outline">
            <a href="/docs/introduction">Back to intro</a>
          </Button>
        </ComponentPreview>
      </DocsSection>

      {/* API reference */}
      <DocsSection id="api-reference" title="API reference">
        <DocsExample title="Button">
          <PropsTable props={BUTTON_PROPS} />
        </DocsExample>
        <DocsExample title="IconButton">
          <PropsTable props={ICON_BUTTON_PROPS} />
        </DocsExample>
      </DocsSection>
    </ComponentPage>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}
