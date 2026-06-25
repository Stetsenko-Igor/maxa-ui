import type { Metadata } from "next"
import { Button } from "@maxa/ui"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"
import { ComponentPreview } from "../../../_components/component-preview"

export const metadata: Metadata = { title: "Interactive Hierarchy - MAXA UI" }

const TOC = [
  { href: "#rule", label: "Rule" },
  { href: "#decision-tree", label: "Decision tree" },
  { href: "#patterns", label: "Patterns" },
  { href: "#anti-patterns", label: "Anti-patterns" },
]

const card: React.CSSProperties = {
  display: "grid",
  gap: "10px",
  padding: "16px",
  border: "1px solid var(--color-border-secondary)",
  borderRadius: "var(--radius-md)",
  background: "var(--color-bg-surface)",
}

const title: React.CSSProperties = {
  margin: 0,
  color: "var(--color-text-primary)",
  fontSize: "var(--text-md)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--text-md--line-height)",
}

const text: React.CSSProperties = {
  margin: 0,
  color: "var(--color-text-secondary)",
  fontSize: "var(--text-sm)",
  lineHeight: "var(--text-sm--line-height)",
}

export default function InteractiveHierarchyPage() {
  return (
    <DocsPageLayout
      eyebrow="Patterns"
      title="Interactive Hierarchy"
      toc={TOC}
      lead={<>Button hierarchy rules for MAXA product surfaces. Each view gets one primary action; supporting commands step down to secondary, outline, ghost, or link.</>}
    >
      <DocsPageSection id="rule" title="Core Rule">
        <div style={{ ...card, borderLeft: "3px solid var(--color-action-primary)" }}>
          <p style={title}>One primary action per view.</p>
          <p style={text}>When every action is primary, no action is primary. Reserve blue emphasis for the main thing the user should do next.</p>
        </div>
      </DocsPageSection>

      <DocsPageSection id="decision-tree" title="Decision Tree">
        <pre style={{ margin: 0, padding: "16px", borderRadius: "var(--radius-md)", background: "var(--color-bg-muted)", overflowX: "auto" }}>
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-primary)" }}>{`Main thing on this view?
YES -> primary
NO  -> common support action? -> secondary
NO  -> needs a border?       -> outline
NO  -> inline/list action?    -> ghost
NO  -> navigation text?       -> link`}</code>
        </pre>
      </DocsPageSection>

      <DocsPageSection id="patterns" title="Common Patterns">
        <div style={{ display: "grid", gap: "16px" }}>
          <ComponentPreview code={`<Button variant="outline">Cancel</Button>\n<Button variant="primary">Save</Button>`}>
            <div style={{ display: "flex", gap: "8px", padding: "16px" }}>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save</Button>
            </div>
          </ComponentPreview>
          <ComponentPreview code={`<Button variant="ghost">Filter</Button>\n<Button variant="ghost">Export</Button>\n<Button variant="primary">New item</Button>`}>
            <div style={{ display: "flex", gap: "8px", padding: "16px", flexWrap: "wrap" }}>
              <Button variant="ghost">Filter</Button>
              <Button variant="ghost">Export</Button>
              <Button variant="primary">New item</Button>
            </div>
          </ComponentPreview>
          <ComponentPreview code={`<Button variant="outline">Keep</Button>\n<Button variant="danger">Delete</Button>`}>
            <div style={{ display: "flex", gap: "8px", padding: "16px" }}>
              <Button variant="outline">Keep</Button>
              <Button variant="danger">Delete</Button>
            </div>
          </ComponentPreview>
        </div>
      </DocsPageSection>

      <DocsPageSection id="anti-patterns" title="Anti-Patterns">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
          {[
            ["Two primary buttons", "Demote one action to secondary or outline."],
            ["Primary in every card", "Use ghost or outline inside repeated cards."],
            ["Danger for cancel", "Danger is destructive only; cancel is outline."],
            ["Success as style", "Use success only when the outcome is semantically positive."],
          ].map(([bad, fix]) => (
            <div key={bad} style={card}>
              <p style={title}>{bad}</p>
              <p style={text}>{fix}</p>
            </div>
          ))}
        </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
