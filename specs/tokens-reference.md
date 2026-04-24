# Token Reference — Master CSS Variable Index

Quick lookup for CSS variable names. For usage rules, see the foundation and component specs.

## Text / Foreground

```css
--color-text-primary          /* Main body text, headings */
--color-text-secondary        /* Supporting text, labels */
--color-text-tertiary         /* Captions, metadata, placeholder */
--color-text-disabled         /* Disabled form labels */
--color-text-inverse          /* Text on dark/colored surfaces */
--color-text-on-brand         /* Text on bg/brand-solid (dark text — teal is bright) */
--color-text-brand            /* Brand-colored labels */
--color-text-info             /* Informational copy */
--color-text-success          /* Success messages */
--color-text-error            /* Error messages, validation */
--color-text-warning          /* Warning messages */
```

## Border

```css
--color-border-default        /* Default input, card borders */
--color-border-subtle         /* Dividers, separators */
--color-border-focus          /* Focus rings on interactive elements */
--color-border-brand-strong
--color-border-info-strong
--color-border-success-strong
--color-border-error-strong
--color-border-warning-strong
--color-border-neutral-strong
--color-border-neutral-subtle
```

## Background / Surface

```css
--color-bg-default            /* Page background */
--color-bg-surface-layer1     /* Cards, panels (first elevation) */
--color-bg-surface-layer2     /* Nested surfaces (second elevation) */
--color-bg-neutral-subtle     /* Subtle section backgrounds */
--color-bg-neutral-on-subtle  /* Slightly stronger neutral bg */
--color-bg-neutral-strong     /* Strong neutral background */
--color-bg-disabled           /* Disabled input backgrounds */
--color-bg-overlay            /* Modal / drawer backdrops */
--color-bg-nav                /* Navigation bar (always dark) */
--color-bg-brand-subtle       /* Brand-tinted section bg */
--color-bg-brand-surface      /* Brand surface */
--color-bg-info-subtle
--color-bg-info-surface
--color-bg-success-subtle
--color-bg-success-surface
--color-bg-success-strong
--color-bg-error-subtle
--color-bg-error-surface
--color-bg-error-strong
--color-bg-warning-subtle
--color-bg-warning-surface
--color-bg-warning-strong
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

## Typography

```css
/* Font families */
--font-family-body   /* Montserrat */
--font-family-mono   /* Bebas Neue */

/* Font sizes */
--font-size-heading-2xl   /* 40px desktop */
--font-size-heading-xl    /* 32px desktop */
--font-size-heading-lg    /* 26px desktop */
--font-size-heading-md    /* 22px desktop */
--font-size-heading-sm    /* 18px desktop */
--font-size-heading-xs    /* 16px desktop */
--font-size-text-lg       /* 16px */
--font-size-text-md       /* 14px — default UI text */
--font-size-text-sm       /* 12px */
--font-size-caption-sm    /* 10px */
--font-size-caption-xs    /* 8px */

/* Line heights */
--line-height-heading-2xl  /* 48px */
--line-height-heading-xl   /* 40px */
--line-height-heading-lg   /* 34px */
--line-height-heading-md   /* 30px */
--line-height-heading-sm   /* 26px */
--line-height-heading-xs   /* 24px */
--line-height-text-lg      /* 24px */
--line-height-text-md      /* 20px */
--line-height-text-sm      /* 18px */
--line-height-caption-sm   /* 16px */
--line-height-caption-xs   /* 12px */

/* Font weights */
--font-weight-regular         /* 400 */
--font-weight-regular-italic
--font-weight-medium          /* 500 */
--font-weight-medium-italic
--font-weight-semibold        /* 600 — button labels, UI labels */
--font-weight-semibold-italic
--font-weight-bold            /* 700 — headings */
--font-weight-bold-italic
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
--button-size-sm-height       /* 32px */
--button-size-sm-padding-x    /* 12px */
--button-size-sm-gap          /* 6px */
--button-size-sm-radius       /* 8px */
--button-size-sm-text         /* 12px */
--button-size-sm-line-height
--button-size-sm-weight       /* semibold */
--button-size-sm-icon-size    /* 16px */

--button-size-md-height       /* 40px */
--button-size-md-padding-x    /* 16px */
--button-size-md-gap          /* 8px */
--button-size-md-radius       /* 8px */
--button-size-md-text         /* 14px */
--button-size-md-line-height
--button-size-md-weight       /* semibold */
--button-size-md-icon-size    /* 20px */

--button-size-lg-height       /* 48px */
--button-size-lg-padding-x    /* 20px */
--button-size-lg-gap          /* 8px */
--button-size-lg-radius       /* 10px */
--button-size-lg-text         /* 16px */
--button-size-lg-line-height
--button-size-lg-weight       /* semibold */
--button-size-lg-icon-size    /* 20px */

/* Icon-only sizes */
--button-icon-only-sm-size    /* 32px */
--button-icon-only-md-size    /* 40px */
--button-icon-only-lg-size    /* 48px */

/* Font */
--button-font-family          /* Montserrat */
```

## Source files

- `packages/tokens/src/semantic.css` — all color semantic tokens
- `packages/tokens/src/dimensions.css` — spacing, radius tokens
- `packages/tokens/src/typography.css` — font tokens
- `packages/tokens/figma/component-button-light.json` — button component tokens (light)
- `packages/tokens/figma/component-button-dark.json` — button component tokens (dark)
