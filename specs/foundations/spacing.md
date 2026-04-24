# Spacing Tokens — Foundation Spec

## Architecture

Three layers: Primitives → Spacing (semantic scale) → Layout (designer usage layer).

```
Primitives/Spacing/4 (16px) = 16
    ↓
spacing-xl = 16px
    ↓
Layout/Stack/default = spacing-xl (used by designers in Auto layout)
```

**Rule:** In code, use CSS spacing variables. Never hardcode `px` values that exist in the scale.

## Semantic Spacing Scale

| Token | Value | CSS variable |
|-------|-------|-------------|
| `spacing-none` | 0px | `--spacing-none` |
| `spacing-xxs` | 2px | `--spacing-xxs` |
| `spacing-xs` | 4px | `--spacing-xs` |
| `spacing-sm` | 6px | `--spacing-sm` |
| `spacing-md` | 8px | `--spacing-md` |
| `spacing-lg` | 12px | `--spacing-lg` |
| `spacing-xl` | 16px | `--spacing-xl` |
| `spacing-2xl` | 20px | `--spacing-2xl` |
| `spacing-3xl` | 24px | `--spacing-3xl` |
| `spacing-4xl` | 32px | `--spacing-4xl` |
| `spacing-5xl` | 40px | `--spacing-5xl` |
| `spacing-6xl` | 48px | `--spacing-6xl` |
| `spacing-7xl` | 64px | `--spacing-7xl` |
| `spacing-8xl` | 80px | `--spacing-8xl` |
| `spacing-9xl` | 96px | `--spacing-9xl` |
| `spacing-10xl` | 128px | `--spacing-10xl` |
| `spacing-11xl` | 160px | `--spacing-11xl` |

## Layout Tokens (responsive)

Layout tokens express usage intent. They are responsive — values differ per breakpoint.

### Stack (vertical spacing between elements)

| Token | Desktop | Tablet | Mobile | When to use |
|-------|---------|--------|--------|------------|
| `Stack/tight` | 4px | 4px | 4px | Between closely related items (icon+label) |
| `Stack/text` | 12px | 12px | 12px | Between lines of text, list items |
| `Stack/default` | 16px | 16px | 16px | Default vertical gap between elements |
| `Stack/group` | 24px | 24px | 24px | Between groups of related content |
| `Stack/section` | 80px | 64px | 48px | Between major page sections |

### Inline (horizontal spacing between elements)

| Token | Desktop | Tablet | Mobile | When to use |
|-------|---------|--------|--------|------------|
| `Inline/tight` | 8px | 8px | 8px | Between icon and adjacent label |
| `Inline/default` | 12px | 12px | 12px | Default horizontal gap |
| `Inline/group` | 16px | 16px | 16px | Between grouped inline items |

### Container / Grid

| Token | Desktop | Tablet | Mobile | When to use |
|-------|---------|--------|--------|------------|
| `Container/padding` | 32px | 24px | 16px | Left/right page padding |
| `Container/max-width` | 1568px | 1568px | 1568px | Maximum content width |
| `Grid/gutter` | 24px | 20px | 16px | Column gap in grid layouts |
| `Grid/margin` | = Container/padding | = Container/padding | = Container/padding | Grid outer margin |

## Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `gap: 16px` | `gap: var(--spacing-xl)` |
| `padding: 24px` | `padding: var(--spacing-3xl)` |
| `margin-top: 80px` | `margin-top: var(--spacing-8xl)` |
| Custom arbitrary value like `padding: 13px` | Find the nearest step in the scale |

## When a value doesn't exist in the scale

Do not invent values. Round to the nearest step. If a design calls for an off-scale value, raise it as a design question — do not add arbitrary CSS.

## Source files

- CSS: `packages/tokens/src/dimensions.css`
- Figma collections: `Spacing` (semantic scale), `Layout` (responsive usage layer), `Primitives` (raw values)
