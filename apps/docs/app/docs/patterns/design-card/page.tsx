import type { Metadata } from "next"
import { Badge } from "@maxa/ui"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"
import { ComponentPreview } from "../../../_components/component-preview"

export const metadata: Metadata = { title: "Design Card - MAXA UI" }

const TOC = [
  { href: "#design-card", label: "Design Card" },
  { href: "#template-card", label: "Template Card" },
  { href: "#masonry", label: "Masonry grid" },
  { href: "#rules", label: "Rules" },
]

const surface: React.CSSProperties = {
  padding: "20px",
  background: "var(--color-bg-muted)",
  borderRadius: "var(--radius-md)",
}

const cardGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "16px",
}

const card: React.CSSProperties = {
  borderRadius: "var(--radius-2xl)",
  overflow: "hidden",
  background: "var(--color-bg-surface)",
  border: "1px solid var(--color-border-secondary)",
  boxShadow: "var(--shadow-sm)",
  transition: "box-shadow var(--duration-base) var(--easing-standard)",
}

const thumbnail: React.CSSProperties = {
  position: "relative",
  aspectRatio: "4/3",
  overflow: "hidden",
  background: "var(--color-bg-muted)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const thumbnailLabel: React.CSSProperties = {
  color: "var(--color-text-tertiary)",
  fontSize: "var(--text-sm)",
}

const thumbnailBadge: React.CSSProperties = {
  position: "absolute",
  top: "8px",
  left: "8px",
}

const cardMeta: React.CSSProperties = {
  padding: "10px 12px 12px",
}

const cardTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "var(--text-md)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--text-md--line-height)",
  color: "var(--color-text-primary)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}

const cardSubtitle: React.CSSProperties = {
  margin: "2px 0 0",
  fontSize: "var(--text-sm)",
  lineHeight: "var(--text-sm--line-height)",
  color: "var(--color-text-tertiary)",
}

const templateCard: React.CSSProperties = {
  borderRadius: "var(--radius-xl)",
  overflow: "hidden",
  background: "var(--color-bg-surface)",
  border: "1px solid var(--color-border-secondary)",
}

const templateThumb: (h: number) => React.CSSProperties = (h) => ({
  height: `${h}px`,
  background: "var(--color-bg-muted)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const templateMeta: React.CSSProperties = {
  padding: "8px 10px 10px",
}

const templateTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "var(--text-sm)",
  fontWeight: "var(--font-weight-medium)",
  color: "var(--color-text-primary)",
}

const templateCategory: React.CSSProperties = {
  margin: "2px 0 0",
  fontSize: "var(--text-sm)",
  color: "var(--color-text-tertiary)",
}

const masonryGrid: React.CSSProperties = {
  columns: 3,
  gap: "12px",
  columnGap: "12px",
}

const masonryItem: React.CSSProperties = {
  breakInside: "avoid",
  marginBottom: "12px",
}

const note: React.CSSProperties = {
  margin: "10px 0 0",
  color: "var(--color-text-tertiary)",
  fontSize: "var(--text-sm)",
  lineHeight: "var(--text-sm--line-height)",
}

const rulesGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "12px",
}

const ruleCard: React.CSSProperties = {
  padding: "14px",
  border: "1px solid var(--color-border-secondary)",
  borderRadius: "var(--radius-md)",
  background: "var(--color-bg-surface)",
}

const ruleTitle: React.CSSProperties = {
  margin: "0 0 6px",
  color: "var(--color-text-primary)",
  fontSize: "var(--text-md)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--text-md--line-height)",
}

const ruleText: React.CSSProperties = {
  margin: 0,
  color: "var(--color-text-secondary)",
  fontSize: "var(--text-sm)",
  lineHeight: "var(--text-sm--line-height)",
}

const DESIGNS = [
  { title: "Spring Open House", subtitle: "Social Media · 1200×628px", isNew: true, isAutoCreated: false },
  { title: "Luxury Listing", subtitle: "Postcard · 4×6 in", isNew: false, isAutoCreated: true },
  { title: "Recruiting Ad", subtitle: "Instagram Story · 1080×1920px", isNew: false, isAutoCreated: false },
]

const TEMPLATES = [
  { title: "Spring Collection", category: "Social Media", height: 160 },
  { title: "Luxury Open House", category: "Postcard", height: 120 },
  { title: "Recruiting Banner", category: "LinkedIn", height: 200 },
  { title: "Holiday Greetings", category: "Email Header", height: 140 },
  { title: "Company Spotlight", category: "Facebook", height: 180 },
  { title: "Event Invite", category: "Flyer", height: 110 },
]

export default function DesignCardPage() {
  return (
    <DocsPageLayout
      eyebrow="Patterns"
      title="Design Card"
      toc={TOC}
      lead={
        <>
          Product-grounded card compositions for MAXA dashboard grids and template galleries.
          DesignCard shows a user&apos;s design with thumbnail, title, subtitle, and optional badges.
          TemplateCard is the masonry variant for category and popular-templates pages.
          Neither is a generic primitive — compose directly with tokens.
        </>
      }
    >
      <DocsPageSection
        id="design-card"
        title="Design Card"
        description="Thumbnail-first card for the dashboard My Designs grid. Title and type·dimension subtitle below the image. Optional badges for New and Auto-Created."
      >
        <ComponentPreview
          code={`<article style={{
  borderRadius: "var(--radius-2xl)",
  overflow: "hidden",
  background: "var(--color-bg-surface)",
  border: "1px solid var(--color-border-secondary)",
  boxShadow: "var(--shadow-sm)",
}}>
  <div style={{ position: "relative", aspectRatio: "4/3" }}>
    <img src={thumbnail} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    {isNew && (
      <div style={{ position: "absolute", top: "8px", left: "8px" }}>
        <Badge intent="info" size="sm">New</Badge>
      </div>
    )}
  </div>
  <div style={{ padding: "10px 12px 12px" }}>
    <p style={{ fontSize: "var(--text-md)", fontWeight: "var(--font-weight-semibold)" }}>{title}</p>
    <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{subtitle}</p>
    {isAutoCreated && <Badge intent="neutral" size="sm">Auto-Created</Badge>}
  </div>
</article>`}
        >
          <div style={surface}>
            <div style={cardGrid}>
              {DESIGNS.map((d) => (
                <article key={d.title} style={card}>
                  <div style={thumbnail}>
                    <span style={thumbnailLabel}>Preview</span>
                    {d.isNew && (
                      <div style={thumbnailBadge}>
                        <Badge intent="info" size="sm">New</Badge>
                      </div>
                    )}
                  </div>
                  <div style={cardMeta}>
                    <p style={cardTitle}>{d.title}</p>
                    <p style={cardSubtitle}>{d.subtitle}</p>
                    {d.isAutoCreated && (
                      <div style={{ marginTop: "6px" }}>
                        <Badge intent="neutral" size="sm">Auto-Created</Badge>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ComponentPreview>
        <p style={note}>
          Hover state raises shadow from <code>var(--shadow-sm)</code> to{" "}
          <code>var(--shadow-md)</code> using <code>var(--duration-base)</code> transition.
          Zero new tokens — all values exist in the token system.
        </p>
      </DocsPageSection>

      <DocsPageSection
        id="template-card"
        title="Template Card"
        description="Compact card for template galleries. Smaller radius, no aspect-ratio constraint — designed for dense grids."
      >
        <ComponentPreview
          code={`<article style={{
  borderRadius: "var(--radius-xl)",
  overflow: "hidden",
  background: "var(--color-bg-surface)",
  border: "1px solid var(--color-border-secondary)",
}}>
  <div style={{ height: "140px", background: "var(--color-bg-muted)" }}>
    <img src={thumbnail} alt={title} />
  </div>
  <div style={{ padding: "8px 10px 10px" }}>
    <p style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}>{title}</p>
    <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{category}</p>
  </div>
</article>`}
        >
          <div style={surface}>
            <div style={cardGrid}>
              {TEMPLATES.slice(0, 3).map((t) => (
                <article key={t.title} style={templateCard}>
                  <div style={templateThumb(t.height)}>
                    <span style={thumbnailLabel}>Preview</span>
                  </div>
                  <div style={templateMeta}>
                    <p style={templateTitle}>{t.title}</p>
                    <p style={templateCategory}>{t.category}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </DocsPageSection>

      <DocsPageSection
        id="masonry"
        title="Masonry Grid"
        description="Popular Templates uses a variable-height masonry layout. CSS columns handles this without JavaScript."
      >
        <ComponentPreview
          code={`<div style={{ columns: 3, columnGap: "var(--spacing-4)" }}>
  {templates.map((t) => (
    <article key={t.title} style={{ breakInside: "avoid", marginBottom: "var(--spacing-4)" }}>
      {/* TemplateCard markup */}
    </article>
  ))}
</div>`}
        >
          <div style={surface}>
            <div style={masonryGrid}>
              {TEMPLATES.map((t) => (
                <div key={t.title} style={masonryItem}>
                  <article style={templateCard}>
                    <div style={templateThumb(t.height)}>
                      <span style={thumbnailLabel}>Preview</span>
                    </div>
                    <div style={templateMeta}>
                      <p style={templateTitle}>{t.title}</p>
                      <p style={templateCategory}>{t.category}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
        <p style={note}>
          CSS <code>columns</code> creates the masonry effect without JS. Works in all modern
          browsers. For infinite scroll or virtual lists, replace with a JS masonry library.
        </p>
      </DocsPageSection>

      <DocsPageSection
        id="rules"
        title="Rules"
        description="These rules keep cards consistent and prevent wrong abstractions."
      >
        <div style={rulesGrid}>
          <div style={ruleCard}>
            <p style={ruleTitle}>No generic Card in @maxa/ui</p>
            <p style={ruleText}>DesignCard and TemplateCard are product-specific. A generic Card primitive risks the wrong abstraction — build product cards from tokens directly.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Radius: 2xl for design, xl for template</p>
            <p style={ruleText}>DesignCards use <code>var(--radius-2xl)</code> (16px). TemplateCards use <code>var(--radius-xl)</code> (12px) for denser grids.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Use shadow tokens, not raw values</p>
            <p style={ruleText}>Rest state: <code>var(--shadow-sm)</code>. Hover state: <code>var(--shadow-md)</code>. Never write raw box-shadow values.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Badges, not spans</p>
            <p style={ruleText}>"New" uses <code>{"<Badge intent=\"brand\" size=\"sm\">"}</code>. "Auto-Created" uses <code>intent="neutral"</code>. Both are purely informational — no dismiss handler.</p>
          </div>
        </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
