# Button — Component Spec

## Overview

The MAXA Button is a multi-variant interactive element. It uses component-level tokens that alias semantic tokens. All styling decisions are expressed through tokens — never hardcoded values.

**Component package:** `@maxa/ui` → `Button`
**Token source:** `packages/tokens/figma/component-button.json`
**Pattern:** `forwardRef + cva + Slot (Radix)`

The Figma v3 master (`11020:118515`) is the current design source of truth. Figma, runtime CSS, component tokens, and Storybook use the same v3 layout contract.

---

## Anatomy

```
[ leading-icon? ][ Text padding [ label ] ][ trailing-icon? ]
```

- **Regular button:** leading and trailing icons are Boolean component properties; the icon instances remain swappable.
- **Text padding:** preserves the optical edge when either icon is hidden without multiplying variants.
- **Icon-only button:** remains in the same Button component set through the `Icon Only` variant and uses the regular size height as its square size.
- Never combine icon-only layout with a visible label.

---

## Variants

### `primary`

- **Use when:** Main call-to-action. One per view/section.
- **Background:** `--button-primary-bg` → `action/primary` (blue)
- **Text and icons:** `--button-primary-text` / `--button-primary-fg` → white in both themes
- **DO NOT** use brand teal for primary. Primary = blue (`action/primary`).

### `secondary`

- **Use when:** Secondary action alongside a primary. Supporting action.
- **Background:** `--button-secondary-bg` → `action/neutral` (gray, filled)
- **Text:** `--button-secondary-text` → `text/primary`
- **DO NOT** render secondary as an outlined/white button — it is a filled neutral button.

### `outline`

- **Use when:** Tertiary action. Low visual weight but still prominent enough for a border.
- **Background:** transparent by default (`--button-outline-bg`)
- **Optional surface:** set `outlineSurface` to use `--button-outline-bg-surface` → `bg/surface`; useful over busy or non-surface content
- **Border:** `--button-outline-border` → `border/primary`
- **Hover/active border:** `--button-outline-border-hover` / `--button-outline-border-active` → `border/neutral-muted`
- **Text:** `--button-outline-text` → `text/primary`

### `ghost`

- **Use when:** Inline actions, toolbar buttons, icon actions in dense UI.
- **Background:** transparent (no fill, no border at rest)
- **Hover:** `--button-ghost-bg-hover` → `action/neutral-subtle-hover`
- **Text:** `--button-ghost-text` → `text/secondary`

### `link`

- **Use when:** Inline text links that behave as buttons, navigation-adjacent actions.
- **Background:** transparent, no border
- **Text:** `--button-link-text` → `text/link` (theme-aware blue)
- **Hover text:** `--button-link-text-hover` → `text/link-hover`
- **Icon foreground:** `--button-link-fg` → `foreground/fg-link`
- **Hover/active icon foreground:** `--button-link-fg-hover` / `--button-link-fg-active`
- **Layout:** Hug content with zero padding and zero border width; size tokens affect only the label, icon, and their gap
- No underline by default in MAXA UI — relies on color context.

### `positive`

- **Use when:** Confirming a successful/completed action (e.g. "Mark as complete", "Approve").
- **Background:** `--button-positive-bg` → `action/positive` (green)
- **Text and icons:** `--button-positive-text` / `--button-positive-fg` → white in every state and theme
- Use sparingly — only when the green color meaningfully communicates the action's outcome.

Design decision: Success Button text stays white in every theme and interaction state. Do not switch it to black as an isolated contrast fix. If stricter contrast is required later, recalibrate the success action backgrounds together with the white foreground.

### `destructive`

- **Use when:** Destructive, irreversible actions (delete, remove, revoke).
- **Background:** `--button-destructive-bg` → `action/destructive` (red)
- **Text and icons:** `--button-destructive-text` / `--button-destructive-fg` → white in every state and theme
- Always pair with a confirmation dialog for truly destructive actions.

### `warning`

- **Use when:** Reversible cautious actions that need attention but are not destructive (e.g. publish overrides, override-defaults).
- **Background:** `--button-warning-bg` → `action/warning` (yellow)
- **Text:** dark on default/hover yellow, then `text/inverse` on the stronger active fill
- Distinct from `destructive` — warning does not imply destruction.

## Sizes

| Size | Height | Root padding X | Layout gap | Text padding X | Effective label edge | Effective icon-to-text | Radius | Font / line | Weight       | Icon size |
| ---- | ------ | -------------- | ---------- | -------------- | -------------------- | ---------------------- | ------ | ----------- | ------------ | --------- |
| `xs` | 24px   | 6px            | 2px        | 2px            | 8px                  | 4px                    | 4px    | 12 / 14px   | Medium 500   | 12px      |
| `sm` | 28px   | 8px            | 4px        | 2px            | 10px                 | 6px                    | 4px    | 12 / 14px   | SemiBold 600 | 16px      |
| `md` | 36px   | 14px           | 6px        | 2px            | 16px                 | 8px                    | 4px    | 12 / 14px   | SemiBold 600 | 16px      |
| `lg` | 48px   | 20px           | 4px        | 4px            | 24px                 | 8px                    | 6px    | 14 / 20px   | SemiBold 600 | 20px      |

The root padding is symmetrical whether icons are visible or hidden. The Text padding wrapper provides the remaining optical spacing. Regular buttons bind layout gap and Text padding to `Button/size/{size}/gap` and `Button/size/{size}/text-padding-x`; these component tokens alias the same global Spacing values shown above.

**Link exception:** every outer and Text padding value is `0`; the component hugs its visible label/icon content. Its icon-to-text gap is `4 / 6 / 8 / 8px` for `xs / sm / md / lg`.

**Icon-only square sizes:**

- `xs` → 24×24px
- `sm` → 28×28px
- `md` → 36×36px
- `lg` → 48×48px

---

## Layout flags

- **`iconOnly`** — collapses the content to a square whose width and height both use `--button-size-{size}-height`.
- **`fullWidth`** — stretches the button to `width: 100%`. Cancels `iconOnly` aspect-ratio when both set.

---

## States

| State    | How to apply                       | Token pattern                                                                                               |
| -------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Default  | No modifier                        | `--button-{variant}-bg`                                                                                     |
| Hover    | `:hover`                           | `--button-{variant}-bg-hover`                                                                               |
| Active   | `:active`                          | `--button-{variant}-bg-active`; Outline also uses `--button-outline-border-active`                          |
| Focus    | `:focus-visible`                   | preserve the variant border and apply the shared Focus ring effect / `--color-focus-ring`                   |
| Disabled | `disabled` attr or `aria-disabled` | `opacity: var(--button-disabled-opacity)` = 50%                                                             |
| Loading  | `loading` prop                     | keep label, replace the leading icon with Spinner, hide trailing icon, block interaction, keep 100% opacity |

**Disabled rule:** Apply `--button-disabled-opacity` (50%) to the whole button element via `opacity`. Do not individually override background/text/border for disabled state.

**Loading rule:** Loading is behaviorally disabled but not visually disabled. Keep the native button disabled, expose `aria-busy="true"`, suppress click/focus/hover/active behavior, and explicitly restore `opacity: 1`. Regular buttons keep their visible label and show the animated Spinner at the leading edge; Icon Only buttons show the Spinner centered. Loading never uses `--button-disabled-opacity`.

**Focus rule:** Focus never replaces the variant border. In Figma, apply the shared Focus ring effect to the component; in code, use `--color-focus-ring` directly for the keyboard-focus outline. Do not create a Button-specific focus color token.

### Loading spinner inheritance

Loading instances must keep the spinner component's own stroke unless a colored button surface requires the Button foreground token.

| Figma type | Spinner appearance | Nested stroke override  |
| ---------- | ------------------ | ----------------------- |
| Primary    | White              | `Button/primary/fg`     |
| Positive   | White              | `Button/positive/fg`    |
| Negative   | White              | `Button/destructive/fg` |
| Secondary  | Greyscale          | none; inherit Spinner   |
| Outline    | Greyscale          | none; inherit Spinner   |
| Ghost      | Greyscale          | none; inherit Spinner   |
| Link       | Primary            | none; inherit Spinner   |

Do not reintroduce local nested stroke overrides for Secondary, Outline, Ghost, or Link loading icons.

---

## Token Reference

### Colored content tokens

```css
--button-primary-text: var(--color-text-on-color);
--button-primary-fg: var(--color-fg-on-color);
--button-positive-text: var(--color-text-on-color);
--button-positive-fg: var(--color-fg-on-color);
--button-destructive-text: var(--color-text-on-color);
--button-destructive-fg: var(--color-fg-on-color);
```

### Primary variant tokens

```css
--button-primary-bg: var(--color-action-primary);
--button-primary-bg-hover: var(--color-action-primary-hover);
--button-primary-bg-active: var(--color-action-primary-active);
--button-primary-border: var(--color-action-primary);
--button-primary-border-hover: var(--color-action-primary-hover);
```

### Target size tokens (md example)

```css
--button-size-md-height: 36px;
--button-size-md-padding-x: 14px;
--button-size-md-gap: var(--spacing-sm); /* 6px */
--button-size-md-text-padding-x: var(--spacing-xxs); /* 2px */
--button-size-md-radius: var(--radius-xs); /* 4px */
--button-size-md-text: var(--font-size-text-sm); /* 12px */
--button-size-md-line-height: 14px;
--button-size-md-weight: var(--font-weight-semibold);
--button-size-md-icon-size: 16px;
```

### Target size tokens (lg example)

```css
--button-size-lg-height: 48px;
--button-size-lg-padding-x: var(--spacing-2xl); /* 20px */
--button-size-lg-gap: var(--spacing-xs); /* 4px */
--button-size-lg-text-padding-x: var(--spacing-xs); /* 4px */
--button-size-lg-radius: var(--radius-sm); /* 6px */
--button-size-lg-text: var(--font-size-text-md); /* 14px */
--button-size-lg-line-height: 20px;
--button-size-lg-weight: var(--font-weight-semibold);
--button-size-lg-icon-size: 20px;
```

### Compatibility boundary

- The active contract has one `Button/size/*/padding-x` token per size.
- Regular layout gaps and Text padding bind through the size-specific Button component tokens; their values alias global Spacing tokens.
- Icon-only width and height reuse `Button/size/*/height`.
- Published v2 Figma variable identities are retained under hidden `Button/legacy/*` names so existing instances do not break. New work must not bind to them.
- Social Button owns its horizontal padding and no longer inherits Button v2 spacing.

### Disabled + font

```css
--button-disabled-opacity: 0.5;
--button-font-family: var(--font-family-body); /* Montserrat */
```

---

## Code Example (React + CVA)

```tsx
<Button variant="primary" size="md">
  Save changes
</Button>

<Button variant="destructive" size="sm">
  Delete
</Button>

<Button variant="ghost" size="md" aria-label="Settings">
  <SettingsIcon />
</Button>
```

---

## What NOT to do

| ❌ Wrong                                             | ✅ Correct                                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------------- |
| `background: #0265DC`                                | `background: var(--button-primary-bg)`                                        |
| `border-radius: 4px`                                 | `border-radius: var(--button-size-md-radius)`                                 |
| Using `primary` for every action                     | Reserve `primary` for one CTA per view                                        |
| Bind colored labels/icons to a generic content group | Use the explicit `--button-{variant}-text` / `--button-{variant}-fg` contract |
| `secondary` as outlined white button                 | `secondary` is a filled gray button                                           |
| Custom disabled styles                               | Use `--button-disabled-opacity: 0.5` on the element                           |

---

## Figma component structure

```
Buttons/
└── 🟢 Button / Light Mode
    ├── axes: Type × Size × State × Icon Only
    ├── Boolean properties: Icon Left, Icon Right
    ├── instance swaps: Left, Right, Icon Only
    └── Text padding wrapper around Label
```

**Canonical Type order:** Primary → Secondary → Outline → Positive → Negative → Ghost → Link.

Within every Type, size rows run Large → Medium → Small → Xtra Small. Each row contains the six regular states first, followed by the six Icon Only states. Both groups use: Default → Hover → Active → Focus → Loading → Disabled.

Figma v3 has 336 variants. Dropdown, Icon Left, and Icon Right are no longer variant axes; the two icon controls are Boolean properties and Dropdown is composed through the trailing icon property. `Selected` is intentionally excluded from Button: persistent selection belongs to Toggle Button, Segmented Control, or another control with `aria-pressed` semantics.

---

## Source files

- Token JSON: `packages/tokens/figma/component-button.json`
- Figma collection: `Component-based` / `Default` → `Button/*`
- React component: `packages/ui/src/components/button/` (reference pattern)
