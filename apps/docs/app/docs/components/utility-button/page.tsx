import type { Metadata } from "next"
import { UtilityButton } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Utility Button - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sizes", label: "Sizes" },
  { href: "#states", label: "States" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "icon", type: "React.ReactNode", default: undefined, description: "Icon-only content." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Square button size." },
  { name: "selected", type: "boolean", default: "false", description: "Pressed visual state." },
  { name: "aria-label", type: "string", default: undefined, description: "Required accessible label for icon-only actions." },
]

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

export default function UtilityButtonPage() {
  return (
    <ComponentPage
      title="Utility Button"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/utility-button"
      markdown=""
      previous={{ href: "/docs/components/toggle", label: "Toggle" }}
      next={{ href: "/docs/components/tooltip", label: "Tooltip" }}
      lead="Icon-only square action for toolbars, compact controls, and utility surfaces."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`<UtilityButton aria-label="Grid view" icon={<GridIcon />} selected />`}>
            <div style={{ display: "flex", gap: "8px", padding: "32px" }}>
              <UtilityButton aria-label="Grid view" icon={<GridIcon />} selected />
              <UtilityButton aria-label="List view" icon={<ListIcon />} />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { UtilityButton } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<UtilityButton aria-label="Grid view" icon={<GridIcon />} />`}
        />
      </DocsSection>

      <DocsSection id="sizes" title="Sizes">
        <DocsExample title="sm, md, lg">
          <ComponentPreview code={`<UtilityButton size="sm" aria-label="Grid view" icon={<GridIcon />} />\n<UtilityButton aria-label="Grid view" icon={<GridIcon />} />\n<UtilityButton size="lg" aria-label="Grid view" icon={<GridIcon />} />`}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "32px" }}>
              <UtilityButton size="sm" aria-label="Small grid view" icon={<GridIcon />} />
              <UtilityButton aria-label="Medium grid view" icon={<GridIcon />} />
              <UtilityButton size="lg" aria-label="Large grid view" icon={<GridIcon />} />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="states" title="States">
        <DocsExample title="Default, hover, pressed, disabled">
          <ComponentPreview code={`<UtilityButton aria-label="Default grid view" icon={<GridIcon />} />\n<UtilityButton aria-label="Pressed grid view" icon={<GridIcon />} selected />\n<UtilityButton aria-label="Disabled grid view" icon={<GridIcon />} disabled />`}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "32px" }}>
              <UtilityButton aria-label="Default grid view" icon={<GridIcon />} />
              <UtilityButton aria-label="Pressed grid view" icon={<GridIcon />} selected />
              <UtilityButton aria-label="Disabled grid view" icon={<GridIcon />} disabled />
              <UtilityButton aria-label="List view" icon={<ListIcon />} />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
