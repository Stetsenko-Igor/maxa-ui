# Sidebar — Product Pattern Spec

The MAXA sidebar is a collapsible left-panel navigation used on the dashboard and marketing package screens. It holds section headers, navigation items with icons, expandable folder categories with count badges, a quick search input, and bottom utility slots.

This is a product pattern, not a primitive. It composes `Badge`, `Input`, and standard HTML elements styled with semantic and nav tokens. There is no `<Sidebar>` component exported from `@maxa/ui`.

## Source Evidence

From `~/.claude/knowledge/maxa/ui-inventory.md`:

- **Dashboard sidebar** (`/`): fixed left, 215px wide, white background, light right border
  - Section header: "Dashboard" (gray uppercase)
  - Nav items: My Designs (grid icon), Scheduled (calendar icon), Marketing Packages (box icon, expandable)
  - Quick Search input
  - "★ Most Popular Templates" (star icon link)
  - Folder categories: collapsible, count badge (blue circle), expand arrow, sub-items
  - Bottom: Workspaces, Explore Tags
- **AMP sidebar** (`/package_details/:id`): contextual replacement
  - Back arrow → Dashboard
  - "Marketing Packages" heading
  - Search input
  - Expandable package sections

Reference screenshots:
- `01-dashboard.png` (sidebar expanded, My Designs active)
- `02-dashboard-sidebar-expanded.png` (category expanded)

## Anatomy

```
┌─────────────────┐
│ SECTION HEADER  │   gray uppercase, --color-text-tertiary
│                 │
│ ▦  My Designs   │   active: bg-brand-subtle + semibold
│ 📅  Scheduled   │
│ □  Mktg Packages│
│                 │
│ [🔍 Quick Search]│
│                 │
│ ★  Most Popular  │
│                 │
│ CATEGORIES      │
│  > Luxury    12 │   category folder: folder icon + name + count Badge
│    ↳ Spring     │   sub-item: indented, small dash
│                 │
│ ─────────────── │
│ ⟳  Workspaces   │   bottom utility slots
│ ⊙  Explore Tags │
└─────────────────┘
```

## States

| State | Token / Style |
|-------|--------------|
| Active nav item | `background: var(--color-bg-brand-subtle)` + `font-weight: var(--font-weight-semibold)` |
| Hover nav item | `background: var(--color-bg-muted)` |
| Section header | `color: var(--color-text-tertiary)`, `font-size: var(--text-sm)`, `text-transform: uppercase`, `letter-spacing: 0.05em` |
| Count badge | `<Badge intent="neutral" emphasis="low" size="sm">` |
| Sidebar width expanded | `var(--sidebar-width)` = 215px |
| Sidebar width collapsed | `var(--sidebar-width-collapsed)` = 48px (icon-only strip) |

## Collapsed State

When collapsed, the sidebar shows icon-only items (no text labels). The transition should use `var(--duration-base)` and `var(--easing-standard)`. In documentation demos, show both states side-by-side rather than animating, since Next.js server components have no client interaction.

## Layout Tokens

```css
width: var(--sidebar-width);              /* 215px expanded */
width: var(--sidebar-width-collapsed);    /* 48px collapsed */
```

Defined in `packages/tokens/src/component-nav.css`.

## Category Folders

Expandable folders show a count of items in the category. Use `<Badge intent="neutral" emphasis="low" size="sm">` for the count. The expand chevron rotates 90° when open. Sub-items are indented 16px from the icon column.

```tsx
<details>
  <summary style={categoryItem}>
    <FolderIcon />
    <span>Luxury</span>
    <span style={{ flex: 1 }} />
    <Badge intent="neutral" emphasis="low" size="sm">12</Badge>
    <ChevronRightIcon />
  </summary>
  <div style={subItems}>
    <a style={subItem} href="#">Spring Collection</a>
    <a style={subItem} href="#">Summer Collection</a>
  </div>
</details>
```

## Anti-patterns

- Do not add `<Sidebar>` to `@maxa/ui` — this is a product-specific composition; the nav structure is too MAXA-specific to abstract as a generic primitive.
- Do not hardcode `215px` — use `var(--sidebar-width)`.
- Do not use `--color-bg-brand-strong` for active items — it is too heavy. Use `--color-bg-brand-subtle`.
- Do not show count as plain text — use the `Badge` component so emphasis and sizing are consistent.
- Do not create a second visual system for the AMP sidebar — it uses the same tokens and `<details>`/`<summary>` pattern, just with different section content.

## AMP Sidebar Variant

The AMP sidebar replaces the dashboard sidebar contextually. Key differences:
- Back button at top (ghost Button or styled link)
- No section header
- Search input for package-scoped search
- Expandable package sub-sections (same category folder pattern)

Same tokens, same components.
