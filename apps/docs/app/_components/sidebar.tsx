import { NavItem } from "./nav-item"
import { ThemeToggle } from "./theme-toggle"

const NAV = [
  {
    group: "Getting Started",
    items: [
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
    ],
  },
  {
    group: "Foundations",
    items: [
      { href: "/docs/foundations/colors", label: "Colors" },
      { href: "/docs/foundations/typography", label: "Typography" },
      { href: "/docs/foundations/spacing", label: "Spacing" },
      { href: "/docs/foundations/radius", label: "Radius" },
      { href: "/docs/foundations/shadows", label: "Shadows" },
    ],
  },
  {
    group: "Components",
    items: [
      { href: "/docs/components", label: "Overview" },
      { href: "/docs/components/alert", label: "Alert" },
      { href: "/docs/components/alert-dialog", label: "Alert Dialog" },
      { href: "/docs/components/avatar", label: "Avatar" },
      { href: "/docs/components/badge", label: "Badge" },
      { href: "/docs/components/breadcrumb", label: "Breadcrumb" },
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/calendar", label: "Calendar" },
      { href: "/docs/components/checkbox", label: "Checkbox" },
      { href: "/docs/components/context-menu", label: "Context Menu" },
      { href: "/docs/components/date-picker", label: "Date Picker" },
      { href: "/docs/components/dialog", label: "Dialog" },
      { href: "/docs/components/divider", label: "Divider" },
      { href: "/docs/components/dropdown-menu", label: "Dropdown Menu" },
      { href: "/docs/components/empty", label: "Empty" },
      { href: "/docs/components/icon-button", label: "Icon Button" },
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/multi-select", label: "Multi Select" },
      { href: "/docs/components/pagination", label: "Pagination" },
      { href: "/docs/components/popover", label: "Popover" },
      { href: "/docs/components/progress", label: "Progress" },
      { href: "/docs/components/radio", label: "Radio" },
      { href: "/docs/components/select", label: "Select" },
      { href: "/docs/components/segmented-control", label: "Segment Control" },
      { href: "/docs/components/skeleton", label: "Skeleton" },
      { href: "/docs/components/slider", label: "Slider" },
      { href: "/docs/components/social-button", label: "Social Button", isNew: true },
      { href: "/docs/components/spinner", label: "Spinner" },
      { href: "/docs/components/tabs", label: "Tabs" },
      { href: "/docs/components/table", label: "Table", isNew: true },
      { href: "/docs/components/tag", label: "Tag" },
      { href: "/docs/components/toast", label: "Toast", isNew: true },
      { href: "/docs/components/toggle", label: "Toggle" },
      { href: "/docs/components/tooltip", label: "Tooltip" },
      { href: "/docs/components/utility-button", label: "Utility Button", isNew: true },
    ],
  },
  {
    group: "Patterns",
    items: [
      { href: "/docs/patterns/toolbar-menus", label: "Toolbar Menus" },
    ],
  },
]

const groupLabelStyle: React.CSSProperties = {
  padding: "8px 12px 4px",
  fontSize: "var(--text-caption-sm)",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-tertiary)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
}

export function Sidebar() {
  return (
    <aside className="docs-sidebar">
      {/* Logo */}
      <div
        style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px 0 20px",
          borderBottom: "1px solid var(--color-border-secondary)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-text-primary)",
            letterSpacing: 0,
          }}
        >
          MAXA UI
        </span>
        <span
          style={{
            marginLeft: "8px",
            fontSize: "var(--text-caption-sm)",
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          v0.0.0
        </span>
        <ThemeToggle />
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 8px", flex: 1 }}>
        {NAV.map((section) => (
          <div key={section.group} style={{ marginBottom: "20px" }}>
            <p style={groupLabelStyle}>{section.group}</p>
            {section.items.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} isNew={"isNew" in item ? item.isNew : false} />
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
