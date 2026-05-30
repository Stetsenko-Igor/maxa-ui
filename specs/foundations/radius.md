# Radius Tokens — Foundation Spec

## Scale

| Token | Value | CSS variable | When to use |
|-------|-------|-------------|-------------|
| `radius-none` | 0px | `--radius-none` | Sharp-cornered elements, dividers |
| `radius-xxs` | 2px | `--radius-xxs` | Tiny chips, tags, inline badges |
| `radius-xs` | 4px | `--radius-xs` | Small badges, code snippets |
| `radius-sm` | 6px | `--radius-sm` | Small buttons (sm size) |
| `radius-md` | 8px | `--radius-md` | Default buttons (sm, md), inputs, dropdowns |
| `radius-lg` | 10px | `--radius-lg` | Large buttons (lg size) |
| `radius-xl` | 12px | `--radius-xl` | Cards, panels, modals (sm) |
| `radius-2xl` | 16px | `--radius-2xl` | Cards, panels, modals (default) |
| `radius-3xl` | 20px | `--radius-3xl` | Large cards, popovers |
| `radius-4xl` | 24px | `--radius-4xl` | Feature blocks, hero cards |
| `radius-full` | 9999px | `--radius-full` | Pills, avatars, toggle tracks, circular icons |

## Usage Guidelines

### Buttons
- `sm` button → `radius-md` (8px)
- `md` button → `radius-md` (8px)
- `lg` button → `radius-lg` (10px)
- Icon-only buttons follow the same rule as text buttons by size

### Form inputs
- Default input → `radius-md` (8px)
- Select, combobox → `radius-md` (8px)

### Surfaces / containers
- Tooltip → `radius-xs` (4px) or `radius-sm` (6px)
- Dropdown menu → `radius-md` (8px)
- Card → `radius-2xl` (16px)
- Modal / dialog → `radius-2xl` (16px) or `radius-3xl` (20px)
- Sheet / drawer → `radius-2xl` top corners only

### Badges / pills
- Status badge → `radius-full` (9999px)
- Count badge → `radius-full` (9999px)
- Tag (removable/data label) → `radius-sm` (6px)

## Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `border-radius: 8px` | `border-radius: var(--radius-md)` |
| `border-radius: 50%` | `border-radius: var(--radius-full)` |
| `border-radius: 100px` | `border-radius: var(--radius-full)` |
| Custom value like `border-radius: 6px` on a card | `border-radius: var(--radius-2xl)` |

## Source files

- Figma collection: `Radius`
- JSON: `packages/tokens/figma/radius.json`
