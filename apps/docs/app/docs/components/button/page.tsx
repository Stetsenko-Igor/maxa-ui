import type { Metadata } from "next"
import { Button } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Button - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#variants", label: "Variants" },
  { href: "#sizes", label: "Sizes" },
  { href: "#disabled", label: "Disabled" },
  { href: "#loading", label: "Loading" },
  { href: "#with-icons", label: "With icons" },
  { href: "#as-child", label: "asChild" },
  { href: "#api-reference", label: "API reference" },
]

const BUTTON_PROPS = [
  { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'danger'", default: "'primary'", description: "The visual style of the button." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: "Controls height, padding, and font size." },
  { name: "loading", type: "boolean", default: "false", description: "Replaces content with a spinner and disables the button." },
  { name: "asChild", type: "boolean", default: "false", description: "Merges button props onto the immediate child element." },
  { name: "leadingIcon", type: "ReactNode", default: undefined, description: "Icon rendered before the label." },
  { name: "trailingIcon", type: "ReactNode", default: undefined, description: "Icon rendered after the label." },
  { name: "iconOnly", type: "boolean", default: "false", description: "Square layout. Use when there is no label." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the button. Applies 50% opacity to the whole element." },
]

const BUTTON_MARKDOWN = `# Button

A multi-variant interactive element for actions.

## Installation

\`\`\`tsx
import { Button } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<Button>Button</Button>
\`\`\`
`

const GITHUB_BUTTON_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/button"

export default function ButtonPage() {
  return (
    <ComponentPage
      title="Button"
      toc={TOC}
      githubHref={GITHUB_BUTTON_URL}
      markdown={BUTTON_MARKDOWN}
      next={{ href: "/docs/components/input", label: "Input" }}
      lead={
        <>
          A multi-variant interactive element. Supports seven visual variants,
          four sizes, loading state, leading and trailing icons, and polymorphic
          rendering via <code>asChild</code>.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Button } from "@maxa/ui"\n\n<Button>Button</Button>`}>
            <Button>Button</Button>
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
          imports={`import { Button } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Button>Button</Button>`}
        />
      </DocsSection>

      <DocsSection
        id="variants"
        title="Variants"
        description={
          <>
            Seven variants cover the full action hierarchy. Use{" "}
            <code>primary</code> for the main CTA, usually once per view.
          </>
        }
      >
        <DocsExample title="All variants">
          <ComponentPreview code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>`}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="sizes"
        title="Sizes"
        description={
          <>
            Four sizes: <code>xs</code> 24px, <code>sm</code> 28px,{" "}
            <code>md</code> 36px, and <code>lg</code> 48px.
          </>
        }
      >
        <DocsExample title="All sizes">
          <ComponentPreview code={`<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}>
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="disabled"
        title="Disabled"
        description={
          <>
            Applies <code>opacity: 0.5</code> to the whole element. No
            individual property overrides.
          </>
        }
      >
        <ComponentPreview code={`<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="outline" disabled>Outline</Button>`}>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="outline" disabled>Outline</Button>
        </ComponentPreview>
      </DocsSection>

      <DocsSection title="Loading" id="loading" description="Replaces content with a spinner. Button stays the same size.">
        <ComponentPreview code={`<Button variant="primary" loading>Saving...</Button>
<Button variant="secondary" loading>Loading</Button>
<Button variant="outline" loading>Processing</Button>`}>
          <Button variant="primary" loading>Saving...</Button>
          <Button variant="secondary" loading>Loading</Button>
          <Button variant="outline" loading>Processing</Button>
        </ComponentPreview>
      </DocsSection>

      <DocsSection
        id="with-icons"
        title="With icons"
        description={
          <>
            Pass any React node as <code>leadingIcon</code> or{" "}
            <code>trailingIcon</code>.
          </>
        }
      >
        <ComponentPreview code={`<Button variant="primary" leadingIcon={<PlusIcon />}>New item</Button>
<Button variant="outline" trailingIcon={<ArrowRightIcon />}>Continue</Button>
<Button variant="ghost" leadingIcon={<DownloadIcon />}>Export</Button>`}>
          <Button variant="primary" leadingIcon={<PlusIcon />}>New item</Button>
          <Button variant="outline" trailingIcon={<ArrowRightIcon />}>Continue</Button>
          <Button variant="ghost" leadingIcon={<DownloadIcon />}>Export</Button>
        </ComponentPreview>
      </DocsSection>

      <DocsSection
        id="as-child"
        title="Polymorphic asChild"
        description={
          <>
            Renders button styles on any element. Useful for Next.js{" "}
            <code>Link</code> or anchor tags.
          </>
        }
      >
        <ComponentPreview code={`import Link from "next/link"\n\n<Button asChild variant="outline">\n  <Link href="/docs/introduction">Back to intro</Link>\n</Button>`}>
          <Button asChild variant="outline">
            <a href="/docs/introduction">Back to intro</a>
          </Button>
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={BUTTON_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
