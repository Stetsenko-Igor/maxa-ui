import type { Metadata } from "next"
import { IconButton } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "IconButton - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#variants", label: "Variants" },
  { href: "#sizes", label: "Sizes" },
  { href: "#disabled", label: "Disabled" },
  { href: "#api-reference", label: "API reference" },
]

const ICON_BUTTON_PROPS = [
  { name: "icon", type: "ReactNode", default: undefined, description: "Icon to display. Wrap SVG in 16×16 bounds." },
  { name: "aria-label", type: "string", default: undefined, description: "Accessible label — required since there is no visible text." },
  { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", default: "'secondary'", description: "The visual style of the button." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: "Controls height, padding, and icon bounds." },
  { name: "loading", type: "boolean", default: "false", description: "Replaces content with a spinner and disables the button." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the button. Applies 50% opacity to the whole element." },
]

const ICON_BUTTON_MARKDOWN = `# IconButton

A square icon-only button for compact action targets.

## Installation

\`\`\`tsx
import { IconButton } from "@maxa/ui"
import "@maxa/tokens/theme.css"
\`\`\`

## Usage

\`\`\`tsx
<IconButton icon={<PlusIcon />} aria-label="Add" />
\`\`\`
`

const GITHUB_URL = "https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/icon-button"

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "16px" }

export default function IconButtonPage() {
  return (
    <ComponentPage
      title="IconButton"
      toc={TOC}
      githubHref={GITHUB_URL}
      markdown={ICON_BUTTON_MARKDOWN}
      previous={{ href: "/docs/components/button", label: "Button" }}
      next={{ href: "/docs/components/checkbox", label: "Checkbox" }}
      lead={
        <>
          A square button that renders a single icon. Shares all variants and
          sizes with <code>Button</code> but enforces an accessible{" "}
          <code>aria-label</code> in place of visible text.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { IconButton } from "@maxa/ui"\n\n<IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" />`}>
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" />
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
          imports={`import { IconButton } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<IconButton icon={<PlusIcon />} aria-label="Add" />`}
        />
      </DocsSection>

      <DocsSection
        id="variants"
        title="Variants"
        description={
          <>
            Five variants mirror the <code>Button</code> hierarchy. Use{" "}
            <code>secondary</code> as the default for icon-only actions.
          </>
        }
      >
        <DocsExample title="All variants">
          <ComponentPreview code={`<IconButton icon={<PlusIcon />} aria-label="Add" variant="primary" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="outline" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="ghost" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="danger" />`}>
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="primary" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="outline" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="ghost" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="danger" />
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
          <ComponentPreview code={`<IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" size="xs" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" size="sm" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" size="md" />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" size="lg" />`}>
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" size="xs" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" size="sm" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" size="md" />
            <IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" size="lg" />
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
        <ComponentPreview code={`<IconButton icon={<PlusIcon />} aria-label="Add" variant="primary" disabled />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" disabled />
<IconButton icon={<PlusIcon />} aria-label="Add" variant="outline" disabled />`}>
          <IconButton icon={<PlusIcon />} aria-label="Add" variant="primary" disabled />
          <IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" disabled />
          <IconButton icon={<PlusIcon />} aria-label="Add" variant="outline" disabled />
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={ICON_BUTTON_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
