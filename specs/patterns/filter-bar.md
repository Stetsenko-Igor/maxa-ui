# Filter Bar — Product Pattern Spec

A FilterBar is a horizontal toolbar that combines search, creation actions, filter controls, sort selectors, and view toggles. It is the primary interaction surface on dashboard and catalog screens.

This is a product pattern, not a primitive. It composes existing components — `Input`, `Button`, `IconButton`, `Select`, `DropdownMenu`, `SegmentedControl` — and uses the `--toolbar-*` layout tokens.

## Source Evidence

From `~/.claude/knowledge/maxa/ui-inventory.md`:

- **Dashboard** (`/`): Search My Dashboard · Create Folder · PDF to Print · Tag filter ▾ · Sort by ▾ · Grid / List view toggle
- **Scheduled** (`/scheduled`): Search Scheduled · Sort by ▾ · view density group · Content Calendar (secondary CTA)
- **AMP Package Detail** (`/package_details/:id`): Back · Search in Package · Share ▾ · Sort by ▾ · view density group · Settings

Reference screenshots:
- `01-dashboard.png`
- `30-scheduled.png`
- `40-amp-package-detail.png`

## Anatomy

```
[Search Input] ─────────── [spacer] ─ [Primary CTA] [Secondary CTA] ─ [Filter ▾] [Sort ▾] [View]
```

- **Search** — always first, fixed width (240–300px on desktop)
- **Spacer** — `flex: 1` to push CTAs and controls to the right on wide viewports; omit on narrow bars
- **Primary CTA** — one `variant="primary"` maximum per toolbar (interactive-hierarchy rule)
- **Secondary CTAs** — `variant="outline"` or `variant="secondary"`
- **Filter** — `DropdownMenu` with `DropdownMenuCheckboxItem` when selections are multi-pick tag filters
- **Sort** — `Select` (persistent form value, NOT `DropdownMenu`). Sort changes a value, not an action.
- **View toggle** — `SegmentedControl` for 2–3 named modes; paired `IconButton` group for icon-only density toggles

## One-Primary Rule

The `specs/patterns/interactive-hierarchy.md` rule applies inside toolbars:

| Dashboard | Role | Correct variant |
|-----------|------|-----------------|
| PDF to Print | Primary CTA | `variant="primary"` |
| Create Folder | Secondary CTA | `variant="outline"` |
| Tag ▾ | Filter selector | `DropdownMenu` trigger with `variant="outline"` |
| Sort by | Value selector | `Select` with `variant` default |

## Pattern Families

### Dashboard FilterBar

Standard content-management toolbar. Search left, right-side controls.

```tsx
<div style={toolbar}>
  <Input placeholder="Search My Dashboard" style={{ width: 260 }} />
  <div style={{ flex: 1 }} />
  <Button variant="outline">Create Folder</Button>
  <Button variant="primary">PDF to Print</Button>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Tag</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuCheckboxItem>Luxury</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>Open House</DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Select label="" options={sortOptions} defaultValue="newest" />
  <IconButton icon={<GridIcon />} aria-label="Grid view" variant="secondary" />
  <IconButton icon={<ListIcon />} aria-label="List view" variant="ghost" />
</div>
```

### Scheduled FilterBar

Minimal toolbar. No creation CTA, secondary action right-aligned.

```tsx
<div style={toolbar}>
  <Input placeholder="Search Scheduled" style={{ width: 260 }} />
  <div style={{ flex: 1 }} />
  <Select label="" options={sortOptions} defaultValue="newest" />
  <IconButton icon={<GridIcon />} aria-label="Grid view" variant="secondary" />
  <IconButton icon={<ListIcon />} aria-label="List view" variant="ghost" />
  <Button variant="outline">Content Calendar</Button>
</div>
```

### AMP Package FilterBar

Package-scoped toolbar with back navigation and dark/light variants.

```tsx
<div style={toolbar}>
  <Button variant="ghost">← Back</Button>
  <Input placeholder="Search in Package" style={{ width: 240 }} />
  <div style={{ flex: 1 }} />
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Share</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Copy package link</DropdownMenuItem>
      <DropdownMenuItem>Email package</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Select label="" options={sortOptions} defaultValue="newest" />
  <IconButton icon={<GridIcon />} aria-label="Grid view" variant="secondary" />
  <IconButton icon={<SettingsIcon />} aria-label="Settings" variant="ghost" />
</div>
```

## Layout Tokens

```css
/* Use these in toolbar container styles */
min-height: var(--toolbar-height);    /* 52px */
padding-inline: var(--toolbar-padding-x);  /* 20px */
gap: var(--toolbar-gap);              /* 12px */
```

Defined in `packages/tokens/src/component-nav.css`.

## Component Boundaries

| Need | Component |
|------|-----------|
| Text search | `Input` |
| Primary action (one per toolbar) | `Button variant="primary"` |
| Secondary action | `Button variant="outline"` |
| Multi-pick tag filter | `DropdownMenu` + `DropdownMenuCheckboxItem` |
| Persistent sort / value | `Select` |
| Icon-only view toggle | paired `IconButton` (secondary + ghost for active/inactive) |
| 2–3 named mode toggle | `SegmentedControl` |
| Back navigation | `Button variant="ghost"` |

## Anti-patterns

- Do not use `DropdownMenu` for Sort — it is a persistent value, not an action.
- Do not put two `variant="primary"` buttons in the same toolbar.
- Do not skip the spacer when CTAs should be right-aligned; using `margin-left: auto` on the first right-side control is equivalent.
- Do not add a `FormField` label wrapper to `Input` inside a toolbar — the placeholder is sufficient; use `aria-label` on the `<input>` instead.
- Do not hardcode toolbar height or gap — reference `var(--toolbar-height)` and `var(--toolbar-gap)`.

## Follow-up Patterns

- `Sidebar` — the contextual sidebar that hosts the FilterBar's source content
- `PageHeader` — title + FilterBar compositions for category and package detail pages
- `DesignCard` — the content items the FilterBar filters and sorts
