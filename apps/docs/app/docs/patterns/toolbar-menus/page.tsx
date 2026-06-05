import type { Metadata } from "next"
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Input,
} from "@maxa/ui"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"
import { ComponentPreview } from "../../../_components/component-preview"

export const metadata: Metadata = { title: "Toolbar Menus - MAXA UI" }

const TOC = [
  { href: "#global-header", label: "Global header" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#amp-package", label: "AMP package" },
  { href: "#editor", label: "Editor" },
  { href: "#rules", label: "Rules" },
]

const surface: React.CSSProperties = {
  display: "grid",
  gap: "16px",
  padding: "20px",
  background: "var(--color-bg-muted)",
}

const darkBar: React.CSSProperties = {
  display: "flex",
  minHeight: "52px",
  alignItems: "center",
  gap: "8px",
  padding: "8px 12px",
  borderRadius: "var(--radius-md)",
  background: "var(--color-neutral-950)",
  color: "var(--color-neutral-0)",
  overflowX: "auto",
}

const toolbar: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px",
  border: "1px solid var(--color-border-secondary)",
  borderRadius: "var(--radius-md)",
  background: "var(--color-bg-surface)",
  overflowX: "auto",
}

const spacer: React.CSSProperties = {
  flex: "1 1 auto",
  minWidth: "16px",
}

const darkButton: React.CSSProperties = {
  color: "var(--color-neutral-0)",
}

const logo: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "70px",
  fontSize: "var(--text-sm)",
  fontWeight: "var(--font-weight-bold)",
  letterSpacing: 0,
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
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.4.13.75.34 1 .6.3.3.4.7.4 1.1V12a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.31-.6Z" />
    </svg>
  )
}

function AvatarTrigger() {
  return (
    <span
      style={{
        display: "inline-flex",
        width: "24px",
        height: "24px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-full)",
        background: "var(--color-bg-error-surface)",
        color: "var(--color-text-error)",
        fontSize: "var(--text-caption-sm)",
        fontWeight: "var(--font-weight-semibold)",
      }}
    >
      IS
    </span>
  )
}

function MenuButton({ children }: { children: React.ReactNode }) {
  return (
    <Button size="sm" style={darkButton} variant="ghost" iconTrailing={<ChevronDownIcon />}>
      {children}
    </Button>
  )
}

export default function ToolbarMenusPage() {
  return (
    <DocsPageLayout
      eyebrow="Patterns"
      title="Toolbar Menus"
      toc={TOC}
      lead={
        <>
          Product-grounded toolbar and menu compositions for MAXA navigation,
          dashboards, package detail screens, and the design editor. These examples
          use real inventory patterns rather than generic menu samples.
        </>
      }
    >
      <DocsPageSection
        id="global-header"
        title="Global Header Menus"
        description="Authenticated MAXA screens use a fixed dark header with Request, Support, user, cart, tutorial, workspace, and locale actions."
      >
        <ComponentPreview code={`<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="ghost" size="sm" iconTrailing={<ChevronDownIcon />}>Request</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent align="end">\n    <DropdownMenuItem>Request Design</DropdownMenuItem>\n    <DropdownMenuItem>Template Requests</DropdownMenuItem>\n    <DropdownMenuItem>Concierge Requests</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`}>
          <div style={surface}>
              <div style={darkBar}>
                <span style={logo}>MAXA</span>
              <Button size="sm" style={darkButton} variant="ghost">Workspace Admin</Button>
              <Button size="sm" style={darkButton} variant="ghost">Print Cart</Button>
              <Button size="sm" style={darkButton} variant="ghost">Swag Cart</Button>
              <Button size="sm" style={darkButton} variant="ghost">Tutorials</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MenuButton>Request</MenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Request Design</DropdownMenuItem>
                  <DropdownMenuItem>Template Requests</DropdownMenuItem>
                  <DropdownMenuItem>Concierge Requests</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MenuButton>Support</MenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Get Help</DropdownMenuItem>
                  <DropdownMenuItem>Contact Print Support</DropdownMenuItem>
                  <DropdownMenuItem>Help Center</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" style={darkButton} variant="ghost" iconLeading={<AvatarTrigger />} iconTrailing={<ChevronDownIcon />}>
                    Igor
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Admin</DropdownMenuItem>
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <DropdownMenuItem>My Requests</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Print</DropdownMenuItem>
                  <DropdownMenuItem>Swag</DropdownMenuItem>
                  <DropdownMenuItem>Ad Campaigns</DropdownMenuItem>
                  <DropdownMenuItem>My Concierge Shop Orders</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Dark Mode</DropdownMenuCheckboxItem>
                  <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" style={darkButton} variant="ghost">US</Button>
            </div>
          </div>
        </ComponentPreview>
        <p style={note}>Request and Support are action menus. User menu needs a future Avatar primitive, but uses DropdownMenu behavior.</p>
      </DocsPageSection>

      <DocsPageSection
        id="dashboard"
        title="Dashboard Toolbar"
        description="Dashboard and Scheduled screens use search, direct actions, filters, sort, and view mode controls."
      >
        <ComponentPreview code={`<Input placeholder="Search My Dashboard" />\n<Button>Create Folder</Button>\n<DropdownMenu>...</DropdownMenu>`}>
          <div style={surface}>
            <div style={toolbar}>
              <div style={{ width: "260px", flex: "0 0 260px" }}>
                <Input placeholder="Search My Dashboard" />
              </div>
              <Button size="sm" variant="secondary">Create Folder</Button>
              <Button size="sm" variant="secondary">PDF to Print</Button>
              <div style={spacer} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" iconTrailing={<ChevronDownIcon />}>Tag</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>Luxury</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Open House</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Recruiting</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" iconTrailing={<ChevronDownIcon />}>Sort by</Button>
              <IconButton aria-label="Grid view" icon={<GridIcon />} size="sm" variant="secondary" />
              <IconButton aria-label="List view" icon={<ListIcon />} size="sm" variant="ghost" />
            </div>
          </div>
        </ComponentPreview>
        <p style={note}>Sort by is intentionally shown as a button-shaped placeholder. It should become Select v2 because sorting is a persistent value, not an action menu.</p>
      </DocsPageSection>

      <DocsPageSection
        id="amp-package"
        title="AMP Package Toolbar"
        description="Package detail screens combine navigation, package search, share actions, sort, view density, and settings."
      >
        <ComponentPreview code={`<Button variant="ghost">Back</Button>\n<Input placeholder="Search in Package" />\n<DropdownMenu>Share actions</DropdownMenu>`}>
          <div style={surface}>
            <div style={toolbar}>
              <Button size="sm" variant="ghost">Back</Button>
              <div style={{ width: "240px", flex: "0 0 240px" }}>
                <Input placeholder="Search in Package" />
              </div>
              <div style={spacer} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" iconTrailing={<ChevronDownIcon />}>Share</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copy package link</DropdownMenuItem>
                  <DropdownMenuItem>Email package</DropdownMenuItem>
                  <DropdownMenuItem>Share with workspace</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" iconTrailing={<ChevronDownIcon />}>Sort by</Button>
              <IconButton aria-label="Grid view" icon={<GridIcon />} size="sm" variant="secondary" />
              <IconButton aria-label="Settings" icon={<SettingsIcon />} size="sm" variant="ghost" />
            </div>
            <Badge intent="neutral" emphasis="low">Without Requires Admin Approval</Badge>
          </div>
        </ComponentPreview>
      </DocsPageSection>

      <DocsPageSection
        id="editor"
        title="Editor Top Bar"
        description="The editor top bar keeps high-frequency actions visible and only uses menus when a button has multiple actions."
      >
        <ComponentPreview code={`<Button>Print</Button>\n<Button>Download</Button>\n<DropdownMenu>Share</DropdownMenu>`}>
          <div style={surface}>
              <div style={darkBar}>
                <span style={logo}>MAXA</span>
              <Button size="sm" style={darkButton} variant="ghost">Close</Button>
              <Badge intent="warning" emphasis="low">Designer 3.0 Beta</Badge>
              <div style={spacer} />
              <Button size="sm" style={darkButton} variant="ghost">Print</Button>
              <Button size="sm" style={darkButton} variant="ghost">Send to Create</Button>
              <Button size="sm" style={darkButton} variant="ghost">Download</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MenuButton>Share</MenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                  <DropdownMenuItem>Email preview</DropdownMenuItem>
                  <DropdownMenuItem>Share with workspace</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Permissions</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AvatarTrigger />
            </div>
          </div>
        </ComponentPreview>
      </DocsPageSection>

      <DocsPageSection
        id="rules"
        title="Rules"
        description="These rules keep menus predictable across product surfaces."
      >
        <div style={rulesGrid}>
          <div style={ruleCard}>
            <p style={ruleTitle}>Actions use DropdownMenu</p>
            <p style={ruleText}>Request, Support, Share, user, row, and card actions open command menus.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Values use Select v2</p>
            <p style={ruleText}>Sort by and persistent filters should not use action-menu semantics.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Triggers show affordance</p>
            <p style={ruleText}>Text menu triggers include a chevron. Icon-only triggers need an accessible label.</p>
          </div>
          <div style={ruleCard}>
            <p style={ruleTitle}>Dense surfaces stay dense</p>
            <p style={ruleText}>Toolbar examples keep compact heights, restrained spacing, and production-like scan paths.</p>
          </div>
        </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
