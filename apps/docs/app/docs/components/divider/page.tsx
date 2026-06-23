import type { Metadata } from "next"
import { Divider } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { DividerDefaultPreview } from "./divider-default-preview"

export const metadata: Metadata = { title: "Divider - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#orientation", label: "Orientation" },
  { href: "#decorative", label: "Decorative vs semantic" },
  { href: "#api-reference", label: "API reference" },
]

const DIVIDER_PROPS = [
  { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Horizontal fills the parent width; vertical fills the parent height (place inside a flex row)." },
  { name: "decorative", type: "boolean", default: "true", description: "When true, renders role=none (hidden from AT). When false, renders role=separator with aria-orientation." },
]

const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "320px" }
const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: "12px", height: "20px" }

export default function DividerPage() {
  return (
    <ComponentPage
      title="Divider"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/divider"
      markdown=""
      previous={{ href: "/docs/components/dialog", label: "Dialog" }}
      next={{ href: "/docs/components/drawer", label: "Drawer" }}
      lead={
        <>
          A thin rule that divides groups of content. Horizontal or vertical,
          decorative by default, built on Radix Separator.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <DividerDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Divider } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Divider />`}
        />
      </DocsSection>

      <DocsSection
        id="orientation"
        title="Orientation"
        description="Horizontal (default) fills the parent width. Vertical fills the parent height — place it inside a flex row."
      >
        <DocsExample title="Horizontal">
          <ComponentPreview code={`<Divider orientation="horizontal" />`}>
            <div style={col}>
              <span>Above</span>
              <Divider orientation="horizontal" />
              <span>Below</span>
            </div>
          </ComponentPreview>
        </DocsExample>
        <DocsExample title="Vertical">
          <ComponentPreview code={`<div style={{ display: "flex", alignItems: "center", gap: 12, height: 20 }}>
  <span>Edit</span>
  <Divider orientation="vertical" />
  <span>Duplicate</span>
  <Divider orientation="vertical" />
  <span>Delete</span>
</div>`}>
            <div style={row}>
              <span>Edit</span>
              <Divider orientation="vertical" />
              <span>Duplicate</span>
              <Divider orientation="vertical" />
              <span>Delete</span>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="decorative"
        title="Decorative vs semantic"
        description="Decorative (default) rules are hidden from assistive technology (role=none). Set decorative={false} when the divide carries structural meaning — Radix then emits role=separator."
      >
        <DocsExample title="Semantic divider">
          <ComponentPreview code={`<Divider decorative={false} />`}>
            <div style={col}>
              <span>Group A</span>
              <Divider decorative={false} />
              <span>Group B</span>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={DIVIDER_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
