# Badge and Tag Component Plan

Status: accepted direction  
Created: 2026-05-30  
Supersedes: `/Users/igorstetsenko/.claude/plans/vault-users-igorstetsenko-library-mobil-tranquil-locket.md`

## Decision

Do not merge `Tag` into `Badge`.

The older Claude plan proposed `Tag` as a thin alias of `Badge`. That direction is now obsolete. `Badge` and `Tag` should stay separate components because they represent different product semantics, even when they share visual anatomy and color palettes.

Authoritative model:

- `Badge` = status, count, quality, or metadata indicator.
- `Tag` = data label, category, selected value, or editable/removable entity attribute.
- `FilterChip` = interactive query/control chip that changes a result set.
- `Pill` = shape/radius treatment, not a primary semantic component.

## Badge

Badge should be a rich indicator component inspired by Tetrisly-style Badge properties and the cross-system research corpus.

### Purpose

Use Badge for compact non-interactive information:

- status: `Active`, `Draft`, `Pending`, `Failed`
- count: `12`
- quality/flag: `Verified`, `Premium`, `New`
- metadata: short non-editable labels

Badge must not be removable. If something can be removed from an entity, use `Tag`.

### Shape

- Radius: `radius-full` / `9999px`
- Visual reading: pill indicator

### Props

```ts
type BadgeAppearance =
  | "gray" | "red" | "orange" | "amber" | "yellow" | "lime"
  | "green" | "emerald" | "teal" | "cyan" | "sky"
  | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"

type BadgeIntent = "neutral" | "info" | "success" | "warning" | "error"
type BadgeEmphasis = "low" | "medium" | "high"
type BadgeSize = "sm" | "md" | "lg"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  appearance?: BadgeAppearance
  intent?: BadgeIntent
  emphasis?: BadgeEmphasis
  size?: BadgeSize
  asChild?: boolean
  icon?: React.ReactNode
  trailingIcon?: React.ReactNode
  children?: React.ReactNode
}
```

### Color Model

Badge has two color vocabularies:

1. `intent` for semantic state.
2. `appearance` for decorative/product taxonomy color.

When both are present, implementation must define a clear precedence. Current recommended precedence:

- `appearance` wins for visual color.
- `intent` remains the semantic choice for status examples and docs.
- Docs should explain that `appearance` is for category-like visual coding, while `intent` is for system meaning.

Do not add `removable`, `onRemove`, or close-button behavior to Badge.

### Required Size Model

Badge must support all three sizes:

- `sm`
- `md`
- `lg`

The exact token values should be implemented in component tokens before Figma handoff and React finalization.

## Tag

Tag should share Badge's appearance palette and emphasis model, but it must not have semantic `intent`.

### Purpose

Use Tag for compact data labels:

- category: `Luxury`, `Commercial`, `Investment`
- property attribute: `Sea view`, `Prague`, `3 bedrooms`
- customer/entity label: `VIP client`, `Lead`, `Returning`
- selected/editable/removable value

Tag may be static, selected, or removable. Tag is not a status indicator and should not carry success/warning/error intent.

### Shape

- Radius: `radius-sm` / `6px`
- Visual reading: data object, not pill status indicator

### Props

```ts
type TagAppearance =
  | "gray" | "red" | "orange" | "amber" | "yellow" | "lime"
  | "green" | "emerald" | "teal" | "cyan" | "sky"
  | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"

type TagEmphasis = "low" | "medium" | "high"
type TagSize = "sm" | "md" | "lg"

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  appearance?: TagAppearance
  emphasis?: TagEmphasis
  size?: TagSize
  removable?: boolean
  onRemove?: () => void
  asChild?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
}
```

### Intent Rule

Tag must not expose `intent`.

If a label communicates `success`, `warning`, `error`, or `info`, it is probably a `Badge`. If it labels an entity/category and only needs a color bucket, use `appearance`.

### Trailing Slot Rule

For v1, Tag should not expose a generic `trailingIcon`.

Reason: the trailing position is reserved for `removable`. A generic trailing icon plus remove button creates unclear hierarchy and Figma property ambiguity.

Allowed:

- leading `icon`
- trailing remove button via `removable`

Deferred:

- `trailingIcon`, only if product usage proves it is needed and does not conflict with removable behavior.

### Required Size Model

Tag must support all three sizes:

- `sm`
- `md`
- `lg`

## Shared Tokens

Badge and Tag may share primitive values and palette references, but they should have separate component-token namespaces.

Recommended namespaces:

```css
--badge-*
--tag-*
```

Shared anatomy categories:

- background
- foreground
- border
- icon color
- radius
- height
- padding-x
- gap
- font family
- font size
- font weight
- line height
- icon size

Tag-specific:

- remove foreground
- remove hover background
- remove focus ring
- remove size

Badge-specific:

- intent mapping
- optional decorative appearance mapping

## Figma Properties

Recommended Badge Figma properties:

- `Appearance`: gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
- `Intent`: neutral, informative/info, positive/success, negative/error, warning, none
- `Emphasis`: high, medium, low
- `Size`: sm, md, lg
- `hasLabel`: yes/no
- `hasBeforeIcon`: yes/no
- `hasAfterIcon`: yes/no
- `Label`
- `Before Icon`
- `After Icon`

Recommended Tag Figma properties:

- `Appearance`: gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
- `Emphasis`: high, medium, low
- `Size`: sm, md, lg
- `hasLabel`: yes/no
- `hasBeforeIcon`: yes/no
- `removable`: yes/no
- `Label`
- `Before Icon`

Tag intentionally has no `Intent`.

## Implementation Checklist

Implementation status after 2026-05-30 pass:

- `packages/ui/src/components/badge/badge.tsx` supports `BadgeSize = "sm" | "md" | "lg"`.
- `packages/ui/src/components/tag/tag.tsx` supports `TagEmphasis = "low" | "medium" | "high"`.
- `Tag` supports `lg`, `removable`, and no `intent`.
- `Badge` supports `intent`, `appearance`, `emphasis`, and `lg`.
- `packages/tokens/figma/import-bundle.json` has been regenerated with Badge/Tag medium appearance and size tokens.

1. Update `specs/components/badge.md`:
   - add `lg` to `BadgeSize`
   - keep `intent`, `appearance`, and `emphasis`
   - explicitly forbid `removable`
2. Add or update `specs/components/tag.md`:
   - document `appearance`, `emphasis low/medium/high`, `size sm/md/lg`
   - document `removable` and `onRemove`
   - explicitly forbid `intent`
3. Update `specs/components/badge-tag-pill.md`:
   - mark old Tag-with-intent guidance as superseded
   - point to `badge.md`, `tag.md`, and this plan
4. Update component tokens:
   - Badge: add `lg` size tokens if missing
   - Tag: ensure `medium` emphasis exists
   - Tag: ensure radius uses `radius-sm` / `6px`
5. Update React components:
   - Badge: add `lg` size
   - Tag: add `medium` emphasis if missing
   - Tag: keep `lg`
   - Tag: keep `removable`
   - Tag: do not add `intent`
6. Update docs:
   - Badge docs: include `lg`, intent, appearance, emphasis, icon examples
   - Tag docs: include `lg`, appearance, emphasis, removable examples
   - Tag docs: explicitly state "Tag has no intent"
7. Update tests:
   - Badge: test `lg`
   - Tag: test `medium`, `lg`, `removable`, `onRemove`, and no intent API
8. Regenerate Figma bundle after token changes:
   - `pnpm figma:bundle`

## Do Not Do

- Do not follow the old "Merge Tag into Badge" plan.
- Do not export `Tag` as an alias of `Badge`.
- Do not add `removable` to Badge.
- Do not add `intent` to Tag.
- Do not create `Pill` as a standalone component unless a product-specific semantic appears.
