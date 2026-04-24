# Token System — Phase 1: Foundation Variables

> **Status:** Complete (April 2026)  
> **Repository:** `AI/Design System` -> `packages/tokens/`  
> **Figma file:** Foundation Variables (beta) — `fGGIAUszvDV6QYHh0xXI7H`

---

## What Was Built

### 1. `@maxa/tokens` Package (CSS + TypeScript)

Three-layer CSS token architecture (`@theme {}` -> Tailwind v4):

| File | Contents |
|------|----------|
| `src/primitives.css` | Color primitives / palette |
| `src/themes/maxa.css` | Brand colors |
| `src/semantic.css` | Semantic colors: surface, text, border, etc. |
| `src/dimensions.css` | Spacing, border radius, width |
| `src/typography.css` | Font family, font-size + line-height pairs, font weight |
| `src/theme.css` | Main import for all token files |

**Typography naming** follows the Untitled UI size-based standard, not HTML tags:

- `text-xs` / `text-sm` / `text-md` / `text-lg` / `text-xl`
- `text-display-xs` -> `text-display-2xl`

**Font-weight tokens:**

- `regular` (400)
- `medium` (500)
- `semibold` (600)
- `bold` (700)

**Tailwind v4 double-dash syntax:**

```css
--text-display-2xl: 72px;
--text-display-2xl--line-height: 90px;
```

### 2. Figma Variables

Files live in:

- `packages/tokens/figma/`

| Collection | Modes | Files |
|-----------|------|-------|
| Breakpoints | Value | `breakpoints.json` |
| Primitives | Value | `primitives.json` |
| Spacing | Value | `spacing.json` |
| Radius | Value | `radius.json` |
| Color modes | Light / Dark | `colors-semantic-light.json`, `colors-semantic-dark.json` |
| Typography | Desktop / Tablet / Mobile | `typography.json`, `typography-tablet.json`, `typography-mobile.json` |
| Layout | Desktop / Tablet / Mobile | `layout-desktop/tablet/mobile.json` |

**Format:** W3C DTCG, for example `{"$value": 72, "$type": "number"}`  
**Manifest:** `manifest.json` maps collections, modes, and files.

**Breakpoints:**

| Token | Value |
|-------|-------|
| mobile | 375px |
| tablet | 768px |
| laptop | 1024px |
| desktop | 1280px |
| wide | 1440px |
| ultra | 1680px |
| max | 1920px |

**Layout methodology:**

- `Primitives -> Spacing -> Layout`
- `Spacing` = universal semantic spacing aliases
- `Layout` = designer-facing usage layer
- group-based naming in Figma:
  - `Stack/*`
  - `Inline/*`
  - `Container/*`
  - `Grid/*`

**Layout tokens (responsive, current agreed working state):**

| Token | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| `Stack/tight` | `spacing-xs` | `spacing-xs` | `spacing-xs` |
| `Stack/text` | `spacing-lg` | `spacing-lg` | `spacing-lg` |
| `Stack/default` | `spacing-xl` | `spacing-xl` | `spacing-xl` |
| `Stack/group` | `spacing-3xl` | `spacing-3xl` | `spacing-3xl` |
| `Stack/section` | `spacing-8xl` | `spacing-7xl` | `spacing-6xl` |
| `Inline/tight` | `spacing-md` | `spacing-md` | `spacing-md` |
| `Inline/default` | `spacing-lg` | `spacing-lg` | `spacing-lg` |
| `Inline/group` | `spacing-xl` | `spacing-xl` | `spacing-xl` |
| `Container/padding` | `spacing-4xl` | `spacing-3xl` | `spacing-xl` |
| `Container/max-width` | `1568` | `1568` | `1568` |
| `Grid/gutter` | `spacing-3xl` | `spacing-2xl` | `spacing-xl` |
| `Grid/margin` | `Container/padding` | `Container/padding` | `Container/padding` |

---

## Current Figma State

- **Breakpoints**: 1 mode, viewport references
- **Primitives**: colors + spacing primitives
- **Spacing**: semantic spacing aliases
- **Radius**: radius scale
- **Color modes**: Light / Dark semantic colors
- **Typography**: 3 modes (`Desktop / Tablet / Mobile`), font size + line height + font weight + font family
- **Layout**: 3 modes (`Desktop / Tablet / Mobile`), grouped designer-facing layout variables

Aliases between `Primitives`, `Spacing`, `Color modes`, and `Layout` are configured through import files.

**Responsive mode decision:** `Layout` and `Typography` remain separate collections.  
Both use `Desktop / Tablet / Mobile` modes, but designers switch them separately on a frame/page. This is an intentional compromise: two manual actions are acceptable, while the structure stays closer to code tokens and easier for developers to understand.

The idea of merging them into one `Responsive` collection is not being implemented now. It can be revisited later if the team experiences recurring pain from manually switching two collections.

---

## Next Steps

### Step 1 — Calibrate Layout Against Real Designs

Current `Layout` values are accepted as the working starter version.

Next practical step:

- review real product layouts
- validate `Stack/tight`, `Stack/group`, and `Grid/gutter`
- adjust alias mapping if needed without breaking the architecture

### Step 2 — Test Variables in One Component

Take one component, such as Button or Input, and bind it to all relevant variables. Confirm that responsive modes work as expected.

### Step 3 — Developer Documentation

Update `docs/figma-token-component-reference.md` with the complete CSS -> Figma Variables map.

---

## Tools

| Tool | Purpose |
|------|---------|
| **MAXA Token Importer v6** | Local dev plugin for importing `import-bundle.json`; stored under `.knowledge/Figma Plugins/MAXA Token Importer/`; can optionally load the latest pushed bundle from GitHub Raw and remove stale variables when cleanup is enabled |
| **Microsoft Variables Import** | Legacy/reference import approach for JSON variables with modes |
| **Token Studio** | Free plan does not support Variables + Modes; Pro only |
| Tailwind v4 `@theme {}` | CSS tokens become utilities automatically |

---

## Principles

- **Always standardize**: do not copy Figma as-is when a better industry standard exists.
- **Font weight in Figma**: strings such as `"Regular"` and `"SemiBold"`; in CSS, numeric values such as `400` and `600`.
- **Primitive spacing**: absolute values; `Spacing` = semantic aliases; `Layout` = designer-facing usage layer.
- **Layout naming**: grouped path names only (`Stack/*`, `Inline/*`, `Container/*`, `Grid/*`) so Figma preserves useful groups.
- **Grid/margin** and **Container/padding**: separate semantic tokens, even if their values temporarily match.
- **Brand surface foreground**: use `text/on-brand` over `bg/brand-solid`; do not assume white text by default.
- **Figma import workflow**: for fast local iterations, use drag-and-drop / Choose files with `import-bundle.json`; after pushing to `main`, the plugin can optionally be updated via `Load latest from GitHub`.
- **Typography**: size-based naming (Untitled UI), not HTML naming (not h1/h2/p).
- **Responsive collections**: `Layout` and `Typography` are not merged into one collection at this stage, to preserve code synchronization and developer readability.
