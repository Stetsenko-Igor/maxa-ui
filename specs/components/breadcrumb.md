# Breadcrumb

## Purpose

Breadcrumb shows the user's location in a hierarchy and provides quick navigation back to parent scopes.

## Anatomy

- Nav root with `aria-label="Breadcrumb"`.
- Ordered list.
- Link items. `BreadcrumbLink` and `BreadcrumbPage` accept an optional `iconLeading` node — a
  leading icon before the label (e.g. a Home icon on the root crumb). Most crumbs have none.
- Current page item.
- Separator: a `CaretRight` chevron icon by default (10px), not a literal character. Pass
  `children` to override with custom content (e.g. `/`).
- Ellipsis helper (`BreadcrumbEllipsis`): a bare trigger button rendering `...` — it has no
  built-in collapsed-menu behavior. Pair it with `DropdownMenu` in the consumer to make the hidden
  middle levels navigable (see the docs "Long path" example).

## Accessibility

Current page uses `aria-current="page"`. Separators are presentation-only.
