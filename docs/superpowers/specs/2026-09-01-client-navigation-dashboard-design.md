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
- Keep the current `scrollbar-width: thin`, stable scrollbar gutter, and 4px WebKit fallback.
- Allow the operating system and browser to control whether the native scrollbar thumb is visible.
- Do not create a custom scrollbar or compensate for the gutter with asymmetric item margins.

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
- The supplied Print Templates, Digital Templates, AMP Designs, and Admin example defines the kind
  of admin-configured hierarchy the renderer must continue to support.
- Do not hard-code that example as the only client's navigation and do not flatten nested category
  rows. Existing client fixtures may remain unless a fixture update is needed to prove the structure.

### Visual language

- Use the existing icon set and icon mappings from the prototype. Do not use preview glyphs or add a
  second icon style.
- Preserve the existing neutral hover and selected treatments, tree connectors, favorites affordance,
  row menus, focus states, animation timing, and typography tokens.
- The only state-color change in this pass is the resting navigation search field.

## Implementation boundaries

Expected files are limited to the prototype navigation model, renderer/state, navigation CSS,
Dashboard page/result fixtures, and focused verification scripts. The core `maxa-ui` component
library is not gaining a new public Sidebar component in this pass.

## Verification

- Automated checks must assert 12px symmetric row insets, 16px search insets, unchanged 36px row
  height, native thin scrollbar behavior, and default bordered search styling.
- Navigation checks must assert exact root order, absence of `WORK`/`LIBRARY` captions, Dashboard
  child order, Manual Listings presence, disclosure semantics, selection independence, and collapsed
  activation behavior.
- Existing recursive-tree, favorites, row-menu, filtering, resize, focus, short-viewport, and
  single-scroll-owner tests must remain green.
- Browser screenshots must cover the Dashboard branch open, the rail with overflow, Explore Tags
  open, and the Dashboard overview with skeleton previews.

## Alternatives considered

- **Optically compensated margins:** 12px left and 5px right with a 2px scrollbar. This reduced the
  perceived gutter difference but introduced asymmetric geometry and a custom scrollbar assumption.
- **Current geometry:** 8px row and search insets with muted search fill. This kept the implementation
  unchanged but left the original spacing and field-affordance problems unresolved.
- **Selected:** symmetric 12px navigation insets, 16px search insets, bordered surface search, and the
  current native thin scrollbar.
