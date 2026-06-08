# Page Header — Product Pattern Spec

A PageHeader is the content area at the top of a MAXA screen, above the card grid or content body. It always includes a FilterBar. Some screens add a title (`<h1>`) and/or a breadcrumb trail. There is no separate `<PageHeader>` component — screens compose `<h1>`, `Breadcrumb`, and `FilterBar` directly.

This is a product pattern, not a primitive.

## Source Evidence

From `~/.claude/knowledge/maxa/ui-inventory.md`:

| Screen | Top area |
|--------|----------|
| Dashboard (`/`) | No separate title; the FilterBar IS the page header |
| Scheduled (`/scheduled`) | No title; FilterBar only |
| Popular Templates (`/categories/popular`) | Implicit category title; FilterBar |
| AMP Package Detail (`/package_details/:id`) | Package name + date (below toolbar); FilterBar in toolbar |
| Profile (`/profile`) | Left sub-nav + form with `<h1>` equivalent |
| Editor (`/designs/:slug/edit`) | Editor top bar — see Toolbar Menus pattern |

Reference screenshots:
- `01-dashboard.png`
- `10-templates-popular.png`
- `40-amp-package-detail.png`

## Three Variants

### Variant 1 — Toolbar Only (Dashboard, Scheduled)

The FilterBar serves as the full page header. No separate `<h1>`.

```
┌─────────────────────────────────────────────────────────┐
│ [Search] ─────────── [Create] [CTA] [Filter] [Sort] [▦▤]│
└─────────────────────────────────────────────────────────┘
[card grid below]
```

```tsx
<main>
  <FilterBar {/* toolbar props */} />
  <DesignCardGrid />
</main>
```

### Variant 2 — Title + Toolbar (Category, Package Detail)

A title (and optional Breadcrumb) precedes the FilterBar.

```
[Breadcrumb: Dashboard › Luxury]
[Most Popular Templates         ]   ← <h1>
[Search] ──────────── [Sort] [▦▤]   ← FilterBar
```

```tsx
<main>
  <Breadcrumb items={[{ label: "Dashboard", href: "/" }]} currentPage="Most Popular Templates" />
  <h1 style={{ fontSize: "var(--text-heading-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", margin: "8px 0 12px" }}>
    Most Popular Templates
  </h1>
  <FilterBar {/* ... */} />
  <TemplateCardGrid />
</main>
```

Token usage: title uses `--text-heading-sm` (18px) for most screens; `--text-heading-md` (22px) for top-level category headings.

### Variant 3 — Editor Top Bar

Dense dark bar, full-width. See `specs/patterns/toolbar-menus.md` — the editor top bar is already documented there. Not repeated here.

## When to Use Each Variant

| Screen | Variant | Reason |
|--------|---------|--------|
| My Designs / Scheduled | Toolbar Only | Content-centric; the toolbar is the navigation context |
| Template categories | Title + Toolbar | Category name orients the user; breadcrumb shows hierarchy |
| AMP Package Detail | Title + Toolbar | Package name + date are primary metadata |
| Design Editor | Editor Top Bar (see Toolbar Menus) | Full-viewport editor; title is implicit |

## Token Reference

| Element | Token |
|---------|-------|
| Page title (large) | `var(--text-heading-md)` (22px) + `var(--font-weight-semibold)` |
| Page title (standard) | `var(--text-heading-sm)` (18px) + `var(--font-weight-semibold)` |
| Title color | `var(--color-text-primary)` |
| Breadcrumb gap above title | `var(--spacing-1)` (4px) |
| Title bottom margin before FilterBar | `var(--spacing-3)` (12px) |

## Anti-patterns

- Do not create a `<PageHeader>` component in `@maxa/ui` — the three variants are simple compositions; abstracting them prematurely produces rigid wrapper components that break on the next product screen.
- Do not use `--text-heading-2xl` or `--text-heading-xl` for page titles — these are reserved for marketing headings, not product UI.
- Do not fabricate heading sizes; use `--text-heading-sm` (18px) or `--text-heading-md` (22px) from the token system.
- Do not show a FilterBar without a `<main>` landmark — accessibility requires page structure.
