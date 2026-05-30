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
      { href: "/docs/components/badge", label: "Badge" },
      { href: "/docs/components/tag", label: "Tag" },
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/checkbox", label: "Checkbox" },
      { href: "/docs/components/date-picker", label: "Date Picker" },
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/radio", label: "Radio" },
      { href: "/docs/components/select", label: "Select" },
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
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
