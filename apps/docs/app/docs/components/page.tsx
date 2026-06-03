import type { Metadata } from "next"
import Link from "next/link"
import { Badge, Tag, Button, Checkbox, DatePicker, IconButton, Input, Popover, PopoverContent, PopoverTrigger, Radio, Select, Toggle, Divider, Alert, AlertAction, Tooltip, TooltipProvider } from "@maxa/ui"
import { DocsPageLayout, DocsPageSection } from "../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Components — MAXA UI" }
const TOC = [{ href: "#catalog", label: "Catalog" }]

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
}

const card: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "260px",
  padding: "20px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border-secondary)",
  background: "var(--color-bg-surface)",
  textDecoration: "none",
}

const eyebrow: React.CSSProperties = {
  fontSize: "var(--text-caption-sm)",
  color: "var(--color-text-tertiary)",
  margin: "0 0 8px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontWeight: "var(--font-weight-semibold)",
}

const title: React.CSSProperties = {
  fontSize: "var(--text-heading-xs)",
  lineHeight: "24px",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-primary)",
  margin: "0 0 8px",
}

const description: React.CSSProperties = {
  fontSize: "var(--text-sm)",
  lineHeight: "20px",
  color: "var(--color-text-secondary)",
  margin: "0",
}

const preview: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minHeight: "112px",
  marginTop: "24px",
  padding: "16px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border-secondary)",
  background: "var(--color-bg-muted)",
}

const footer: React.CSSProperties = {
  marginTop: "auto",
  paddingTop: "20px",
  fontSize: "var(--text-sm)",
  color: "var(--color-action-primary)",
  fontWeight: "var(--font-weight-semibold)",
}

function NewBadge() {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "10px",
      fontWeight: "var(--font-weight-semibold)",
      color: "var(--color-text-success)",
      lineHeight: 1,
      verticalAlign: "middle",
      marginLeft: "8px",
      position: "relative",
      top: "-1px",
    }}>
      <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
        <circle cx="3" cy="3" r="3" fill="currentColor" />
      </svg>
      New
    </span>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

export default function ComponentsPage() {
  return (
    <DocsPageLayout
      eyebrow="Catalog"
      title="Components"
      toc={TOC}
      lead={
        <>
          Fifteen components covering status indicators, data labels, actions, form controls, selection,
          layout, feedback, and overlays. All use component-level tokens, typed React APIs, and full documentation.
        </>
      }
    >
      <DocsPageSection id="catalog" title="Catalog" description="Each component is fully documented with interactive previews, code examples, and an API reference.">
        <div style={grid}>

          {/* A */}
          <Link href="/docs/components/alert" style={card}>
            <p style={eyebrow}>Feedback</p>
            <h2 style={title}>Alert<NewBadge /></h2>
            <p style={description}>
              Callout box for info, success, warning, and danger messages. Optional dismiss.
            </p>
            <div style={{ ...preview, flexDirection: "column", alignItems: "stretch", gap: "8px" }}>
              <Alert intent="success">Changes saved successfully.</Alert>
              <Alert intent="warning" action={<AlertAction>Undo</AlertAction>}>File deleted.</Alert>
            </div>
            <span style={footer}>View Alert →</span>
          </Link>

          {/* B */}
          <Link href="/docs/components/badge" style={card}>
            <p style={eyebrow}>Status</p>
            <h2 style={title}>Badge</h2>
            <p style={description}>
              Compact status and metadata indicator. Five intents and three emphasis levels.
            </p>
            <div style={{ ...preview, gap: "6px", flexWrap: "wrap" }}>
              <Badge intent="neutral" emphasis="low">Draft</Badge>
              <Badge intent="info" emphasis="low">In review</Badge>
              <Badge intent="success" emphasis="high">Active</Badge>
              <Badge intent="warning" emphasis="low">Pending</Badge>
              <Badge intent="error" emphasis="high">Failed</Badge>
            </div>
            <span style={footer}>View Badge →</span>
          </Link>

          {/* B */}
          <Link href="/docs/components/button" style={card}>
            <p style={eyebrow}>Action</p>
            <h2 style={title}>Button</h2>
            <p style={description}>
              Seven variants, four sizes, icon support, loading state, and polymorphic rendering.
            </p>
            <div style={preview}>
              <Button variant="primary">Create</Button>
              <Button variant="secondary">Cancel</Button>
              <Button variant="outline">Export</Button>
            </div>
            <span style={footer}>View Button →</span>
          </Link>

          {/* C */}
          <Link href="/docs/components/checkbox" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Checkbox</h2>
            <p style={description}>
              Supports checked, indeterminate, disabled, and error states with label and helper text.
            </p>
            <div style={{ ...preview, flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked" defaultChecked />
              <Checkbox label="Disabled" disabled defaultChecked />
            </div>
            <span style={footer}>View Checkbox →</span>
          </Link>

          {/* D */}
          <Link href="/docs/components/date-picker" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Date Picker</h2>
            <p style={description}>
              Single-date and range-date fields with shared form composition model.
            </p>
            <div style={preview}>
              <div style={{ width: "100%", maxWidth: "280px" }}>
                <DatePicker label="Date" />
              </div>
            </div>
            <span style={footer}>View Date Picker →</span>
          </Link>

          {/* Di */}
          <Link href="/docs/components/divider" style={card}>
            <p style={eyebrow}>Layout</p>
            <h2 style={title}>Divider<NewBadge /></h2>
            <p style={description}>
              Thin rule for visually separating content. Horizontal or vertical orientation.
            </p>
            <div style={{ ...preview, flexDirection: "column", gap: "12px" }}>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>Section A</span>
              <Divider />
              <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>Section B</span>
            </div>
            <span style={footer}>View Divider →</span>
          </Link>

          {/* I */}
          <Link href="/docs/components/icon-button" style={card}>
            <p style={eyebrow}>Action</p>
            <h2 style={title}>Icon Button</h2>
            <p style={description}>
              Square icon-only button with enforced aria-label for accessibility.
            </p>
            <div style={preview}>
              <IconButton icon={<PlusIcon />} aria-label="Add" variant="primary" />
              <IconButton icon={<EditIcon />} aria-label="Edit" variant="secondary" />
              <IconButton icon={<TrashIcon />} aria-label="Delete" variant="ghost" />
            </div>
            <span style={footer}>View Icon Button →</span>
          </Link>

          {/* I */}
          <Link href="/docs/components/input" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Input</h2>
            <p style={description}>
              Text, password, search, and quantity fields with icons, validation states, and sizes.
            </p>
            <div style={preview}>
              <div style={{ width: "100%", maxWidth: "280px" }}>
                <Input label="Email" placeholder="you@example.com" />
              </div>
            </div>
            <span style={footer}>View Input →</span>
          </Link>

          {/* P */}
          <Link href="/docs/components/popover" style={card}>
            <p style={eyebrow}>Overlay</p>
            <h2 style={title}>Popover<NewBadge /></h2>
            <p style={description}>
              Floating interactive panel anchored to a trigger. Built on Radix Popover.
            </p>
            <div style={preview}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div style={{ display: "grid", gap: "8px" }}>
                    <strong style={{ fontSize: "var(--text-sm)" }}>Filters</strong>
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>Segment options</span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <span style={footer}>View Popover →</span>
          </Link>

          {/* R */}
          <Link href="/docs/components/radio" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Radio</h2>
            <p style={description}>
              Radio input with label and helper text. Group with a shared name for mutual exclusion.
            </p>
            <div style={{ ...preview, flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
              <Radio name="plan-demo" value="free" label="Free" />
              <Radio name="plan-demo" value="pro" label="Pro" defaultChecked />
              <Radio name="plan-demo" value="enterprise" label="Enterprise" />
            </div>
            <span style={footer}>View Radio →</span>
          </Link>

          {/* Se */}
          <Link href="/docs/components/select" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Select</h2>
            <p style={description}>
              Input-like field with a chevron for choosing one value from a known list.
            </p>
            <div style={preview}>
              <div style={{ width: "100%", maxWidth: "280px" }}>
                <Select label="Plan" defaultValue="">
                  <option value="" disabled>Choose a plan</option>
                  <option>Free</option>
                  <option>Pro</option>
                </Select>
              </div>
            </div>
            <span style={footer}>View Select →</span>
          </Link>

          {/* To */}
          <Link href="/docs/components/toggle" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Toggle<NewBadge /></h2>
            <p style={description}>
              Binary on/off control with one md size, disabled and error states. Built on Radix.
            </p>
            <div style={{ ...preview, flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
              <Toggle aria-label="Off" />
              <Toggle aria-label="On" defaultChecked />
              <Toggle aria-label="Disabled" disabled defaultChecked />
            </div>
            <span style={footer}>View Toggle →</span>
          </Link>

          {/* T */}
          <Link href="/docs/components/tag" style={card}>
            <p style={eyebrow}>Data</p>
            <h2 style={title}>Tag</h2>
            <p style={description}>
              Removable data label for user-defined categories. 18 colors, three emphasis levels.
            </p>
            <div style={{ ...preview, gap: "6px", flexWrap: "wrap" }}>
              <Tag appearance="blue" removable>Audience</Tag>
              <Tag appearance="violet" emphasis="high" removable>VIP</Tag>
              <Tag appearance="teal">Prague</Tag>
              <Tag appearance="rose" removable>Luxury</Tag>
            </div>
            <span style={footer}>View Tag →</span>
          </Link>

          {/* To */}
          <Link href="/docs/components/tooltip" style={card}>
            <p style={eyebrow}>Overlay</p>
            <h2 style={title}>Tooltip<NewBadge /></h2>
            <p style={description}>
              Contextual label on hover or focus. Positioned with Radix, four sides.
            </p>
            <div style={preview}>
              <TooltipProvider>
                <Tooltip content="Hello from a tooltip">
                  <Button variant="secondary">Hover me</Button>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span style={footer}>View Tooltip →</span>
          </Link>

        </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
