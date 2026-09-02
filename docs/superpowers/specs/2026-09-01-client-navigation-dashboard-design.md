# Client Navigation and Dashboard Design

## Status

Approved direction from the 2026-09-01 visual review. Implementation target:
`AI/Client Side Updates and Improvements/prototypes/header-settings-explorations/`.

## Goal

Bring the prototype navigation back in line with the current Maxa product structure while improving
the rail's edge rhythm and making navigation search read as an editable field.

## Decisions

### Rail geometry

- Keep the current 264px default rail width, resize bounds, collapsed mode, row height, icon size,
  indentation system, and recursive tree renderer.
- Change expanded navigation rows from an 8px outer inset to a geometrically symmetric 12px inset
  on both sides.
- Keep the current `scrollbar-width: thin` and 4px WebKit fallback; use the native automatic gutter
  so overlay scrollbars do not reserve empty space.
- Allow the operating system and browser to control whether the native scrollbar thumb is visible.
- Keep direct scroll-zone groups at the rail's inner width so a classic scrollbar cannot narrow the
  lower hover/selection surfaces. Do not create a custom scrollbar or use asymmetric item margins.

### Navigation search

- Give the search container a 16px horizontal outer inset so it is narrower than navigation rows.
- Restore the normal field distinction: surface background plus the standard neutral field border.
- Keep the existing field height, icon, placeholder, keyboard shortcut, query behavior, and brand
  focus border.
- Do not use the muted navigation-state fill for the resting search field; it makes the field appear
  disabled and visually collides with hover and selection states.

### Top-level structure

Remove the proposed `WORK` and `LIBRARY` captions. The expanded rail order is:

1. Dashboard disclosure
   - My Designs
   - Compliance
   - Scheduled
2. Search navigation
3. Manual Listings
4. Automated Packages
5. Templates
6. Workspaces
7. Explore Tags
8. Tutorials
9. Support
10. Account Settings

Dashboard uses the same 36px row geometry, 14px typography, icon size, and horizontal padding as
every other root navigation item. It must not use a larger context-row treatment.

Dashboard and every ordinary disclosure use the same 1px root-to-children rhythm. Whether Dashboard
is open or closed, the next search field starts 12px after the complete Dashboard section.

### Dashboard behavior

- Dashboard is both the overview destination and the disclosure control for its three children.
- Activating Dashboard from another destination selects the Dashboard overview and opens its children
  inline between the Dashboard row and the search field.
- Activating Dashboard again while its overview is already selected toggles the branch without
  changing the selected overview.
- Selecting a Dashboard child keeps the branch open, removes selection from the Dashboard parent,
  and selects only that child. The expanded parent may retain its existing emphasized label treatment.
- In collapsed mode, activating Dashboard expands the rail and opens the Dashboard branch.
- My Designs, Compliance, and Scheduled remain independent destinations and use the existing
  single-selection contract.
- The Dashboard caret reflects disclosure state and uses the same caret treatment as other parents.

### Dashboard overview surface

- Base the surface hierarchy on the supplied current Dashboard reference, not on a generic page.
- Reuse existing Maxa typography, spacing, controls, cards, and page-shell styles.
- Represent image-heavy preview content with neutral gray skeleton rectangles. No image sourcing or
  bespoke illustrations are required for this pass.
- The surface only needs enough representative sections to communicate the Dashboard overview and
  support interaction review; it does not need production data or working business actions.

### Configurable client trees

- Preserve the current recursive data-driven navigation model and its existing multi-level depth.
- Keep `Most Popular Templates`, the dynamic `Favorites` collection, `Swag Shop`, and
  `Concierge Shop` before the configured client categories. `Favorites` remains hidden while empty.
- The prototype fixture must reproduce the supplied Print Templates, Digital Templates, AMP Designs,
  and Admin hierarchy exactly, including order, capitalization, punctuation, and all nested children.
- Admin-configured category branches render in full inside the rail's single scroll flow; they do not
  use `Show all`/`Show less`. Explore Tags retains its component-specific result limit and control.
- Do not flatten nested category rows. The renderer remains data-driven so another client's admin
  configuration can replace this fixture without changing the component anatomy.

### Visual language

- Use the existing icon set and icon mappings from the prototype. Do not use preview glyphs or add a
  second icon style.
- Preserve the existing neutral hover and selected treatments, tree connectors, favorites affordance,
  row menus, focus states, animation timing, and typography tokens.
- The resting navigation search field remains the only navigation state-color change; menu hover and
  selected rows continue to use `--color-bg-muted`.
- In light mode, all image-free card preview areas use the shared pattern-scoped
  `--pattern-card-placeholder-bg` value (`#E7EBF2`). This covers both generic result cards and the
  Dashboard overview cards. Dark mode maps the same pattern token back to
  `--color-bg-neutral-muted`.
- Keep `#E7EBF2` local to the prototype pattern until the role is standardized across the product;
  then promote it to a shared semantic token in the Maxa design system and Figma library.
- Do not remap the global background semantics for this adjustment. `--color-bg-muted`,
  `--color-bg-neutral-muted`, and `--color-bg-page` remain shared system roles.

## Implementation boundaries

Expected files are limited to the prototype navigation model, renderer/state, navigation CSS,
Dashboard page/result fixtures, and focused verification scripts. The core `maxa-ui` component
library is not gaining a new public Sidebar component in this pass.

## Verification

- Automated checks must assert 12px symmetric row insets, 16px search insets, unchanged 36px row
  height, native thin scrollbar behavior, and default bordered search styling. At least one geometry
  run must expose a classic scrollbar that consumes layout width rather than Playwright's hidden
  scrollbar default.
- Color checks must assert that navigation hover/selection retain `--color-bg-muted`, generic card
  thumbnails and Dashboard image placeholders resolve to `#E7EBF2` in light mode, and unrelated
  component fills retain their existing semantic tokens.
- Navigation checks must assert exact root order, absence of `WORK`/`LIBRARY` captions, Dashboard
  child order, Manual Listings presence, disclosure semantics, selection independence, and collapsed
  activation behavior.
- Existing recursive-tree, favorites, row-menu, filtering, resize, focus, short-viewport, and
  single-scroll-owner tests must remain green.
- Selecting a Favorites alias must produce exactly one selected row and one navigation
  `aria-current`, on the alias that was activated.
- The exact configured Templates fixture and the full rendering of its long direct-child lists must
  be checked automatically.
- Browser screenshots must cover the Dashboard branch open, the rail with overflow, Explore Tags
  open, and the Dashboard overview with skeleton previews.

## Alternatives considered

- **Optically compensated margins:** 12px left and 5px right with a 2px scrollbar. This reduced the
  perceived gutter difference but introduced asymmetric geometry and a custom scrollbar assumption.
- **Current geometry:** 8px row and search insets with muted search fill. This kept the implementation
  unchanged but left the original spacing and field-affordance problems unresolved.
- **Selected:** symmetric 12px navigation insets, 16px search insets, bordered surface search, and the
  current native thin scrollbar.
