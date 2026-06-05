# Token Reference — Master CSS Variable Index

Quick lookup for CSS variable names. For usage rules, see the foundation and component specs.

## Text

```css
--color-text-primary          /* Main body text, headings */
--color-text-secondary        /* Supporting text, labels */
--color-text-tertiary         /* Captions, metadata, placeholder */
--color-text-disabled         /* Disabled form labels */
--color-text-inverse          /* Text on dark/colored surfaces */
--color-text-on-brand         /* Text on bg-brand-strong (dark text — teal is bright) */
--color-text-brand            /* Brand-colored labels */
--color-text-info             /* Informational copy */
--color-text-success          /* Success messages */
--color-text-error            /* Error messages, validation */
--color-text-warning          /* Warning messages */
```

## Foreground

Use foreground tokens for icons, SVG strokes/fills, and non-text foreground elements.

```css
--color-fg-primary            /* Highest-emphasis icons */
--color-fg-secondary          /* Supporting icons */
--color-fg-tertiary           /* Low-emphasis icons */
--color-fg-disabled           /* Disabled icons */
--color-fg-inverse            /* Icons on dark/inverted surfaces */
--color-fg-on-brand           /* Icons on bg-brand-strong */
--color-fg-brand              /* Brand-colored icons */
--color-fg-info               /* Informational icons */
--color-fg-positive           /* Success icons */
--color-fg-negative           /* Error/destructive icons */
--color-fg-warning            /* Warning icons */
```

## Border

```css
--color-border-primary        /* Default input, card borders */
--color-border-secondary      /* Stronger border variant */
--color-border-subtle         /* Dividers, separators */
--color-border-focus          /* Focus rings on interactive elements */
--color-border-brand          /* Brand-accented borders */
--color-border-error          /* Invalid input borders */
--color-border-info-strong
--color-border-success-strong
--color-border-warning-strong
--color-border-neutral-strong
--color-border-neutral-subtle

/* Backward-compat aliases (prefer canonical names above) */
--color-border-default        /* → --color-border-primary */
--color-border-disabled       /* → --color-border-subtle */
```

## Background / Surface

**Surface elevation model — page + surface + float + muted + overlay.** Use these to choose backgrounds.
For the why/when of each tier, see `specs/foundations/color.md`.

```css
/* ── Surface elevation ──────────────────────────────────────────── */
--color-bg-page               /* Gray canvas, lowest layer (page/viewport) */
--color-bg-surface            /* White raised surfaces — inputs, cards,
                                  modals, sidebar, drawer,
                                  table rows, content containers */
--color-bg-float              /* Floating surfaces — dropdowns,
                                  popovers, tooltips, command palettes */
--color-bg-muted              /* Recessed zones — code blocks, wells,
                                  table fill, search-fields inside dark sidebars */
--color-bg-overlay            /* Modal / drawer scrim (rgba) */
--color-bg-inverse            /* Inverted surface (dark on light theme) */
--color-bg-disabled           /* Disabled input backgrounds */

/* ── Status / intent backgrounds (orthogonal to elevation) ──────── */
--color-bg-neutral-subtle     /* Subtle section backgrounds */
--color-bg-neutral-on-subtle  /* Slightly stronger neutral bg */
--color-bg-neutral-strong     /* Strong neutral background */
--color-bg-brand-subtle       /* Brand-tinted section bg */
--color-bg-brand-surface              /* Brand surface */
--color-bg-brand-muted        /* Stronger brand-tinted background */
--color-bg-brand-strong        /* Strong brand-colored surface */
--color-bg-info-subtle
--color-bg-info-surface
--color-bg-info-strong
--color-bg-success-subtle
--color-bg-success-surface
--color-bg-success-strong
--color-bg-error-subtle
--color-bg-error-surface
--color-bg-error-strong
--color-bg-warning-subtle
--color-bg-warning-surface
--color-bg-warning-strong

/* Muted tier — medium emphasis between subtle and strong (badge/tag) */
--color-bg-neutral-muted
--color-bg-info-muted
--color-bg-success-muted
--color-bg-warning-muted
--color-bg-error-muted
```

**Component-specific bg:**

```css
--nav-bg                      /* Navigation bar — always dark, never overridden in dark mode.
                                  Defined in component-nav.css (component layer). */
```

## Action (interactive backgrounds)

```css
/* Primary (blue) */
--color-action-primary
--color-action-primary-hover
--color-action-primary-active
--color-action-primary-subtle
--color-action-primary-subtle-hover
--color-action-primary-subtle-active

/* Neutral (gray) */
--color-action-neutral
--color-action-neutral-hover
--color-action-neutral-active
--color-action-neutral-subtle
--color-action-neutral-subtle-hover
--color-action-neutral-subtle-active

/* Brand (teal) */
--color-action-brand
--color-action-brand-hover
--color-action-brand-active
--color-action-brand-subtle
--color-action-brand-subtle-hover
--color-action-brand-subtle-active

/* Positive (green) */
--color-action-positive
--color-action-positive-hover
--color-action-positive-active
--color-action-positive-subtle
--color-action-positive-subtle-hover
--color-action-positive-subtle-active

/* Negative (red) */
--color-action-negative
--color-action-negative-hover
--color-action-negative-active
--color-action-negative-subtle
--color-action-negative-subtle-hover
--color-action-negative-subtle-active

/* Warning (yellow) */
--color-action-warning
--color-action-warning-hover
--color-action-warning-active
--color-action-warning-subtle
--color-action-warning-subtle-hover
--color-action-warning-subtle-active
```

## Spacing

```css
--spacing-none    /* 0px */
--spacing-xxs     /* 2px */
--spacing-xs      /* 4px */
--spacing-sm      /* 6px */
--spacing-md      /* 8px */
--spacing-lg      /* 12px */
--spacing-xl      /* 16px */
--spacing-2xl     /* 20px */
--spacing-3xl     /* 24px */
--spacing-4xl     /* 32px */
--spacing-5xl     /* 40px */
--spacing-6xl     /* 48px */
--spacing-7xl     /* 64px */
--spacing-8xl     /* 80px */
--spacing-9xl     /* 96px */
--spacing-10xl    /* 128px */
--spacing-11xl    /* 160px */
```

## Radius

```css
--radius-none   /* 0px */
--radius-xxs    /* 2px */
--radius-xs     /* 4px */
--radius-sm     /* 6px */
--radius-md     /* 8px  — default for buttons and inputs */
--radius-lg     /* 10px — large buttons */
--radius-xl     /* 12px */
--radius-2xl    /* 16px — cards, modals */
--radius-3xl    /* 20px */
--radius-4xl    /* 24px */
--radius-full   /* 9999px — pills, avatars */
```

## Shadows

```css
--shadow-xs   /* 0px 1px 2px 0px rgba(0,0,0,.05) — small cards, subtle lift */
--shadow-sm   /* 0 1px 3px rgba(0,0,0,.10), 0 1px 2px -1px rgba(0,0,0,.10) — dropdowns, selects */
--shadow-md   /* 0 4px 6px -1px rgba(0,0,0,.10), 0 2px 4px -2px rgba(0,0,0,.06) — tooltips, popovers */
--shadow-lg   /* 0 12px 16px -4px rgba(0,0,0,.08), … — modals, drawers */
--shadow-xl   /* 0 20px 24px -4px rgba(0,0,0,.08), … — full-screen overlays */
--shadow-2xl  /* 0 24px 48px -12px rgba(0,0,0,.18), … — hero cards */
--shadow-3xl  /* 0 32px 64px -12px rgba(0,0,0,.14), … — reserved / max elevation */
```

Dark mode overrides (2–3× opacity) defined in same file via `[data-theme="dark"]`.
Never use directly in component CSS — define `--{component}-shadow: var(--shadow-*)` first.

## Typography

Tailwind v4 convention: `--text-{name}` sets font-size; `--text-{name}--line-height` sets line-height.

```css
/* Font families */
--font-body   /* Montserrat */
--font-mono   /* Roboto Mono */

/* Font size + line-height pairs (Tailwind v4) */
--text-heading-2xl             /* 40px */
--text-heading-2xl--line-height  /* 48px */
--text-heading-xl              /* 32px */
--text-heading-xl--line-height   /* 40px */
--text-heading-lg              /* 26px */
--text-heading-lg--line-height   /* 34px */
--text-heading-md              /* 22px */
--text-heading-md--line-height   /* 30px */
--text-heading-sm              /* 18px */
--text-heading-sm--line-height   /* 26px */
--text-heading-xs              /* 16px */
--text-heading-xs--line-height   /* 24px */
--text-lg                      /* 16px */
--text-lg--line-height           /* 24px */
--text-md                      /* 14px — default UI text */
--text-md--line-height           /* 20px */
--text-sm                      /* 12px */
--text-sm--line-height           /* 18px */
--text-caption-sm              /* 10px */
--text-caption-sm--line-height   /* 16px */
--text-caption-xs              /* 8px */
--text-caption-xs--line-height   /* 12px */

/* Font weights */
--font-weight-regular         /* 400 */
--font-weight-medium          /* 500 */
--font-weight-semibold        /* 600 — button labels, UI labels */
--font-weight-bold            /* 700 — headings */
```

## Breakpoints

```css
--breakpoint-mobile:  375px;
--breakpoint-tablet:  768px;
--breakpoint-laptop:  1024px;
--breakpoint-desktop: 1280px;
--breakpoint-wide:    1440px;
--breakpoint-ultra:   1680px;
--breakpoint-max:     1920px;
```

Note: breakpoints can't be used directly in `@media` queries as CSS custom properties.
Use the raw values from `specs/foundations/breakpoints.md` in media queries.

## Motion

Duration + easing tokens for transitions and animations. See `specs/foundations/motion.md`
for usage guidance and the global `prefers-reduced-motion` guard.

```css
/* Durations */
--duration-instant   /* 50ms  — near-immediate feedback */
--duration-fast      /* 100ms — micro hover/state changes */
--duration-base      /* 150ms — standard interactive transitions */
--duration-slow      /* 250ms — overlays, larger movement */
--duration-slower    /* 400ms — large/expressive movement */

/* Easings */
--easing-standard    /* cubic-bezier(0.2, 0, 0, 1)  — default for most transitions */
--easing-emphasized  /* cubic-bezier(0.3, 0, 0, 1)  — emphasized/expressive motion */
--easing-decelerate  /* cubic-bezier(0, 0, 0, 1)    — entering elements (decelerate to rest) */
```

## Z-index

Stacking order for overlays. Always reference the token, never a raw integer.

```css
--z-base       /* 0 */
--z-dropdown   /* 1000 */
--z-sticky     /* 1100 */
--z-overlay    /* 1300 */
--z-modal      /* 1400 */
--z-popover    /* 1500 */
--z-tooltip    /* 1600 */
--z-toast      /* 1700 */
```

## Opacity

```css
--opacity-disabled   /* 0.5  — disabled controls */
--opacity-muted      /* 0.65 — de-emphasized/secondary elements */
--opacity-backdrop   /* 0.4  — scrim/backdrop opacity */
```

## Blur

```css
--blur-sm   /* 4px */
--blur-md   /* 8px */
--blur-lg   /* 16px */
```

## Button Component Tokens

```css
/* Variant: primary */
--button-primary-bg
--button-primary-bg-hover
--button-primary-bg-active
--button-primary-text
--button-primary-border
--button-primary-border-hover
--button-primary-border-focus

/* Variant: secondary */
--button-secondary-bg
--button-secondary-bg-hover
--button-secondary-bg-active
--button-secondary-text
--button-secondary-border
--button-secondary-border-hover
--button-secondary-border-focus

/* Variant: outline */
--button-outline-bg
--button-outline-bg-hover
--button-outline-bg-active
--button-outline-text
--button-outline-border
--button-outline-border-hover
--button-outline-border-focus

/* Variant: ghost */
--button-ghost-bg             /* transparent */
--button-ghost-bg-hover
--button-ghost-bg-active
--button-ghost-text
--button-ghost-border         /* transparent */
--button-ghost-border-hover   /* transparent */
--button-ghost-border-focus

/* Variant: link */
--button-link-bg              /* transparent */
--button-link-bg-hover        /* transparent */
--button-link-bg-active       /* transparent */
--button-link-text
--button-link-text-hover
--button-link-text-active
--button-link-border          /* transparent */
--button-link-border-hover    /* transparent */
--button-link-border-focus

/* Variant: success */
--button-success-bg
--button-success-bg-hover
--button-success-bg-active
--button-success-text
--button-success-border
--button-success-border-hover
--button-success-border-focus

/* Variant: danger */
--button-danger-bg
--button-danger-bg-hover
--button-danger-bg-active
--button-danger-text
--button-danger-border
--button-danger-border-hover
--button-danger-border-focus

/* Disabled */
--button-disabled-opacity     /* 0.5 */

/* Sizes */
--button-size-sm-height       /* 28px */
--button-size-sm-padding-x    /* 10px */
--button-size-sm-gap          /* 6px */
--button-size-sm-radius       /* radius-xs (4px) */
--button-size-sm-text         /* text-sm */
--button-size-sm-line-height
--button-size-sm-weight       /* semibold */
--button-size-sm-icon-size    /* 16px */

--button-size-md-height       /* 36px */
--button-size-md-padding-x    /* 16px (spacing-xl) */
--button-size-md-gap          /* 8px */
--button-size-md-radius       /* radius-xs (4px) */
--button-size-md-text         /* text-sm */
--button-size-md-line-height
--button-size-md-weight       /* semibold */
--button-size-md-icon-size    /* 16px */

--button-size-lg-height       /* 48px */
--button-size-lg-padding-x    /* 20px */
--button-size-lg-gap          /* 8px */
--button-size-lg-radius       /* radius-sm (6px) */
--button-size-lg-text         /* text-md */
--button-size-lg-line-height
--button-size-lg-weight       /* semibold */
--button-size-lg-icon-size    /* 20px */

/* Icon-only sizes */
--button-icon-only-sm-size    /* 28px */
--button-icon-only-md-size    /* 36px */
--button-icon-only-lg-size    /* 48px */

/* Font */
--button-font-family          /* Montserrat */
```

## Input Component Tokens

```css
/* Default state */
--input-bg                    /* bg-surface */
--input-text                  /* text-primary */
--input-placeholder           /* text-tertiary */
--input-border                /* border-primary */
--input-border-hover          /* border-secondary */
--input-border-focus          /* border-focus */
--input-focus-ring            /* action-primary */
--input-focus-ring-offset     /* 1px */
--input-focus-ring-width      /* 3px */
--input-filled-text           /* text-primary */

/* Status: error */
--input-error-border
--input-error-border-focus
--input-error-hint
--input-error-text

/* Status: success */
--input-success-border        /* border-success-strong */
--input-success-border-focus
--input-success-hint

/* Disabled */
--input-disabled-bg           /* bg-disabled */
--input-disabled-text
--input-disabled-placeholder
--input-disabled-opacity      /* 1 */

/* Read-only (recessed visual) */
--input-readonly-bg           /* bg-inset */
--input-readonly-text

/* Label / hint */
--input-label-text            /* text-secondary */
--input-hint-text             /* text-tertiary */
--input-label-gap             /* spacing-xs */

/* Sizes */
--input-size-sm-height        /* 28px */
--input-size-sm-padding-x     /* 10px */
--input-size-sm-text          /* text-sm */
--input-size-sm-radius        /* radius-xs */
--input-size-sm-gap           /* 4px */

--input-size-md-height        /* 36px */
--input-size-md-padding-x     /* 12px */
--input-size-md-text          /* text-sm */
--input-size-md-radius        /* radius-xs */
--input-size-md-gap           /* 6px */

--input-size-lg-height        /* 48px */
--input-size-lg-padding-x     /* 16px */
--input-size-lg-text          /* text-md */
--input-size-lg-radius        /* radius-sm */
--input-size-lg-gap           /* 8px */

/* Icon sizes */
--input-icon-sm-size          /* 14px */
--input-icon-md-size          /* 16px */
--input-icon-lg-size          /* 20px */

/* Textarea */
--input-textarea-sm-min-height  /* 88px */
--input-textarea-md-min-height  /* 108px */
--input-textarea-lg-min-height  /* 128px */
--input-textarea-padding-y      /* 10px */
--input-textarea-line-height    /* 14px */

/* Shared */
--input-font-family           /* font-body (Montserrat) */
--input-font-weight           /* font-weight-regular */
```

## Checkbox Component Tokens

```css
/* Field layout */
--checkbox-label-gap
--checkbox-content-gap
--checkbox-row-gap
--checkbox-text-padding-y

/* Size: md only */
--checkbox-size-md            /* 20px */
--checkbox-radius             /* radius-xs */
--checkbox-border-width       /* 1px */
--checkbox-focus-ring-width
--checkbox-focus-ring-inner-width
--checkbox-focus-ring-offset
--checkbox-mark-width-md      /* 10px */
--checkbox-mark-height-md     /* 8px */
--checkbox-dash-height        /* 1.75px */
--checkbox-dash-radius        /* 1px */

/* Default state */
--checkbox-bg                 /* white */
--checkbox-border             /* #a1a1a4 */
--checkbox-border-hover       /* #c9c9c9 */
--checkbox-border-focus       /* #0b73cb */
--checkbox-focus-ring-inner-color
--checkbox-mark-color         /* #ffffff */

/* Checked / indeterminate */
--checkbox-bg-checked         /* #2d2d2e */
--checkbox-bg-checked-hover   /* #5e5e5f */
--checkbox-border-checked
--checkbox-border-checked-hover

/* Error */
--checkbox-border-error
--checkbox-bg-error-checked

/* Disabled */
--checkbox-bg-disabled
--checkbox-bg-disabled-checked
--checkbox-border-disabled
--checkbox-mark-disabled

/* Label / helper */
--checkbox-font-family
--checkbox-top-label-text
--checkbox-top-label-disabled
--checkbox-side-label-text
--checkbox-description-text
--checkbox-text-disabled
--checkbox-helper-error
--checkbox-label-font-size
--checkbox-label-line-height
--checkbox-label-font-weight
--checkbox-top-label-font-weight
--checkbox-description-font-size
--checkbox-description-line-height
--checkbox-description-font-weight
```

## Radio Component Tokens

```css
/* Field layout */
--radio-label-gap
--radio-content-gap
--radio-row-gap
--radio-text-padding-y

/* Size: md only */
--radio-size-md               /* 20px */
--radio-dot-size-md           /* 8px */
--radio-border-width          /* 1px */
--radio-focus-ring-width
--radio-focus-ring-inner-width
--radio-focus-ring-offset

/* Default state */
--radio-bg                    /* white */
--radio-border                /* #a1a1a4 */
--radio-border-hover          /* #c9c9c9 */
--radio-border-focus          /* #0b73cb */
--radio-focus-ring-inner-color

/* Checked */
--radio-bg-checked            /* transparent */
--radio-border-checked        /* #0576da */
--radio-border-checked-hover  /* #04549b */
--radio-dot-color             /* #0576da */
--radio-dot-color-hover       /* #04549b */

/* Error */
--radio-border-error
--radio-bg-error-checked

/* Disabled */
--radio-bg-disabled
--radio-border-disabled
--radio-dot-disabled

/* Label / helper */
--radio-font-family
--radio-top-label-text
--radio-top-label-disabled
--radio-side-label-text
--radio-description-text
--radio-text-disabled
--radio-helper-error
--radio-label-font-size
--radio-label-line-height
--radio-label-font-weight
--radio-top-label-font-weight
--radio-description-font-size
--radio-description-line-height
--radio-description-font-weight
```

## Badge Component Tokens

Mapped per `[data-intent][data-emphasis]` (intent: neutral/info/success/warning/error;
emphasis: low/medium/high). Light/dark handled by the semantic layer.

```css
/* Resolved per variant */
--badge-bg                    /* bg-{intent}-{subtle|muted|strong} */
--badge-text                    /* text-{intent} (low/medium) | text-inverse (high) */
--badge-icon
--badge-border                /* transparent (v1) */

/* Shared */
--badge-radius                /* radius-full (pill) */
--badge-font-family           /* Montserrat */
--badge-font-weight           /* 500 */

/* Sizes */
--badge-size-sm-height        /* 20px */
--badge-size-sm-padding-x     /* 6px */
--badge-size-sm-gap           /* 4px */
--badge-size-sm-font          /* text-sm 12px */
--badge-size-sm-icon          /* 12px */
--badge-size-md-height        /* 24px */
--badge-size-md-padding-x     /* 8px */
--badge-size-md-gap           /* 4px */
--badge-size-md-font          /* text-sm 12px */
--badge-size-md-icon          /* 14px */
--badge-size-lg-height        /* 28px */
--badge-size-lg-padding-x     /* 10px */
--badge-size-lg-gap           /* 6px */
--badge-size-lg-font          /* text-md 14px */
--badge-size-lg-icon          /* 16px */
```

## Tag Component Tokens

Mapped per `[data-appearance][data-emphasis]` (appearance palette;
emphasis: low/medium/high). Tag intentionally has no semantic intent.

```css
/* Resolved per variant */
--tag-bg
--tag-text
--tag-icon
--tag-border                 /* transparent (v1) */
--tag-remove-fg
--tag-remove-opacity

/* Shared */
--tag-radius                 /* radius-sm (6px) */
--tag-font-family            /* Montserrat */
--tag-font-weight            /* 500 */

/* Sizes */
--tag-size-sm-height         /* 20px */
--tag-size-sm-padding-x      /* 6px */
--tag-size-sm-gap            /* 4px */
--tag-size-sm-font           /* text-sm 12px */
--tag-size-sm-icon           /* 12px */
--tag-size-sm-remove         /* 12px */
--tag-size-md-height         /* 24px */
--tag-size-md-padding-x      /* 8px */
--tag-size-md-gap            /* 4px */
--tag-size-md-font           /* text-sm 12px */
--tag-size-md-icon           /* 14px */
--tag-size-md-remove         /* 14px */
--tag-size-lg-height         /* 28px */
--tag-size-lg-padding-x      /* 10px */
--tag-size-lg-gap            /* 6px */
--tag-size-lg-font           /* text-md 14px */
--tag-size-lg-icon           /* 16px */
--tag-size-lg-remove         /* 16px */
```

## Toggle Component Tokens

```css
/* Field layout */
--toggle-field-max-width       /* 160px */
--toggle-content-max-width     /* 117px */
--toggle-content-gap           /* 8px */
--toggle-label-gap             /* 8px */
--toggle-description-gap       /* 2px */
--toggle-content-padding-y     /* 3px */

/* Track size: md only */
--toggle-track-width          /* 36px */
--toggle-track-height         /* 20px */

/* Thumb */
--toggle-thumb-size           /* 16px */
--toggle-thumb-inset          /* 2px — track edge to thumb, drives travel */

/* Radius */
--toggle-track-radius         /* radius-full */
--toggle-thumb-radius         /* radius-full */

/* Focus ring */
--toggle-focus-ring-width     /* 3px */
--toggle-focus-ring-offset    /* 2px */
--toggle-focus-ring-color     /* border-focus */

/* Colors — track */
--toggle-track-bg-off         /* #c9c9c9 */
--toggle-track-bg-off-hover   /* #a1a1a4 */
--toggle-track-bg-on          /* #0576da */
--toggle-track-bg-on-hover    /* #04549b */
--toggle-track-bg-disabled    /* disabled track */

/* Colors — thumb */
--toggle-thumb-bg             /* bg-surface */
--toggle-thumb-bg-disabled    /* disabled thumb */

/* Text */
--toggle-font-family
--toggle-label-font-size
--toggle-label-line-height
--toggle-label-font-weight
--toggle-side-label-font-size
--toggle-side-label-line-height
--toggle-side-label-font-weight
--toggle-description-font-size
--toggle-description-line-height
--toggle-description-font-weight
--toggle-label-color
--toggle-text-color
--toggle-description-color
--toggle-label-color-disabled
--toggle-text-color-disabled

/* Colors — error */
--toggle-track-border-error   /* border-error */
--toggle-error-border-width   /* 1.5px */
```

## Separator Component Tokens

```css
--separator-color   /* border-primary */
--separator-size    /* width-1 (1px) */
```

## Alert Component Tokens

Four public intents (info / success / warning / danger) are theme-aware.
Light mode aliases semantic intent surfaces; dark mode uses the Figma Alert component surface:
muted dark panels, restrained borders, a left accent strip, and calm intent icons.
Neutral and emphasize color tokens are exported for Figma parity but are not public React intents yet.

```css
/* Shared layout */
--alert-radius          /* radius-md */
--alert-padding-x       /* spacing-xl (16px) */
--alert-padding-y       /* spacing-xl (16px) */
--alert-gap             /* spacing-md (8px) */
--alert-content-gap     /* spacing-1 (4px) */
--alert-icon-size       /* spacing-5 (20px) */
--alert-icon-offset     /* 0px */
--alert-dismiss-size    /* spacing-8 (32px) */
--alert-dismiss-opacity /* 0.65 */
--alert-font-family     /* font-body */
--alert-font-size       /* text-md (14px) */
--alert-line-height     /* text-md--line-height (20px) */
--alert-font-weight     /* font-weight-medium */
--alert-title-size      /* text-lg (16px) */
--alert-title-weight    /* font-weight-bold */

/* Info */
--alert-info-bg               /* light: bg-info-subtle; dark: #003877 */
--alert-info-border           /* light: border-info-subtle; dark: #0059C2 */
--alert-info-text             /* light: text-primary; dark: #F4F3F3 */
--alert-info-title            /* light: text-primary; dark: #F4F3F3 */
--alert-info-icon             /* light: fg-info; dark: #54A3F6 */

/* Success */
--alert-success-bg            /* light: bg-success-subtle; dark: #044329 */
--alert-success-border        /* light: border-success-subtle; dark: #006D0F */
--alert-success-text          /* light: text-primary; dark: #F4F3F3 */
--alert-success-title         /* light: text-primary; dark: #F4F3F3 */
--alert-success-icon          /* light: fg-positive; dark: #2BB47D */

/* Warning */
--alert-warning-bg            /* light: bg-warning-subtle; dark: #521D00 */
--alert-warning-border        /* light: border-warning-subtle; dark: #B44E00 */
--alert-warning-text          /* light: text-primary; dark: #F4F3F3 */
--alert-warning-title         /* light: text-primary; dark: #F4F3F3 */
--alert-warning-icon          /* light: fg-warning; dark: #E16D00 */

/* Danger */
--alert-danger-bg             /* light: bg-error-subtle; dark: #7B0000 */
--alert-danger-border         /* light: border-danger-subtle; dark: #D71913 */
--alert-danger-text           /* light: text-primary; dark: #F4F3F3 */
--alert-danger-title          /* light: text-primary; dark: #F4F3F3 */
--alert-danger-icon           /* light: fg-negative; dark: #FF755E */
```

## Tooltip Component Tokens

Floating hint on an inverse (dark) surface. Dark mode handled by the inverse semantic tokens.

```css
/* Surface */
--tooltip-bg            /* bg-inverse */
--tooltip-text          /* text-inverse */

/* Shape */
--tooltip-radius        /* radius-sm (6px) */
--tooltip-max-width     /* 240px */

/* Spacing */
--tooltip-padding-x     /* spacing-md (8px) */
--tooltip-padding-y     /* spacing-xs (4px) */

/* Typography */
--tooltip-font-family   /* font-body */
--tooltip-font-size     /* text-sm (12px) */
--tooltip-font-weight   /* font-weight-medium */
--tooltip-line-height   /* 16px */
```

## Popover Component Tokens

Interactive floating surface anchored to a trigger. Use for rich content, filters, compact forms, and contextual actions.

```css
/* Surface */
--popover-bg            /* bg-float */
--popover-text          /* text-primary */
--popover-border        /* border-primary */
--popover-shadow        /* shadow-md */
--popover-z             /* z-popover */

/* Shape */
--popover-radius        /* radius-lg (10px) */
--popover-width         /* 320px */
--popover-max-width     /* viewport-safe max width */

/* Spacing */
--popover-padding-x     /* spacing-lg (12px) */
--popover-padding-y     /* spacing-lg (12px) */
--popover-gap           /* spacing-md (8px) */

/* Typography */
--popover-font-family   /* font-body */
--popover-font-size     /* text-sm (12px) */
--popover-line-height   /* text-sm line-height */
```

## Source files

- `packages/tokens/src/semantic.css` — all color semantic tokens
- `packages/tokens/src/dimensions.css` — spacing, radius tokens
- `packages/tokens/src/shadows.css` — shadow/elevation tokens
- `packages/tokens/src/typography.css` — font tokens
- `packages/tokens/src/component-button.css` — button component tokens
- `packages/tokens/src/component-input.css` — input component tokens
- `packages/tokens/src/component-checkbox.css` — checkbox component tokens
- `packages/tokens/src/component-radio.css` — radio component tokens
- `packages/tokens/src/component-badge.css` — badge component tokens
- `packages/tokens/src/component-tag.css` — tag component tokens
- `packages/tokens/src/component-toggle.css` — toggle component tokens
- `packages/tokens/src/component-separator.css` — separator component tokens
- `packages/tokens/src/component-alert.css` — alert component tokens
- `packages/tokens/src/component-tooltip.css` — tooltip component tokens
- `packages/tokens/src/component-popover.css` — popover component tokens
- `packages/tokens/src/component-nav.css` — nav component tokens
- `packages/tokens/src/dimensions.css` — motion, z-index, opacity, blur (and spacing/radius) tokens
- `packages/tokens/src/motion.css` — `prefers-reduced-motion` global guard
- `packages/tokens/figma/component-button-light.json` — button component tokens (light)
- `packages/tokens/figma/component-button-dark.json` — button component tokens (dark)
