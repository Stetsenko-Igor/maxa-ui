import type { Metadata } from "next"
import Link from "next/link"
import {
  Alert,
  AlertAction,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Checkbox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Empty,
  FileInput,
  IconButton,
  Input,
  MultiSelect,
  Pagination,
  PaginationItem,
  PaginationList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Radio,
  Select,
  SegmentedControl,
  SegmentedControlItem,
  Skeleton,
  Slider,
  SocialButton,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
  TextArea,
  Toggle,
  Tooltip,
  TooltipProvider,
  UtilityButton,
} from "@maxa/ui"
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
  position: "relative",
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
    <Badge
      appearance="green"
      emphasis="low"
      size="sm"
      style={{ position: "absolute", top: "20px", right: "20px" }}
    >
      New
    </Badge>
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
          Component catalog covering identity, status indicators, data labels, actions, form controls, selection,
          layout, feedback, and overlays. All use component-level tokens, typed React APIs, and full documentation.
        </>
      }
    >
      <DocsPageSection id="catalog" title="Catalog" description="Each component is fully documented with interactive previews, code examples, and an API reference.">
        <div style={grid}>

          {/* A */}
          <Link href="/docs/components/alert" style={card}>
            <p style={eyebrow}>Feedback</p>
            <h2 style={title}>Alert</h2>
            <p style={description}>
              Callout box for info, success, warning, and danger messages. Optional dismiss.
            </p>
            <div style={{ ...preview, flexDirection: "column", alignItems: "stretch", gap: "8px" }}>
              <Alert intent="success">Changes saved successfully.</Alert>
              <Alert intent="warning" action={<AlertAction>Undo</AlertAction>}>File deleted.</Alert>
            </div>
            <span style={footer}>View Alert →</span>
          </Link>

          <Link href="/docs/components/alert-dialog" style={card}>
            <p style={eyebrow}>Feedback</p>
            <h2 style={title}>Alert Dialog</h2>
            <p style={description}>
              Interruptive confirmation dialog for irreversible or high-risk actions.
            </p>
            <div style={preview}>
              <AlertDialog>
                <AlertDialogTrigger className="maxa-button maxa-button--outline maxa-button--md">Delete</AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogTitle>Delete package?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <span style={footer}>View Alert Dialog →</span>
          </Link>

          {/* Av */}
          <Link href="/docs/components/avatar" style={card}>
            <p style={eyebrow}>Identity</p>
            <h2 style={title}>Avatar</h2>
            <p style={description}>
              User and collaborator identity primitive with fallback initials, sizes, statuses, and groups.
            </p>
            <div style={preview}>
              <AvatarGroup max={3}>
                <Avatar color="blue" tone="medium"><AvatarFallback>IS</AvatarFallback></Avatar>
                <Avatar color="green" tone="medium"><AvatarFallback>AV</AvatarFallback></Avatar>
                <Avatar color="rose" tone="medium"><AvatarFallback>MC</AvatarFallback></Avatar>
                <Avatar color="orange" tone="medium"><AvatarFallback>JW</AvatarFallback></Avatar>
              </AvatarGroup>
            </div>
            <span style={footer}>View Avatar →</span>
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

          {/* Br */}
          <Link href="/docs/components/breadcrumb" style={card}>
            <p style={eyebrow}>Navigation</p>
            <h2 style={title}>Breadcrumb</h2>
            <p style={description}>
              Hierarchy trail for dashboards, folders, package detail, and admin routes.
            </p>
            <div style={preview}>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><span className="maxa-breadcrumb__link">Dashboard</span></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>Packages</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <span style={footer}>View Breadcrumb →</span>
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

          <Link href="/docs/components/calendar" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Calendar</h2>
            <p style={description}>
              Month grid primitive for date pickers, scheduling, and calendar popovers.
            </p>
            <div style={preview}>
              <Calendar month={new Date(2026, 5, 1)} selected={new Date(2026, 5, 4)} />
            </div>
            <span style={footer}>View Calendar →</span>
          </Link>

          {/* C */}
          <Link href="/docs/components/checkbox" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Checkbox</h2>
            <p style={description}>
              Native checkbox with top label, side label, helper text, indeterminate, disabled, and error states.
            </p>
            <div style={{ ...preview, flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
              <Checkbox sideLabel="Unchecked" />
              <Checkbox sideLabel="Checked" defaultChecked />
              <Checkbox sideLabel="Disabled" disabled defaultChecked />
            </div>
            <span style={footer}>View Checkbox →</span>
          </Link>

          <Link href="/docs/components/context-menu" style={card}>
            <p style={eyebrow}>Overlay</p>
            <h2 style={title}>Context Menu</h2>
            <p style={description}>
              Right-click command menu for canvas, file, and item-level actions.
            </p>
            <div style={preview}>
              <ContextMenu>
                <ContextMenuTrigger style={{ width: "180px", height: "72px", display: "grid", placeItems: "center", border: "1px dashed var(--color-border-primary)", borderRadius: "var(--radius-md)", color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}>
                  Right click
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Open</ContextMenuItem>
                  <ContextMenuItem>Duplicate</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>
            <span style={footer}>View Context Menu →</span>
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

          <Link href="/docs/components/dialog" style={card}>
            <p style={eyebrow}>Overlay</p>
            <h2 style={title}>Dialog</h2>
            <p style={description}>
              Modal surface for focused decisions, forms, and short confirmation flows.
            </p>
            <div style={preview}>
              <Dialog>
                <DialogTrigger className="maxa-button maxa-button--outline maxa-button--md">Open dialog</DialogTrigger>
                <DialogContent>
                  <DialogTitle>Share package</DialogTitle>
                  <DialogDescription>Choose who can view this design package.</DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
            <span style={footer}>View Dialog →</span>
          </Link>

          {/* Di */}
          <Link href="/docs/components/divider" style={card}>
            <p style={eyebrow}>Layout</p>
            <h2 style={title}>Divider</h2>
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

          {/* Dr */}
          <Link href="/docs/components/dropdown-menu" style={card}>
            <p style={eyebrow}>Overlay</p>
            <h2 style={title}>Dropdown Menu</h2>
            <p style={description}>
              Triggered action menu for commands, grouped actions, shortcuts, and destructive items.
            </p>
            <div style={preview}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Export
                    <DropdownMenuShortcut>Cmd+E</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <span style={footer}>View Dropdown Menu →</span>
          </Link>

          {/* E */}
          <Link href="/docs/components/empty" style={card}>
            <p style={eyebrow}>Feedback</p>
            <h2 style={title}>Empty</h2>
            <p style={description}>
              Standard no-content and no-results state with title, description, icon, and actions.
            </p>
            <div style={preview}>
              <Empty
                size="sm"
                title="Scheduled Post Not Found"
                description="Try another search."
                action={<Button variant="secondary" size="sm">Clear search</Button>}
              />
            </div>
            <span style={footer}>View Empty →</span>
          </Link>

          <Link href="/docs/components/file-input" style={card}>
            <NewBadge />
            <p style={eyebrow}>Form</p>
            <h2 style={title}>FileInput</h2>
            <p style={description}>
              Low-level file picker and optional dropzone primitive for product upload flows.
            </p>
            <div style={preview}>
              <div style={{ width: "100%", maxWidth: "300px" }}>
                <FileInput label="Attachment" description="PDF, PNG, JPG, or SVG" />
              </div>
            </div>
            <span style={footer}>View FileInput →</span>
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

          <Link href="/docs/components/textarea" style={card}>
            <NewBadge />
            <p style={eyebrow}>Form</p>
            <h2 style={title}>TextArea</h2>
            <p style={description}>
              Multiline text entry for descriptions, bios, notes, disclaimers, and long-form values.
            </p>
            <div style={preview}>
              <div style={{ width: "100%", maxWidth: "300px" }}>
                <TextArea label="Message" placeholder="Write a message" />
              </div>
            </div>
            <span style={footer}>View TextArea →</span>
          </Link>

          <Link href="/docs/components/multi-select" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Multi Select</h2>
            <p style={description}>
              Input-like multi-value selector built on shared dropdown menu items.
            </p>
            <div style={preview}>
              <MultiSelect
                options={[
                  { label: "Brand", value: "brand" },
                  { label: "Social", value: "social" },
                  { label: "Print", value: "print" },
                ]}
                defaultValue={["brand", "social"]}
              />
            </div>
            <span style={footer}>View Multi Select →</span>
          </Link>

          {/* Pa */}
          <Link href="/docs/components/pagination" style={card}>
            <p style={eyebrow}>Navigation</p>
            <h2 style={title}>Pagination</h2>
            <p style={description}>
              Paged navigation for large lists of designs, templates, orders, and admin records.
            </p>
            <div style={preview}>
              <Pagination>
                <PaginationList>
                  <PaginationItem><span className="maxa-pagination__link maxa-pagination__link--text"><span aria-hidden="true">‹</span>Prev</span></PaginationItem>
                  <PaginationItem><span className="maxa-pagination__link">1</span></PaginationItem>
                  <PaginationItem><span className="maxa-pagination__link maxa-pagination__link--active">2</span></PaginationItem>
                  <PaginationItem><span className="maxa-pagination__link maxa-pagination__link--text">Next<span aria-hidden="true">›</span></span></PaginationItem>
                </PaginationList>
              </Pagination>
            </div>
            <span style={footer}>View Pagination →</span>
          </Link>

          {/* P */}
          <Link href="/docs/components/popover" style={card}>
            <p style={eyebrow}>Overlay</p>
            <h2 style={title}>Popover</h2>
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

          {/* Pr */}
          <Link href="/docs/components/progress" style={card}>
            <p style={eyebrow}>Feedback</p>
            <h2 style={title}>Progress</h2>
            <p style={description}>
              Determinate progress for imports, uploads, generation, and multi-step workflows.
            </p>
            <div style={{ ...preview, alignItems: "stretch" }}>
              <Progress value={64} label="Uploading package" showValue />
            </div>
            <span style={footer}>View Progress →</span>
          </Link>

          {/* R */}
          <Link href="/docs/components/radio" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Radio</h2>
            <p style={description}>
              Radio input with top label, side label, helper text, and one md size.
            </p>
            <div style={{ ...preview, flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
              <Radio name="plan-demo" value="free" sideLabel="Free" />
              <Radio name="plan-demo" value="pro" sideLabel="Pro" defaultChecked />
              <Radio name="plan-demo" value="enterprise" sideLabel="Enterprise" />
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

          {/* Sg */}
          <Link href="/docs/components/segmented-control" style={card}>
            <p style={eyebrow}>Selection</p>
            <h2 style={title}>Segment Control</h2>
            <p style={description}>
              Compact mode selector for a small set of mutually exclusive options.
            </p>
            <div style={preview}>
              <SegmentedControl defaultValue="center" aria-label="Alignment">
                <SegmentedControlItem value="left">Left</SegmentedControlItem>
                <SegmentedControlItem value="center">Center</SegmentedControlItem>
                <SegmentedControlItem value="right">Right</SegmentedControlItem>
              </SegmentedControl>
            </div>
            <span style={footer}>View Segment Control →</span>
          </Link>

          {/* Sk */}
          <Link href="/docs/components/skeleton" style={card}>
            <p style={eyebrow}>Feedback</p>
            <h2 style={title}>Skeleton</h2>
            <p style={description}>
              Loading placeholder for cards, rows, thumbnails, text lines, and avatars.
            </p>
            <div style={{ ...preview, flexDirection: "column", alignItems: "stretch" }}>
              <Skeleton style={{ height: 72 }} />
              <Skeleton variant="text" />
              <Skeleton variant="text" style={{ width: "64%" }} />
            </div>
            <span style={footer}>View Skeleton →</span>
          </Link>

          {/* Sl */}
          <Link href="/docs/components/slider" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Slider</h2>
            <p style={description}>
              Numeric range control for zoom, opacity, density, and adjustable settings.
            </p>
            <div style={{ ...preview, alignItems: "stretch" }}>
              <Slider label="Opacity" defaultValue={[64]} showValue marks={[0, 50, 100]} />
            </div>
            <span style={footer}>View Slider →</span>
          </Link>

          <Link href="/docs/components/social-button" style={card}>
            <NewBadge />
            <p style={eyebrow}>Action</p>
            <h2 style={title}>Social Button</h2>
            <p style={description}>
              Provider sign-in button for authentication and account-linking surfaces.
            </p>
            <div style={{ ...preview, flexDirection: "column" }}>
              <SocialButton provider="google" />
              <SocialButton provider="linkedin" />
            </div>
            <span style={footer}>View Social Button →</span>
          </Link>

          {/* Sp */}
          <Link href="/docs/components/spinner" style={card}>
            <p style={eyebrow}>Feedback</p>
            <h2 style={title}>Spinner</h2>
            <p style={description}>
              Indeterminate loading indicator for compact surfaces and inline async states.
            </p>
            <div style={preview}>
              <Spinner size="sm" label="Loading small" />
              <Spinner label="Loading medium" />
              <Spinner size="lg" label="Loading large" />
            </div>
            <span style={footer}>View Spinner →</span>
          </Link>

          {/* Ta */}
          <Link href="/docs/components/tabs" style={card}>
            <p style={eyebrow}>Navigation</p>
            <h2 style={title}>Tabs</h2>
            <p style={description}>
              Horizontal tab buttons for switching between related panels on the same surface.
            </p>
            <div style={preview}>
              <Tabs defaultValue="designs">
                <TabsList aria-label="Catalog tabs">
                  <TabsTrigger value="designs">Designs</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>
                <TabsContent value="designs" />
                <TabsContent value="scheduled" />
              </Tabs>
            </div>
            <span style={footer}>View Tabs →</span>
          </Link>

          <Link href="/docs/components/table" style={card}>
            <NewBadge />
            <p style={eyebrow}>Data</p>
            <h2 style={title}>Table</h2>
            <p style={description}>
              Semantic table primitives for dense records, row states, and composable cells.
            </p>
            <div style={{ ...preview, alignItems: "stretch" }}>
              <Table density="sm" style={{ minWidth: "240px" }}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Design</TableHead>
                    <TableHead align="right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow selected>
                    <TableCell>Postcard</TableCell>
                    <TableCell align="right">$148</TableCell>
                  </TableRow>
                  <TableRow subdued>
                    <TableCell>Flyer</TableCell>
                    <TableCell align="right">$72</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <span style={footer}>View Table →</span>
          </Link>

          {/* To */}
          <Link href="/docs/components/toggle" style={card}>
            <p style={eyebrow}>Form</p>
            <h2 style={title}>Toggle</h2>
            <p style={description}>
              Binary on/off control with top label, side label, helper text, and one md size.
            </p>
            <div style={{ ...preview, flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
              <Toggle sideLabel="Email updates" defaultChecked />
              <Toggle sideLabel="Auto-save" />
              <Toggle sideLabel="Locked setting" disabled />
            </div>
            <span style={footer}>View Toggle →</span>
          </Link>

          <Link href="/docs/components/utility-button" style={card}>
            <NewBadge />
            <p style={eyebrow}>Action</p>
            <h2 style={title}>Utility Button</h2>
            <p style={description}>
              Icon-only square action for toolbars, compact controls, and utility surfaces.
            </p>
            <div style={preview}>
              <UtilityButton aria-label="Add" icon={<PlusIcon />} selected />
              <UtilityButton aria-label="Edit" icon={<EditIcon />} />
              <UtilityButton aria-label="Delete" icon={<TrashIcon />} />
            </div>
            <span style={footer}>View Utility Button →</span>
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
            <h2 style={title}>Tooltip</h2>
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
