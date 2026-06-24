# Button — Component Spec

## Overview

The MAXA Button is a multi-variant interactive element. It uses component-level tokens that alias semantic tokens. All styling decisions are expressed through tokens — never hardcoded values.

**Component package:** `@maxa/ui` → `Button`
**Token source:** `packages/tokens/figma/component-button-light.json` + `component-button-dark.json`
**Pattern:** `forwardRef + cva + Slot (Radix)`

---

## Anatomy

```
[ leading-icon? ][ label ][ trailing-icon? ]
```

- **Icon-only** button: no label, uses `Button/icon-only/<size>/size` for square dimensions
- **Label button**: always has a text label
- Never combine icon-only layout with a visible label — if label exists, use standard button

---

## Variants

### `primary`
- **Use when:** Main call-to-action. One per view/section.
- **Background:** `--button-primary-bg` → `action/primary` (blue)
- **Text:** `--button-primary-text` → `text/inverse` (white)
- **DO NOT** use brand teal for primary. Primary = blue (`action/primary`).

### `secondary`
- **Use when:** Secondary action alongside a primary. Supporting action.
- **Background:** `--button-secondary-bg` → `action/neutral` (gray, filled)
- **Text:** `--button-secondary-text` → `text/primary`
- **DO NOT** render secondary as an outlined/white button — it is a filled neutral button.

### `outline`
- **Use when:** Tertiary action. Low visual weight but still prominent enough for a border.
- **Background:** `--button-outline-bg` → `bg/surface` (raised neutral surface)
- **Border:** `--button-outline-border` → `border/primary`
- **Text:** `--button-outline-text` → `text/primary`

### `ghost`
- **Use when:** Inline actions, toolbar buttons, icon actions in dense UI.
- **Background:** transparent (no fill, no border at rest)
- **Hover:** `--button-ghost-bg-hover` → `action/neutral-subtle-hover`
- **Text:** `--button-ghost-text` → `text/secondary`

### `link`
- **Use when:** Inline text links that behave as buttons, navigation-adjacent actions.
- **Background:** transparent, no border
- **Text:** `--button-link-text` → `action/primary` (blue)
- **Hover text:** `--button-link-text-hover` → `action/primary-hover`
- No underline by default in MAXA UI — relies on color context.

### `success`
- **Use when:** Confirming a positive/completed action (e.g. "Mark as complete", "Approve").
- **Background:** `--button-success-bg` → `action/positive` (green)
- **Text:** `--button-success-text` → `text/inverse`
- Use sparingly — only when the green color meaningfully communicates the action's outcome.

### `danger`
- **Use when:** Destructive, irreversible actions (delete, remove, revoke).
- **Background:** `--button-danger-bg` → `action/negative` (red)
- **Text:** `--button-danger-text` → `text/inverse`
- Always pair with a confirmation dialog for truly destructive actions.

### `warning`
- **Use when:** Reversible cautious actions that need attention but are not destructive (e.g. publish overrides, override-defaults).
- **Background:** `--button-warning-bg` → `action/warning` (yellow)
- **Text:** `--button-warning-text` → `text/primary` (yellow needs dark foreground for contrast)
- Distinct from `danger` — warning does not imply destruction.

### `text`
- **Use when:** Inline tertiary action that should read as a control but carry no surface weight (e.g. "Cancel" in a footer, inline "Edit").
- **Background:** transparent always (no hover surface).
- **Text:** `--button-text-text` → `text/primary`; on hover shifts to `action/primary`.
- Differs from `link`: no underline, follows button spacing inside layouts.
- Differs from `ghost`: no hover background surface.

---

## Sizes

| Size | Height | Padding X | Gap | Radius | Font size | Line height | Weight | Icon size |
|------|--------|-----------|-----|--------|-----------|-------------|--------|-----------|
| `xs` | 24px | 6px (spacing-sm) | 2px (spacing-xxs) | 4px (radius-xs) | 12px (text-sm) | 14px | Medium 500 | 12px |
| `sm` | 28px | 10px | 4px (spacing-xs) | 4px (radius-xs) | 12px (text-sm) | 14px | SemiBold 600 | 16px |
| `md` | 36px | 16px (spacing-xl) | 6px (spacing-sm) | 4px (radius-xs) | 12px (text-sm) | 14px | SemiBold 600 | 16px |
| `lg` | 48px | 24px (spacing-3xl) | 8px (spacing-md) | 6px (radius-sm) | 14px (text-md) | 20px | SemiBold 600 | 20px |

Note: `xs` uses Medium weight (500). All other sizes use SemiBold (600). `sm` padding-x (10px) has no named spacing alias — stored as raw value.

**Icon-only square sizes:**
- `xs` → 24×24px
- `sm` → 28×28px
- `md` → 36×36px
- `lg` → 48×48px

---

## Layout flags

- **`iconOnly`** — collapses padding to a square hit-target sized via `--button-icon-only-{size}-size`.
- **`fullWidth`** — stretches the button to `width: 100%`. Cancels `iconOnly` aspect-ratio when both set.

---

## States

| State | How to apply | Token pattern |
|-------|-------------|---------------|
| Default | No modifier | `--button-{variant}-bg` |
| Hover | `:hover` | `--button-{variant}-bg-hover` |
| Active | `:active` | `--button-{variant}-bg-active` |
| Focus | `:focus-visible` | `--button-{variant}-border-focus` → `border/focus` |
| Disabled | `disabled` attr or `aria-disabled` | `opacity: var(--button-disabled-opacity)` = 50% |
| Loading | custom state | replace label with spinner, keep size/variant |

**Disabled rule:** Apply `--button-disabled-opacity` (50%) to the whole button element via `opacity`. Do not individually override background/text/border for disabled state.

**Focus rule:** Focus ring uses `--button-{variant}-border-focus` which maps to `--color-border-focus`. A full Effects/ring token layer is deferred.

---

## Token Reference

### Primary variant tokens
```css
--button-primary-bg:            var(--color-action-primary);
--button-primary-bg-hover:      var(--color-action-primary-hover);
--button-primary-bg-active:     var(--color-action-primary-active);
--button-primary-text:          var(--color-text-inverse);
--button-primary-border:        var(--color-action-primary);
--button-primary-border-hover:  var(--color-action-primary-hover);
--button-primary-border-focus:  var(--color-border-focus);
```

### Size tokens (md example)
```css
--button-size-md-height:      36px;
--button-size-md-padding-x:   var(--spacing-xl);       /* 16px */
--button-size-md-gap:         var(--spacing-sm);        /* 6px */
--button-size-md-radius:      var(--radius-xs);         /* 4px */
--button-size-md-text:        var(--font-size-text-sm); /* 12px */
--button-size-md-line-height: 14px;
--button-size-md-weight:      var(--font-weight-semibold);
--button-size-md-icon-size:   16px;
```

### Size tokens (lg example)
```css
--button-size-lg-height:      48px;
--button-size-lg-padding-x:   var(--spacing-3xl);      /* 24px */
--button-size-lg-gap:         var(--spacing-md);        /* 8px */
--button-size-lg-radius:      var(--radius-sm);         /* 6px */
--button-size-lg-text:        var(--font-size-text-md); /* 14px */
--button-size-lg-line-height: 20px;
--button-size-lg-weight:      var(--font-weight-semibold);
--button-size-lg-icon-size:   20px;
```

### Disabled + font
```css
--button-disabled-opacity: 0.5;
--button-font-family:      var(--font-family-body);  /* Montserrat */
```

---

## Code Example (React + CVA)

```tsx
<Button variant="primary" size="md">
  Save changes
</Button>

<Button variant="danger" size="sm">
  Delete
</Button>

<Button variant="ghost" size="md" aria-label="Settings">
  <SettingsIcon />
</Button>
```

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `background: #0265DC` | `background: var(--button-primary-bg)` |
| `border-radius: 4px` | `border-radius: var(--button-size-md-radius)` |
| Using `primary` for every action | Reserve `primary` for one CTA per view |
| White text on `success`/`danger` via `text-inverse` | Use `--button-success-text` / `--button-danger-text` |
| `secondary` as outlined white button | `secondary` is a filled gray button |
| Custom disabled styles | Use `--button-disabled-opacity: 0.5` on the element |

---

## Figma component structure

```
Buttons/
├── Button           — text label buttons (variant + size + state + icon-leading/trailing props)
├── Button destructive — red danger variant
└── Icon button      — icon-only, square
```

`Buttons/Button success` is only added if real product usage proves it is systemic.

---

## Source files

- Token JSON: `packages/tokens/figma/component-button-light.json`
- Token JSON: `packages/tokens/figma/component-button-dark.json`
- Figma collection: `Component-based Tokens` → `Button/*`
- React component: `packages/ui/src/components/button/` (reference pattern)
