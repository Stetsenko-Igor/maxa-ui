import type { Metadata } from "next"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  IconButton,
  Input,
  Select,
} from "@maxa/ui"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"
import { ComponentPreview } from "../../../_components/component-preview"

export const metadata: Metadata = { title: "Page Header - MAXA UI" }

const TOC = [
  { href: "#toolbar-only", label: "Toolbar only" },
  { href: "#title-toolbar", label: "Title + toolbar" },
  { href: "#rules", label: "Rules" },
]

const surface: React.CSSProperties = {
  padding: "20px",
  background: "var(--color-bg-muted)",
  borderRadius: "var(--radius-md)",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
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

const pageTitle: React.CSSProperties = {
  margin: "4px 0 0",
  fontSize: "var(--text-heading-sm)",
  fontWeight: "var(--font-weight-semibold)",
  lineHeight: "1.4",
  color: "var(--color-text-primary)",
}

const pageTitleLarge: React.CSSProperties = {
  ...pageTitle,
  fontSize: "var(--text-heading-md)",
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
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "A → Z", value: "name_asc" },
]

export default function PageHeaderPage() {
  return (
    <DocsPageLayout
      eyebrow="Patterns"
      title="Page Header"
      toc={TOC}
      lead={
        <>
          MAXA screens have two page header patterns. Some screens use the FilterBar as the
          sole header; others add a title and Breadcrumb above it. There is no{" "}
          <code>{"<PageHeader>"}</code> component — compose these elements directly.
        </>
      }
    >
      <DocsPageSection
        id="toolbar-only"
        title="Toolbar Only"
        description="Dashboard and Scheduled use the FilterBar as the complete page header — no separate title. The search input and actions provide full context."
      >
        <ComponentPreview
          code={`<main>
  {/* FilterBar IS the page header — no <h1> needed */}
  <div style={toolbar}>
    <Input placeholder="Search My Dashboard" aria-label="Search designs" />
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
      </DropdownMenuContent>
    </DropdownMenu>
    <Select options={sortOptions} defaultValue="newest" size="sm" />
    <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
    <IconButton icon={<ListIcon />} aria-label="List view" size="sm" variant="ghost" />
  </div>
  {/* card grid */}
</main>`}
        >
          <div style={surface}>
            <div style={toolbar}>
              <div style={{ width: "240px", flex: "0 0 240px" }}>
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
                </DropdownMenuContent>
              </DropdownMenu>
              <div style={{ width: "130px", flex: "0 0 130px" }}>
                <Select options={sortOptions} defaultValue="newest" size="sm" />
              </div>
              <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
              <IconButton icon={<ListIcon />} aria-label="List view" size="sm" variant="ghost" />
            </div>
          </div>
        </ComponentPreview>
        <p style={note}>
          Used on: Dashboard (My Designs), Scheduled. The FilterBar&apos;s search placeholder is
          sufficient context — a redundant heading adds visual noise.
        </p>
      </DocsPageSection>

      <DocsPageSection
        id="title-toolbar"
        title="Title + Toolbar"
        description="Category and package detail screens add a breadcrumb and title above the FilterBar to orient the user in the content hierarchy."
      >
        <ComponentPreview
          code={`<main>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem><BreadcrumbPage>Most Popular Templates</BreadcrumbPage></BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  <h1 style={{
    fontSize: "var(--text-heading-sm)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-text-primary)",
    margin: "4px 0 12px",
  }}>
    Most Popular Templates
  </h1>
  <div style={toolbar}>
    <Input placeholder="Search templates" aria-label="Search templates" />
    <div style={{ flex: 1 }} />
    <Select options={sortOptions} defaultValue="newest" size="sm" />
    <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
    <IconButton icon={<ListIcon />} aria-label="List view" size="sm" variant="ghost" />
  </div>
  {/* template card grid */}
</main>`}
        >
          <div style={surface}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Most Popular Templates</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 style={pageTitleLarge}>Most Popular Templates</h1>
            <div style={{ height: "12px" }} />
            <div style={toolbar}>
              <div style={{ width: "240px", flex: "0 0 240px" }}>
                <Input placeholder="Search templates" aria-label="Search templates" />
              </div>
              <div style={spacer} />
              <div style={{ width: "130px", flex: "0 0 130px" }}>
                <Select options={sortOptions} defaultValue="newest" size="sm" />
              </div>
              <IconButton icon={<GridIcon />} aria-label="Grid view" size="sm" variant="secondary" />
              <IconButton icon={<ListIcon />} aria-label="List view" size="sm" variant="ghost" />
            </div>
          </div>
        </ComponentPreview>
        <p style={note}>
          Used on: Popular Templates, AMP Package Detail. Title uses{" "}
          <code>var(--text-heading-sm)</code> (18px) for standard screens or{" "}
          <code>var(--text-heading-md)</code> (22px) for top-level categories. Breadcrumb margin
          above title: <code>var(--spacing-1)</code>. Title margin below before toolbar:{" "}
          <code>var(--spacing-3)</code>.
        </p>
      </DocsPageSection>

      <DocsPageSection
        id="rules"
        title="Rules"
        description="When and how to apply each page header variant."
      >
        <div style={rulesGrid}>
          <div style={ruleCard}>
            <p style={ruleTitle}>No PageHeader component</p>
            <p style={ruleText}>Compose <code>{"<h1>"}</code>, <code>Breadcrumb</code>, and <code>FilterBar</code> directly. Abstracting them into a rigid wrapper breaks on the next screen variant.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Toolbar only when search gives context</p>
            <p style={ruleText}>Skip the title when the search placeholder makes the screen identity clear (e.g., "Search My Designs"). Add a title when the screen is a category or named entity.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Heading scale: sm or md only</p>
            <p style={ruleText}><code>--text-heading-sm</code> (18px) for standard product screens. <code>--text-heading-md</code> (22px) for top-level categories. Never use larger scales in product UI.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Breadcrumb only for hierarchy</p>
            <p style={ruleText}>Use Breadcrumb when the page is more than one level deep. Dashboard itself has no breadcrumb — it is the root.</p>
          </div>
        </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
