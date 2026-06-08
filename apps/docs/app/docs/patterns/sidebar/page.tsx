import type { Metadata } from "next"
import { Badge, Input } from "@maxa/ui"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"
import { ComponentPreview } from "../../../_components/component-preview"

export const metadata: Metadata = { title: "Sidebar - MAXA UI" }

const TOC = [
  { href: "#expanded", label: "Expanded" },
  { href: "#collapsed", label: "Collapsed" },
  { href: "#amp", label: "AMP sidebar" },
  { href: "#rules", label: "Rules" },
]

const sidebarBase: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  width: "var(--sidebar-width)",
  padding: "12px 8px",
  borderRight: "1px solid var(--color-border-secondary)",
  background: "var(--color-bg-surface)",
  minHeight: "400px",
  flexShrink: 0,
}

const sidebarCollapsed: React.CSSProperties = {
  ...sidebarBase,
  width: "var(--sidebar-width-collapsed)",
  alignItems: "center",
  padding: "12px 4px",
}

const sectionHeader: React.CSSProperties = {
  padding: "8px 8px 4px",
  color: "var(--color-text-tertiary)",
  fontSize: "var(--text-sm)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "var(--text-sm--line-height)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}

const navItem: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 8px",
  borderRadius: "var(--radius-md)",
  color: "var(--color-text-primary)",
  fontSize: "var(--text-md)",
  lineHeight: "var(--text-md--line-height)",
  textDecoration: "none",
  cursor: "pointer",
  userSelect: "none",
}

const navItemActive: React.CSSProperties = {
  ...navItem,
  background: "var(--color-bg-brand-subtle)",
  fontWeight: "var(--font-weight-semibold)",
}

const navItemIcon: React.CSSProperties = {
  width: "16px",
  height: "16px",
  flexShrink: 0,
  color: "var(--color-fg-secondary)",
}

const categoryRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 8px",
  borderRadius: "var(--radius-md)",
  color: "var(--color-text-primary)",
  fontSize: "var(--text-md)",
  lineHeight: "var(--text-md--line-height)",
  cursor: "pointer",
  listStyle: "none",
}

const subItemContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  paddingLeft: "28px",
  gap: "2px",
}

const subItem: React.CSSProperties = {
  display: "block",
  padding: "4px 8px",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-text-secondary)",
  fontSize: "var(--text-sm)",
  lineHeight: "var(--text-sm--line-height)",
  textDecoration: "none",
}

const divider: React.CSSProperties = {
  height: "1px",
  background: "var(--color-border-secondary)",
  margin: "6px 8px",
}

const demoRow: React.CSSProperties = {
  display: "flex",
  gap: "24px",
  padding: "20px",
  background: "var(--color-bg-muted)",
  borderRadius: "var(--radius-md)",
  overflowX: "auto",
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

function GridIcon() {
  return <svg style={navItemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
}
function CalendarIcon() {
  return <svg style={navItemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
}
function BoxIcon() {
  return <svg style={navItemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
}
function StarIcon() {
  return <svg style={navItemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
}
function FolderIcon() {
  return <svg style={navItemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
}
function ChevronRightIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
}
function RefreshIcon() {
  return <svg style={navItemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
}
function TagIcon() {
  return <svg style={navItemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
}
function ArrowLeftIcon() {
  return <svg style={navItemIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
}

function ExpandedSidebar() {
  return (
    <nav style={sidebarBase} aria-label="Dashboard navigation">
      <p style={sectionHeader}>Dashboard</p>
      <a href="#" style={navItemActive}><GridIcon />My Designs</a>
      <a href="#" style={navItem}><CalendarIcon />Scheduled</a>
      <a href="#" style={navItem}><BoxIcon />Marketing Packages</a>
      <div style={{ padding: "6px 8px" }}>
        <Input placeholder="Quick Search" aria-label="Search folders" />
      </div>
      <a href="#" style={navItem}><StarIcon />Most Popular Templates</a>
      <div style={divider} />
      <p style={sectionHeader}>Categories</p>
      <details>
        <summary style={categoryRow}>
          <FolderIcon />
          <span style={{ flex: 1 }}>Luxury</span>
          <Badge intent="neutral" size="sm">12</Badge>
          <ChevronRightIcon />
        </summary>
        <div style={subItemContainer}>
          <a href="#" style={subItem}>Spring Collection</a>
          <a href="#" style={subItem}>Summer Collection</a>
        </div>
      </details>
      <div style={{ ...categoryRow, color: "var(--color-text-secondary)" }}>
        <FolderIcon />
        <span style={{ flex: 1 }}>Open House</span>
        <Badge intent="neutral" size="sm">8</Badge>
        <ChevronRightIcon />
      </div>
      <div style={divider} />
      <a href="#" style={navItem}><RefreshIcon />Workspaces</a>
      <a href="#" style={navItem}><TagIcon />Explore Tags</a>
    </nav>
  )
}

function CollapsedSidebar() {
  return (
    <nav style={sidebarCollapsed} aria-label="Dashboard navigation collapsed">
      <span title="My Designs" style={{ ...navItemActive, width: "32px", height: "32px", justifyContent: "center", padding: 0 }}><GridIcon /></span>
      <span title="Scheduled" style={{ ...navItem, width: "32px", height: "32px", justifyContent: "center", padding: 0 }}><CalendarIcon /></span>
      <span title="Marketing Packages" style={{ ...navItem, width: "32px", height: "32px", justifyContent: "center", padding: 0 }}><BoxIcon /></span>
      <div style={divider} />
      <span title="Most Popular Templates" style={{ ...navItem, width: "32px", height: "32px", justifyContent: "center", padding: 0 }}><StarIcon /></span>
      <div style={{ ...divider, marginTop: "auto" }} />
      <span title="Workspaces" style={{ ...navItem, width: "32px", height: "32px", justifyContent: "center", padding: 0 }}><RefreshIcon /></span>
      <span title="Explore Tags" style={{ ...navItem, width: "32px", height: "32px", justifyContent: "center", padding: 0 }}><TagIcon /></span>
    </nav>
  )
}

export default function SidebarPage() {
  return (
    <DocsPageLayout
      eyebrow="Patterns"
      title="Sidebar"
      toc={TOC}
      lead={
        <>
          The MAXA dashboard sidebar provides collapsible navigation with section headers,
          expandable folder categories with count badges, quick search, and utility slots.
          This is a product-specific composition — not a generic primitive.
        </>
      }
    >
      <DocsPageSection
        id="expanded"
        title="Expanded"
        description="Full-width sidebar (215px) with section headers, nav items, quick search, category folders, and bottom utilities. Active item uses brand-subtle background."
      >
        <ComponentPreview
          code={`<nav style={{ width: "var(--sidebar-width)", /* 215px */ }}>
  <p style={sectionHeader}>Dashboard</p>
  <a href="/" style={navItemActive}><GridIcon />My Designs</a>
  <a href="/scheduled" style={navItem}><CalendarIcon />Scheduled</a>
  <a href="#" style={navItem}><BoxIcon />Marketing Packages</a>
  <Input placeholder="Quick Search" />
  <details>
    <summary style={categoryRow}>
      <FolderIcon />
      <span>Luxury</span>
      <Badge intent="neutral" size="sm">12</Badge>
    </summary>
    <div style={subItems}>
      <a href="#">Spring Collection</a>
    </div>
  </details>
</nav>`}
        >
          <div style={demoRow}>
            <ExpandedSidebar />
          </div>
        </ComponentPreview>
      </DocsPageSection>

      <DocsPageSection
        id="collapsed"
        title="Collapsed"
        description="Icon-only strip at 48px. Text labels hidden; title attributes provide accessible tooltips. Show both states side-by-side to communicate the transition."
      >
        <ComponentPreview
          code={`<nav style={{ width: "var(--sidebar-width-collapsed)" /* 48px */ }}>
  <span title="My Designs"><GridIcon /></span>
  <span title="Scheduled"><CalendarIcon /></span>
  <span title="Marketing Packages"><BoxIcon /></span>
</nav>`}
        >
          <div style={demoRow}>
            <CollapsedSidebar />
            <ExpandedSidebar />
          </div>
        </ComponentPreview>
        <p style={note}>
          Left: collapsed (48px icon strip). Right: expanded (215px) — shown side-by-side to
          illustrate the toggle. Use CSS transitions with <code>var(--duration-base)</code> and{" "}
          <code>var(--easing-standard)</code> for the real product implementation.
        </p>
      </DocsPageSection>

      <DocsPageSection
        id="amp"
        title="AMP Sidebar"
        description="Contextual variant for Marketing Package detail screens. Same tokens and folder pattern, but with back navigation and package-scoped search."
      >
        <ComponentPreview
          code={`<nav style={{ width: "var(--sidebar-width)" }}>
  <a href="/" style={navItem}><ArrowLeftIcon />Dashboard</a>
  <p style={sectionHeader}>Marketing Packages</p>
  <Input placeholder="Search packages" />
  <details>
    <summary style={categoryRow}>
      <FolderIcon /><span>Listing Packages</span>
      <Badge intent="neutral" size="sm">6</Badge>
    </summary>
  </details>
</nav>`}
        >
          <div style={demoRow}>
            <nav style={sidebarBase} aria-label="AMP sidebar">
              <a href="#" style={navItem}><ArrowLeftIcon />Dashboard</a>
              <p style={sectionHeader}>Marketing Packages</p>
              <div style={{ padding: "4px 8px" }}>
                <Input placeholder="Search packages" aria-label="Search packages" />
              </div>
              <details>
                <summary style={categoryRow}>
                  <FolderIcon />
                  <span style={{ flex: 1 }}>Listing Packages</span>
                  <Badge intent="neutral" size="sm">6</Badge>
                  <ChevronRightIcon />
                </summary>
                <div style={subItemContainer}>
                  <a href="#" style={subItem}>Luxury Listing</a>
                  <a href="#" style={subItem}>Standard Listing</a>
                </div>
              </details>
              <div style={{ ...categoryRow, color: "var(--color-text-secondary)" }}>
                <FolderIcon />
                <span style={{ flex: 1 }}>Company Packages</span>
                <Badge intent="neutral" size="sm">4</Badge>
                <ChevronRightIcon />
              </div>
              <div style={{ ...categoryRow, color: "var(--color-text-secondary)" }}>
                <FolderIcon />
                <span style={{ flex: 1 }}>Testimonial Packages</span>
                <Badge intent="neutral" size="sm">3</Badge>
                <ChevronRightIcon />
              </div>
            </nav>
          </div>
        </ComponentPreview>
      </DocsPageSection>

      <DocsPageSection
        id="rules"
        title="Rules"
        description="These rules keep the sidebar consistent across dashboard and package screens."
      >
        <div style={rulesGrid}>
          <div style={ruleCard}>
            <p style={ruleTitle}>Active state uses brand-subtle</p>
            <p style={ruleText}>Active nav items use <code>var(--color-bg-brand-subtle)</code> background and semibold weight. Never use a stronger brand token — it overwhelms the nav.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Counts use Badge, not plain text</p>
            <p style={ruleText}>Category counts use <code>{"<Badge intent=\"neutral\" size=\"sm\">"}</code> so emphasis and sizing stay consistent with the rest of the system.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Use layout tokens</p>
            <p style={ruleText}>Width uses <code>var(--sidebar-width)</code> (215px) and <code>var(--sidebar-width-collapsed)</code> (48px). Never hardcode these values.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>No Sidebar component in @maxa/ui</p>
            <p style={ruleText}>The sidebar structure is too product-specific to abstract as a generic primitive. Compose it from HTML elements, Badge, and Input using these tokens.</p>
          </div>
        </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
