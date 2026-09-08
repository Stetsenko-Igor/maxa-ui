# MAXA theme and namespace extraction

Approved objective: isolate a complete MAXA theme and resolve public CSS naming before creating Concept3D's foundation. Preserve MAXA appearance and Figma identities. Local only.

## Decision

Add an opt-in generated namespaced distribution. Existing entrypoints remain compatible. A global rename would break current consumers and design references; CSS-only prefixing would miss React inline token references. A separate generated React/CSS subtree handles both without a second hand-maintained component implementation.

Canonical source token names and values remain authoritative for Figma, source documentation and existing consumers. Build-time ownership classification separates reusable palette/component alias recipes from MAXA decisions, including semantic mappings, brand palette, typography, geometry, motion/shadows and component-specific literals or direct palette choices. Generate `namespaced/core.css` (palette/recipes), `namespaced/themes/maxa.css` (complete decisions), and `namespaced/theme.css` (both). Do not call the legacy core neutral.

Map owned variables `--foo` to `--maxa-foo`, preserving vendor Radix variables, namespaced CSS classes and all values. Namespace animation identifiers and the theme attribute (`data-maxa-theme`). Generate matching `@maxa/ui/namespaced` React and `@maxa/ui/namespaced/styles.css` exports; do not inject generic variable aliases. The namespace identifies the library, not a client's brand. Only one MAXA UI delivery variant may be loaded per document.

Whole-document theming remains the contract. Nested themes, mixed delivery variants, immunity to arbitrary global host rules, Tailwind adapters, actual client palettes, registry release and deployment are outside this change. Concept3D scaffolding follows verification and real product inputs.

## Acceptance

- Existing full theme still exposes identical names/raw values/light-dark behavior; Figma unchanged.
- New core plus MAXA theme exactly reconstructs the source inventory, each owned once.
- New outputs contain no generic owned CSS variables and preserve external variables.
- Packed React and plain CSS consumers work with conflicting host variables, independent host/theme mode, runtime inline token helpers and portalled components.
- Tests, types, build, reference/Figma freshness and documentation are updated; local checkpoint and completion commit retained.
