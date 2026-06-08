import type { Metadata } from "next"
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Input,
  Select,
} from "@maxa/ui"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"
import { ComponentPreview } from "../../../_components/component-preview"

export const metadata: Metadata = { title: "Filter Bar - MAXA UI" }

const TOC = [
  { href: "#dashboard", label: "Dashboard" },
  { href: "#scheduled", label: "Scheduled" },
  { href: "#amp-package", label: "AMP package" },
  { href: "#rules", label: "Rules" },
]

const surface: React.CSSProperties = {
  padding: "20px",
  background: "var(--color-bg-muted)",
  borderRadius: "var(--radius-md)",
}

const toolbar: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  minHeight: "var(--toolbar-height)",
  gap: "var(--toolbar-gap)",
  paddingInline: "var(--toolbar-padding-x)",
  paddingBlock: "10px",
  border: "1px solid var(--color-border-secondary)",
  borderRadius: "var(--radius-md)",
  background: "var(--color-bg-surface)",
  overflowX: "auto",
}

const spacer: React.CSSProperties = { flex: "1 1 auto", minWidth: "8px" }

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

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.4.13.75.34 1 .6.3.3.4.7.4 1.1V12a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.31-.6Z" />
    </svg>
  )
}

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "A → Z", value: "name_asc" },
  { label: "Z → A", value: "name_desc" },
]

export default function FilterBarPage() {
  return (
    <DocsPageLayout
      eyebrow="Patterns"
      title="Filter Bar"
      toc={TOC}
      lead={
        <>
          Product-grounded toolbar compositions for MAXA dashboard, catalog, and package detail
          screens. Combines search, creation actions, filter menus, sort selectors, and view
          toggles using the one-primary-per-toolbar rule.
        </>
      }
    >
      <DocsPageSection
        id="dashboard"
        title="Dashboard"
        description="The main dashboard toolbar: search left, spacer, then creation CTAs, tag filter, sort value selector, and view density controls right."
      >
        <ComponentPreview
          code={`<div style={toolbar}>
  <Input placeholder="Search My Dashboard" aria-label="Search designs" style={{ width: 260 }} />
  <div style={{ flex: 1 }} />
  <Button size="sm" variant="outline">Create Folder</Button>
  <Button size="sm" variant="primary">PDF to Print</Button>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size="sm" variant="outline" iconTrailing={<ChevronDownIcon />}>Tag</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuCheckboxItem>Luxury</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>Open House</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>Recruiting</DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Select options={sortOptions} defaultValue="newest" size="sm" />
  <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
  <IconButton icon={<ListIcon />} aria-label="List view" size="sm" variant="ghost" />
</div>`}
        >
          <div style={surface}>
            <div style={toolbar}>
              <div style={{ width: "260px", flex: "0 0 260px" }}>
                <Input placeholder="Search My Dashboard" aria-label="Search designs" />
              </div>
              <div style={spacer} />
              <Button size="sm" variant="outline">Create Folder</Button>
              <Button size="sm" variant="primary">PDF to Print</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" iconTrailing={<ChevronDownIcon />}>Tag</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem>Luxury</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Open House</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Recruiting</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div style={{ width: "140px", flex: "0 0 140px" }}>
                <Select options={sortOptions} defaultValue="newest" size="sm" />
              </div>
              <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
              <IconButton icon={<ListIcon />} aria-label="List view" size="sm" variant="ghost" />
            </div>
          </div>
        </ComponentPreview>
        <p style={note}>
          PDF to Print is the one primary action. Create Folder is secondary (outline). Tag uses
          DropdownMenu because selections are multi-pick. Sort uses Select because it is a
          persistent value, not an action.
        </p>
      </DocsPageSection>

      <DocsPageSection
        id="scheduled"
        title="Scheduled"
        description="Minimal toolbar with no creation CTA. Secondary action (Content Calendar) right-aligned after the view controls."
      >
        <ComponentPreview
          code={`<div style={toolbar}>
  <Input placeholder="Search Scheduled" aria-label="Search scheduled designs" style={{ width: 260 }} />
  <div style={{ flex: 1 }} />
  <Select options={sortOptions} defaultValue="newest" size="sm" />
  <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
  <IconButton icon={<ListIcon />} aria-label="List view" size="sm" variant="ghost" />
  <Button size="sm" variant="outline">Content Calendar</Button>
</div>`}
        >
          <div style={surface}>
            <div style={toolbar}>
              <div style={{ width: "260px", flex: "0 0 260px" }}>
                <Input placeholder="Search Scheduled" aria-label="Search scheduled designs" />
              </div>
              <div style={spacer} />
              <div style={{ width: "140px", flex: "0 0 140px" }}>
                <Select options={sortOptions} defaultValue="newest" size="sm" />
              </div>
              <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
              <IconButton icon={<ListIcon />} aria-label="List view" size="sm" variant="ghost" />
              <Button size="sm" variant="outline">Content Calendar</Button>
            </div>
          </div>
        </ComponentPreview>
      </DocsPageSection>

      <DocsPageSection
        id="amp-package"
        title="AMP Package"
        description="Package detail toolbar with back navigation, package-scoped search, Share action menu, sort selector, view controls, and settings."
      >
        <ComponentPreview
          code={`<div style={toolbar}>
  <Button size="sm" variant="ghost">← Back</Button>
  <Input placeholder="Search in Package" aria-label="Search in package" style={{ width: 240 }} />
  <div style={{ flex: 1 }} />
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size="sm" variant="outline" iconTrailing={<ChevronDownIcon />}>Share</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Copy package link</DropdownMenuItem>
      <DropdownMenuItem>Email package</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Share with workspace</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Select options={sortOptions} defaultValue="newest" size="sm" />
  <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
  <IconButton icon={<SettingsIcon />} aria-label="Package settings" size="sm" variant="ghost" />
</div>`}
        >
          <div style={surface}>
            <div style={toolbar}>
              <Button size="sm" variant="ghost">← Back</Button>
              <div style={{ width: "240px", flex: "0 0 240px" }}>
                <Input placeholder="Search in Package" aria-label="Search in package" />
              </div>
              <div style={spacer} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" iconTrailing={<ChevronDownIcon />}>Share</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copy package link</DropdownMenuItem>
                  <DropdownMenuItem>Email package</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Share with workspace</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div style={{ width: "140px", flex: "0 0 140px" }}>
                <Select options={sortOptions} defaultValue="newest" size="sm" />
              </div>
              <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
              <IconButton icon={<SettingsIcon />} aria-label="Package settings" size="sm" variant="ghost" />
            </div>
          </div>
        </ComponentPreview>
        <p style={note}>
          Share is a DropdownMenu (it exposes actions). Sort is Select (persistent ordering value).
          Back uses ghost variant — it navigates, does not mutate data.
        </p>
      </DocsPageSection>

      <DocsPageSection
        id="rules"
        title="Rules"
        description="These rules keep filter bars consistent across MAXA screens."
      >
        <div style={rulesGrid}>
          <div style={ruleCard}>
            <p style={ruleTitle}>Search is always first</p>
            <p style={ruleText}>The search Input anchors the left side. Everything else follows to the right, with a spacer before the control cluster.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>One primary per toolbar</p>
            <p style={ruleText}>PDF to Print on the dashboard. Never two primary buttons. Additional CTAs use outline or secondary variants.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Sort uses Select, not DropdownMenu</p>
            <p style={ruleText}>Sorting changes a persistent value — it is not a command. Use Select so the chosen value is visible in the trigger.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Filters use DropdownMenu</p>
            <p style={ruleText}>Tag and category filters use DropdownMenuCheckboxItem because the user selects from a set, and the selection list can change.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>View toggles use icon pairs</p>
            <p style={ruleText}>Grid/List density controls use paired IconButton (secondary = active, ghost = inactive). Use SegmentedControl only when modes have text labels.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Use layout tokens</p>
            <p style={ruleText}>Toolbar containers reference <code>var(--toolbar-height)</code>, <code>var(--toolbar-padding-x)</code>, and <code>var(--toolbar-gap)</code> — never hardcode these values.</p>
          </div>
        </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
