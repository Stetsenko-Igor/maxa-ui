import type { Metadata } from "next"
import { Tag } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Tag - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#appearance", label: "Appearance" },
  { href: "#emphasis", label: "Emphasis" },
  { href: "#removable", label: "Removable" },
  { href: "#sizes", label: "Sizes" },
  { href: "#with-icon", label: "With icon" },
  { href: "#api-reference", label: "API reference" },
]

const TAG_PROPS = [
  { name: "appearance", type: "'gray' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'", default: "'gray'", description: "Decorative color. 14 options matching the Badge appearance palette." },
  { name: "emphasis", type: "'low' | 'medium' | 'high'", default: "'low'", description: "Visual weight. Low = subtle tint; medium = stronger tint; high = solid background with inverse text." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Height 20px (sm), 24px (md), 28px (lg)." },
  { name: "removable", type: "boolean", default: "false", description: "Shows a × remove button. Use with onRemove." },
  { name: "onRemove", type: "() => void", default: undefined, description: "Called when the remove button is clicked or activated via keyboard." },
  { name: "icon", type: "ReactNode", default: undefined, description: "Leading icon. Rendered aria-hidden." },
  { name: "asChild", type: "boolean", default: "false", description: "Merge props onto a custom child element via Radix Slot. Not compatible with removable." },
]

const APPEARANCES = (["gray","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"] as const)

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }
const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "12px" }

export default function TagPage() {
  return (
    <ComponentPage
      title="Tag"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/tag"
      markdown=""
      previous={{ href: "/docs/components/badge", label: "Badge" }}
      next={{ href: "/docs/components/button", label: "Button" }}
      lead={
        <>
          A compact removable data label for user-defined categories and applied values.
          14 decorative colors, three emphasis levels, three sizes, and no semantic intent.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Tag } from "@maxa/ui"\n\n<Tag appearance="violet" removable onRemove={() => {}}>Customers</Tag>`}>
            <div style={row}>
              <Tag appearance="gray">Segment</Tag>
              <Tag appearance="blue" removable>Audience</Tag>
              <Tag appearance="violet" emphasis="high" removable>VIP</Tag>
              <Tag appearance="teal">Prague</Tag>
              <Tag appearance="rose" removable>Luxury</Tag>
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
          imports={`import { Tag } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Tag appearance="violet" removable onRemove={() => {}}>Customers</Tag>`}
        />
      </DocsSection>

      <DocsSection
        id="appearance"
        title="Appearance"
        description="14 decorative colors for user-defined labels. Same palette as Badge."
      >
        <DocsExample title="All appearances (low emphasis)">
          <ComponentPreview code={`<Tag appearance="violet">Customers</Tag>`}>
            <div style={row}>
              {APPEARANCES.map(a => (
                <Tag key={a} appearance={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</Tag>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="emphasis"
        title="Emphasis"
        description="Low (default) uses a subtle tinted background. Medium is a stronger tint. High uses a solid background with white text."
      >
        <DocsExample title="Low, medium, high">
          <ComponentPreview code={`<Tag appearance="violet" emphasis="low">Low</Tag>\n<Tag appearance="violet" emphasis="medium">Medium</Tag>\n<Tag appearance="violet" emphasis="high">High</Tag>`}>
            <div style={col}>
              <div style={row}>
                {APPEARANCES.map(a => (
                  <Tag key={a} appearance={a} emphasis="low">{a.charAt(0).toUpperCase() + a.slice(1)}</Tag>
                ))}
              </div>
              <div style={row}>
                {APPEARANCES.map(a => (
                  <Tag key={a} appearance={a} emphasis="medium">{a.charAt(0).toUpperCase() + a.slice(1)}</Tag>
                ))}
              </div>
              <div style={row}>
                {APPEARANCES.map(a => (
                  <Tag key={a} appearance={a} emphasis="high">{a.charAt(0).toUpperCase() + a.slice(1)}</Tag>
                ))}
              </div>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="removable"
        title="Removable"
        description="Add a × button to allow users to dismiss a tag. The remove button is keyboard-accessible and stopsPropagation."
      >
        <DocsExample title="With remove button">
          <ComponentPreview code={`<Tag appearance="violet" removable onRemove={() => console.log('removed')}>
  Customers
</Tag>`}>
            <div style={row}>
              {((["gray","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"] as const)).map(a => (
                <Tag key={a} appearance={a} removable>{a.charAt(0).toUpperCase() + a.slice(1)}</Tag>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
        <DocsExample title="High emphasis + removable">
          <ComponentPreview code={`<Tag appearance="violet" emphasis="high" removable onRemove={() => {}}>VIP</Tag>`}>
            <div style={row}>
              {((["gray","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"] as const)).map(a => (
                <Tag key={a} appearance={a} emphasis="high" removable>{a.charAt(0).toUpperCase() + a.slice(1)}</Tag>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="sizes"
        title="Sizes"
        description={<>Three sizes: <code>sm</code> (20px), <code>md</code> (24px, default), <code>lg</code> (28px).</>}
      >
        <DocsExample title="sm, md, lg">
          <ComponentPreview code={`<Tag size="sm" appearance="violet">Small</Tag>\n<Tag size="md" appearance="violet">Medium</Tag>\n<Tag size="lg" appearance="violet">Large</Tag>`}>
            <div style={row}>
              <Tag size="sm" appearance="violet" removable>Small</Tag>
              <Tag size="md" appearance="violet" removable>Medium</Tag>
              <Tag size="lg" appearance="violet" removable>Large</Tag>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="with-icon"
        title="With icon"
        description="Use icon for a leading visual. Icons are decorative — always include a text label."
      >
        <DocsExample title="Leading dot icon">
          <ComponentPreview code={`<Tag appearance="violet" icon={<span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />} removable>
  Customers
</Tag>`}>
            <div style={row}>
              {((["gray","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"] as const)).map(a => (
                <Tag
                  key={a}
                  appearance={a}
                  removable
                  icon={
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                  }
                >
                  {a.charAt(0).toUpperCase() + a.slice(1)}
                </Tag>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={TAG_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
